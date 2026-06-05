import { useEffect, useState } from 'react';
import axios from 'axios';

function SupplierSection() {

    const [suppliers, setSuppliers] = useState([]);

    // SEARCH
    const [searchTerm, setSearchTerm] = useState('');

    // EDIT STATE
    const [selectedSupplier, setSelectedSupplier] = useState(null);

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

    // LOAD SELECTED SUPPLIER
    useEffect(() => {

        if (selectedSupplier) {

            setFormData({
                name: selectedSupplier.name || '',
                contact: selectedSupplier.contact || '',
                address: selectedSupplier.address || ''
            });

        }

    }, [selectedSupplier]);

    // HANDLE INPUT
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // SUBMIT
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            // UPDATE
            if (selectedSupplier) {

                await axios.put(
                    `http://localhost:5000/api/suppliers/${selectedSupplier.id}`,
                    formData
                );

                alert('Supplier updated successfully');

            }

            // CREATE
            else {

                await axios.post(
                    'http://localhost:5000/api/suppliers',
                    formData
                );

                alert('Supplier added successfully');

            }

            // RESET
            setFormData({
                name: '',
                contact: '',
                address: ''
            });

            setSelectedSupplier(null);

            fetchSuppliers();

        } catch (error) {

            console.error(error);

            alert('Error saving supplier');

        }
    };

    // DELETE SUPPLIER
    const deleteSupplier = async (id) => {

        const confirmDelete = window.confirm(
            'Are you sure you want to delete this supplier?'
        );

        if (!confirmDelete) return;

        try {

            await axios.delete(
                `http://localhost:5000/api/suppliers/${id}`
            );

            alert('Supplier deleted successfully');

            fetchSuppliers();

        } catch (error) {

            console.error(error);

            alert('Error deleting supplier');

        }
    };

    // FILTER SUPPLIERS
    const filteredSuppliers = suppliers.filter(
        (supplier) =>

            supplier.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())

            ||

            supplier.contact
                .includes(searchTerm)
    );

    return (

        <div>

            <h2 className="text-2xl font-bold mb-4">

                Supplier Management

            </h2>

            {/* SEARCH */}
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
                className="space-y-4 mb-8"
            >

                <input
                    type="text"
                    name="name"
                    placeholder="Supplier Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border p-3 w-full rounded"
                />

                <input
                    type="text"
                    name="contact"
                    placeholder="Contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="border p-3 w-full rounded"
                />

                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="border p-3 w-full rounded"
                />

                <div className="space-x-3">

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >

                        {selectedSupplier
                            ? 'Update Supplier'
                            : 'Add Supplier'}

                    </button>

                    {/* CANCEL BUTTON */}
                    {selectedSupplier && (

                        <button
                            type="button"
                            onClick={() => {

                                setSelectedSupplier(null);

                                setFormData({
                                    name: '',
                                    contact: '',
                                    address: ''
                                });

                            }}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>

                    )}

                </div>

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

                        <th className="p-3 border">
                            Actions
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

                                <td className="border p-3 space-x-2">

                                    <button
                                        onClick={() =>
                                            setSelectedSupplier(supplier)
                                        }
                                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            deleteSupplier(supplier.id)
                                        }
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan="4"
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