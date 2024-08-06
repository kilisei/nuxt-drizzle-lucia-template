<script lang="ts" setup>
import { loginSchema } from '@db'

const { login, error } = useAuth()

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(loginSchema),
})

const onSubmit = handleSubmit(async (values) => {
  await login(values)
})
</script>

<template>
  <form @submit.prevent="onSubmit()">
    <UiInput label="Username" name="username" placeholder="Username" />
    <UiInput label="Password" type="password" name="password" placeholder="Password" />

    <p>{{ error }}</p>

    <button type="submit">
      Login
    </button>

    <NuxtLink to="/auth/signup">
      Signup now
    </NuxtLink>
  </form>
</template>
