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