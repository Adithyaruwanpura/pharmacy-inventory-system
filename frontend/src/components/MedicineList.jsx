import { useEffect, useState } from 'react';
import axios from 'axios';

function MedicineList() {

    const [medicines, setMedicines] = useState([]);

    const fetchMedicines = async () => {

        try {

            const response = await axios.get(
                'http://localhost:5000/api/medicines'
            );

            setMedicines(response.data.data);

        } catch (error) {

            console.error(error);

        }
    };

    // DELETE MEDICINE
    const deleteMedicine = async (id) => {

        try {

            const token = localStorage.getItem('token');

            await axios.delete(
                `http://localhost:5000/api/medicines/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert('Medicine deleted');

            fetchMedicines();

        } catch (error) {

            console.error(error);

        }
    };

    useEffect(() => {
        fetchMedicines();
    }, []);

    return (

        <div>

            <h2>Medicine List</h2>

            <table border="1" cellPadding="10">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>

                    {medicines.map((medicine) => (

                        <tr key={medicine.id}>

                            <td>{medicine.id}</td>
                            <td>{medicine.name}</td>
                            <td>{medicine.category}</td>
                            <td>{medicine.quantity}</td>

                            <td>

                                <button
                                    onClick={() =>
                                        deleteMedicine(medicine.id)
                                    }
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default MedicineList;