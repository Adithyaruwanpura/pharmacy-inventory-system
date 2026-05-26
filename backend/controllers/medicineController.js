const prisma = require('../prismaClient');

// ADD MEDICINE
exports.addMedicine = async (req, res) => {
    try {
        const {
            name,
            category,
            batchNumber,
            expiryDate,
            purchasePrice,
            sellingPrice,
            quantity
        } = req.body;

        const medicine = await prisma.medicine.create({
            data: {
                name,
                category,
                batchNumber,
                expiryDate: new Date(expiryDate),
                purchasePrice: parseFloat(purchasePrice),
                sellingPrice: parseFloat(sellingPrice),
                quantity: parseInt(quantity)
            }
        });

        res.status(201).json({
            success: true,
            data: medicine
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error adding medicine"
        });
    }
};

// GET ALL MEDICINES
exports.getMedicines = async (req, res) => {
    try {
        const medicines = await prisma.medicine.findMany();

        res.json({
            success: true,
            data: medicines
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching medicines"
        });
    }
};