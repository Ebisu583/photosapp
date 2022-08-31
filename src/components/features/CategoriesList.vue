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
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name: 'CategoriesList',
  components: { Button },
  setup (props, context) {
    const store = useStore()
    const categories = computed(() => store.state.Categories.categories)
    const categoryUrl = (category) => `/photos/${category}`
    return {
      categories,
      categoryUrl
    }
  }
}
</script>
