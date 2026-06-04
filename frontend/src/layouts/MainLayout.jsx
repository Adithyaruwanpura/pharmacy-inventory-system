import {
    Outlet,
    NavLink,
    useLocation
} from 'react-router-dom';

function MainLayout() {

    const location = useLocation();

    // GET CURRENT PAGE NAME
    const pageName =
        location.pathname.replace('/', '') || 'dashboard';

    return (

        <div className="flex min-h-screen bg-gray-100">

            {/* SIDEBAR */}
            <div className="w-64 bg-blue-900 text-white p-6 flex flex-col">

                {/* LOGO */}
                <div>

                    <h2 className="text-2xl font-bold mb-10">
                        Pharmacy System
                    </h2>

                    <ul className="space-y-3">

                        {/* DASHBOARD */}
                        <li>

                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) =>
                                    `block p-3 rounded transition ${isActive
                                        ? 'bg-white text-blue-900 font-bold'
                                        : 'hover:bg-blue-700'
                                    }`
                                }
                            >
                                Dashboard
                            </NavLink>

                        </li>

                        {/* MEDICINES */}
                        <li>

                            <NavLink
                                to="/medicines"
                                className={({ isActive }) =>
                                    `block p-3 rounded transition ${isActive
                                        ? 'bg-white text-blue-900 font-bold'
                                        : 'hover:bg-blue-700'
                                    }`
                                }
                            >
                                Medicines
                            </NavLink>

                        </li>

                        {/* SUPPLIERS */}
                        <li>

                            <NavLink
                                to="/suppliers"
                                className={({ isActive }) =>
                                    `block p-3 rounded transition ${isActive
                                        ? 'bg-white text-blue-900 font-bold'
                                        : 'hover:bg-blue-700'
                                    }`
                                }
                            >
                                Suppliers
                            </NavLink>

                        </li>

                        {/* PURCHASES */}
                        <li>

                            <NavLink
                                to="/purchases"
                                className={({ isActive }) =>
                                    `block p-3 rounded transition ${isActive
                                        ? 'bg-white text-blue-900 font-bold'
                                        : 'hover:bg-blue-700'
                                    }`
                                }
                            >
                                Purchases
                            </NavLink>

                        </li>

                        {/* SALES */}
                        <li>

                            <NavLink
                                to="/sales"
                                className={({ isActive }) =>
                                    `block p-3 rounded transition ${isActive
                                        ? 'bg-white text-blue-900 font-bold'
                                        : 'hover:bg-blue-700'
                                    }`
                                }
                            >
                                Sales
                            </NavLink>

                        </li>

                        {/* ALERTS */}
                        <li>

                            <NavLink
                                to="/alerts"
                                className={({ isActive }) =>
                                    `block p-3 rounded transition ${isActive
                                        ? 'bg-white text-blue-900 font-bold'
                                        : 'hover:bg-blue-700'
                                    }`
                                }
                            >
                                Alerts
                            </NavLink>

                        </li>

                    </ul>

                </div>

                {/* LOGOUT BUTTON */}
                <div className="mt-auto">

                    <button
                        onClick={() => {
                            localStorage.removeItem('token');
                            window.location.href = '/';
                        }}
                        className="bg-red-500 hover:bg-red-600 transition px-4 py-3 rounded w-full"
                    >
                        Logout
                    </button>

                </div>

            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col">

                {/* TOP NAVBAR */}
                <div className="bg-white shadow px-8 py-4 flex justify-between items-center">

                    {/* PAGE TITLE */}
                    <div>

                        <h1 className="text-2xl font-bold capitalize">
                            {pageName}
                        </h1>

                        <p className="text-gray-500 text-sm">
                            Pharmacy Inventory Management System
                        </p>

                    </div>

                    {/* USER INFO */}
                    <div className="flex items-center gap-4">

                        <div className="text-right">

                            <p className="font-semibold">
                                Admin User
                            </p>

                            <p className="text-sm text-gray-500">
                                Administrator
                            </p>

                        </div>

                        {/* PROFILE ICON */}
                        <div className="w-10 h-10 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold">

                            A

                        </div>

                    </div>

                </div>

                {/* PAGE CONTENT */}
                <div className="p-8 overflow-y-auto flex-1">

                    <Outlet />

                </div>

            </div>

        </div>
    );
}

export default MainLayout;