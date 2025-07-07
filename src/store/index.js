import { createPinia, defineStore } from 'pinia';

export const pinia = createPinia();

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
  }),
  actions: {
    login(token, user) {
      this.token = token;
      this.user = user;
      localStorage.setItem('token', token);
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
    },
  },
});

export const useUiStore = defineStore('ui', {
  state: () => ({
    loading: false,
    toast: '',
    toastType: 'success', // or 'error'
  }),
  actions: {
    showLoading() { this.loading = true; },
    hideLoading() { this.loading = false; },
    showToast(msg, type = 'success') {
      this.toast = msg;
      this.toastType = type;
      setTimeout(() => { this.toast = ''; }, 2500);
    },
  },
}); 