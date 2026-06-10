import { useEffect, useState } from 'react';
import axios from 'axios';

import MedicineForm from '../components/MedicineForm';
import MedicineList from '../components/MedicineList';

function Medicines() {
    const [medicines, setMedicines] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMedicine, setSelectedMedicine] = useState(null);

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

    const filteredMedicines = medicines.filter(
        (medicine) =>
            medicine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            medicine.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            medicine.batchNumber?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const user = JSON.parse(localStorage.getItem('user'));
    const isAdmin = user?.role === 'admin';

    return (
        <div className="w-full max-w-400 mx-auto p-4 lg:p-6 bg-gray-50 min-h-[calc(100vh-80px)] text-gray-800 antialiased flex flex-col">

            {/* ACTION TOPBAR BAR */}
            <div className="mb-6 pb-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                        Medication Catalog
                    </h2>

                </div>

                {/* SEARCH INPUT REDESIGNED */}
                <div className="relative w-full sm:w-72 lg:w-96">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Search name, category, or batch..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-9 pr-4 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm p-2.5 bg-white transition-all"
                    />
                </div>
            </div>

            {/* SPLIT LAYOUT TO FIT BETTER */}
            <div className={`grid grid-cols-1 ${isAdmin ? 'xl:grid-cols-3' : 'grid-cols-1'} gap-6 items-start flex-1`}>

                {/* LEFT COLUMN: CONTEXTUAL FORM */}
                {isAdmin && (
                    <div className="xl:col-span-1 bg-white p-5 rounded-xl shadow-sm border border-gray-100 sticky top-6">
                        <MedicineForm
                            fetchMedicines={fetchMedicines}
                            selectedMedicine={selectedMedicine}
                            setSelectedMedicine={setSelectedMedicine}
                        />
                    </div>
                )}

                {/* RIGHT COLUMN: INTERACTIVE LISTING */}
                <div className={`${isAdmin ? 'xl:col-span-2' : 'col-span-1'} bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden`}>
                    <MedicineList
                        medicines={filteredMedicines}
                        fetchMedicines={fetchMedicines}
                        setSelectedMedicine={setSelectedMedicine}
                    />
                </div>
            </div>
        </div>
    );
}

export default Medicines;