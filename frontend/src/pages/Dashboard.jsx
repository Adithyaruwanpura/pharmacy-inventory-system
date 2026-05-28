import { useEffect, useState } from 'react';
import axios from 'axios';

import MedicineList from '../components/MedicineList';
import MedicineForm from '../components/MedicineForm';

function Dashboard() {

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

        <div style={{ display: 'flex' }}>

            {/* SIDEBAR */}
            <div
                style={{
                    width: '220px',
                    background: '#f0f0f0',
                    height: '100vh',
                    padding: '20px'
                }}
            >

                <h2>Pharmacy System</h2>

                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li>Dashboard</li>
                    <li>Medicines</li>
                    <li>Suppliers</li>
                    <li>Sales</li>
                    <li>Purchases</li>
                </ul>

            </div>

            {/* MAIN CONTENT */}
            <div style={{ flex: 1, padding: '20px' }}>

                <h1>Dashboard</h1>

                <MedicineForm fetchMedicines={fetchMedicines} />

                <br /><br />

                <MedicineList
                    medicines={medicines}
                    fetchMedicines={fetchMedicines}
                />

            </div>

        </div>
    );
}

export default Dashboard;