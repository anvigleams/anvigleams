const fs = require('fs');

let content = fs.readFileSync('src/lib/translations.ts', 'utf8');

// Replace English
content = content.replace(/'gallery\.title': 'Inside Our Studio'/, "'gallery.title': 'Client Results'");
content = content.replace(/'gallery\.subtitle': 'Take a look inside our premium aesthetic studio\.'/, "'gallery.subtitle': 'Real results from previous treatments by our expert.'");
content = content.replace(/'gallery\.item_1': 'Studio Interior'/, "'gallery.item_1': 'Acne Treatment'");
content = content.replace(/'gallery\.item_2': 'Treatment Room'/, "'gallery.item_2': 'Pigmentation'");
content = content.replace(/'gallery\.item_3': 'Client Consultation'/, "'gallery.item_3': 'Scar Reduction'");
content = content.replace(/'gallery\.item_4': 'Waiting Area'/, "'gallery.item_4': 'Skin Brightening'");
content = content.replace(/'gallery\.item_5': 'Skincare Products'/, "'gallery.item_5': 'Hydra Facial'");
content = content.replace(/'gallery\.item_6': 'Procedure Walkthrough'/, "'gallery.item_6': 'Skin Tightening'");

// Replace Hindi
content = content.replace(/'gallery\.title': 'हमारे स्टूडियो के अंदर'/, "'gallery.title': 'क्लाइंट परिणाम'");
content = content.replace(/'gallery\.subtitle': 'हमारे प्रीमियम सौंदर्य स्टूडियो के अंदर एक नज़र डालें\.'/, "'gallery.subtitle': 'हमारे विशेषज्ञ द्वारा पिछले उपचारों के वास्तविक परिणाम।'");
content = content.replace(/'gallery\.item_1': 'स्टूडियो इंटीरियर'/, "'gallery.item_1': 'मुँहासे का इलाज'");
content = content.replace(/'gallery\.item_2': 'उपचार कक्ष'/, "'gallery.item_2': 'रंजकता'");
content = content.replace(/'gallery\.item_3': 'ग्राहक परामर्श'/, "'gallery.item_3': 'निशान कम करना'");
content = content.replace(/'gallery\.item_4': 'प्रतीक्षालय'/, "'gallery.item_4': 'स्किन ब्राइटनिंग'");
content = content.replace(/'gallery\.item_5': 'स्किनकेयर उत्पाद'/, "'gallery.item_5': 'हाइड्रा फेशियल'");
content = content.replace(/'gallery\.item_6': 'प्रक्रिया वाकथ्रू'/, "'gallery.item_6': 'त्वचा में कसाव'");

// Replace Marathi
content = content.replace(/'gallery\.title': 'आमच्या स्टुडिओमध्ये'/, "'gallery.title': 'क्लायंट परिणाम'");
content = content.replace(/'gallery\.subtitle': 'आमच्या प्रीमियम एस्थेटिक स्टुडिओमध्ये एक नजर टाका\.'/, "'gallery.subtitle': 'आमच्या तज्ञाद्वारे पूर्वीच्या उपचारांचे वास्तविक परिणाम.'");
content = content.replace(/'gallery\.item_1': 'स्टुडिओ इंटिरियर'/, "'gallery.item_1': 'मुरुमांचा उपचार'");
content = content.replace(/'gallery\.item_2': 'उपचार कक्ष'/, "'gallery.item_2': 'पिगमेंटेशन'");
content = content.replace(/'gallery\.item_3': 'ग्राहक सल्ला'/, "'gallery.item_3': 'डाग कमी करणे'");
content = content.replace(/'gallery\.item_4': 'प्रतीक्षालय'/, "'gallery.item_4': 'स्किन ब्राइटनिंग'");
content = content.replace(/'gallery\.item_5': 'स्किनकेअर उत्पादने'/, "'gallery.item_5': 'हायड्रा फेशियल'");
content = content.replace(/'gallery\.item_6': 'प्रक्रिया वॉकथ्रू'/, "'gallery.item_6': 'त्वचा घट्ट करणे'");

fs.writeFileSync('src/lib/translations.ts', content);
console.log('Done replacing gallery text!');
