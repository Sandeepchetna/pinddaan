/**
 * Vedic Shastra Rules Engine for Gaya Ji Pind Daan & Pitru Dosha Assessment
 * Based on Garuda Purana, Vayu Purana (Gaya Mahatmya), and Agni Purana guidelines.
 */

export interface DevoteeAnswers {
  relation: 'father' | 'mother' | 'both_parents' | 'grandparents' | 'spouse' | 'extended_ancestors' | 'unmarried_relative';
  circumstance: 'natural_old_age' | 'accidental_untimely' | 'lingering_illness' | 'unknown_circumstances';
  symptoms: string[]; // e.g. ['career_obstacles', 'child_delay', 'frequent_illness', 'disturbed_dreams', 'family_discord']
  priorRituals: 'first_time_gaya' | 'done_elsewhere' | 'annual_only' | 'never_done';
  gotra?: string;
  devoteeCity?: string;
}

export interface VedicDiagnosisReport {
  doshaGrade: 'None / Peaceful Lineage' | 'Mild Pitru Rina' | 'Moderate Pitru Dosha' | 'Acute / Akaal Pitru Dosha';
  doshaSeverity: 'low' | 'medium' | 'high' | 'critical';
  recommendedPackage: {
    id: string;
    title: string;
    hindiTitle: string;
    slug: string;
    estimatedDakshina: number;
    durationDays: number;
    primaryVedicRitual: string;
    reasoning: string;
    englishReasoning?: string;
  };
  mandatoryVedis: Array<{
    name: string;
    hindiName: string;
    significance: string;
    englishSignificance?: string;
  }>;
  recommendedTithis: Array<{
    occasion: string;
    date: string;
    shastraMerit: string;
  }>;
  sankalpGuidance: string;
  garudaPuranaCitation: string;
}

