<template>
  <b-row>
    <b-col class="disable-text-selection">
      <b-row>
        <b-col xs="12">
          <breadcrumb heading="Users"></breadcrumb>
          <div class="top-right-button-container">
            <b-button
              v-b-modal.modalright
              variant="main-color"
              size="lg"
              class="top-right-button"
            >
              ADD NEW
            </b-button>
            <b-button variant="main-color" size="lg" class="top-right-button">
              ADD MULTIPLE
            </b-button>
            <b-button-group>
              <b-dropdown
                split
                right
                class="check-button"
                variant="main-color"
                @click="selectAll(true)"
              >
                <label
                  slot="button-content"
                  class="custom-control custom-checkbox pl-4 mb-0 d-inline-block"
                >
                  <input
                    v-shortkey="{ select: ['ctrl', 'a'], undo: ['ctrl', 'd'] }"
                    class="custom-control-input"
                    type="checkbox"
                    :checked="isSelectedAll"
                    @shortkey="keymap"
                  />
                  <span
                    :class="{
                      'custom-control-label': true,
                      indeterminate: isAnyItemSelected,
                    }"
                    >&nbsp;</span
                  >
                </label>
                <b-dropdown-item> Delete </b-dropdown-item>
                <b-dropdown-item> Edit </b-dropdown-item>
              </b-dropdown>
            </b-button-group>
            <b-modal
              id="modalright"
              ref="modalright"
              :title="`Add New User`"
              modal-class="modal-right"
              hide-footer
            >
              <validation-observer v-slot="{ handleSubmit }">
                <b-form @submit.prevent="handleSubmit(submitFormAdd)">
                  <validation-provider
                    v-slot="validationContext"
                    name="E-mail"
                    :rules="{ required: true, email: true }"
                  >
                    <b-form-group :label="`Email`">
                      <b-form-input
                        v-model="newUser.email"
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
                    <b-form-group :label="`Password`">
                      <b-form-input
                        v-model="newUser.password"
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
                  <b-form-group :label="`Gender`">
                    <v-select
                      v-model="newUser.gender"
                      :options="genderChoice"
                    />
                  </b-form-group>
                  <b-form-group :label="`Full Name`">
                    <b-form-input v-model="newUser.fullName" />
                  </b-form-group>
                  <b-form-group :label="`Birthday`">
                    <b-form-datepicker
                      v-model="value"
                      class="mb-2"
                      @context="onContext"
                    ></b-form-datepicker>
                  </b-form-group>
                  <b-form-group :label="`Phone number`">
                    <b-form-input v-model="newUser.phone" />
                  </b-form-group>
                  <b-form-group :label="`Role`">
                    <b-form-select v-model="newUser.roleId" class="mb-3">
                      <b-form-select-option
                        v-for="(role, index) in stateRole.roles"
                        :id="role.id"
                        :key="index"
                        :value="role.id"
                        >{{ role.name }}</b-form-select-option
                      >
                    </b-form-select>
                  </b-form-group>
                  <b-form-group :label="`Status`">
                    <b-form-radio-group
                      v-model="newUser.status"
                      stacked
                      class="pt-2"
                      :options="statuses"
                    />
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
                        @click="hideModal('modalright')"
                      >
                        <span class="label">CANCEL</span>
                      </b-button>
                    </div>
                  </div>
                </b-form>
              </validation-observer>
            </b-modal>
          </div>
          <div class="mb-2 mt-2">
            <b-collapse id="displayOptions" class="d-md-block">
              <div class="d-block d-md-inline-block pt-1">
                <b-dropdown
                  id="ddown1"
                  :text="`${'Order by:'} ${sort.label}`"
                  variant="outline-dark"
                  class="mr-1 float-md-left btn-group"
                  size="xs"
                >
                  <b-dropdown-item
                    v-for="(order, index) in sortOptions"
                    :key="index"
                    @click="changeOrderBy(order)"
                    >{{ order.label }}</b-dropdown-item
                  >
                </b-dropdown>

                <div
                  class="search-sm d-inline-block float-md-left mr-1 align-top"
                >
                  <b-input v-model="search" :placeholder="`Search`" />
                </div>
              </div>
            </b-collapse>
          </div>
          <div class="separator mb-5" />
        </b-col>
      </b-row>

      <template>
        <b-row :key="userList">
          <b-col
            v-for="(user, index) in users"
            :id="user.id"
            :key="index"
            xs="12"
            class="mb-4"
          >
            <data-list-user
              :key="user.id"
              v-contextmenu:contextmenu
              :data="user"
              :selected-user="selectedUser"
              @toggle-item="toggleItem"
            />
          </b-col>
        </b-row>
      </template>
      <v-contextmenu ref="contextmenu" @contextmenu="handleContextmenu">
        <v-contextmenu-item @click="onContextCopy()">
          <b-icon scale="1" icon="file" />
          <span>Copy</span>
        </v-contextmenu-item>
        <v-contextmenu-item @click="onContextArchive()">
          <b-icon scale="1" icon="archive" />
          <span>Move to archive</span>
        </v-contextmenu-item>
        <v-contextmenu-item @click="onContextDelete()">
          <b-icon scale="1" icon="trash" />
          <span>Delete</span>
        </v-contextmenu-item>
      </v-contextmenu>
    </b-col>
  </b-row>
</template>

<script>
import { Breadcrumb } from '@/components/common'
import { DataListUsers } from '@/components/uncommon'

