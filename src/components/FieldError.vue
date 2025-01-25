<script setup lang="ts">
import { FieldApi } from "@tanstack/vue-form";

const props = defineProps<{
  state: FieldApi<any, any, any, any>["state"];
}>();
</script>

<template>
  <!-- Only show unique error messages, doing this because i am validating the form on blur
   and validating the form on mount -->
  <template
    v-if="props.state.meta.isTouched && props.state.meta.errors.length > 0"
  >
    <em
      class="text-error"
      v-for="error of [...new Set(props.state.meta.errors)]"
      :key="error"
    >
      {{ error }}
    </em>
    {{ props.state.meta.isValidating ? "Validating..." : null }}
  </template>
</template>
