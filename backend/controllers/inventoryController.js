const prisma = require('../prismaClient');

// LOW STOCK ALERT
exports.getLowStockMedicines = async (req, res) => {
    try {

        const medicines = await prisma.medicine.findMany({
            where: {
                quantity: {
                    lte: 10
                }
            }
        });

        res.json({
            success: true,
            data: medicines
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Error fetching low stock medicines'
        });

    }
};

// EXPIRED MEDICINES
exports.getExpiredMedicines = async (req, res) => {
    try {

        const today = new Date();

        const medicines = await prisma.medicine.findMany({
            where: {
                expiryDate: {
                    lt: today
                }
            }
        });

        res.json({
            success: true,
            data: medicines
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Error fetching expired medicines'
        });

    }
};

// NEAR EXPIRY MEDICINES
exports.getNearExpiryMedicines = async (req, res) => {
    try {

        const today = new Date();

        const next30Days = new Date();

        next30Days.setDate(today.getDate() + 30);

        const medicines = await prisma.medicine.findMany({
            where: {
                expiryDate: {
                    gte: today,
                    lte: next30Days
                }
            }
        });

        res.json({
            success: true,
            data: medicines
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Error fetching near expiry medicines'
        });

    }
};