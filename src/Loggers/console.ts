import Logger from './iface';

class ConsoleLogger implements Logger {
  public log(sender: string, msg: string) {
    console.log(`\n⚪️ ${sender}\t(${new Date().toUTCString()})\n\n🧾 ${msg}\n\n`);
  }
  public warn(sender: string, msg: string) {
    console.log(`\n🟠 ${sender}\t(${new Date().toUTCString()})\n\n🧾 ${msg}\n\n`);
  }
  public notice(sender: string, msg: string) {
    console.log(`\n🟡 ${sender}\t(${new Date().toUTCString()})\n\n🧾 ${msg}\n\n`);
  }
  public error(sender: string, msg: string) {
    console.log(`\n🔴 ${sender}\t(${new Date().toUTCString()})\n\n🧾 ${msg}\n\n`);
  }
  public success(sender: string, msg: string) {
    console.log(`\n🟢 ${sender}\t(${new Date().toUTCString()})\n\n🧾 ${msg}\n\n`);
  }
  public special(sender: any, msg: string) {
    console.log(`\n🟣 ${sender}\t(${new Date().toUTCString()})\t[${typeof msg}]\n\n🧾 ${JSON.stringify(msg)}\n\n`);
  }
}

export default ConsoleLogger;