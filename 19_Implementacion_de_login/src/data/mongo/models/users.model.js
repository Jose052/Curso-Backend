import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "users";
const schema = new Schema(
  {
    name: { type: String, required: true },
    photo: {
        type: String,
        default: "https://c1.klipartz.com/pngpicture/74/8/sticker-png-circle-silhouette-user-logo-user-profile-avatar-head-line-art-oval.png",
      },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Number, default: 0 },
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate)
const User = model(collection, schema);
export default User;
