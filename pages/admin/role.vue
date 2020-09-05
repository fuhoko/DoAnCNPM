<template>
  <div>
    <div>
      <breadcrumb heading="Role"></breadcrumb>
    </div>
    <div>
      <b-card class="mb-4" title="Table Role">
        <b-table
          head-variant="light"
          responsive
          :items="roles"
          :fields="fields"
          primary-key="id"
        >
          <template v-slot:cell(createdAt)="data">
            {{ moment(data.value).format('YYYY-MM-DD') }}
          </template>
          <template v-slot:cell(updatedAt)="data">
            {{ moment(data.value).format('YYYY-MM-DD') }}
          </template>
          <template v-slot:cell(action)="{ item }">
            <b-button
              variant="outline-main-color"
              size="lg"
              @click="fillDataFormEditRole(item.id)"
              >Edit</b-button
            >
          </template>
        </b-table>
      </b-card>
    </div>
    <div>
      <b-modal ref="modal-edit" scrollable>
        <FormEditRole
          :role="roleSelected"
          :permissions="permissions"
        ></FormEditRole>
        <client-only>
          <infinite-loading
            ref="infiniteLoading"
            spinner="spiral"
            @infinite="loadMorePermissions"
          >
            <span slot="no-more"></span>
          </infinite-loading>
        </client-only>
      </b-modal>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'
import { Breadcrumb } from '@/components/common'
import { FormEditRole } from '@/components/uncommon/Role'
export default {
  layout: 'admin',
  components: {
    Breadcrumb,
    FormEditRole,
  },
  fetch() {
    this.fetchDataRoles()
    this.fetchDataPermissions()
  },
  data() {
    return {
      moment,
      fields: [
        'id',
        'name',
        'description',
        'createdAt',
        'updatedAt',
        'deletedAt',
        'action',
      ],
    }
  },
  computed: {
    ...mapGetters({
      roles: 'roles',
      roleSelected: 'roleSelected',
      permissions: 'permissions',
      permissionTotal: 'permissionTotal',
    }),
  },
  methods: {
    ...mapActions([
      'fetchDataRoles',
      'fetchDataPermissions',
      'setDataRoleSelected',
    ]),
    async fillDataFormEditRole(id) {
      await this.setDataRoleSelected(id)
      this.$refs['modal-edit'].show()
    },

    async loadMorePermissions($state) {
      try {
        await this.fetchDataPermissions()
        if (this.permissions.length < this.permissionTotal) {
          $state.loaded()
        } else {
          $state.complete()
        }
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>
