<template>
  <div class="container p-p-4">

    <app-header />

    <main>
      <router-view />
    </main>

    <app-footer />

  </div>
</template>

<script>
import AppHeader from '@/components/layout/theHeader'
import AppFooter from '@/components/layout/theFooter'

export default {
  name: 'App',
  components: { AppHeader, AppFooter }
}
</script>
