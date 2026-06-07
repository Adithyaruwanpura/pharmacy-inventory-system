import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import InvoiceGenerator from '../components/InvoiceGenerator';

function SalesSection() {

    const [medicines, setMedicines] = useState([]);
    const [sales, setSales] = useState([]);

    const [selectedMedicine, setSelectedMedicine] =
        useState(null);

    const [cashReceived, setCashReceived] =
        useState('');

    const [taxPercent, setTaxPercent] =
        useState(0);

    const [formData, setFormData] = useState({
        medicineId: '',
        quantity: ''
    });

    // FETCH MEDICINES
    const fetchMedicines = async () => {

        try {

            const token =
                localStorage.getItem('token');

            const response = await axios.get(
                'http://localhost:5000/api/medicines',
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
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

            const token =
                localStorage.getItem('token');

            const response = await axios.get(
                'http://localhost:5000/api/sales',
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
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

    // HANDLE INPUT CHANGE
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // AUTO CALCULATIONS
    const subtotal =
        selectedMedicine && formData.quantity
            ? selectedMedicine.sellingPrice *
            parseInt(formData.quantity)
            : 0;

    const taxAmount =
        (subtotal * taxPercent) / 100;

    const finalTotal =
        subtotal + taxAmount;

    const balance =
        cashReceived
            ? cashReceived - finalTotal
            : 0;

    // SUBMIT SALE
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token =
                localStorage.getItem('token');

            await axios.post(
                'http://localhost:5000/api/sales',
                {
                    medicineId:
                        formData.medicineId,

                    quantity:
                        formData.quantity,

                    totalPrice:
                        finalTotal
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            toast.success(
                'Sale recorded successfully'
            );

            // RESET FORM
            setFormData({
                medicineId: '',
                quantity: ''
            });

            setSelectedMedicine(null);

            setCashReceived('');

            setTaxPercent(0);

            fetchSales();
            fetchMedicines();

        } catch (error) {

            console.error(error);

            toast.error(
                'Error recording sale'
            );

        }
    };

    return (

        <div>

            {/* TITLE */}
            <div className="flex justify-between items-center mb-6">

                <div>

                    <h2 className="text-3xl font-bold">
                        Sales Management
                    </h2>

                    <p className="text-gray-500">
                        Pharmacy POS Billing System
                    </p>

                </div>

            </div>

            {/* SALES FORM */}
            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                {/* MEDICINE SELECT */}
                <select
                    name="medicineId"
                    value={formData.medicineId}
                    onChange={(e) => {

                        const medicine =
                            medicines.find(
                                med =>
                                    med.id ===
                                    parseInt(
                                        e.target.value
                                    )
                            );

                        setSelectedMedicine(
                            medicine
                        );

                        setFormData({
                            ...formData,
                            medicineId:
                                e.target.value
                        });
                    }}
                    className="border p-3 w-full rounded"
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
                    onChange={handleChange}
                    className="border p-3 w-full rounded"
                />

                {/* BILLING SECTION */}
                <div className="bg-gray-100 p-5 rounded-xl space-y-3">

                    <h3 className="text-xl font-bold">
                        Billing Summary
                    </h3>

                    <p>
                        Medicine Price:
                        <strong>
                            {' '}
                            Rs.
                            {
                                selectedMedicine
                                    ?.sellingPrice || 0
                            }
                        </strong>
                    </p>

                    <p>
                        Subtotal:
                        <strong>
                            {' '}
                            Rs. {subtotal}
                        </strong>
                    </p>

                    {/* GST */}
                    <div>

                        <label className="block mb-2 font-medium">
                            GST / Tax %
                        </label>

                        <input
                            type="number"
                            value={taxPercent}
                            onChange={(e) =>
                                setTaxPercent(
                                    e.target.value
                                )
                            }
                            className="border p-3 rounded w-full"
                        />

                    </div>

                    <p>
                        Tax Amount:
                        <strong>
                            {' '}
                            Rs. {taxAmount}
                        </strong>
                    </p>

                    <p className="text-2xl font-bold text-blue-700">
                        Final Total:
                        Rs. {finalTotal}
                    </p>

                </div>

                {/* CASH RECEIVED */}
                <div className="bg-green-50 p-5 rounded-xl space-y-3">

                    <h3 className="text-xl font-bold">
                        Payment
                    </h3>

                    <input
                        type="number"
                        placeholder="Cash Received"
                        value={cashReceived}
                        onChange={(e) =>
                            setCashReceived(
                                e.target.value
                            )
                        }
                        className="border p-3 rounded w-full"
                    />

                    <div className="bg-white p-4 rounded shadow">

                        <p className="text-2xl font-bold text-green-700">

                            Balance Return:
                            Rs.
                            {balance >= 0
                                ? balance
                                : 0}

                        </p>

                    </div>

                </div>

                {/* BUTTONS */}
                <div className="flex gap-4">

                    <button
                        type="submit"
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
                    >
                        Record Sale
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            window.print()
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                    >
                        Print Invoice
                    </button>

                </div>

            </form>

            {/* RECENT SALES */}
            <div className="mt-10">

                <h2 className="text-2xl font-bold mb-5">
                    Recent Sales
                </h2>

                <div className="overflow-x-auto">

                    <table className="w-full border">

                        <thead className="bg-gray-200">

                            <tr>

                                <th className="p-3 border">
                                    ID
                                </th>

                                <th className="p-3 border">
                                    Medicine
                                </th>

                                <th className="p-3 border">
                                    Quantity
                                </th>

                                <th className="p-3 border">
                                    Total
                                </th>

                                <th className="p-3 border">
                                    Date
                                </th>

                                <th className="p-3 border">
                                    Invoice
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {sales.length > 0 ? (

                                sales.map((sale) => (

                                    <tr key={sale.id}>

                                        <td className="border p-3">
                                            {sale.id}
                                        </td>

                                        <td className="border p-3">
                                            {
                                                sale.medicine
                                                    ?.name
                                            }
                                        </td>

                                        <td className="border p-3">
                                            {sale.quantity}
                                        </td>

                                        <td className="border p-3">
                                            Rs.
                                            {sale.totalPrice}
                                        </td>

                                        <td className="border p-3">

                                            {
                                                new Date(
                                                    sale.saleDate
                                                )
                                                    .toLocaleDateString()
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

        </div>
    );
}

export default SalesSection;