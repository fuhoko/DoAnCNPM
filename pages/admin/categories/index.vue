<template>
  <div>
    <div>
      <breadcrumb heading="Categories"></breadcrumb>
    </div>
    <div>
      <b-card title="Manage Categories">
        <div class="mb-6">
          <span sm="2" class="mr-2"><b>Language:</b></span>
          <b-form-radio-group v-model="language" class="d-inline">
            <b-form-radio value="En">English</b-form-radio>
            <b-form-radio value="Vi">Vietnamese</b-form-radio>
          </b-form-radio-group>
        </div>
        <collapse-menu
          v-if="!$fetchState.pending"
          :items="stateCategory.categories"
          :language="language"
          @onAdd="onAdd"
        />
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { CollapseMenu } from '@/components/uncommon'
export default {
  layout: 'admin',
  components: {
    CollapseMenu,
  },
  async fetch() {
    try {
      await this.fetchDataCategories()
    } catch (e) {
      this.$toast.error(e)
    }
  },
  data() {
    return {
      language: 'En',
    }
  },
  computed: {
    ...mapState({
      stateCategory: (state) => state.category,
    }),
  },
  methods: {
    ...mapActions(['fetchDataCategories']),
    onAdd(form) {
      console.log(form)
    },
  },
}
</script>
