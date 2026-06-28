import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function PurchaseInvoiceGenerator({ purchase }) {

    const generatePDF = () => {

        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("PURCHASE INVOICE", 60, 20);

        doc.setFontSize(12);

        doc.text(`Invoice : ${purchase.invoiceNo}`, 20, 40);
        doc.text(`GRN : ${purchase.grnNo}`, 20, 50);
        doc.text(`Supplier : ${purchase.supplier.name}`, 20, 60);
        doc.text(`Medicine : ${purchase.medicine.name}`, 20, 70);
        doc.text(`Quantity : ${purchase.quantity}`, 20, 80);
        doc.text(`Total : Rs.${purchase.totalPrice}`, 20, 90);

        autoTable(doc, {
            startY: 105,
            head: [["Medicine", "Qty", "Price"]],
            body: [
                [
                    purchase.medicine.name,
                    purchase.quantity,
                    purchase.totalPrice
                ]
            ]
        });

        doc.save(`${purchase.invoiceNo}.pdf`);
    };

    return (

        <button
            onClick={generatePDF}
            className="bg-green-600 text-white px-3 py-2 rounded"
        >
            Invoice
        </button>

    );
}

export default PurchaseInvoiceGenerator;