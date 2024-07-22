<script lang="ts" setup>
import { loginSchema } from '@db'

const { login } = useAuth()

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(loginSchema),
})

const onSubmit = handleSubmit(async (values) => {
  await login(values)
})
</script>

<template>
  <form class="flex gap-2 flex-col w-fit" @submit.prevent="onSubmit()">
    <UiInput label="Username" name="username" placeholder="Username" />
    <UiInput label="Password" type="password" name="password" placeholder="Password" />

    <button type="submit">
      Login
    </button>

    <NuxtLink to="/auth/signup">
      Signup now
    </NuxtLink>
  </form>
</template>
