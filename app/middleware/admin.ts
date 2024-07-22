export default defineNuxtRouteMiddleware(async () => {
  const user = useUser()

  if (!user.value)
    return navigateTo('/auth/login')

  if (user.value?.role !== 'admin')
    return navigateTo('/')
})
