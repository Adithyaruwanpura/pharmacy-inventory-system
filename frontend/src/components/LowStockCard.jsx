function LowStockCard({ medicines }) {
    // Safely filter while checking that medicines array exists
    const lowStock = Array.isArray(medicines)
        ? medicines.filter(medicine => medicine.quantity <= 10)
        : [];

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-red-600 mb-4">
                Low Stock Alerts
            </h2>

            <div className="divide-y divide-gray-50 max-h-60 overflow-y-auto pr-1">
                {lowStock.length > 0 ? (
                    lowStock.map((medicine) => (
                        <div
                            key={medicine.id || Math.random()}
                            className="py-3 flex justify-between items-center"
                        >
                            <div>
                                <p className="font-semibold text-gray-800">
                                    {medicine.name}
                                </p>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    {/* Safely convert ID to String before running slice */}
                                    ID: #{medicine.id ? String(medicine.id).slice(-6) : 'N/A'}
                                </p>
                            </div>
                            <div className="text-right">
                                <span className="bg-red-50 text-red-600 font-mono text-xs font-bold px-2.5 py-1 rounded-lg border border-red-100">
                                    Qty: {medicine.quantity}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-8 text-center">
                        <p className="text-emerald-600 bg-emerald-50 border border-emerald-100 inline-block px-4 py-1.5 rounded-full text-xs font-medium">
                            ✓ All medicine stocks are sufficient
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LowStockCard;