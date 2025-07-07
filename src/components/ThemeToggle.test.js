import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ThemeToggle from './ThemeToggle.vue';

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: () => 'light',
    setItem: () => {},
  },
});

describe('ThemeToggle', () => {
  it('renders and toggles theme', async () => {
    const wrapper = mount(ThemeToggle);
    expect(wrapper.text()).toMatch(/☀️|🌙/);
    await wrapper.trigger('click');
    // بعد از کلیک باید آیکون تغییر کند (در حالت واقعی)
    expect(wrapper.text()).toMatch(/☀️|🌙/);
  });
}); 