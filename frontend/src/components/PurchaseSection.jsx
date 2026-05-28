import { useEffect, useState } from 'react';
import axios from 'axios';

function PurchaseSection() {

    const [medicines, setMedicines] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    const [formData, setFormData] = useState({
        medicineId: '',
        supplierId: '',
        quantity: '',
        totalPrice: ''
    });

    const fetchData = async () => {

        try {

            const token = localStorage.getItem('token');

            const medicineRes = await axios.get(
                'http://localhost:5000/api/medicines',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            const supplierRes = await axios.get(
                'http://localhost:5000/api/suppliers',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMedicines(medicineRes.data.data);
            setSuppliers(supplierRes.data.data);

        } catch (error) {

            console.error(error);

        }
    };

    useEffect(() => {
        fetchData();
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
                'http://localhost:5000/api/purchases',
                formData
            );

            alert('Purchase added successfully');

        } catch (error) {

            console.error(error);

            alert('Error adding purchase');

        }
    };

    return (

        <div>

            <h2 className="text-2xl font-bold mb-4">
                Purchase Management
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

                <select
                    name="supplierId"
                    className="border p-2 w-full"
                    onChange={handleChange}
                >

                    <option value="">
                        Select Supplier
                    </option>

                    {suppliers.map((supplier) => (

                        <option
                            key={supplier.id}
                            value={supplier.id}
                        >
                            {supplier.name}
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
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Add Purchase
                </button>

            </form>

        </div>
    );
}

export default PurchaseSection;