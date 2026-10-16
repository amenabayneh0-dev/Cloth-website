const IMG = {
  hoodie: "images/hoodie.jpg",
  tee: "images/tee.jpg",
  denim: "images/denim.jpg",
  linen: "images/linen.jpg",
  chino: "images/chino.jpg",
  puffer: "images/puffer.jpg",
  knitm: "images/knitm.jpg",
  blazerm: "images/blazerm.jpg",
  rib: "images/rib.jpg",
  knitw: "images/knitw.jpg",
  blazerw: "images/blazerw.jpg",
  jeans: "images/jeans.jpg",
  floral: "images/floral.jpg",
  sundress: "images/sundress.jpg",
  leatherj: "images/leatherj.jpg",
  skirt: "images/skirt.jpg",
  heelsand: "images/heelsand.jpg",
  bag: "images/bag.jpg",
  wsneak: "images/wsneak.jpg",
  bsneak: "images/bsneak.jpg",
  bgsneak: "images/bgsneak.jpg",
  hightop: "images/hightop.jpg",
  leathers: "images/leathers.jpg",
  boots: "images/boots.jpg",
  chunky: "images/chunky.jpg",
  loafers: "images/loafers.jpg",
  sandals: "images/sandals.jpg",
  heels: "images/heels.jpg",
  shades: "images/shades.jpg",
  watch: "images/watch.jpg",
  belt: "images/belt.jpg",
  wallet: "images/wallet.jpg",
  backpack: "images/backpack.jpg",
  cap: "images/cap.jpg",
  beanie: "images/beanie.jpg",
  scarf: "images/scarf.jpg",
  gloves: "images/gloves.jpg",
  necklace: "images/necklace.jpg",
  tee2: "images/tee2.jpg",
  denimb: "images/denimb.jpg",
  shirtw: "images/shirtw.jpg",
  chino2: "images/chino2.jpg",
  blazerb: "images/blazerb.jpg",
  hero: "images/hero.jpg",
  cMen: "images/cMen.jpg",
  cWomen: "images/cWomen.jpg",
  cShoe: "images/cShoe.jpg",
  cSale: "images/cSale.jpg"
};

/* =====================================================================
   HOW THIS FILE WORKS (read me first!)
   - React builds the page from small "components" (functions that return UI).
   - We write UI with html`<div>…</div>` — it looks just like HTML/JSX.
   - "State" (useState) is data that, when changed, redraws the page.
   - The whole app's data (cart, open drawer) lives in <App> at the bottom
     and is passed down to children as "props".
   ===================================================================== */
const { useState, useEffect, useMemo } = React;
const html = htm.bind(React.createElement);

/* ---------- DATA: edit products here ----------
   Each product is one row in RAW:
   [ name, category, price, photo, colors, sizes, description, flags ]
   - colors: short codes from COLORS below, comma separated
   - sizes:  "top", "shoe", "belt" or "none" (see SIZES)
   - flags:  "best" = Best Seller, "new" = New Arrival, "sale:79.99" = Sale (old price) */
