<template>
  <div>
    <div>
      <breadcrumb heading="Destinations"></breadcrumb>
    </div>
    <div>
      <b-card title="Manage Services">
        <div class="mb-6 d-flex align-items-center">
          <!-- <div class="search-sm d-inline-block">
            <b-input
              v-model="searchKeyword"
              placeholder="Search"
              @keyup.enter="search"
            />
          </div> -->
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
          :items="stateService.services"
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
              <b-row class="justify-content-md-center">
                <b-col sm="10">
                  <b-carousel
                    v-model="slide"
                    :interval="4000"
                    class="my-5"
                    controls
                    indicators
                    @sliding-start="onSlideStart"
                    @sliding-end="onSlideEnd"
                  >
                    <b-carousel-slide
                      v-for="(el, index) in item.gallery"
                      :key="index"
                      :img-src="el"
                    >
                    </b-carousel-slide>
                  </b-carousel>
                </b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col sm="2" class="text-sm-right"><b>Title:</b></b-col>
                <b-col>{{
                  item.selected == 'En' ? item.enTitle : item.viTitle
                }}</b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col sm="2" class="text-sm-right"><b>Owner:</b></b-col>
                <b-col>{{ item.user.fullName }}</b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col sm="2" class="text-sm-right"
                  ><b>Current Price:</b></b-col
                >
                <b-col>{{ item.currentPrice }} / {{ item.unit }}</b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col sm="2" class="text-sm-right"><b>Net Price:</b></b-col>
                <b-col>{{ item.netPrice }} / {{ item.unit }}</b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col sm="2" class="text-sm-right"><b>Price:</b></b-col>
                <b-col>{{ item.price }} / {{ item.unit }}</b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col sm="2" class="text-sm-right"><b>Note:</b></b-col>
                <b-col>{{ item.note }}</b-col>
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
                <b-col>
                  <b-link :href="item.thumbnail">{{ item.thumbnail }}</b-link>
                </b-col>
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
          :total-rows="stateService.total"
          :per-page="stateService.query.limit"
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
      <b-modal id="modal-create" ref="modal-create" hide-footer size="lg">
        <multi-step-edit-service
          :processing="processing"
          :destinations="stateDestination.destinations"
          :categories="stateCategory.categories"
          @onSubmit="onCreate"
        ></multi-step-edit-service>
      </b-modal>
      <!-- <b-modal ref="modal-update" hide-footer size="lg">
        <multi-step-edit-destination
          :processing="processing"
          :destination="stateService.destinationSelected"
          @onSubmit="onUpdate"
        ></multi-step-edit-destination>
      </b-modal> -->
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import { fileMixin } from '@/mixins'
import { MultiStepEditService } from '@/components/uncommon'
export default {
  layout: 'admin',
  middleware: 'authenticated',
  components: {
    MultiStepEditService,
  },
  mixins: [fileMixin],
  fetch() {
    Promise.all([
      this.fetchDataServices(),
      this.fetchDataCategories(),
      this.fetchDataDestinations(),
    ]).catch((e) => {
      this.$toast.error(e)
    })
  },
  data() {
    return {
      disabled: true,
      processing: false,
      fields: [
        'select',
        { key: 'id', label: 'Index' },
        'details',
        'createdAt',
        'updatedAt',
        'action',
      ],
      searchKeyword: '',
      selected: [],
      slide: 0,
    }
  },
  computed: {
    ...mapState({
      stateService: (state) => state.service,
      stateDestination: (state) => state.destination,
      stateCategory: (state) => state.category,
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
  methods: {
    ...mapActions([
      'fetchDataServices',
      'fetchDataCategories',
      'fetchDataDestinations',
      'createService',
    ]),
    changeDetailsLanguage(item) {
      if (!item._showDetails) {
        Vue.set(item, 'selected', 'En')
      }
      Vue.set(item, '_showDetails', !item._showDetails)
    },
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
    async onCreate(thumbnail, form, gallery) {
      try {
        this.processing = true
        form.thumbnail = await this.uploadFileToS3(thumbnail, 'Thumbnail')
        form.gallery = await this.uploadFilesToS3(gallery, 'Gallery')
        this.createService(form)
      } catch (e) {
        this.$toast.error(e)
      }
    },
  },
}
</script>
