<template>
  <div class="photolist" ref='catalog'>
    <div
      class="loader"
      v-show="request.pending">
      <progress-spinner />
    </div>
    <photos-list
      :photos="photos" @vote="addVote" />
  </div>
</template>

<script>
import { useStore } from 'vuex'
import PhotosList from '../shared/PhotosList'
import ProgressSpinner from 'primevue/progressspinner'
import { ref, onMounted, computed } from 'vue'

export default {
  name: 'PhotosCatalog',
  props: {
    category: {
      type: String
    }
  },
  setup (props) {
    const currentPage = ref(1)
    const catalog = ref(null)
    const store = useStore()
    const photos = computed(() => store.state.Photos.photos)
    const request = computed(() => store.state.Photos.request)
    const fetchPhotos = (options) => store.dispatch('Photos/fetchPhotos', options)
    const fetchCategoryPhotos = (options) => store.dispatch('Photos/fetchCategoryPhotos', options)
    const addVote = () => store.dispatch('Photos/addVote')
    const loadPhotos = () => {
      currentPage.value += 1
      if (!props.category) fetchPhotos(currentPage)
      else fetchCategoryPhotos({ category: props.category, page: currentPage })
    }
    const prepareScroll = () => {
      catalog.value.addEventListener('scroll', () => { handleScroll() })
    }
    const handleScroll = () => {
      const elem = catalog
      const bottomOfWindow = Math.ceil(elem.scrollTop) >= (elem.scrollHeight - elem.offsetHeight)

      if (bottomOfWindow) loadPhotos()
    }
    if (!props.category) fetchPhotos(1)
    else fetchCategoryPhotos({ category: props.category, page: 1 })
    onMounted(() => {
      prepareScroll()
    })
    return {
      photos,
      request,
      catalog,
      addVote
    }
  },
  components: { PhotosList, ProgressSpinner }
}
</script>
<style lang='scss' scoped>
.photolist {
  height: 1200px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 15px;
}
.loader {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
