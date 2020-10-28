import express from 'express';
import mongoose from 'mongoose';
import TodoRoute from './routes/route';
import { errors } from 'celebrate';
import {config} from '../config';
const database = config.dbUrl;

const app = express();
mongoose.connect(database, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, "connection Error"))
db.once('open', () => {
  //console.log("DB is connected")
})


app.use(errors())
app.use(express.json());
app.get('/', (req, res) => {
  res.send({ message: 'Welcome to Marcel Capstone project API' });
});
app.use('/', TodoRoute);



export default app;
