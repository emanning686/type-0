import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema(
  {
    pin: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const Password = mongoose.model("Password", passwordSchema);
export default Password;
