import { Outlet, Link } from 'react-router-dom';

function MainLayout() {

    return (

        <div className="flex min-h-screen bg-gray-100">

            {/* SIDEBAR */}
            <div className="w-64 bg-blue-900 text-white p-6">

                <h2 className="text-2xl font-bold mb-10">
                    Pharmacy System
                </h2>

                <ul className="space-y-4">

                    <li>
                        <Link
                            to="/dashboard"
                            className="block hover:bg-blue-700 p-2 rounded"
                        >
                            Dashboard
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/medicines"
                            className="block hover:bg-blue-700 p-2 rounded"
                        >
                            Medicines
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/suppliers"
                            className="block hover:bg-blue-700 p-2 rounded"
                        >
                            Suppliers
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/purchases"
                            className="block hover:bg-blue-700 p-2 rounded"
                        >
                            Purchases
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/sales"
                            className="block hover:bg-blue-700 p-2 rounded"
                        >
                            Sales
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/alerts"
                            className="block hover:bg-blue-700 p-2 rounded"
                        >
                            Alerts
                        </Link>
                    </li>

                </ul>

                {/* LOGOUT */}
                <button
                    onClick={() => {
                        localStorage.removeItem('token');
                        window.location.href = '/';
                    }}
                    className="mt-10 bg-red-500 px-4 py-2 rounded w-full"
                >
                    Logout
                </button>

            </div>

            {/* PAGE CONTENT */}
            <div className="flex-1 p-8 overflow-y-auto">

                <Outlet />

            </div>

        </div>
    );
}

export default MainLayout;