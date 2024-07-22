export function useTrpc() {
  const { $client } = useNuxtApp()
  return {
    trpc: $client,
  }
}
