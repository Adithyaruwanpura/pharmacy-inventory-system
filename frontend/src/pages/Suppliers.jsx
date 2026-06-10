import SupplierSection from '../components/SupplierSection';

function Suppliers() {
    return (
        <div className="w-full max-w-400 mx-auto p-4 lg:p-6 bg-gray-50 min-h-[calc(100vh-80px)] text-gray-800 antialiased flex flex-col">
            {/* CONTAINER FRAME CARD */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col flex-1">
                <SupplierSection />
            </div>
        </div>
    );
}

export default Suppliers;