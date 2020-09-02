<template>
  <div>
    <sidebar-menu
      :menu="menuItems"
      theme="white-theme"
      width="320px"
      :hide-toggle="true"
    >
      <span slot="toggle-icon">
        <b-icon icon="arrow-left-right" scale="1.4"></b-icon>
      </span>
    </sidebar-menu>
  </div>
</template>

<script>
import menuItems from '@/constants/menu.js'
export default {
  data() {
    return {
      menuItems,
    }
  },
}
</script>
