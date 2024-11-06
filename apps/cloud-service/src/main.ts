import { logger } from './core/logger/logger';
import { app } from './server';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(port, () => {
  logger(`[ ready ] http://0.0.0.0:${port}`);
});
