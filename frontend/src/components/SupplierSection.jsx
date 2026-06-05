import { useEffect, useState } from 'react';
import axios from 'axios';

function SupplierSection() {

    const [suppliers, setSuppliers] = useState([]);

    // SEARCH STATE
    const [searchTerm, setSearchTerm] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        address: ''
    });

    // FETCH SUPPLIERS
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

    // HANDLE INPUT CHANGE
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // ADD SUPPLIER
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                'http://localhost:5000/api/suppliers',
                formData
            );

            alert('Supplier added');

            // CLEAR FORM
            setFormData({
                name: '',
                contact: '',
                address: ''
            });

            fetchSuppliers();

        } catch (error) {

            console.error(error);

        }
    };

    // FILTER SUPPLIERS
    const filteredSuppliers = suppliers.filter(
        (supplier) =>
            supplier.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

    return (

        <div>

            <h2 className="text-2xl font-bold mb-4">
                Supplier Management
            </h2>

            {/* SEARCH INPUT */}
            <input
                type="text"
                placeholder="Search suppliers..."
                value={searchTerm}
                onChange={(e) =>
                    setSearchTerm(e.target.value)
                }
                className="border p-3 rounded w-full mb-6"
            />

            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                className="space-y-4 mb-6"
            >

                <input
                    type="text"
                    name="name"
                    placeholder="Supplier Name"
                    value={formData.name}
                    className="border p-2 w-full rounded"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="contact"
                    placeholder="Contact"
                    value={formData.contact}
                    className="border p-2 w-full rounded"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    className="border p-2 w-full rounded"
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Supplier
                </button>

            </form>

            {/* TABLE */}
            <table className="w-full border">

                <thead className="bg-gray-200">

                    <tr>

                        <th className="p-3 border">
                            Name
                        </th>

                        <th className="p-3 border">
                            Contact
                        </th>

                        <th className="p-3 border">
                            Address
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {filteredSuppliers.length > 0 ? (

                        filteredSuppliers.map((supplier) => (

                            <tr key={supplier.id}>

                                <td className="border p-3">
                                    {supplier.name}
                                </td>

                                <td className="border p-3">
                                    {supplier.contact}
                                </td>

                                <td className="border p-3">
                                    {supplier.address}
                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan="3"
                                className="text-center p-5"
                            >
                                No suppliers found
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>
    );
}

export default SupplierSection;