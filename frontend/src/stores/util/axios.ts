import Axios, { AxiosError, AxiosResponse } from 'axios';
import { defineStore } from 'pinia';
import { useRouter, useRoute } from 'vue-router';
import { useAlert } from './alert';
import { useFirebase } from '../auth/firebase';

export const useAxios = defineStore('useAxios', () => {
  const firebase = useFirebase();
  const router = useRouter();
  const route = useRoute();

  const { alert } = useAlert();

  const instantce = Axios.create({
    baseURL:
      import.meta.env.MODE === 'development'
        ? `${import.meta.env.VITE_APP_DEVHOST}/api`
        : `${import.meta.env.VITE_APP_FRONTHOST}/api`,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });

  const request = async (
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    url: string,
    data?: any,
  ): Promise<any | AxiosError> => {
    try {
      const currentUser = firebase.currentUser();
      const urlQuery = currentUser ? currentUser?.uid : null;

      if (route.path !== '' && !currentUser) {
        router.push('');
      } else {
        const urlTransform = urlQuery ? `${url}?uid=${urlQuery}` : url;
        const response = (await instantce[method](
          urlTransform,
          data,
        )) as AxiosResponse;
        return response?.data;
      }
      return null;
    } catch (err: any) {
      await axiosErrorHandler(err);
      return err;
    }
  };

  async function axiosErrorHandler(err: any) {
    if (Axios.isAxiosError(err)) {
      const message: any = err.response ? err?.response?.data?.error : null;

      alert({
        title: message?.error,
        message: message?.message,
        timer: 2000,
      });

      return message?.message;
    }

    return err;
  }

  return {
    request,
    axiosErrorHandler,
  };
});
