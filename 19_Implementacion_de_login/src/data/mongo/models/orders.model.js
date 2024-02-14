import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "orders";
const schema = new Schema(
  {
    uid: { type: Schema.ObjectId, required: true, ref: "users" },
    pid: { type: Schema.ObjectId, required: true, ref: "products" },
    quantity: { type: Number, default: 0 },
    state: {
      type: String,
      default: "reservado",
      enum: ["reservado", "pagado", "entregado"],
    },
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate)
schema.pre("find", function () {
  this.populate("uid", "-password -createdAt -updatedAt -__v");
});
schema.pre("find", function () {
  this.populate("pid", "name place price");
});
const Order = model(collection, schema);
export default Order;
