<template>
  <b-card
    :class="{
      'd-flex flex-row': true,
      active: selectedUser.includes(data.id),
    }"
    no-body
    @click.prevent="toggleItem($event, data.id)"
  >
    <div class="pl-2 d-flex flex-grow-1 min-width-zero">
      <div
        class="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
      >
        <router-link :to="`?p=${data.id}`" class="w-40 w-sm-100">
          <p class="list-item-heading mb-0 truncate">{{ data.fullName }}</p>
        </router-link>
        <p class="mb-0 text-muted text-small w-15 w-sm-100">
          {{ data.email }}
        </p>
        <p class="mb-0 text-muted text-small w-15 w-sm-100">
          {{ data.phone }}
        </p>
        <p class="mb-0 text-muted text-small w-15 w-sm-100">
          {{ data.gender }}
        </p>
        <p class="mb-0 text-muted text-small w-15 w-sm-100">
          {{ moment(data.createdAt).format('YYYY-MM-DD') }}
        </p>
        <div class="w-15 w-sm-100">
          <b-badge pill :variant="data.statusColor">{{ data.status }}</b-badge>
        </div>
        <div class="w-15 w-sm-100">
          <b-button
            variant="outline-main-color"
            size="sm"
            @click="fillDataFormEditUser(data.id)"
            >Edit</b-button
          >
        </div>
      </div>
      <div class="custom-control custom-checkbox pl-1 align-self-center pr-4">
        <b-form-checkbox
          :checked="selectedUser.includes(data.id)"
          class="itemCheck mb-0"
        />
      </div>
    </div>
    <div>
      <b-modal ref="modal-edit" :title="`Edit User`" hide-footer scrollable>
        <FormEditUsers
          :user="data"
          :roles="roles"
          @submit-form-edit="submitFormEdit"
        ></FormEditUsers>
      </b-modal>
    </div>
  </b-card>
</template>

<script>
import { FormEditUsers } from '@/components/uncommon'
import { mapActions, mapGetters } from 'vuex'

import moment from 'moment'
export default {
  components: {
    FormEditUsers,
  },
  props: ['data', 'selectedUser'],
  data() {
    return {
      moment,
    }
  },
  computed: {
    ...mapGetters({
      roles: 'roles',
    }),
  },
  methods: {
    ...mapActions(['fetchDataRoles', 'editUser']),
    toggleItem(event, itemId) {
      this.$emit('toggle-item', event, itemId)
    },
    fillDataFormEditUser(id) {
      this.$refs['modal-edit'].show()
    },
    async submitFormEdit() {
      try {
        console.log('Edit user clicked - Edit User: ', this.data)
        await this.editUser(this.data)
      } catch (e) {
        this.$notify({
          group: 'error',
          type: 'error',
          title: 'Add error',
          text: e,
          duration: 10000,
        })
      }
    },
  },
}
</script>
