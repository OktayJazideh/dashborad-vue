import { defineStore } from 'pinia';
import { userService } from '../services/userService';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchUsers() {
      this.loading = true;
      this.error = null;
      try {
        const res = await userService.getAll();
        this.users = res.data;
      } catch (e) {
        this.error = 'خطا در دریافت کاربران';
      } finally {
        this.loading = false;
      }
    },
    async addUser(user) {
      this.loading = true;
      this.error = null;
      try {
        const res = await userService.create(user);
        this.users.push(res.data);
        return true;
      } catch (e) {
        this.error = 'خطا در افزودن کاربر';
        return false;
      } finally {
        this.loading = false;
      }
    },
    async updateUser(id, user) {
      this.loading = true;
      this.error = null;
      try {
        const res = await userService.update(id, user);
        const idx = this.users.findIndex(u => u.id === id);
        if (idx !== -1) this.users[idx] = res.data;
        return true;
      } catch (e) {
        this.error = 'خطا در ویرایش کاربر';
        return false;
      } finally {
        this.loading = false;
      }
    },
    async deleteUser(id) {
      this.loading = true;
      this.error = null;
      try {
        await userService.remove(id);
        this.users = this.users.filter(u => u.id !== id);
        return true;
      } catch (e) {
        this.error = 'خطا در حذف کاربر';
        return false;
      } finally {
        this.loading = false;
      }
    },
  },
}); 