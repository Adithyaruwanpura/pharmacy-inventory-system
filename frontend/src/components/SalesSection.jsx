import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function SalesSection() {
    const [medicines, setMedicines] = useState([]);
    const [sales, setSales] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [formData, setFormData] = useState({
        medicineId: '',
        quantity: '',
        totalPrice: ''
    });

    const fetchMedicines = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                'http://localhost:5000/api/medicines',
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMedicines(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchSales = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/sales');
            setSales(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMedicines();
        fetchSales();
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
            await axios.post('http://localhost:5000/api/sales', formData);
            toast.success('Sale recorded successfully');

            setFormData({
                medicineId: '',
                quantity: '',
                totalPrice: ''
            });
            fetchSales();
        } catch (error) {
            console.error(error);
            toast.error('Error recording sale');
        }
    };

    const filteredSales = sales.filter((sale) =>
        sale.medicine?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">

            {/* LEFT SIDEBAR: NEW TRANSACTION ENTRY */}
            <div className="xl:col-span-1 bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-4">
                <div className="border-b pb-3 border-gray-100">
                    <h3 className="text-base font-bold text-gray-900">Checkout Terminal</h3>
                    <p className="text-[11px] text-gray-400">Initialize live customer prescription sales entries</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* MEDICATION DROP SELECT */}
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                            Dispense Item
                        </label>
                        <select
                            name="medicineId"
                            value={formData.medicineId}
                            onChange={handleChange}
                            className="block w-full border-gray-200 rounded-lg text-sm p-2.5 bg-gray-50/50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        >
                            <option value="">Select Medicine...</option>
                            {medicines.map((medicine) => (
                                <option key={medicine.id} value={medicine.id}>
                                    {medicine.name} (Qty Available: {medicine.quantity})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* QUANTITY INPUT */}
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                            Dispense Quantity
                        </label>
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            placeholder="0"
                            onChange={handleChange}
                            className="block w-full border-gray-200 rounded-lg text-sm p-2.5 bg-gray-50/50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                    </div>

                    {/* PRICING INPUT */}
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                            Gross Charging Total
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-xs font-semibold">Rs.</span>
                            <input
                                type="number"
                                name="totalPrice"
                                value={formData.totalPrice}
                                placeholder="0.00"
                                onChange={handleChange}
                                className="block w-full pl-9 border-gray-200 rounded-lg text-sm p-2.5 bg-gray-50/50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* DISPENSE CTA */}
                    <button
                        type="submit"
                        className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2.5 px-4 rounded-lg shadow-sm text-xs uppercase tracking-wide transition-all mt-2"
                    >
                        Process Invoice
                    </button>
                </form>
            </div>

            {/* RIGHT FRAME: INTERACTIVE TRANSACTION LEDGER */}
            <div className="xl:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full max-h-150">

                {/* SEARCH/FILTER CONTROLS DECK */}
                <div className="p-4 border-b border-gray-100 bg-white sm:flex sm:items-center sm:justify-between gap-4">
                    <div>
                        <h3 className="text-base font-bold text-gray-900">Today's Sales Manifest</h3>
                        <p className="text-[11px] text-gray-400">Auditable pipeline records processed on this layout node</p>
                    </div>

                    {/* COMPACT SEARCH DECK */}
                    <div className="relative mt-2 sm:mt-0 w-full sm:w-64">
                        <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-gray-400">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Filter by product name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-8 pr-3 border-gray-200 rounded-lg text-xs p-2 bg-gray-50/50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* TABLE INVOICE DISPATCH VIEW */}
                <div className="overflow-y-auto overflow-x-auto flex-1">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-[10px] font-bold uppercase tracking-wider text-gray-500 sticky top-0 z-10 shadow-xs">
                                <th className="p-3 pl-4 w-20">Receipt ID</th>
                                <th className="p-3">Medication Name</th>
                                <th className="p-3 text-center">Units Sold</th>
                                <th className="p-3 text-right pr-4">Settled Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-xs text-gray-600">
                            {filteredSales.length > 0 ? (
                                filteredSales.map((sale) => (
                                    <tr key={sale.id} className="hover:bg-gray-50/40 transition-colors">
                                        <td className="p-3 pl-4 font-mono font-medium text-gray-400">
                                            #{sale.id}
                                        </td>
                                        <td className="p-3 font-semibold text-gray-900">
                                            {sale.medicine?.name || <span className="text-gray-300 italic font-normal">Legacy Record</span>}
                                        </td>
                                        <td className="p-3 text-center font-mono font-medium text-gray-700">
                                            {sale.quantity}
                                        </td>
                                        <td className="p-3 text-right pr-4 font-mono font-bold text-blue-600">
                                            Rs. {Number(sale.totalPrice || 0).toFixed(2)}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="text-center p-12 text-gray-400">
                                        <div className="flex flex-col items-center justify-center space-y-1">
                                            <svg className="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 01-2-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <span className="text-xs font-medium">No sales matches current filter query</span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default SalesSection;