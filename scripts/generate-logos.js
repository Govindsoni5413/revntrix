const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outputDir = path.join(__dirname, '../public/brand');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

/*
  Revntrix Master Brandmark Geometry (1000 x 1000 Coordinate System)
  
  Mathematically perfected geometric shapes:
  - Vertical Stem: Left 160 to 320, Top 140 to Bottom 860.
  - Top Bowl:
    - Outer boundary: Top (160, 140) to (570, 140), curving down to (820, 365) then seamlessly flowing into the diagonal leg.
    - Inner Counter: Clean modern geometric stadium (320, 275) to (545, 275), curving to (635, 365), and bottom bar to (320, 455).
  - Tech Notch & Diagonal Leg:
    - Inner diagonal starts at (345, 475), creating the signature sharp triangular tech notch.
    - Leg sweeps down-right at an exact 45° angle to the baseline at (540, 860).
  - Dot & Curved Nesting Cutout:
    - Dot Center: (765, 735), Radius = 88px (Solid Electric Cobalt Blue #0062FF).
    - Leg Concave Arc Cutout: Concentric arc centered at (765, 735) with Radius = 126px (Clearance = 38px).
    - Clean horizontal baseline at Y=860.
*/

function getPerfectedIconSvg(fgColor = '#090A0E', dotColor = '#0062FF') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" fill="none">
  <!-- Precision Vector R with Sharp Inward Tech Notch -->
  <path d="
    M 160 140
    H 570
    C 720 140 820 238 820 376
    C 820 482 754 565 650 610
    L 708 676
    A 124 124 0 0 0 690 860
    H 540
    L 345 475
    V 860
    H 160
    V 140
    Z
    M 320 275
    H 545
    C 595 275 635 315 635 365
    C 635 415 595 455 545 455
    H 320
    V 275
    Z
  " fill="${fgColor}" fill-rule="evenodd" />

  <!-- Signature Electric Cobalt Blue Dot -->
  <circle cx="765" cy="735" r="88" fill="${dotColor}" />
</svg>`;
}

// Full horizontal lockup (Icon + Wordmark)
function getFullLogoSvg(theme = 'dark') {
  const isDark = theme === 'dark'; // dark theme (white text) or light theme (black text)
  const fg = isDark ? '#FFFFFF' : '#090A0E';
  const blue = '#0062FF';
  const sub = isDark ? '#94A3B8' : '#64748B';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 180" fill="none">
  <!-- Revntrix Icon Mark -->
  <g transform="translate(15, 15) scale(0.15)">
    <path d="
      M 160 140
      H 570
      C 720 140 820 238 820 376
      C 820 482 754 565 650 610
      L 708 676
      A 124 124 0 0 0 690 860
      H 540
      L 345 475
      V 860
      H 160
      V 140
      Z
      M 320 275
      H 545
      C 595 275 635 315 635 365
      C 635 415 595 455 545 455
      H 320
      V 275
      Z
    " fill="${fg}" fill-rule="evenodd" />
    <circle cx="765" cy="735" r="88" fill="${blue}" />
  </g>

  <!-- Modern Geometric Wordmark: REVNTRIX -->
  <text x="175" y="105" font-family="-apple-system, BlinkMacSystemFont, 'Inter', 'Outfit', sans-serif" font-size="68" font-weight="900" letter-spacing="-0.025em" fill="${fg}">
    REVN<tspan fill="${blue}">TRIX</tspan>
  </text>
  
  <!-- Modern Subtext Tagline -->
  <text x="178" y="134" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="12" font-weight="700" letter-spacing="0.34em" fill="${sub}">
    AI WEB ARCHITECTURE
  </text>
</svg>`;
}

// Compact Favicon SVG
function getFaviconSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="100 80 800 840" fill="none">
  <path d="
    M 160 140
    H 570
    C 720 140 820 238 820 376
    C 820 482 754 565 650 610
    L 708 676
    A 124 124 0 0 0 690 860
    H 540
    L 345 475
    V 860
    H 160
    V 140
    Z
    M 320 275
    H 545
    C 595 275 635 315 635 365
    C 635 415 595 455 545 455
    H 320
    V 275
    Z
  " fill="#090A0E" fill-rule="evenodd" />
  <circle cx="765" cy="735" r="88" fill="#0062FF" />
</svg>`;
}

async function buildAll() {
  console.log("Generating finalized brand package...");

  const iconBlackSvg = getPerfectedIconSvg('#090A0E', '#0062FF');
  const iconWhiteSvg = getPerfectedIconSvg('#FFFFFF', '#0062FF');
  const logoBlackSvg = getFullLogoSvg('light');
  const logoWhiteSvg = getFullLogoSvg('dark');
  const faviconSvg = getFaviconSvg();

  // Save SVGs
  fs.writeFileSync(path.join(outputDir, 'revntrix-icon.svg'), iconBlackSvg);
  fs.writeFileSync(path.join(outputDir, 'revntrix-icon-white.svg'), iconWhiteSvg);
  fs.writeFileSync(path.join(outputDir, 'revntrix-logo.svg'), logoBlackSvg);
  fs.writeFileSync(path.join(outputDir, 'revntrix-logo-white.svg'), logoWhiteSvg);
  fs.writeFileSync(path.join(outputDir, 'favicon.svg'), faviconSvg);

  // Render PNGs (Transparent Backgrounds)
  // Favicons
  await sharp(Buffer.from(faviconSvg))
    .resize(32, 32)
    .png()
    .toFile(path.join(outputDir, 'favicon-32x32.png'));

  await sharp(Buffer.from(faviconSvg))
    .resize(16, 16)
    .png()
    .toFile(path.join(outputDir, 'favicon-16x16.png'));

  await sharp(Buffer.from(faviconSvg))
    .resize(180, 180)
    .png()
    .toFile(path.join(outputDir, 'apple-touch-icon.png'));

  // Standalone Icon Marks (512x512 & 1024x1024)
  await sharp(Buffer.from(iconBlackSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(outputDir, 'revntrix-icon-512.png'));

  await sharp(Buffer.from(iconBlackSvg))
    .resize(1024, 1024)
    .png()
    .toFile(path.join(outputDir, 'revntrix-icon-1024.png'));

  await sharp(Buffer.from(iconWhiteSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(outputDir, 'revntrix-icon-white-512.png'));

  await sharp(Buffer.from(iconWhiteSvg))
    .resize(1024, 1024)
    .png()
    .toFile(path.join(outputDir, 'revntrix-icon-white-1024.png'));

  // Full Wordmark Logos (1520x360)
  await sharp(Buffer.from(logoBlackSvg))
    .resize(1520, 360)
    .png()
    .toFile(path.join(outputDir, 'revntrix-logo.png'));

  await sharp(Buffer.from(logoWhiteSvg))
    .resize(1520, 360)
    .png()
    .toFile(path.join(outputDir, 'revntrix-logo-white.png'));

  fs.copyFileSync(path.join(outputDir, 'favicon.svg'), path.join(__dirname, '../public/favicon.svg'));

  console.log("🚀 All brand package files successfully created!");
}

buildAll().catch(console.error);
