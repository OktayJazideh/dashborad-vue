import { ref, watch } from 'vue';

const THEME_KEY = 'theme';
const theme = ref(localStorage.getItem(THEME_KEY) || 'light');

function applyTheme(value) {
  const root = document.documentElement;
  if (value === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

applyTheme(theme.value);

watch(theme, (val) => {
  localStorage.setItem(THEME_KEY, val);
  applyTheme(val);
});

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
}

export function useTheme() {
  return { theme, toggleTheme };
} 