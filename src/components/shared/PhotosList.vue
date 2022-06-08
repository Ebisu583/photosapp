<template>
  <div class="grid">
    <photo-summary v-for="photo in photos" :key="photo._id" :photo="photo" @vote="upVote"/>
  </div>
</template>

<script>
import PhotoSummary from '../shared/PhotoSummary'
export default {
  name: 'PhotosList',
  components: { PhotoSummary },
  props: {
    photos: {
      type: Array
    }
  },
  methods: {
    upVote (id) {
      this.$emit('vote', id)
    }
  }
}
</script>
