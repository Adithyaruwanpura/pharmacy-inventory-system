import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function SupplierSection() {
    const [suppliers, setSuppliers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSupplier, setSelectedSupplier] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        address: ''
    });

    // FETCH SUPPLIERS
    const fetchSuppliers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                'http://localhost:5000/api/suppliers',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setSuppliers(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchSuppliers();
    }, []);

    // LOAD SELECTED SUPPLIER FOR EDITING
    useEffect(() => {
        if (selectedSupplier) {
            setFormData({
                name: selectedSupplier.name || '',
                contact: selectedSupplier.contact || '',
                address: selectedSupplier.address || ''
            });
        }
    }, [selectedSupplier]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCancel = () => {
        setSelectedSupplier(null);
        setFormData({
            name: '',
            contact: '',
            address: ''
        });
    };

    // SUBMIT FORM
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            if (selectedSupplier) {
                await axios.put(
                    `http://localhost:5000/api/suppliers/${selectedSupplier.id}`,
                    formData,
                    config
                );
                toast.success('Supplier updated successfully');
            } else {
                await axios.post(
                    'http://localhost:5000/api/suppliers',
                    formData,
                    config
                );
                toast.success('Supplier added successfully');
            }

            handleCancel();
            fetchSuppliers();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Error saving supplier');
        }
    };

    // DELETE SUPPLIER
    const deleteSupplier = async (id) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this supplier?'
        );
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(
                `http://localhost:5000/api/suppliers/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            toast.success('Supplier deleted successfully');
            fetchSuppliers();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Error deleting supplier');
        }
    };

    const filteredSuppliers = suppliers.filter(
        (supplier) =>
            supplier.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            supplier.contact?.includes(searchTerm)
    );

    return (
        <div className="flex flex-col h-full">

            {/* ACTION TOPBAR BAR */}
            <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white">
                <div>
                    <h2 className="text-xl font-extrabold tracking-tight text-gray-900">
                        Supplier Management
                    </h2>

                </div>

                {/* SEARCH INPUT REDESIGNED */}
                <div className="relative w-full sm:w-72 lg:w-96">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Search suppliers by name or contact..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-9 pr-4 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm p-2.5 bg-gray-50/30 transition-all"
                    />
                </div>
            </div>

            {/* SPLIT LAYOUT */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 p-5 items-start flex-1 bg-white">

                {/* LEFT COLUMN: CONTEXTUAL FORM */}
                <div className="xl:col-span-1 bg-white p-5 rounded-xl border border-gray-100 sticky top-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="border-b pb-3 border-gray-100 flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-bold text-gray-900">
                                    {selectedSupplier ? 'Modify Vendor' : 'Register Vendor'}
                                </h3>
                                <p className="text-[11px] text-gray-400">Specify contract configuration metrics</p>
                            </div>
                            {selectedSupplier && (
                                <span className="bg-amber-50 text-amber-700 text-[10px] font-extrabold tracking-wide uppercase px-2 py-0.5 rounded border border-amber-200">
                                    Edit Mode
                                </span>
                            )}
                        </div>

                        <div className="space-y-3">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Supplier Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="e.g., Apex Pharmaceuticals"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="block w-full border-gray-200 rounded-lg text-sm p-2 bg-gray-50/50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Contact Line</label>
                                <input
                                    type="text"
                                    name="contact"
                                    placeholder="e.g., +94 77 123 4567"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    className="block w-full border-gray-200 rounded-lg text-sm p-2 bg-gray-50/50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Corporate Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="e.g., 45, Galle Road, Colombo"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="block w-full border-gray-200 rounded-lg text-sm p-2 bg-gray-50/50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        {/* FORM ACTION CTAs */}
                        <div className="flex flex-col gap-2 pt-2">
                            <button
                                type="submit"
                                className={`w-full text-white font-semibold py-2 px-4 rounded-lg shadow-sm text-xs uppercase tracking-wide transition-all ${selectedSupplier
                                    ? 'bg-linear-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600'
                                    : 'bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600'
                                    }`}
                            >
                                {selectedSupplier ? 'Save Changes' : 'Commit Entry'}
                            </button>
                            {selectedSupplier && (
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium py-1.5 px-4 rounded-lg text-xs transition-colors"
                                >
                                    Cancel Modification
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* RIGHT COLUMN: INTERACTIVE LISTING */}
                <div className="xl:col-span-2 rounded-xl border border-gray-100 overflow-hidden flex flex-col max-h-160">
                    <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                        <div>
                            <h3 className="text-sm font-bold text-gray-900">Registered Ledger</h3>
                            <p className="text-[11px] text-gray-400">Entities connected to current catalog architecture</p>
                        </div>
                        <span className="bg-white text-gray-600 border border-gray-100 text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-2xs">
                            {filteredSuppliers.length} Vendors Listed
                        </span>
                    </div>

                    <div className="overflow-y-auto overflow-x-auto flex-1">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-500 sticky top-0 z-10 shadow-2xs">
                                    <th className="p-3 pl-4 w-16">ID</th>
                                    <th className="p-3">Vendor / Entity</th>
                                    <th className="p-3">Contact</th>
                                    <th className="p-3">Corporate Logistics Location</th>
                                    <th className="p-3 pr-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 text-xs text-gray-600">
                                {filteredSuppliers.length > 0 ? (
                                    filteredSuppliers.map((supplier) => (
                                        <tr key={supplier.id} className="hover:bg-gray-50/40 transition-colors">
                                            <td className="p-3 pl-4 font-mono font-medium text-gray-400">
                                                #{supplier.id}
                                            </td>
                                            <td className="p-3">
                                                <div className="font-bold text-gray-900">{supplier.name}</div>
                                            </td>
                                            <td className="p-3">
                                                <span className="inline-block bg-slate-100 text-slate-700 font-mono text-[10px] px-2 py-0.5 rounded-md">
                                                    {supplier.contact}
                                                </span>
                                            </td>
                                            <td className="p-3 text-gray-500 max-w-45 truncate">
                                                {supplier.address}
                                            </td>
                                            <td className="p-3 pr-4 text-right whitespace-nowrap space-x-2">
                                                <button
                                                    onClick={() => setSelectedSupplier(supplier)}
                                                    className="inline-flex items-center justify-center bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200/60 font-semibold px-2.5 py-1 rounded-md transition-colors"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => deleteSupplier(supplier.id)}
                                                    className="inline-flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-600 border border-red-200/60 font-semibold px-2.5 py-1 rounded-md transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="text-center p-12 text-gray-400">
                                            <div className="flex flex-col items-center justify-center space-y-1">
                                                <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-4M4 13h4m1.5 8h4.5" />
                                                </svg>
                                                <span className="text-sm font-medium">No suppliers match filters</span>
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
    );
}

export default SupplierSection;