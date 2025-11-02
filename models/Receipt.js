import mongoose from "mongoose";

const ReceiptSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String, required: true },
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
    receiptUrl: { type: String, required: true }, // Cloudinary URL of receipt image
  },
  { timestamps: true }
);

export default mongoose.models.Receipt || mongoose.model("Receipt", ReceiptSchema);
