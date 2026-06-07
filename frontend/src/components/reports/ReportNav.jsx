function ReportNav({ activeTab, setActiveTab }) {

    const tabs = [
        { id: 'daily', label: 'Daily Profit' },
        { id: 'monthly', label: 'Monthly Profit' },
        { id: 'sales', label: 'Sales Summary' },
        { id: 'purchase', label: 'Purchase Cost' },
        { id: 'expenses', label: 'Expenses' },
    ];

    return (

        <div className="flex gap-3 overflow-x-auto border-b pb-3">

            {tabs.map(tab => (

                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition
                        ${activeTab === tab.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                >
                    {tab.label}
                </button>

            ))}

        </div>
    );
}

export default ReportNav;