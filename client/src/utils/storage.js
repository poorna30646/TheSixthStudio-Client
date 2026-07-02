export const storage = {
  get(key) {
    if (typeof window === 'undefined') return null;
    try {
      return JSON.parse(window.localStorage.getItem(key));
    } catch (error) {
      return window.localStorage.getItem(key);
    }
  },
  set(key, value) {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key) {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(key);
  },
};

export default storage;
