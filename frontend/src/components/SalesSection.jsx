import { useEffect, useState } from 'react';
import axios from 'axios';

function SalesSection() {

    const [medicines, setMedicines] = useState([]);

    const [formData, setFormData] = useState({
        medicineId: '',
        quantity: '',
        totalPrice: ''
    });

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

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                'http://localhost:5000/api/sales',
                formData
            );

            alert('Sale recorded successfully');

        } catch (error) {

            console.error(error);

            alert('Error recording sale');

        }
    };

    return (

        <div>

            <h2 className="text-2xl font-bold mb-4">
                Sales Management
            </h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                <select
                    name="medicineId"
                    className="border p-2 w-full"
                    onChange={handleChange}
                >

                    <option value="">
                        Select Medicine
                    </option>

                    {medicines.map((medicine) => (

                        <option
                            key={medicine.id}
                            value={medicine.id}
                        >
                            {medicine.name}
                        </option>

                    ))}

                </select>

                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    className="border p-2 w-full"
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="totalPrice"
                    placeholder="Total Price"
                    className="border p-2 w-full"
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    className="bg-red-600 text-white px-4 py-2 rounded"
                >
                    Record Sale
                </button>

            </form>

        </div>
    );
}

export default SalesSection;