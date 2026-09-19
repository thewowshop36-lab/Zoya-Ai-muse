import { LanguageMode, ProductRecommendation } from '../types';

interface GeminiGenerateResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
}

export interface ZoyaBotResponse {
  englishText: string;
  urduText: string;
  category?: 'skincare' | 'makeup' | 'mehndi' | 'troubleshoot' | 'bridal';
  suggestedActions: string[];
  productPicks?: ProductRecommendation[];
}

const SYSTEM_PROMPT = `
You are "Zoya", an elite luxury AI Beauty Muse and 24/7 personal beauty mentor specializing in female beauty, skincare, makeup artistry, mehndi (henna), hairstyling, and culturally sensitive beauty knowledge (embracing South Asian, Middle Eastern, Arab, and global beauty traditions).
You understand English, Nastaliq Urdu (اردو), and Roman Urdu fluently.

When answering:
1. Provide a warm, empowering, highly knowledgeable answer.
2. Address skin undertones (warm olive, golden, deep wheatish, neutral, cool), climate factors (humidity, heat, dryness), and skin types (oily, dry, acne-prone, combination).
3. If the user asks in Urdu or requests Urdu, prioritize Urdu (اردو) Nastaliq text alongside English.
4. Always provide practical, safe, non-comedogenic advice and authentic cultural wisdom (e.g. Haldi/Ubtan prep, dark henna stain oxidation, kohl eyeliner locking).
5. Suggest 2-3 specific products or techniques suited to their question.
`;

export async function askZoyaAI(
  userQuery: string,
  preferredLanguage: LanguageMode = 'en',
  skinProfile?: { skinType?: string; undertone?: string; eyeShape?: string },
  customApiKey?: string
): Promise<ZoyaBotResponse> {
  const apiKey =
    customApiKey ||
    (typeof import.meta !== 'undefined' && (import.meta as any)?.env ? ((import.meta as any).env.VITE_GEMINI_API_KEY || (import.meta as any).env.GEMINI_API_KEY) : '') ||
    '';

  const promptText = `
User Question: "${userQuery}"
Preferred Response Language Mode: ${preferredLanguage}
User Beauty Profile: Skin Type: ${skinProfile?.skinType || 'Combination'}, Undertone: ${skinProfile?.undertone || 'Warm Olive'}, Eye Shape: ${skinProfile?.eyeShape || 'Almond'}.

Format your response as a JSON object with this exact structure:
{
  "englishText": "Comprehensive, elegant, professional advice in English with steps and tips.",
  "urduText": "مکمل، نفیس اور شائستہ اردو میں مشورہ مع ضروری تدابیر۔",
  "category": "skincare | makeup | mehndi | troubleshoot | bridal",
  "suggestedActions": ["Action chip 1", "Action chip 2", "Action chip 3"],
  "productPicks": [
    {
      "name": "Product name",
      "brand": "Brand",
      "category": "Serum/Lash/Lipstick",
      "shade": "Shade or Finish",
      "priceEst": "Price tier",
      "whySuited": "Why it suits the user profile",
      "undertoneMatch": "Warm Olive / Golden / All"
    }
  ]
}
Return ONLY valid JSON.
`;

  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.length > 5) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: SYSTEM_PROMPT },
                  { text: promptText }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              responseMimeType: 'application/json'
            }
          })
        }
      );

      if (response.ok) {
        const data: GeminiGenerateResponse = await response.json();
        const rawJson = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawJson) {
          const parsed = JSON.parse(rawJson);
          return {
            englishText: parsed.englishText || 'Here is your personalized beauty consultation from Zoya.',
            urduText: parsed.urduText || 'یہ زویا کی طرف سے آپ کے لیے خصوصی بیوٹی مشورہ ہے۔',
            category: parsed.category || 'makeup',
            suggestedActions: parsed.suggestedActions || ['Explore Virtual Try-on', 'Save to Vanity', 'Ask follow-up'],
            productPicks: parsed.productPicks || []
          };
        }
      }
    } catch (err) {
      console.warn('Gemini API call failed, transitioning to internal Zoya intelligence engine:', err);
    }
  }

  // High-fidelity Domain Intelligence Fallback Engine
  // Delivers instant, tailored bilingual beauty advice for common queries
  return generateDomainBeautyResponse(userQuery, preferredLanguage, skinProfile);
}

