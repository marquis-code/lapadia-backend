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
    
    const title = "Refreshing Juice Recipes for a Healthy Lifestyle";
    
    const htmlContent = `
<p>Juicing has become a popular trend among health enthusiasts, and for good reason. Fresh juices are not only delicious but also packed with vitamins, minerals, and antioxidants that can boost your overall well-being. Whether you're looking to detox, increase your energy levels, or simply enjoy a refreshing drink, juicing can be a fantastic addition to your daily routine. In this blog post, we will explore some refreshing juice recipes that are easy to make and perfect for a healthy lifestyle.</p>

<p><em>Close-up view of a vibrant fruit juice in a glass with fresh fruits around it. A refreshing fruit juice surrounded by fresh fruits.</em></p>

<h3>The Benefits of Juicing</h3>
<p>Before diving into the recipes, let’s take a moment to understand why juicing is beneficial. Here are some key advantages:</p>
<ul>
<li><strong>Nutrient-Rich:</strong> Juicing allows you to consume a variety of fruits and vegetables in one serving, maximizing your nutrient intake.</li>
<li><strong>Hydration:</strong> Fresh juices are an excellent way to stay hydrated, especially during hot weather.</li>
<li><strong>Detoxification:</strong> Many juices contain ingredients that help cleanse the body and support liver function.</li>
<li><strong>Digestive Health:</strong> Juices can aid digestion and improve gut health by providing enzymes and fiber.</li>
<li><strong>Weight Management:</strong> Incorporating juices into your diet can help you feel full and satisfied, making it easier to manage your weight.</li>
</ul>

<h3>Essential Juicing Equipment</h3>
<p>To get started with juicing, you’ll need some basic equipment. Here’s what you should consider:</p>
<ul>
<li><strong>Juicer:</strong> A good quality juicer is essential. You can choose between centrifugal juicers, masticating juicers, or even a blender if you prefer smoothies.</li>
<li><strong>Cutting Board and Knife:</strong> For preparing your fruits and vegetables.</li>
<li><strong>Storage Containers:</strong> Glass jars or bottles to store your juices, preferably with airtight lids to maintain freshness.</li>
<li><strong>Strainer:</strong> If you’re using a blender, a strainer can help separate the juice from the pulp.</li>
</ul>

<h3>Refreshing Juice Recipes</h3>
<p>Now that you have the basics down, let’s explore some delicious juice recipes that you can easily make at home.</p>

<h4>1. Green Detox Juice</h4>
<p>This juice is perfect for detoxifying your body and boosting your energy levels.</p>
<strong>Ingredients:</strong>
<ul>
<li>1 cucumber</li>
<li>2 green apples</li>
<li>1 handful of spinach</li>
<li>1 lemon (juiced)</li>
<li>1-inch piece of ginger</li>
</ul>
<strong>Instructions:</strong>
<ul>
<li>Wash all the ingredients thoroughly.</li>
<li>Cut the cucumber and apples into smaller pieces.</li>
<li>Juice all the ingredients together.</li>
<li>Stir well and serve chilled.</li>
</ul>

<h4>2. Tropical Citrus Juice</h4>
<p>Bring the taste of the tropics to your kitchen with this refreshing citrus juice.</p>
<strong>Ingredients:</strong>
<ul>
<li>2 oranges</li>
<li>1 pineapple (peeled and chopped)</li>
<li>1 lime (juiced)</li>
<li>A handful of mint leaves</li>
</ul>
<strong>Instructions:</strong>
<ul>
<li>Peel and chop the pineapple.</li>
<li>Juice the oranges and lime.</li>
<li>Combine all ingredients in a blender and blend until smooth.</li>
<li>Strain if desired and serve over ice.</li>
</ul>

<h4>3. Beetroot and Carrot Juice</h4>
<p>This vibrant juice is not only beautiful but also packed with nutrients.</p>
<strong>Ingredients:</strong>
<ul>
<li>2 medium beetroots</li>
<li>3 carrots</li>
<li>1 apple</li>
<li>1-inch piece of ginger</li>
</ul>
<strong>Instructions:</strong>
<ul>
<li>Peel and chop the beetroots and carrots.</li>
<li>Juice all the ingredients together.</li>
<li>Mix well and enjoy the earthy flavors.</li>
</ul>

<h4>4. Berry Blast Juice</h4>
<p>Perfect for a refreshing summer drink, this juice is loaded with antioxidants.</p>
<strong>Ingredients:</strong>
<ul>
<li>1 cup of mixed berries (strawberries, blueberries, raspberries)</li>
<li>1 apple</li>
<li>1 tablespoon of honey (optional)</li>
<li>1 cup of water</li>
</ul>
<strong>Instructions:</strong>
<ul>
<li>Wash the berries and apple.</li>
<li>Juice the apple and mix it with the berries in a blender.</li>
<li>Add honey and water, then blend until smooth.</li>
<li>Strain if desired and serve chilled.</li>
</ul>

<h4>5. Watermelon Mint Juice</h4>
<p>This juice is incredibly hydrating and perfect for hot days.</p>
<strong>Ingredients:</strong>
<ul>
<li>2 cups of watermelon (seedless)</li>
<li>A handful of fresh mint leaves</li>
<li>Juice of 1 lime</li>
</ul>
<strong>Instructions:</strong>
<ul>
<li>Cut the watermelon into chunks.</li>
<li>Juice the watermelon and mint leaves together.</li>
<li>Add lime juice and stir well.</li>
<li>Serve over ice for a refreshing treat.</li>
</ul>

<h3>Tips for Successful Juicing</h3>
<p>To make the most out of your juicing experience, consider these helpful tips:</p>
<ul>
<li><strong>Choose Fresh Ingredients:</strong> Always opt for fresh, organic fruits and vegetables when possible.</li>
<li><strong>Experiment with Flavors:</strong> Don’t be afraid to mix different fruits and vegetables to find your favorite combinations.</li>
<li><strong>Drink Immediately:</strong> Fresh juice is best consumed right after making it to retain maximum nutrients.</li>
<li><strong>Clean Your Juicer:</strong> Clean your juicer immediately after use to prevent any residue buildup.</li>
</ul>

<h3>Incorporating Juices into Your Daily Routine</h3>
<p>Juicing can easily fit into your daily routine. Here are some ideas on how to incorporate these refreshing juices into your life:</p>
<ul>
<li><strong>Morning Boost:</strong> Start your day with a glass of green detox juice for an energizing kick.</li>
<li><strong>Post-Workout Refresher:</strong> Enjoy a berry blast juice after your workout to replenish lost nutrients.</li>
<li><strong>Afternoon Pick-Me-Up:</strong> Keep a bottle of tropical citrus juice in the fridge for a refreshing afternoon snack.</li>
<li><strong>Healthy Dessert:</strong> Use watermelon mint juice as a light dessert option on hot days.</li>
</ul>

<h3>Conclusion</h3>
<p>Juicing is a simple and enjoyable way to enhance your health and well-being. With these refreshing juice recipes, you can easily incorporate a variety of nutrients into your diet. Remember to experiment with different ingredients and find the combinations that you love the most. So grab your juicer, get creative, and enjoy the delicious benefits of fresh juices!</p>
<p>By making juicing a regular part of your lifestyle, you can support your health goals and enjoy a refreshing treat at the same time. Start today and discover how easy it is to live a healthier life with these delicious juice recipes!</p>
`;

    const newBlog = new Blog({
      title,
      slug: slugify(title),
      content: htmlContent,
      authorName: 'hellolapadia',
      published: true,
      tags: ['Juices', 'Recipes', 'Healthy', 'Detox']
    });

    await newBlog.save();
    console.log('Successfully seeded blog post 2');
    
    await mongoose.disconnect();
    console.log('Disconnected');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding DB:', error);
    process.exit(1);
  }
};

seed();
