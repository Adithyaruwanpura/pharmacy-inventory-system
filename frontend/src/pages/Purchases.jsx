import PurchaseSection from '../components/PurchaseSection';

function Purchases() {
    return (
        <div className="w-full max-w-400 mx-auto p-4 lg:p-6 bg-gray-50 min-h-[calc(100vh-80px)] text-gray-800 antialiased">
            {/* TITLE HEADER */}
            <div className="mb-6 pb-4 border-b border-gray-200">
                <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                    Purchase Records
                </h2>

            </div>

            {/* FORM WRAPPER CARD */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <PurchaseSection />
            </div>
        </div>
    );
}

export default Purchases;