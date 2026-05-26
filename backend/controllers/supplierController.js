const prisma = require('../prismaClient');

// ADD SUPPLIER
exports.addSupplier = async (req, res) => {
    try {
        const { name, contact, address } = req.body;

        if (!name || !contact || !address) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const supplier = await prisma.supplier.create({
            data: {
                name,
                contact,
                address
            }
        });

        res.status(201).json({
            success: true,
            data: supplier
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Error adding supplier'
        });
    }
};

// GET SUPPLIERS
exports.getSuppliers = async (req, res) => {
    try {
        const suppliers = await prisma.supplier.findMany();

        res.json({
            success: true,
            data: suppliers
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching suppliers'
        });
    }
};

// UPDATE SUPPLIER
exports.updateSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, contact, address } = req.body;

        const updatedSupplier = await prisma.supplier.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name,
                contact,
                address
            }
        });

        res.json({
            success: true,
            data: updatedSupplier
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating supplier'
        });
    }
};

// DELETE SUPPLIER
exports.deleteSupplier = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.supplier.delete({
            where: {
                id: parseInt(id)
            }
        });

        res.json({
            success: true,
            message: 'Supplier deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting supplier'
        });
    }
};