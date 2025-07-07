import { defineStore } from 'pinia';
import { orderService } from '../services/orderService';

export const useOrderStore = defineStore('order', {
  state: () => ({
    orders: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchOrders() {
      this.loading = true;
      this.error = null;
      try {
        const res = await orderService.getAll();
        this.orders = res.data;
      } catch (e) {
        this.error = 'خطا در دریافت سفارشات';
      } finally {
        this.loading = false;
      }
    },
    async addOrder(order) {
      this.loading = true;
      this.error = null;
      try {
        const res = await orderService.create(order);
        this.orders.push(res.data);
        return true;
      } catch (e) {
        this.error = 'خطا در افزودن سفارش';
        return false;
      } finally {
        this.loading = false;
      }
    },
    async updateOrder(id, order) {
      this.loading = true;
      this.error = null;
      try {
        const res = await orderService.update(id, order);
        const idx = this.orders.findIndex(o => o.id === id);
        if (idx !== -1) this.orders[idx] = res.data;
        return true;
      } catch (e) {
        this.error = 'خطا در ویرایش سفارش';
        return false;
      } finally {
        this.loading = false;
      }
    },
    async deleteOrder(id) {
      this.loading = true;
      this.error = null;
      try {
        await orderService.remove(id);
        this.orders = this.orders.filter(o => o.id !== id);
        return true;
      } catch (e) {
        this.error = 'خطا در حذف سفارش';
        return false;
      } finally {
        this.loading = false;
      }
    },
  },
}); 