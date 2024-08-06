<script setup lang='ts'>
const props = defineProps<UiInputProps>()

interface UiInputProps {
  label: string
  name: string
  initialFocused?: boolean
}

const el = ref<HTMLInputElement | null>(null)
useFocus(el, { initialValue: props.initialFocused })

const attrs = useAttrs()

const { value, errorMessage } = useField(() => props.name)
</script>

<template>
  <div>
    <label :for="label">{{ label }}</label>
    <input
      v-bind="attrs"
      :id="label"
      ref="el"
      v-model="value"
      :name
    >
    <span>
      {{ errorMessage }}
    </span>
  </div>
</template>
