import { useEffect, useState } from 'react';
import axios from 'axios';

function DashboardStats() {

    const [stats, setStats] = useState({
        medicines: 0,
        suppliers: 0,
        sales: 0,
        lowStock: 0,
        todayRevenue: 0,
        monthlyRevenue: 0
    });

    const [expiredCount, setExpiredCount] = useState(0);

    const fetchStats = async () => {

        try {

            const token = localStorage.getItem('token');

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

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
            const expiredRes = await axios.get(
                'http://localhost:5000/api/expiry/expired',
                config
            );

            setExpiredCount(
                expiredRes.data.data.length
            );

            const sales = salesRes.data.data;

            // TODAY DATE
            const today = new Date().toDateString();

            // CURRENT MONTH
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();

            // TODAY REVENUE
            const todayRevenue = sales
                .filter(sale =>
                    new Date(sale.saleDate).toDateString() === today
                )
                .reduce((total, sale) => total + sale.totalPrice, 0);

            // MONTHLY REVENUE
            const monthlyRevenue = sales
                .filter(sale => {
                    const saleDate = new Date(sale.saleDate);

                    return (
                        saleDate.getMonth() === currentMonth &&
                        saleDate.getFullYear() === currentYear
                    );
                })
                .reduce((total, sale) => total + sale.totalPrice, 0);

            setStats({
                medicines: medicineRes.data.data.length,
                suppliers: supplierRes.data.data.length,
                sales: sales.length,
                lowStock: lowStockRes.data.data.length,
                todayRevenue,
                monthlyRevenue
            });

        } catch (error) {

            console.error(error);

        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    return (

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5 mb-8">

            {/* MEDICINES */}
            <div className="bg-linear-to-r from-blue-500 to-blue-700 text-white p-5 rounded-2xl shadow-lg">

                <h3 className="text-sm opacity-80">
                    Total Medicines
                </h3>

                <p className="text-3xl font-bold mt-2">
                    {stats.medicines}
                </p>

            </div>

            {/* SUPPLIERS */}
            <div className="bg-linear-to-r from-green-500 to-green-700 text-white p-5 rounded-2xl shadow-lg">

                <h3 className="text-sm opacity-80">
                    Suppliers
                </h3>

                <p className="text-3xl font-bold mt-2">
                    {stats.suppliers}
                </p>

            </div>

            {/* SALES */}
            <div className="bg-linear-to-r from-red-500 to-red-700 text-white p-5 rounded-2xl shadow-lg">

                <h3 className="text-sm opacity-80">
                    Total Sales
                </h3>

                <p className="text-3xl font-bold mt-2">
                    {stats.sales}
                </p>

            </div>

            {/* LOW STOCK */}
            <div className="bg-linear-to-r from-yellow-400 to-yellow-600 text-white p-5 rounded-2xl shadow-lg">

                <h3 className="text-sm opacity-80">
                    Low Stock
                </h3>

                <p className="text-3xl font-bold mt-2">
                    {stats.lowStock}
                </p>

            </div>
            <div className="bg-linear-to-r from-red-600 to-red-800 text-white p-5 rounded-2xl shadow-lg">

                <h3 className="text-sm opacity-80">
                    Expired Medicines
                </h3>

                <p className="text-3xl font-bold mt-2">
                    {expiredCount}
                </p>

            </div>

            {/* TODAY REVENUE */}
            <div className="bg-linear-to-r from-purple-500 to-purple-700 text-white p-5 rounded-2xl shadow-lg">

                <h3 className="text-sm opacity-80">
                    Today Revenue
                </h3>

                <p className="text-2xl font-bold mt-2">
                    Rs. {stats.todayRevenue}
                </p>

            </div>

            {/* MONTHLY REVENUE */}
            <div className="bg-linear-to-r from-pink-500 to-pink-700 text-white p-5 rounded-2xl shadow-lg">

                <h3 className="text-sm opacity-80">
                    Monthly Revenue
                </h3>

                <p className="text-2xl font-bold mt-2">
                    Rs. {stats.monthlyRevenue}
                </p>

            </div>

        </div>
    );
}

export default DashboardStats;