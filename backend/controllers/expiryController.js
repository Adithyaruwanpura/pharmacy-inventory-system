const prisma = require('../prismaClient');

// NEAR EXPIRY MEDICINES (next 30 days)
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
            },
            orderBy: {
                expiryDate: 'asc'
            }
        });

        res.json({
            success: true,
            data: medicines
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Error fetching near expiry medicines'
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
            },
            orderBy: {
                expiryDate: 'asc'
            }
        });

        res.json({
            success: true,
            data: medicines
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Error fetching expired medicines'
        });

    }
};