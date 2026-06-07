import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

function MedicineList({
    medicines,
    fetchMedicines,
    setSelectedMedicine
}) {

    // DELETE MEDICINE
    const deleteMedicine = async (id) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this medicine?'
        );

        if (!confirmDelete) return;

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

            toast.success('Medicine deleted');

            fetchMedicines();

        } catch (error) {

            console.error(error);
            toast.error('Error deleting medicine');

        }
    };

    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;

    const user =
        JSON.parse(localStorage.getItem('user'));

    return (

        <div>

            <h2 className="text-2xl font-bold mb-4">
                Medicine List
            </h2>

            <table className="w-full border">

                <thead className="bg-gray-200">

                    <tr>

                        <th className="p-3 border">
                            ID
                        </th>

                        <th className="p-3 border">
                            Name
                        </th>

                        <th className="p-3 border">
                            Category
                        </th>

                        <th className="p-3 border">
                            Quantity
                        </th>
                        {user?.role === 'admin' && (
                            <th className="p-3 border">
                                Actions
                            </th>)}

                    </tr>

                </thead>

                <tbody>

                    {medicines.length > 0 ? (

                        medicines.map((medicine) => (

                            <tr key={medicine.id}>

                                <td className="border p-3">
                                    {medicine.id}
                                </td>

                                <td className="border p-3">
                                    {medicine.name}
                                </td>

                                <td className="border p-3">
                                    {medicine.category}
                                </td>

                                <td className="border p-3">
                                    {medicine.quantity}
                                </td>

                                {user?.role === 'admin' && (
                                    <td className="border p-3 space-x-2">

                                        <button
                                            onClick={() =>
                                                setSelectedMedicine(medicine)
                                            }
                                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                                deleteMedicine(medicine.id)
                                            }
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>

                                    </td>
                                )}

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan="5"
                                className="text-center p-5"
                            >
                                No medicines found
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>
    );
}

export default MedicineList;