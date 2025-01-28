import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  birth_date: string | null;
  gender: string | null;
  phone: string | null;
  photo_url: string | null;
  username: string | null;
}

interface AuthStore {
  token: string | null;
  user: User | null; // Simpan semua informasi pengguna
  setToken: (token: string) => void;
  setUser: (user: User) => void; 
  clearAuth: () => void; // Hapus token dan informasi pengguna
}

export const useAuth = create<AuthStore>((set) => ({
  token: typeof window !== 'undefined' ? localStorage.getItem("token") : null, // Ambil token dari localStorage saat inisialisasi jika di browser
  user: null,
  setToken: (token) => {
    localStorage.setItem("token", token); // Simpan token di localStorage
    set({ token });
  },
  setUser: (user) => set({ user }),
  clearAuth: () => {
    localStorage.removeItem("token"); // Hapus token dari localStorage
    set({ token: null, user: null });
  }, 
})); 