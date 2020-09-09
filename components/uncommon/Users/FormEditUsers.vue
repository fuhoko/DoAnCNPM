<template>
  <validation-observer v-slot="{ handleSubmit }">
    <b-form @submit.prevent="handleSubmit(submitFormEdit)">
      <validation-provider
        v-slot="validationContext"
        name="User's name"
        :rules="{ required: true }"
      >
        <b-form-group label="Full Name" class="mb-7">
          <b-form-input
            v-model="user.fullName"
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

      <validation-provider
        v-slot="validationContext"
        name="E-mail"
        :rules="{ required: true, email: true }"
      >
        <b-form-group :label="`Email`">
          <b-form-input
            v-model="user.email"
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

      <b-form-group :label="`Role`">
        <b-form-select v-model="user.roleId" class="mb-3">
          <b-form-select-option
            v-for="(role, index) in roles"
            :id="role.id"
            :key="index"
            :value="role.id"
            >{{ role.name }}</b-form-select-option
          >
        </b-form-select>
      </b-form-group>
      <div class="float-right ml-2">
        <b-button
          type="submit"
          size="lg"
          :class="{
            'btn-multiple-state btn-shadow': true,
            'show-spinner': processing,
          }"
          variant="main-color"
        >
          <span class="icon success">
            <i class="simple-icon-check"></i>
          </span>
          <span class="icon fail">
            <i class="simple-icon-exclamation"></i>
          </span>
          <span class="label">SUBMIT</span>
        </b-button>
        <div class="float-left mr-2">
          <b-button
            size="lg"
            :class="{
              'btn-multiple-state btn-shadow': true,
              'show-spinner': processing,
            }"
            variant="main-color"
          >
            <span class="label">CANCEL</span>
          </b-button>
        </div>
      </div>
    </b-form>
  </validation-observer>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    roles: {
      type: Array,
      default: () => [],
    },
    user: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters({
      processing: 'processing',
    }),
  },
  methods: {
    submitFormEdit(event) {
      this.$emit('submit-form-edit', event)
    },
  },
}
</script>
