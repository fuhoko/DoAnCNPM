<template>
  <b-card no-body>
    <b-card-body class="wizard wizard-default">
      <form-wizard :top-nav-disabled="true" :with-validate="true">
        <tab
          name="Step 1"
          desc="Customer's Info"
          :selected="true"
          :validate="validateStep1"
        >
          <div class="wizard-basic-step">
            <validation-observer ref="formChild1">
              <b-form>
                <b-form-group label="Bill ID" class="mb-7">
                  <b-form-input v-model="form.id" readonly />
                </b-form-group>
                <b-form-group label="Customer ID" class="mb-7">
                  <b-form-input v-model="form.customerId" readonly />
                </b-form-group>
                <validation-provider
                  v-slot="validationContext"
                  name="Customer's Name"
                  :rules="{ required: true }"
                >
                  <b-form-group label="Cusomter's Name" class="mb-7">
                    <b-form-select
                      v-model="form.customerId"
                      class="mb-3"
                      :options="customers"
                      value-field="id"
                      text-field="fullName"
                      @change="onChange"
                    >
                      <!-- <b-form-select-option
                        v-for="(customer, index) in customers"
                        :id="customer.id"
                        :key="index"
                        :value="customer.id"
                        >{{ customer.fullName }}</b-form-select-option
                      > -->
                    </b-form-select>
                    <b-form-invalid-feedback>{{
                      validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
                <!-- <validation-provider
                  v-slot="validationContext"
                  name="Email"
                  :rules="{ required: true }"
                >
                  <b-form-group label="Email" class="mb-7">
                    <b-form-input
                      v-model.trim="customer.email"
                      :state="getValidationState(validationContext)"
                    />
                    <b-form-invalid-feedback>{{
                      validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
                <validation-provider
                  v-slot="validationContext"
                  name="Phone"
                  :rules="{ required: true }"
                >
                  <b-form-group label="Phone" class="mb-7">
                    <b-form-input
                      v-model.trim="customer.phone"
                      :state="getValidationState(validationContext)"
                    />
                    <b-form-invalid-feedback>{{
                      validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
                <b-form-group label="Bio" class="mb-7">
                  <b-form-input v-model.trim="customer.bio" />
                </b-form-group> -->
              </b-form>
            </validation-observer>
          </div>
        </tab>
        <tab name="Step 2" desc="Bill'Services" :validate="validateStep2">
          <div class="wizard-basic-step">
            <validation-observer ref="formChild2">
              <b-form>
                <b-form-group label="BillService ID" class="mb-7">
                  <b-form-input v-model="form.billServices[0].id" readonly />
                </b-form-group>
                <validation-provider
                  v-slot="validationContext"
                  name="Service ID"
                  :rules="{ required: true }"
                >
                  <b-form-group label="Service" class="mb-7">
                    <b-form-select
                      v-model="form.billServices[0].serviceId"
                      class="mb-3"
                      :options="services"
                      value-field="id"
                      text-field="enTitle"
                      @change="onChange"
                    >
                      <!-- <b-form-select-option
                        v-for="(customer, index) in customers"
                        :id="customer.id"
                        :key="index"
                        :value="customer.id"
                        >{{ customer.fullName }}</b-form-select-option
                      > -->
                    </b-form-select>
                    <b-form-invalid-feedback>{{
                      validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
                <b-form-group label="Quantity" class="mb-7">
                  <b-form-input
                    id="range-1"
                    v-model="form.billServices[0].quantity"
                    type="range"
                    min="1"
                    max="10"
                  ></b-form-input>
                  <div class="mt-2">
                    Quantity: {{ form.billServices[0].quantity }}
                  </div>
                </b-form-group>
                <b-form-group label="Price" class="mb-7">
                  <b-form-input
                    v-model="form.billServices[0].price"
                    type="number"
                  />
                </b-form-group>
                <b-form-group label="Net Price" class="mb-7">
                  <b-form-input
                    v-model="form.billServices[0].netPrice"
                    type="number"
                  />
                </b-form-group>
              </b-form>
            </validation-observer>
          </div>
        </tab>
        <tab name="Step 3" desc="Status" :validate="validateStep3">
          <div class="wizard-basic-step">
            <validation-observer ref="formChild3">
              <b-form>
                <validation-provider
                  v-slot="validationContext"
                  name="Status"
                  :rules="{ required: true }"
                >
                  <b-form-group label="Status" class="mb-7">
                    <v-select v-model="form.status" :options="statusChoice" />
                    <b-form-invalid-feedback>{{
                      validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
                <b-form-group label="Note" class="mb-7">
                  <b-form-input v-model="form.note" />
                </b-form-group>
              </b-form>
            </validation-observer>
          </div>
        </tab>
        <tab type="done">
          <div class="wizard-basic-step text-center mt-10">
            <h2 class="mb-2">Create new Bill</h2>
            <b-button
              :class="{
                'mb-8': true,
                'btn-multiple-state': true,
                'show-spinner': processing,
              }"
              variant="main-color"
              @click="done"
            >
              <span class="spinner d-inline-block">
                <span class="bounce1"></span>
                <span class="bounce2"></span>
                <span class="bounce3"></span>
              </span>
              <span class="label">Submit</span>
            </b-button>
          </div>
        </tab>
      </form-wizard>
    </b-card-body>
  </b-card>
</template>

<script>
import { Tab, FormWizard } from '@/components/common'

export default {
  components: {
    FormWizard,
    Tab,
  },
  props: {
    processing: {
      type: Boolean,
      default: false,
    },
    bill: {
      type: Object,
      default: null,
    },
    customers: {
      type: Array,
      default: null,
    },
    services: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      statusChoice: [
        'PENDING',
        'CUSTOMER_PAYING',
        'CUSTOMER_PAID',
        'PROVIDER_PAID',
        'COMPLETED',
        'CANCEL',
      ],
      form: {
        id: this.bill?.id ?? null,
        note: this.bill?.note ?? '',
        customerId: this.bill?.customer.id ?? null,
        status: this.bill?.status ?? '',
        billServices: [
          {
            id: this.bill?.billServices[0].id ?? null,
            serviceId: this.bill?.billServices[0].serviceId ?? null,
            quantity: this.bill?.billServices[0].quantity ?? null,
            price: this.bill?.billServices[0].price ?? null,
            netPrice: this.bill?.billServices[0].netPrice ?? null,
          },
        ],
      },
    }
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
    getBase64(img, callback) {
      const reader = new FileReader()
      reader.addEventListener('load', () => callback(reader.result))
      reader.readAsDataURL(img)
    },
    handleChange(e) {
      const file = e.target.files[0]
      if (file) {
        this.getBase64(file, (imageUrl) => {
          this.imageUrl = imageUrl
        })
      }
    },
    onChange(event) {
      // console.log(event.target.value)
    },
    async validateStep0() {
      const { valid } = await this.$refs.formChild0.validate()
      return valid
    },
    validateStep1() {
      return this.$refs.formChild1.validate()
    },
    validateStep2() {
      return this.$refs.formChild2.validate()
    },
    validateStep3() {
      return this.$refs.formChild3.validate()
    },

    done() {
      this.$emit('onSubmit', this.file, this.form)
    },
  },
}
</script>
