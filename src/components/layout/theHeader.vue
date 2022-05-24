<template>
  <header class="header p-3 p-mt-2 p-mb-2 flex align-items-center justify-content-between">
    <div class="flex align-items-center gap-3">
      <main-title>
        PhotosApp |
      </main-title>
      <small-title>
        share your moments
      </small-title>
    </div>
    <Button label="Submit" icon='pi pi-plus' class="p-button-raised p-button-rounded" />
  </header>
</template>
<script>
import Button from 'primevue/button'
import MainTitle from './MainTitle.vue'
import SmallTitle from './SmallTitle.vue'
export default {
  name: 'Header',
  components: { Button, MainTitle, SmallTitle }
}
</script>
