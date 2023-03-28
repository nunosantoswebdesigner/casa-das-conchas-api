import mongoose from "mongoose";
const { model, Schema } = mongoose;

const ShellSchema = new Schema({
  id: { type: mongoose.Types.ObjectId, required: false },
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
  qrcode: { type: String, required: false },
  location: { type: String, required: false },
  category: { type: String, required: false },
  // tags: { type: Array, required: false },
}, 
{ 
  timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
  }
});

export default model('Shell', ShellSchema);
