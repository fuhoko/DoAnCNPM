<template>
  <b-card no-body>
    <b-card-body class="wizard wizard-default">
      <form-wizard :top-nav-disabled="true" :with-validate="true">
        <tab
          name="Step 1"
          desc="Thumbnail"
          :selected="true"
          :validate="validateStep1"
        >
          <div class="wizard-basic-step">
            <validation-provider
              ref="formChild1"
              v-slot="validationContext"
              name="Thumbnail"
              :rules="{ image: true }"
            >
              <b-form-group label="Name" class="mb-7">
                <b-form-file
                  v-model="file"
                  accept="image/*"
                  :state="getValidationState(validationContext)"
                  @change="handleChange"
                ></b-form-file>
                <b-form-invalid-feedback>{{
                  validationContext.errors[0]
                }}</b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
            <div class="text-center">
              <b-img
                v-if="imageUrl"
                thumbnail
                fluid
                :src="imageUrl"
                class="my-4"
              />
            </div>
          </div>
        </tab>
        <tab name="Step 2" desc="English" :validate="validateStep2">
          <div class="wizard-basic-step">
            <validation-observer ref="formChild2">
              <b-form>
                <validation-provider
                  v-slot="validationContext"
                  name="Title"
                  :rules="{ required: true }"
                >
                  <b-form-group label="Title" class="mb-7">
                    <b-form-input
                      v-model.trim="form.enTitle"
                      :state="getValidationState(validationContext)"
                    />
                    <b-form-invalid-feedback>{{
                      validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
                <validation-provider
                  v-slot="validationContext"
                  name="Description"
                  :rules="{ required: true }"
                >
                  <b-form-group label="Description" class="mb-7">
                    <b-form-input
                      v-model.trim="form.enDescription"
                      :state="getValidationState(validationContext)"
                    />
                    <b-form-invalid-feedback>{{
                      validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
                <validation-provider
                  v-slot="validationContext"
                  name="Content"
                  :rules="{ required: true }"
                >
                  <b-form-group label="Content" class="mb-7">
                    <b-form-input
                      v-model.trim="form.enContent"
                      :state="getValidationState(validationContext)"
                    />
                    <b-form-invalid-feedback>{{
                      validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-form>
            </validation-observer>
          </div>
        </tab>
        <tab name="Step 3" desc="Vietnamese" :validate="validateStep3">
          <div class="wizard-basic-step">
            <validation-observer ref="formChild3">
              <b-form>
                <validation-provider
                  v-slot="validationContext"
                  name="Title"
                  :rules="{ required: true }"
                >
                  <b-form-group label="Title" class="mb-7">
                    <b-form-input
                      v-model.trim="form.viTitle"
                      :state="getValidationState(validationContext)"
                    />
                    <b-form-invalid-feedback>{{
                      validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
                <validation-provider
                  v-slot="validationContext"
                  name="Description"
                  :rules="{ required: true }"
                >
                  <b-form-group label="Description" class="mb-7">
                    <b-form-input
                      v-model.trim="form.viDescription"
                      :state="getValidationState(validationContext)"
                    />
                    <b-form-invalid-feedback>{{
                      validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
                <validation-provider
                  v-slot="validationContext"
                  name="Content"
                  :rules="{ required: true }"
                >
                  <b-form-group label="Content" class="mb-7">
                    <b-form-input
                      v-model.trim="form.viContent"
                      :state="getValidationState(validationContext)"
                    />
                    <b-form-invalid-feedback>{{
                      validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-form>
            </validation-observer>
          </div>
        </tab>
        <tab name="Step 4" desc="General" :validate="validateStep4">
          <div class="wizard-basic-step">
            <validation-observer ref="formChild4">
              <b-form>
                <b-row>
                  <b-col>
                    <b-form-group label="Price" class="mb-7">
                      <b-input-group class="flex-nowrap align-items-center">
                        <validation-provider
                          v-slot="validationContext"
                          name="price"
                          :rules="{ required: true }"
                        >
                          <b-form-input
                            v-model="form.price"
                            :number="true"
                            :state="getValidationState(validationContext)"
                            type="number"
                          />
                          <b-form-invalid-feedback>{{
                            validationContext.errors[0]
                          }}</b-form-invalid-feedback>
                        </validation-provider>
                        <div class="mx-2 mb-0 h6">/</div>
                        <b-input-group-append class="w-60 input-unit">
                          <validation-provider
                            v-slot="validationContext"
                            name="unit"
                            :rules="{ required: true }"
                          >
                            <b-form-input
                              v-model.trim="form.unit"
                              :state="getValidationState(validationContext)"
                              placeholder="Unit"
                            />
                          </validation-provider>
                        </b-input-group-append>
                      </b-input-group>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group label="Current Price" class="mb-7">
                      <b-input-group class="flex-nowrap align-items-center">
                        <validation-provider
                          v-slot="validationContext"
                          name="currentPrice"
                          :rules="{ required: true }"
                        >
                          <b-form-input
                            v-model="form.currentPrice"
                            :number="true"
                            :state="getValidationState(validationContext)"
                            type="number"
                          />
                          <b-form-invalid-feedback>{{
                            validationContext.errors[0]
                          }}</b-form-invalid-feedback>
                        </validation-provider>
                        <div class="mx-2 mb-0 h6">/</div>
                        <b-input-group-append class="w-60 input-unit">
                          <validation-provider
                            v-slot="validationContext"
                            name="unit"
                            :rules="{ required: true }"
                          >
                            <b-form-input
                              v-model.trim="form.unit"
                              :state="getValidationState(validationContext)"
                              placeholder="Unit"
                            />
                          </validation-provider>
                        </b-input-group-append>
                      </b-input-group>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group label="Net Price" class="mb-7">
                      <b-input-group class="flex-nowrap align-items-center">
                        <validation-provider
                          v-slot="validationContext"
                          name="netPrice"
                          :rules="{ required: true }"
                        >
                          <b-form-input
                            v-model="form.netPrice"
                            :number="true"
                            :state="getValidationState(validationContext)"
                            type="number"
                          />
                          <b-form-invalid-feedback>{{
                            validationContext.errors[0]
                          }}</b-form-invalid-feedback>
                        </validation-provider>
                        <div class="mx-2 mb-0 h6">/</div>
                        <b-input-group-append class="w-60 input-unit">
                          <validation-provider
                            v-slot="validationContext"
                            name="unit"
                            :rules="{ required: true }"
                          >
                            <b-form-input
                              v-model.trim="form.unit"
                              :state="getValidationState(validationContext)"
                              placeholder="Unit"
                            />
                          </validation-provider>
                        </b-input-group-append>
                      </b-input-group>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-form-group label="Note" class="mb-7">
                  <b-form-input v-model.trim="form.note" />
                </b-form-group>
                <label>Categories</label>
                <treeselect
                  v-model="form.serviceCategoryIds"
                  :multiple="true"
                  :options="categories"
                  :normalizer="formatCategories"
                  :flat="true"
                  :required="true"
                  class="mb-7"
                />
                <label>Destinations</label>
                <treeselect
                  v-model="form.destinationIds"
                  :multiple="true"
                  :async="true"
                  :default-options="serviceDestinations"
                  :load-options="loadDestinationOptions"
                  :normalizer="formatDestinations"
                  :flat="true"
                  :required="true"
                  class="mb-7"
                />
                <label>Providers</label>
                <treeselect
                  v-model="form.providerIds"
                  :multiple="true"
                  :default-options="serviceProviders"
                  :async="true"
                  :load-options="loadProviderOptions"
                  :normalizer="formatProviders"
                  :flat="true"
                  :required="true"
                  class="mb-7"
                />
              </b-form>
            </validation-observer>
          </div>
        </tab>
        <tab name="Step 5" desc="Gallery">
          <div class="wizard-basic-step">
            <validation-provider
              ref="formChild5"
              v-slot="validationContext"
              name="Thumbnail"
              :rules="{ image: true }"
            >
              <b-form-group label="Name" class="mb-7">
                <b-form-file
                  v-model="gallery"
                  accept="image/*"
                  :state="getValidationState(validationContext)"
                  multiple
                  @change="setGallery"
                ></b-form-file>
                <b-form-invalid-feedback>{{
                  validationContext.errors[0]
                }}</b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
            <div class="text-center">
              <b-carousel
                :interval="4000"
                class="my-5"
                controls
                indicators
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
              >
                <b-carousel-slide
                  v-for="(el, index) in previewGallery"
                  :key="index"
                  :img-src="el"
                >
                </b-carousel-slide>
              </b-carousel>
            </div>
          </div>
        </tab>
        <tab type="done">
          <div class="wizard-basic-step text-center mt-10">
            <h2 class="mb-2">Create new service</h2>
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
import Treeselect, { ASYNC_SEARCH } from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { Tab, FormWizard } from '@/components/common'
export default {
  components: { FormWizard, Tab, Treeselect },
  props: {
    processing: {
      type: Boolean,
      default: false,
    },
    service: {
      type: Object,
      default: null,
    },
    destinations: {
      type: Array,
      default: null,
    },
    categories: {
      type: Array,
      default: null,
    },
    providers: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      formatCategories(node) {
        return {
          id: node.id,
          label: node.viName,
          children: node.children,
        }
      },
      formatDestinations(node) {
        return {
          id: node.id,
          label: node.viName,
        }
      },
      formatProviders(node) {
        return {
          id: node.id,
          label: node.email,
        }
      },
      imageUrl: this.service?.thumbnail ?? '',
      file: null,
      gallery: [],
      previewGallery: this.service?.gallery ?? [],
      form: {
        enTitle: this.service?.enTitle ?? '',
        enDescription: this.service?.enDescription ?? '',
        enContent: this.service?.enContent ?? '',
        viTitle: this.service?.viTitle ?? '',
        viDescription: this.service?.viDescription ?? '',
        viContent: this.service?.viContent ?? '',
        thumbnail: this.service?.thumbnail ?? '',
        currentPrice: this.service?.currentPrice ?? 0,
        netPrice: this.service?.netPrice ?? 0,
        price: this.service?.price ?? 0,
        serviceCategoryIds:
          this.service?.serviceCategories.map((item) => item.id) ?? [],
        destinationIds: this.service?.destinations.map((item) => item.id) ?? [],
        providerIds: this.service?.providers.map((item) => item.id) ?? [],
        unit: this.service?.unit ?? '',
        note: this.service?.note ?? '',
      },
    }
  },
  computed: {
    serviceDestinations() {
      return this.service?.destinations ?? []
    },
    serviceProviders() {
      return this.service?.providers ?? []
    },
  },
  created() {
    console.log(this.service)
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
    setGallery(e) {
      const files = Object.values(e.target.files)
      files.forEach((item) => {
        this.getBase64(item, (imageUrl) => {
          this.previewGallery.push(imageUrl)
        })
      })
    },

    async loadDestinationOptions({ action, searchQuery, callback }) {
      if (action === ASYNC_SEARCH) {
        await this.$emit('loadDestinationOptions', searchQuery)
        const options = this.destinations
        callback(null, options)
      }
    },

    async loadProviderOptions({ action, searchQuery, callback }) {
      if (action === ASYNC_SEARCH) {
        await this.$emit('loadProviderOptions', searchQuery)
        const options = this.providers
        callback(null, options)
      }
    },

    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
    async validateStep1() {
      const { valid } = await this.$refs.formChild1.validate()
      return valid
    },
    validateStep2() {
      return this.$refs.formChild2.validate()
    },
    validateStep3() {
      return this.$refs.formChild3.validate()
    },
    validateStep4() {
      return this.$refs.formChild4.validate()
    },
    done() {
      this.$emit('onSubmit', this.file, this.form, this.gallery)
    },
  },
}
</script>
<style lang="scss" scoped>
.input-unit {
  ::v-deep .is-invalid {
    border-color: #dc3545;
    padding-right: 0.65rem;
  }
}
.container-categories {
  .ps {
    height: 408px;
  }
}
</style>
