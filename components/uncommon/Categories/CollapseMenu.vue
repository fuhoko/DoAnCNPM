<template>
  <div>
    <div v-for="(item, index) in items" :key="index" class="border mt-2">
      <div v-b-toggle="'' + item.id" class="d-flex align-items-center">
        <b-icon-pencil class="ml-2" :style="indent" />
        <b-button variant="link" class="text-left text-decoration-none"
          >{{ language === 'En' ? item.enName : item.viName }}
        </b-button>
        <b-icon-chevron-right
          v-if="item.children.length > 0 && depth === 0"
          class="icon-chevron mr-5 ml-auto"
          variant="main-color"
          scale="1.2"
        />
      </div>
      <b-collapse :id="'' + item.id">
        <collapse-menu
          :items="item.children"
          :depth="depth + 1"
          :parent-id="item.id"
        />
      </b-collapse>
    </div>
    <div class="border mt-2 d-flex align-items-center">
      <b-button
        v-if="!visibleFormAdd"
        :style="indent"
        variant="link"
        class="w-100 text-left text-decoration-none"
        @click="() => (visibleFormAdd = !visibleFormAdd)"
        ><b-icon-plus scale="1.2" class="mr-1 align-text-top" />Add Item
      </b-button>
      <div v-else class="container-form-category d-flex align-items-center">
        <div>
          <validation-observer v-slot="{ handleSubmit }" ref="formAdd">
            <b-form
              ref="form"
              inline
              @submit.prevent="handleSubmit(() => submitFormEdit(form))"
            >
              <label class="mr-3 text-main-color">ViName</label>
              <validation-provider
                v-slot="validationContext"
                name="viName"
                :rules="{ required: true }"
              >
                <b-form-group>
                  <b-form-input
                    v-model.trim="form.viName"
                    size="sm"
                    :state="getValidationState(validationContext)"
                  />
                  <b-form-invalid-feedback>{{
                    validationContext.errors[0]
                  }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
              <label class="mr-3 ml-9 text-main-color">EnName</label>
              <validation-provider
                v-slot="validationContext"
                name="enName"
                :rules="{ required: true }"
              >
                <b-form-group>
                  <b-form-input
                    v-model.trim="form.enName"
                    size="sm"
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
        <div class="ml-auto">
          <b-button
            variant="link"
            class="text-left text-decoration-none p-0"
            @click="() => (visibleFormAdd = !visibleFormAdd)"
            >Cancel
          </b-button>
          <b-button
            variant="link"
            class="text-left text-decoration-none p-0 ml-5"
            @click="add"
            >Add
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CollapseMenu',
  props: {
    items: {
      type: Array,
      default: null,
      required: true,
    },
    depth: {
      type: Number,
      default: 0,
    },
    language: {
      type: String,
      default: 'En',
    },
    parentId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      visibleFormAdd: false,
      form: {
        enName: '',
        viName: '',
        parentId: this.parentId,
      },
    }
  },
  computed: {
    indent() {
      return { marginLeft: `${this.depth * 14}px` }
    },
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
    async add() {
      const valid = await this.$refs.formAdd.validate()
      if (valid) {
        this.$emit('onAdd', this.form)
      }
    },
  },
}
</script>
<style scoped>
.collapsed .icon-chevron {
  transition: 0.3s transform ease-in-out;
}
.not-collapsed .icon-chevron {
  transition: 0.3s transform ease-in-out;
  transform: rotate(90deg);
}
.form-control-sm {
  height: 0.6rem;
}
.container-form-category {
  width: 100%;
  padding: 0.6699rem 1.3rem 0.5199rem 1.3rem;
}
</style>
