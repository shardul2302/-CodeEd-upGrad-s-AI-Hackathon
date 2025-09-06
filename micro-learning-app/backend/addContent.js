// addContent.js
// Seeder script to insert sample content

const mongoose = require("mongoose");

// 1. Connect directly to MongoDB (hardcoded)
mongoose
  .connect("mongodb://127.0.0.1:27017/micro_learning_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// 2. Define Schema
const contentSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  createdAt: { type: Date, default: Date.now },
});

// 3. Create Model
const Content = mongoose.model("Content", contentSchema);

// 4. Insert Sample Data
async function seedContent() {
  try {
    const sampleData = [
      {
        title: "Introduction to MERN",
        description:
          "Learn basics of MongoDB, Express, React, and Node.js with simple examples.",
        category: "Web Development",
      },
      {
        title: "JavaScript Fundamentals",
        description:
          "Understand variables, functions, arrays, and ES6 features in depth.",
        category: "Programming",
      },
      {
        title: "Database Design",
        description:
          "Learn about schemas, relations, indexes, and normalization techniques.",
        category: "Database",
      },
    ];

    await Content.insertMany(sampleData);
    console.log("✅ Sample content inserted successfully!");
  } catch (err) {
    console.error("❌ Error inserting content:", err);
  } finally {
    mongoose.connection.close(); // Close DB connection after operation
  }
}

// Run seeder
seedContent();
