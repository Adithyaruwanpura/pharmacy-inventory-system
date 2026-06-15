import { useEffect, useState } from 'react';
import axios from 'axios';

import DashboardStats from '../components/DashboardStats';
import AnalyticsCharts from '../components/AnalyticsCharts';
import RecentSales from '../components/RecentSales';
import LowStockCard from '../components/LowStockCard';

function Dashboard() {
    const [medicines, setMedicines] = useState([]);
    const [sales, setSales] = useState([]);

    const fetchMedicines = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                'http://localhost:5000/api/medicines',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setMedicines(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchSales = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                'http://localhost:5000/api/sales',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setSales(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMedicines();
        fetchSales();
    }, []);

    return (
        <div className="w-full max-w-400 mx-auto p-4 lg:p-6 bg-gray-50 min-h-[calc(100vh-80px)] text-gray-800 antialiased flex flex-col">


            {/* LIVE SYSTEM OVERVIEW STATS ROW */}
            <DashboardStats />
            <br></br>

            {/* VISUAL ANALYTICS LAYER */}
            <AnalyticsCharts medicines={medicines} sales={sales} />

            <br></br>

            {/* SECONDARY AUDIT GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentSales sales={sales} />
                <LowStockCard medicines={medicines} />
            </div>
        </div>
    );
}

export default Dashboard;