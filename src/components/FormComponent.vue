<template>
  <fieldset
    class="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box"
  >
    <legend class="fieldset-legend text-lg">TanStack Form with Vue & Zod</legend>
    <form @submit.prevent="handleSubmit">
      <div class="flex flex-col mb-4">
        <form.Field
          name="name"
          :validators="{
            onMount: formSchema.shape.name,
            onBlur: formSchema.shape.name,
          }"
        >
          <template v-slot="{ field, state }">
            <label :htmlFor="field.name">Name:</label>
            <input
              class="input input-bordered"
              type="text"
              :id="field.name"
              :name="field.name"
              :value="field.state.value"
              @input="
              (e) => field.handleChange((e.target as HTMLInputElement).value)
            "
              @blur="field.handleBlur"
            />
            <FieldError :state="state" />
          </template>
        </form.Field>
      </div>

      <!-- BIRTHDATE  -->
      <div class="flex flex-col mb-4">
        <form.Field
          name="birthdate"
          :validators="{
            onMount: formSchema.shape.birthdate,
            onBlur: formSchema.shape.birthdate,
          }"
        >
          <template v-slot="{ field, state }">
            <label :htmlFor="field.name">Birthdate:</label>
            <input
              class="input input-bordered"
              type="date"
              :id="field.name"
              :name="field.name"
              :value="field.state.value"
              @input="
              (e) => field.handleChange((e.target as HTMLInputElement).value)
            "
              @blur="field.handleBlur"
            />
            <FieldError :state="state" />
          </template>
        </form.Field>
      </div>

      <!-- CHECKBOX -->
      <div class="flex flex-col mb-4">
        <form.Field
          name="acceptTerms"
          :validators="{
            onMount: formSchema.shape.acceptTerms,
            onBlur: formSchema.shape.acceptTerms,
          }"
        >
          <template v-slot="{ field, state }">
            <label :htmlFor="field.name">Accept Terms:</label>
            <input
              class="checkbox checkbox-primary"
              type="checkbox"
              :id="field.name"
              :name="field.name"
              :checked="field.state.value"
              @change="(e) => field.handleChange((e.target as HTMLInputElement).checked)"
              @blur="field.handleBlur"
            />
            <FieldError :state="state" />
          </template>
        </form.Field>
      </div>

      <!-- FAVORITE COLOR -->
      <div class="flex flex-col mb-4">
        <form.Field
          name="favoriteColor"
          :validators="{
            onMount: formSchema.shape.favoriteColor,
            onBlur: formSchema.shape.favoriteColor,
          }"
        >
          <template v-slot="{ field, state }">
            <label :htmlFor="field.name">Favorite Color:</label>
            <select
              class="select select-bordered"
              :id="field.name"
              :name="field.name"
              :value="field.state.value"
              @change="(e) => field.handleChange((e.target as HTMLSelectElement).value)"
            >
              <option value="">Select a Color</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
            </select>
            <FieldError :state="state" />
          </template>
        </form.Field>
      </div>

      <!-- SUBMIT BUTTON -->
      <form.Subscribe>
        <template v-slot="{ canSubmit, isSubmitting }">
          <button type="submit" :disabled="!canSubmit" class="btn btn-primary">
            {{ isSubmitting ? "..." : "Submit" }}
          </button>
        </template>
      </form.Subscribe>

      <!-- Debug Form Values -->
      <form.Subscribe :selector="(state) => state.values" v-slot="values">
        <p>
          Form Values:
          {{ JSON.stringify(values, null, 2) }}
        </p>
      </form.Subscribe>
    </form>
  </fieldset>
</template>

<script setup lang="ts">
import { useForm } from "@tanstack/vue-form";
import { z } from "zod";
import FieldError from "./FieldError.vue";
import { computed, watch, onMounted } from "vue";
import { formSchema, type FormValues } from "../schemas/form-schema";
import { zodValidator } from "@tanstack/zod-form-adapter";

/**
 * Initializes the form using TanStack Form's useForm hook.
 * @returns {object} An object containing the form state and methods.
 *
 * @see https://github.com/TanStack/form/discussions/1005 regarding the submit button
 *
 */
const form = useForm<FormValues>({
  defaultValues: {
    name: "",
    birthdate: "",
    acceptTerms: false,
    favoriteColor: "",
  },
  validatorAdapter: zodValidator(formSchema),
  onSubmit: async ({ value }) => {
    console.log("Submitted:", value);
    alert("Form submitted! Check the console.");
  },
});

// Add this after form initialization
onMounted(async () => {
  await form.validate();

  // Validate all fields on mount
  console.log("Form State:", form.state);
});

/**
 * Handles the form submission.
 */
const handleSubmit = async () => {
  await form.handleSubmit();
};

// Add this to your script section to debug form state
watch(
  () => form.state,
  (newState) => {
    console.log("Form State:", newState);
  },
  { deep: true }
);
</script>

<style scoped>
.form-row {
  composes: flex flex-col mb-4 from global;
}
</style>
