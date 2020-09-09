<template>
  <div>
    <span class="logo-single"></span>
    <h6 class="mb-7">Login</h6>

    <validation-observer v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(submitFormLogin)">
        <validation-provider
          v-slot="validationContext"
          name="E-mail"
          :rules="{ required: true, email: true }"
        >
          <b-form-group label="E-mail" class="has-float-label mb-7">
            <b-form-input
              v-model="form.email"
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
          name="Password"
          :rules="{ required: true }"
        >
          <b-form-group label="Password" class="has-float-label mb-4">
            <b-form-input
              v-model="form.password"
              type="password"
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

        <div class="float-right">
          <b-button
            type="submit"
            size="lg"
            :class="{
              'btn-multiple-state btn-shadow': true,
              'show-spinner': processing,
            }"
            variant="main-color"
          >
            <span class="spinner d-inline-block">
              <span class="bounce1"></span>
              <span class="bounce2"></span>
              <span class="bounce3"></span>
            </span>
            <span class="label">LOGIN</span>
          </b-button>
        </div>
      </b-form>
    </validation-observer>
    <div>
      <notifications group="error" />
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  layout: 'authentication',
  middleware: 'notAuthenticated',
  data() {
    return {
      form: {
        email: null,
        password: null,
      },
      processing: false,
    }
  },

  methods: {
    ...mapActions(['login']),
    async submitFormLogin() {
      this.processing = true
      try {
        await this.login(this.form)
        this.$router.push('/admin')
      } catch (e) {
        this.$notify({
          group: 'error',
          type: 'error',
          title: 'Login error',
          text: e,
        })
      } finally {
        this.processing = false
      }
    },
  },
}
</script>
