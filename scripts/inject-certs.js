const fs = require('fs');

const certs = [
  {
    id: 'cosmetology',
    en_title: 'Diploma in Cosmetology',
    en_short: 'Foundation in professional beauty science.',
    en_full: 'A comprehensive foundation programme covering skin anatomy, advanced facial treatments, chemical peels, hair care science, and professional salon techniques. This diploma forms the bedrock of evidence-based skin and beauty practice.',
    hi_title: 'कॉस्मेटोलॉजी में डिप्लोमा',
    hi_short: 'पेशेवर सौंदर्य विज्ञान में आधार।',
    hi_full: 'त्वचा शरीर रचना विज्ञान, उन्नत चेहरे के उपचार, रासायनिक छिलके, बालों की देखभाल विज्ञान और पेशेवर सैलून तकनीकों को कवर करने वाला एक व्यापक आधार कार्यक्रम। यह डिप्लोमा साक्ष्य-आधारित त्वचा और सौंदर्य अभ्यास का आधार बनता है।',
    mr_title: 'कॉस्मेटोलॉजीमध्ये डिप्लोमा',
    mr_short: 'व्यावसायिक सौंदर्य विज्ञानाचा पाया.',
    mr_full: 'त्वचेची शरीररचना, प्रगत चेहऱ्यावरील उपचार, केमिकल पील्स, केस निगा विज्ञान आणि व्यावसायिक सलून तंत्र समाविष्ट करणारा एक सर्वसमावेशक पायाभूत कार्यक्रम. हा डिप्लोमा पुरावा-आधारित त्वचा आणि सौंदर्य सरावाचा पाया बनवतो.'
  },
  {
    id: 'facial-aesthetics',
    en_title: 'Master Course in Facial Aesthetics',
    en_short: 'Advanced non-surgical facial enhancement.',
    en_full: 'An advanced professional course covering non-surgical facial enhancement techniques including advanced facial massage, contouring, anti-ageing protocols, skin rejuvenation, and personalised treatment planning for diverse skin types.',
    hi_title: 'फेशियल एस्थेटिक्स में मास्टर कोर्स',
    hi_short: 'उन्नत गैर-सर्जिकल चेहरे की वृद्धि।',
    hi_full: 'उन्नत चेहरे की मालिश, कंटूरिंग, एंटी-एजिंग प्रोटोकॉल, त्वचा कायाकल्प, और विविध प्रकार की त्वचा के लिए व्यक्तिगत उपचार योजना सहित गैर-सर्जिकल चेहरे को बढ़ाने वाली तकनीकों को कवर करने वाला एक उन्नत पेशेवर पाठ्यक्रम।',
    mr_title: 'फेशियल एस्थेटिक्समध्ये मास्टर कोर्स',
    mr_short: 'प्रगत गैर-सर्जिकल फेशियल एन्हांसमेंट.',
    mr_full: 'प्रगत फेशियल मसाज, कंटूरिंग, अँटी-एजिंग प्रोटोकॉल, त्वचा टवटवीत करणे आणि विविध प्रकारच्या त्वचेसाठी वैयक्तिक उपचार नियोजनासह नॉन-सर्जिकल फेशियल एन्हांसमेंट तंत्रांचा समावेश असलेला प्रगत व्यावसायिक अभ्यासक्रम.'
  },
  {
    id: 'semi-permanent-makeup',
    en_title: 'Master Course in Semi-Permanent Makeup',
    en_short: 'Precision artistry in long-lasting beauty.',
    en_full: 'Professional training in semi-permanent makeup techniques including microblading, ombre brows, lip blush, and eyeliner procedures. Covers colour theory, skin undertones, safety protocols, and client consultation for lasting, natural results.',
    hi_title: 'सेमी-परमानेंट मेकअप में मास्टर कोर्स',
    hi_short: 'लंबे समय तक चलने वाली सुंदरता में सटीक कलात्मकता।',
    hi_full: 'माइक्रोब्लेडिंग, ओम्ब्रे ब्रो, लिप ब्लश और आईलाइनर प्रक्रियाओं सहित अर्ध-स्थायी मेकअप तकनीकों में व्यावसायिक प्रशिक्षण। स्थायी, प्राकृतिक परिणामों के लिए रंग सिद्धांत, त्वचा के अंडरटोन, सुरक्षा प्रोटोकॉल और ग्राहक परामर्श को शामिल करता है।',
    mr_title: 'सेमी-परमनंट मेकअपमध्ये मास्टर कोर्स',
    mr_short: 'दीर्घकाळ टिकणाऱ्या सौंदर्यात अचूक कलात्मकता.',
    mr_full: 'मायक्रोब्लेडिंग, ओम्ब्रे ब्राईज, लिप ब्लश आणि आयलायनर प्रक्रियेसह अर्ध-कायम मेकअप तंत्रांमध्ये व्यावसायिक प्रशिक्षण. चिरस्थायी, नैसर्गिक परिणामांसाठी रंग सिद्धांत, त्वचेचे अंडरटोन, सुरक्षा प्रोटोकॉल आणि क्लायंट सल्लामसलत समाविष्ट करते.'
  },
  {
    id: 'trichology',
    en_title: 'Master Course in Trichology',
    en_short: 'Science-based scalp & hair care expertise.',
    en_full: 'A specialist programme in trichology covering the science of hair and scalp health. Topics include hair loss diagnosis, scalp conditions, PRP preparation, hair growth treatments, and nutritional guidance for optimal hair wellness.',
    hi_title: 'ट्राइकोलॉजी में मास्टर कोर्स',
    hi_short: 'विज्ञान-आधारित खोपड़ी और बालों की देखभाल विशेषज्ञता।',
    hi_full: 'बालों और खोपड़ी के स्वास्थ्य के विज्ञान को कवर करने वाले ट्राइकोलॉजी में एक विशेषज्ञ कार्यक्रम। विषयों में बालों के झड़ने का निदान, खोपड़ी की स्थिति, पीआरपी की तैयारी, बालों के विकास के उपचार, और इष्टतम बालों के स्वास्थ्य के लिए पोषण मार्गदर्शन शामिल हैं।',
    mr_title: 'ट्रायकोलॉजीमध्ये मास्टर कोर्स',
    mr_short: 'विज्ञान-आधारित टाळू आणि केस निगा कौशल्य.',
    mr_full: 'केस आणि टाळूच्या आरोग्याच्या विज्ञानाचा समावेश असलेला ट्रायकोलॉजीमधील एक विशेषज्ञ कार्यक्रम. विषयांमध्ये केस गळतीचे निदान, टाळूची स्थिती, पीआरपी तयार करणे, केसांच्या वाढीचे उपचार आणि इष्टतम केस निरोगीपणासाठी पौष्टिक मार्गदर्शन यांचा समावेश आहे.'
  }
];

