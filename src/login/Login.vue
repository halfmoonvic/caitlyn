<script setup lang="ts">
// third party tools and libraries
// local functions and variables
// local components

import HTTPClient from '@/utils/client/httpClient';

function login() {
  new HTTPClient('/proxy/api')
    ._postJson('/simple/login')
    .then(() => {
      window.location.replace('/');
    })
    .catch(err => {
      console.error(err);
    });
}
</script>

<template>
  <div>
    <button class="login-btn" @click="login">登录</button>
  </div>
</template>
