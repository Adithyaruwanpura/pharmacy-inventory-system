import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function MedicineForm({
    fetchMedicines,
    selectedMedicine,
    setSelectedMedicine
}) {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        batchNumber: '',
        expiryDate: '',
        purchasePrice: '',
        sellingPrice: '',
        quantity: ''
    });

    useEffect(() => {
        if (selectedMedicine) {
            setFormData({
                name: selectedMedicine.name || '',
                category: selectedMedicine.category || '',
                batchNumber: selectedMedicine.batchNumber || '',
                expiryDate: selectedMedicine.expiryDate?.split('T')[0] || '',
                purchasePrice: selectedMedicine.purchasePrice || '',
                sellingPrice: selectedMedicine.sellingPrice || '',
                quantity: selectedMedicine.quantity || ''
            });
        }
    }, [selectedMedicine]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCancel = () => {
        setSelectedMedicine(null);
        setFormData({
            name: '',
            category: '',
            batchNumber: '',
            expiryDate: '',
            purchasePrice: '',
            sellingPrice: '',
            quantity: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (selectedMedicine) {
                await axios.put(
                    `http://localhost:5000/api/medicines/${selectedMedicine.id}`,
                    formData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                toast.success('Medicine updated successfully');
            } else {
                await axios.post(
                    'http://localhost:5000/api/medicines',
                    formData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                toast.success('Medicine added successfully');
            }
            handleCancel();
            fetchMedicines();
        } catch (error) {
            console.error(error);
            toast.error('Error saving medicine');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border-b pb-3 border-gray-100 flex items-center justify-between">
                <div>
                    <h3 className="text-base font-bold text-gray-900">
                        {selectedMedicine ? 'Modify Record' : 'Register Medication'}
                    </h3>
                    <p className="text-[11px] text-gray-400">Specify operational logistics metrics</p>
                </div>
                {selectedMedicine && (
                    <span className="bg-amber-50 text-amber-700 text-[10px] font-extrabold tracking-wide uppercase px-2 py-0.5 rounded border border-amber-200">
                        Edit Mode
                    </span>
                )}
            </div>

            {/* BASE DATA PROPERTIES */}
            <div className="space-y-3">
                <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="e.g., Paracetamol 500mg"
                        value={formData.name}
                        onChange={handleChange}
                        className="block w-full border-gray-200 rounded-lg text-sm p-2 bg-gray-50/50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Classification</label>
                        <input
                            type="text"
                            name="category"
                            placeholder="e.g., Analgesic"
                            value={formData.category}
                            onChange={handleChange}
                            className="block w-full border-gray-200 rounded-lg text-sm p-2 bg-gray-50/50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Batch Code</label>
                        <input
                            type="text"
                            name="batchNumber"
                            placeholder="e.g., BTC-902"
                            value={formData.batchNumber}
                            onChange={handleChange}
                            className="block w-full border-gray-200 rounded-lg text-sm p-2 bg-gray-50/50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Expiry Date</label>
                        <input
                            type="date"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            className="block w-full border-gray-200 rounded-lg text-sm p-2 bg-gray-50/50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-600"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Initial Stock</label>
                        <input
                            type="number"
                            name="quantity"
                            placeholder="Units count"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="block w-full border-gray-200 rounded-lg text-sm p-2 bg-gray-50/50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* PRICING SPLITS */}
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 space-y-3">
                    <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-wide">Financial Configurations</span>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[10px] font-medium text-gray-500 mb-1">Cost Price (Rs.)</label>
                            <input
                                type="number"
                                name="purchasePrice"
                                placeholder="0.00"
                                value={formData.purchasePrice}
                                onChange={handleChange}
                                className="block w-full border-gray-200 rounded-lg text-sm p-2 bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-medium text-gray-500 mb-1">Retail Price (Rs.)</label>
                            <input
                                type="number"
                                name="sellingPrice"
                                placeholder="0.00"
                                value={formData.sellingPrice}
                                onChange={handleChange}
                                className="block w-full border-gray-200 rounded-lg text-sm p-2 bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-2 pt-2">
                <button
                    type="submit"
                    className={`w-full text-white font-semibold py-2 px-4 rounded-lg shadow-sm text-xs uppercase tracking-wide transition-all ${selectedMedicine
                        ? 'bg-linear-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600'
                        : 'bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600'
                        }`}
                >
                    {selectedMedicine ? 'Save Changes' : 'Commit Entry'}
                </button>
                {selectedMedicine && (
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
    );
}

export default MedicineForm;