// ============================================
//   ARK DECOR — Products Database
//   products.js
// ============================================

const PRODUCTS = [
  // ---- JHUMARS (4) ----
  {
    id: 1,
    name: "Royal Mughal Crystal Jhumar",
    category: "jhumars",
    categoryLabel: "Jhumars",
    price: 48000,
    displayPrice: "₹48,000",
    description: "Grand crystal chandelier with 24K gold-plated frame and Swarovski-inspired drops.",
    fullDescription: "The Royal Mughal Crystal Jhumar is our flagship piece — a sweeping statement of grandeur inspired by Mughal palace courts. Each of the 240 crystal drops is hand-strung onto a 24K gold-plated wrought iron frame by our master artisans in Mumbai. The warm, prismatic light it casts transforms any space into a realm of opulence.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    rating: 4.9,
    reviews: 31,
    specs: [
      "Material: Crystal & 24K Gold-Plated Iron",
      "Diameter: 28 inch",
      "Height: 36 inch",
      "Bulb Type: 16 × E14 (max 40W each)",
      "Weight: 8.5 kg",
      "Installation: Professional recommended"
    ],
    badge: "Bestseller",
    isNew: false
  },
  {
    id: 2,
    name: "Imperial Brass Jhumar",
    category: "jhumars",
    categoryLabel: "Jhumars",
    price: 62000,
    displayPrice: "₹62,000",
    description: "Handcrafted pure brass chandelier with antique patina finish and etched floral motifs.",
    fullDescription: "The Imperial Brass Jhumar is a triumph of the metalworker's art. Cast from solid brass and finished with a hand-applied antique patina, this chandelier features intricate floral motifs etched by our craftsmen over 40 hours of meticulous work. A centrepiece destined for grand foyers and palatial dining rooms.",
    image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&q=80",
    rating: 4.8,
    reviews: 24,
    specs: [
      "Material: Pure Brass, Antique Finish",
      "Diameter: 32 inch",
      "Height: 42 inch",
      "Bulb Type: 12 × E27 (max 60W each)",
      "Weight: 11 kg",
      "Ceiling Clearance: Minimum 10 ft recommended"
    ],
    badge: "Premium",
    isNew: false
  },
  {
    id: 3,
    name: "Venetian Glass Cascade Jhumar",
    category: "jhumars",
    categoryLabel: "Jhumars",
    price: 85000,
    displayPrice: "₹85,000",
    description: "Inspired by Venice, this multi-tier jhumar features hand-blown glass petals in warm amber.",
    fullDescription: "Inspired by the legendary glassblowers of Murano, our Venetian Glass Cascade Jhumar features 180 hand-blown glass petals in a warming amber palette. Each petal is individually shaped by our partner artisans and suspended from a black matte iron armature for a dramatic, waterfall-like cascade of light. Truly one of a kind.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
    rating: 5.0,
    reviews: 14,
    specs: [
      "Material: Hand-Blown Glass & Black Matte Iron",
      "Diameter: 36 inch",
      "Height: 52 inch (adjustable)",
      "Bulb Type: 8 × G9 LED (included)",
      "Weight: 9.2 kg",
      "Available: Custom colour options"
    ],
    badge: "Custom",
    isNew: true
  },
  {
    id: 4,
    name: "Art Deco Gold Jhumar",
    category: "jhumars",
    categoryLabel: "Jhumars",
    price: 38500,
    displayPrice: "₹38,500",
    description: "Geometric Art Deco chandelier in brushed gold with frosted glass diffusers.",
    fullDescription: "Clean lines meet classic glamour in our Art Deco Gold Jhumar. The geometric brass frame is hand-brushed to a warm gold finish, while frosted glass diffusers create a soft, even glow that flatters every interior. Ideal for contemporary homes that appreciate the golden age of design.",
    image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80",
    rating: 4.7,
    reviews: 19,
    specs: [
      "Material: Brushed Brass & Frosted Glass",
      "Diameter: 22 inch",
      "Height: 28 inch",
      "Bulb Type: 6 × E27 (max 40W each)",
      "Weight: 5.8 kg",
      "Style: Art Deco / Contemporary"
    ],
    badge: "New Arrival",
    isNew: true
  },
  // ---- WALL LIGHTS (3) ----
  {
    id: 5,
    name: "Opulent Brass Wall Sconce",
    category: "wall-lights",
    categoryLabel: "Wall Lights",
    price: 8500,
    displayPrice: "₹8,500",
    description: "Hand-cast brass wall sconce with crystal accent and warm Edison glow.",
    fullDescription: "Our Opulent Brass Wall Sconce brings a touch of old-world luxury to any corridor, bedroom, or living room wall. Hand-cast in our Mumbai workshop from solid brass, each sconce is polished to a mirror finish before a crystal accent drop is added. Pairs beautifully with mirrors and gallery walls.",
    image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=800&q=80",
    rating: 4.8,
    reviews: 42,
    specs: [
      "Material: Solid Brass & Crystal",
      "Dimensions: 8 × 12 inch",
      "Projection: 6 inch from wall",
      "Bulb Type: 1 × E27 (max 40W)",
      "Weight: 1.2 kg",
      "Sold: Per unit (pair available)"
    ],
    badge: "Bestseller",
    isNew: false
  },
  {
    id: 6,
    name: "Rattan & Gold Wall Light",
    category: "wall-lights",
    categoryLabel: "Wall Lights",
    price: 5200,
    displayPrice: "₹5,200",
    description: "Natural rattan shade with gold-plated bracket — bohemian luxury for living spaces.",
    fullDescription: "Where natural warmth meets curated luxury — the Rattan & Gold Wall Light features a hand-woven rattan shade sourced from sustainable artisan cooperatives, mounted on a sleek gold-plated steel bracket. The warm, dappled light it casts creates an intimate, layered ambience perfect for bedrooms and cosy sitting rooms.",
    image: "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&q=80",
    rating: 4.6,
    reviews: 28,
    specs: [
      "Material: Natural Rattan & Gold-Plated Steel",
      "Shade Diameter: 10 inch",
      "Height: 14 inch",
      "Bulb Type: 1 × E27 (max 25W recommended)",
      "Weight: 0.8 kg",
      "Style: Bohemian Luxury"
    ],
    badge: "New Arrival",
    isNew: true
  },
  {
    id: 7,
    name: "Noir Arc Wall Lamp",
    category: "wall-lights",
    categoryLabel: "Wall Lights",
    price: 11500,
    displayPrice: "₹11,500",
    description: "Matte black articulating wall lamp with brass knuckle joint — industrial luxury.",
    fullDescription: "Precision-engineered and aesthetically commanding, the Noir Arc Wall Lamp features a fully articulating matte black steel arm with a polished brass knuckle joint. The rotatable head allows for directed task or accent lighting. An ideal piece for home offices, reading nooks, and contemporary luxury bedrooms.",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a35e7d47f?w=800&q=80",
    rating: 4.9,
    reviews: 17,
    specs: [
      "Material: Powder-Coated Steel & Brass",
      "Arm Reach: 18 inch (fully extended)",
      "Head: Rotatable 300°",
      "Bulb Type: 1 × GU10 LED (included)",
      "Weight: 1.6 kg",
      "Style: Industrial Luxury"
    ],
    badge: "Premium",
    isNew: false
  },
  // ---- WALL HANGINGS (3) ----
  {
    id: 8,
    name: "Macramé Gold-Weave Wall Art",
    category: "wall-hangings",
    categoryLabel: "Wall Hangings",
    price: 6800,
    displayPrice: "₹6,800",
    description: "Hand-knotted macramé wall hanging with gold metallic thread and driftwood rod.",
    fullDescription: "Each Macramé Gold-Weave Wall Art piece is individually hand-knotted by our artisans using premium cotton cord intertwined with gold metallic thread. Mounted on a natural driftwood rod, it creates a stunning focal point that brings texture, warmth, and artisanal luxury to any bare wall.",
    image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=800&q=80",
    rating: 4.7,
    reviews: 33,
    specs: [
      "Material: Cotton Cord & Gold Metallic Thread",
      "Dimensions: 24 × 36 inch",
      "Rod: Natural Driftwood",
      "Colour: Ivory & Gold",
      "Weight: 0.9 kg",
      "Handmade: No two identical"
    ],
    badge: "Bestseller",
    isNew: false
  },
  {
    id: 9,
    name: "Hammered Brass Sun Mirror",
    category: "wall-hangings",
    categoryLabel: "Wall Hangings",
    price: 14500,
    displayPrice: "₹14,500",
    description: "Sculptural sun mirror in hand-hammered brass with 24-ray design — a statement piece.",
    fullDescription: "The Hammered Brass Sun Mirror is more than a mirror — it is a sculptural statement. Twenty-four rays of varying lengths radiate from a circular bevelled mirror, each ray individually hand-hammered to create an organic, textured surface that catches and reflects light beautifully throughout the day.",
    image: "https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=800&q=80",
    rating: 4.9,
    reviews: 21,
    specs: [
      "Material: Hand-Hammered Brass",
      "Mirror Diameter: 14 inch",
      "Total Diameter: 38 inch",
      "Weight: 3.8 kg",
      "Finish: Natural Brass (lacquered)",
      "Hanging: Heavy-duty D-ring included"
    ],
    badge: "Premium",
    isNew: false
  },
  {
    id: 10,
    name: "Rattan Geometric Wall Panel",
    category: "wall-hangings",
    categoryLabel: "Wall Hangings",
    price: 9200,
    displayPrice: "₹9,200",
    description: "Intricately woven rattan geometric panel — creates stunning shadow patterns when lit.",
    fullDescription: "A masterpiece of patience and precision, our Rattan Geometric Wall Panel is hand-woven by artisans following geometric patterns from traditional Indian textile design. When light passes through its intricate latticework, it casts mesmerising shadow patterns across the room — a living work of art that changes through the day.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    rating: 4.6,
    reviews: 15,
    specs: [
      "Material: Natural Rattan",
      "Dimensions: 24 × 24 inch",
      "Frame: Teak wood border",
      "Weight: 1.4 kg",
      "Style: Boho Geometric",
      "Best with: Directional spotlight behind"
    ],
    badge: "New Arrival",
    isNew: true
  },
  // ---- CEILING LIGHTS (3) ----
  {
    id: 11,
    name: "Cluster Pendant Brass Ceiling Light",
    category: "ceiling-lights",
    categoryLabel: "Ceiling Lights",
    price: 18500,
    displayPrice: "₹18,500",
    description: "Staggered cluster of 9 hand-blown glass globes on brass ceiling canopy.",
    fullDescription: "Our Cluster Pendant Brass Ceiling Light makes an instant architectural statement. Nine hand-blown smoky glass globes are suspended at varying heights from a broad brass ceiling canopy, creating a sculpted cloud of light. Perfect for open-plan living areas, statement entryways, and restaurant interiors.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    rating: 4.8,
    reviews: 26,
    specs: [
      "Material: Smoky Glass & Polished Brass",
      "Globe Diameter: 6 inch each",
      "Canopy: 12 inch diameter",
      "Total Drop: 40 inch (adjustable)",
      "Bulb: 9 × G9 LED (included)",
      "Weight: 4.2 kg"
    ],
    badge: "Bestseller",
    isNew: false
  },
  {
    id: 12,
    name: "Wabi-Sabi Woven Pendant",
    category: "ceiling-lights",
    categoryLabel: "Ceiling Lights",
    price: 7800,
    displayPrice: "₹7,800",
    description: "Organic hand-woven bamboo pendant shade for warm, diffused ambient lighting.",
    fullDescription: "Rooted in the Japanese philosophy of imperfect beauty, the Wabi-Sabi Woven Pendant celebrates the natural irregularity of hand-weaving. Crafted from sustainably sourced bamboo by artisans in Pune, each pendant is entirely unique. The warm glow it diffuses creates an atmosphere of calm, meditative luxury.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    rating: 4.7,
    reviews: 38,
    specs: [
      "Material: Handwoven Bamboo",
      "Diameter: 16 inch",
      "Height: 20 inch",
      "Drop: Adjustable up to 5 ft",
      "Bulb Type: 1 × E27 (max 40W)",
      "Weight: 0.7 kg"
    ],
    badge: "New Arrival",
    isNew: true
  },
  {
    id: 13,
    name: "Smoky Crystal Flush Mount",
    category: "ceiling-lights",
    categoryLabel: "Ceiling Lights",
    price: 22000,
    displayPrice: "₹22,000",
    description: "Glamorous flush mount ceiling light with smoked crystal drops and brushed gold frame.",
    fullDescription: "When ceiling height doesn't allow for a hanging chandelier, our Smoky Crystal Flush Mount delivers the same drama flush to the ceiling. A starburst of smoked crystal drops radiates from a brushed gold frame, catching light from every angle. Ideal for bedrooms, dressing rooms, and hotel suites.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    rating: 4.9,
    reviews: 20,
    specs: [
      "Material: Smoked Crystal & Brushed Gold",
      "Diameter: 18 inch",
      "Height (from ceiling): 6 inch",
      "Bulb Type: 12 × G4 LED (included)",
      "Weight: 2.8 kg",
      "Ceiling Cut-out: Not required"
    ],
    badge: "Premium",
    isNew: false
  },
  // ---- TABLE LAMPS (3) ----
  {
    id: 14,
    name: "Artisan Brass Tripod Table Lamp",
    category: "table-lamps",
    categoryLabel: "Table Lamps",
    price: 12500,
    displayPrice: "₹12,500",
    description: "Solid brass tripod base with off-white linen drum shade — understated luxury.",
    fullDescription: "The Artisan Brass Tripod Table Lamp is a study in refined restraint. The solid brass tripod legs are hand-turned and polished to a warm satin finish, anchoring a tailored off-white linen drum shade. The result is a lamp of quiet confidence — the kind that commands attention without demanding it.",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a35e7d47f?w=800&q=80",
    rating: 4.8,
    reviews: 44,
    specs: [
      "Base: Solid Brass, Satin Finish",
      "Shade: Linen, Off-White",
      "Height: 24 inch",
      "Shade Diameter: 14 inch",
      "Bulb Type: 1 × E27 (max 60W)",
      "Cord: Fabric-braided gold, 180cm"
    ],
    badge: "Bestseller",
    isNew: false
  },
  {
    id: 15,
    name: "Marble & Brass Column Lamp",
    category: "table-lamps",
    categoryLabel: "Table Lamps",
    price: 19800,
    displayPrice: "₹19,800",
    description: "White Carrara marble column base with polished brass neck and empire shade.",
    fullDescription: "The Marble & Brass Column Lamp is a sculptural object of desire. A solid column of white Carrara marble — sourced from Rajasthan — is topped with a polished brass neck and finished with a pleated ivory empire shade. An investment piece that anchors a room with effortless authority.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
    rating: 4.9,
    reviews: 16,
    specs: [
      "Base: White Marble (Rajasthan)",
      "Column Height: 14 inch",
      "Neck: Polished Brass",
      "Shade: Pleated Ivory Fabric",
      "Total Height: 28 inch",
      "Bulb Type: 1 × E27 (max 40W)"
    ],
    badge: "Premium",
    isNew: false
  },
  {
    id: 16,
    name: "Raku-Fired Ceramic Table Lamp",
    category: "table-lamps",
    categoryLabel: "Table Lamps",
    price: 8900,
    displayPrice: "₹8,900",
    description: "One-of-a-kind raku-fired ceramic lamp with gold crackle glaze and linen shade.",
    fullDescription: "Created through the ancient Japanese raku-firing technique, each Ceramic Table Lamp is entirely unique — the crackle glaze pattern is determined by the fire itself. The gold metallic lustre is applied by hand before a second firing, creating a warm, organic surface that pairs beautifully with a simple natural linen shade.",
    image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=800&q=80",
    rating: 4.7,
    reviews: 22,
    specs: [
      "Base: Raku-Fired Ceramic",
      "Glaze: Gold Crackle Lustre",
      "Base Height: 12 inch",
      "Shade: Natural Linen",
      "Total Height: 22 inch",
      "Note: Each piece uniquely patterned"
    ],
    badge: "Custom",
    isNew: true
  },
  // ---- OUTDOOR LIGHTS (2) ----
  {
    id: 17,
    name: "Moroccan Lantern Garden Light",
    category: "outdoor-lights",
    categoryLabel: "Outdoor Lights",
    price: 4800,
    displayPrice: "₹4,800",
    description: "Hand-punched brass Moroccan lantern with IP44 rating for outdoor garden use.",
    fullDescription: "Bring the romance of Marrakech to your garden, terrace, or entrance porch with our Moroccan Lantern Garden Light. Each lantern is hand-punched by artisans following centuries-old Moroccan geometric patterns. Rated IP44 for outdoor use, it is built to withstand Indian weather while retaining its decorative splendour.",
    image: "https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=800&q=80",
    rating: 4.6,
    reviews: 51,
    specs: [
      "Material: Hand-Punched Brass",
      "IP Rating: IP44 (outdoor safe)",
      "Height: 18 inch",
      "Diameter: 9 inch",
      "Bulb Type: 1 × E27 (max 40W, warm white rec.)",
      "Mount: Stake or hanging (both included)"
    ],
    badge: "Bestseller",
    isNew: false
  },
  {
    id: 18,
    name: "Coastal Teak Post Lantern",
    category: "outdoor-lights",
    categoryLabel: "Outdoor Lights",
    price: 16500,
    displayPrice: "₹16,500",
    description: "Premium teak wood and matte brass post lantern — designed for villa entrances.",
    fullDescription: "The Coastal Teak Post Lantern makes an unmistakable first impression. A robust post of sustainably sourced teak, treated for outdoor durability, holds an oversized matte brass lantern head with clear glass panels. Equally at home flanking a villa entrance or marking a garden pathway, it brings instant character and authority.",
    image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=800&q=80",
    rating: 4.8,
    reviews: 12,
    specs: [
      "Post: Teak Wood, Weather-Treated",
      "Head: Matte Brass & Clear Glass",
      "Total Height: 5 ft",
      "IP Rating: IP55",
      "Bulb Type: 1 × E27 (max 60W)",
      "Installation: Ground spike included"
    ],
    badge: "Premium",
    isNew: false
  }
];
