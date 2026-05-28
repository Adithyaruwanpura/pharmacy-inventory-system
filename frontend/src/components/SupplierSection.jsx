import { useEffect, useState } from 'react';
import axios from 'axios';

function SupplierSection() {

    const [suppliers, setSuppliers] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        address: ''
    });

    const fetchSuppliers = async () => {

        try {

            const response = await axios.get(
                'http://localhost:5000/api/suppliers'
            );

            setSuppliers(response.data.data);

        } catch (error) {

            console.error(error);

        }
    };

    useEffect(() => {
        fetchSuppliers();
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
                'http://localhost:5000/api/suppliers',
                formData
            );

            alert('Supplier added');

            fetchSuppliers();

        } catch (error) {

            console.error(error);

        }
    };

    return (

        <div>

            <h2 className="text-2xl font-bold mb-4">
                Supplier Management
            </h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-4 mb-6"
            >

                <input
                    type="text"
                    name="name"
                    placeholder="Supplier Name"
                    className="border p-2 w-full"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="contact"
                    placeholder="Contact"
                    className="border p-2 w-full"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    className="border p-2 w-full"
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Add Supplier
                </button>

            </form>

            <table className="w-full border">

                <thead className="bg-gray-200">

                    <tr>
                        <th className="p-2">Name</th>
                        <th className="p-2">Contact</th>
                        <th className="p-2">Address</th>
                    </tr>

                </thead>

                <tbody>

                    {suppliers.map((supplier) => (

                        <tr key={supplier.id}>

                            <td className="border p-2">
                                {supplier.name}
                            </td>

                            <td className="border p-2">
                                {supplier.contact}
                            </td>

                            <td className="border p-2">
                                {supplier.address}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default SupplierSection;