import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  adminName: {
    type: String,
    required: true,
  },

  adminEmail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
});

const Admins = mongoose.model("Admins", adminSchema);
export default Admins;
