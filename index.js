const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

database.connect();

app.use(express.json());
app.use(cookieParser());

// CORS setup
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// Enable pre-flight requests for all routes
app.options('*', cors());

// Additional CORS headers setup (optional)

// File upload middleware setup
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp"
}));

// Connect to cloudinary
cloudinaryConnect();

// Route setup
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/reach", contactUsRoute);

// Default route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: 'Smooth Operator'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
