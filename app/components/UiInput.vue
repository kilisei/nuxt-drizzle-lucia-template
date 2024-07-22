<script setup lang='ts'>
const props = defineProps<UiInputProps>()

interface UiInputProps {
  label: string
  name: string
  type?: string
  placeholder?: string
  initialFocused?: boolean
}

const el = ref<HTMLInputElement | null>(null)
useFocus(el, { initialValue: props.initialFocused })

const { value, errorMessage } = useField(() => props.name)
</script>

<template>
  <div class="flex flex-col">
    <label :for="label">{{ label }}</label>
    <input
      v-bind="$attrs"
      :id="label"
      ref="el"
      v-model="value"
      :name
      :type
      :placeholder
    >
    <span class="text-red-500">
      {{ errorMessage }}
    </span>
  </div>
</template>
