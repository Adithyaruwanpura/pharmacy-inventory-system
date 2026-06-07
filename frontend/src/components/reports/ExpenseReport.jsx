function ExpenseReport({ purchases }) {

    return (

        <div className="bg-white p-6 rounded shadow">

            <h2 className="text-xl font-bold mb-4">
                Expenses Breakdown
            </h2>

            <table className="w-full border">

                <thead>
                    <tr>
                        <th>Supplier</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>

                <tbody>

                    {purchases.map(p => (
                        <tr key={p.id}>
                            <td>{p.supplier?.name}</td>
                            <td>Rs. {p.totalPrice}</td>
                            <td>
                                {new Date(p.purchaseDate).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default ExpenseReport;