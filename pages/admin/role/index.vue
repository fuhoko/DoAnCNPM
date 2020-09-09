<template>
  <div>
    <div>
      <breadcrumb heading="Role"></breadcrumb>
    </div>
    <div>
      <b-card class="mb-4" title="Table Role">
        <div class="float-right mb-4">
          <b-button
            v-b-modal.modal-create
            size="lg"
            variant="outline-main-color"
            class="mr-2"
          >
            <span class="label"
              ><b-icon icon="plus" font-scale="1.5" class="mr-1" />Create</span
            >
          </b-button>
          <b-button
            size="lg"
            :class="{
              'btn-multiple-state': true,
              'show-spinner': processing,
            }"
            :disabled="disabled"
            variant="outline-danger"
            @click="onDeleteRole()"
          >
            <span class="spinner d-inline-block">
              <span class="bounce1"></span>
              <span class="bounce2"></span>
              <span class="bounce3"></span>
            </span>
            <span class="label"
              ><b-icon icon="trash" font-scale="1.5" class="mr-1" />Delete</span
            >
          </b-button>
        </div>
        <b-table
          head-variant="light"
          responsive
          :busy="$fetchState.pending"
          :items="stateRole.roles"
          :fields="fields"
          primary-key="id"
        >
          <template v-slot:cell(select)="{ item }">
            <b-form-checkbox
              @change="
                (checked) => {
                  toggleItem(item.id, checked)
                }
              "
            />
          </template>
          <template v-slot:cell(createdAt)="data">
            {{ data.value | formatDate }}
          </template>
          <template v-slot:cell(updatedAt)="data">
            {{ data.value | formatDate }}
          </template>
          <template v-slot:cell(action)="{ item }">
            <b-button
              variant="outline-main-color"
              size="lg"
              @click="fillDataFormEditRole(item.id)"
              >Edit</b-button
            >
          </template>
          <template v-slot:table-busy>
            <div class="text-center text-main-color my-2">
              <b-spinner class="align-middle"></b-spinner>
            </div>
          </template>
        </b-table>
        <b-pagination
          v-model="currentPage"
          size="sm"
          align="center"
          :total-rows="stateRole.roleTotal"
        >
          <template v-slot:next-text>
            <b-icon icon="chevron-right" />
          </template>
          <template v-slot:prev-text>
            <b-icon icon="chevron-left" />
          </template>
          <template v-slot:first-text>
            <b-icon icon="chevron-bar-left" />
          </template>
          <template v-slot:last-text>
            <b-icon icon="chevron-bar-right" />
          </template>
        </b-pagination>
      </b-card>
    </div>
    <div>
      <b-modal ref="modal-edit" scrollable hide-footer>
        <FormEditRole
          action="Update"
          :role="stateRole.roleSelected"
          :permissions="statePermission.permissions"
          :submit-form-edit="onUpdateRole"
          :processing="processing"
        ></FormEditRole>
      </b-modal>
    </div>
    <div>
      <b-modal id="modal-create" ref="modal-create" scrollable hide-footer>
        <FormEditRole
          action="Create"
          :permissions="statePermission.permissions"
          :submit-form-edit="onCreateRole"
          :processing="processing"
        ></FormEditRole>
      </b-modal>
    </div>
    <div>
      <notifications group="notify" />
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { Breadcrumb } from '@/components/common'
import { FormEditRole } from '@/components/uncommon/Role'
export default {
  layout: 'admin',
  components: {
    Breadcrumb,
    FormEditRole,
  },
  async fetch() {
    this.setRoleQuery(this.$route.query)
    await this.fetchDataRoles()
    await this.fetchDataPermissions()
  },
  data() {
    return {
      processing: false,
      selected: [],
      disabled: true,
      fields: [
        'select',
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
    ...mapState({
      stateRole: (state) => state.role,
      statePermission: (state) => state.permission,
    }),
    currentPage: {
      get() {
        if (this.$route.query.page) return this.$route.query.page
        else return 1
      },
      set(val) {
        this.$route.query.page = val
      },
    },
  },
  watch: {
    $route() {
      this.$fetch()
    },
    selected(val) {
      if (val.length > 0) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
  },
  methods: {
    ...mapActions([
      'fetchDataRoles',
      'fetchDataPermissions',
      'setDataRoleSelected',
      'createRole',
      'updateRole',
      'deleteRole',
    ]),
    ...mapMutations({
      setRoleQuery: 'SET_ROLE_QUERY',
    }),

    async onCreateRole(payload) {
      try {
        this.processing = true
        await this.createRole(payload)
        this.$refs['modal-create'].hide()
        this.$fetch()
        this.$notify({
          group: 'notify',
          type: 'success',
          title: 'Edit status',
          text: 'Create role successfully',
        })
      } catch (e) {
        this.$notify({
          group: 'notify',
          type: 'error',
          title: 'Edit status',
          text: e,
        })
      } finally {
        this.processing = false
      }
    },

    toggleItem(idItem, checked) {
      if (checked) {
        this.selected.push(idItem)
      } else {
        this.selected = this.selected.filter((item) => item !== idItem)
      }
    },

    async onDeleteRole() {
      try {
        this.processing = true
        await this.deleteRole(this.selected)
        this.selected = 0
        this.$fetch()
        this.$notify({
          group: 'notify',
          type: 'success',
          title: 'Edit status',
          text: 'Delete roles successfully',
        })
      } catch (e) {
        this.$notify({
          group: 'notify',
          type: 'error',
          title: 'Edit status',
          text: e,
        })
      } finally {
        this.processing = false
      }
    },

    async fillDataFormEditRole(idItem) {
      await this.setDataRoleSelected(idItem)
      this.$refs['modal-edit'].show()
    },

    async onUpdateRole(payload) {
      try {
        this.processing = true
        await this.updateRole(payload)
        this.$refs['modal-edit'].hide()
        this.$fetch()
        this.$notify({
          group: 'notify',
          type: 'success',
          title: 'Edit status',
          text: 'Edit successfully',
        })
      } catch (e) {
        this.$notify({
          group: 'notify',
          type: 'error',
          title: 'Edit status',
          text: e,
        })
      } finally {
        this.processing = false
      }
    },
  },
}
</script>
