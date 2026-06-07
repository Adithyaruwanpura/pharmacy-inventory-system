import { useEffect, useState } from 'react';
import axios from 'axios';

function DashboardStats() {

    const [stats, setStats] = useState({
        medicines: 0,
        suppliers: 0,
        sales: 0,
        lowStock: 0
    });

    const fetchStats = async () => {

        try {

            // GET TOKEN
            const token = localStorage.getItem('token');

            // COMMON HEADERS
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            // API CALLS
            const medicineRes = await axios.get(
                'http://localhost:5000/api/medicines',
                config
            );

            const supplierRes = await axios.get(
                'http://localhost:5000/api/suppliers',
                config
            );

            const salesRes = await axios.get(
                'http://localhost:5000/api/sales',
                config
            );

            const lowStockRes = await axios.get(
                'http://localhost:5000/api/inventory/low-stock',
                config
            );

            // SET STATS
            setStats({
                medicines: medicineRes.data.data.length,
                suppliers: supplierRes.data.data.length,
                sales: salesRes.data.data.length,
                lowStock: lowStockRes.data.data.length
            });

        } catch (error) {

            console.error('Dashboard Stats Error:', error);

        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    return (

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

            {/* MEDICINES */}
            <div className="bg-blue-500 text-white p-6 rounded shadow">

                <h3 className="text-xl font-bold">
                    Medicines
                </h3>

                <p className="text-3xl mt-2">
                    {stats.medicines}
                </p>

            </div>

            {/* SUPPLIERS */}
            <div className="bg-green-500 text-white p-6 rounded shadow">

                <h3 className="text-xl font-bold">
                    Suppliers
                </h3>

                <p className="text-3xl mt-2">
                    {stats.suppliers}
                </p>

            </div>

            {/* SALES */}
            <div className="bg-red-500 text-white p-6 rounded shadow">

                <h3 className="text-xl font-bold">
                    Sales
                </h3>

                <p className="text-3xl mt-2">
                    {stats.sales}
                </p>

            </div>

            {/* LOW STOCK */}
            <div className="bg-yellow-500 text-white p-6 rounded shadow">

                <h3 className="text-xl font-bold">
                    Low Stock
                </h3>

                <p className="text-3xl mt-2">
                    {stats.lowStock}
                </p>

            </div>

        </div>
    );
}

export default DashboardStats;