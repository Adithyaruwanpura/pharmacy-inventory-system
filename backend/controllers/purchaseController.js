const prisma = require('../prismaClient');

// ADD PURCHASE
exports.addPurchase = async (req, res) => {
    try {
        const {
            medicineId,
            supplierId,
            quantity,
            totalPrice
        } = req.body;

        // CREATE PURCHASE RECORD
        const purchase = await prisma.purchase.create({
            data: {
                medicineId: parseInt(medicineId),
                supplierId: parseInt(supplierId),
                quantity: parseInt(quantity),
                totalPrice: parseFloat(totalPrice)
            }
        });

        // UPDATE MEDICINE STOCK
        await prisma.medicine.update({
            where: {
                id: parseInt(medicineId)
            },
            data: {
                quantity: {
                    increment: parseInt(quantity)
                }
            }
        });

        res.status(201).json({
            success: true,
            data: purchase
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Error creating purchase'
        });
    }
};

// GET PURCHASES
exports.getPurchases = async (req, res) => {
    try {
        const purchases = await prisma.purchase.findMany({
            include: {
                medicine: true,
                supplier: true
            }
        });

        res.json({
            success: true,
            data: purchases
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching purchases'
        });
    }
};

// DELETE PURCHASE
exports.deletePurchase = async (req, res) => {

    try {

        const { id } = req.params;

        // FIND PURCHASE
        const purchase = await prisma.purchase.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!purchase) {

            return res.status(404).json({
                success: false,
                message: 'Purchase not found'
            });

        }

        // REDUCE STOCK AGAIN
        await prisma.medicine.update({
            where: {
                id: purchase.medicineId
            },
            data: {
                quantity: {
                    decrement: purchase.quantity
                }
            }
        });

        // DELETE PURCHASE
        await prisma.purchase.delete({
            where: {
                id: parseInt(id)
            }
        });

        res.json({
            success: true,
            message: 'Purchase deleted successfully'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Error deleting purchase'
        });

    }
};