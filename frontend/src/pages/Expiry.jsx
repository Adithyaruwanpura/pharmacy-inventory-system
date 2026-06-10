import ExpiryManagement from '../components/ExpiryManagement';

function Expiry() {
    return (
        <div className="w-full max-w-7xl mx-auto p-4 lg:p-8 bg-gray-50 min-h-[calc(100vh-80px)] text-gray-800 antialiased space-y-6">
            {/* TITLE HEADER */}
            <div className="border-b border-gray-200 pb-5">
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                    Expiry Management
                </h1>

            </div>

            {/* CORE MANAGEMENT LAYER */}
            <ExpiryManagement />
        </div>
    );
}

export default Expiry;