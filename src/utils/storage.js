import BetterWebStorage from 'better-web-storage';

// Create local storage and session storage
const storage = new BetterWebStorage({ local: true, prefix: 'app' });
const session = new BetterWebStorage({ session: true, prefix: 'app' });

// Attach session storage to localStorage object
storage.session = session;

export default storage;