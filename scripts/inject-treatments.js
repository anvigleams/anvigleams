const fs = require('fs');

const en = {
  'treatments.title': 'Our Treatments',
  'treatments.subtitle': 'Discover our range of advanced clinical treatments designed to bring out your best skin.',
  'treatments.learn_more': 'Learn More',
  'treatments.view_all': 'View All Treatments',
};

const hi = {
  'treatments.title': 'हमारे उपचार',
  'treatments.subtitle': 'अपनी सबसे अच्छी त्वचा लाने के लिए डिज़ाइन किए गए उन्नत नैदानिक उपचारों की हमारी श्रृंखला की खोज करें।',
  'treatments.learn_more': 'और जानें',
  'treatments.view_all': 'सभी उपचार देखें',
};

const mr = {
  'treatments.title': 'आमचे उपचार',
  'treatments.subtitle': 'तुमची सर्वोत्तम त्वचा बाहेर आणण्यासाठी डिझाइन केलेल्या प्रगत क्लिनिकल उपचारांची आमची श्रेणी शोधा.',
  'treatments.learn_more': 'अधिक जाणून घ्या',
  'treatments.view_all': 'सर्व उपचार पहा',
};

const treatments = [
  {
    slug: 'acne-treatment',
    name: 'Acne Treatment',
    hi_name: 'मुँहासे का इलाज',
    mr_name: 'मुरुमांचा उपचार',
    desc: 'Our advanced acne treatment combines the latest dermatological techniques with premium skincare formulations to clear existing breakouts, reduce inflammation, and prevent future acne formation.',
    hi_desc: 'हमारा उन्नत मुँहासे उपचार मौजूदा मुँहासों को साफ करने, सूजन को कम करने और भविष्य में मुँहासे बनने से रोकने के लिए प्रीमियम स्किनकेयर फॉर्मूलेशन के साथ नवीनतम त्वचा संबंधी तकनीकों को जोड़ता है।',
    mr_desc: 'आमचे प्रगत मुरुम उपचार विद्यमान मुरुमे साफ करण्यासाठी, जळजळ कमी करण्यासाठी आणि भविष्यात मुरुमे तयार होण्यापासून रोखण्यासाठी प्रीमियम स्किनकेअर फॉर्म्युलेशनसह नवीनतम त्वचाविषयक तंत्रांची जोड देते.',
    benefits: ['Clears existing breakouts fast', 'Reduces redness & inflammation'],
    hi_benefits: ['मौजूदा मुँहासों को तेजी से साफ करता है', 'लालिमा और सूजन को कम करता है'],
    mr_benefits: ['विद्यमान मुरुमे वेगाने साफ करते', 'लालसरपणा आणि जळजळ कमी करते']
  },
  {
    slug: 'pigmentation-treatment',
    name: 'Pigmentation Treatment',
    hi_name: 'रंजकता उपचार',
    mr_name: 'पिगमेंटेशन उपचार',
    desc: 'Target uneven skin tone, dark spots, melasma, and sun damage with our precision pigmentation correction protocol.',
    hi_desc: 'हमारे सटीक रंजकता सुधार प्रोटोकॉल के साथ असमान त्वचा टोन, काले धब्बे, मेलास्मा और सूरज की क्षति को लक्षित करें।',
    mr_desc: 'आमच्या अचूक पिगमेंटेशन सुधारणा प्रोटोकॉलसह असमान त्वचा टोन, गडद डाग, मेलास्मा आणि सूर्याच्या नुकसानास लक्ष्य करा.',
    benefits: ['Fades dark spots & melasma', 'Evens out skin complexion'],
    hi_benefits: ['काले धब्बे और मेलास्मा को हल्का करता है', 'त्वचा के रंग को समान करता है'],
    mr_benefits: ['गडद डाग आणि मेलास्मा फिकट करते', 'त्वचेचा रंग समान करते']
  },
  {
    slug: 'scar-reduction-treatment',
    name: 'Scar Reduction Treatment',
    hi_name: 'निशान कम करने का उपचार',
    mr_name: 'डाग कमी करण्याचा उपचार',
    desc: 'Clinically proven micro-needling and advanced resurfacing techniques to visibly reduce the appearance of acne scars, surgical scars, and stretch marks.',
    hi_desc: 'मुँहासे के निशान, सर्जिकल निशान और खिंचाव के निशान की उपस्थिति को कम करने के लिए चिकित्सकीय रूप से सिद्ध माइक्रो-नीडलिंग और उन्नत रिसर्फेसिंग तकनीकें।',
    mr_desc: 'मुरुमांचे डाग, शस्त्रक्रियेचे डाग आणि स्ट्रेच मार्क्सचे स्वरूप लक्षणीयरीत्या कमी करण्यासाठी वैद्यकीयदृष्ट्या सिद्ध मायक्रो-नीडलिंग आणि प्रगत रीसर्फेसिंग तंत्रे.',
    benefits: ['Reduces scar depth & visibility', 'Stimulates collagen production'],
    hi_benefits: ['निशान की गहराई और दृश्यता को कम करता है', 'कोलेजन उत्पादन को उत्तेजित करता है'],
    mr_benefits: ['डागांची खोली आणि दृश्यमानता कमी करते', 'कोलेजन उत्पादनास उत्तेजन देते']
  },
  {
    slug: 'full-body-miracle-treatment',
    name: 'Full Body Miracle Treatment',
    hi_name: 'फुल बॉडी मिरेकल ट्रीटमेंट',
    mr_name: 'फुल बॉडी मिरेकल ट्रीटमेंट',
    desc: 'Our most luxurious offering — a head-to-toe skin transformation experience. Deep-cleanse, exfoliate, hydrate, and rejuvenate your entire body.',
    hi_desc: 'हमारी सबसे शानदार पेशकश - सिर से पैर तक त्वचा परिवर्तन का अनुभव। अपने पूरे शरीर को गहराई से साफ, एक्सफोलिएट, हाइड्रेट और फिर से जीवंत करें।',
    mr_desc: 'आमची सर्वात आलिशान ऑफर — डोक्यापासून पायापर्यंत त्वचा परिवर्तनाचा अनुभव. आपले संपूर्ण शरीर खोलवर स्वच्छ करा, एक्सफोलिएट करा, हायड्रेट करा आणि टवटवीत करा.',
    benefits: ['Head-to-toe rejuvenation', 'Deep body exfoliation'],
    hi_benefits: ['सिर से पैर तक कायाकल्प', 'गहरा शरीर एक्सफोलिएशन'],
    mr_benefits: ['डोक्यापासून पायापर्यंत टवटवीतपणा', 'खोल शरीर एक्सफोलिएशन']
  },
  {
    slug: 'skin-tightening',
    name: 'Skin Tightening',
    hi_name: 'त्वचा में कसाव',
    mr_name: 'त्वचा घट्ट करणे',
    desc: 'Non-surgical radiofrequency and ultrasound-based skin tightening to firm sagging skin, define facial contours, and restore youthful elasticity.',
    hi_desc: 'झुकती त्वचा को दृढ़ करने, चेहरे की रूपरेखा को परिभाषित करने और युवा लोच को बहाल करने के लिए गैर-सर्जिकल रेडियोफ्रीक्वेंसी और अल्ट्रासाउंड-आधारित त्वचा कसाव।',
    mr_desc: 'लटकणाऱ्या त्वचेला घट्ट करण्यासाठी, चेहऱ्याचे स्वरूप परिभाषित करण्यासाठी आणि तरुण लवचिकता पुनर्संचयित करण्यासाठी नॉन-सर्जिकल रेडिओफ्रिक्वेंसी आणि अल्ट्रासाऊंड-आधारित त्वचा घट्ट करणे.',
    benefits: ['Firms & lifts sagging skin', 'Defines jaw & neck contour'],
    hi_benefits: ['झुकती त्वचा को दृढ़ और ऊपर उठाता है', 'जबड़े और गर्दन की रूपरेखा को परिभाषित करता है'],
    mr_benefits: ['लटकणाऱ्या त्वचेला घट्ट करते आणि उचलते', 'जबडा आणि मानेचे स्वरूप परिभाषित करते']
  },
  {
    slug: 'skin-brightening-and-lightening',
    name: 'Skin Brightening and Lightening',
    hi_name: 'स्किन ब्राइटनिंग और लाइटनिंग',
    mr_name: 'स्किन ब्राइटनिंग आणि लाइटनिंग',
    desc: 'Restore your skin\'s natural, luminous glow with our skin brightening treatment. It gently exfoliates dull surface cells and infuses illuminating serums.',
    hi_desc: 'हमारे स्किन ब्राइटनिंग उपचार के साथ अपनी त्वचा की प्राकृतिक, चमकदार चमक को बहाल करें। यह धीरे-धीरे सुस्त सतह की कोशिकाओं को एक्सफोलिएट करता है और चमकदार सीरम भरता है।',
    mr_desc: 'आमच्या स्किन ब्राइटनिंग उपचाराने तुमच्या त्वचेची नैसर्गिक, चमकदार चमक पुनर्संचयित करा. हे हळूवारपणे निस्तेज पृष्ठभागाच्या पेशींना एक्सफोलिएट करते आणि प्रकाशमान सीरम ओतते.',
    benefits: ['Restores natural glow', 'Reduces dullness'],
    hi_benefits: ['प्राकृतिक चमक को बहाल करता है', 'सुस्तपन को कम करता है'],
    mr_benefits: ['नैसर्गिक चमक पुनर्संचयित करते', 'निस्तेजपणा कमी करते']
  },
  {
    slug: 'hydra-facial',
    name: 'Hydra Facial',
    hi_name: 'हाइड्रा फेशियल',
    mr_name: 'हायड्रा फेशियल',
    desc: 'The globally acclaimed Hydra Facial uses patented technology to cleanse, extract, and hydrate skin in one powerful step.',
    hi_desc: 'विश्व स्तर पर प्रशंसित हाइड्रा फेशियल पेटेंट तकनीक का उपयोग करके एक शक्तिशाली कदम में त्वचा को साफ, निकालने और हाइड्रेट करने के लिए करता है।',
    mr_desc: 'जागतिक स्तरावर प्रशंसित हायड्रा फेशियल एका शक्तिशाली टप्प्यात त्वचा स्वच्छ करण्यासाठी, काढण्यासाठी आणि हायड्रेट करण्यासाठी पेटंट तंत्रज्ञानाचा वापर करते.',
    benefits: ['Instantly clearer skin', 'Deep pore cleansing'],
    hi_benefits: ['तुरंत स्पष्ट त्वचा', 'गहरी ताकना सफाई'],
    mr_benefits: ['त्वरित स्पष्ट त्वचा', 'खोल छिद्र साफ करणे']
  },
  {
    slug: 'carbon-facial',
    name: 'Carbon Facial',
    hi_name: 'कार्बन फेशियल',
    mr_name: 'कार्बन फेशियल',
    desc: 'Known as the "Hollywood Peel," the Carbon Facial deeply purifies pores, reduces oiliness, and creates a porcelain-like finish using advanced laser technology.',
    hi_desc: '"हॉलीवुड पील" के रूप में जाना जाता है, कार्बन फेशियल छिद्रों को गहराई से शुद्ध करता है, तैलीयपन को कम करता है, और उन्नत लेजर तकनीक का उपयोग करके चीनी मिट्टी के बरतन जैसी फिनिश बनाता है।',
    mr_desc: '"हॉलीवूड पील" म्हणून ओळखले जाणारे, कार्बन फेशियल प्रगत लेसर तंत्रज्ञानाचा वापर करून छिद्रे खोलवर शुद्ध करते, तेलकटपणा कमी करते आणि पोर्सिलेनसारखी फिनिश तयार करते.',
    benefits: ['Deep pore purification', 'Reduces oiliness'],
    hi_benefits: ['गहरी ताकना शुद्धि', 'तैलीयपन को कम करता है'],
    mr_benefits: ['खोल छिद्र शुद्धीकरण', 'तेलकटपणा कमी करते']
  },
  {
    slug: 'medi-facial',
    name: 'Medi Facial',
    hi_name: 'मेडी फेशियल',
    mr_name: 'मेडी फेशियल',
    desc: 'A medical-grade facial tailored by our expert to treat specific skin concerns using clinical-strength active ingredients.',
    hi_desc: 'नैदानिक-शक्ति सक्रिय तत्वों का उपयोग करके विशिष्ट त्वचा चिंताओं के इलाज के लिए हमारे विशेषज्ञ द्वारा तैयार किया गया एक चिकित्सा-ग्रेड फेशियल।',
    mr_desc: 'वैद्यकीय-शक्ती सक्रिय घटकांचा वापर करून विशिष्ट त्वचेच्या समस्यांवर उपचार करण्यासाठी आमच्या तज्ञांनी तयार केलेले वैद्यकीय-दर्जाचे फेशियल.',
    benefits: ['Clinical-grade ingredients', 'Tailored to your skin'],
    hi_benefits: ['नैदानिक-ग्रेड सामग्री', 'आपकी त्वचा के अनुरूप'],
    mr_benefits: ['क्लिनिकल-ग्रेड घटक', 'तुमच्या त्वचेनुसार तयार केलेले']
  },
  {
    slug: 'mole-removal',
    name: 'Mole Removal',
    hi_name: 'तिल हटाना',
    mr_name: 'तीळ काढणे',
    desc: 'Safe, precise, and virtually scarless removal of unwanted moles and skin tags using advanced dermatological tools.',
    hi_desc: 'उन्नत त्वचा संबंधी उपकरणों का उपयोग करके अवांछित मोल्स और स्किन टैग को सुरक्षित, सटीक और वस्तुतः बिना निशान के हटाना।',
    mr_desc: 'प्रगत त्वचाविषयक साधनांचा वापर करून नको असलेले तीळ आणि स्किन टॅग सुरक्षित, अचूक आणि जवळजवळ डाग नसलेले काढणे.',
    benefits: ['Safe & precise', 'Virtually scarless'],
    hi_benefits: ['सुरक्षित और सटीक', 'वस्तुतः बिना निशान के'],
    mr_benefits: ['सुरक्षित आणि अचूक', 'जवळजवळ डाग नसलेले']
  },
  {
    slug: 'hair-removal',
    name: 'Hair Removal',
    hi_name: 'बाल हटाना',
    mr_name: 'केस काढणे',
    desc: 'Advanced laser hair reduction for smooth, hair-free skin. Safe for all skin tones and provides long-lasting results.',
    hi_desc: 'चिकनी, बालों से मुक्त त्वचा के लिए उन्नत लेजर बालों में कमी। सभी त्वचा टोन के लिए सुरक्षित और लंबे समय तक चलने वाले परिणाम प्रदान करता है।',
    mr_desc: 'गुळगुळीत, केस विरहित त्वचेसाठी प्रगत लेसर केस कमी करणे. सर्व त्वचा टोनसाठी सुरक्षित आणि दीर्घकाळ टिकणारे परिणाम देते.',
    benefits: ['Long-lasting hair reduction', 'Safe for all skin types'],
    hi_benefits: ['लंबे समय तक चलने वाले बालों में कमी', 'सभी प्रकार की त्वचा के लिए सुरक्षित'],
    mr_benefits: ['दीर्घकाळ टिकणारे केस कमी करणे', 'सर्व प्रकारच्या त्वचेसाठी सुरक्षित']
  }
];

