import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCachedData } from '@/lib/dbCache';
import { DEFAULT_AI_SYSTEM_PROMPT, DEFAULT_GAYA_KNOWLEDGE_BASE } from '@/lib/gayaKnowledgeBase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages = [], userPhone = '', userName = '', language = 'en' } = body;

    const rawMessage = messages[messages.length - 1]?.content || '';

    // Phonetic Vedic Auto-Correction for Speech-to-Text voice misrecognitions
    const lastMessage = rawMessage
      .replace(/\b(print\s*out|printout|printer|printing|pint\s*out|pintout|point\s*out|pin\s*out|pin\s*down|pindown|pen\s*down|pin\s*dan|pind\s*dan|pind\s*daan|peen\s*daan|peen\s*dan|been\s*done|bean\s*done|paint\s*out|pin\s*don|pindan|pinda|pinddaan|ping\s*daan|pin\s*dam)\b/gi, language === 'en' ? 'Pind Daan' : 'पिंडदान')
      .replace(/\b(shard|shrad|shraadh|sharad|shradha|sradh|shraadha)\b/gi, language === 'en' ? 'Shradh' : 'श्राद्ध')
      .replace(/\b(gaia|guy a|gaya ji|gayaji|gaaya)\b/gi, language === 'en' ? 'Gaya Ji' : 'गया जी')
      .replace(/\b(vishnu\s*pad|vishnupad|vishnu\s*feet|vishnu\s*padh|visnu\s*pad)\b/gi, language === 'en' ? 'Vishnupad' : 'विष्णुपद')
      .replace(/\b(falgu|falgoo|phalguna)\b/gi, language === 'en' ? 'Falgu River' : 'फल्गु नदी')
      .replace(/\b(akshay\s*vat|akshayvat|akshay\s*bar)\b/gi, language === 'en' ? 'Akshayavat' : 'अक्षयवट')
      .replace(/\b(pret\s*shila|pretshila|plate\s*shila)\b/gi, language === 'en' ? 'Pretshila' : 'प्रेतशिला')
      .replace(/\b(pitrapaksh|pitru\s*paksha|pitra\s*paksha|peter\s*pack)\b/gi, language === 'en' ? 'Pitru Paksha' : 'पितृपक्ष');

    // Update the last message in history with the sanitized version
    const sanitizedMessages = messages.map((m: any, idx: number) => 
      idx === messages.length - 1 ? { ...m, content: lastMessage } : m
    );

    // Language Directive for AI Pandit Ji
    const languageInstruction = language === 'en'
      ? `\n\n⚠️ CRITICAL MULTILINGUAL MANDATE (ENGLISH MODE ACTIVE):
The devotee is using the website in ENGLISH.
1. You MUST respond completely in warm, respectful, dignified ENGLISH.
2. Preserve authentic Vedic terms in Roman script (e.g., 'Pind Daan', 'Shradh', 'Vishnupad Temple', 'Falgu River', 'Akshayavat Tree', 'Gotra Sankalp', 'Tarpan', 'Pitru Paksha').
3. DO NOT output in Devanagari Hindi script unless the devotee explicitly asks in Hindi.
4. Absolutely NO emojis (like folded hands), NO asterisks (**), NO bullet points (•) in the response so text-to-speech speaks cleanly.
5. Keep the response polite, direct, concise, and spiritually authentic.`
      : language === 'bn'
      ? `\n\n⚠️ CRITICAL MULTILINGUAL MANDATE (BENGALI MODE ACTIVE):
শ্রদ্ধালু বাংলা ভাষা নির্বাচন করেছেন। সম্পূর্ণ উত্তর শ্রদ্ধা ও সম্মানের সহিত শুদ্ধ বাংলায় দিন। কোনো ইমোজি বা স্টার ব্যবহার করবেন না।`
      : language === 'te'
      ? `\n\n⚠️ CRITICAL MULTILINGUAL MANDATE (TELUGU MODE ACTIVE):
భక్తుడు తెలుగు భాషను ఎంచుకున్నారు. సమాధానం గౌరవప్రదమైన తెలుగులో ఇవ్వండి. ఎమోజీలు లేదా స్టార్స్ ఉపయోగించవద్దు.`
      : language === 'ta'
      ? `\n\n⚠️ CRITICAL MULTILINGUAL MANDATE (TAMIL MODE ACTIVE):
பக்தர் தமிழ் மொழியைத் தேர்ந்தெடுத்துள்ளார். மரியாதையான தமிழில் பதிலளிக்கவும். எமோஜிகள் பயன்படுத்த வேண்டாம்.`
      : language === 'mr'
      ? `\n\n⚠️ CRITICAL MULTILINGUAL MANDATE (MARATHI MODE ACTIVE):
श्रद्धाळू मराठी भाषा वापरत आहेत. उत्तर आदरपूर्वक शुद्ध मराठीत द्या. इमोजी वापरू नका.`
      : language === 'gu'
      ? `\n\n⚠️ CRITICAL MULTILINGUAL MANDATE (GUJARATI MODE ACTIVE):
શ્રદ્ધાળુ ગુજરાતી ભાષા પસંદ કરેલ છે. જવાબ આદરપૂર્વક શુદ્ધ ગુજરાતીમાં આપો. ઇમોજી વાપરશો નહીં.`
      : `\n\n⚠️ CRITICAL MULTILINGUAL MANDATE (HINDI MODE ACTIVE):
श्रद्धालु हिंदी भाषा में मार्गदर्शन प्राप्त कर रहे हैं। उत्तर अत्यंत विनम्र, आत्मीय, शुद्ध देवनागरी हिंदी में दें। किसी भी इमोजी (जैसे folded hands) या मार्कडाउन स्टार्स का प्रयोग न करें।`;

    // 1. DYNAMIC LIVE SETTINGS & KNOWLEDGE BASE FROM ADMIN PANEL / SITESETTINGS
    let activeSystemPrompt = DEFAULT_AI_SYSTEM_PROMPT;
    let activeKnowledgeBase = DEFAULT_GAYA_KNOWLEDGE_BASE;

    try {
      const db = prisma as any;
      if (db.siteSettings) {
        const settings = await getCachedData('ai_site_settings', async () => {
          return await db.siteSettings.findUnique({ where: { id: 'default' } });
        }, 60);

        if (settings?.aiSystemPrompt?.trim()) {
          activeSystemPrompt = settings.aiSystemPrompt.trim();
        }
        if (settings?.aiKnowledgeBase?.trim()) {
          activeKnowledgeBase = settings.aiKnowledgeBase.trim();
        }
      }
    } catch (err) {
      console.warn('AI settings cache notice:', err);
    }

    // 2. DYNAMIC LIVE PACKAGES FROM HOSTINGER DATABASE
    let packageInfoText = `
• 1-दिवसीय आवश्यक पिंडदान (1 Day): ₹4,500 — फल्गु नदी, विष्णुपद चरण एवं अक्षयवट (सम्पूर्ण पूजन सामग्री व पंडा दक्षिणा सहित)
• 3-दिवसीय सम्पूर्ण त्रि-स्थली (3 Days): ₹12,500 — 45 वेदियाँ, सम्पूर्ण पार्वण श्राद्ध, एसी वाहन, होटल समन्वय
• NRI रिमोट लाइव स्ट्रीम पिंडदान: ₹8,500 — विदेश में रहने वाले श्रद्धालुओं हेतु 4K लाइव संकल्प व डाक द्वारा प्रसाद
`;

    try {
      const db = prisma as any;
      if (db.ritualPackage) {
        const livePackages = await getCachedData('ai_live_packages', async () => {
          return await db.ritualPackage.findMany({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' }
          });
        }, 120);

        if (livePackages && livePackages.length > 0) {
          packageInfoText = livePackages.map((pkg: any) => {
            return `• ${pkg.title} (${pkg.duration || 'तीर्थ विधि'}): ₹${pkg.priceINR?.toLocaleString('en-IN') || '4,500'} — ${pkg.shortDesc || ''}`;
          }).join('\n');
        }
      }
    } catch (e) {
      console.warn('Dynamic packages fallback notice:', e);
    }

    const dynamicFullPrompt = `
${activeSystemPrompt}

${languageInstruction}

================================================================================
आधिकारिक शास्त्र एवं सरकारी ज्ञान-कोष (Garuda Purana, Vayu Purana & pitrapakshagaya.bihar.gov.in):
================================================================================
${activeKnowledgeBase}

================================================================================
वर्तमान सक्रिय पिंडदान पैकेज एवं आधिकारिक दक्षिणा दरें (Live Database Records):
================================================================================
${packageInfoText}
`;

    // Smart Auto-Lead Detection: Check if phone number is present in message or payload
    const phoneRegex = /(\+?\d{1,4}[-.\s]?)?(\d{10})/;
    const phoneMatch = lastMessage.match(phoneRegex);
    const detectedPhone = userPhone || (phoneMatch ? phoneMatch[0] : null);

    if (detectedPhone && prisma) {
      try {
        const db = prisma as any;
        if (db.lead) {
          // Check if already logged recently
          const existing = await db.lead.findFirst({
            where: { phone: detectedPhone },
            orderBy: { createdAt: 'desc' }
          });

          if (!existing) {
            await db.lead.create({
              data: {
                name: userName || 'Devotee (AI Mitra Chat)',
                phone: detectedPhone,
                city: 'Online Visitor',
                source: 'AI_CHAT_MITRA',
                status: 'NEW',
                notes: `Devotee engaged with AI Pandit Ji. Last query: ${lastMessage.slice(0, 180)}`
              }
            });
          }
        }
      } catch (leadErr) {
        // Non-blocking lead logging
        console.warn('Lead capture background notice:', leadErr);
      }
    }

    // Check if Groq API Key is available
    const groqApiKey = process.env.GROQ_API_KEY;

    if (groqApiKey && !groqApiKey.includes('your_groq_api_key')) {
      // Prioritize lightning-fast verified models on Groq LPUs
      // qwen/qwen3.8-27b: ultra-fast ~300ms direct generation (ideal for voice AI)
      // openai/gpt-oss-120b: deep reasoning model (needs >=800 tokens for reasoning + answer)
      const candidateModels = ['qwen/qwen3.8-27b', 'openai/gpt-oss-120b', 'openai/gpt-oss-20b'];
      
      for (const modelName of candidateModels) {
        try {
          const isReasoningModel = modelName.includes('gpt-oss');
          const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${groqApiKey.trim()}`
            },
            body: JSON.stringify({
              model: modelName,
              messages: [
                { role: 'system', content: dynamicFullPrompt },
                ...sanitizedMessages.slice(-6) // Keep last 6 exchanges with sanitized typos
              ],
              temperature: 0.5,
              max_tokens: isReasoningModel ? 900 : 600
            })
          });

          if (groqResponse.ok) {
            const data = await groqResponse.json();
            const aiReply = data.choices?.[0]?.message?.content?.trim();
            if (aiReply) {
              return NextResponse.json({ reply: aiReply, engine: `groq-${modelName}` });
            }
          } else {
            const errText = await groqResponse.text();
            console.warn(`Groq model ${modelName} returned status ${groqResponse.status}:`, errText.slice(0, 150));
          }
        } catch (groqErr) {
          console.warn(`Groq model ${modelName} error, trying next:`, groqErr);
        }
      }
    }

    // Fallback: In-House Local Vedic Knowledge Base (100% Reliable & Fast)
    const lower = lastMessage.toLowerCase();
    let fallbackReply = 'जय श्री विष्णु! 🙏\nगया जी तीर्थ में पिंडदान से पितरों को शाश्वत वैकुंठ की प्राप्ति होती है। आपके गोत्र संकल्प, सही तिथि एवं प्रामाणिक तीर्थ पंडा सहायता हेतु हमारी टीम 24/7 उपलब्ध है। आप हमें सीधे +91 7463055338 पर कॉल या WhatsApp कर सकते हैं।';

    if (lower.includes('price') || lower.includes('cost') || lower.includes('package') || lower.includes('rate') || lower.includes('पैकेज') || lower.includes('खर्च') || lower.includes('रुपए')) {
      fallbackReply = `जय श्री विष्णु! 🙏\n\nगया जी में पिंडदान के लिए हमारी सभी सेवाएँ 100% पारदर्शी हैं (बिना किसी बिचौलिए या छुपे खर्च के):\n\n${packageInfoText}\n\nक्या आप अपने परिवार के लिए तारीख तय करना चाहते हैं?`;
    } else if (lower.includes('daughter') || lower.includes('girl') || lower.includes('woman') || lower.includes('महिला') || lower.includes('बेटी') || lower.includes('पुत्री')) {
      fallbackReply = 'जय श्री विष्णु! 🙏\n\nहाँ, शास्त्रों में माता सीता द्वारा राजा दशरथ जी का पिंडदान करने का स्पष्ट प्रमाण वाल्मीकि रामायण में मिलता है।\n\nयदि परिवार में पुत्र न हो, तो पुत्री, पत्नी या दौहित्र (नाती) भी पूर्ण विधि-विधान से पिंडदान व तर्पण करने के पूर्ण शास्त्रसम्मत अधिकारी हैं। गया जी में तीर्थ पुरोहित विशेष संकल्प करवाकर यह संस्कार संपन्न कराते हैं।';
    } else if (lower.includes('timing') || lower.includes('time') || lower.includes('समय') || lower.includes('मंदिर खुला')) {
      fallbackReply = 'जय श्री विष्णु! 🙏\n\nविष्णुपद मंदिर प्रतिदिन प्रातः 5:00 बजे से रात्रि 9:00 बजे तक खुला रहता है।\n\nपिंडदान संस्कार के लिए सबसे उत्तम समय प्रातः 6:30 बजे से दोपहर 1:30 बजे तक माना जाता है। मध्याह्न काल (कुतुप व रोहिण मुहूर्त) पितृ तर्पण हेतु सर्वोत्तम फलदायी होता है।';
    } else if (lower.includes('reach') || lower.includes('train') || lower.includes('flight') || lower.includes('airport') || lower.includes('होटल') || lower.includes('स्टेशन')) {
      fallbackReply = 'जय श्री विष्णु! 🙏\n\nगया जी कैसे पहुँचें:\n• ट्रेन द्वारा: गया जंक्शन (GAYA) भारत के सभी प्रमुख शहरों (दिल्ली, मुंबई, कोलकाता, बेंगलुरु) से सीधा जुड़ा है।\n• फ्लाइट द्वारा: गया एयरपोर्ट (GAY) या पटना एयरपोर्ट (PAT)। पटना से गया केवल 1.5 से 2 घंटे की सुगम दूरी पर है।\n\nहमारे पैकेज में स्टेशन/एयरपोर्ट से होटल और मंदिर तक प्राइवेट एसी वाहन की पूर्ण व्यवस्था रहती है।';
    } else if (lower.includes('45') || lower.includes('vedi') || lower.includes('वेदी') || lower.includes('अक्षयवट') || lower.includes('फल्गु')) {
      fallbackReply = 'जय श्री विष्णु! 🙏\n\nगया तीर्थ में कुल 45 वेदियों पर पिंडदान की परम्परा है। इनमें तीन मुख्य वेदियाँ "त्रि-स्थली" कहलाती हैं:\n1. फल्गु नदी (आदि गया घाट): जहाँ बालू का पिंड दिया जाता है।\n2. विष्णुपद मंदिर: जहाँ श्रीहरि के 40 सेमी साक्षात चरण चिह्न विद्यमान हैं।\n3. अक्षयवट: जहाँ पितरों को अक्षय (अमर) तृप्ति मिलती है और तीर्थ पंडा सुफल प्रदान करते हैं।\n\nयदि समय कम हो तो त्रि-स्थली में 1 दिन में, और यदि पूर्ण विधि करनी हो तो 3 दिन में सभी 45 वेदियों की यात्रा होती है।';
    }

    return NextResponse.json({ reply: fallbackReply, engine: 'local-vedic-knowledge' });

  } catch (error: any) {
    console.error('AI Chat handler error:', error);
    return NextResponse.json({
      reply: 'जय श्री विष्णु! 🙏\nगया जी तीर्थ पुरोहित सहायता हेतु आप हमें सीधे कॉल (+91 7463055338) या WhatsApp पर संपर्क कर सकते हैं।',
      engine: 'safety-fallback'
    });
  }
}
