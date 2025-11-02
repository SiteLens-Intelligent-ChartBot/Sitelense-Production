import dbConnect from "@/lib/db";
import SlotBooking from "@/models/SlotBooking";

// ✅ Check availability by date (POST with body)
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { date } = body;

    if (!date) {
      return new Response(JSON.stringify({ error: "Date is required" }), { status: 400 });
    }

    // Find booked slots for that date
    const bookedSlots = await SlotBooking.find({ date }).select("slot -_id");
    const booked = bookedSlots.map(s => s.slot);

    const allSlots = ["Day", "Night"];
    const available = allSlots.filter(slot => !booked.includes(slot));

    if (available.length === 0) {
      return new Response(JSON.stringify({ date, available: null }), { status: 200 });
    }

    return new Response(JSON.stringify({ date, available }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
