import Logger from './iface';

class ConsoleLogger implements Logger {
  public log(sender: string, msg: string) {
    console.log(`\n⚪️ ${sender}\t(${new Date().toUTCString()})\n🧾 ${msg}\n`);
  }
  public warn(sender: string, msg: string) {
    console.log(`\n🟠 ${sender}\t(${new Date().toUTCString()})\n🧾 ${msg}\n`);
  }
  public notice(sender: string, msg: string) {
    console.log(`\n🟡 ${sender}\t(${new Date().toUTCString()})\n🧾 ${msg}\n`);
  }
  public error(sender: string, msg: string) {
    console.log(`\n🔴 ${sender}\t(${new Date().toUTCString()})\n🧾 ${msg}\n`);
  }
  public success(sender: string, msg: string) {
    console.log(`\n🟢 ${sender}\t(${new Date().toUTCString()})\n🧾 ${msg}\n`);
  }
  public special(sender: any, msg: string) {
    console.log(`\n🟣 ${sender}\t(${new Date().toUTCString()})\t[${typeof msg}]\n🧾 ${JSON.stringify(msg)}\n`);
  }
}

export default ConsoleLogger;