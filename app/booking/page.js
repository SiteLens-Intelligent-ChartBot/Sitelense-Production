"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import Link from "next/link"; // ✅ for navigation
import { useRouter } from "next/navigation"; // ✅ add at top


export default function BookingForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    fromPlace: "",
    toPlace: "",
    date: null,
    slot: "",
    duration: "",
    aadharCard: null,
  });

  const router = useRouter(); // ✅ init router
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    if (formData.date) {
      checkAvailability(formData.date);
    }
  }, [formData.date]);

  const checkAvailability = async (selectedDate) => {
    try {
      setLoadingSlots(true);
      const res = await axios.post(
        `${API_BASE}/api/slots/availability`,
        { date: selectedDate },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setAvailableSlots(res.data.available || []);
      setFormData((prev) => ({ ...prev, slot: "" }));
    } catch (err) {
      console.error("Error checking availability:", err);
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, aadharCard: file }));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formatted = date ? format(date, "dd-MM-yyyy") : null;
    setFormData((prev) => ({ ...prev, date: formatted }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const bookingData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        bookingData.append(key, value);
      });

      const res = await axios.post(`${API_BASE}/api/bookings`, bookingData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Booking Response:", res.data);
      router.push("/successful-booking");
      setFormData({
        fullName: "",
        phone: "",
        address: "",
        fromPlace: "",
        toPlace: "",
        date: null,
        slot: "",
        duration: "",
        aadharCard: null,
      });
      setSelectedDate(null);
    } catch (err) {
      console.error("Booking error:", err);
      alert("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }

    {loading && (
  <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50">
    {/* Spinner */}
    <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
    {/* Text */}
    <p className="mt-3 text-white font-semibold">Loading...</p>
  </div>
)}

  };

  return (
    <div className="bg-gradient-to-br from-[#fdf6f2] to-[#fde8ea] min-h-screen p-4">

      {/* ✅ Loader Overlay */}
    {loading && (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/10 bg-opacity-40 backdrop-blur-sm z-50">
        <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-3 text-white font-semibold">Loading...</p>
      </div>
    )}
    
      {/* ✅ Breadcrumb */}
      <nav className="text-sm mb-4 max-w-2xl mx-auto">
        <ol className="flex space-x-2 text-gray-600">
          <li>
            <Link href="/" className="text-amber-600 hover:underline">
              Home
            </Link>
          </li>
          <li>/</li>
          <li className="font-semibold">Booking</li>
        </ol>
      </nav>

      {/* ✅ Responsive Card */}
      <div className="max-w-2xl mx-auto p-6 text-gray-700 bg-white shadow rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-amber-600">
          Booking Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <label className="block">
            Full Name
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1 focus:ring focus:ring-amber-300"
              required
            />
          </label>

          {/* Phone Number */}
          <label className="block">
            Phone Number
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1 focus:ring focus:ring-amber-300"
              required
            />
          </label>

          {/* Address */}
          <label className="block">
            Address
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1 focus:ring focus:ring-amber-300"
              required
            />
          </label>

          {/* From / To - ✅ stack on mobile, row on larger screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              From (Place)
              <input
                type="text"
                name="fromPlace"
                value={formData.fromPlace}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1 focus:ring focus:ring-amber-300"
                required
              />
            </label>

            <label className="block">
              To (Place)
              <input
                type="text"
                name="toPlace"
                value={formData.toPlace}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1 focus:ring focus:ring-amber-300"
                required
              />
            </label>
          </div>

          {/* Date Picker */}
          <label className="block">
            Date
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              className="w-full border p-2 rounded mt-1 focus:ring focus:ring-amber-300"
              placeholderText="Select Date"
              required
            />
          </label>

          {/* Slot */}
          <label className="block">
            Slot
            <select
              name="slot"
              value={formData.slot}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1 focus:ring focus:ring-amber-300"
              disabled={loadingSlots || availableSlots.length === 0}
              required
            >
              <option value="">
                {loadingSlots ? "Loading slots..." : "Select Slot"}
              </option>
              {availableSlots.map((slot, idx) => (
                <option key={idx} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </label>

          {/* Duration */}
          <label className="block">
            Duration
            <input
              type="text"
              name="duration"
              placeholder="e.g., 4hr or 6hr"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1 focus:ring focus:ring-amber-300"
              required
            />
          </label>

          {/* File Upload */}
          <label className="block">
            Aadhar Card (Upload)
            <input
              type="file"
              name="aadharCard"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full mt-1"
              required
            />
          </label>

          {/* Submit Button */}
          <button
            disabled={loading}
            type="submit"
            className={`w-full text-white p-2 rounded transition ${
              loading
                ? "bg-amber-300 cursor-not-allowed"
                : "bg-amber-600 hover:bg-amber-700"
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
