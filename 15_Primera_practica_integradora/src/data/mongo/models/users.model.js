import { model, Schema } from "mongoose";

const collection = "users";
const schema = new Schema(
  {
    name: { type: String, required: true },
    photo: {
        type: String,
        default: "https://c1.klipartz.com/pngpicture/74/8/sticker-png-circle-silhouette-user-logo-user-profile-avatar-head-line-art-oval.png",
      },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const User = model(collection, schema);
export default User;
