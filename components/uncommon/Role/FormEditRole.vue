<template>
  <validation-observer v-slot="{ handleSubmit }">
    <b-form @submit.prevent="handleSubmit(submitFormLogin)">
      <validation-provider
        v-slot="validationContext"
        name="Name role"
        :rules="{ required: true }"
      >
        <b-form-group label="Name role" class="mb-7">
          <b-form-input
            v-model="role.name"
            :state="
              validationContext.errors[0]
                ? false
                : validationContext.valid
                ? true
                : null
            "
          />
          <b-form-invalid-feedback>{{
            validationContext.errors[0]
          }}</b-form-invalid-feedback>
        </b-form-group>
      </validation-provider>

      <b-form-group label="Description" class="mb-7">
        <b-form-input v-model="role.description" />
      </b-form-group>

      <b-form-group label="Permission" class="mb-7">
        <b-form-checkbox-group
          v-model="permissionSelected"
          :options="permissions"
          class="wrap"
          text-field="name"
          value-field="id"
          stacked
        ></b-form-checkbox-group>
      </b-form-group>
    </b-form>
  </validation-observer>
</template>
<script>
export default {
  props: {
    permissions: {
      type: Array,
      default: () => [],
    },
    role: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    permissionSelected() {
      return this.role.permissions.map((item) => item.id)
    },
  },
}
</script>
