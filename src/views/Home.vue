<template>
  <div class="home">
    <LoginPage title="Groupomania"/>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginPage from '@/components/LoginPage.vue'

export default {
  name: 'Home',
  components: {
    LoginPage
  }
}
</script>
