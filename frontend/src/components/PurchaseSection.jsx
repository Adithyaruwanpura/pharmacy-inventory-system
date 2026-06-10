import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function PurchaseSection() {
    const [medicines, setMedicines] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    const [formData, setFormData] = useState({
        medicineId: '',
        supplierId: '',
        quantity: '',
        totalPrice: ''
    });

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
            await axios.post(
                'http://localhost:5000/api/purchases',
                formData
            );
            toast.success('Purchase added successfully');

            // Clean resetting behavior keeping structural context unbroken
            setFormData({
                medicineId: '',
                supplierId: '',
                quantity: '',
                totalPrice: ''
            });
        } catch (error) {
            console.error(error);
            toast.error('Error adding purchase');
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
            {/* LEFT INPUT COLUMN */}
            <form onSubmit={handleSubmit} className="p-6 lg:col-span-2 space-y-5">
                <div className="border-b pb-2 border-gray-50">
                    <h3 className="text-base font-bold text-gray-900">New Supply Order</h3>
                    <p className="text-[11px] text-gray-400">Fill out incoming inventory consignment parameters</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* MEDICINE SELECT */}
                    <div>
                        <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                            Select Medication
                        </label>
                        <select
                            name="medicineId"
                            value={formData.medicineId}
                            onChange={handleChange}
                            className="block w-full border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm p-2.5 bg-gray-50/50"
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
                        <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                            Vendor / Supplier
                        </label>
                        <select
                            name="supplierId"
                            value={formData.supplierId}
                            onChange={handleChange}
                            className="block w-full border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm p-2.5 bg-gray-50/50"
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
                        <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                            Batch Quantity
                        </label>
                        <input
                            type="number"
                            name="quantity"
                            placeholder="Units"
                            value={formData.quantity}
                            className="block w-full border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm p-2.5 bg-gray-50/50"
                            onChange={handleChange}
                        />
                    </div>

                    {/* TOTAL COST */}
                    <div>
                        <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                            Total Net Price
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 font-medium text-xs">Rs.</span>
                            <input
                                type="number"
                                name="totalPrice"
                                placeholder="0.00"
                                value={formData.totalPrice}
                                className="block w-full pl-9 border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm p-2.5 bg-gray-50/50"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        className="bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 text-xs tracking-wide uppercase"
                    >
                        Add Purchase Order
                    </button>
                </div>
            </form>

            {/* RIGHT SIDE PREVIEW SIDEBAR */}
            <div className="p-6 bg-gray-50/40 flex flex-col justify-between lg:col-span-1">
                <div className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Consignment Receipt Preview</h4>

                    <div className="bg-slate-900 text-slate-100 p-4 rounded-xl shadow-inner space-y-3 font-mono text-xs">
                        <div className="flex justify-between border-b border-slate-800 pb-2">
                            <span className="text-slate-500">Item Selected:</span>
                            <span className="text-blue-400 truncate max-w-37.5">
                                {medicines.find(m => String(m.id) === String(formData.medicineId))?.name || '---'}
                            </span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800 pb-2">
                            <span className="text-slate-500">Source Vendor:</span>
                            <span className="text-slate-300 truncate max-w-37.5">
                                {suppliers.find(s => String(s.id) === String(formData.supplierId))?.name || '---'}
                            </span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800 pb-2">
                            <span className="text-slate-500">Bulk Units:</span>
                            <span className="text-slate-200">{formData.quantity || '0'}</span>
                        </div>
                        <div className="flex justify-between pt-1">
                            <span className="text-slate-400 font-sans font-bold">Total Ledger:</span>
                            <span className="text-emerald-400 font-bold text-sm">
                                Rs. {formData.totalPrice ? Number(formData.totalPrice).toFixed(2) : '0.00'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="hidden lg:block text-[10px] text-gray-400 text-center mt-6">
                    Double check wholesale supplier parameters before archiving entry.
                </div>
            </div>
        </div>
    );
}

export default PurchaseSection;