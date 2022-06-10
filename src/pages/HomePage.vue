<template>
<div>
  <router-view v-slot="{ Component }">
    <SlideFadeAnimation>
      <component :is="Component" :key="$route.fullPath" />
    </SlideFadeAnimation>
  </router-view>
  <header class="m-3">
    <page-title>
      Photos
    </page-title>
    <photos-catalog />
  </header>
</div>
</template>

<script>
import PhotosCatalog from '../components/features/PhotosCatalog.vue'
import PageTitle from '../components/layout/PageTitle.vue'

export default {
  components: { PageTitle, PhotosCatalog },
  name: 'HomePage'
}
</script>
