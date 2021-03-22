import fs from 'fs';
import path from 'path';

class Config {
  private cfg: any;
  constructor() {
    const cfgText: string = fs.readFileSync(path.join(__dirname, 'appconfig.json'), { encoding: 'utf8' });
    this.cfg = JSON.parse(cfgText);
  }

  public get Port(): number {
    return this.cfg.PORT;
  }
}

export default new Config();
