'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;


// SVG Icon Components
const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
);

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const DashboardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
);

const BotIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm3 0a1 1 0 011-1h.01a1 1 0 110 2H13a1 1 0 01-1-1zm-5 4a1 1 0 011-1h6a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
);

const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path
            fillRule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.532 1.532 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.532 1.532 0 01-.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clipRule="evenodd"
        />
    </svg>
);

const BookingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm0 2h8v12H6V4zm2 3a1 1 0 100 2h4a1 1 0 100-2H8z" />
    </svg>
);

const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path
            fillRule="evenodd"
            d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V5.414l7.293 7.293a1 1 0 001.414-1.414L5.414 4H15a1 1 0 100-2H4a1 1 0 00-1 1z"
            clipRule="evenodd"
        />
    </svg>
);

const AlertModal = ({ message, onClose }) => {
    if (!message) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-sm w-full">
                <div className="text-center">
                    <p className="text-lg font-semibold text-gray-800">{message}</p>
                    <button
                        onClick={onClose}
                        className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
    if (!message) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-sm w-full">
                <div className="text-center">
                    <p className="text-lg font-semibold text-gray-800">{message}</p>
                    <div className="mt-6 flex justify-center gap-4">
                        <button
                            onClick={onConfirm}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors"
                        >
                            Yes
                        </button>
                        <button
                            onClick={onCancel}
                            className="px-6 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-colors"
                        >
                            No
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BookingModal = ({ booking, onClose, onDelete, onConfirm }) => {
    if (!booking) return null;

    const [formData, setFormData] = useState({
        totalPayment: booking.totalPayment,
        advancePayment: booking.advancePayment,
    });
    const [alertMessage, setAlertMessage] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

    useEffect(() => {
        setFormData({
            totalPayment: booking.totalPayment,
            advancePayment: booking.advancePayment,
        });
    }, [booking]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleConfirmClick = () => {
        if (!formData.totalPayment || !formData.advancePayment || formData.totalPayment <= 0 || formData.advancePayment <= 0) {
            setAlertMessage('Please Enter Total and Advance Payment');
            return;
        }
        setShowConfirmModal(true);
    };

    const executeConfirm = () => {
        onConfirm({
            id: booking._id,
            totalPayment: Number(formData.totalPayment),
            advancePayment: Number(formData.advancePayment),
        });
    };

    const executeDelete = () => {
        onDelete(booking._id);
        setShowDeleteConfirmModal(false);
    };

    const statusStyles = {
        Verified: 'bg-green-100 text-green-800',
        Pending: 'bg-yellow-100 text-yellow-800',
        Cancelled: 'bg-red-100 text-red-800',
    };

    const isPending = booking.status === 'Pending';

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300">
                <div className="bg-white rounded-2xl shadow-2xl transform transition-all duration-300 scale-95 hover:scale-100 max-w-3xl w-full m-4">
                    <div className="p-6 border-b flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-indigo-600 flex items-center">
                            <BookingIcon /> <span className="ml-2">Booking Details</span>
                        </h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                            <XIcon />
                        </button>
                    </div>
                    <div className="p-8 max-h-[70vh] overflow-y-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-gray-800">
                            <div className="flex items-center"><strong className="font-semibold w-32">Booking ID:</strong> <span className="break-all">{booking._id}</span></div>
                            <div className="flex items-center"><strong className="font-semibold w-32">Full Name:</strong> {booking.fullName}</div>
                            <div className="flex items-center"><strong className="font-semibold w-32">Phone:</strong> {booking.phoneNumber}</div>
                            <div className="flex items-center"><strong className="font-semibold w-32">Address:</strong> {booking.address}</div>
                            <div className="flex items-center"><strong className="font-semibold w-32">Date:</strong> {booking.date}</div>
                            <div className="flex items-center"><strong className="font-semibold w-32">Slot:</strong> {booking.slot}</div>
                            <div className="flex items-center"><strong className="font-semibold w-32">Duration:</strong> {booking.duration}</div>
                            <div className="flex items-center"><strong className="font-semibold w-32">From:</strong> {booking.from}</div>
                            <div className="flex items-center"><strong className="font-semibold w-32">To:</strong> {booking.to}</div>
                            <div className="flex items-center"><strong className="font-semibold w-32">Status:</strong> <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[booking.status]}`}>{booking.status}</span></div>
                            {isPending ? (
                                <>
                                    <div className="flex items-center"><strong className="font-semibold w-32">Total:</strong>
                                        <input type="number" name="totalPayment" value={formData.totalPayment} onChange={handleInputChange} className="w-full px-3 py-2 border text-gray-800 border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                                    </div>
                                    <div className="flex items-center"><strong className="font-semibold w-32">Advance:</strong>
                                        <input type="number" name="advancePayment" value={formData.advancePayment} onChange={handleInputChange} className="w-full px-3 py-2 border text-gray-800 border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center"><strong className="font-semibold w-32">Total:</strong> ₹{booking.totalPayment.toLocaleString()}</div>
                                    <div className="flex items-center"><strong className="font-semibold w-32">Advance:</strong> ₹{booking.advancePayment.toLocaleString()}</div>
                                </>
                            )}
                            
                            <div className="md:col-span-2 mt-4"><strong className="font-semibold text-lg">Aadhaar Card</strong></div>
                            <div className="md:col-span-2 bg-gray-100 p-4 rounded-lg">
                                <img src={booking.aadhaarCardUrl} alt="Aadhaar Card" className="rounded-lg shadow-lg w-full" />
                            </div>

                            <div className="text-xs text-gray-400 mt-4 md:col-span-2 border-t pt-4">
                                <p><strong>Created:</strong> {new Date(booking.createdAt).toLocaleString()}</p>
                                <p><strong>Updated:</strong> {new Date(booking.updatedAt).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-b-2xl flex justify-end gap-4">
                        <button onClick={() => setShowDeleteConfirmModal(true)} className="px-8 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-transform transform hover:scale-105 duration-300 shadow-lg">
                            Delete
                        </button>
                        {isPending ? (
                            <button onClick={handleConfirmClick} className="px-8 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-transform transform hover:scale-105 duration-300 shadow-lg">
                                Confirm
                            </button>
                        ) : (
                            <button onClick={onClose} className="px-8 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-transform transform hover:scale-105 duration-300 shadow-lg">
                                Close
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <AlertModal message={alertMessage} onClose={() => setAlertMessage('')} />
            {showConfirmModal && (
                <ConfirmModal
                    message="Would you like to confirm this booking?"
                    onConfirm={executeConfirm}
                    onCancel={() => setShowConfirmModal(false)}
                />
            )}
            {showDeleteConfirmModal && (
                <ConfirmModal
                    message="Are you sure you want to delete this booking?"
                    onConfirm={executeDelete}
                    onCancel={() => setShowDeleteConfirmModal(false)}
                />
            )}
        </>
    );
};

const VerifiedBookingsCard = () => {
    const [totalBookings, setTotalBookings] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [allVerifiedBookings, setAllVerifiedBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVerifiedBookings = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${API_BASE}/api/bookings?status=Verified`);
                if (res.ok) {
                    const data = await res.json();
                    setAllVerifiedBookings(data);
                } else {
                    console.error("Failed to fetch verified bookings");
                }
            } catch (error) {
                console.error("Error fetching verified bookings:", error);
            }
            setLoading(false);
        };
        fetchVerifiedBookings();
    }, []);

    useEffect(() => {
        if (allVerifiedBookings.length > 0) {
            const filtered = allVerifiedBookings.filter(booking => {
                if (!booking.date || typeof booking.date !== 'string') {
                    return false;
                }
                const parts = booking.date.split('-');
                if (parts.length !== 3) {
                    return false;
                }
                const day = parseInt(parts[0], 10);
                const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed in JS Date
                const year = parseInt(parts[2], 10);
                
                if (isNaN(day) || isNaN(month) || isNaN(year)) {
                    return false;
                }

                return month === selectedMonth && year === selectedYear;
            });
            setTotalBookings(filtered.length);
        } else {
            setTotalBookings(0);
        }
    }, [selectedMonth, selectedYear, allVerifiedBookings]);

    const handleMonthChange = (e) => {
        setSelectedMonth(parseInt(e.target.value));
    };

    const handleYearChange = (e) => {
        setSelectedYear(parseInt(e.target.value));
    };

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Verified Bookings of the Month
            </h3>
            <div className="flex space-x-4 mb-6">
                <select value={selectedMonth} onChange={handleMonthChange} className="w-full px-3 py-2 border text-gray-800 border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50">
                    {months.map((month, index) => (
                        <option key={index} value={index}>{month}</option>
                    ))}
                </select>
                <select value={selectedYear} onChange={handleYearChange} className="w-full px-3 py-2 border text-gray-800 border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50">
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>
            <div className="text-center p-4 bg-indigo-50 rounded-lg">
                {loading ? (
                    <div className="text-2xl font-bold text-indigo-600">Loading...</div>
                ) : (
                    <>
                        <p className="text-6xl font-extrabold text-indigo-600">{totalBookings}</p>
                        <p className="text-gray-500 mt-2">Total verified bookings for {months[selectedMonth]} {selectedYear}</p>
                    </>
                )}
            </div>
        </div>
    );
};

