<template>
  <div>
    <div>
      <breadcrumb heading="Customers"></breadcrumb>
    </div>
    <div>
      <b-card title="Manage Categories">
        <b-table
          :busy="$fetchState.pending"
          :items="stateCustomer.customers"
          :fields="fields"
        >
        </b-table>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  layout: 'admin',
  async fetch() {
    try {
      await this.fetchDataCustomers()
    } catch (e) {
      this.$toast.error(e)
    }
  },
  data() {
    return {
      fields: [
        'select',
        { key: 'id', label: 'Index' },
        'fullName',
        'email',
        'createdAt',
        'updatedAt',
        'action',
      ],
    }
  },
  computed: {
    ...mapState({
      stateCustomer: (state) => state.customer,
    }),
  },
  methods: {
    ...mapActions(['fetchDataCustomers']),
  },
}
</script>
