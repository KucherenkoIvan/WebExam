import express from 'express';
import config from '../Config/config';
import Logger from '../Loggers/iface';
import ConsoleLogger from '../Loggers/console';
import fs from 'fs';
import path from 'path';

class Program {
    static logger: Logger;
    public static main(): void {
    const app: any = express();
    this.logger = new ConsoleLogger();
    const router: express.Router = this.getRouter();

    app.use(express.json());

    app.use(router);

    app.listen(config.Port, () => {
      this.logger.success('Server', `App available at http://localhost:${config.Port}`)
    });
  }

  private static getRouter(): express.Router {
    const router = express.Router();

    router.get('/shader/:shaderName', async (req, res) => {
      const shaderName: string = req.params.shaderName;

      try {
        const shader = fs.readFileSync(path.resolve(`shaders/${shaderName}.glsl`), { encoding: 'utf-8'});
        return res.status(200).json({ shader });
      } catch (e) {
        this.logger.error('ShadersLoader', JSON.stringify(e));
        return res.status(200).json({ shader: null });
      }
    });

    return router;
  }

}

export default Program;
