
import express from 'express';
import helmet from 'helmet';
const cors = require('cors');
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import setRoutes from './routes';
const app = express();
dotenv.config();
  

app.use((req, res, next) => { next(); }, cors({maxAge: 84600}));

app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes setup
setRoutes(app);

//mongoose setup
let mongodbURI : string | undefined;
if (process.env.NODE_ENV === 'test') {
  mongodbURI = process.env["MONGODB_TEST_URI"];
} else {
  mongodbURI = process.env["MONGODB_URI"];
}
let mongoconn = "mongodb://jebo:Greenfour4@cluster0-shard-00-00.ox9zo.mongodb.net:27017,cluster0-shard-00-01.ox9zo.mongodb.net:27017,cluster0-shard-00-02.ox9zo.mongodb.net:27017/mobile-sub-db?ssl=true&replicaSet=atlas-mlf6w8-shard-0&authSource=admin&retryWrites=true&w=majority"
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(mongoconn)
  .then(db => {
    console.log('Connected to MongoDB');
  });

// Serve up static assets
app.use(express.static(path.join(__dirname, "../../frontend/build")));

app.get("*", (_, res) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.sendFile(path.join(__dirname, "../../frontend/build/index.html"));
});


const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`server running on port ${port}..!!`));

export default app;
