import { useEffect, useState } from 'react';
import axios from 'axios';

import MedicineForm from '../components/MedicineForm';
import MedicineList from '../components/MedicineList';

function Medicines() {

    const [medicines, setMedicines] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');

    // EDIT STATE
    const [selectedMedicine, setSelectedMedicine] = useState(null);

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

    // FILTER
    const filteredMedicines = medicines.filter(
        (medicine) =>

            medicine.name
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase())

            ||

            medicine.category
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase())

            ||

            medicine.batchNumber
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

    const user =
        JSON.parse(localStorage.getItem('user'));

    return (

        <div>

            {/* SEARCH */}
            <input
                type="text"
                placeholder="Search medicines..."
                value={searchTerm}
                onChange={(e) =>
                    setSearchTerm(e.target.value)
                }
                className="border p-3 rounded w-full mb-6"
            />

            {/* FORM */}
            {user?.role === 'admin' && (
                <div className="bg-white p-6 rounded shadow mb-8">

                    <MedicineForm
                        fetchMedicines={fetchMedicines}
                        selectedMedicine={selectedMedicine}
                        setSelectedMedicine={setSelectedMedicine}
                    />

                </div>
            )}

            {/* LIST */}
            <div className="bg-white p-6 rounded shadow">

                <MedicineList
                    medicines={filteredMedicines}
                    fetchMedicines={fetchMedicines}
                    setSelectedMedicine={setSelectedMedicine}
                />

            </div>

        </div>
    );
}

export default Medicines;