<template>
  <div>
    <router-link v-for="category in categories" :key="category" :to="categoryUrl(category.name)">
      <Button :label="category.name" icon='pi pi-plus' class="p-button-raised p-button-rounded ml-3 p-button-outlined"
      />
    </router-link>
  </div>
</template>

<script>
import Button from 'primevue/button'
import { mapState } from 'vuex'
export default {
  name: 'CategoriesList',
  components: { Button },
  computed: {
    ...mapState('Categories', ['categories'])
  },
  methods: {
    categoryUrl (category) {
      return `/photos/${category}`
    }
  }
}

</script>
