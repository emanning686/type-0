import express from "express";
import cors from "cors";
import env from "dotenv";
import mongoose from "mongoose";
import Password from "./models/passwordModel.js";
import bodyParser from "body-parser";

const app = express();
const port = 8080;
env.config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/ping", (req, res) => {
  res.json({ message: "ping successful" });
});

app.post("/api/:pin", async (req, res) => {
  console.log(req.params.pin);
  try {
    let pin = req.params.pin;
    let response = await Password.findOne({
      pin,
    });
    if (response) {
      let quantity = response.quantity + 1;
      await Password.updateOne(
        { pin },
        {
          $set: { quantity },
          $currentDate: { lastModified: true },
        }
      );
    } else {
      await Password.create({
        pin,
        quantity: 1,
      });
    }
    response = await Password.findOne({
      pin,
    });
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
