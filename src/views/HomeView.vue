<template>
  <div class="main-menu">
    <img class="logo" src="/img/mg-logo.png" alt="" />

    <div class="main-menu__buttons">
      <router-link v-for="(route, i) in routes" :key="i" :to="route.path">
        <img :src="route.icon" alt="" />

        <span>{{ route.title }}</span>
      </router-link>
    </div>

    <div class="vue-teaser">
      Made with <br />
      <img src="/img/vue-logo.png" alt="" />
    </div>
  </div>
</template>

<script>
const hiddenRoutes = ["home", "options", "win"];
export default {
  computed: {
    routes() {
      return this.$router.options.routes.filter(
        (item) => !hiddenRoutes.includes(item.name)
      );
    },
  },
  name: "HomeView",
};
</script>

<style scoped lang="scss">
@use "../scss/animations";

.logo {
  margin: 0 auto 50px auto;
  width: 100%;
  max-width: 500px;
}

.main-menu {
  background-image: url("../assets/ui/ui-bg.png");
  background-position: top left;
  animation: animations.$bg-tl-br;
  padding: 20px;
  height: calc(100vh - 40px);

  &__buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: auto;
    max-width: 300px;
    row-gap: 80px;

    a {
      transform: scale(1);
      transition: transform 0.25s ease-in-out;

      &,
      &:hover,
      &:focus,
      &:visited,
      &:active {
        color: rgb(63, 165, 224) !important;
      }

      &:hover,
      &:focus {
        transform: scale(1.1);
      }

      &:active {
        transform: scale(0.95);
      }
    }

    > * {
      background-size: 100% 100%;
      cursor: pointer;
      height: 90px;
      margin: auto;
      position: relative;
      width: 100px;
      transform: scale(1);
      transition: transform 0.25s ease-in-out;
      filter: drop-shadow(2px 0 0 white) drop-shadow(-2px 0 0 white)
        drop-shadow(0 2px 0 white) drop-shadow(0 -2px 0 white);

      &:hover {
        transform: scale(1.05);
      }

      > img {
        display: block;
        filter: drop-shadow(2px 0 0 white) drop-shadow(-2px 0 0 white)
          drop-shadow(0 2px 0 white) drop-shadow(0 -2px 0 white);
        left: 50%;
        width: 80px;
        height: 80px;
        object-fit: contain;
        max-width: 75%;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      > span {
        display: none;
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        font-size: 20px;
        font-weight: 900;
        display: block;
        margin-top: 10px;
        white-space: nowrap;
      }
    }
  }
}

.vue-teaser {
  color: white;
  font-weight: 900;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;

  img {
    margin-top: 5px;
    max-width: 40px;
    filter: drop-shadow(2px 0 0 white) drop-shadow(-2px 0 0 white)
      drop-shadow(0 2px 0 white) drop-shadow(0 -2px 0 white);
  }
}
</style>
