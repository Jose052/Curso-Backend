import { model, Schema } from "mongoose";

const collection = "orders";
const schema = new Schema(
  {
    uid: { type: Schema.ObjectId, ref: "users" },
    pid: { type: Schema.ObjectId, ref: "products" },
    quantity: { type: Number, default: 0 },
    state: {
      type: String,
      default: "reservado",
      enum: ["reservado", "pagado", "entregado"],
    },
  },
  { timestamps: true }
);

const Order = model(collection, schema);
export default Order;
