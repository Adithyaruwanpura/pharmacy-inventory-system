import { useState } from 'react';
import axios from 'axios';

function MedicineForm({ fetchMedicines }) {

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        batchNumber: '',
        expiryDate: '',
        purchasePrice: '',
        sellingPrice: '',
        quantity: ''
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem('token');

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

            fetchMedicines();

        } catch (error) {

            console.error(error);

            alert('Error adding medicine');

        }
    };

    return (

        <div>

            <h2>Add Medicine</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Medicine Name"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="batchNumber"
                    placeholder="Batch Number"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="date"
                    name="expiryDate"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="number"
                    name="purchasePrice"
                    placeholder="Purchase Price"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="number"
                    name="sellingPrice"
                    placeholder="Selling Price"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">
                    Add Medicine
                </button>

            </form>

        </div>
    );
}

export default MedicineForm;