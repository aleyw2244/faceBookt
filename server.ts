import express from 'express';
import connectDB from './configuration/db_connections.js';
import routes from './routes/api/index.js'; 

await connectDB();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});