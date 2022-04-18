<script setup lang="ts">
// third party tools and libraries
// local functions and variables
// local components

function login() {
  window
    .fetch('/proxy/api/simple/login', {
      method: 'POST',
    })
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
