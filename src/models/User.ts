import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  recipe: [{ type: Schema.ObjectId, ref: "Recipe" }],
  image: { type: String },
});

const User = model("User", UserSchema);

export default User;
