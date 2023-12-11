import { defineStore } from 'pinia';
import { is } from 'quasar';

export const useCurrency = defineStore('useCurrency', () => {
  const currencySort = {
    'ko-KR': '₩',
    'en-US': '$',
  };

  function formatCurrency(value: number, currency?: 'ko-KR' | 'en-US') {
    if (!is.number(value)) {
      throw new Error('value must be a number');
    }

    return currency ? `${currencySort[currency]} ${value.toLocaleString('ko-KR')}` : `${value.toLocaleString('ko-KR')}`;
  }

  return {
    formatCurrency,
  };
});
