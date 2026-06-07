function RecentSales({ sales }) {

    return (

        <div className="bg-white p-6 rounded-2xl shadow">

            <h2 className="text-2xl font-bold mb-5">
                Recent Sales
            </h2>

            <table className="w-full">

                <thead>

                    <tr className="border-b">

                        <th className="text-left p-3">
                            Medicine
                        </th>

                        <th className="text-left p-3">
                            Quantity
                        </th>

                        <th className="text-left p-3">
                            Amount
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {sales.slice(0, 5).map((sale) => (

                        <tr
                            key={sale.id}
                            className="border-b"
                        >

                            <td className="p-3">
                                {sale.medicine?.name}
                            </td>

                            <td className="p-3">
                                {sale.quantity}
                            </td>

                            <td className="p-3">
                                Rs. {sale.totalPrice}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default RecentSales;