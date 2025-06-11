const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Sample mock data
let dashboardData = {
  inflow: 1275,
  materials: [
    { _id: 'Plastic', total: 500 },
    { _id: 'Metal', total: 200 },
    { _id: 'Glass', total: 275 },
    { _id: 'Organic', total: 300 }
  ]
};

app.get('/api/dashboard', (req, res) => {
  res.json(dashboardData);
});

app.post('/api/dispatch', (req, res) => {
  dashboardData.inflow = 0;
  dashboardData.materials = [];
  res.json({ message: 'Dispatch successful. Trash cleared.' });
});

app.listen(PORT, () => console.log(`✅ Backend running at http://localhost:${PORT}`));
