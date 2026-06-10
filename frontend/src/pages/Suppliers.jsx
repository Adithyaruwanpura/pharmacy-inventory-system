import SupplierSection from '../components/SupplierSection';

function Suppliers() {
    return (
        <div className="w-full max-w-[1600px] mx-auto p-4 lg:p-6 bg-gray-50 min-h-[calc(100vh-80px)] text-gray-800 antialiased">
            {/* CONTAINER FRAME CARD */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 lg:p-6">
                <SupplierSection />
            </div>
        </div>
    );
}

export default Suppliers;