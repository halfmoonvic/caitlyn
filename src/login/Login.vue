<script setup lang="ts">
// third party tools and libraries
// local functions and variables
// local components

import HTTPClient from '@/utils/client/httpClient';

function login() {
  new HTTPClient('/proxy/api')
    ._postJson('/simple/login')
    .then(() => {
      document.location.href = '/';
    })
    .catch(err => {
      console.error(err);
    });
}
</script>

<template>
  <div>
    <button @click="login">登录</button>
  </div>
</template>
