<script setup lang="ts">
definePageMeta({
  middleware: 'protected',
})

const { logout } = useAuth()

const user = useAuthenticatedUser()
</script>

<template>
  Current user:
  <pre>
  {{ user }}
  </pre>
  <button @click="logout()">
    Logout
  </button>
</template>
