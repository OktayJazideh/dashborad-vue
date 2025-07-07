<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <form @submit.prevent="onRegister" class="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-6 text-center">ثبت‌نام</h2>
      <div class="mb-4">
        <label class="block mb-1">ایمیل</label>
        <input v-model="email" type="email" required class="input" />
      </div>
      <div class="mb-4">
        <label class="block mb-1">نام</label>
        <input v-model="name" type="text" required class="input" />
      </div>
      <div class="mb-4">
        <label class="block mb-1">رمز عبور</label>
        <input v-model="password" type="password" required minlength="6" class="input" />
      </div>
      <div class="mb-6">
        <label class="block mb-1">تکرار رمز عبور</label>
        <input v-model="confirm" type="password" required minlength="6" class="input" />
      </div>
      <button type="submit" class="btn w-full">ثبت‌نام</button>
      <p v-if="error" class="text-red-500 mt-2 text-center">{{ error }}</p>
      <router-link to="/login" class="block mt-4 text-center text-blue-500">ورود</router-link>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { userService } from '../services/userService';
import { useAuthStore } from '../store';

const email = ref('');
const name = ref('');
const password = ref('');
const confirm = ref('');
const error = ref('');
const router = useRouter();
const auth = useAuthStore();

async function onRegister() {
  error.value = '';
  if (!email.value || !password.value || !confirm.value || !name.value) {
    error.value = 'همه فیلدها الزامی است.';
    return;
  }
  if (password.value.length < 6) {
    error.value = 'رمز عبور باید حداقل ۶ کاراکتر باشد.';
    return;
  }
  if (password.value !== confirm.value) {
    error.value = 'رمز عبور و تکرار آن یکسان نیست.';
    return;
  }
  try {
    // ثبت کاربر در mockapi
    const res = await userService.create({ email: email.value, name: name.value, password: password.value });
    // لاگین خودکار (توکن جعلی)
    const fakeToken = 'fake-jwt-token';
    auth.login(fakeToken, { email: email.value, name: name.value });
    router.push('/dashboard');
  } catch (e) {
    error.value = 'خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.';
  }
}
</script>

<style scoped>
.input {
  @apply w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white;
}
.btn {
  @apply bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition;
}
</style> 