import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function SalesSection() {

    const [medicines, setMedicines] = useState([]);
    const [sales, setSales] = useState([]);

    // SEARCH STATE
    const [searchTerm, setSearchTerm] = useState('');

    const [formData, setFormData] = useState({
        medicineId: '',
        quantity: '',
        totalPrice: ''
    });

    // FETCH MEDICINES
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

    // FETCH SALES
    const fetchSales = async () => {

        try {

            const response = await axios.get(
                'http://localhost:5000/api/sales'
            );

            setSales(response.data.data);

        } catch (error) {

            console.error(error);

        }
    };

    useEffect(() => {

        fetchMedicines();
        fetchSales();

    }, []);

    // HANDLE INPUT
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // ADD SALE
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                'http://localhost:5000/api/sales',
                formData
            );

            toast.success('Sale recorded successfully');

            // RESET FORM
            setFormData({
                medicineId: '',
                quantity: '',
                totalPrice: ''
            });

            fetchSales();

        } catch (error) {

            console.error(error);
            toast.error('Error recording sale');


        }
    };

    // FILTER SALES
    const filteredSales = sales.filter(
        (sale) =>
            sale.medicine?.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

    return (

        <div>

            <h2 className="text-2xl font-bold mb-4">
                Sales Management
            </h2>

            {/* SEARCH */}
            <input
                type="text"
                placeholder="Search sales..."
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

                <select
                    name="medicineId"
                    value={formData.medicineId}
                    className="border p-3 w-full rounded"
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
                    value={formData.quantity}
                    placeholder="Quantity"
                    className="border p-3 w-full rounded"
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="totalPrice"
                    value={formData.totalPrice}
                    placeholder="Total Price"
                    className="border p-3 w-full rounded"
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                    Record Sale
                </button>

            </form>

            {/* SALES TABLE */}
            <table className="w-full border">

                <thead className="bg-gray-200">

                    <tr>

                        <th className="border p-3">
                            ID
                        </th>

                        <th className="border p-3">
                            Medicine
                        </th>

                        <th className="border p-3">
                            Quantity
                        </th>

                        <th className="border p-3">
                            Total Price
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {filteredSales.length > 0 ? (

                        filteredSales.map((sale) => (

                            <tr key={sale.id}>

                                <td className="border p-3">
                                    {sale.id}
                                </td>

                                <td className="border p-3">
                                    {sale.medicine?.name}
                                </td>

                                <td className="border p-3">
                                    {sale.quantity}
                                </td>

                                <td className="border p-3">
                                    Rs. {sale.totalPrice}
                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan="4"
                                className="text-center p-5"
                            >
                                No sales found
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>
    );
}

export default SalesSection;