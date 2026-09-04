import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCachedData } from '@/lib/dbCache';

// Deep Gaya Shastra & Tirth Purohit System Instructions Base
const GAYA_PUROHIT_BASE_PROMPT = `
आप "पंडित जी AI" (PindDaanWale.com के प्रामाणिक गया जी तीर्थ पुरोहित एवं वैदिक मार्गदर्शक) हैं।
आपका कार्य गया तीर्थ, पिंडदान, श्राद्ध, तर्पण, गोत्र संकल्प और विष्णुपद मंदिर के संदर्भ में श्रद्धालुओं का प्रामाणिक, संवेदनशील एवं शास्त्रसम्मत मार्गदर्शन करना है।

मुख्य नियम एवं मर्यादा:
1. अभिवादन: सदैव आदरपूर्वक 'जय श्री विष्णु! 🙏' या 'प्रणाम! 🙏' से शुरुआत करें।
2. भाषा: श्रद्धालु जिस भाषा में पूछे (हिंदी, हिंग्लिश, या अंग्रेज़ी), उसी में सरल, मधुर एवं आत्मीय भाषा में उत्तर दें।
3. प्रामाणिकता (शास्त्र): गरुड़ पुराण, वायु पुराण (गया माहात्म्य) के आधार पर उत्तर दें।
4. मुख्य तीन वेदियाँ (त्रि-स्थली): 1. फल्गु नदी (आदि गया), 2. विष्णुपद मंदिर (भगवान विष्णु के चरण चिह्न), 3. अक्षयवट (अमर वटवृक्ष जहाँ सुफल प्राप्त होता है)। कुल 45 वेदियाँ हैं।
5. वरिष्ठ नागरिकों हेतु सुविधा: ई-रिक्शा, व्हीलचेयर एवं सुगम दर्शन सहायता।
6. संपर्क व सहायता: श्रद्धालु को बताएं कि वे सीधे कॉल (+91 7463055338) कर सकते हैं या WhatsApp पर बात कर सकते हैं।
7. उत्तर संक्षिप्त (2-4 पैराग्राफ), स्पष्ट एवं अत्यंत विनम्र रखें। अनावश्यक बातें न जोड़ें।
`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages = [], userPhone = '', userName = '' } = body;

    const lastMessage = messages[messages.length - 1]?.content || '';

    // DYNAMIC LIVE PACKAGES FROM HOSTINGER DATABASE
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

    const dynamicSystemPrompt = `
${GAYA_PUROHIT_BASE_PROMPT}

पारदर्शी पैकेज व दक्षिणा (Live Database Pricing - कोई मोलभाव या बिचौलिया नहीं):
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
      // Available model candidates on Groq LPUs
      const candidateModels = ['openai/gpt-oss-120b', 'llama-3.3-70b-versatile', 'openai/gpt-oss-20b', 'qwen/qwen3.8-27b'];
      
      for (const modelName of candidateModels) {
        try {
          const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${groqApiKey.trim()}`
            },
            body: JSON.stringify({
              model: modelName,
              messages: [
                { role: 'system', content: dynamicSystemPrompt },
                ...messages.slice(-6) // Keep last 6 exchanges for context
              ],
              temperature: 0.5,
              max_tokens: 700
            })
          });

          if (groqResponse.ok) {
            const data = await groqResponse.json();
            const aiReply = data.choices?.[0]?.message?.content;
            if (aiReply) {
              return NextResponse.json({ reply: aiReply, engine: `groq-${modelName}` });
            }
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
