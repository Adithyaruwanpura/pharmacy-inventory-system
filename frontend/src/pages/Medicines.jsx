import { useEffect, useState } from 'react';
import axios from 'axios';

import MedicineForm from '../components/MedicineForm';
import MedicineList from '../components/MedicineList';

function Medicines() {

    const [medicines, setMedicines] = useState([]);

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

        <div>

            <h1 className="text-3xl font-bold mb-8">
                Medicines
            </h1>

            <div className="bg-white p-6 rounded shadow mb-8">

                <MedicineForm
                    fetchMedicines={fetchMedicines}
                />

            </div>

            <div className="bg-white p-6 rounded shadow">

                <MedicineList
                    medicines={medicines}
                    fetchMedicines={fetchMedicines}
                />

            </div>

        </div>
    );
}

export default Medicines;