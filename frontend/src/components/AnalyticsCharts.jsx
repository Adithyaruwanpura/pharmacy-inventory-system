import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';

function AnalyticsCharts({ medicines, sales }) {
    const stockData = medicines.map((medicine) => ({
        name: medicine.name,
        quantity: medicine.quantity
    }));

    const salesData = sales.map((sale) => ({
        name: sale.medicine?.name || 'Unknown',
        amount: sale.totalPrice
    }));

    // Realigned with your exact theme blue accent color
    const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#a855f7'];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* MEDICINE STOCK LEVELS BAR CHART */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                    Medicine Stock Levels
                </h2>
                <div className="w-full h-75">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={stockData} margin={{ left: -20, right: 10 }}>
                            <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} />
                            <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} />
                            <Tooltip cursor={{ fill: '#f3f4f6' }} />
                            <Bar dataKey="quantity" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* SALES DISTRIBUTION PIE CHART */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                    Sales Distribution
                </h2>
                <div className="w-full h-75">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={salesData}
                                dataKey="amount"
                                nameKey="name"
                                outerRadius={90}
                                innerRadius={55}
                                paddingAngle={2}
                            >
                                {salesData.map((entry, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
}

export default AnalyticsCharts;