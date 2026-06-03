import SupplierSection from '../components/SupplierSection';

function Suppliers() {

    return (

        <div>

            <h1 className="text-3xl font-bold mb-8">
                Suppliers
            </h1>

            <div className="bg-white p-6 rounded shadow">

                <SupplierSection />

            </div>

        </div>
    );
}

export default Suppliers;