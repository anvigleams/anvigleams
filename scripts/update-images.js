const fs = require('fs');
let content = fs.readFileSync('src/lib/data.ts', 'utf8');

content = content.replace(/images: \['https:\/\/images\.unsplash\.com\/[^\]]+\]/g, (match, offset, str) => {
  const substr = str.slice(0, offset);
  const slugMatches = substr.match(/slug: '([^']+)'/g);
  if (!slugMatches) return match;
  
  const lastSlugMatch = slugMatches[slugMatches.length - 1];
  const slug = lastSlugMatch.replace("slug: '", "").replace("'", "");
  
  return `images: ['/treatments/${slug}.jpg']`;
});

fs.writeFileSync('src/lib/data.ts', content);
console.log('Done!');
