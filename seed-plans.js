"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const SubscriptionPlanSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    frequency: { type: String, required: true, enum: ['daily', 'weekly', 'monthly'] },
    description: { type: String, required: true },
    features: [{ type: String, default: [] }],
    isPopular: { type: Boolean, default: false }
}, { timestamps: true });
const SubscriptionPlan = mongoose_1.default.model('SubscriptionPlan', SubscriptionPlanSchema);
const seed = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');
        await SubscriptionPlan.deleteMany({});
        console.log('Cleared existing plans');
        const plans = [
            {
                name: 'The Daily Booster',
                price: 25000,
                frequency: 'weekly',
                description: 'Get one fresh smoothie delivered to your doorstep every single day for a week. Perfect for maintaining peak energy.',
                features: [
                    '7 Smoothies per week (1 daily)',
                    'Free delivery in Lagos',
                    'Priority support',
                    'Cancel anytime'
                ],
                isPopular: false
            },
            {
                name: 'The Monthly Wellness',
                price: 90000,
                frequency: 'monthly',
                description: 'Your complete health routine automated. Get a daily fresh smoothie delivered all month long, plus weekend special blends.',
                features: [
                    '30 Smoothies per month',
                    'Special weekend blends',
                    'Free delivery in Lagos',
                    'Dedicated account manager',
                    'Cancel anytime'
                ],
                isPopular: true
            },
            {
                name: 'The Weekend Reset',
                price: 15000,
                frequency: 'weekly',
                description: 'Detox over the weekend. 3 specially formulated cleansing smoothies delivered every Saturday morning.',
                features: [
                    '3 Cleansing Smoothies',
                    'Delivered every Saturday',
                    'Nutritional guide included',
                    'Cancel anytime'
                ],
                isPopular: false
            }
        ];
        await SubscriptionPlan.insertMany(plans);
        console.log('Successfully seeded subscription plans');
        await mongoose_1.default.disconnect();
        console.log('Disconnected');
    }
    catch (error) {
        console.error('Error seeding DB:', error);
        process.exit(1);
    }
};
seed();
//# sourceMappingURL=seed-plans.js.map