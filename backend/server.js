const express = require('express');
const app = express();
const prisma = require('./prismaClient');

app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.send('Pharmacy Inventory API Running...');
});

// TEST DATABASE CONNECTION
app.get('/test-db', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});