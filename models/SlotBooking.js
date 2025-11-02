import mongoose from "mongoose";

const SlotBookingSchema = new mongoose.Schema(
  {
    date: { type: String, required: true }, // e.g. "2025-09-15"
    slot: { type: String, enum: ["Day", "Night"], required: true },
  },
  { timestamps: true }
);

// Prevent duplicate date + slot
SlotBookingSchema.index({ date: 1, slot: 1 }, { unique: true });

export default mongoose.models.SlotBooking || mongoose.model("SlotBooking", SlotBookingSchema);
