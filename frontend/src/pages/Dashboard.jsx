import MedicineList from '../components/MedicineList';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {

    return (
        <div style={{ display: 'flex' }}>

            {/* SIDEBAR */}
            <div
                style={{
                    width: '220px',
                    background: '#f0f0f0',
                    height: '100vh',
                    padding: '20px'
                }}
            >
                <h2>Pharmacy System</h2>

                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li>Dashboard</li>
                    <li>Medicines</li>
                    <li>Suppliers</li>
                    <li>Sales</li>
                    <li>Purchases</li>
                </ul>
            </div>

            {/* MAIN CONTENT */}
            <div style={{ flex: 1, padding: '20px' }}>
                <h1>Dashboard</h1>
                <MedicineList />


            </div>

        </div>
    );
}

export default Dashboard;