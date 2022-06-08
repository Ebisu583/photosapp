<template>
<div class="col-12 md:col-6 lg:col-3 xl:col-2">
  <Card class="card">
    <template #header>
      <div class="layer" @click="$emit('vote', photo._id)"></div>
      <span class="star">{{ photo.votes }} <i class="pi pi-star"></i></span>
        <img alt="user header" :src="photoUrl">
    </template>
    <template #title>
      {{ photo.title }}
    </template>
    <template #content>
     by {{ photo.author }}
    </template>
    <template #footer>
        <Button icon="pi pi-bookmark" :label="photo.category" class="p-button-outlined p-button-rounded" />
    </template>
  </Card>
</div>
</template>

<script>
import Card from 'primevue/card'
import Button from 'primevue/button'
import { imagesUrl } from '../../config'

export default {
  name: 'PhotoSummary',
  components: { Card, Button },
  data () {
    return {
      imagesUrl: imagesUrl
    }
  },
  props: {
    photo: {
      type: Object
    }
  },
  computed: {
    photoUrl () {
      return this.imagesUrl + '/' + this.photo.src
    }
  }
}
</script>

<style lang='scss' scoped>
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
.layer {
  background-color: rgba(155, 89, 182, 0.3);
  position:absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  opacity: 0;
  &:hover{
    opacity: 1;
    transition: 0.3s;
  }
}
</style>
