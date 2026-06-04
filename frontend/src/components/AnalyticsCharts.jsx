import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts';

function AnalyticsCharts({
    medicines,
    sales
}) {

    // STOCK CHART DATA
    const stockData = medicines.map((medicine) => ({
        name: medicine.name,
        quantity: medicine.quantity
    }));

    // SALES CHART DATA
    const salesData = sales.map((sale) => ({
        name: sale.medicine?.name || 'Unknown',
        amount: sale.totalPrice
    }));

    // PIE COLORS
    const COLORS = [
        '#0088FE',
        '#00C49F',
        '#FFBB28',
        '#FF8042',
        '#A020F0'
    ];

    return (

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* STOCK BAR CHART */}
            <div className="bg-white p-6 rounded shadow">

                <h2 className="text-xl font-bold mb-4">
                    Medicine Stock Levels
                </h2>

                <ResponsiveContainer
                    width="100%"
                    height={300}
                >

                    <BarChart data={stockData}>

                        <XAxis dataKey="name" />

                        <YAxis />

                        <Tooltip />

                        <Bar
                            dataKey="quantity"
                            fill="#2563eb"
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

            {/* SALES PIE CHART */}
            <div className="bg-white p-6 rounded shadow">

                <h2 className="text-xl font-bold mb-4">
                    Sales Distribution
                </h2>

                <ResponsiveContainer
                    width="100%"
                    height={300}
                >

                    <PieChart>

                        <Pie
                            data={salesData}
                            dataKey="amount"
                            nameKey="name"
                            outerRadius={100}
                            label
                        >

                            {salesData.map((entry, index) => (

                                <Cell
                                    key={index}
                                    fill={
                                        COLORS[
                                        index % COLORS.length
                                        ]
                                    }
                                />

                            ))}

                        </Pie>

                        <Tooltip />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}

export default AnalyticsCharts;