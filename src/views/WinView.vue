<template>
  <div class="win">
    <div class="text">
      <img src="/img/ui-medal.svg" alt="" />

      {{ translations.amazing[language] }} <br />

      <button @click="replayButtonClickHandler()">
        {{ translations.replay[language] }}
      </button>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { setRandomHerbs } from "@/herbService";

export default {
  data: function () {
    return {
      translations: require("@/translations/Win.json"),
    };
  },
  name: "WinView",
  methods: {
    replayButtonClickHandler() {
      this.$store.commit("resetState");
      router.push("/");
      setRandomHerbs(this.$store.state);
    },
  },
  computed: {
    language() {
      return this.$store.state.language;
    },
  },
};
</script>

<style scoped lang="scss">
@use "../scss/animations";

.win {
  animation: animations.$bg-tl-br;
  background-image: url("../assets/ui/ui-bg.png");
  padding: 10px;
  height: calc(100vh - 20px);
  overflow: auto;

  img {
    margin: auto;
    display: block;
    width: 100%;
    max-width: 80px;
    margin-bottom: 20px;
    filter: drop-shadow(2px 0 0 white) drop-shadow(-2px 0 0 white)
      drop-shadow(0 2px 0 white) drop-shadow(0 -2px 0 white);
  }

  .text {
    color: rgb(63, 165, 224);
    filter: drop-shadow(2px 0 0 white) drop-shadow(-2px 0 0 white)
      drop-shadow(0 2px 0 white) drop-shadow(0 -2px 0 white);
    font-weight: 900;
    font-size: 40px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    button {
      color: white;
      background-color: rgb(63, 165, 224);
      border: 2px solid white;
      font-size: 20px;
      padding: 10px 18px;
      border-radius: 15px;
      font-weight: 900;
      margin-top: 20px;
      transform: scale(1);
      transition: transform 0.25s ease-in-out;
      cursor: pointer;

      &:hover,
      &:focus {
        transform: scale(1.1);
      }

      &:active {
        transform: scale(0.95);
      }
    }
  }
}
</style>
