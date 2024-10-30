require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Importa cors
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
 