import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: null,
    isLoggedIn: false,
  }),
  actions: {
    setUser(user) {
      this.user = user;
      this.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(user));
    },
    logout() {
      this.user = null;
      this.isLoggedIn = false;
      localStorage.removeItem('user');
    },
    initializeFromLocalStorage() {
      const user = localStorage.getItem('user');
      if (user) {
        this.user = JSON.parse(user);
        this.isLoggedIn = true;
      }
    },
  },
});