treatments.forEach(t => {
  const key = `treatment.${t.slug.replace(/-/g, '_')}`;
  en[key] = t.name;
  en[`${key}_desc`] = t.desc;
  en[`${key}_benefit_0`] = t.benefits[0];
  en[`${key}_benefit_1`] = t.benefits[1];

  hi[key] = t.hi_name;
  hi[`${key}_desc`] = t.hi_desc;
  hi[`${key}_benefit_0`] = t.hi_benefits[0];
  hi[`${key}_benefit_1`] = t.hi_benefits[1];

  mr[key] = t.mr_name;
  mr[`${key}_desc`] = t.mr_desc;
  mr[`${key}_benefit_0`] = t.mr_benefits[0];
  mr[`${key}_benefit_1`] = t.mr_benefits[1];
});

let fileContent = fs.readFileSync('src/lib/translations.ts', 'utf8');

function injectTranslations(lang, dict) {
  let entries = Object.entries(dict).map(([k, v]) => `    '${k}': '${v.replace(/'/g, "\\'")}',`).join('\n');
  const sectionComment = `    // Treatments Dynamic\n${entries}\n`;
  const targetStr = `  ${lang}: {\n`;
  fileContent = fileContent.replace(targetStr, targetStr + sectionComment);
}

injectTranslations('en', en);
injectTranslations('hi', hi);
injectTranslations('mr', mr);

fs.writeFileSync('src/lib/translations.ts', fileContent);
console.log('Translations injected successfully!');
