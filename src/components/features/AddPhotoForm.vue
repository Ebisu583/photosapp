<template>
<div>
  <Form class="grid p-5" @submit.prevent="handleSubmit" v-slot="{ errors }">
    <div class="col">
<small-title>Add photo</small-title>
      <!-- title -->
      <Field class="field" name="title" v-slot="{ field }" rules="required|min:10|max:60">
        <label class="block">Title</label>
        <input-text
          v-bind="field"
          type="text"
          v-model="form.title" />
        <span class="error">{{ errors.title }}</span>
      </Field>

      <!-- author -->
      <Field class="field" name="author" v-slot="{ field }" rules="required|min:3|max:30">
        <label class="block">Author</label>
        <input-text
          v-bind="field"
          type="text"
          v-model="form.author" />
        <span class="error">{{ errors.author }}</span>
      </Field>

      <!-- category -->
      <!-- <Field class="field" name="category" v-slot="{ field }" rules="required">
        <label class="block">Category</label>
        <Listbox
          v-bind="field"
          v-model="form.category"
          :options="categories" />
        <span class="error">{{ errors.category }}</span>
      </Field> -->

      <!-- description -->
      <Field class="field" name="desription" v-slot="{ field }" rules="required|max:100">
        <label class="block">Description</label>
        <Textarea
          v-bind="field"
          rows="5"
          cols="30"
          v-model="form.description" />
        <span class="error">{{ errors.desription }}</span>
      </Field>

      <Button
        class="p-button-rounded p-button-success"
        type="submit"
        label="Add"
        icon="pi pi-plus" />

    </div>
    <div class="col">
      <Field class="p-col" v-slot="{ field }" rules="required|ext:png,jpg" name="image">
        <span class="error">{{ errors.image }}</span>
        <ImageUpload
          v-bind="field"
          @choose="handleFile" />
      </Field>
    </div>
  </Form>
  <Message severity="success" v-if="isSuccess">Success</Message>
  <Message severity="error" v-if="isError">Error</Message>
  </div>
</template>
<script>
import InputText from 'primevue/inputtext'
// import Listbox from 'primevue/listbox'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import SmallTitle from '../layout/SmallTitle.vue'
import ImageUpload from '../shared/ImageUpload.vue'
import Message from 'primevue/message'
import axios from 'axios'
import { apiUrl } from '../../config'
import { Form, Field, defineRule } from 'vee-validate'
import { required, min, max, ext } from '@vee-validate/rules'
import { reactive, ref, computed, getCurrentInstance } from 'vue'
defineRule('required', (value) => required(value) || 'This field is so so required...')
defineRule('min', (value, params) => min(value, params) || `It should be longer than ${params}`)
defineRule('max', (value, params) => max(value, params) || `It should be shorter than ${params}`)
defineRule('ext', (value, params) => ext(value, params) || `You should use one of these extensions: ${params}`)
export default {
  name: 'AddPhotoForm',
  components: { InputText, Textarea, Button, SmallTitle, ImageUpload, Message, Form, Field },
  setup (props, context) {
    const vm = getCurrentInstance()
    const form = reactive({
      title: '',
      author: '',
      description: '',
      category: '',
      file: null
    })
    const isSuccess = ref(false)
    const isError = ref(false)
    const categories = computed(() => vm.$store.state.Categories.categories)
    const chooseFile = (file) => {
      console.log(file)
      form.file = file
    }
    const handleSubmit = async () => {
      const formData = new FormData()
      formData.append('title', form.title)
      formData.append('author', form.author)
      formData.append('category', 'none')
      formData.append('description', form.description)
      formData.append('file', form.file)
      isSuccess.value = false
      isError.value = false
      try {
        const result = await axios.post(`${apiUrl}/photos`, formData, {
          'Content-Type': 'multipart/form-data'
        })
        console.log(result)
        isSuccess.value = true
      } catch {
        isError.value = true
      }
    }
    return {
      form,
      isSuccess,
      isError,
      categories,
      chooseFile,
      handleSubmit
    }
  }
}
</script>
<style lang="scss" scoped>
.error {
  color: red;
}
</style>
