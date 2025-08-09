import { hashSync } from "bcrypt-ts-edge";

const sampleData = {
  users: [
    {
      name: "Carl",
      email: "carl@admin.com",
      password: hashSync("password", 10),
      role: "admin",
    },
    {
      name: "John",
      email: "john@gmail.com",
      password: hashSync("password", 10),
      role: "user",
    },
  ],
  products: [
    {
      name: "Large Outdoor Waterproof Dog House",
      slug: "large-outdoor-waterproof-dog-house",
      category: "Dog's Products",
      description:
        "Rainproof and shading outdoor dog house, smooth surface, easy to clean",
      images: [
        "/images/sample-products/dog-house-1.jpg",
        "/images/sample-products/dog-house-2.jpg",
      ],
      price: 26.1,
      brand: "Besky",
      rating: 4.5,
      numReviews: 10,
      stock: 100,
      isFeatured: true,
      banner: "banner-1.jpg",
    },
    {
      name: "Dog Bathtub Ozone Generator",
      slug: "dog-bathtub-ozone-generator",
      category: "Dog's Products",
      description:
        "Ozone can disintegrate and decompose the pesticide,hormone and odor, which remains on the surface on food, such as fruit, vegetables, meat and seafood, etc.",
      images: [
        "/images/sample-products/dog-bathtub-ozone-generator-1.jpg",
        "/images/sample-products/dog-bathtub-ozone-generator-2.jpg",
      ],
      price: 30.0,
      brand: "OzonPuri",
      rating: 4.2,
      numReviews: 8,
      stock: 550,
      isFeatured: true,
      banner: "banner-2.jpg",
    },
    {
      name: "Eco-Friendly Small Pellet Cat Litter",
      slug: "eco-friendly-small-pellet-cat-litter",
      category: "Cat's Products",
      description:
        "Eco-friendly small pellet cat litter made from natural materials—low dust, odor control, and gentle on paws.",
      images: [
        "/images/sample-products/eco-friendly-small-pellet-cat-litter-1.jpg",
        "/images/sample-products/eco-friendly-small-pellet-cat-litter-2.jpg",
      ],
      price: 0.16,
      brand: "Cozie Cat",
      rating: 4.9,
      numReviews: 3,
      stock: 60,
      isFeatured: false,
      banner: null,
    },
    {
      name: "Modern Luxury Large Wood Tree Teasing",
      slug: "modern-luxury-large-wood-tree-teasing",
      category: "Cat's Products",
      description:
        "Give your cat the ultimate play and lounge experience with this modern luxury wooden tree platform. Featuring a teasing ball and spacious perches, it doubles as a stylish Halloween-themed decor piece for your home. Perfect for playful paws and cozy naps!",
      images: [
        "/images/sample-products/modern-luxury-large-wood-tree-teasing-1.jpg",
        "/images/sample-products/modern-luxury-large-wood-tree-teasing-2.jpg",
      ],
      price: 9.5,
      brand: "Cozie Cat",
      rating: 3.6,
      numReviews: 5,
      stock: 10,
      isFeatured: false,
      banner: null,
    },
    {
      name: "Automatic Dog Paw Washer Rechargeable",
      slug: "automatic-dog-paw-washer-rechargeable",
      category: "Dog's Products",
      description:
        "Keep your pup’s paws clean with ease! This automatic rechargeable dog paw washer gently removes dirt and mud in seconds — no mess, no hassle. Perfect for daily walks and rainy days.",
      images: [
        "/images/sample-products/automatic-dog-paw-washer-rechargeable-1.jpg",
        "/images/sample-products/automatic-dog-paw-washer-rechargeable-2.jpg",
      ],
      price: 5.409,
      brand: "Yixin",
      rating: 4.7,
      numReviews: 18,
      stock: 6,
      isFeatured: false,
      banner: null,
    },
    {
      name: "Polo Classic Pink Hoodie",
      slug: "polo-classic-pink-hoodie",
      category: "Men's Sweatshirts",
      description: "Soft, stylish, and perfect for laid-back days",
      images: [
        "/images/sample-products/p6-1.jpg",
        "/images/sample-products/p6-2.jpg",
      ],
      price: 99.99,
      brand: "Polo",
      rating: 4.6,
      numReviews: 12,
      stock: 0,
      isFeatured: true,
      banner: null,
    },
  ],
};

export default sampleData;
