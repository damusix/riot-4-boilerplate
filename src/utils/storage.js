import BetterWebStorage from 'better-web-storage';

const storage = new BetterWebStorage({ local: true, prefix: 'app' });
const session = new BetterWebStorage({ session: true, prefix: 'app' });

storage.session = session;

export default storage;