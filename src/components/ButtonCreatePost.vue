<template>
  <div class="createPostContainer">
    <router-link to="/post/new">
      <div class="createPost">
        <i class="fas fa-plus"></i>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  name: "ButtonCreatePost",
};
</script>
<style lang="scss" scoped>
$primaryColor: #fd2d02;
.createPostContainer {
  a {
    text-decoration: none;
    color: darken($primaryColor, 10%);
    .createPost {
      background-color: white;
      border-radius: 50%;
      border: solid 2px darken($primaryColor, 10%);
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 5px 5px 15px 1px rgba(0, 0, 0, 0.29);
      transition: ease-in-out 300ms;
      &:hover {
        background-color: darken($primaryColor, 10%);
        color: white;
      }
      @media (min-width: 1024px) {
        font-size: 25px;
        width: 70px;
        height: 70px;
      }
      @media (min-width: 1440px) {
        width: 70px;
        height: 70px;
      }
      @media (min-width: 2560px) {
        width: 200px;
        height: 200px;
      }
      i {
        @media (min-width: 2560px) {
          font-size: 60px;
        }
      }
    }
  }
}
</style>
