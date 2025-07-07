<template>
  <div class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 p-6 rounded shadow w-full max-w-md relative">
      <h2 class="text-xl font-bold mb-4">{{ mode === 'add' ? 'افزودن کاربر' : 'ویرایش کاربر' }}</h2>
      <form @submit.prevent="onSubmit">
        <div v-for="field in editableFields" :key="field" class="mb-3">
          <label class="block mb-1">{{ field }}</label>
          <input v-model="form[field]" :type="field==='email' ? 'email' : 'text'" class="input" :disabled="field==='id'" />
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
import { useUserStore } from '../store/user';

const props = defineProps({
  user: Object,
  mode: String,
});
const emit = defineEmits(['close', 'saved']);
const userStore = useUserStore();

const form = ref({});

watch(
  () => props.user,
  (val) => {
    form.value = val ? { ...val } : {};
  },
  { immediate: true }
);

const editableFields = computed(() => {
  if (props.mode === 'add' && userStore.users.length > 0) {
    return Object.keys(userStore.users[0]).filter(f => f !== 'id' && f !== 'createdAt');
  }
  if (props.user) {
    return Object.keys(props.user).filter(f => f !== 'id' && f !== 'createdAt');
  }
  return ['name', 'email', 'avatar'];
});

async function onSubmit() {
  let success = false;
  if (props.mode === 'add') {
    success = await userStore.addUser(form.value);
    if (success) emit('saved', 'کاربر با موفقیت افزوده شد!');
  } else {
    success = await userStore.updateUser(props.user.id, form.value);
    if (success) emit('saved', 'ویرایش کاربر با موفقیت انجام شد!');
  }
  if (!success) emit('saved', userStore.error || 'خطا!');
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