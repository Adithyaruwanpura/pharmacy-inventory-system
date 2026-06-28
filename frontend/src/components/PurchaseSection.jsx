import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import PurchaseInvoiceGenerator from "./PurchaseInvoiceGenerator";

function PurchaseSection() {
    const [medicines, setMedicines] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    const [formData, setFormData] = useState({
        medicineId: '',
        supplierId: '',
        quantity: '',
        unitPrice: ''
    });

    const totalPrice =
        Number(formData.quantity || 0) *
        Number(formData.unitPrice || 0);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');

            const medicineRes = await axios.get(
                'http://localhost:5000/api/medicines',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            const supplierRes = await axios.get(
                'http://localhost:5000/api/suppliers',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const purchaseRes = await axios.get(
                'http://localhost:5000/api/purchases',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setPurchases(purchaseRes.data.data);
            setMedicines(medicineRes.data.data);
            setSuppliers(supplierRes.data.data);
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            await axios.post(
                "http://localhost:5000/api/purchases",
                {
                    ...formData,
                    totalPrice: totalPrice
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Purchase added successfully");

            setFormData({
                medicineId: "",
                supplierId: "",
                quantity: "",
                unitPrice: ""
            });

            fetchData();

        } catch (error) {
            console.error(error);
            toast.error("Error adding purchase");
        }
    };

    const deletePurchase = async (id) => {
        try {
            const token = localStorage.getItem('token');

            await axios.delete(
                `http://localhost:5000/api/purchases/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success('Purchase deleted');
            fetchData();
        } catch (error) {
            console.error(error);
            toast.error('Error deleting purchase');
        }
    };

    const filteredPurchases = purchases.filter(
        (purchase) =>
            purchase.medicine?.name
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            purchase.supplier?.name
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 md:p-6 space-y-8 bg-white">

            {/* TOP METRICS SUMMARY CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-linear-to-br from-blue-600 to-blue-700 text-white p-5 rounded-xl shadow-xs">
                    <h3 className="text-xs font-semibold uppercase tracking-wider opacity-80">
                        Total Purchases
                    </h3>
                    <p className="text-3xl font-extrabold mt-1">
                        {purchases.length}
                    </p>
                </div>

                <div className="bg-linear-to-br from-emerald-600 to-emerald-700 text-white p-5 rounded-xl shadow-xs">
                    <h3 className="text-xs font-semibold uppercase tracking-wider opacity-80">
                        Total Purchase Cost
                    </h3>
                    <p className="text-3xl font-extrabold mt-1">
                        Rs. {purchases.reduce((total, purchase) => total + (purchase.totalPrice || 0), 0).toLocaleString()}
                    </p>
                </div>

                <div className="bg-linear-to-br from-purple-600 to-purple-700 text-white p-5 rounded-xl shadow-xs">
                    <h3 className="text-xs font-semibold uppercase tracking-wider opacity-80">
                        Active Suppliers
                    </h3>
                    <p className="text-3xl font-extrabold mt-1">
                        {suppliers.length}
                    </p>
                </div>
            </div>

            {/* MAIN INTERACTIVE CORE GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden shadow-xs">

                {/* LEFT INPUT COLUMN */}
                <form onSubmit={handleSubmit} className="p-6 lg:col-span-2 space-y-6 bg-white">
                    <div className="border-b pb-3 border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900">New Supply Order</h3>
                        <p className="text-xs text-gray-400 mt-0.5">Fill out incoming inventory consignment parameters</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* MEDICINE SELECT */}
                        <div>
                            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                                Select Medication
                            </label>
                            <select
                                name="medicineId"
                                value={formData.medicineId}
                                onChange={handleChange}
                                className="block w-full border border-gray-200 rounded-xl shadow-xs focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 text-sm p-3 bg-gray-50 transition-all"
                            >
                                <option value="">Choose item...</option>
                                {medicines.map((medicine) => (
                                    <option key={medicine.id} value={medicine.id}>
                                        {medicine.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* SUPPLIER SELECT */}
                        <div>
                            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                                Vendor / Supplier
                            </label>
                            <select
                                name="supplierId"
                                value={formData.supplierId}
                                onChange={handleChange}
                                className="block w-full border border-gray-200 rounded-xl shadow-xs focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 text-sm p-3 bg-gray-50 transition-all"
                            >
                                <option value="">Choose distributor...</option>
                                {suppliers.map((supplier) => (
                                    <option key={supplier.id} value={supplier.id}>
                                        {supplier.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* QUANTITY */}
                        <div>
                            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                                Batch Quantity
                            </label>
                            <input
                                type="number"
                                name="quantity"
                                placeholder="Units"
                                value={formData.quantity}
                                className="block w-full border border-gray-200 rounded-xl shadow-xs focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 text-sm p-3 bg-gray-50 transition-all"
                                onChange={handleChange}
                            />
                        </div>

                        {/* TOTAL COST */}
                        {/* UNIT PRICE */}

                        <div>

                            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                                Unit Price
                            </label>

                            <div className="relative">

                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-xs">
                                    Rs.
                                </span>

                                <input
                                    type="number"
                                    name="unitPrice"
                                    placeholder="0.00"
                                    value={formData.unitPrice}
                                    onChange={handleChange}
                                    className="block w-full pl-10 border border-gray-200 rounded-xl p-3 bg-gray-50"
                                />

                            </div>

                        </div>

                        {/* TOTAL PRICE */}

                        <div>

                            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                                Total Cost
                            </label>

                            <div className="relative">

                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-xs">
                                    Rs.
                                </span>

                                <input
                                    type="number"
                                    value={totalPrice}
                                    readOnly
                                    className="block w-full pl-10 border border-gray-200 rounded-xl p-3 bg-gray-100 font-bold text-green-600"
                                />

                            </div>

                        </div>
                    </div>

                    <div className="pt-3">
                        <button
                            type="submit"
                            className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-150 text-xs tracking-wider uppercase cursor-pointer"
                        >
                            Add Purchase Order
                        </button>
                    </div>
                </form>

                {/* RIGHT SIDE PREVIEW SIDEBAR */}
                <div className="p-6 bg-gray-50 flex flex-col justify-between lg:col-span-1 border-t lg:border-t-0 lg:border-l border-gray-100">
                    <div className="space-y-4">
                        <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Consignment Receipt Preview</h4>

                        <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl shadow-inner space-y-4 font-mono text-xs border border-slate-800">
                            <div className="flex justify-between border-b border-slate-800 pb-2.5">
                                <span className="text-slate-500">Item Selected:</span>
                                <span className="text-blue-400 font-semibold truncate max-w-37.5">
                                    {medicines.find(m => String(m.id) === String(formData.medicineId))?.name || '---'}
                                </span>
                            </div>
                            <div className="flex justify-between border-b border-slate-800 pb-2.5">
                                <span className="text-slate-500">Source Vendor:</span>
                                <span className="text-slate-300 truncate max-w-37.5">
                                    {suppliers.find(s => String(s.id) === String(formData.supplierId))?.name || '---'}
                                </span>
                            </div>
                            <div className="flex justify-between border-b border-slate-800 pb-2.5">
                                <span className="text-slate-500">Bulk Units:</span>
                                <span className="text-slate-200 font-semibold">{formData.quantity || '0'}</span>
                            </div>
                            <div className="flex justify-between pt-1">
                                <span className="text-slate-400 font-sans font-bold">Total Ledger:</span>
                                <span className="text-emerald-400 font-bold text-sm">
                                    Rs. {totalPrice.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:block text-[10px] text-gray-400 text-center mt-6">
                        Double check wholesale supplier parameters before archiving entry.
                    </div>
                </div>

            </div>

            {/* PURCHASE HISTORY TABLE LISTING */}
            <div className="space-y-4 pt-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            Purchase History
                        </h2>
                        <p className="text-xs text-gray-400 mt-0.5">Review and filter recorded drug batches</p>
                    </div>
                    <div className="w-full sm:w-72">
                        <input
                            type="text"
                            placeholder="Search medicine or supplier..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm w-full bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-[11px] font-bold uppercase tracking-wider">
                                    <th className="py-3.5 px-5">Invoice</th>
                                    <th className="py-3.5 px-5">GRN</th>
                                    <th className="py-3.5 px-5">Medicine</th>
                                    <th className="py-3.5 px-5">Supplier</th>
                                    <th className="py-3.5 px-5">Quantity</th>
                                    <th className="py-3 px-5">Unit Price</th>
                                    <th className="py-3.5 px-5">Total Price</th>
                                    <th className="py-3.5 px-5">Date</th>
                                    <th className="py-3.5 px-5 text-center">Invoice PDF</th>
                                    <th className="py-3.5 px-5 text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                                {filteredPurchases.length > 0 ? (
                                    filteredPurchases.map((purchase) => (
                                        <tr
                                            key={purchase.id}
                                            className="hover:bg-gray-50 transition"
                                        >

                                            <td className="py-3 px-5 font-semibold text-blue-600">
                                                {purchase.invoiceNo}
                                            </td>

                                            <td className="py-3 px-5 font-semibold text-green-600">
                                                {purchase.grnNo}
                                            </td>

                                            <td className="py-3 px-5">
                                                {purchase.medicine?.name}
                                            </td>

                                            <td className="py-3 px-5">
                                                {purchase.supplier?.name}
                                            </td>

                                            <td className="py-3 px-5">
                                                {purchase.quantity}
                                            </td>
                                            <td className="py-3 px-5">
                                                Rs. {(purchase.totalPrice / purchase.quantity).toFixed(2)}
                                            </td>

                                            <td className="py-3 px-5 font-semibold text-emerald-600">
                                                Rs. {purchase.totalPrice.toLocaleString()}
                                            </td>

                                            <td className="py-3 px-5">
                                                {new Date(purchase.purchaseDate).toLocaleDateString()}
                                            </td>

                                            <td className="py-3 px-5 text-center">
                                                <PurchaseInvoiceGenerator purchase={purchase} />
                                            </td>

                                            <td className="py-3 px-5 text-right">
                                                <button
                                                    onClick={() => deletePurchase(purchase.id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                                >
                                                    Delete
                                                </button>
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-10 text-gray-400 text-xs">
                                            No tracking purchase orders found matching description.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PurchaseSection;