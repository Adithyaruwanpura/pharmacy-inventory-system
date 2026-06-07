function PurchaseCostReport({ purchases }) {

    const totalCost = purchases.reduce(
        (sum, p) => sum + p.totalPrice,
        0
    );

    return (

        <div className="bg-white p-6 rounded shadow">

            <h2 className="text-xl font-bold mb-4">
                Purchase Cost
            </h2>

            <p>Total Purchases: {purchases.length}</p>
            <p>Total Cost: Rs. {totalCost}</p>

        </div>
    );
}

export default PurchaseCostReport;