function MonthlyProfit({ sales, purchases }) {

    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    const monthlySales = sales.filter(s => {
        const d = new Date(s.saleDate);
        return d.getMonth() === month && d.getFullYear() === year;
    });

    const monthlyPurchases = purchases.filter(p => {
        const d = new Date(p.purchaseDate);
        return d.getMonth() === month && d.getFullYear() === year;
    });

    const income = monthlySales.reduce((a, b) => a + b.totalPrice, 0);
    const cost = monthlyPurchases.reduce((a, b) => a + b.totalPrice, 0);
    const profit = income - cost;

    return (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="bg-green-200 p-5 rounded">
                <h2>Monthly Income</h2>
                <p className="text-2xl font-bold">Rs. {income}</p>
            </div>

            <div className="bg-red-200 p-5 rounded">
                <h2>Monthly Expense</h2>
                <p className="text-2xl font-bold">Rs. {cost}</p>
            </div>

            <div className="bg-blue-200 p-5 rounded">
                <h2>Monthly Profit</h2>
                <p className="text-2xl font-bold">Rs. {profit}</p>
            </div>

        </div>
    );
}

export default MonthlyProfit;