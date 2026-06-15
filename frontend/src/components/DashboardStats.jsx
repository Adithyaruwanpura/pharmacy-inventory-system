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
            const config = { headers: { Authorization: `Bearer ${token}` } };

            const medicineRes = await axios.get('http://localhost:5000/api/medicines', config);
            const supplierRes = await axios.get('http://localhost:5000/api/suppliers', config);
            const salesRes = await axios.get('http://localhost:5000/api/sales', config);
            const lowStockRes = await axios.get('http://localhost:5000/api/inventory/low-stock', config);
            const expiredRes = await axios.get('http://localhost:5000/api/expiry/expired', config);

            setExpiredCount(expiredRes.data.data.length);
            const sales = salesRes.data.data;

            const today = new Date().toDateString();
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();

            const todayRevenue = sales
                .filter(sale => new Date(sale.saleDate).toDateString() === today)
                .reduce((total, sale) => total + sale.totalPrice, 0);

            const monthlyRevenue = sales
                .filter(sale => {
                    const saleDate = new Date(sale.saleDate);
                    return saleDate.getMonth() === currentMonth && saleDate.getFullYear() === currentYear;
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

    useEffect(() => { fetchStats(); }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">

            {/* CARD: TOTAL MEDICINES */}
            <div className="bg-white border border-gray-200/80 p-5 rounded-2xl shadow-xs relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Meds</h3>
                <p className="text-3xl font-black text-gray-900 mt-2 font-mono tracking-tight">{stats.medicines}</p>
            </div>

            {/* CARD: SUPPLIERS */}
            <div className="bg-white border border-gray-200/80 p-5 rounded-2xl shadow-xs relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Suppliers</h3>
                <p className="text-3xl font-black text-gray-900 mt-2 font-mono tracking-tight">{stats.suppliers}</p>
            </div>

            {/* CARD: TOTAL SALES */}
            <div className="bg-white border border-gray-200/80 p-5 rounded-2xl shadow-xs relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Sales</h3>
                <p className="text-3xl font-black text-gray-900 mt-2 font-mono tracking-tight">{stats.sales}</p>
            </div>

            {/* CARD: LOW STOCK */}
            <div className={`bg-white border p-5 rounded-2xl shadow-xs relative overflow-hidden ${stats.lowStock > 0 ? 'border-amber-200 bg-amber-50/20' : 'border-gray-200/80'}`}>
                <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Low Stock</h3>
                <p className={`text-3xl font-black mt-2 font-mono tracking-tight ${stats.lowStock > 0 ? 'text-amber-600' : 'text-gray-900'}`}>{stats.lowStock}</p>
            </div>

            {/* CARD: EXPIRED */}
            <div className={`bg-white border p-5 rounded-2xl shadow-xs relative overflow-hidden ${expiredCount > 0 ? 'border-red-200 bg-red-50/20 animate-pulse' : 'border-gray-200/80'}`}>
                <div className="absolute top-0 left-0 w-1.5 h-full bg-red-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Expired</h3>
                <p className={`text-3xl font-black mt-2 font-mono tracking-tight ${expiredCount > 0 ? 'text-red-600' : 'text-gray-900'}`}>{expiredCount}</p>
            </div>

            {/* CARD: TODAY REVENUE */}
            <div className="bg-white border border-gray-200/80 p-5 rounded-2xl shadow-xs relative overflow-hidden sm:col-span-2 lg:col-span-1">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-violet-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Today Rev</h3>
                <p className="text-xl font-bold text-gray-900 mt-2 font-mono tracking-tight">Rs. {stats.todayRevenue.toLocaleString()}</p>
            </div>

            {/* CARD: MONTHLY REVENUE */}
            <div className="bg-white border border-gray-200/80 p-5 rounded-2xl shadow-xs relative overflow-hidden sm:col-span-2 lg:col-span-1">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-fuchsia-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Monthly Rev</h3>
                <p className="text-xl font-bold text-gray-900 mt-2 font-mono tracking-tight">Rs. {stats.monthlyRevenue.toLocaleString()}</p>
            </div>

        </div>
    );
}

export default DashboardStats;