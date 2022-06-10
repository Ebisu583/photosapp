<template>
<div>
  <form class="grid p-5" @submit.prevent="handleSubmit">
    <div class="col">
<small-title>Add photo</small-title>
      <!-- title -->
      <div class="field">
        <label class="block">Title</label>
        <input-text
          type="text"
          v-model="form.title" />
      </div>

      <!-- author -->
      <div class="field">
        <label class="block">Author</label>
        <input-text
          type="text"
          v-model="form.author" />
      </div>

      <!-- category -->
      <div class="field">
        <label class="block">Category</label>
        <listbox
          v-model="form.category"
          :options="categories" />
      </div>

      <!-- description -->
      <div class="field">
        <label class="block">Description</label>
        <Textarea
          rows="5"
          cols="30"
          v-model="form.description" />
      </div>

      <Button
        class="p-button-rounded p-button-success"
        type="submit"
        label="Add"
        icon="pi pi-plus" />

    </div>
    <div class="col">
      <image-upload @choose="chooseFile"/>
    </div>
  </form>
  <Message severity="success" v-if="isSuccess">Success</Message>
  <Message severity="error" v-if="isError">Error</Message>
  </div>
</template>
<script>
import InputText from 'primevue/inputtext'
import Listbox from 'primevue/listbox'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import SmallTitle from '../layout/SmallTitle.vue'
import ImageUpload from '../shared/ImageUpload.vue'
import Message from 'primevue/message'
import axios from 'axios'
import { apiUrl } from '../../config'
export default {
  name: 'AddPhotoForm',
  components: { InputText, Listbox, Textarea, Button, SmallTitle, ImageUpload, Message },
  data: () => ({
    form: {
      title: '',
      author: '',
      description: '',
      category: '',
      file: null
    },
    isSuccess: false,
    isError: false,
    categories: ['Casual', 'Fashion']
  }),
  methods: {
    chooseFile (file) {
      console.log(file)
      this.form.file = file
    },
    async handleSubmit () {
      const formData = new FormData()
      formData.append('title', this.form.title)
      formData.append('author', this.form.author)
      formData.append('category', this.form.category)
      formData.append('description', this.form.description)
      formData.append('file', this.form.file)
      this.isSuccess = false
      this.isError = false
      try {
        const result = await axios.post(`${apiUrl}/photos`, formData, {
          'Content-Type': 'multipart/form-data'
        })
        console.log(result)
        this.isSuccess = true
      } catch {
        this.isError = true
      }
    }
  }
}
</script>
