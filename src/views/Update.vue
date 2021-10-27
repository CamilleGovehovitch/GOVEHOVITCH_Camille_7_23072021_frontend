<template>
  <div>
      <p>HEY par ici</p>
  </div>
</template>

<script>

export default {
  name: "Update",
  components: {
  },
  data() {
    return {
    };
  },
  beforeMount() {
    this.checkToken();
  },
  computed: {},
  methods: {
    checkToken() {
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "#/user/login";
      }
    },
  },
};
</script>

<style scoped></style>
