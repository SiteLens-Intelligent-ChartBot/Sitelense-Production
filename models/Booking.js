import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    date: { type: String, required: true },
    slot: { type: String, enum: ["Day", "Night"], required: true },
    duration: { type: String },

    
    from: { type: String, required: false }, 
    to: { type: String, required: false },  
    status: { 
      type: String, 
      enum: ["Pending", "Verified"], 
      default: "Pending" 
    },
    totalPayment: { type: Number, default: 0 }, // default 0
    advancePayment: { type: Number, default: 0 }, // default 0


    aadhaarCardUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
