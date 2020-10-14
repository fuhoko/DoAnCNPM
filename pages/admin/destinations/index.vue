<template>
  <div>
    <div>
      <breadcrumb heading="Destination"></breadcrumb>
    </div>
    <div>
      <b-card title="Table Destination">
        <div class="mb-6 d-flex align-items-center">
          <div class="search-sm d-inline-block">
            <b-input
              v-model="searchKeyword"
              placeholder="Search"
              @keyup.enter="search"
            />
          </div>
          <div class="ml-auto">
            <b-button
              v-b-modal.modal-create
              size="sm"
              variant="outline-main-color"
              class="mr-2"
            >
              <span class="label"
                ><b-icon
                  icon="plus"
                  font-scale="1.5"
                  class="mr-1"
                />Create</span
              >
            </b-button>
            <b-button
              size="sm"
              :class="{
                'btn-multiple-state': true,
                'show-spinner': processing,
              }"
              :disabled="disabled"
              variant="danger"
              @click="onDelete()"
            >
              <span class="spinner d-inline-block">
                <span class="bounce1"></span>
                <span class="bounce2"></span>
                <span class="bounce3"></span>
              </span>
              <span class="label"
                ><b-icon
                  icon="trash"
                  font-scale="1.5"
                  class="mr-1"
                />Delete</span
              >
            </b-button>
          </div>
        </div>
        <b-table
          head-variant="light"
          responsive
          :busy="$fetchState.pending"
          :items="stateDestination.destinations"
          :fields="fields"
          primary-key="id"
        >
          <template v-slot:cell(select)="{ item }">
            <b-form-checkbox
              :checked="selected.includes(item.id)"
              @change="
                (checked) => {
                  toggleSelection(item.id, checked)
                }
              "
            />
          </template>
          <template v-slot:cell(details)="{ item, detailsShowing }">
            <b-button
              variant="outline-main-color"
              size="sm"
              @click="changeDetailsLanguage(item)"
            >
              {{ detailsShowing ? 'Hide' : 'Show' }} details
            </b-button>
          </template>
          <template v-slot:row-details="{ item }">
            <b-card>
              <b-row class="mb-2">
                <b-col sm="2" class="text-sm-right"><b>Language:</b></b-col>
                <b-col>
                  <b-form-radio-group v-model="item.selected">
                    <b-form-radio value="En">English</b-form-radio>
                    <b-form-radio value="Vi">Vietnamese</b-form-radio>
                  </b-form-radio-group>
                </b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col sm="2" class="text-sm-right"><b>Name:</b></b-col>
                <b-col>{{
                  item.selected == 'En' ? item.enName : item.viName
                }}</b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col sm="2" class="text-sm-right"><b>Address:</b></b-col>
                <b-col>{{ item.address }}</b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col sm="2" class="text-sm-right"><b>Owner:</b></b-col>
                <b-col>{{ item.userId }}</b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col sm="2" class="text-sm-right"><b>Content:</b></b-col>
                <b-col
                  ><span
                    v-html="
                      item.selected == 'En'
                        ? $options.filters.sanitize(item.enContent)
                        : $options.filters.sanitize(item.viContent)
                    "
                  ></span
                ></b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col sm="2" class="text-sm-right"><b>Description:</b></b-col>
                <b-col>{{
                  item.selected == 'En'
                    ? item.enDescription
                    : item.viDescription
                }}</b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col sm="2" class="text-sm-right"><b>Slug:</b></b-col>
                <b-col>{{
                  item.selected == 'En' ? item.enSlug : item.viSlug
                }}</b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col sm="2" class="text-sm-right"><b>Thumbnail:</b></b-col>
                <b-col>{{ item.thumbnail }}</b-col>
              </b-row>
            </b-card>
          </template>
          <template v-slot:cell(createdAt)="{ value }">
            {{ value | formatDate }}
          </template>
          <template v-slot:cell(updatedAt)="{ value }">
            {{ value | formatDate }}
          </template>
          <template v-slot:cell(location)="{ item }">
            <b-button
              v-b-modal.modal-map
              variant="outline-main-color"
              size="sm"
              @click="showLocationOnMap(item.latitude, item.longitude)"
              >Show on map</b-button
            >
          </template>
          <template v-slot:table-busy>
            <div class="text-center text-main-color my-2">
              <b-spinner class="align-middle"></b-spinner>
            </div>
          </template>
          <template v-slot:cell(action)="{ item }">
            <b-button
              variant="outline-main-color"
              size="sm"
              @click="fillFormEditDestination(item.id)"
              >Edit</b-button
            >
          </template>
        </b-table>
        <b-pagination
          v-if="!$fetchState.pending"
          v-model="currentPage"
          size="sm"
          align="center"
          :total-rows="stateDestination.total"
          :per-page="stateDestination.query.limit"
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
      <b-modal ref="modal-map" hide-footer size="xl">
        <google-map
          :lat="location.latitude"
          :lng="location.longitude"
        ></google-map>
      </b-modal>
    </div>
    <div>
      <b-modal id="modal-create" ref="modal-create" hide-footer size="lg">
        <multi-step-edit-destination
          :processing="processing"
          @onSubmit="onCreate"
        ></multi-step-edit-destination>
      </b-modal>
      <b-modal ref="modal-update" hide-footer size="lg">
        <multi-step-edit-destination
          :processing="processing"
          :destination="stateDestination.destinationSelected"
          @onSubmit="onUpdate"
        ></multi-step-edit-destination>
      </b-modal>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapMutations, mapState } from 'vuex'