export function assessVedicMokshaPath(
  answers: DevoteeAnswers,
  dynamicPackages?: any[]
): VedicDiagnosisReport {
  const isUntimely = answers.circumstance === 'accidental_untimely';
  const hasSevereSymptoms = answers.symptoms.includes('child_delay') || answers.symptoms.includes('disturbed_dreams');
  const symptomCount = answers.symptoms.length;

  // Helper to find live database package price
  const findLivePackage = (slugPart: string, defaultPrice: number, defaultTitle: string) => {
    if (!dynamicPackages || dynamicPackages.length === 0) {
      return { price: defaultPrice, title: defaultTitle };
    }
    const matched = dynamicPackages.find(p => p.slug?.includes(slugPart) || p.title?.toLowerCase().includes(slugPart));
    return {
      price: matched?.priceINR || defaultPrice,
      title: matched?.title || defaultTitle
    };
  };

  // 1. Determine Pitru Dosha Grade
  let doshaGrade: VedicDiagnosisReport['doshaGrade'] = 'Mild Pitru Rina';
  let doshaSeverity: VedicDiagnosisReport['doshaSeverity'] = 'low';

  if (isUntimely) {
    doshaGrade = 'Acute / Akaal Pitru Dosha';
    doshaSeverity = 'critical';
  } else if (symptomCount >= 3 || hasSevereSymptoms) {
    doshaGrade = 'Moderate Pitru Dosha';
    doshaSeverity = 'high';
  } else if (symptomCount >= 1) {
    doshaGrade = 'Mild Pitru Rina';
    doshaSeverity = 'medium';
  } else {
    doshaGrade = 'None / Peaceful Lineage';
    doshaSeverity = 'low';
  }

  // 2. Determine Package & Primary Ritual (Connecting with Live Database)
  let recommendedPackage: VedicDiagnosisReport['recommendedPackage'];

  if (isUntimely) {
    const livePkg = findLivePackage('tri-sthali', 14500, 'Tripindi Shradh & Narayan Bali Vidhi');
    recommendedPackage = {
      id: 'tripindi_narayan_bali',
      title: livePkg.title || 'Tripindi Shradh & Narayan Bali Vidhi',
      hindiTitle: 'त्रिपिंडी श्राद्ध एवं नारायण बलि विधान',
      slug: '3-day-complete-tri-sthali',
      estimatedDakshina: livePkg.price > 12500 ? livePkg.price + 2000 : 14500,
      durationDays: 3,
      primaryVedicRitual: 'Pretshila Pind Daan + Brahma Kund Snan + Tripindi Vidhi',
      reasoning: 'गरुड़ पुराण के अनुसार अकाल या असमय मृत्यु होने पर आत्मा प्रेत योनि से मुक्ति पाने हेतु त्रिपिंडी और प्रेतशिला पिंडदान अनिवार्य रूप से मांगती है।',
      englishReasoning: 'According to Garuda Purana (Pretakalpa), in cases of untimely, accidental, or unnatural demise, the departed soul requires Tripindi Shradh and Pretshila Pind Daan to attain complete liberation from the ghostly realm (Preta Yoni).'
    };
  } else if (answers.relation === 'both_parents' || answers.relation === 'grandparents' || answers.priorRituals === 'first_time_gaya') {
    const livePkg = findLivePackage('tri-sthali', 12500, '3-Day Complete Tri-Sthali Pilgrimage');
    recommendedPackage = {
      id: 'tri_sthali_complete',
      title: livePkg.title,
      hindiTitle: '3-दिवसीय सम्पूर्ण त्रि-स्थली महातीर्थ पिंडदान',
      slug: '3-day-complete-tri-sthali',
      estimatedDakshina: livePkg.price,
      durationDays: 3,
      primaryVedicRitual: 'Parvana Shradh at all 45 Sacred Vedis',
      reasoning: 'वायु पुराण के अनुसार प्रथम बार गया तीर्थ आने वाले कुलवंशियों को 45 वेदियों पर त्रि-स्थली (फल्गु, विष्णुपद, अक्षयवट) सहित सम्पूर्ण पार्वण श्राद्ध करना चाहिए, जिससे 101 कुलों का उद्धार होता है।',
      englishReasoning: 'According to Vayu Purana (Gaya Mahatmya), first-time pilgrims should perform comprehensive Parvana Shradh across the 45-Vedi trail including the core Tri-Sthali (Falgu, Vishnupad, Akshayavat), liberating 101 generations of ancestors.'
    };
  } else {
    const livePkg = findLivePackage('essential', 4500, '1-Day Essential Pind Daan');
    recommendedPackage = {
      id: '1_day_essential',
      title: livePkg.title,
      hindiTitle: '1-दिवसीय आवश्यक पिंडदान (त्रि-स्थली)',
      slug: '1-day-essential-pind-daan',
      estimatedDakshina: livePkg.price,
      durationDays: 1,
      primaryVedicRitual: 'Ekoddishta / Parvana Shradh at Vishnupad & Falgu',
      reasoning: 'समय के अभाव अथवा नियमित वार्षिक तर्पण हेतु फल्गु तट, विष्णुपद चरण चिह्न एवं अक्षयवट के समक्ष एक-दिवसीय संकल्प पूर्णतः शास्त्रसम्मत है।',
      englishReasoning: 'For tight travel schedules or regular annual pitru remembrance, performing sacred rites at the core Tri-Sthali (Falgu River, Lord Vishnupad footprints, and Akshayavat) is completely scripturally valid.'
    };
  }

  // 3. Select Mandatory Sacred Vedis out of Gaya's 45 Vedis
  const mandatoryVedis: VedicDiagnosisReport['mandatoryVedis'] = [
    {
      name: 'Falgu River (Adi Gaya Ghat)',
      hindiName: 'फल्गु नदी (आदि गया घाट)',
      significance: 'माता सीता द्वारा बालू से पिंडदान करने का शाश्वत स्थल। यहाँ पहला पिंडदान और आचमन संकल्प होता है।',
      englishSignificance: 'Sacred site where Devi Sita performed pind daan with sand. The first pind offering and purifying achaman take place here.'
    },
    {
      name: 'Vishnupad Temple (Sacred Lotus Footprints)',
      hindiName: 'विष्णुपद मंदिर (श्रीहरि चरण चिह्न)',
      significance: 'गयासुर की छाती पर स्थित भगवान विष्णु के 40 सेमी पावन चरण। यहाँ पिंडदान से सीधे वैकुंठ प्राप्ति मानी जाती है।',
      englishSignificance: 'Lord Vishnu 40cm divine footprint on Gayasur chest. Offering pinda here grants immediate liberation to Vaikuntha.'
    },
    {
      name: 'Akshayavat (Undying Banyan Tree)',
      hindiName: 'अक्षयवट (अमर वटवृक्ष)',
      significance: 'यहाँ पिंडदान का फल अक्षय (कभी समाप्त न होने वाला) होता है। तीर्थ पंडा द्वारा सुफल (आशीर्वाद) यहीं प्राप्त होता है।',
      englishSignificance: 'The immortal banyan tree where pind daan yields everlasting merit. Devotees receive the sacred Sufal blessing from Teerth Purohits here.'
    }
  ];

  if (isUntimely || doshaSeverity === 'critical' || doshaSeverity === 'high') {
    mandatoryVedis.push({
      name: 'Pretshila Hill (Ghost Stone Vedi)',
      hindiName: 'प्रेतशिला पहाड़ी (प्रेत योनि मुक्ति)',
      significance: 'अकाल मृत्यु, अस्वाभाविक देहावसान अथवा अशांत आत्माओं को प्रेत योनि से तत्काल मुक्त कराने वाली सर्वोच्च वेदी।',
      englishSignificance: 'The premier 540ft hill vedi specifically designated for liberating unquiet souls from untimely or unnatural passing.'
    });
    mandatoryVedis.push({
      name: 'Brahma Kund & Ramgaya',
      hindiName: 'ब्रह्म कुंड एवं रामगया वेदी',
      significance: 'जहाँ भगवान श्री राम ने राजा दशरथ का पिंडदान किया था। कुलदोष एवं अज्ञात पापों के शमन की वेदी।',
      englishSignificance: 'Sacred pool where Bhagwan Shri Ram performed rites for King Dasharatha, expiating lingering family karma.'
    });
  }

  // 4. Upcoming Shubh Tithis Calendar
  const recommendedTithis = [
    {
      occasion: 'Upcoming Amavasya Tithi (दर्श अमावस्या)',
      date: 'Monthly Pradosh / Amavasya Period',
      shastraMerit: 'मासिक अमावस्या पर किया गया पिंडदान पितरों को एक माह तक तृप्ति प्रदान करता है।'
    },
    {
      occasion: 'Somvati Amavasya (सोमवती अमावस्या महायोग)',
      date: 'Most Auspicious 2026 Tithi',
      shastraMerit: 'पीपल एवं अक्षयवट पूजन के साथ किया गया श्राद्ध 1000 गोदान के तुल्य पुण्यदायी है।'
    },
    {
      occasion: 'Pitru Paksha Mahaparv 2026 (पितृपक्ष महामेला)',
      date: 'Bhadrapada Purnima to Sarva Pitru Amavasya',
      shastraMerit: 'सूर्य के कन्या राशि में प्रवेश पर सम्पूर्ण पितृलोक गया तीर्थ में वास करता है।'
    }
  ];

  // 5. Sankalp Guidance text
  const sankalpGuidance = `ॐ अद्य अमुक गोत्रस्य (गोत्र: ${answers.gotra || '[आपका गोत्र]'}), अमुक प्रेतस्य तृप्त्यर्थे, गया तीर्थे श्री विष्णुपद सान्निध्ये, पितृ उद्धार कामनार्थे, यथा विधि पिंडदान श्राद्ध कर्माहं करिष्ये।`;

  // 6. Garuda Purana Citation
  const garudaPuranaCitation = isUntimely
    ? '“प्रेतलोके महादुःखे यः पतति मानुषः। प्रेतशिलायां पिण्डेन तस्य मुक्तिर्न संशयः॥” (गरुड़ पुराण)'
    : '“गया श्राद्धं कृतं येन मुक्तिस्तस्य न संशयः। कुलमेकशतं चैव तारयेत् पितृसंयुतम्॥” (वायु पुराण - गया माहात्म्य)';

  return {
    doshaGrade,
    doshaSeverity,
    recommendedPackage,
    mandatoryVedis,
    recommendedTithis,
    sankalpGuidance,
    garudaPuranaCitation
  };
}
