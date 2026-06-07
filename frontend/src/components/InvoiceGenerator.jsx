import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function InvoiceGenerator({ sale }) {

    const generatePDF = () => {

        const doc = new jsPDF();

        // TITLE
        doc.setFontSize(20);

        doc.text(
            'Pharmacy Invoice',
            70,
            20
        );

        // SALE INFO
        doc.setFontSize(12);

        doc.text(
            `Invoice ID: ${sale.id}`,
            20,
            40
        );

        doc.text(
            `Medicine: ${sale.medicine?.name}`,
            20,
            50
        );

        doc.text(
            `Quantity: ${sale.quantity}`,
            20,
            60
        );

        doc.text(
            `Total Price: Rs. ${sale.totalPrice}`,
            20,
            70
        );
        doc.text(
            `Date: ${new Date(sale.saleDate)
                .toLocaleDateString()
            }`,
            20,
            80
        );

        // TABLE
        autoTable(doc, {
            startY: 100,
            head: [['Field', 'Value']],
            body: [
                ['Medicine', sale.medicine?.name],
                ['Quantity', sale.quantity],
                ['Total Price', `Rs. ${sale.totalPrice}`],
            ],
        });

        // FOOTER
        doc.text(
            'Thank you for using our pharmacy system.',
            20,
            150
        );

        // SAVE PDF
        doc.save(`invoice-${sale.id}.pdf`);
    };

    return (

        <button
            onClick={generatePDF}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
            Download Invoice
        </button>
    );
}

export default InvoiceGenerator;