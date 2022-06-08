<template>
  <footer class="footer p-mt-2 p-mb-2 flex justify-content-between">
    <p>2020 All rights reserved</p>
    <p>We have {{ categoriesAmount }} categories</p>
  </footer>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'theFooter',
  computed: {
    ...mapGetters('Categories', ['categoriesAmount'])
  }
}
</script>
