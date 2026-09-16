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
    
    const title = "Discover Seasonal Fruits for Delicious Smoothie Blends";
    
    const htmlContent = `
<p>Smoothies are a fantastic way to pack a variety of nutrients into a single meal or snack. They are not only delicious but also incredibly versatile, allowing you to mix and match ingredients based on your preferences and seasonal availability. In this post, we will explore the best seasonal fruits for creating delightful smoothie blends that are both refreshing and nutritious.</p>

<h3>Why Choose Seasonal Fruits?</h3>
<p>Using seasonal fruits in your smoothies offers several benefits:</p>
<ul>
<li><strong>Freshness:</strong> Seasonal fruits are often harvested at their peak ripeness, which means they are fresher and more flavorful.</li>
<li><strong>Nutritional Value:</strong> Fruits that are in season tend to have higher nutrient content, as they are picked at the right time.</li>
<li><strong>Cost-Effectiveness:</strong> Seasonal fruits are usually more affordable since they are abundant and readily available.</li>
<li><strong>Environmental Impact:</strong> Choosing local, seasonal produce reduces the carbon footprint associated with transportation.</li>
</ul>

<h3>Spring Fruits for Smoothies</h3>
<p>As winter fades and spring blossoms, a variety of fruits become available. Here are some top picks for spring smoothies:</p>

<h4>Strawberries</h4>
<p>Strawberries are one of the first fruits to appear in spring. They are rich in vitamin C, antioxidants, and fiber. A simple strawberry smoothie can be made by blending:</p>
<ul>
<li>1 cup of fresh strawberries</li>
<li>1 banana</li>
<li>1 cup of almond milk</li>
<li>A tablespoon of honey (optional)</li>
</ul>

<h4>Pineapples</h4>
<p>Pineapples are another delightful spring fruit. They add a tropical twist to your smoothies and are packed with bromelain, which aids digestion. Try this refreshing blend:</p>
<ul>
<li>1 cup of pineapple chunks</li>
<li>1 cup of spinach</li>
<li>1 banana</li>
<li>1 cup of coconut water</li>
</ul>

<h4>Rhubarb</h4>
<p>While technically a vegetable, rhubarb is often used in desserts and smoothies. Its tart flavor pairs well with sweeter fruits. Combine rhubarb with strawberries for a delicious blend:</p>
<ul>
<li>1 cup of chopped rhubarb (cooked)</li>
<li>1 cup of strawberries</li>
<li>1 cup of yogurt</li>
<li>A splash of orange juice</li>
</ul>

<p><em>Close-up view of a vibrant smoothie bowl topped with fresh strawberries and pineapple. A colorful smoothie bowl showcasing seasonal fruits.</em></p>

<h3>Summer Fruits for Smoothies</h3>
<p>Summer brings a bounty of juicy fruits that can elevate your smoothie game. Here are some must-try options:</p>

<h4>Watermelon</h4>
<p>Watermelon is hydrating and refreshing, making it perfect for hot summer days. Blend it with mint for a cooling smoothie:</p>
<ul>
<li>2 cups of watermelon cubes</li>
<li>A handful of fresh mint leaves</li>
<li>1 lime (juiced)</li>
<li>1 cup of ice</li>
</ul>

<h4>Peaches</h4>
<p>Peaches are sweet and fragrant, adding a lovely flavor to smoothies. They are also rich in vitamins A and C. Try this peach smoothie:</p>
<ul>
<li>1 ripe peach (pitted and sliced)</li>
<li>1 cup of Greek yogurt</li>
<li>1 tablespoon of honey</li>
<li>A sprinkle of cinnamon</li>
</ul>

<h4>Blueberries</h4>
<p>Blueberries are packed with antioxidants and are a great addition to any smoothie. They pair well with bananas and spinach:</p>
<ul>
<li>1 cup of blueberries</li>
<li>1 banana</li>
<li>1 cup of spinach</li>
<li>1 cup of almond milk</li>
</ul>

<h3>Fall Fruits for Smoothies</h3>
<p>As the leaves change color, so do the fruits available for smoothies. Here are some fall favorites:</p>

<h4>Apples</h4>
<p>Apples are versatile and can be used in various smoothie recipes. They provide fiber and vitamin C. A simple apple smoothie can include:</p>
<ul>
<li>1 apple (cored and sliced)</li>
<li>1 cup of spinach</li>
<li>1 tablespoon of peanut butter</li>
<li>1 cup of almond milk</li>
</ul>

<h4>Pears</h4>
<p>Pears add a sweet, juicy flavor to smoothies. They are high in fiber and vitamin K. Try this pear smoothie:</p>
<ul>
<li>1 ripe pear (cored and sliced)</li>
<li>1 cup of Greek yogurt</li>
<li>A dash of nutmeg</li>
<li>1 cup of almond milk</li>
</ul>

<h4>Pomegranates</h4>
<p>Pomegranates are rich in antioxidants and add a unique flavor to smoothies. Use the seeds in this blend:</p>
<ul>
<li>1 cup of pomegranate seeds</li>
<li>1 banana</li>
<li>1 cup of spinach</li>
<li>1 cup of coconut water</li>
</ul>

<h3>Winter Fruits for Smoothies</h3>
<p>Even in winter, you can enjoy delicious smoothies by using seasonal fruits. Here are some winter picks:</p>

<h4>Citrus Fruits</h4>
<p>Citrus fruits like oranges, grapefruits, and lemons are abundant in winter. They are high in vitamin C and can brighten up any smoothie. Try this citrus blend:</p>
<ul>
<li>1 orange (peeled)</li>
<li>1 grapefruit (peeled)</li>
<li>1 banana</li>
<li>A handful of kale</li>
<li>1 cup of water</li>
</ul>

<h4>Kiwi</h4>
<p>Kiwi is a nutrient-dense fruit that adds a tangy flavor to smoothies. It is high in vitamin C and fiber. Blend it with:</p>
<ul>
<li>2 kiwis (peeled)</li>
<li>1 banana</li>
<li>1 cup of spinach</li>
<li>1 cup of almond milk</li>
</ul>

<h4>Bananas</h4>
<p>Bananas are available year-round and are a great base for smoothies. They add creaminess and natural sweetness. Combine with:</p>
<ul>
<li>1 banana</li>
<li>1 cup of frozen berries</li>
<li>1 cup of yogurt</li>
<li>A splash of honey</li>
</ul>

<h3>Tips for Making the Perfect Smoothie</h3>
<p>Creating the perfect smoothie involves more than just throwing ingredients into a blender. Here are some tips to enhance your smoothie-making skills:</p>
<ul>
<li><strong>Balance Flavors:</strong> Combine sweet, tart, and creamy ingredients for a well-rounded flavor.</li>
<li><strong>Add Greens:</strong> Incorporating leafy greens like spinach or kale boosts the nutritional value without overpowering the taste.</li>
<li><strong>Use Frozen Fruits:</strong> Frozen fruits can add creaminess and chill to your smoothie without the need for ice.</li>
<li><strong>Experiment with Liquids:</strong> Try different bases like almond milk, coconut water, or yogurt to find your favorite combination.</li>
<li><strong>Sweeten Naturally:</strong> Use honey, maple syrup, or dates for natural sweetness instead of refined sugars.</li>
</ul>

<h3>Conclusion</h3>
<p>Incorporating seasonal fruits into your smoothies not only enhances the flavor but also maximizes the nutritional benefits. By choosing fruits that are in season, you can enjoy a variety of tastes and textures throughout the year. Whether you prefer the refreshing taste of summer watermelon or the cozy flavors of winter citrus, there is a smoothie for every season.</p>

<p>So, grab your blender and start experimenting with these seasonal fruits to create delicious and nutritious smoothie blends that will keep you energized and satisfied. Happy blending!</p>
`;

    const newBlog = new Blog({
      title,
      slug: slugify(title),
      content: htmlContent,
      authorName: 'hellolapadia',
      published: true,
      tags: ['Smoothies', 'Fruits', 'Seasonal', 'Healthy']
    });

    await newBlog.save();
    console.log('Successfully seeded blog post');
    
    await mongoose.disconnect();
    console.log('Disconnected');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding DB:', error);
    process.exit(1);
  }
};

seed();
