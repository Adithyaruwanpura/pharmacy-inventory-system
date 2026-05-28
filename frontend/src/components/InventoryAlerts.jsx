import { useEffect, useState } from 'react';
import axios from 'axios';

function InventoryAlerts() {

    const [lowStock, setLowStock] = useState([]);

    const fetchAlerts = async () => {

        try {

            const token = localStorage.getItem('token');

            const response = await axios.get(
                'http://localhost:5000/api/inventory/low-stock',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setLowStock(response.data.data);

        } catch (error) {

            console.error(error);

        }
    };

    useEffect(() => {
        fetchAlerts();
    }, []);

    return (

        <div>

            <h2 className="text-2xl font-bold mb-4">
                Low Stock Alerts
            </h2>

            {lowStock.length === 0 ? (

                <p>No low stock medicines</p>

            ) : (

                <ul className="space-y-2">

                    {lowStock.map((medicine) => (

                        <li
                            key={medicine.id}
                            className="bg-red-100 p-3 rounded"
                        >
                            {medicine.name} - Qty: {medicine.quantity}
                        </li>

                    ))}

                </ul>

            )}

        </div>
    );
}

export default InventoryAlerts;