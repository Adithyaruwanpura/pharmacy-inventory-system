const prisma = require('../prismaClient');

// PAY SUPPLIER
exports.paySupplier = async (req, res) => {

    try {

        const { supplierId, amount } = req.body;

        const supplier = await prisma.supplier.findUnique({
            where: {
                id: parseInt(supplierId)
            }
        });

        if (!supplier) {

            return res.status(404).json({
                success: false,
                message: 'Supplier not found'
            });

        }

        // UPDATE DUE
        const updatedSupplier = await prisma.supplier.update({
            where: {
                id: parseInt(supplierId)
            },
            data: {
                balanceDue: {
                    decrement: parseFloat(amount)
                }
            }
        });

        res.json({
            success: true,
            data: updatedSupplier
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Error processing payment'
        });

    }
};