export const StorageService = {
  getItem(key: string): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(key);
  },

  setItem(key: string, value: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, value);
  },
};
