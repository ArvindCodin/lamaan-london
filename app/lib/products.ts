export interface FragranceNotes {
  top: string;
  heart: string;
  base: string;
}

export interface NormalizedProduct {
  id: string;
  handle: string;
  title: string;
  price: number;
  currency: string;
  description: string;
  shortDescription: string;
  fragranceNotes: FragranceNotes;
  burnTime: string;
  weight: string;
  images: string[];
  variantId: string;
}

export const STATIC_PRODUCTS: NormalizedProduct[] = [
  {
    id: "1",
    handle: "white-musk",
    title: "White Musk",
    price: 35.0,
    currency: "GBP",
    description: "A clean, skin-close musk that lingers without announcing itself. White Musk is the quiet confidence of a room that smells effortlessly good.",
    shortDescription: "Clean. Skin-close. Effortless.",
    fragranceNotes: { top: "Bergamot, White Tea", heart: "White Musk, Cashmere", base: "Sandalwood, Amber" },
    burnTime: "45 hours",
    weight: "200g",
    images: ["/images/white-musk.webp", "/images/white-musk-2.webp", "/images/white-musk-3.webp"],
    variantId: "",
  },
  {
    id: "2",
    handle: "lavender",
    title: "Lavender",
    price: 35.0,
    currency: "GBP",
    description: "Not the lavender of drawer sachets. This is Provence in the early morning — botanical, slightly green, deeply calming.",
    shortDescription: "Botanical. Calm. Countryside.",
    fragranceNotes: { top: "Lavender Absolute, Green Leaf", heart: "Geranium, Iris", base: "Musk, Cedarwood" },
    burnTime: "45 hours",
    weight: "200g",
    images: ["/images/lavender.webp", "/images/lavender-2.webp", "/images/lavender-3.webp"],
    variantId: "",
  },
  {
    id: "3",
    handle: "rose",
    title: "Rose",
    price: 35.0,
    currency: "GBP",
    description: "Damask rose, full and unapologetic. Not sweet, not powdery — this is the rose that grows wild, with thorns still attached.",
    shortDescription: "Full. Floral. Uncompromising.",
    fragranceNotes: { top: "Rose Absolute, Aldehyde", heart: "Damask Rose, Peony", base: "Patchouli, Musk" },
    burnTime: "45 hours",
    weight: "200g",
    images: ["/images/rose.webp", "/images/rose-2.webp", "/images/rose-3.webp"],
    variantId: "",
  },
  {
    id: "4",
    handle: "black-oud-vanilla",
    title: "Black Oud & Vanilla",
    price: 35.0,
    currency: "GBP",
    description: "The most complex of our four — a resinous, smoky oud rounded by deep vanilla. Rich without being sweet. Confident without being loud.",
    shortDescription: "Resinous. Smoky. Commanding.",
    fragranceNotes: { top: "Oud, Black Pepper", heart: "Labdanum, Leather", base: "Vanilla Absolute, Vetiver" },
    burnTime: "45 hours",
    weight: "200g",
    images: ["/images/black-oud-vanilla.webp", "/images/black-oud-vanilla-2.webp", "/images/black-oud-vanilla-3.webp"],
    variantId: "",
  },
];

const STATIC_DATA_MAP: Record<string, Pick<NormalizedProduct, "fragranceNotes" | "shortDescription" | "burnTime" | "weight">> = {
  "white-musk": {
    fragranceNotes: { top: "Bergamot, White Tea", heart: "White Musk, Cashmere", base: "Sandalwood, Amber" },
    shortDescription: "Clean. Skin-close. Effortless.",
    burnTime: "45 hours",
    weight: "200g",
  },
  "lavender": {
    fragranceNotes: { top: "Lavender Absolute, Green Leaf", heart: "Geranium, Iris", base: "Musk, Cedarwood" },
    shortDescription: "Botanical. Calm. Countryside.",
    burnTime: "45 hours",
    weight: "200g",
  },
  "rose": {
    fragranceNotes: { top: "Rose Absolute, Aldehyde", heart: "Damask Rose, Peony", base: "Patchouli, Musk" },
    shortDescription: "Full. Floral. Uncompromising.",
    burnTime: "45 hours",
    weight: "200g",
  },
  "black-oud-vanilla": {
    fragranceNotes: { top: "Oud, Black Pepper", heart: "Labdanum, Leather", base: "Vanilla Absolute, Vetiver" },
    shortDescription: "Resinous. Smoky. Commanding.",
    burnTime: "45 hours",
    weight: "200g",
  },
};

export function normalizeShopifyProduct(p: {
  id: string;
  handle: string;
  title: string;
  description: string;
  featuredImage: { url: string } | null;
  images?: { nodes: Array<{ url: string }> };
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  variants: { nodes: Array<{ id: string }> };
  metafields: Array<{ key: string; value: string } | null>;
}): NormalizedProduct {
  const meta = (p.metafields ?? []).reduce<Record<string, string>>((acc, mf) => {
    if (mf) acc[mf.key] = mf.value;
    return acc;
  }, {});

  const fallback = STATIC_DATA_MAP[p.handle] ?? {
    fragranceNotes: { top: "—", heart: "—", base: "—" },
    shortDescription: p.description.slice(0, 60),
    burnTime: "45 hours",
    weight: "200g",
  };

  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    price: parseFloat(p.priceRange.minVariantPrice.amount),
    currency: p.priceRange.minVariantPrice.currencyCode,
    description: p.description,
    shortDescription: meta.short_description || fallback.shortDescription,
    fragranceNotes: {
      top: meta.fragrance_top || fallback.fragranceNotes.top,
      heart: meta.fragrance_heart || fallback.fragranceNotes.heart,
      base: meta.fragrance_base || fallback.fragranceNotes.base,
    },
    burnTime: meta.burn_time || fallback.burnTime,
    weight: meta.weight || fallback.weight,
    images: p.images?.nodes.map((i) => i.url) ?? (p.featuredImage ? [p.featuredImage.url] : [`/images/${p.handle}.webp`]),
    variantId: p.variants.nodes[0]?.id ?? "",
  };
}
