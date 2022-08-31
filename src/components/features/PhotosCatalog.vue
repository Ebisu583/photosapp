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
import { ref, onMounted } from 'vue'

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
    const photos = store.state.Photos.photos
    const request = store.state.Photos.request
    // const fetchPhotos = store.dispatch('Photos/fetchPhotos')
    // const fetchCategoryPhotos = store.dispatch('Photos/fetchCategoryPhotos')
    const addVote = store.dispatch('Photos/addVote')
    const loadPhotos = () => {
      currentPage.value += 1
      if (!props.category) store.dispatch('Photos/fetchPhotos', currentPage)
      else store.dispatch('Photos/fetchPhotos', { category: props.category, page: currentPage })
    }
    const prepareScroll = () => {
      catalog.value.addEventListener('scroll', () => { handleScroll() })
    }
    const handleScroll = () => {
      const elem = catalog
      const bottomOfWindow = Math.ceil(elem.scrollTop) >= (elem.scrollHeight - elem.offsetHeight)

      if (bottomOfWindow) loadPhotos()
    }
    if (!props.category) store.dispatch('Photos/fetchPhotos', 1)
    else store.dispatch('Photos/fetchCategoryPhotos', { category: props.category, page: 1 })
    onMounted(() => {
      console.log(catalog.value)
      prepareScroll()
    })
    return {
      currentPage,
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
