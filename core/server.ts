import cors from 'cors';
import express, { Express, Response } from 'express';

import { ENV } from '../src/helpers';

import { env } from './lib';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const httpolyglot = require('httpolyglot');

const app: Express = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.disable('x-powered-by');

const corsOptions = {
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Origin': `${env('BASE_URL')}, *.${env('BASE_URL')}`,
  'Access-Control-Allow-Headers': 'origin, X-Requested-With,Content-Type,Accept, Authorization, Content-Type',
  methods: 'GET,POST,DELETE,PUT,PATCH',
  Accept: 'application/json',
  origin: true,
  credentials: true,
  withCredentials: true,
};
app.use(cors(corsOptions));

app.get('/', (_, res: Response) => {
  res.send('Hello, World!');
});

const run = async () => {
  const httpServer = httpolyglot.createServer({}, app);
  const PORT: string | number | undefined = env('PORT', 4000);

  httpServer.listen(PORT, () => {
    const environment = env('NODE_ENV', ENV.DEVELOPMENT);
    console.info(`Server started with ENV: '${environment}' on port: '${PORT}'`);
  });
};

run();
