import PurchaseSection from '../components/PurchaseSection';

function Purchases() {

    return (

        <div>

            <h1 className="text-3xl font-bold mb-8">
                Purchases
            </h1>

            <div className="bg-white p-6 rounded shadow">

                <PurchaseSection />

            </div>

        </div>
    );
}

export default Purchases;