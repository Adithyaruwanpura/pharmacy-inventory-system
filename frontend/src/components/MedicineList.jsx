import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

function MedicineList({
    medicines,
    fetchMedicines,
    setSelectedMedicine
}) {
    const deleteMedicine = async (id) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this medicine?'
        );
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(
                `http://localhost:5000/api/medicines/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success('Medicine record deleted');
            fetchMedicines();
        } catch (error) {
            console.error(error);
            toast.error('Error deleting medicine');
        }
    };

    const user = JSON.parse(localStorage.getItem('user'));
    const isAdmin = user?.role === 'admin';

    return (
        <div className="flex flex-col h-full max-h-160">
            {/* COMPONENT HEADER */}
            <div className="p-4 border-b border-gray-100 bg-white flex justify-between items-center">
                <div>
                    <h3 className="text-base font-bold text-gray-900">Registered Ledger</h3>
                    <p className="text-[11px] text-gray-400">Database rows currently loaded in memory</p>
                </div>
                <span className="bg-gray-100 text-gray-600 text-[11px] font-bold px-2.5 py-1 rounded-lg">
                    {medicines.length} Entries Found
                </span>
            </div>

            {/* TABLE VIEW CONTEXT */}
            <div className="overflow-y-auto overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-500 sticky top-0 z-10 shadow-sm">
                            <th className="p-3 pl-4 w-16">ID</th>
                            <th className="p-3">Medication Name</th>
                            <th className="p-3">Category</th>
                            <th className="p-3 text-center">Available Units</th>
                            {isAdmin && <th className="p-3 pr-4 text-right">Administrative Actions</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-xs text-gray-600">
                        {medicines.length > 0 ? (
                            medicines.map((medicine) => (
                                <tr key={medicine.id} className="hover:bg-gray-50/40 transition-colors">
                                    <td className="p-3 pl-4 font-mono font-medium text-gray-400">
                                        #{medicine.id}
                                    </td>
                                    <td className="p-3">
                                        <div className="font-bold text-gray-900">{medicine.name}</div>
                                        {medicine.batchNumber && (
                                            <div className="text-[10px] text-gray-400 font-mono mt-0.5">
                                                Batch: {medicine.batchNumber}
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-3">
                                        <span className="inline-block bg-slate-100 text-slate-700 font-medium text-[10px] px-2 py-0.5 rounded-md">
                                            {medicine.category || 'Unclassified'}
                                        </span>
                                    </td>
                                    <td className="p-3 text-center">
                                        <span className={`font-mono font-bold text-xs ${medicine.quantity <= 10 ? 'text-rose-600' : 'text-slate-800'
                                            }`}>
                                            {medicine.quantity}
                                        </span>
                                    </td>
                                    {isAdmin && (
                                        <td className="p-3 pr-4 text-right whitespace-nowrap space-x-2">
                                            <button
                                                onClick={() => setSelectedMedicine(medicine)}
                                                className="inline-flex items-center justify-center bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200/60 font-semibold px-2.5 py-1 rounded-md transition-colors"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => deleteMedicine(medicine.id)}
                                                className="inline-flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-600 border border-red-200/60 font-semibold px-2.5 py-1 rounded-md transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={isAdmin ? 5 : 4} className="text-center p-12 text-gray-400">
                                    <div className="flex flex-col items-center justify-center space-y-1">
                                        <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-4M4 13h4m1.5 8h4.5" />
                                        </svg>
                                        <span className="text-sm font-medium">No results match filters</span>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MedicineList;