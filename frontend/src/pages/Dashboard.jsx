import { useEffect, useState } from 'react';
import axios from 'axios';

import MedicineList from '../components/MedicineList';
import MedicineForm from '../components/MedicineForm';
import SupplierSection from '../components/SupplierSection';
import PurchaseSection from '../components/PurchaseSection';
import SalesSection from '../components/SalesSection';
import InventoryAlerts from '../components/InventoryAlerts';
import DashboardStats from '../components/DashboardStats';
import AnalyticsCharts from '../components/AnalyticsCharts';
import RecentSales from '../components/RecentSales';
import LowStockCard from '../components/LowStockCard';
function Dashboard() {

    const [medicines, setMedicines] = useState([]);
    const [sales, setSales] = useState([]);

    // FETCH MEDICINES
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

        <div className="flex min-h-screen bg-gray-100">


            {/* MAIN CONTENT */}
            <div className="flex-1 p-8 overflow-y-auto">



                <DashboardStats />

                {/* STATS CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-gray-500 text-sm">
                            Total Medicines
                        </h3>

                        <p className="text-3xl font-bold">
                            {medicines.length}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-gray-500 text-sm">
                            Low Stock Items
                        </h3>

                        <p className="text-3xl font-bold text-red-500">
                            {
                                medicines.filter(
                                    medicine => medicine.quantity <= 10
                                ).length
                            }
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-gray-500 text-sm">
                            Inventory Status
                        </h3>

                        <p className="text-3xl font-bold text-green-600">
                            Active
                        </p>
                    </div>

                </div>
                <div className="mb-8">

                    <AnalyticsCharts
                        medicines={medicines}
                        sales={sales}
                    />

                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    <RecentSales sales={sales} />

                    <LowStockCard medicines={medicines} />

                </div>

            </div>

        </div>
    );
}

export default Dashboard;