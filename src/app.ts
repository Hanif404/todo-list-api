import express from 'express';
import authRoute from './interfaces/routes/auth.route';
import checklistRoute from './interfaces/routes/checklist.route';
import { errorHandler, successHandler } from './interfaces/middlewares/responseHandler';

const app = express();

app.use(express.json());
app.use(successHandler);
app.use("/", authRoute);
app.use("/checklist", checklistRoute);
app.use(errorHandler);
export default app;