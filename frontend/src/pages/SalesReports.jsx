import { useEffect, useState } from 'react';
import axios from 'axios';

import InvoiceGenerator from '../components/InvoiceGenerator';

function SalesReports() {

    const [sales, setSales] = useState([]);

    const fetchSales = async () => {

        try {

            const response = await axios.get(
                'http://localhost:5000/api/sales'
            );

            setSales(response.data.data);

        } catch (error) {

            console.error(error);

        }
    };

    useEffect(() => {
        fetchSales();
    }, []);

    return (

        <div>

            <h1 className="text-3xl font-bold mb-8">
                Sales Reports
            </h1>

            <div className="bg-white p-6 rounded shadow">

                <table className="w-full border">

                    <thead className="bg-gray-200">

                        <tr>
                            <th className="p-3">ID</th>
                            <th className="p-3">Medicine</th>
                            <th className="p-3">Quantity</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Invoice</th>
                        </tr>

                    </thead>

                    <tbody>

                        {sales.map((sale) => (

                            <tr key={sale.id}>

                                <td className="border p-3">
                                    {sale.id}
                                </td>

                                <td className="border p-3">
                                    {sale.medicine?.name}
                                </td>

                                <td className="border p-3">
                                    {sale.quantity}
                                </td>

                                <td className="border p-3">
                                    Rs. {sale.totalPrice}
                                </td>

                                <td className="border p-3">

                                    <InvoiceGenerator sale={sale} />

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default SalesReports;