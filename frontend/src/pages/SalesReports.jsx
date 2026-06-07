import { useState, useEffect } from 'react';
import axios from 'axios';

import ReportNav from '../components/reports/ReportNav';
import DailyProfit from '../components/reports/DailyProfit';
import MonthlyProfit from '../components/reports/MonthlyProfit';
import ExpenseReport from '../components/reports/ExpenseReport';
import PurchaseCostReport from '../components/reports/PurchaseCostReport';
import SalesSummaryReport from '../components/reports/SalesSummaryReport';

function SalesReports() {

    const [activeTab, setActiveTab] = useState('daily');

    const [sales, setSales] = useState([]);
    const [purchases, setPurchases] = useState([]);

    const token = localStorage.getItem('token');

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const fetchData = async () => {

        try {

            const salesRes = await axios.get(
                'http://localhost:5000/api/sales',
                config
            );

            const purchaseRes = await axios.get(
                'http://localhost:5000/api/purchases',
                config
            );

            setSales(salesRes.data.data);
            setPurchases(purchaseRes.data.data);

        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (

        <div className="p-6">

            {/* TOP SUB NAV */}
            <ReportNav
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {/* REPORT CONTENT */}
            <div className="mt-6">

                {activeTab === 'daily' && (
                    <DailyProfit sales={sales} purchases={purchases} />
                )}

                {activeTab === 'monthly' && (
                    <MonthlyProfit sales={sales} purchases={purchases} />
                )}

                {activeTab === 'expenses' && (
                    <ExpenseReport purchases={purchases} />
                )}

                {activeTab === 'purchase' && (
                    <PurchaseCostReport purchases={purchases} />
                )}

                {activeTab === 'sales' && (
                    <SalesSummaryReport sales={sales} />
                )}

            </div>

        </div>
    );
}

export default SalesReports;