<template>
  <header class="m-3">
    <page-title>
      Category {{  $route.params.category }}
    </page-title>
    <photos-catalog :category="$route.params.category" />
    <!-- <router-view></router-view> -->
  </header>
</template>

<script>
import PhotosCatalog from '../components/features/PhotosCatalog.vue'
import PageTitle from '../components/layout/PageTitle.vue'

export default {
  components: { PageTitle, PhotosCatalog },
  name: 'CategoryPhotosPage'
}
</script>