import { GoogleMap } from '@/components/common'
import { MultiStepEditDestination } from '@/components/uncommon'
import { fileMixin } from '@/mixins'
export default {
  layout: 'admin',
  middleware: 'authenticated',
  components: {
    GoogleMap,
    MultiStepEditDestination,
  },
  mixins: [fileMixin],
  async fetch() {
    try {
      this.setDestinationQuery(this.$route.query)
      await this.fetchDataDestinations()
    } catch (e) {
      this.$toast.error(e)
    }
  },
  data() {
    return {
      processing: false,
      disabled: true,
      location: {
        latitude: '',
        longitude: '',
      },
      fields: [
        'select',
        { key: 'id', label: 'Index' },
        'details',
        'location',
        'createdAt',
        'updatedAt',
        'action',
      ],
      searchKeyword: '',
      selected: [],
    }
  },
  computed: {
    ...mapState({
      stateDestination: (state) => state.destination,
    }),
    currentPage: {
      get() {
        if (this.$route.query.page) return this.$route.query.page
        else return 1
      },
      set(val) {
        this.$router.push({ query: { s: this.searchKeyword, page: val } })
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
  created() {
    this.searchKeyword = this.$route.query.s
  },
  methods: {
    ...mapActions([
      'fetchDataDestinations',
      'getDataDestinationSelected',
      'createDestination',
      'updateDestination',
      'deleteDestination',
    ]),
    ...mapMutations({
      setDestinationQuery: 'SET_DESTINATION_QUERY',
    }),
    changeDetailsLanguage(item) {
      if (!item._showDetails) {
        Vue.set(item, 'selected', 'En')
      }
      Vue.set(item, '_showDetails', !item._showDetails)
    },

    showLocationOnMap(latitude, longitude) {
      this.location.latitude = latitude
      this.location.longitude = longitude
      this.$refs['modal-map'].show()
    },

    search() {
      this.$router.push({ query: { s: this.searchKeyword } })
    },

    async onCreate(file, formDestination) {
      try {
        this.processing = true
        formDestination.thumbnail = await this.uploadFileToS3(
          file,
          'Destinations'
        )
        await this.createDestination(formDestination)
        this.$refs['modal-create'].hide()
        this.$fetch()
        this.$toast.success('Create successful')
      } catch (e) {
        this.$toast.error(e)
      } finally {
        this.processing = false
      }
    },

    toggleSelection(idItem, checked) {
      if (checked) {
        this.selected.push(idItem)
      } else {
        this.selected = this.selected.filter((item) => item !== idItem)
      }
    },

    async onDelete() {
      try {
        await Promise.all(
          this.selected.map((id) => {
            this.deleteDestination(id)
          })
        )
        this.$fetch()
        this.$toast.success('Delete successful')
      } catch (e) {
        this.$toast.error(e)
      }
    },

    fillFormEditDestination(id) {
      this.getDataDestinationSelected(id)
      this.$refs['modal-update'].show()
    },

    async onUpdate(file, formDestination) {
      try {
        this.processing = true
        if (file) {
          this.$fileApi.put(formDestination.thumbnail, file)
        }
        await this.updateDestination(formDestination)
        this.$refs['modal-update'].hide()
        this.$fetch()
        this.$toast.success('Update successful')
      } catch (e) {
        this.$toast.error(e)
      } finally {
        this.processing = false
      }
    },
  },
}
</script>
