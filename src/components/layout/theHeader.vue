<template>
<div>
  <header class="header p-3 p-mt-2 p-mb-2 flex align-items-center justify-content-between border-bottom-2 surface-border mb-3">
    <div class="flex align-items-center gap-3">
      <main-title>
       <router-link to="/">PhotosApp</router-link> |
      </main-title>
      <small-title>
        share your moments
      </small-title>
    </div>
    <Button label="Submit" icon='pi pi-plus' class="p-button-raised p-button-rounded" />
  </header>
   <categories-list />
  </div>
</template>
<script>
import Button from 'primevue/button'
import MainTitle from './MainTitle.vue'
import SmallTitle from './SmallTitle.vue'
import CategoriesList from '../features/CategoriesList.vue'
export default {
  name: 'Header',
  components: { Button, MainTitle, SmallTitle, CategoriesList }
}
</script>
