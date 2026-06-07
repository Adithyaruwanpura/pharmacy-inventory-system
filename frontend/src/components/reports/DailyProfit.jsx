function DailyProfit({ sales, purchases }) {

    const today = new Date().toDateString();

    const todaySales = sales.filter(
        s => new Date(s.saleDate).toDateString() === today
    );

    const todayPurchases = purchases.filter(
        p => new Date(p.purchaseDate).toDateString() === today
    );

    const income = todaySales.reduce(
        (sum, s) => sum + s.totalPrice,
        0
    );

    const cost = todayPurchases.reduce(
        (sum, p) => sum + p.totalPrice,
        0
    );

    const profit = income - cost;

    return (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="bg-green-100 p-5 rounded">
                <h2>Income</h2>
                <p className="text-2xl font-bold">Rs. {income}</p>
            </div>

            <div className="bg-red-100 p-5 rounded">
                <h2>Cost</h2>
                <p className="text-2xl font-bold">Rs. {cost}</p>
            </div>

            <div className="bg-blue-100 p-5 rounded">
                <h2>Profit</h2>
                <p className="text-2xl font-bold">Rs. {profit}</p>
            </div>

        </div>
    );
}

export default DailyProfit;