const en = {};
const hi = {};
const mr = {};

certs.forEach(c => {
  const key = `cert.${c.id.replace(/-/g, '_')}`;
  en[`${key}_title`] = c.en_title;
  en[`${key}_short`] = c.en_short;
  en[`${key}_full`] = c.en_full;

  hi[`${key}_title`] = c.hi_title;
  hi[`${key}_short`] = c.hi_short;
  hi[`${key}_full`] = c.hi_full;

  mr[`${key}_title`] = c.mr_title;
  mr[`${key}_short`] = c.mr_short;
  mr[`${key}_full`] = c.mr_full;
});

let fileContent = fs.readFileSync('src/lib/translations.ts', 'utf8');

function injectTranslations(lang, dict) {
  let entries = Object.entries(dict).map(([k, v]) => `    '${k}': '${v.replace(/'/g, "\\'")}',`).join('\n');
  const sectionComment = `    // Certifications Dynamic\n${entries}\n`;
  const targetStr = `  ${lang}: {\n`;
  fileContent = fileContent.replace(targetStr, targetStr + sectionComment);
}

injectTranslations('en', en);
injectTranslations('hi', hi);
injectTranslations('mr', mr);

fs.writeFileSync('src/lib/translations.ts', fileContent);
console.log('Certifications translations injected successfully!');
