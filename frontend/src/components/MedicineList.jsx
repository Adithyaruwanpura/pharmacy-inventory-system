import axios from 'axios';

function MedicineList({
    medicines,
    fetchMedicines,
    setSelectedMedicine
}) {

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

                        <th className="p-3 border">
                            Actions
                        </th>

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