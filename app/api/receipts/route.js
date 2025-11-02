import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";
import Receipt from "@/models/Receipt";
import cloudinary from "@/lib/cloudinary";
import { createCanvas } from "canvas";


// ✅ Get receipts by phone number
export async function POST(req) {
  try {
    await dbConnect();
    const { phoneNumber } = await req.json();

    if (!phoneNumber) {
      return new Response(JSON.stringify({ error: "Phone number required" }), { status: 400 });
    }

    const receipts = await Receipt.find({ phoneNumber })
      .populate("bookingId")
      .sort({ createdAt: -1 });

    if (!receipts.length) {
      return new Response(JSON.stringify({ error: "No receipts found" }), { status: 404 });
    }

    return new Response(JSON.stringify(receipts), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// ✅ Get all receipts
export async function GET() {
  try {
    await dbConnect();
    const receipts = await Receipt.find().populate("bookingId").sort({ createdAt: -1 });
    return new Response(JSON.stringify(receipts), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
