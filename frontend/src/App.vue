<script setup lang="ts">
import { onMounted } from 'vue';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

onMounted(() => {
  const auth = getAuth();

  onAuthStateChanged(auth, (user: User | null) => {
    if (user) {
      // 백엔드에서 로그인한 유저의 정보를 유효한지 확인
    } else {
      // 로그인 페이지를 제외하고 user 정보가 없으면 로그인 페이지로 리다이렉트
    }
  });
});
</script>

<template>
  <router-view />
</template>
