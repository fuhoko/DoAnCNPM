<template>
  <div>
    <div>
      <breadcrumb heading="Destination"></breadcrumb>
    </div>
    <div>
      <!-- <b-card class="mb-4" title="Table Destination">
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
      </b-card> -->
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
}
</script>
