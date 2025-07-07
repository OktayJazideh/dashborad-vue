<template>
  <div class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 p-6 rounded shadow w-full max-w-md relative">
      <h2 class="text-xl font-bold mb-4">{{ mode === 'add' ? 'افزودن سفارش' : 'ویرایش سفارش' }}</h2>
      <form @submit.prevent="onSubmit">
        <div v-for="field in editableFields" :key="field" class="mb-3">
          <label class="block mb-1">{{ field }}</label>
          <input v-model="form[field]" class="input" :disabled="field==='id'" />
        </div>
        <div class="flex justify-end gap-2 mt-4">
          <button type="button" class="btn bg-gray-400 hover:bg-gray-500" @click="$emit('close')">انصراف</button>
          <button type="submit" class="btn">{{ mode === 'add' ? 'افزودن' : 'ذخیره' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useOrderStore } from '../store/order';

const props = defineProps({
  order: Object,
  mode: String,
});
const emit = defineEmits(['close', 'saved']);
const orderStore = useOrderStore();

const form = ref({});

watch(
  () => props.order,
  (val) => {
    form.value = val ? { ...val } : {};
  },
  { immediate: true }
);

const editableFields = computed(() => {
  if (props.mode === 'add' && orderStore.orders.length > 0) {
    return Object.keys(orderStore.orders[0]).filter(f => f !== 'id' && f !== 'createdAt');
  }
  if (props.order) {
    return Object.keys(props.order).filter(f => f !== 'id' && f !== 'createdAt');
  }
  return ['name', 'price', 'status'];
});

async function onSubmit() {
  let success = false;
  if (props.mode === 'add') {
    success = await orderStore.addOrder(form.value);
    if (success) emit('saved', 'سفارش با موفقیت افزوده شد!');
  } else {
    success = await orderStore.updateOrder(props.order.id, form.value);
    if (success) emit('saved', 'ویرایش سفارش با موفقیت انجام شد!');
  }
  if (!success) emit('saved', orderStore.error || 'خطا!');
}
</script>

<style scoped>
.input {
  @apply w-full px-3 py-2 border rounded focus:outline-none focus:ring dark:bg-gray-700 dark:text-white;
}
.btn {
  @apply bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition;
}
</style> 