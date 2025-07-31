const express = require("express");
const app = express();
//const mongoose = require ("mongoose")
const mainRouter = require("./routes/index"); // adjust if needed
const cors = require("cors");


//const MONGO_URI = "mongodb+srv://sarthakvyas41:sarthak54321@cluster0.zugremz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// mongoose.connect(MONGO_URI)
//   .then(() => {
//     console.log("✅ Connected to MongoDB Atlas");
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on http://localhost:${PORT}`);
//     });
//   })
//   .catch(err => {
//     console.error("❌ MongoDB connection failed:", err.message);
//   });

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1", mainRouter);

// Server listening
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
