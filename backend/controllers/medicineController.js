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

        // BASIC VALIDATION
        if (
            !name ||
            !category ||
            !batchNumber ||
            !expiryDate
        ) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided"
            });
        }

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

// UPDATE MEDICINE
exports.updateMedicine = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            name,
            category,
            batchNumber,
            expiryDate,
            purchasePrice,
            sellingPrice,
            quantity
        } = req.body;

        const updatedMedicine = await prisma.medicine.update({
            where: {
                id: parseInt(id)
            },
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

        res.json({
            success: true,
            data: updatedMedicine
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Error updating medicine"
        });
    }
};

// DELETE MEDICINE
exports.deleteMedicine = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.medicine.delete({
            where: {
                id: parseInt(id)
            }
        });

        res.json({
            success: true,
            message: "Medicine deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Error deleting medicine"
        });
    }
};