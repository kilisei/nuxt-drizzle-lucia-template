<script lang="ts" setup>
import { signupSchema } from '@db'

const { signup, error } = useAuth()

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(signupSchema),
})

const onSubmit = handleSubmit(async (values) => {
  await signup(values)
})
</script>

<template>
  <form class="flex gap-2 flex-col w-fit" @submit.prevent="onSubmit()">
    <UiInput label="Username" name="username" placeholder="Username" />
    <UiInput label="Email" type="email" name="email" placeholder="Email" />
    <UiInput label="Password" type="password" name="password" placeholder="Password" />
    <UiInput label="Repeat Password" name="repeatPassword" type="password" placeholder="Repeat Password" />

    <p>{{ error }}</p>

    <button type="submit">
      Signup
    </button>

    <NuxtLink to="/auth/login">
      Login now
    </NuxtLink>
  </form>
</template>
