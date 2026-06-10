import { useEffect, useState } from 'react';
import axios from 'axios';

function InventoryAlerts() {
    const [lowStock, setLowStock] = useState([]);

    const fetchAlerts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                'http://localhost:5000/api/inventory/low-stock',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setLowStock(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAlerts();
    }, []);

    return (
        <div>
            {/* COMPONENT HEADER */}
            <div className="p-5 border-b border-gray-100 bg-white flex justify-between items-center">
                <div>
                    <h3 className="text-base font-bold text-gray-900">
                        Low Stock Alerts
                    </h3>
                    <p className="text-[11px] text-gray-400">Items matching or dipping below safe reorder thresholds</p>
                </div>
                {lowStock.length > 0 && (
                    <span className="bg-red-50 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full border border-red-100 animate-pulse">
                        {lowStock.length} Action Needed
                    </span>
                )}
            </div>

            {/* ALERTS BODY LIST */}
            <div className="p-5 bg-gray-50/30">
                {lowStock.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-dashed border-gray-200">
                        {/* Clean minimal checkmark circle */}
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-3 border border-emerald-100">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">Inventory Status Healthy</span>
                        <p className="text-[11px] text-gray-400 mt-1">All medications currently meet baseline replenishment configurations.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {lowStock.map((medicine) => (
                            <div
                                key={medicine.id}
                                className="bg-white border border-red-100 hover:border-red-200 transition-all duration-150 rounded-xl p-4 flex justify-between items-center shadow-sm"
                            >
                                <div className="flex items-center gap-3">
                                    {/* Danger indicator marker */}
                                    <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900 tracking-tight">
                                            {medicine.name}
                                        </h4>
                                        <p className="text-[10px] font-mono text-gray-400 mt-0.5">Item ID: #{medicine.id}</p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <span className="inline-block bg-red-50 text-red-700 font-mono font-bold text-xs px-2.5 py-1 rounded-lg border border-red-100">
                                        Qty: {medicine.quantity}
                                    </span>
                                    <p className="text-[10px] text-red-500 font-medium mt-1">Critically Low</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default InventoryAlerts;