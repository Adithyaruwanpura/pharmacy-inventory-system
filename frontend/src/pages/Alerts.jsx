import InventoryAlerts from '../components/InventoryAlerts';

function Alerts() {

    return (

        <div>

            <h1 className="text-3xl font-bold mb-8">
                Inventory Alerts
            </h1>

            <div className="bg-white p-6 rounded shadow">

                <InventoryAlerts />

            </div>

        </div>
    );
}

export default Alerts;