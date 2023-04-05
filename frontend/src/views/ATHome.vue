<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/dashboard">Dashboard</RouterLink>
        <RouterLink to="/tracker">Tracker</RouterLink>
        <RouterLink to="/balance">Balance</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
