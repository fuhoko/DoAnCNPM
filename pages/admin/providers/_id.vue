<template>
  <div>
    <div>
      <breadcrumb heading="Providers"></breadcrumb>
    </div>
    <div v-if="is_data_fetched">
      <b-row>
        <b-col xxs="12" lg="5" xl="4" class="col-left">
          <b-card class="mb-4" no-body>
            <b-card-body>
              <b-img :src="stateProviders.provider.avatar" center />
              <div class="text-center pt-4">
                <p class="list-item-heading pt-2">
                  {{ stateProviders.provider.name }}
                </p>
                <b-button
                  size="sm"
                  variant="outline-main-color"
                  @click="fillDataFormEditProvider(stateProviders.provider.id)"
                >
                  <b-icon icon="pencil" aria-hidden="true"></b-icon> Edit
                  Profile
                </b-button>
              </div>
              <p class="text-muted text-small mb-2">
                Gender
              </p>
              <p class="mb-3">{{ stateProviders.provider.gender }}</p>
              <p class="text-muted text-small mb-2">
                Birthday
              </p>
              <p class="mb-3">
                {{
                  moment(stateProviders.provider.birthday).format('DD-MM-YYYY')
                }}
              </p>
              <p class="text-muted text-small mb-2">
                Email
              </p>
              <p class="mb-3">{{ stateProviders.provider.email }}</p>
              <p class="text-muted text-small mb-2">
                Phone
              </p>
              <p class="mb-3">{{ stateProviders.provider.phone }}</p>
              <p class="text-muted text-small mb-2">Contact</p>
            </b-card-body>
          </b-card>
        </b-col>
        <b-col xxs="12" lg="7" xl="8" class="col-right">
          <b-card no-body>
            <b-card-body>
              <div class="pt-4">
                <p class="text-muted text-small mb-2">
                  Created At
                </p>
                <p class="mb-3">
                  {{
                    moment(stateProviders.provider.createdAt).format(
                      'DD-MM-YYYY'
                    )
                  }}
                </p>
                <p class="text-muted text-small mb-2">
                  Updated At
                </p>
                <p class="mb-3">
                  {{
                    moment(stateProviders.provider.updatedAt).format(
                      'DD-MM-YYYY'
                    )
                  }}
                </p>
              </div>
            </b-card-body>
          </b-card>
          <div class="separator mb-5" />
          <b-card no-body>
            <b-card-body>
              <div class="pt-4">
                <p class="text-muted text-small mb-2">
                  Note
                </p>
                <p class="mb-3">{{ stateProviders.provider.note }}</p>
              </div>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
      <div>
        <b-modal
          ref="modal-edit"
          no-close-on-backdrop
          no-close-on-esc
          :title="`Edit Provider`"
          hide-footer
          scrollable
        >
          <FormEditProviders
            :provider="stateProviders.provider"
            :processing="processing"
            no-close-on-backdrop
            @hide-modal="hideModal"
            @submit-form-edit="submitFormEdit"
          ></FormEditProviders>
        </b-modal>
      </div>
    </div>
    <div>
      <notifications group="notify" position="top center" />
      <notifications group="error" position="top center" />
    </div>
  </div>
</template>

<script>
import { Breadcrumb } from '@/components/common'
import { FormEditProviders } from '@/components/uncommon/Providers'

import { mapActions, mapMutations, mapState } from 'vuex'
import moment from 'moment'

export default {
  layout: 'admin',
  components: {
    Breadcrumb,
    FormEditProviders,
  },
  async fetch() {
    this.setProviderQuery(this.$route.query)
    await this.fetchDataProvider(this.$route.params.id)
    this.is_data_fetched = true
  },
  data() {
    return {
      moment,
      is_data_fetched: false,
      processing: false,
    }
  },
  computed: {
    ...mapState({
      stateProviders: (state) => state.providers,
    }),
  },
  watch: {
    $route() {
      this.$fetch()
    },
  },
  methods: {
    ...mapActions([
      'fetchDataProvider',
      'setDataProviderSelected',
      'editProvider',
    ]),
    ...mapMutations({
      setProviderQuery: 'SET_PROVIDER_QUERY',
    }),
    async submitFormEdit(form) {
      try {
        this.processing = true
        console.log('Edit provider clicked - Edit provider: ', form)
        await this.editProvider(form)
        this.$fetch()
        this.$refs['modal-edit'].hide()
        this.$notify({
          group: 'notify',
          type: 'success',
          title: 'Edit status',
          text: 'Edit provider successfully',
          duration: 10000,
        })
      } catch (e) {
        this.$notify({
          group: 'error',
          type: 'error',
          title: 'Edit error',
          text: e,
          duration: 10000,
        })
      }
    },
    fillDataFormEditProvider(id) {
      this.$refs['modal-edit'].show()
    },
    hideModal() {
      this.$refs['modal-edit'].hide()
    },
  },
}
</script>

<style></style>