const COLORS = {
  blk: ["Black", "#0b0b0b"], wht: ["White", "#f4f4f2"], gry: ["Grey", "#9a9a9a"], bge: ["Beige", "#d8c7ad"],
  blu: ["Blue", "#4f78ad"], lbl: ["Light Blue", "#a9c4e4"], grn: ["Olive", "#4d5b3a"], brn: ["Brown", "#7a4a2b"],
  tan: ["Tan", "#b09468"], nvy: ["Navy", "#1a2238"], cre: ["Cream", "#efe6d4"], pnk: ["Blush", "#dcbfb5"],
  slv: ["Silver", "#c4c4c4"], gld: ["Gold", "#c9a45c"],
};
const SIZES = { top: ["XS", "S", "M", "L", "XL"], shoe: ["38", "39", "40", "41", "42", "43", "44"], belt: ["S", "M", "L"], none: [] };
const RAW = [
  // ---- Men's Clothing ----
  ["Essential Hoodie", "Men's Clothing", 59.99, "hoodie", "blk,gry,wht", "top", "Heavyweight brushed fleece with a relaxed, easy fit.", "best"],
  ["Oversized T-Shirt", "Men's Clothing", 29.99, "tee", "wht,gry,grn", "top", "Soft organic cotton with a boxy, dropped shoulder.", ""],
  ["Washed Denim Jacket", "Men's Clothing", 79.99, "denim", "blu,lbl,gry", "top", "Classic trucker cut in rigid, stonewashed denim.", "best"],
  ["Linen Shirt", "Men's Clothing", 49.99, "linen", "cre,lbl,wht", "top", "Breathable pure linen for warm days.", "sale:64.99"],
  ["Olive Chino Pants", "Men's Clothing", 54.99, "chino", "grn,blk,tan", "top", "Straight-leg stretch twill, cut to sit just right.", "sale:69.99"],
  ["Quilted Puffer Jacket", "Men's Clothing", 89.99, "puffer", "blk,gry", "top", "Lightweight insulated shell for cold city mornings.", "new"],
  ["Crewneck Knit Sweater", "Men's Clothing", 49.99, "knitm", "blk,bge,grn", "top", "Fine-gauge knit with a clean ribbed collar.", ""],
  ["Tailored Camel Blazer", "Men's Clothing", 89.99, "blazerm", "tan,wht,blk", "top", "Unstructured wool-blend blazer with soft shoulders.", "new"],
  ["Los Angeles Graphic Tee", "Men's Clothing", 29.99, "tee2", "bge,gry,blk", "top", "Washed cotton tee with a subtle screen print.", "sale:39.99"],
  ["Black Denim Jacket", "Men's Clothing", 79.99, "denimb", "blk,gry,blu", "top", "Garment-dyed black denim with a worn-in feel.", "sale:99.99"],
  ["White Oxford Shirt", "Men's Clothing", 49.99, "shirtw", "wht,lbl,bge", "top", "Crisp cotton oxford with a button-down collar.", ""],
  ["Tan Chino Pants", "Men's Clothing", 54.99, "chino2", "tan,grn,nvy", "top", "Everyday tapered chinos in washed cotton twill.", ""],
  // ---- Women's Clothing ----
  ["Ribbed Long-Sleeve Top", "Women's Clothing", 24.99, "rib", "blk,wht,pnk", "top", "Stretch rib knit with a flattering scoop neck.", "new"],
  ["Cream Knit Sweater", "Women's Clothing", 49.99, "knitw", "cre,gry,blk", "top", "Cosy textured knit with a relaxed crew neck.", ""],
  ["Relaxed Blazer Jacket", "Women's Clothing", 69.99, "blazerw", "tan,blk,gry", "top", "Easy single-breasted blazer in soft crepe.", ""],
  ["Black Tailored Blazer", "Women's Clothing", 69.99, "blazerb", "blk,bge,gry", "top", "Sharp black blazer with a clean, structured line.", ""],
  ["Wide-Leg Jeans", "Women's Clothing", 54.99, "jeans", "blu,lbl,gry", "top", "High-rise denim with a long, fluid wide leg.", ""],
  ["Floral Midi Dress", "Women's Clothing", 59.99, "floral", "grn,blk,cre", "top", "Printed cotton dress with a fitted, cinched bodice.", "best"],
  ["Summer Sundress", "Women's Clothing", 49.99, "sundress", "wht,grn,cre", "top", "Light, airy sundress with a gathered waist.", "new"],
  ["Leather Biker Jacket", "Women's Clothing", 89.99, "leatherj", "blk,brn,gry", "top", "Supple faux leather with asymmetric zip detail.", "best"],
  ["Pleated Midi Skirt", "Women's Clothing", 44.99, "skirt", "bge,pnk,blk", "top", "Fine knife pleats that move beautifully.", "sale:59.99"],
  // ---- Shoes ----
  ["White Leather Sneakers", "Shoes", 89.99, "wsneak", "wht,bge,gry", "shoe", "Minimal low-top in smooth, clean leather.", "best"],
  ["Black Leather Sneakers", "Shoes", 89.99, "bsneak", "blk,gry", "shoe", "The all-black everyday sneaker.", ""],
  ["Beige Court Sneakers", "Shoes", 89.99, "bgsneak", "bge,wht,blk", "shoe", "Soft sand leather on a cushioned sole.", "sale:109.99"],
  ["High-Top Canvas Sneakers", "Shoes", 79.99, "hightop", "blk,wht,bge", "shoe", "Heritage canvas high-top with a rubber toe cap.", ""],
  ["Brown Leather Derby Shoes", "Shoes", 99.99, "leathers", "brn,blk,tan", "shoe", "Hand-finished leather derbies with a stitched sole.", ""],
  ["Leather Lace-Up Boots", "Shoes", 109.99, "boots", "blk,brn", "shoe", "Sturdy lace-up boots with a grippy lug sole.", "new"],
  ["Chunky Runner Sneakers", "Shoes", 99.99, "chunky", "wht,gry,blu", "shoe", "Layered mesh runner with a bold, sculpted sole.", "new"],
  ["Penny Loafers", "Shoes", 89.99, "loafers", "blk,brn,gry", "shoe", "Polished slip-on loafers for work or weekend.", "sale:119.99"],
  ["Strappy Leather Sandals", "Shoes", 69.99, "sandals", "blk,tan", "shoe", "Adjustable straps on a contoured footbed.", ""],
  ["Pointed Stiletto Heels", "Shoes", 79.99, "heels", "cre,blk,gld", "shoe", "Elegant pointed-toe pumps with a slim heel.", ""],
  ["Heeled Leather Sandals", "Shoes", 69.99, "heelsand", "wht,tan,blk", "shoe", "Block-heel sandals with an ankle strap.", ""],
  // ---- Accessories ----
  ["Classic Sunglasses", "Accessories", 39.99, "shades", "blk,brn", "none", "UV-protective lenses in a timeless acetate frame.", "best"],
  ["Rose-Gold Wrist Watch", "Accessories", 129.99, "watch", "blk,brn,gld", "none", "Japanese quartz movement with a leather strap.", "best"],
  ["Leather Belt", "Accessories", 39.99, "belt", "blk,brn", "belt", "Full-grain leather with a brushed metal buckle.", "sale:49.99"],
  ["Bifold Leather Wallet", "Accessories", 49.99, "wallet", "blk,brn,nvy", "none", "Slim bifold with six card slots.", ""],
  ["Everyday Backpack", "Accessories", 69.99, "backpack", "blk,gry,grn", "none", "Water-resistant, with a padded laptop sleeve.", "best"],
  ["Baseball Cap", "Accessories", 24.99, "cap", "blk,nvy,bge", "none", "Embroidered six-panel cap with an adjustable strap.", ""],
  ["Ribbed Wool Beanie", "Accessories", 19.99, "beanie", "blk,gry,brn", "none", "Warm folded-cuff beanie in soft wool blend.", "new"],
  ["Soft Wool Scarf", "Accessories", 29.99, "scarf", "gry,blk,cre", "none", "Generous, brushed scarf with fringe ends.", "sale:39.99"],
  ["Knit Winter Gloves", "Accessories", 24.99, "gloves", "blk,gry,brn", "belt", "Touchscreen-friendly gloves lined with fleece.", "new"],
  ["Pendant Necklace", "Accessories", 49.99, "necklace", "gld,slv", "none", "Fine chain with a hand-polished round pendant.", ""],
  ["Leather Shoulder Bag", "Accessories", 59.99, "bag", "blk,brn,cre", "none", "Structured hobo bag with a magnetic closure.", "best"],
];
// Turn each row into an easy-to-use product object.
const PRODUCTS = RAW.map(([name, cat, price, img, colors, sz, desc, flags], i) => ({
  id: i + 1, name, cat, price, desc, img: IMG[img], sizes: SIZES[sz],
  colors: colors.split(",").map(k => COLORS[k]),                  // [[name, hex], ...]
  best: flags.includes("best"), isNew: flags.includes("new"),
  was: Number((flags.match(/sale:([\d.]+)/) || [])[1]) || 0,       // old price (0 = not on sale)
}));
const CATEGORIES = ["All", "Men's Clothing", "Women's Clothing", "Shoes", "Accessories", "New Arrivals", "Best Sellers", "Sale Items"];
const MAX_PRICE = 130;
const inCategory = (p, c) => c === "All" || (c === "New Arrivals" ? p.isNew : c === "Best Sellers" ? p.best : c === "Sale Items" ? p.was > 0 : p.cat === c);
const FREE_SHIPPING = 100;   // free shipping above this subtotal
const SHIPPING_FEE = 8;
const money = n => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ---------- SMALL REUSABLE PIECES ---------- */
// Icon: one component draws every icon, chosen by name.
const PATHS = {
  bag: "M5 8h14l-1 12H6L5 8zm4 0V6a3 3 0 016 0v2",
  menu: "M4 8h16M4 16h16",
  close: "M6 6l12 12M18 6L6 18",
  arrow: "M4 12h16m-5-5l5 5-5 5",
  heart: "M12 20s-7-4.4-9-9a5 5 0 019-3 5 5 0 019 3c-2 4.6-9 9-9 9z",
  search: "M11 4a7 7 0 100 14 7 7 0 000-14zm9 16l-4-4",
  instagram: "M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm5 5a4 4 0 100 8 4 4 0 000-8zm5.5-1.5h.01",
  telegram: "M21 4L3 11l6 2 2 6 3-4 5 4L21 4zM9 13l8-6",
};
const Icon = ({ name, size = 22, fill }) => html`
  <svg width=${size} height=${size} viewBox="0 0 24 24" fill=${fill || "none"} stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d=${PATHS[name]} /></svg>`;

