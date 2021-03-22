interface Logger {
  log: (sender: string, msg: string) => void;
  warn: (sender: string, msg: string) => void;
  notice: (sender: string, msg: string) => void;
  error: (sender: string, msg: string) => void;
  success: (sender: string, msg: string) => void;
  special: (sender: string, msg: any) => void;
}

export default Logger;
