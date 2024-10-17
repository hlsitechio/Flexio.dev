import express from 'express';
import webhookRouter from './webhook';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Add this line to parse JSON request bodies
app.use('/api', webhookRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});