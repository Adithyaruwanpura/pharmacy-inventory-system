import { useEffect, useState } from 'react';
import axios from 'axios';

function ExpiryManagement() {
    const [nearExpiry, setNearExpiry] = useState([]);
    const [expired, setExpired] = useState([]);

    const fetchExpiryData = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const nearExpiryRes = await axios.get(
                'http://localhost:5000/api/expiry/near-expiry',
                config
            );

            const expiredRes = await axios.get(
                'http://localhost:5000/api/expiry/expired',
                config
            );

            setNearExpiry(nearExpiryRes.data.data);
            setExpired(expiredRes.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchExpiryData();
    }, []);

    return (
        <div className="space-y-8">
            {/* NEAR EXPIRY SECTION */}
            <div className="bg-white rounded-2xl shadow-xs border border-amber-200/60 overflow-hidden">
                {/* STATUS BAR */}
                <div className="bg-linear-to-r from-blue-500 to-blue-600 text-white px-6 py-4.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                        <h2 className="text-lg font-bold tracking-tight">
                            Near Expiry Medications
                        </h2>
                        <p className="text-xs text-amber-50/90 mt-0.5">
                            Critical tracking for stock batches expiring within the 30-day structural window
                        </p>
                    </div>
                    <div className="bg-amber-400/30 text-white border border-amber-300/20 px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto">
                        {nearExpiry.length} Batches Risked
                    </div>
                </div>

                {/* TABLE CONTAINER */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="bg-amber-50/50 border-b border-amber-100/60 text-[11px] font-bold text-amber-800/80 uppercase tracking-wider">
                                <th className="p-4">Medicine Asset</th>
                                <th className="p-4">Classification</th>
                                <th className="p-4">Remaining Inventory</th>
                                <th className="p-4 text-right">Expiration Threshold</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                            {nearExpiry.length > 0 ? (
                                nearExpiry.map((medicine) => (
                                    <tr key={medicine.id} className="hover:bg-amber-50/20 transition-colors">
                                        <td className="p-4 font-semibold text-gray-900">
                                            {medicine.name}
                                        </td>
                                        <td className="p-4">
                                            <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs font-medium">
                                                {medicine.category}
                                            </span>
                                        </td>
                                        <td className="p-4 font-mono text-gray-600">
                                            {medicine.quantity} <span className="text-xs text-gray-400">units</span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <span className="text-amber-700 bg-amber-50 font-semibold px-2.5 py-1 rounded-lg text-xs border border-amber-100 font-mono inline-block">
                                                {new Date(medicine.expiryDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center p-8 text-sm text-gray-400 font-medium">
                                        No near expiry medications reported inside safety zones.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* EXPIRED SECTION */}
            <div className="bg-white rounded-2xl shadow-xs border border-red-200/60 overflow-hidden">
                {/* STATUS BAR */}
                <div className="bg-linear-to-r from-red-500 to-red-600 text-white px-6 py-4.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                        <h2 className="text-lg font-bold tracking-tight">
                            Expired Stock Vault
                        </h2>
                        <p className="text-xs text-red-50/90 mt-0.5">
                            Quarantined items that have passed usable thresholds and require layout clearing
                        </p>
                    </div>
                    <div className="bg-red-400/30 text-white border border-red-300/20 px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto">
                        {expired.length} Batches Flagged
                    </div>
                </div>

                {/* TABLE CONTAINER */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="bg-red-50/50 border-b border-red-100/60 text-[11px] font-bold text-red-800/80 uppercase tracking-wider">
                                <th className="p-4">Medicine Asset</th>
                                <th className="p-4">Classification</th>
                                <th className="p-4">Dead Stock Quantity</th>
                                <th className="p-4 text-right">Termination Date</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                            {expired.length > 0 ? (
                                expired.map((medicine) => (
                                    <tr key={medicine.id} className="bg-red-50/20 hover:bg-red-50/40 transition-colors">
                                        <td className="p-4 font-bold text-red-900 line-through decoration-red-300">
                                            {medicine.name}
                                        </td>
                                        <td className="p-4">
                                            <span className="bg-red-50 text-red-600 border border-red-100 px-2.5 py-1 rounded-md text-xs font-medium">
                                                {medicine.category}
                                            </span>
                                        </td>
                                        <td className="p-4 font-mono text-red-700 font-medium">
                                            {medicine.quantity} <span className="text-xs text-red-400">units</span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <span className="text-white bg-red-600 font-bold px-2.5 py-1 rounded-lg text-xs font-mono tracking-wide shadow-xs inline-block">
                                                {new Date(medicine.expiryDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center p-8 text-sm text-gray-400 font-medium">
                                        Excellent. No expired inventory vectors detected.
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

export default ExpiryManagement;