const BookingsManager = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [filters, setFilters] = useState({
        bookingId: '',
        status: '',
        date: '',
    });
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [currentStatus, setCurrentStatus] = useState('Pending');

    const handleViewBooking = (booking) => {
        setSelectedBooking(booking);
    };

    const handleCloseModal = () => {
        setSelectedBooking(null);
    };

    const handleConfirmBooking = async (bookingData) => {
        try {
            const res = await fetch(`${API_BASE}/api/bookings`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: bookingData.id,
                    status: 'Verified',
                    totalPayment: bookingData.totalPayment,
                    advancePayment: bookingData.advancePayment,
                }),
            });

            if (res.ok) {
                fetchBookings();
                handleCloseModal();
            } else {
                console.error("Failed to confirm booking");
            }
        } catch (error) {
            console.error("Error confirming booking:", error);
        }
    };

    const handleDeleteBooking = async (bookingId) => {
        try {
            const res = await fetch(`${API_BASE}/api/bookings?id=${bookingId}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                fetchBookings(currentStatus);
                handleCloseModal();
            } else {
                console.error("Failed to delete booking");
            }
        } catch (error) {
            console.error("Error deleting booking:", error);
        }
    };

    const fetchBookings = async (status = 'Pending') => {
        setCurrentStatus(status);
        try {
            const url = `${API_BASE}/api/bookings?status=${status}`;
            const res = await fetch(url);
            const data = await res.json();
            setBookings(data);
            setFilteredBookings(data);
        } catch (error) {
            console.error("Failed to fetch bookings:", error);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);


    useEffect(() => {
        let result = bookings;

        if (filters.bookingId) {
            result = result.filter((b) => b._id.toLowerCase().includes(filters.bookingId.toLowerCase()));
        }

        if (filters.status) {
            result = result.filter((b) => b.status === filters.status);
        }

        if (filters.date) {
            result = result.filter((b) => b.date === filters.date);
        }

        setFilteredBookings(result);
    }, [filters, bookings]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const resetFilters = () => {
        setFilters({ bookingId: '', status: '', date: '' });
        fetchBookings();
    };

    const statusStyles = {
        Verified: 'bg-green-100 text-green-800',
        Pending: 'bg-yellow-100 text-yellow-800',
        Cancelled: 'bg-red-100 text-red-800',
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">📅 Bookings Management</h2>

            <div className="grid grid-cols-1 p-6 md:grid-cols-2 gap-6">
                    <button
                        onClick={() => fetchBookings('Pending')}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                    >
                        Pending Bookings
                    </button>
                    <button
                        onClick={() => fetchBookings('Verified')}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                    >
                        Confirm Bookings
                    </button>
                </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Booking ID</th>
                            <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Customer</th>
                            <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Date</th>
                            <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Status</th>
                            <th className="p-4 text-center text-sm font-semibold text-gray-600 uppercase">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBookings.map((booking, index) => (
                            <tr
                                key={booking._id}
                                className={`border-b border-gray-100 ${
                                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                } hover:bg-indigo-50`}
                            >
                                <td className="p-4 font-medium text-gray-800">{booking._id}</td>
                                <td className="p-4 text-gray-600">{booking.fullName}</td>
                                <td className="p-4 text-gray-600">{(booking.date)}</td>
                                <td className="p-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[booking.status]}`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="p-4 text-center">
                                    <button 
                                        onClick={() => handleViewBooking(booking)}
                                        className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition-colors duration-200">
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredBookings.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No bookings found that match your criteria.</p>
                    </div>
                )}
            </div>
            <BookingModal
            booking={selectedBooking}
            isVisible={!!selectedBooking}
            onClose={handleCloseModal}
            onDelete={handleDeleteBooking}
            onConfirm={handleConfirmBooking}
            />
        </div>
    );
};