function generateDomainBeautyResponse(
  query: string,
  lang: LanguageMode,
  profile?: { skinType?: string; undertone?: string; eyeShape?: string }
): ZoyaBotResponse {
  const q = query.toLowerCase();

  // Mehndi / Henna queries
  if (q.includes('mehndi') || q.includes('henna') || q.includes('مہندی') || q.includes('stain') || q.includes('dark')) {
    return {
      category: 'mehndi',
      englishText: `✨ **Zoya's Royal Mahogany Stain Secret**:
1. **The Sugar-Lemon Seal**: Once your henna paste is semi-dry, dab warm lemon juice boiled with sugar to keep the paste adhering for 6–8 hours.
2. **Clove Smoke Steam (Laung ki Dhooni)**: Heat 4–5 cloves on a dry tawa/pan, gently cup your palms over the rising aromatic vapor to warm the natural lawsone dye.
3. **The 12-Hour Water Rule**: Scrape paste off with butter or mustard oil. Keep hands completely dry for 12 hours—water stops the natural oxygenation that turns orange henna into rich mahogany maroon!`,
      urduText: `✨ **مہندی کا رنگ انتہائی گہرا اور دیرپا کرنے کے شاہانہ راز**:
۱. **لیموں اور چینی کا شیرہ**: جب مہندی خشک ہونے لگے تو روئی کی مدد سے نیم گرم لیموں چینی کا پانی لگائیں تاکہ مہندی چپکی رہے۔
۲. **لونگ کی دھونی**: توے پر لونگ گرم کر کے اس کی بھاپ اپنے ہاتھوں پر لیں، گرمائش سے رنگ نکھرتا ہے۔
۳. **پانی سے پرہیز**: مہندی کھرچ کر اتاریں، دھوئیں نہیں! سرسوں کا تیل لگائیں اور کم از کم ۱۲ گھنٹے پانی سے بچائیں تاکہ مہندی کا رنگ گہرا مہرون ہو جائے۔`,
      suggestedActions: ['Open Mehndi AR Try-on Studio', 'View Mehndi Masterclass', 'Simulate 24hr Henna Oxidation'],
      productPicks: [
        {
          name: 'Organic Sojat Henna Paste Cone',
          brand: 'Zoya Artisanal Organics',
          category: 'Mehndi',
          shade: 'Triple Filtered Rajasthani',
          priceEst: '₨ 250 / $3',
          whySuited: 'Zero chemical additives, 100% natural cold-pressed eucalyptus blend.',
          undertoneMatch: 'Universal'
        },
        {
          name: 'Clove & Mustard Henna Aftercare Balm',
          brand: 'Heritage Glow',
          category: 'Aftercare',
          shade: 'Mahogany Seal',
          priceEst: '₨ 850 / $8',
          whySuited: 'Waterproof sealant with natural essential oils to deepen stain richness.',
          undertoneMatch: 'Universal'
        }
      ]
    };
  }

  // Foundation / Base / Hyperpigmentation
  if (q.includes('foundation') || q.includes('base') || q.includes('hyperpigmentation') || q.includes('dark circles') || q.includes('ashy') || q.includes('grey') || q.includes('بیس') || q.includes('فاؤنڈیشن')) {
    const undertone = profile?.undertone || 'Warm Olive';
    return {
      category: 'makeup',
      englishText: `💄 **Flawless Desi Base Without Going Ashy**:
- **Root Cause**: If your foundation turns grey or dull around the mouth or eyes, it’s because darkness is being masked with high-coverage light concealer rather than being color-corrected first!
- **Step 1 Neutralize**: Tap a micro-droplet of warm peach (for fair/medium) or terracotta-orange (for caramel/deep tones) corrector.
- **Step 2 Match Undertone**: Always choose a ${undertone} foundation with golden or olive undertones, never cool pink.
- **Step 3 Setting**: Bake only high-shine zones with warm translucent banana powder so it holds in wedding hall humidity!`,
      urduText: `💄 **بغیر سرمئی ہوئے پائیدار اور قدرتی فاؤنڈیشن بیس**:
- **اصل وجہ**: اگر ہونٹوں یا آنکھوں کے گرد بیس سرمئی (Grey) ہو جاتی ہے، تو اس کا مطلب ہے کہ سیاہی کو پہلے نیوٹرلائز نہیں کیا گیا!
- **پہلا قدم**: ہلکا پیچ یا ٹیراکوٹا کلر کریکٹر ہلکے ہاتھوں سے لگائیں۔
- **دوسرا قدم**: ہمیشہ وارم اولیو یا گولڈن انڈرٹون فاؤنڈیشن کا انتخاب کریں، پنک شیڈز سے پرہیز کریں۔
- **سیٹنگ**: صرف ضروری جگہوں پر بنانا پاؤڈر سے بیک کریں تاکہ پسینے اور نمی میں بھی بیس خراب نہ ہو۔`,
      suggestedActions: ['Scan My Face & Eye Shape', 'View Olive Undertone Masterclass', 'Test Lipstick Virtual Swatches'],
      productPicks: [
        {
          name: 'Vanish Peach Corrector',
          brand: 'Hourglass / L.A. Girl Pro',
          category: 'Color Corrector',
          shade: 'Warm Peach',
          priceEst: '₨ 1,200 - 6,500',
          whySuited: 'Instant cancellation of blue/brown melanin pigmentation.',
          undertoneMatch: undertone
        },
        {
          name: 'Luminous Silk Foundation',
          brand: 'Armani Beauty',
          category: 'Liquid Base',
          shade: 'Warm Golden Olive',
          priceEst: 'Premium Luxury',
          whySuited: 'Micro-fil technology that mimics natural radiant skin texture without cakey buildup.',
          undertoneMatch: 'Warm Olive & Golden'
        }
      ]
    };
  }

  // Eyes / Eyelashes / Eyeliner
  if (q.includes('eye') || q.includes('lash') || q.includes('liner') || q.includes('mascara') || q.includes('آنکھ') || q.includes('پلک')) {
    const eyeShape = profile?.eyeShape || 'Almond';
    return {
      category: 'makeup',
      englishText: `👁️ **Bespoke Eye Artistry for ${eyeShape} Eyes**:
- **Lash Recommendation**: Your ${eyeShape} shape looks most captivating with lashes featuring extra flare toward the outer corners to elongate, or center-volume to visually lift.
- **Eyeliner Technique**: For hooded/monolid lids, use the **Bat-Wing technique**—look straight ahead and sketch across the fold; when closed it creates a graphic wing, when open it appears straight!
- **Tightlining**: Line the upper inner rim with waterproof gel kohl to make natural lash roots appear double as dense.`,
      urduText: `👁️ **آپ کی آنکھوں کے لیے خصوصی پلکیں اور آئی لائنر رہنمائی**:
- **پلکوں کا انتخاب**: آپ کی آنکھوں کی ساخت کے لیے وہ پلکیں بہترین ہیں جو کناروں پر لمبی اور درمیان میں ہلکی ہوں، تاکہ آنکھیں کشادہ اور مسحور کن لگیں۔
- **آئی لائنر کی تراش**: سیدھا آئینے میں دیکھ کر ونگ بنائیں، کبھی بھی آنکھ کو انگلی سے کھینچ کر لائنر نہ لگائیں ورنہ چھوڑنے پر لائن ٹیڑھی ہو جاتی ہے۔
- **کاجل واٹر لائن**: واٹر پروف جیل کاجل لگا کر سیاہ آئی شیڈو سے لاک کریں تاکہ پورا دن نہ پھیلے۔`,
      suggestedActions: ['Try On Eyelashes in AR', 'Test 4 Eyeliner Styles', 'See Eye Shape Breakdown'],
      productPicks: [
        {
          name: 'Featherlight 3D Faux Mink Lashes',
          brand: 'Zoya Couture Lashes',
          category: 'Lashes',
          shade: 'Cat-Eye Silk (12mm)',
          priceEst: '₨ 1,450 / $14',
          whySuited: `Ergonomically curved to fit ${eyeShape} lashlines without poking the inner corner.`,
          undertoneMatch: 'Universal'
        },
        {
          name: 'Kohl Kajal Epic Ink Pen',
          brand: 'Kulfi Beauty / Nyx',
          category: 'Eyeliner',
          shade: 'Jet Obsidian Black',
          priceEst: '₨ 2,200',
          whySuited: 'Cry-proof, humidity-proof formula with 0.1mm micro-felt precision.',
          undertoneMatch: 'Universal'
        }
      ]
    };
  }

  // Skincare / Acne / Glow / Dryness
  if (q.includes('skin') || q.includes('acne') || q.includes('glow') || q.includes('dry') || q.includes('oily') || q.includes('جلد') || q.includes('دانے')) {
    const skinType = profile?.skinType || 'Combination';
    return {
      category: 'skincare',
      englishText: `🧴 **Holistic Radiance & Barrier Routine for ${skinType} Skin**:
- **Morning (Protection & Sheen)**:
  1. Low-pH hydrating cleanser (gentle amino acids).
  2. 5% Niacinamide + Centella Asiatica serum (balances sebum & soothes redness).
  3. Hybrid Water-gel Sunscreen SPF 50+ (zero white-cast on olive skin).
- **Evening (Cellular Renewal)**:
  1. Double cleanse with jojoba oil followed by foaming cleanser.
  2. Barrier recovery cream with 3 essential ceramides and squalane.
- **Zoya's Glow Tip**: Incorporate pure sandalwood (chandan) water with pure aloe vera weekly for calming active breakouts.`,
      urduText: `🧴 **چمکدار اور صحت مند جلد کے لیے متوازن اسکن کیئر روٹین**:
- **صبح کا طریقہ کار**:
  ۱. ہلکا فیس واش جو جلد کی قدرتی نمی نہ چھینے۔
  ۲. نیاسینامائیڈ سیرم جو کھلے مساموں کو کم کرے اور چکنائی کنٹرول کرے۔
  ۳. سن بلاک (SPF 50) جو جلد پر سفید تہہ نہ چھوڑے۔
- **رات کی دیکھ بھال**:
  ۱. میک اپ اور گرد صاف کرنے کے لیے ڈبل کلینزنگ۔
  ۲. سیرامائیڈز والی نائٹ کریم تاکہ جلد کی قدرتی حفاظتی تہہ مضبوط ہو۔
- **زویا کا خاص نسخہ**: خالص عرقِ گلاب اور صندل کا اسپرے گرمی اور دانوں کی جلن کے لیے بہترین ہے۔`,
      suggestedActions: ['Build Personalized Skincare Schedule', 'View Ubtan & Barrier Masterclass', 'Ask about Acne Remedies'],
      productPicks: [
        {
          name: 'Niacinamide 10% + Zinc 1%',
          brand: 'The Ordinary / Conatural',
          category: 'Treatment Serum',
          shade: 'Clear Elixir',
          priceEst: '₨ 2,800 / $12',
          whySuited: 'Controls midday oil and lightens stubborn post-acne blemishes.',
          undertoneMatch: 'All Skin Types'
        },
        {
          name: 'Pure Hydrating Rose Water Mist',
          brand: 'Saeed Ghani / Heritage',
          category: 'Toner Mist',
          shade: 'Organic Gulab Arq',
          priceEst: '₨ 450',
          whySuited: 'Cools skin pH and sets mineral powder effortlessly.',
          undertoneMatch: 'All Skin Types'
        }
      ]
    };
  }

  // General Beauty Muse consultation
  return {
    category: 'bridal',
    englishText: `👑 **Salam & Welcome to Zoya!**
I am your 24/7 personal beauty mentor and creative muse. Here is how I can transform your beauty journey today:
1. **AI Virtual Beauty Bot**: Ask me any beauty troubleshooting, bridal look curation, or Urdu/English advice anytime.
2. **AI Mehndi & Nail Art Designer**: Generate trending Arabic, Khafif, and bridal henna motifs and try them onto our interactive AR hand model with live henna oxidation simulation.
3. **AI Makeup & Lash Advisor**: Scan your face structure, find your exact eye shape, and test bespoke lashes, liner wings, and lipstick finishes in real-time.
4. **Personalized Beauty Academy**: Master pro color correction, cut-crease eye makeup, and henna cone precision at your own pace.

What beauty magic would you like to create right now?`,
    urduText: `👑 **السلام علیکم! زویا میں خوش آمدید**
میں آپ کی ۲۴ گھنٹے دستیاب پرسنل بیوٹی رہنما ہوں۔ آج آپ کی خوبصورتی کے لیے ہم یہ سب کچھ کر سکتے ہیں:
۱. **بیوٹی چیٹ بوٹ**: اردو اور انگلش میں کسی بھی میک اپ، اسکن کیئر یا شادی کے لک پر فوری مشورہ۔
۲. **مہندی اور نیل آرٹ ڈیزائنر**: اپنے پسندیدہ انداز میں مہندی ڈیزائن بنائیں اور ہاتھوں پر ورچوئل ٹرائی آن دیکھیں۔
۳. **آئی لیش اور میک اپ ایڈوائزر**: اپنی آنکھوں کی ساخت کے مطابق پلکیں اور لپ اسٹک ٹیسٹ کریں۔
۴. **بیوٹی اکیڈمی**: پروفیشنل بیوٹی کورسز اور مرحلہ وار گائیڈز۔

آج آپ کیا سیکھنا یا ٹرائی کرنا چاہیں گی؟`,
    suggestedActions: [
      'Design Bridal Mehndi',
      'Find My Eye Shape & Lashes',
      'Skin Tone Color Match',
      'اردو میں رہنمائی (Urdu)'
    ],
    productPicks: [
      {
        name: 'Zoya Velvet Muse Lipstick Palette',
        brand: 'Zoya Atelier',
        category: 'Lip Palette',
        shade: 'Kashmiri Chai & Royal Berry',
        priceEst: '₨ 3,200',
        whySuited: 'Formulated specifically for warm South Asian and olive undertones.',
        undertoneMatch: 'Warm Olive & Golden'
      }
    ]
  };
}
