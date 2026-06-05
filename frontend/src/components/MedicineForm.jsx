import { useEffect, useState } from 'react';
import axios from 'axios';

function MedicineForm({
    fetchMedicines,
    selectedMedicine,
    setSelectedMedicine
}) {

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        batchNumber: '',
        expiryDate: '',
        purchasePrice: '',
        sellingPrice: '',
        quantity: ''
    });

    // LOAD SELECTED MEDICINE
    useEffect(() => {

        if (selectedMedicine) {

            setFormData({
                name: selectedMedicine.name || '',
                category: selectedMedicine.category || '',
                batchNumber: selectedMedicine.batchNumber || '',
                expiryDate: selectedMedicine.expiryDate?.split('T')[0] || '',
                purchasePrice: selectedMedicine.purchasePrice || '',
                sellingPrice: selectedMedicine.sellingPrice || '',
                quantity: selectedMedicine.quantity || ''
            });

        }

    }, [selectedMedicine]);

    // INPUT CHANGE
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

            const token = localStorage.getItem('token');

            // UPDATE
            if (selectedMedicine) {

                await axios.put(
                    `http://localhost:5000/api/medicines/${selectedMedicine.id}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                alert('Medicine updated successfully');

            }

            // CREATE
            else {

                await axios.post(
                    'http://localhost:5000/api/medicines',
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                alert('Medicine added successfully');

            }

            // RESET
            setFormData({
                name: '',
                category: '',
                batchNumber: '',
                expiryDate: '',
                purchasePrice: '',
                sellingPrice: '',
                quantity: ''
            });

            setSelectedMedicine(null);

            fetchMedicines();

        } catch (error) {

            console.error(error);

            alert('Error saving medicine');

        }
    };

    return (

        <div>

            <h2 className="text-2xl font-bold mb-4">

                {selectedMedicine
                    ? 'Update Medicine'
                    : 'Add Medicine'}

            </h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                <input
                    type="text"
                    name="name"
                    placeholder="Medicine Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border p-3 w-full rounded"
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    className="border p-3 w-full rounded"
                />

                <input
                    type="text"
                    name="batchNumber"
                    placeholder="Batch Number"
                    value={formData.batchNumber}
                    onChange={handleChange}
                    className="border p-3 w-full rounded"
                />

                <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className="border p-3 w-full rounded"
                />

                <input
                    type="number"
                    name="purchasePrice"
                    placeholder="Purchase Price"
                    value={formData.purchasePrice}
                    onChange={handleChange}
                    className="border p-3 w-full rounded"
                />

                <input
                    type="number"
                    name="sellingPrice"
                    placeholder="Selling Price"
                    value={formData.sellingPrice}
                    onChange={handleChange}
                    className="border p-3 w-full rounded"
                />

                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="border p-3 w-full rounded"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >

                    {selectedMedicine
                        ? 'Update Medicine'
                        : 'Add Medicine'}

                </button>
                {selectedMedicine && (

                    <button
                        type="button"
                        onClick={() => {

                            setSelectedMedicine(null);

                            setFormData({
                                name: '',
                                category: '',
                                batchNumber: '',
                                expiryDate: '',
                                purchasePrice: '',
                                sellingPrice: '',
                                quantity: ''
                            });

                        }}
                        className="bg-gray-500 text-white px-4 py-2 rounded ml-3"
                    >
                        Cancel
                    </button>

                )}

            </form>

        </div>
    );
}

export default MedicineForm;