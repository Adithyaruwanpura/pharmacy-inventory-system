function LowStockCard({ medicines }) {

    const lowStock = medicines.filter(
        medicine => medicine.quantity <= 10
    );

    return (

        <div className="bg-white p-6 rounded-2xl shadow">

            <h2 className="text-2xl font-bold mb-5 text-red-600">
                Low Stock Alerts
            </h2>

            {lowStock.length > 0 ? (

                lowStock.map((medicine) => (

                    <div
                        key={medicine.id}
                        className="border-b py-3"
                    >

                        <p className="font-semibold">
                            {medicine.name}
                        </p>

                        <p className="text-sm text-gray-500">
                            Qty Remaining:
                            {medicine.quantity}
                        </p>

                    </div>

                ))

            ) : (

                <p className="text-green-600">
                    No low stock items
                </p>

            )}

        </div>
    );
}

export default LowStockCard;