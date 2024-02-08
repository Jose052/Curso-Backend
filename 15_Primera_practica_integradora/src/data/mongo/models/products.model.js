import { model, Schema } from "mongoose";

const collection = "products";
const schema = new Schema(
  {
    title: { type: String, required: true },
    photo: {
        type: String,
        default: "https://i.pinimg.com/736x/c9/98/0b/c9980b7a33a4dc11a275ae12f6967957.jpg",
    },
    price: { type: Number, default: 0 },
    stock: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Product = model(collection, schema);
export default Product;
