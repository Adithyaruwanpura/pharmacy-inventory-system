const express = require('express');
const app = express();

app.use(express.json());

const medicineRoutes = require('./routes/medicineRoutes');
const supplierRoutes = require('./routes/supplierRoutes');

app.use('/api/medicines', medicineRoutes);
app.use('/api/suppliers', supplierRoutes);

app.get('/', (req, res) => {
    res.send('Pharmacy Inventory API Running...');
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});