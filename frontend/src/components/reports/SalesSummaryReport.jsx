function SalesSummaryReport({ sales }) {

    const total = sales.reduce(
        (sum, s) => sum + s.totalPrice,
        0
    );

    return (

        <div className="bg-white p-6 rounded shadow">

            <h2 className="text-xl font-bold mb-4">
                Sales Summary
            </h2>

            <p>Total Sales: {sales.length}</p>
            <p>Total Revenue: Rs. {total}</p>

        </div>
    );
}

export default SalesSummaryReport;