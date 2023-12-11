import { defineStore } from 'pinia';
import { useQuasar } from 'quasar';

export const useAlert = defineStore('useAlert', () => {
  const $q = useQuasar();

  function alert(obj: {
    title?: string, message?: string, timer?: number}) {
    setTimeout(() => {
      document.querySelector('.axios-alert')?.querySelector('button')?.click();
    }, obj.timer || 10000);

    $q.dialog({
      class: 'axios-alert',
      title: obj.title || '',
      message: obj.message || '',
    });
  }

  return {
    alert,
  };
});
