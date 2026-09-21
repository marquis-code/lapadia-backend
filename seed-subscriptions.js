const http = require('http');

const products = [
    {
      name: "Orange Juice",
      description: "Freshly squeezed orange juice.",
      price: 4000,
      variants: [{ measurement: "Cup", price: 4000, stock: 100 }],
      category: "Juices",
      icon: "🍊",
      imageUrl: "",
      images: [],
      productType: "subscription",
      stock: 100,
      isAvailable: true
    },
    {
      name: "Watermelon Juice",
      description: "Refreshing watermelon juice.",
      price: 4000,
      variants: [{ measurement: "Cup", price: 4000, stock: 100 }],
      category: "Juices",
      icon: "🍉",
      imageUrl: "",
      images: [],
      productType: "subscription",
      stock: 100,
      isAvailable: true
    },
    {
      name: "Carrot, Orange",
      description: "Carrot and orange blend.",
      price: 4000,
      variants: [{ measurement: "Cup", price: 4000, stock: 100 }],
      category: "Juices",
      icon: "🥕",
      imageUrl: "",
      images: [],
      productType: "subscription",
      stock: 100,
      isAvailable: true
    },
    {
      name: "Pineapple Juice",
      description: "Sweet pineapple juice.",
      price: 4000,
      variants: [{ measurement: "Cup", price: 4000, stock: 100 }],
      category: "Juices",
      icon: "🍍",
      imageUrl: "",
      images: [],
      productType: "subscription",
      stock: 100,
      isAvailable: true
    },
    {
      name: "Avocado Delight",
      description: "Avocado, apple, lemon smoothie.",
      price: 4000,
      variants: [{ measurement: "Cup", price: 4000, stock: 100 }],
      category: "Smoothies",
      icon: "🥑",
      imageUrl: "",
      images: [],
      productType: "subscription",
      stock: 100,
      isAvailable: true
    },
    {
      name: "Pina Colada",
      description: "Pineapple, banana, coconut smoothie.",
      price: 4000,
      variants: [{ measurement: "Cup", price: 4000, stock: 100 }],
      category: "Smoothies",
      icon: "🥥",
      imageUrl: "",
      images: [],
      productType: "subscription",
      stock: 100,
      isAvailable: true
    },
    {
      name: "Cool Resfresh",
      description: "Watermelon, pineapple, banana smoothie.",
      price: 4000,
      variants: [{ measurement: "Cup", price: 4000, stock: 100 }],
      category: "Smoothies",
      icon: "🍹",
      imageUrl: "",
      images: [],
      productType: "subscription",
      stock: 100,
      isAvailable: true
    },
    {
      name: "Fruit Bowl",
      description: "Assorted fresh fruit bowl.",
      price: 4000,
      variants: [{ measurement: "Bowl", price: 4000, stock: 100 }],
      category: "Fruit Bowls",
      icon: "🥗",
      imageUrl: "",
      images: [],
      productType: "subscription",
      stock: 100,
      isAvailable: true
    },
    {
      name: "Fruit & Granola Parfait",
      description: "Fresh fruit and granola parfait.",
      price: 4500,
      variants: [{ measurement: "Cup", price: 4500, stock: 100 }],
      category: "Parfaits",
      icon: "🍨",
      imageUrl: "",
      images: [],
      productType: "subscription",
      stock: 100,
      isAvailable: true
    },
    {
      name: "6 Bottles (250mls) of Any 3 Juices",
      description: "Subscription Pack: 6 bottles (250mls) of any 3 juices (Watermelon, Pineapple, Cool Refresh).",
      price: 23500,
      variants: [{ measurement: "Pack", price: 23500, stock: 50 }],
      category: "Subscription Packs",
      icon: "📦",
      imageUrl: "",
      images: [],
      productType: "subscription",
      stock: 100,
      isAvailable: true
    }
];

const reqOpt = {
  hostname: 'localhost',
  port: 5001,
  path: '/api/v1/products',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

async function createProduct(product) {
  return new Promise((resolve, reject) => {
    const req = http.request(reqOpt, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.write(JSON.stringify(product));
    req.end();
  });
}

async function run() {
  for (const product of products) {
    try {
      await createProduct(product);
      console.log('Created:', product.name);
    } catch (e) {
      console.error('Failed to create:', product.name, e);
    }
  }
}

run();
