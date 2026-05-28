import { useEffect, useState } from 'react';
import axios from 'axios';

function DashboardStats() {

    const [stats, setStats] = useState({
        medicines: 0,
        suppliers: 0,
        lowStock: 0,
        sales: 0
    });

    const fetchStats = async () => {

        try {

            const medicineRes = await axios.get(
                'http://localhost:5000/api/medicines'
            );

            const supplierRes = await axios.get(
                'http://localhost:5000/api/suppliers'
            );

            const lowStockRes = await axios.get(
                'http://localhost:5000/api/inventory/low-stock'
            );

            const salesRes = await axios.get(
                'http://localhost:5000/api/sales'
            );

            setStats({
                medicines: medicineRes.data.data.length,
                suppliers: supplierRes.data.data.length,
                lowStock: lowStockRes.data.data.length,
                sales: salesRes.data.data.length
            });

        } catch (error) {

            console.error(error);

        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    return (

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

            <div className="bg-blue-500 text-white p-6 rounded shadow">
                <h2 className="text-xl font-bold">
                    Medicines
                </h2>

                <p className="text-3xl mt-2">
                    {stats.medicines}
                </p>
            </div>

            <div className="bg-green-500 text-white p-6 rounded shadow">
                <h2 className="text-xl font-bold">
                    Suppliers
                </h2>

                <p className="text-3xl mt-2">
                    {stats.suppliers}
                </p>
            </div>

            <div className="bg-red-500 text-white p-6 rounded shadow">
                <h2 className="text-xl font-bold">
                    Low Stock
                </h2>

                <p className="text-3xl mt-2">
                    {stats.lowStock}
                </p>
            </div>

            <div className="bg-purple-500 text-white p-6 rounded shadow">
                <h2 className="text-xl font-bold">
                    Sales
                </h2>

                <p className="text-3xl mt-2">
                    {stats.sales}
                </p>
            </div>

        </div>
    );
}

export default DashboardStats;