<template>
  <div>
    <div class="dialog">
      <div class="dialog-frame">
      <Card class="card">
    <template #header>
      <div class="layer" @click="$emit('vote', singlePhoto._id)"></div>
      <span class="star">{{ singlePhoto.votes }} <i class="pi pi-star"></i></span>
        <img alt="user header" :src="singlePhotoUrl">
    </template>
    <template #title>
      <router-link :to="`/${singlePhoto._id}`" class="link">
      </router-link>
      {{ singlePhoto.title }}
    </template>
    <template #content>
     by {{ singlePhoto.author }}
     <p>
     {{ singlePhoto.description }}
     </p>
    </template>
    <template #footer>
        <Button icon="pi pi-bookmark" :label="singlePhoto.category" class="p-button-outlined p-button-rounded" />
    </template>
  </Card>
        <Button
          class="p-button-rounded"
          label="Close"
          icon="pi pi-times"
          @click="$router.push('/')"
          autofocus />
      </div>
    </div>
  </div>
</template>

<script>
import Button from 'primevue/button'
import { mapActions, mapState } from 'vuex'
import Card from 'primevue/card'
import { imagesUrl } from '../../config'

export default {
  name: 'SinglePhoto',
  data () {
    return {
      visible: true,
      imagesUrl: imagesUrl
    }
  },
  computed: {
    photoId () {
      return this.$route.params.photoId
    },
    singlePhotoUrl () {
      return this.imagesUrl + '/' + this.singlePhoto.src
    },
    ...mapState('Photos', ['singlePhoto'])
  },
  methods: {
    ...mapActions('Photos', ['fetchPhoto'])
  },
  components: { Button, Card },
  created () {
    this.fetchPhoto(this.photoId)
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  position:fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display:flex;
  justify-content: center;
  align-items: center;
  pointer-events: auto;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.4);
}

.dialog-frame {
  background-color: white;
  padding: 24px;
}
img {
  height: 400px;
  width: 100%;
  object-fit: cover;
}
.star {
  position: absolute;
  right: 16px;
  top: 16px;
  color: white;
  font-size: 24px;
}
.card {
  position: relative;
}
</style>
