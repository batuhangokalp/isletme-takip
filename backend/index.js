const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB bağlantısı başarılı.");
    app.listen(process.env.PORT, () =>
      console.log(`Sunucu ${process.env.PORT} portunda çalışıyor.`)
    );
  })
  .catch((err) => console.error("Mongo bağlantı hatası:", err));
