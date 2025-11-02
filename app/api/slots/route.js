import dbConnect from "@/lib/db";
import SlotBooking from "@/models/SlotBooking";

// ✅ Create a slot booking
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { date, slot } = body;

    if (!date || !slot) {
      return new Response(JSON.stringify({ error: "Date and slot are required" }), { status: 400 });
    }

    // Create slot (unique date+slot enforced by model)
    const newSlot = await SlotBooking.create({ date, slot });

    return new Response(JSON.stringify(newSlot), { status: 201 });
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key (slot already booked)
      return new Response(JSON.stringify({ error: "Slot already booked!" }), { status: 400 });
    }
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// ✅ Get all slot bookings
export async function GET() {
  try {
    await dbConnect();
    const slots = await SlotBooking.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(slots), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
