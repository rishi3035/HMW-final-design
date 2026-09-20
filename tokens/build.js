const fs = require('fs');
const path = require('path');

const raw = fs.readFileSync(path.join(__dirname, 'tokens.json'), 'utf8').replace(/^\uFEFF/, '');
const tokens = JSON.parse(raw);
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// 1. Build CSS Variables
let css = ':root {\n  /* HackMyWebsite Modern Cyber Design Tokens */\n';
function buildCss(obj, prefix = '') {
  for (const [key, val] of Object.entries(obj)) {
    const nextKey = prefix ? `${prefix}-${key}` : key;
    if (val && typeof val === 'object' && 'value' in val) {
      css += `  --hmw-${nextKey}: ${val.value};\n`;
    } else if (val && typeof val === 'object') {
      buildCss(val, nextKey);
    }
  }
}
buildCss(tokens);
css += '}\n';
fs.writeFileSync(path.join(distDir, 'variables.css'), css, 'utf8');

// 2. Build TypeScript Tokens
let ts = '// HackMyWebsite Design Tokens (TypeScript)\n\nexport const HMW_TOKENS = ' + JSON.stringify(tokens, null, 2) + ' as const;\n\n';
ts += 'export type HmwTokens = typeof HMW_TOKENS;\n';
fs.writeFileSync(path.join(distDir, 'tokens.ts'), ts, 'utf8');

console.log('✅ Generated tokens/dist/variables.css and tokens/dist/tokens.ts successfully!');
