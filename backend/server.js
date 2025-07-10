const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
console.log("MONGO_URI carregado:", process.env.MONGO_URI);


const app = express();

app.use(cors());
app.use(express.json());

// Rotas de autenticação
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("DevFinance API is running");
});

const transactionRoutes = require("./routes/transactionRoutes");
app.use("/api/transactions", transactionRoutes);



// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
