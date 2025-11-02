import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";
import cloudinary from "@/lib/cloudinary";
import Receipt from "@/models/Receipt";
import { createCanvas } from "canvas";
import SlotBooking from "@/models/SlotBooking";




// 🎨 Helper: Generate a receipt image for one booking
async function generateReceiptImage(booking) {
  const width = 800;
  const height = 1000;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, width, height);

  // Header
  ctx.fillStyle = "#000";
  ctx.font = "bold 28px Arial";
  ctx.textAlign = "center";
  ctx.fillText("🎵 Sunil Pro DJ - Booking Receipt 🎵", width / 2, 120);

  ctx.font = "18px Arial";
  ctx.textAlign = "left";
  ctx.fillText(`Receipt No: ${booking._id.toString().slice(-6).toUpperCase()}`, 50, 180);
  ctx.fillText(`Date Issued: ${new Date().toLocaleDateString()}`, 550, 180);

  // Table Header
  ctx.fillStyle = "#444";
  ctx.fillRect(50, 220, 700, 40);

  ctx.fillStyle = "#fff";
  ctx.font = "bold 18px Arial";
  ctx.fillText("Booking Details", 60, 247);

  // Table Content
  ctx.fillStyle = "#000";
  ctx.font = "16px Arial";

  const details = [
    ["Full Name", booking.fullName],
    ["Phone", booking.phoneNumber],
    ["Address", booking.address],
    ["Date", booking.date],
    ["Slot", booking.slot],
    ["Duration", booking.duration],
    ["From", booking.from || "-"],
    ["To", booking.to || "-"],
    ["Status", booking.status],
    ["Total Payment", `₹${booking.totalPayment}`],
    ["advance Payment", `₹${booking.advancePayment}`],


  ];

  let startY = 280;
  details.forEach(([label, value]) => {
    ctx.fillText(label + ":", 60, startY);
    ctx.fillText(value, 250, startY);
    startY += 40;
  });

  // Line
  ctx.beginPath();
  ctx.moveTo(50, startY + 10);
  ctx.lineTo(750, startY + 10);
  ctx.strokeStyle = "#aaa";
  ctx.stroke();

  // Signature Box
  ctx.font = "16px Arial";
  ctx.fillText("Authorized Signature:", 500, startY + 80);
  ctx.beginPath();
  ctx.moveTo(500, startY + 100);
  ctx.lineTo(740, startY + 100);
  ctx.stroke();

  // Footer
  ctx.font = "italic 14px Arial";
  ctx.fillText("Thank you for booking with Sunil Pro DJ! 🎶", 60, height - 50);

  return canvas.toBuffer("image/png");
}

// ✅ Create booking
export async function POST(req) {
  try {
    await dbConnect();
    const formData = await req.formData();

    const fullName = formData.get("fullName");
    const phoneNumber = formData.get("phone");
    const address = formData.get("address");
    const date = formData.get("date");
    const slot = formData.get("slot");
    const duration = formData.get("duration");

    const from = formData.get("fromPlace") || null;
    const to = formData.get("toPlace") || null;
    const totalPayment = formData.get("totalPayment")
      ? Number(formData.get("totalPayment"))
      : 0;
    const advancePayment = formData.get("advancePayment")
      ? Number(formData.get("advancePayment"))
      : 0;

    const aadhaarFile = formData.get("aadharCard");
    if (!aadhaarFile) {
      return new Response(JSON.stringify({ error: "Aadhaar file required" }), { status: 400 });
    }

    // Convert file → buffer
    const arrayBuffer = await aadhaarFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: "auto", folder: "bookings" },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      ).end(buffer);
    });

    // Save booking
    const booking = await Booking.create({
      fullName,
      phoneNumber,
      address,
      date,
      slot,
      duration,
      from,
      to,
      status: "Pending",
      totalPayment,
      advancePayment,
      aadhaarCardUrl: uploadResponse.secure_url,
    });

    return new Response(JSON.stringify(booking), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// ✅ Get bookings by status (Pending / Verified) if status not present it return all bookings
export async function GET(req) {
  try {
    await dbConnect();

    // read query params from request URL
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status"); 

    let query = {};
    if (status) {
      query.status = status; 
    }

    const bookings = await Booking.find(query).sort({ createdAt: -1 });

    return new Response(JSON.stringify(bookings), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}


// ✅ Delete booking by ID (also delete receipts)
export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ error: "Booking ID required" }), { status: 400 });
    }

    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      return new Response(JSON.stringify({ error: "Booking not found" }), { status: 404 });
    }

    // Delete related receipts
    await Receipt.deleteMany({ bookingId: id });

    //delete slots also
    if (!deletedBooking.date || !deletedBooking.slot) {
      return new Response(JSON.stringify({ error: "Date and slot are required" }), { status: 400 });
    }
    const date = deletedBooking.date;
    const slot = deletedBooking.slot;


    await SlotBooking.findOneAndDelete({ date, slot });

    return new Response(
      JSON.stringify({ message: "Booking and related receipts and slot  deleted successfully" }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// ✅ Update booking (status / price) and generate receipt
export async function PATCH(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const { id, status, totalPayment, advancePayment } = body;
    if (!id) {
      return new Response(JSON.stringify({ error: "Booking ID required" }), { status: 400 });
    }

    const updateData = {};
    if (status) updateData.status = status;
    if (typeof totalPayment === "number") updateData.totalPayment = totalPayment;
    if (typeof advancePayment === "number") updateData.advancePayment = advancePayment;


    const updatedBooking = await Booking.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedBooking) {
      return new Response(JSON.stringify({ error: "Booking not found" }), { status: 404 });
    }

    // 🎯 Generate receipt after update
    const buffer = await generateReceiptImage(updatedBooking);

    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: "image", folder: "receipts" },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      ).end(buffer);
    });

    const receipt = await Receipt.create({
      phoneNumber: updatedBooking.phoneNumber,
      bookingId: updatedBooking._id,
      receiptUrl: uploadResponse.secure_url,
    });


    if (!updatedBooking.date || !updatedBooking.slot) {
      return new Response(JSON.stringify({ error: "Date and slot are required" }), { status: 400 });
    }
    const date = updatedBooking.date;
    const slot = updatedBooking.slot;

    const newSlot = await SlotBooking.create({ date, slot });


    return new Response(
      JSON.stringify({ updatedBooking, receipt, newSlot }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
