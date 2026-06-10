import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import InvoiceGenerator from '../components/InvoiceGenerator';

function SalesSection() {
    const [medicines, setMedicines] = useState([]);
    const [sales, setSales] = useState([]);
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [cashReceived, setCashReceived] = useState('');
    const [taxPercent, setTaxPercent] = useState(0);
    const [formData, setFormData] = useState({
        medicineId: '',
        quantity: ''
    });

    // FETCH MEDICINES
    const fetchMedicines = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                'http://localhost:5000/api/medicines',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setMedicines(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    // FETCH SALES
    const fetchSales = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                'http://localhost:5000/api/sales',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setSales(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMedicines();
        fetchSales();
    }, []);

    // HANDLE INPUT CHANGE
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // AUTO CALCULATIONS
    const subtotal =
        selectedMedicine && formData.quantity
            ? selectedMedicine.sellingPrice * parseInt(formData.quantity)
            : 0;

    const taxAmount = (subtotal * taxPercent) / 100;
    const finalTotal = subtotal + taxAmount;
    const balance = cashReceived ? cashReceived - finalTotal : 0;

    // SUBMIT SALE
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                'http://localhost:5000/api/sales',
                {
                    medicineId: formData.medicineId,
                    quantity: formData.quantity,
                    totalPrice: finalTotal
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success('Sale recorded successfully');

            // RESET FORM
            setFormData({
                medicineId: '',
                quantity: ''
            });
            setSelectedMedicine(null);
            setCashReceived('');
            setTaxPercent(0);

            fetchSales();
            fetchMedicines();
        } catch (error) {
            console.error(error);
            toast.error('Error recording sale');
        }
    };

    return (
        <div className="w-full max-w-400 mx-auto p-4 lg:p-6 bg-gray-50 min-h-[calc(100vh-80px)] text-gray-800 antialiased flex flex-col">
            {/* TITLE HEADER */}
            <div className="mb-6 pb-4 border-b border-gray-200">
                <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                    Sales Management
                </h2>

            </div>

            {/* MAIN CONTENT SPLIT LAYOUT */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start flex-1">
                {/* LEFT SIDE: FORM & PREVIEWS */}
                <form onSubmit={handleSubmit} className="xl:col-span-1 space-y-4 h-full flex flex-col justify-start">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 space-y-4">
                        <h3 className="text-base font-bold text-gray-900 border-b pb-2 border-gray-100">
                            New Transaction
                        </h3>

                        {/* TWO COLUMN INPUTS FOR COMPACTNESS */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                    Select Medication
                                </label>
                                <select
                                    name="medicineId"
                                    value={formData.medicineId}
                                    onChange={(e) => {
                                        const medicine = medicines.find(
                                            med => med.id === parseInt(e.target.value)
                                        );
                                        setSelectedMedicine(medicine);
                                        setFormData({
                                            ...formData,
                                            medicineId: e.target.value
                                        });
                                    }}
                                    className="block w-full border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm p-2.5 bg-gray-50/50"
                                >
                                    <option value="">Choose...</option>
                                    {medicines.map((medicine) => (
                                        <option key={medicine.id} value={medicine.id}>
                                            {medicine.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    name="quantity"
                                    placeholder="Units"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    className="block w-full border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm p-2.5 bg-gray-50/50"
                                />
                            </div>
                        </div>
                    </div>

                    {/* BILLING SUMMARY */}
                    <div className="bg-linear-to-br from-slate-900 to-slate-800 text-white p-5 rounded-xl shadow-md space-y-3">
                        <h3 className="text-base font-bold tracking-wide border-b pb-2 border-slate-700/50 text-slate-200">
                            Billing Details
                        </h3>

                        <div className="space-y-2 text-xs">
                            <div className="flex justify-between items-center text-slate-400">
                                <span>Unit Price</span>
                                <span className="font-semibold text-slate-200">
                                    Rs. {selectedMedicine?.sellingPrice || '0.00'}
                                </span>
                            </div>

                            <div className="flex justify-between items-center text-slate-400">
                                <span>Subtotal</span>
                                <span className="font-semibold text-slate-200">
                                    Rs. {subtotal.toFixed(2)}
                                </span>
                            </div>

                            <div className="pt-1.5 border-t border-slate-700/50 flex items-center justify-between gap-4">
                                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                                    Tax Rate / GST (%)
                                </label>
                                <input
                                    type="number"
                                    value={taxPercent}
                                    onChange={(e) => setTaxPercent(e.target.value)}
                                    className="block w-24 bg-slate-800 border-slate-700 text-white rounded-lg shadow-inner focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 p-1 text-right text-xs"
                                />
                            </div>

                            <div className="flex justify-between items-center text-slate-400">
                                <span>Tax Calculated</span>
                                <span className="font-semibold text-slate-200">
                                    Rs. {taxAmount.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <div className="pt-3 border-t border-slate-700 flex justify-between items-baseline">
                            <span className="text-xs font-medium text-slate-300">Total Amount</span>
                            <span className="text-2xl font-black text-blue-400 tracking-tight">
                                Rs. {finalTotal.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {/* PAYMENT SECTION */}
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-emerald-100 bg-linear-to-b from-white to-emerald-50/10 space-y-3">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex-1">
                                <label className="block text-[11px] font-semibold text-emerald-800 uppercase tracking-wider mb-1">
                                    Cash Received
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-emerald-600 font-medium text-xs">Rs.</span>
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        value={cashReceived}
                                        onChange={(e) => setCashReceived(e.target.value)}
                                        className="block w-full pl-8 border-emerald-200 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm p-2 bg-white"
                                    />
                                </div>
                            </div>

                            <div className="bg-emerald-600 text-white p-2.5 rounded-lg shadow-sm text-right min-w-30 mt-4">
                                <span className="block text-[9px] font-bold uppercase tracking-wider opacity-80">Change Due</span>
                                <span className="text-lg font-black">
                                    Rs. {(balance >= 0 ? balance : 0).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="grid grid-cols-2 gap-3 pt-1">
                        <button
                            type="submit"
                            className="w-full bg-linear-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 text-center text-xs"
                        >
                            Record Transaction
                        </button>

                        <button
                            type="button"
                            onClick={() => window.print()}
                            className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-2.5 px-4 rounded-lg shadow-sm transition-all duration-150 text-center text-xs flex items-center justify-center gap-2"
                        >
                            Print Invoice
                        </button>
                    </div>
                </form>

                {/* RIGHT SIDE: RECENT SALES TABLE WITH CONTROLLED HEIGHT */}
                <div className="xl:col-span-2 h-full">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col max-h-155">
                        <div className="p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
                            <h2 className="text-base font-bold text-gray-900">
                                Audit Journal
                            </h2>
                            <p className="text-[11px] text-gray-400">Real-time listing of recent transactions</p>
                        </div>

                        {/* INTERNAL SCROLL CONTAINER FOR THE TABLE */}
                        <div className="overflow-y-auto overflow-x-auto flex-1 chunk-scroll">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-500 sticky top-0 shadow-sm z-10">
                                        <th className="p-3 pl-4">ID</th>
                                        <th className="p-3">Medicine Item</th>
                                        <th className="p-3 text-center">Qty</th>
                                        <th className="p-3 text-right">Total Price</th>
                                        <th className="p-3 text-center">Timestamp</th>
                                        <th className="p-3 pr-4 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 text-xs text-gray-600">
                                    {sales.length > 0 ? (
                                        sales.map((sale) => (
                                            <tr key={sale.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="p-3 pl-4 font-mono font-medium text-gray-400">
                                                    #{sale.id}
                                                </td>
                                                <td className="p-3 font-semibold text-gray-900">
                                                    {sale.medicine?.name || <span className="text-gray-300 italic">Unknown Medicine</span>}
                                                </td>
                                                <td className="p-3 text-center font-medium">
                                                    {sale.quantity}
                                                </td>
                                                <td className="p-3 text-right font-bold text-slate-900">
                                                    Rs. {Number(sale.totalPrice).toFixed(2)}
                                                </td>
                                                <td className="p-3 text-center text-gray-400 whitespace-nowrap">
                                                    {new Date(sale.saleDate).toLocaleDateString(undefined, {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </td>
                                                <td className="p-3 pr-4 text-center whitespace-nowrap">
                                                    <InvoiceGenerator sale={sale} />
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center p-12 text-gray-400">
                                                <div className="flex flex-col items-center justify-center space-y-1">
                                                    <span className="text-sm font-medium">No system records found</span>
                                                    <p className="text-[11px]">Transactions logged dynamically will inhabit this space.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SalesSection;