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
import { mapState, mapActions } from 'vuex'
import PhotosList from '../shared/PhotosList'
import ProgressSpinner from 'primevue/progressspinner'
export default {
  name: 'PhotosCatalog',
  data () {
    return {
      currentPage: 1
    }
  },
  components: { PhotosList, ProgressSpinner },
  props: {
    category: {
      type: String
    }
  },
  computed: {
    ...mapState('Photos', ['photos', 'request'])
  },
  methods: {
    ...mapActions('Photos', ['fetchPhotos', 'fetchCategoryPhotos', 'addVote']),
    loadPhotos () {
      this.currentPage += 1
      if (!this.category) this.fetchPhotos(this.currentPage)
      else this.fetchCategoryPhotos({ category: this.category, page: this.currentPage })
    },
    prepareScroll () {
      this.$refs.catalog.addEventListener('scroll', () => { this.handleScroll() })
    },
    handleScroll () {
      const elem = this.$refs.catalog
      const bottomOfWindow = Math.ceil(elem.scrollTop) >= (elem.scrollHeight - elem.offsetHeight)

      if (bottomOfWindow) this.loadPhotos()
    }
  },
  created () {
    if (!this.category) this.fetchPhotos(1)
    else this.fetchCategoryPhotos({ category: this.category, page: 1 })
  },
  mounted () {
    this.prepareScroll()
  }
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