import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import moment from 'moment'

export default {
  components: {
    Breadcrumb,
    'data-list-user': DataListUsers,
  },
  fetch() {
    this.fetchDataUsers()
    this.fetchDataRoles()
  },
  data() {
    return {
      sort: {
        column: 'fullName',
        label: 'Name',
      },
      sortOptions: [
        {
          column: 'fullName',
          label: 'Name',
        },
        {
          column: 'role',
          label: 'Role',
        },
        {
          column: 'status',
          label: 'Status',
        },
      ],
      userList: 0,
      search: '',
      genderChoice: ['MALE', 'FEMALE'],
      statuses: ['ACTIVE', 'PENDING', 'INACTIVE'],
      roleId: [],
      roleName: [],
      newUser: {
        email: '',
        password: '',
        fullName: '',
        birthday: '',
        gender: '',
        phone: '',
        roleId: 0,
        status: '',
      },
      moment,
      value: '',
      selected: '',
    }
  },
  layout: 'admin',
  computed: {
    ...mapGetters({
      users: 'users',
      selectedUser: 'selectedUser',
      page: 'page',
      pageCount: 'pageCount',
      count: 'count',
      total: 'total',
      processing: 'processing',
      roleSelected: 'roleSelected',
    }),
    ...mapState({
      stateRole: (state) => state.role,
    }),
  },
  watch: {
    search() {
      this.page = 1
    },
  },
  mounted() {},
  methods: {
    ...mapActions([
      'fetchDataUsers',
      'fetchDataRoles',
      'setDataUserSelected',
      'addUser',
      'deleteUser',
    ]),
    ...mapMutations(['ADD_USER']),
    hideModal(refname) {
      this.$refs[refname].hide()
    },
    onContext(ctx) {
      this.newUser.birthday = moment(ctx.selectedYMD, moment.ISO_8601)
    },
    forceRerender() {
      this.userList += 1
    },
    changeOrderBy(sort) {
      this.sort = sort
    },
    async submitFormAdd() {
      try {
        console.log('Add user clicked - Add User: ', this.newUser)
        await this.addUser(this.newUser)
        this.ADD_USER({
          email: this.newUser.email,
          password: this.newUser.password,
          fullName: this.newUser.fullName,
          birthday: this.newUser.birthday,
          gender: this.newUser.gender,
          phone: this.newUser.phone,
          roleId: this.newUser.roleId,
          status: this.newUser.status,
        })
        this.hideModal('modalright')
        this.newUser = {
          email: '',
          password: '',
          fullName: '',
          birthday: '',
          gender: '',
          phone: '',
          roleId: 0,
          status: '',
        }
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
    selectAll(isToggle) {
      const usersForToggle = this.users
      if (this.selectedUser.length >= this.users.length) {
        if (isToggle) this.selectedUser.splice(0, this.selectedUser.length)
      } else {
        this.selectedUser.push(
          ...usersForToggle.map((user) => {
            return user.id
          })
        )
      }
    },
    isSelectedAll() {
      return this.selectedUser.length >= this.users.length
    },
    isAnyItemSelected() {
      return (
        this.selectedUser.length > 0 &&
        this.selectedUser.length < this.users.length
      )
    },
    keymap(event) {
      switch (event.srcKey) {
        case 'select':
          this.selectAll(false)
          break
        case 'undo':
          this.selectedUser.splice(0, this.selectedUser.length)
          break
      }
    },
    getIndex(value, arr, prop) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i][prop] === value) {
          return i
        }
      }
      return -1
    },
    toggleItem(event, userId) {
      if (event.shiftKey && this.selectedUser.length > 0) {
        let usersForToggle = this.users
        const start = this.getIndex(userId, usersForToggle, 'id')
        const end = this.getIndex(
          this.selectedUser[this.selectedUser.length - 1],
          usersForToggle,
          'id'
        )
        usersForToggle = usersForToggle.slice(
          Math.min(start, end),
          Math.max(start, end) + 1
        )
        this.selectedUser.push(
          ...usersForToggle.map((user) => {
            return user.id
          })
        )
      } else if (this.selectedUser.includes(userId)) {
        this.selectedUser.splice(this.selectedUser.indexOf(userId), 1)
      } else this.selectedUser.push(userId)
    },
    handleContextmenu(vnode) {
      if (!this.selectedUser.includes(vnode.key)) {
        this.selectedUser.splice(0, this.selectedUser.length)
        this.selectedUser.push(vnode.key)
      }
    },
    onContextCopy() {
      console.log('context menu item clicked - Copy Items: ', this.selectedUser)
    },
    onContextArchive() {
      console.log(
        'context menu item clicked - Move to Archive Items: ',
        this.selectedUser
      )
    },
    async onContextDelete() {
      console.log(
        'context menu item clicked - Delete Items: ',
        this.selectedUser
      )
      await this.selectedUser.forEach((id) => this.deleteUser(id))
      this.forceRerender()
      this.fetchDataUsers()
    },
    linkGen(pageNum) {
      return '#page-' + pageNum
    },
  },
}
</script>

<style scoped>
.col {
  flex-basis: auto;
  flex-grow: 1;
  max-width: 100%;
}
.v-contextmenu .v-contextmenu-item.v-contextmenu-item--hover {
  color: #212121;
  text-decoration: none;
  background-color: #46a0fc;
}
</style>
