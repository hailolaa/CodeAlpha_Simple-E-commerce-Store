const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(async () => {
  console.log("Connected to MongoDB Atlas");

  const products = [
    {
      name: "T-shirt",
      description: "High-quality cotton T-shirt",
      price: 15.99,
      imageURL: "https://via.placeholder.com/150",
      category: "Clothing"
    },
    {
      name: "Sneakers",
      description: "Stylish running shoes",
      price: 59.99,
      imageURL: "https://via.placeholder.com/150",
      category: "Footwear"
    },
    {
      name: "Backpack",
      description: "Water-resistant backpack",
      price: 39.99,
      imageURL: "https://via.placeholder.com/150",
      category: "Accessories"
    },
    {
      name: "Smartphone",
      description: "Latest model smartphone with high performance",
      price: 699.99,
      imageURL: "https://via.placeholder.com/150",
      category: "Electronics"
    },
    {
      name: "Headphones",
      description: "Noise-cancelling over-ear headphones",
      price: 199.99,
      imageURL: "https://via.placeholder.com/150",
      category: "Electronics"
    },
    {
      name: "Smartwatch",
      description: "Feature-rich smartwatch with health tracking",
      price: 249.99,
      imageURL: "https://via.placeholder.com/150",
      category: "Electronics"
    },
    {
      name: "Coffee Maker",
      description: "Automatic coffee maker with programmable settings",
      price: 89.99,
      imageURL: "https://via.placeholder.com/150",
      category: "Home Appliances"
    },
    {
      name: "Blender",
      description: "High-speed blender for smoothies and soups",
      price: 49.99,
      imageURL: "https://via.placeholder.com/150",
      category: "Home Appliances"
    },
    {
      name: "Yoga Mat",
      description: "Non-slip yoga mat for comfort and stability",
      price: 19.99,
      imageURL: "https://via.placeholder.com/150",
      category: "Fitness"
    },
    {
      name: "Dumbbells",
      description: "Adjustable dumbbells for home workouts",
      price: 79.99,
      imageURL: "https://via.placeholder.com/150",
      category: "Fitness"
    },
    {
      name: "Cookbook",
      description: "Collection of healthy recipes for everyday cooking",
      price: 24.99,
      imageURL: "https://via.placeholder.com/150",
      category: "Books"
    },
    {
      name: "Novel",
      description: "Bestselling novel by a renowned author",
      price: 14.99,
      imageURL: "https://via.placeholder.com/150",
      category: "Books"
    },
    {
      name: "Board Game",
      description: "Fun board game for family and friends",
      price: 29.99,
      imageURL: "https://via.placeholder.com/150",
      category: "Toys"
    },
    {
      name: "Puzzle",
      description: "Challenging jigsaw puzzle for all ages",
      price: 19.99,
      imageURL: "https://via.placeholder.com/150",
      category: "Toys"
    },
     {
      name: "Kaleab",
      description: "A 13 year old cool boy",
      price: 40000000,
      imageURL: "D:\Project\E-Commerce\frontend\assets\k.jpg",
      category: "Toys"
    }
  ];

  try {
    await Product.deleteMany({});
    console.log("Old products deleted");

    await Product.insertMany(products);
    console.log("New products added successfully");

  } catch (err) {
    console.error("Error seeding products:", err);
  }

  process.exit();
})
.catch(err => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});
