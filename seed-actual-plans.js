const mongoose = require('mongoose');
require('dotenv').config();

const SubscriptionPlanSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    frequency: { type: String, required: true, enum: ['daily', 'weekly', 'monthly'] },
    description: { type: String, required: true },
    features: [{ type: String, default: [] }],
    isPopular: { type: Boolean, default: false }
}, { timestamps: true });

const SubscriptionPlan = mongoose.models.SubscriptionPlan || mongoose.model('SubscriptionPlan', SubscriptionPlanSchema);

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');
        await SubscriptionPlan.deleteMany({});
        console.log('Cleared existing plans');
        
        const plans = [
            // Menu 1 Plans (Weekly/Monthly Frequencies)
            {
                name: 'Juices, Smoothies & Fruit Bowl (Once weekly)',
                price: 12800,
                frequency: 'weekly',
                description: 'Mondays to Fridays. 20% OFF.',
                features: ['Once weekly'],
                isPopular: false
            },
            {
                name: 'Juices, Smoothies & Fruit Bowl (Two times per week)',
                price: 25600,
                frequency: 'weekly',
                description: 'Mondays to Fridays. 20% OFF.',
                features: ['Two times per week'],
                isPopular: true
            },
            {
                name: 'Juices, Smoothies & Fruit Bowl (Three times per week)',
                price: 38400,
                frequency: 'weekly',
                description: 'Mondays to Fridays. 20% OFF.',
                features: ['Three times per week'],
                isPopular: false
            },
            {
                name: 'Parfait (Once monthly)',
                price: 10800,
                frequency: 'monthly',
                description: 'Mondays to Fridays. 20% OFF. (at least 3 months)',
                features: ['Once monthly', 'At least 3 months commitment'],
                isPopular: false
            },
            {
                name: 'Parfait (Once weekly)',
                price: 14400,
                frequency: 'weekly',
                description: 'Mondays to Fridays. 20% OFF.',
                features: ['Once weekly'],
                isPopular: false
            },
            {
                name: 'Parfait (Two times per week)',
                price: 28800,
                frequency: 'weekly',
                description: 'Mondays to Fridays. 20% OFF.',
                features: ['Two times per week'],
                isPopular: false
            },

            // Combo Packages (Monthly)
            {
                name: 'Saver Combo - Juices/Smoothies (4 Bottles)',
                price: 14400,
                frequency: 'monthly',
                description: 'Combo Packages (Cost Saver!!). Subscriptions run for one month only.',
                features: ['4 Bottles (Mondays to Fridays)'],
                isPopular: false
            },
            {
                name: 'Saver Combo - Juices/Smoothies (8 Bottles)',
                price: 27000,
                frequency: 'monthly',
                description: 'Combo Packages (Cost Saver!!). Subscriptions run for one month only.',
                features: ['8 Bottles (Mondays to Fridays)'],
                isPopular: true
            },
            {
                name: 'Saver Combo - Juices/Smoothies (12 Bottles)',
                price: 40000,
                frequency: 'monthly',
                description: 'Combo Packages (Cost Saver!!). Subscriptions run for one month only.',
                features: ['12 Bottles (Mondays to Fridays)'],
                isPopular: false
            },
            {
                name: 'Saver Combo - Parfait (4 cups)',
                price: 14400,
                frequency: 'monthly',
                description: 'Combo Packages (Cost Saver!!). Subscriptions run for one month only.',
                features: ['4 cups'],
                isPopular: false
            },
            {
                name: 'Saver Combo - Parfait (8 cups)',
                price: 28000,
                frequency: 'monthly',
                description: 'Combo Packages (Cost Saver!!). Subscriptions run for one month only.',
                features: ['8 cups'],
                isPopular: false
            },
            {
                name: 'Saver Combo - Parfait (12 cups)',
                price: 42000,
                frequency: 'monthly',
                description: 'Combo Packages (Cost Saver!!). Subscriptions run for one month only.',
                features: ['12 cups'],
                isPopular: false
            },
            {
                name: 'Saver Combo - Fruit Bowls (4 plates)',
                price: 12800,
                frequency: 'monthly',
                description: 'Combo Packages (Cost Saver!!). Subscriptions run for one month only.',
                features: ['4 plates'],
                isPopular: false
            },
            {
                name: 'Saver Combo - Fruit Bowls (8 plates)',
                price: 25600,
                frequency: 'monthly',
                description: 'Combo Packages (Cost Saver!!). Subscriptions run for one month only.',
                features: ['8 plates'],
                isPopular: false
            },
            {
                name: 'Saver Combo - Fruit Bowls (12 plates)',
                price: 38400,
                frequency: 'monthly',
                description: 'Combo Packages (Cost Saver!!). Subscriptions run for one month only.',
                features: ['12 plates'],
                isPopular: false
            }
        ];

        await SubscriptionPlan.insertMany(plans);
        console.log(`Successfully seeded ${plans.length} subscription plans`);
        
        await mongoose.disconnect();
        console.log('Disconnected');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding DB:', error);
        process.exit(1);
    }
};

seed();
