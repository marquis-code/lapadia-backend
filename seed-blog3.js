const mongoose = require('mongoose');
require('dotenv').config();

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  authorName: String,
  coverImage: String,
  tags: [{ type: String }],
  published: { type: Boolean, default: false }
}, { timestamps: true });

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');
    
    // Create slugify function equivalent
    const slugify = text => text.toString().toLowerCase().trim().replace(/[\s\W-]+/g, '-');
    
    const title = "Top 5 Benefits of Drinking Fresh Smoothies Daily";
    
    const htmlContent = `
<p>In today's fast-paced world, maintaining a healthy lifestyle can often feel like a daunting task. With busy schedules and endless commitments, many people struggle to find the time to prepare nutritious meals. This is where fresh smoothies come into play. Packed with vitamins, minerals, and antioxidants, drinking fresh smoothies daily can significantly enhance your overall well-being. In this blog post, we will explore the top five benefits of incorporating fresh smoothies into your daily routine.</p>

<p><em>Close-up view of a vibrant smoothie bowl topped with fresh fruits. A colorful smoothie bowl showcasing a variety of fresh fruits and nuts.</em></p>

<h3>1. Nutrient-Rich Fuel for Your Body</h3>
<p>One of the most significant advantages of drinking fresh smoothies is their ability to provide a concentrated source of nutrients. By blending fruits, vegetables, and other wholesome ingredients, you can create a delicious drink that is rich in essential vitamins and minerals.</p>

<h4>Key Nutrients Found in Smoothies</h4>
<ul>
<li><strong>Vitamins:</strong> Smoothies can be loaded with vitamins A, C, and K, which are crucial for maintaining healthy skin, vision, and immune function.</li>
<li><strong>Minerals:</strong> Ingredients like spinach and kale are excellent sources of iron and calcium, supporting bone health and energy levels.</li>
<li><strong>Antioxidants:</strong> Berries, such as blueberries and strawberries, are high in antioxidants that help combat oxidative stress and inflammation.</li>
</ul>
<p>By consuming a variety of ingredients, you can ensure that your body receives a broad spectrum of nutrients, making smoothies an excellent choice for breakfast or a snack.</p>

<h3>2. A Convenient Way to Increase Fruit and Vegetable Intake</h3>
<p>Many people struggle to meet the recommended daily intake of fruits and vegetables. Fresh smoothies offer a convenient solution to this common challenge.</p>

<h4>How Smoothies Help</h4>
<ul>
<li><strong>Easy to Prepare:</strong> With just a few minutes of blending, you can create a nutrient-dense drink that incorporates multiple servings of fruits and vegetables.</li>
<li><strong>Customizable:</strong> You can tailor your smoothie to your taste preferences and dietary needs. Whether you prefer a tropical fruit blend or a green veggie-packed drink, the options are endless.</li>
<li><strong>Portable:</strong> Smoothies are easy to take on the go, making them a perfect option for busy mornings or post-workout refueling.</li>
</ul>
<p>By incorporating smoothies into your daily routine, you can effortlessly increase your intake of essential nutrients.</p>

<h3>3. Supports Digestive Health</h3>
<p>Fresh smoothies can also play a significant role in promoting digestive health. Many smoothie ingredients are rich in fiber, which is essential for maintaining a healthy digestive system.</p>

<h4>Benefits of Fiber in Smoothies</h4>
<ul>
<li><strong>Promotes Regularity:</strong> Fiber helps to keep your digestive system running smoothly, preventing constipation and promoting regular bowel movements.</li>
<li><strong>Supports Gut Health:</strong> Ingredients like yogurt or kefir can introduce beneficial probiotics into your diet, supporting a healthy gut microbiome.</li>
<li><strong>Aids in Nutrient Absorption:</strong> A well-functioning digestive system ensures that your body can effectively absorb the nutrients from the foods you consume.</li>
</ul>
<p>By choosing fiber-rich ingredients for your smoothies, you can support your digestive health and overall well-being.</p>

<h3>4. Boosts Energy Levels</h3>
<p>Feeling sluggish or fatigued? Fresh smoothies can provide a natural energy boost without the crash associated with sugary snacks or caffeinated beverages.</p>

<h4>How Smoothies Energize You</h4>
<ul>
<li><strong>Natural Sugars:</strong> Fruits contain natural sugars that provide a quick source of energy. Unlike processed sugars, these natural sugars are accompanied by fiber, which helps to stabilize blood sugar levels.</li>
<li><strong>Hydration:</strong> Many smoothie ingredients, such as cucumbers and watermelon, have high water content, helping to keep you hydrated and energized throughout the day.</li>
<li><strong>Nutrient Density:</strong> The vitamins and minerals found in smoothies can enhance your energy levels by supporting metabolic processes in the body.</li>
</ul>
<p>Incorporating fresh smoothies into your daily routine can help you feel more energized and ready to tackle your day.</p>

<h3>5. Aids in Weight Management</h3>
<p>For those looking to maintain or lose weight, fresh smoothies can be a valuable addition to your diet. When made with the right ingredients, smoothies can be both satisfying and low in calories.</p>

<h4>Tips for Weight Management with Smoothies</h4>
<ul>
<li><strong>Include Protein:</strong> Adding protein sources like Greek yogurt, protein powder, or nut butter can help keep you feeling full longer, reducing the likelihood of snacking on unhealthy options.</li>
<li><strong>Watch the Sugar:</strong> While fruits are healthy, be mindful of the sugar content. Balance your smoothies with vegetables and healthy fats to keep sugar levels in check.</li>
<li><strong>Portion Control:</strong> Smoothies can be calorie-dense, so be aware of portion sizes. A serving size of 8-12 ounces is typically sufficient for a snack or meal replacement.</li>
</ul>
<p>By making mindful choices when preparing your smoothies, you can enjoy their benefits while supporting your weight management goals.</p>

<h3>Conclusion</h3>
<p>Incorporating fresh smoothies into your daily routine can provide numerous health benefits, from boosting your nutrient intake to supporting digestive health and energy levels. By experimenting with different ingredients and flavors, you can create delicious and nutritious smoothies that fit your lifestyle. So why not start blending today? Your body will thank you for it!</p>
`;

    const newBlog = new Blog({
      title,
      slug: slugify(title),
      content: htmlContent,
      authorName: 'hellolapadia',
      published: true,
      tags: ['Smoothies', 'Benefits', 'Healthy', 'Wellness']
    });

    await newBlog.save();
    console.log('Successfully seeded blog post 3');
    
    await mongoose.disconnect();
    console.log('Disconnected');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding DB:', error);
    process.exit(1);
  }
};

seed();