// Photo: the image area. Shows a real <img> if given, else an editorial gradient.
// Garment: draws a clothing illustration. Each shape is [type, svgPath]: f = fabric fill, l = stitch/detail line, h = handle.
const SHAPES = {
  coat: [["f","M36 10L50 30 64 10 90 22 98 108 84 110 80 56 80 124H20L20 56 16 110 2 108 10 22Z"],["l","M50 30V124"],["l","M36 10L44 52 50 30 56 52 64 10"],["l","M20 56L10 22M80 56L90 22"],["l","M27 86H40M60 86H73"],["l","M46 66h.1M54 66h.1M46 84h.1M54 84h.1"]],
  dress: [["f","M38 6H43L47 30H53L57 6H62L66 38 58 56 90 124H10L42 56 34 38Z"],["l","M42 56H58"],["l","M50 56V124M46 56L30 124M54 56L70 124"]],
  trouser: [["f","M30 8H70L76 124H54L50 56 46 124H24Z"],["l","M30 17H70M50 17V56"],["l","M37 24L35 124M63 24L65 124"]],
  knit: [["f","M38 12H62L66 22 94 44 88 96 74 92V122H26V92L12 96 6 44 34 22Z"],["l","M38 12Q50 24 62 12"],["l","M26 92L30 46M74 92L70 46"],["l","M26 112H74"]],
  turtle: [["f","M38 14H62L66 24 94 46 88 98 74 94V122H26V94L12 98 6 46 34 24Z"],["f","M38 2H62V22H38Z"],["l","M38 8H62M38 14H62"],["l","M26 94L30 48M74 94L70 48M26 112H74"]],
  shirt: [["f","M36 10L50 20 64 10 90 26 96 98 82 100 78 50V122H22V50L18 100 4 98 10 26Z"],["l","M36 10L50 38 64 10"],["l","M50 38V122"],["l","M50 54h.1M50 72h.1M50 90h.1M50 108h.1"],["l","M22 50L10 26M78 50L90 26"]],
  tote: [["h","M34 48C34 8 66 8 66 48"],["f","M18 48H82L90 122H10Z"],["l","M16 62H84"],["l","M44 62V74H56V62"]],
  boot: [["f","M32 10H58L60 64C62 74 74 76 84 82 94 88 94 104 90 112H30Z"],["l","M30 104H90"],["l","M32 26H58"],["l","M32 10L28 20"]],
  scarf: [["f","M28 8H72V34L84 124H62L56 52H44L38 124H16L28 34Z"],["l","M28 22H72"],["l","M20 112H38M62 112H80"]],
  hoodie: [["f","M36 8Q50 22 64 8L68 16 94 44 88 98 74 94V122H26V94L12 98 6 44 32 16Z"],["f","M34 6Q50 -6 66 6 70 22 50 34 30 22Z"],["l","M38 14Q50 28 62 14"],["l","M45 32V54M55 32V54"],["l","M30 84H70L74 108H26Z"],["l","M26 114H74"],["l","M26 94L30 46M74 94L70 46"]],
  blazer: [["f","M34 10L50 24 66 10 90 22 98 108 84 110 80 56V124H20V56L16 110 2 108 10 22Z"],["l","M34 10L50 74 66 10"],["l","M34 10L44 30 50 24M66 10L56 30 50 24"],["l","M50 74V124"],["l","M26 94H42M58 94H74"],["l","M46 82h.1M46 96h.1"],["l","M20 56L10 22M80 56L90 22"]],
  jeans: [["f","M28 8H72L78 124H54L50 52 46 124H22Z"],["l","M28 17H72"],["l","M50 17V50"],["l","M30 17Q36 36 45 31M70 17Q64 36 55 31"],["l","M35 50L29 124M65 50L71 124"],["l","M24 116H47M53 116H76"]],
  skirt: [["f","M34 8H66L70 22 92 124H8L30 22Z"],["l","M31 18H69"],["l","M42 22L28 124M50 22V124M58 22L72 124"]],
  tee: [["f","M36 10Q50 20 64 10L88 24 96 52 82 58 78 50V116H22V50L18 58 4 52 12 24Z"],["l","M36 10Q50 28 64 10"],["l","M22 106H78"],["l","M22 50L12 24M78 50L88 24"]],
  sneaker: [["f","M8 84Q10 62 32 60L46 42Q56 36 62 46 66 58 82 64 96 68 96 92V102H8Z"],["l","M8 92H96"],["l","M50 48L58 56M56 44L64 52M44 54L52 62"],["l","M30 74Q44 76 52 70"]],
  cap: [["f","M18 72Q18 30 52 28 84 30 84 72Z"],["f","M12 72H98Q102 82 60 84 18 86 12 72Z"],["l","M52 28V72M36 34Q32 54 38 72M68 34Q72 54 66 72"],["l","M52 30h.1"]],
  shades: [["f","M8 50H44Q48 80 28 84 6 84 8 50Z"],["f","M56 50H92Q94 84 72 84 52 80 56 50Z"],["l","M44 56Q50 50 56 56"],["l","M8 52L2 46M92 52L98 46"]],
  watch: [["f","M38 0H62L60 50H40Z"],["f","M40 80H60L62 130H38Z"],["f","M50 39a26 26 0 1 0 .01 0Z"],["l","M50 47a18 18 0 1 0 .01 0Z"],["l","M50 65V52M50 65L59 69"]]
};
const Garment = ({ kind, fab }) => html`
  <svg class="garment" viewBox="0 0 100 130" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <defs><linearGradient id="shade" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".2"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient><linearGradient id="folds" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="23" y2="7" spreadMethod="repeat"><stop offset="0" stop-color="#000" stop-opacity=".2"/><stop offset=".35" stop-color="#fff" stop-opacity=".12"/><stop offset=".65" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".2"/></linearGradient><filter id="weave" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="2" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -.9 .6" result="g"/><feComposite in="g" in2="SourceAlpha" operator="in" result="gc"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="gc"/></feMerge></filter></defs>
    ${SHAPES[kind].map(([t, d], i) => t === "f" ? html`<g key=${i}><path d=${d} fill=${fab} filter="url(#weave)" stroke="rgba(0,0,0,.4)" stroke-width=".6" stroke-linejoin="round" /><path d=${d} fill="url(#folds)" /><path d=${d} fill="url(#shade)" /></g>`
      : t === "h" ? html`<path key=${i} d=${d} fill="none" stroke=${fab} stroke-width="4" stroke-linecap="round" />`
      : html`<path key=${i} d=${d} fill="none" stroke="rgba(128,128,128,.6)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />`)}
  </svg>`;

const Photo = ({ tone, img, mark, kind, fab }) => html`
  <div class=${"photo" + (kind ? " g" : "")} style=${{ background: `linear-gradient(160deg, ${tone[0]}, ${tone[1]})`, "--arch": `linear-gradient(to top, ${tone[1]}, ${tone[0]}55)` }}>
    ${kind && html`<${Garment} kind=${kind} fab=${fab} />`}
    ${img && html`<img src=${img} alt="" loading="lazy" />`}
    ${mark && html`<div class="mark">${mark}</div>`}
  </div>`;

/* ---------- HEADER (+ mobile menu) ---------- */
function Header({ count, wishCount, onCart, onWish, go }) {
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);
  useEffect(() => {                       // turn header white after scrolling past hero
    const on = () => setSolid(window.scrollY > window.innerHeight - 90);
    on(); window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  const link = (t, cat, close) => html`<a key=${t} href="#shop" onClick=${() => { go(cat); if (close) setMenu(false); }}>${t}</a>`;
  return html`
    <header class=${"hdr" + (solid ? " solid" : "")}>
      <div class="wrap row">
        <button class="icon-btn burger" aria-label="Open menu" onClick=${() => setMenu(true)}><${Icon} name="menu" /></button>
        <nav class="nav">${link("Men", "Men's Clothing")}${link("Women", "Women's Clothing")}</nav>
        <a class="logo" href="#top">VELORA</a>
        <nav class="nav">${link("Shoes", "Shoes")}${link("Sale", "Sale Items")}</nav>
        <div style=${{ display: "flex" }}>
          <button class="icon-btn" aria-label=${`Wishlist, ${wishCount} saved`} onClick=${onWish}>
            <${Icon} name="heart" />${wishCount > 0 && html`<span class="badge">${wishCount}</span>`}
          </button>
          <button class="icon-btn" aria-label=${`Open bag, ${count} items`} onClick=${onCart}>
            <${Icon} name="bag" />${count > 0 && html`<span class="badge">${count}</span>`}
          </button>
        </div>
      </div>
    </header>
    <div class=${"mmenu" + (menu ? " open" : "")}>
      <button class="icon-btn x" aria-label="Close menu" onClick=${() => setMenu(false)}><${Icon} name="close" /></button>
      ${CATEGORIES.map(c => link(c, c, true))}
    </div>`;
}

/* ---------- HERO ---------- */
const Hero = () => html`
  <section class="hero" id="top">
    <${Photo} tone=${["#3b3a38", "#0c0c0c"]} />
    <div class="hero-pic"><img src=${IMG.hero} alt="Model in sunglasses wearing a camel coat" /></div>
    <div class="wrap">
      <div class="eyebrow" style=${{ color: "rgba(255,255,255,.7)" }}>The New Season</div>
      <h1 style=${{ marginTop: 18 }}>Define your <em>own</em> style.</h1>
      <p>Considered pieces in uncompromising fabrics, made to be worn for years, not seasons.</p>
      <a class="btn" href="#shop">Shop Now <${Icon} name="arrow" size=${18} /></a>
    </div>
    <div class="scroll">Scroll</div>
  </section>`;

/* ---------- COLLECTIONS ---------- */
function Collections({ onPick }) {
  const items = [
    { name: "Men's Clothing", cat: "Men's Clothing", img: IMG.cMen, tone: ["#3a3835", "#111"] },
    { name: "Women's Clothing", cat: "Women's Clothing", img: IMG.cWomen, tone: ["#3a3835", "#111"] },
    { name: "Shoes", cat: "Shoes", img: IMG.cShoe, tone: ["#222", "#000"] },
    { name: "Sale Items", cat: "Sale Items", img: IMG.cSale, tone: ["#3a3835", "#111"] },
  ];
  return html`
    <section id="collections"><div class="wrap">
      <div class="head"><div><div class="eyebrow">Featured Collections</div><h2 style=${{ marginTop: 14 }}>Shop by collection.</h2></div></div>
      <div class="cols">
        ${items.map(c => html`
          <a key=${c.name} class="col" href="#shop" onClick=${() => onPick(c.cat)}>
            <${Photo} tone=${c.tone} img=${c.img} />
            <div class="cap"><h3>${c.name}</h3><span class="eyebrow" style=${{ color: "#fff" }}>Explore</span></div>
          </a>`)}
      </div>
    </div></section>`;
}

/* ---------- PRODUCT CARD: choose colour + size, add to bag, save to wishlist ---------- */
function ProductCard({ p, onAdd, liked, onWish }) {
  const [color, setColor] = useState(p.colors[0][0]);   // selected colour name
  const [size, setSize] = useState("");                  // selected size ("" = none yet)
  const [warn, setWarn] = useState(false);
  const add = () => {
    if (p.sizes.length && !size) return setWarn(true);   // size required when the product has sizes
    onAdd(p, color, size);
  };
  const tag = p.was ? `-${Math.round((1 - p.price / p.was) * 100)}%` : p.isNew ? "New" : p.best ? "Best Seller" : "";
  return html`
    <article class="card">
      <div class="frame">
        <${Photo} tone=${["#ececea", "#e2e0dc"]} img=${p.img} />
        ${tag && html`<span class="tag">${tag}</span>`}
        <button class="heart" aria-pressed=${liked} aria-label=${liked ? "Remove from wishlist" : "Add to wishlist"} onClick=${() => onWish(p)}>
          <${Icon} name="heart" size=${18} fill=${liked ? "currentColor" : "none"} />
        </button>
      </div>
      <div class="meta">
        <div><div class="name">${p.name}</div><div class="cat">${p.cat}</div></div>
        <div class="price">${money(p.price)}${p.was > 0 && html` <s class="was">${money(p.was)}</s>`}</div>
      </div>
      <div class="desc">${p.desc}</div>
      <div class="swatches" aria-label="Colour">
        ${p.colors.map(([n, hex]) => html`<button key=${n} title=${n} aria-label=${n} class=${n === color ? "on" : ""} style=${{ background: hex }} onClick=${() => setColor(n)}></button>`)}
        <span class="cname">${color}</span>
      </div>
      ${p.sizes.length > 0 && html`
        <div class="sizes" aria-label="Size">
          ${p.sizes.map(s => html`<button key=${s} class=${s === size ? "on" : ""} onClick=${() => { setSize(s); setWarn(false); }}>${s}</button>`)}
        </div>
        ${warn && html`<div class="warn">Please choose a size.</div>`}`}
      <button class="add" onClick=${add}>Add to Cart</button>
    </article>`;
}

/* ---------- PRODUCTS: search + category + price filters, loading and empty states ---------- */
function Products({ category, setCategory, wish, toggleWish, onlyWish, setOnlyWish, onAdd }) {
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [sort, setSort] = useState("featured");
  useEffect(() => { const t = setTimeout(() => setLoading(false), 900); return () => clearTimeout(t); }, []);
  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let r = PRODUCTS.filter(p => inCategory(p, category) && p.price <= maxPrice && (!onlyWish || wish.includes(p.id))
      && (p.name + " " + p.cat + " " + p.desc).toLowerCase().includes(needle));
    if (sort === "low") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "high") r = [...r].sort((a, b) => b.price - a.price);
    return r;
  }, [category, q, maxPrice, sort, onlyWish, wish]);
  const reset = () => { setCategory("All"); setQ(""); setMaxPrice(MAX_PRICE); setSort("featured"); setOnlyWish(false); };
  return html`
    <section id="shop" style=${{ paddingTop: 0 }}><div class="wrap">
      <div class="head"><div><div class="eyebrow">The Store</div><h2 style=${{ marginTop: 14 }}>Shop all.</h2></div></div>
      <div class="filters" role="tablist">
        ${CATEGORIES.map(c => html`<button key=${c} class=${!onlyWish && c === category ? "on" : ""} onClick=${() => { setOnlyWish(false); setCategory(c); }}>${c}</button>`)}
        <button class=${onlyWish ? "on" : ""} onClick=${() => { setCategory("All"); setOnlyWish(true); }}>\u2665 Saved (${wish.length})</button>
      </div>
      <div class="toolbar">
        <label class="search"><${Icon} name="search" size=${18} /><input type="search" placeholder="Search coats, sneakers, bags\u2026" value=${q} onInput=${e => setQ(e.target.value)} /></label>
        <label class="range">Max price <input type="range" min="20" max=${MAX_PRICE} step="5" value=${maxPrice} onInput=${e => setMaxPrice(Number(e.target.value))} /><b>${maxPrice >= MAX_PRICE ? "Any" : "$" + maxPrice}</b></label>
        <select value=${sort} onChange=${e => setSort(e.target.value)} aria-label="Sort">
          <option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option>
        </select>
        <span class="count">${list.length} pieces</span>
      </div>
      ${loading
        ? html`<div class="grid">${[0, 1, 2, 3].map(i => html`<div key=${i}><div class="skel"></div><div class="skel t"></div></div>`)}</div>`
        : list.length === 0
          ? html`<div class="empty"><h3>${onlyWish && wish.length === 0 ? "Your wishlist is empty." : "Nothing matches."}</h3><p>${onlyWish && wish.length === 0 ? "Tap the heart on any piece to save it here." : "Try a different search, category or price."}</p><button class="btn" onClick=${reset}>Clear filters</button></div>`
          : html`<div class="grid">${list.map(p => html`<${ProductCard} key=${p.id} p=${p} onAdd=${onAdd} liked=${wish.includes(p.id)} onWish=${toggleWish} />`)}</div>`}
    </div></section>`;
}

/* ---------- PROMO BANNER ---------- */
const Promo = ({ onSale }) => html`
  <section class="promo" style=${{ padding: undefined }}>
    <div class="eyebrow" style=${{ color: "#aaa" }}>Members Event</div>
    <h2>Seasonal Sale</h2>
    <p style=${{ color: "#aaa", maxWidth: 420, margin: "0 auto 36px", padding: "0 20px" }}>Complimentary shipping on every order over ${money(FREE_SHIPPING)}, plus free returns for 60 days.</p>
    <a class="btn" href="#shop" onClick=${onSale}>Shop the Sale</a>
  </section>`;

/* ---------- NEWSLETTER (with simple validation) ---------- */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const submit = e => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setMsg("Please enter a valid email address.");
    setMsg(`Welcome to VELORA. A confirmation is on its way to ${email}.`); setEmail("");
  };
  return html`
    <section id="newsletter"><div class="wrap news">
      <div><div class="eyebrow">Newsletter</div><h2 style=${{ marginTop: 14 }}>Letters from the atelier.</h2></div>
      <div>
        <p style=${{ color: "var(--mute)", marginTop: 0 }}>Early access to collections, private sales and stories behind the craft. Never more than twice a month.</p>
        <form class="field" onSubmit=${submit}>
          <input type="email" placeholder="Your email address" aria-label="Email" value=${email} onChange=${e => setEmail(e.target.value)} />
          <button type="submit">Subscribe →</button>
        </form>
        <div class="msg" role="status">${msg}</div>
      </div>
    </div></section>`;
}

/* ---------- FOOTER ---------- */
const Footer = () => html`
  <footer><div class="wrap">
    <div class="fgrid">
      <div><div class="logo" style=${{ padding: 0 }}>VELORA</div><p style=${{ color: "var(--mute)", maxWidth: 300 }}>Modern luxury, made slowly. Designed in Milan, crafted in Portugal.</p>
        <div class="social">
          <a href="https://instagram.com/xausolus" target="_blank" rel="noopener" aria-label="Instagram @xausolus"><${Icon} name="instagram" size=${18} /> Instagram</a>
          <a href="https://t.me/xausolus" target="_blank" rel="noopener" aria-label="Telegram @xausolus"><${Icon} name="telegram" size=${18} /> Telegram</a>
        </div></div>
      ${[["Shop", ["Men", "Women", "Footwear", "New In"]], ["Help", ["Shipping", "Returns", "Size Guide", "Contact"]], ["Maison", ["Our Story", "Craft", "Careers", "Press"]]].map(([h, ls]) => html`
        <div key=${h}><h4>${h}</h4><ul>${ls.map(l => html`<li key=${l}><a class="link" href="#top">${l}</a></li>`)}</ul></div>`)}
    </div>
    <div class="fine"><span>© 2026 VELORA. All rights reserved.</span><span>@xausolus · Privacy · Terms · Cookies</span></div>
  </div></footer>`;

/* ---------- CART DRAWER: quantity controls + automatic totals ---------- */
function CartDrawer({ open, onClose, cart, onQty, onRemove, onCheckout, placed }) {
  const lines = cart.map(l => ({ ...l, product: PRODUCTS.find(p => p.id === l.id) }));
  const subtotal = lines.reduce((s, l) => s + Math.round(l.product.price * l.qty * 100), 0) / 100;   // price \u00d7 quantity, summed
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;
  const left = Math.max(0, FREE_SHIPPING - subtotal);
  return html`
    <div class=${"veil" + (open ? " open" : "")} onClick=${onClose}></div>
    <aside class=${"drawer" + (open ? " open" : "")} aria-hidden=${!open} aria-label="Shopping bag">
      <div class="d-head"><h3>Your Bag (${cart.reduce((s, l) => s + l.qty, 0)})</h3>
        <button class="icon-btn" aria-label="Close bag" onClick=${onClose}><${Icon} name="close" /></button></div>
      <div class="d-body">
        ${placed ? html`<div class="empty"><h3>Thank you.</h3><p>Your order has been placed. This is a demo, so no payment was taken.</p><button class="btn" onClick=${onClose}>Continue</button></div>`
        : lines.length === 0 ? html`<div class="empty"><h3>Your bag is empty.</h3><p>Discover something you'll love.</p><a class="btn" href="#shop" onClick=${onClose}>Start shopping</a></div>`
        : lines.map(l => html`
          <div class="line" key=${l.key}>
            <div class="thumb"><${Photo} tone=${["#ececea", "#e2e0dc"]} img=${l.product.img} /></div>
            <div>
              <div class="top"><div><div style=${{ fontFamily: "var(--serif)", fontSize: 20, lineHeight: 1.1 }}>${l.product.name}</div><div class="eyebrow" style=${{ marginTop: 6 }}>${l.color}${l.size ? " \u00b7 Size " + l.size : ""}</div></div><div>${money(l.product.price * l.qty)}</div></div>
              <div class="qty"><button aria-label="Decrease" onClick=${() => onQty(l.key, -1)}>\u2212</button><span>${l.qty}</span><button aria-label="Increase" onClick=${() => onQty(l.key, 1)}>+</button></div>
              <button class="rm" onClick=${() => onRemove(l.key)}>Remove</button>
            </div>
          </div>`)}
      </div>
      ${!placed && lines.length > 0 && html`
        <div class="d-foot">
          <div class="eyebrow">${left > 0 ? `${money(left)} away from free shipping` : "You've unlocked free shipping"}</div>
          <div class="bar"><i style=${{ width: Math.min(100, subtotal / FREE_SHIPPING * 100) + "%" }}></i></div>
          <div class="sum" style=${{ marginTop: 18 }}><span>Subtotal</span><span>${money(subtotal)}</span></div>
          <div class="sum"><span>Shipping</span><span>${shipping ? money(shipping) : "Free"}</span></div>
          <div class="sum total"><span>Total</span><span>${money(total)}</span></div>
          <button class="btn dark" style=${{ width: "100%", justifyContent: "center" }} onClick=${onCheckout}>Checkout</button>
        </div>`}
    </aside>`;
}

/* ---------- APP: owns all shared state ---------- */
function App() {
  const [cart, setCart] = useState([]);            // [{ key, id, color, size, qty }]
  const [wish, setWish] = useState([]);            // [productId, ...]
  const [cartOpen, setCartOpen] = useState(false);
  const [category, setCategory] = useState("All");
  const [onlyWish, setOnlyWish] = useState(false);
  const [toast, setToast] = useState("");
  const [placed, setPlaced] = useState(false);

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(""), 2200); };
  const go = cat => { setOnlyWish(false); setCategory(cat); };           // jump to a category
  const addToCart = (p, color, size) => {
    const key = `${p.id}-${color}-${size}`;                            // same product + colour + size = same line
    setPlaced(false);
    setCart(c => c.some(l => l.key === key) ? c.map(l => l.key === key ? { ...l, qty: l.qty + 1 } : l) : [...c, { key, id: p.id, color, size, qty: 1 }]);
    showToast(`${p.name} added to bag`);
  };
  const toggleWish = p => {
    const had = wish.includes(p.id);
    setWish(w => had ? w.filter(i => i !== p.id) : [...w, p.id]);
    showToast(had ? "Removed from wishlist" : `${p.name} saved to wishlist`);
  };
  const changeQty = (key, d) => setCart(c => c.map(l => l.key === key ? { ...l, qty: Math.max(1, l.qty + d) } : l));
  const remove = key => setCart(c => c.filter(l => l.key !== key));
  const checkout = () => { setCart([]); setPlaced(true); };
  const showWishlist = () => { setCategory("All"); setOnlyWish(true); location.hash = "shop"; };

  useEffect(() => { document.body.style.overflow = cartOpen ? "hidden" : ""; }, [cartOpen]);
  const count = cart.reduce((s, l) => s + l.qty, 0);

  return html`
    <${Header} count=${count} wishCount=${wish.length} go=${go} onWish=${showWishlist} onCart=${() => { setPlaced(false); setCartOpen(true); }} />
    <main>
      <${Hero} />
      <${Collections} onPick=${go} />
      <${Products} category=${category} setCategory=${setCategory} wish=${wish} toggleWish=${toggleWish} onlyWish=${onlyWish} setOnlyWish=${setOnlyWish} onAdd=${addToCart} />
      <${Promo} onSale=${() => go("Sale Items")} />
      <${Newsletter} />
    </main>
    <${Footer} />
    <${CartDrawer} open=${cartOpen} onClose=${() => setCartOpen(false)} cart=${cart} onQty=${changeQty} onRemove=${remove} onCheckout=${checkout} placed=${placed} />
    <div class=${"toast" + (toast ? " on" : "")} role="status">${toast}</div>`;
}

ReactDOM.createRoot(document.getElementById("root")).render(html`<${App} />`);
