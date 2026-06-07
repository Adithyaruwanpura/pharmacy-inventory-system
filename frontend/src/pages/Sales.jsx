import { useEffect, useState } from 'react';
import axios from 'axios';

import InvoiceGenerator from '../components/InvoiceGenerator';

function SalesSection() {

    const [medicines, setMedicines] = useState([]);
    const [sales, setSales] = useState([]);

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

            const token = localStorage.getItem('token');

            const response = await axios.get(
                'http://localhost:5000/api/sales',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
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

    // INPUT CHANGE
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

            const token = localStorage.getItem('token');

            await axios.post(
                'http://localhost:5000/api/sales',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert('Sale recorded successfully');

            // RESET FORM
            setFormData({
                medicineId: '',
                quantity: '',
                totalPrice: ''
            });

            // REFRESH SALES
            fetchSales();
            fetchMedicines();

        } catch (error) {

            console.error(error);

            alert('Error recording sale');

        }
    };

    // FILTER SALES
    const filteredSales = sales.filter(
        (sale) =>

            sale.medicine?.name
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

    return (

        <div>

            {/* TITLE */}
            <h2 className="text-2xl font-bold mb-6">
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

            {/* SALES FORM */}
            <form
                onSubmit={handleSubmit}
                className="space-y-4 mb-8"
            >

                {/* MEDICINE */}
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

                {/* QUANTITY */}
                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={formData.quantity}
                    className="border p-3 w-full rounded"
                    onChange={handleChange}
                />

                {/* PRICE */}
                <input
                    type="number"
                    name="totalPrice"
                    placeholder="Total Price"
                    value={formData.totalPrice}
                    className="border p-3 w-full rounded"
                    onChange={handleChange}
                />

                {/* BUTTON */}
                <button
                    type="submit"
                    className="bg-red-600 text-white px-5 py-3 rounded hover:bg-red-700"
                >
                    Record Sale
                </button>

            </form>

            {/* SALES TABLE */}
            <div className="overflow-x-auto">

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

                            <th className="border p-3">
                                Date
                            </th>

                            <th className="border p-3">
                                Invoice
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

                                    <td className="border p-3">

                                        {
                                            new Date(
                                                sale.saleDate
                                            ).toLocaleDateString()
                                        }

                                    </td>

                                    <td className="border p-3">

                                        <InvoiceGenerator
                                            sale={sale}
                                        />

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="text-center p-5"
                                >
                                    No sales found
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default SalesSection;