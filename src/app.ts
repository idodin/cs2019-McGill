import * as dotenv from 'dotenv';
if (isDev()) dotenv.config();

import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';
import { Api } from './api/api';

if (isDev()) {
    console.log('Starting server in dev mode.');
}
else {
    console.log('Starting server in prod mode.');
}

export const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONT_END_ORIGIN);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

const api = new Api();
app.use('/api', api.getRouter());

if (isDev()) {
    app.use(express.static(path.resolve(__dirname, '../frontend')));
    app.get('/*', (req, res) => res.sendFile(path.resolve(__dirname, '../frontend/index.html')));
}
else {
    app.use(express.static('frontend'));
    app.get('/*', (req, res) => res.sendFile('index.html'));
}


app.listen(process.env.PORT || 8080, () => {
    console.log(`Server started, listening on port ${process.env.PORT || 8080}.`);
});

export default app;

function isDev() {
    return process.env.NODE_ENV === 'development';
}