const prisma = require('../prismaClient');

// ADD SALE
exports.addSale = async (req, res) => {
    try {
        const {
            medicineId,
            quantity,
            totalPrice
        } = req.body;

        // FIND MEDICINE
        const medicine = await prisma.medicine.findUnique({
            where: {
                id: parseInt(medicineId)
            }
        });

        // CHECK STOCK
        if (!medicine) {
            return res.status(404).json({
                success: false,
                message: 'Medicine not found'
            });
        }

        if (medicine.quantity < quantity) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient stock'
            });
        }

        // CREATE SALE
        const sale = await prisma.sale.create({
            data: {
                medicineId: parseInt(medicineId),
                quantity: parseInt(quantity),
                totalPrice: parseFloat(totalPrice)
            }
        });

        // REDUCE STOCK
        await prisma.medicine.update({
            where: {
                id: parseInt(medicineId)
            },
            data: {
                quantity: {
                    decrement: parseInt(quantity)
                }
            }
        });

        res.status(201).json({
            success: true,
            data: sale
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Error processing sale'
        });
    }
};

// GET SALES
exports.getSales = async (req, res) => {
    try {
        const sales = await prisma.sale.findMany({
            include: {
                medicine: true
            }
        });

        res.json({
            success: true,
            data: sales
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching sales'
        });
    }
};