import { useEffect, useState } from 'react';
import axios from 'axios';

import MedicineList from '../components/MedicineList';
import MedicineForm from '../components/MedicineForm';
import SupplierSection from '../components/SupplierSection';
import PurchaseSection from '../components/PurchaseSection';
import SalesSection from '../components/SalesSection';
import InventoryAlerts from '../components/InventoryAlerts';
import DashboardStats from '../components/DashboardStats';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

    const [medicines, setMedicines] = useState([]);

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

    useEffect(() => {
        fetchMedicines();
    }, []);

    return (

        <div className="flex min-h-screen bg-gray-100">

            {/* SIDEBAR */}
            <div className="w-64 bg-blue-900 text-white p-6">

                <h2 className="text-2xl font-bold mb-10">
                    Pharmacy System
                </h2>

                <ul className="space-y-4">

                    <li className="hover:bg-blue-700 p-2 rounded cursor-pointer">
                        Dashboard
                    </li>


                    <li className="hover:bg-blue-700 p-2 rounded cursor-pointer">
                        Medicines
                    </li>

                    <li className="hover:bg-blue-700 p-2 rounded cursor-pointer">
                        Suppliers
                    </li>

                    <li className="hover:bg-blue-700 p-2 rounded cursor-pointer">
                        Sales
                    </li>

                    <li className="hover:bg-blue-700 p-2 rounded cursor-pointer">
                        Purchases
                    </li>

                </ul>
                <button
                    onClick={() => {
                        localStorage.removeItem('token');
                        window.location.href = '/';
                    }}
                    className="mt-10 bg-red-500 px-4 py-2 rounded w-full"
                >
                    Logout
                </button>

            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 p-8 overflow-y-auto">

                <h1 className="text-3xl font-bold mb-8">
                    Dashboard
                </h1>

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

                {/* MEDICINE FORM */}
                <div className="bg-white p-6 rounded shadow mb-8">

                    <MedicineForm
                        fetchMedicines={fetchMedicines}
                    />

                </div>

                {/* MEDICINE TABLE */}
                <div className="bg-white p-6 rounded shadow mb-8">

                    <MedicineList
                        medicines={medicines}
                        fetchMedicines={fetchMedicines}
                    />

                </div>

                {/* SUPPLIER SECTION */}
                <div className="bg-white p-6 rounded shadow">

                    <SupplierSection />

                </div>

                <div className="bg-white p-6 rounded shadow mb-8">
                    <PurchaseSection />
                </div>

                <div className="bg-white p-6 rounded shadow mb-8">
                    <SalesSection />
                </div>

                <div className="bg-white p-6 rounded shadow">
                    <InventoryAlerts />
                </div>

            </div>

        </div>
    );
}

export default Dashboard;