const ManageBot = () => {
    const [statements, setStatements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newStatement, setNewStatement] = useState('');

    const fetchStatements = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://127.0.0.1:8000/admin/list');
            if (res.ok) {
                const data = await res.json();
                setStatements(data.statements);
                setError(null);
            } else {
                setError('Failed to fetch statements');
            }
        } catch (err) {
            setError('Error fetching statements: ' + err.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchStatements();
    }, []);

    const handleAddStatement = async (e) => {
        e.preventDefault();
        if (!newStatement.trim()) return;

        try {
            const res = await fetch('http://127.0.0.1:8000/admin/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: newStatement }),
            });

            if (res.ok) {
                setNewStatement('');
                fetchStatements();
            } else {
                setError('Failed to add statement');
            }
        } catch (err) {
            setError('Error adding statement: ' + err.message);
        }
    };

    const handleDeleteStatement = async (statement) => {
        if (confirm('Are you sure you want to delete this statement?')) {
            try {
                const res = await fetch('http://127.0.0.1:8000/admin/delete', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text: statement }),
                });

                if (res.ok) {
                    fetchStatements();
                } else {
                    setError('Failed to delete statement');
                }
            } catch (err) {
                setError('Error deleting statement: ' + err.message);
            }
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">🤖 Manage Bot</h2>

            <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
                <form onSubmit={handleAddStatement} className="flex items-center gap-4">
                    <input
                        type="text"
                        value={newStatement}
                        onChange={(e) => setNewStatement(e.target.value)}
                        placeholder="Enter a new statement"
                        className="flex-grow px-4 py-2 border text-gray-800 border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
                    >
                        Create Statement
                    </button>
                </form>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Statements</th>
                            <th className="p-4 text-right text-sm font-semibold text-gray-600 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="2" className="p-4 text-center text-gray-500">Loading...</td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan="2" className="p-4 text-center text-red-500">{error}</td>
                            </tr>
                        ) : (
                            statements.map((stmt, index) => (
                                <tr key={index} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-indigo-50`}>
                                    <td className="p-4 font-medium text-gray-800">{stmt}</td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => handleDeleteStatement(stmt)}
                                            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                {statements.length === 0 && !loading && !error && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No statements found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [hasPendingBookings, setHasPendingBookings] = useState(false);

    useEffect(() => {
        const loggedIn = sessionStorage.getItem('isAdminLoggedIn');
        if (loggedIn === 'true') {
            setIsLoggedIn(true);
        } else {
            router.push('/admin');
        }
    }, [router]);

    useEffect(() => {
        const checkPendingBookings = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/bookings?status=Pending`);
                if (res.ok) {
                    const data = await res.json();
                    setHasPendingBookings(data.length > 0);
                } else {
                    console.error("Failed to fetch pending bookings");
                }
            } catch (error) {
                console.error("Error fetching pending bookings:", error);
            }
        };

        if (isLoggedIn) {
            checkPendingBookings();
        }
    }, [activeTab,isLoggedIn]);

    const handleLogout = () => {
        sessionStorage.removeItem('isAdminLoggedIn');
        router.push('/admin');
    };

    const sidebarNavItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
        { id: 'bot-manager', label: 'Manage Bot', icon: <BotIcon /> },
        { id: 'bookings', label: 'Bookings', icon: <BookingIcon /> },
        { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
    ];

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-600">Redirecting to login...</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <aside
                className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-2xl flex flex-col transform ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0 transition-transform duration-300 ease-in-out z-40 border-r border-gray-200`}>
                <div className="p-6 border-b flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-indigo-600">Admin Panel</h1>
                    <button className="md:hidden text-gray-500 hover:text-gray-800" onClick={() => setIsSidebarOpen(false)}>
                        <XIcon />
                    </button>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {sidebarNavItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveTab(item.id);
                                setIsSidebarOpen(false);
                            }}
                            className={`flex items-center justify-between w-full text-left px-4 py-2.5 rounded-lg transition-colors duration-200 ${
                                activeTab === item.id
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'hover:bg-indigo-50 text-gray-600 font-medium'
                            }`}>
                            <div className="flex items-center">
                                {item.icon}
                                <span className="ml-3">{item.label}</span>
                            </div>
                            {item.id === 'bookings' && hasPendingBookings && (
                                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                            )}
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full text-left px-4 py-2.5 rounded-lg hover:bg-red-50 text-red-500 font-medium transition-colors duration-200">
                        <LogoutIcon />
                        <span className="ml-3">Logout</span>
                    </button>
                </div>
            </aside>

            <div className="md:ml-64">
                {/* Mobile Header */}
                <header className="bg-white shadow-sm p-4 flex items-center justify-between md:hidden sticky top-0 z-30">
                    <button onClick={() => setIsSidebarOpen(true)} className="text-gray-500 hover:text-gray-800">
                        <MenuIcon />
                    </button>
                    <h2 className="text-xl font-semibold text-gray-800">
                        {sidebarNavItems.find(item => item.id === activeTab)?.label}
                    </h2>
                    <div className="w-6"></div> {/* Spacer */}
                </header>

                <main className="p-6 md:p-10">
                    {activeTab === 'dashboard' && (
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-8">📊 Dashboard</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <VerifiedBookingsCard />
                            </div>
                        </div>
                    )}

                    {activeTab === 'bot-manager' && <ManageBot />}

                    {activeTab === 'bookings' && <BookingsManager />}

                    {activeTab === 'settings' && (
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-8">⚙️ Settings</h2>
                            {/* Settings content */}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}