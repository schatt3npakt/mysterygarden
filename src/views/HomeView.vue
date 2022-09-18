<template>
  <div class="main-menu">
    <img class="logo" src="/img/mg-logo.png" alt="" />

    <div class="main-menu__buttons" :class="tutorialClasses()">
      <router-link
        class="button"
        v-for="(route, i) in routes"
        :key="i"
        :to="route.path"
      >
        <img :src="route.icon" alt="" />

        <span>{{ translations[route.name][language] }}</span>
      </router-link>
    </div>

    <div class="vue-teaser">
      {{ translations["madeWith"][language] }} <br />
      <img src="/img/vue-logo.png" alt="" />
    </div>

    <HintLayer v-if="tutorialClasses() === 'step-1'">
      <p>{{ tutorialTranslations["welcome"][language] }} <br /></p>

      <p>{{ tutorialTranslations["clickOnTasks"][language] }}</p>
    </HintLayer>

    <HintLayer v-if="tutorialClasses() === 'step-2'">
      <p>{{ tutorialTranslations["lookIntoAlmanach"][language] }}</p>
    </HintLayer>

    <HintLayer v-if="tutorialClasses() === 'step-3'">
      <p>{{ tutorialTranslations["headToGarden"][language] }}</p>
    </HintLayer>

    <HintLayer v-if="tutorialClasses() === 'step-4'">
      <p>{{ tutorialTranslations["didYouGetIt"][language] }}</p>
    </HintLayer>

    <button
      @click="tutorialButtonClickHandler()"
      v-if="tutorialClasses() === true"
      class="tutorial-button"
    >
      {{ tutorialTranslations["startTutorial"][language] }}
    </button>
  </div>
</template>

<script>
import HintLayer from "@/components/HintLayer.vue";

const hiddenRoutes = ["home", "win", "howToPlay"];

export default {
  data() {
    return {
      translations: require("@/translations/Home.json"),
      tutorialTranslations: require("@/translations/Tutorial.json"),
    };
  },
  computed: {
    routes() {
      return this.$router.options.routes.filter(
        (item) => !hiddenRoutes.includes(item.name)
      );
    },
    language() {
      return this.$store.state.language;
    },
    tutorialDone() {
      return this.$store.state.tutorial.tutorialDone === true;
    },
  },
  methods: {
    tutorialClasses() {
      const tutorialState = this.$store.state.tutorial;

      if (tutorialState.tutorialDone) {
        return true;
      } else if (tutorialState.gardenTutorialSpellsDone) {
        return "step-4";
      } else if (tutorialState.almanachTutorialDone) {
        return "step-3";
      } else if (tutorialState.taskTutorialDone) {
        return "step-2";
      } else {
        return "step-1";
      }
    },
    tutorialButtonClickHandler() {
      this.$store.state.tutorial.tutorialDone = false;
    },
  },
  components: {
    HintLayer,
  },
  name: "HomeView",
};
</script>

<style scoped lang="scss">
@use "../scss/animations";

.logo {
  margin: 0 auto 50px auto;
  width: 100%;
  max-width: 300px;
}

.main-menu {
  background-image: url("../assets/ui/ui-bg.png");
  background-position: top left;
  animation: animations.$bg-tl-br;
  padding: 20px;
  height: calc(100vh - 40px);

  &__buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: auto;
    max-width: 300px;
    row-gap: 80px;

    @media (min-width: 720px) {
      max-width: 450px;
    }

    a {
      transform: scale(1);
      transition: transform 0.25s ease-in-out;

      &,
      &:hover,
      &:focus,
      &:visited,
      &:active {
        color: white !important;
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
      height: 50px;
      margin: auto;
      position: relative;
      width: 100px;
      transition: transform 0.25s ease-in-out;

      @media (min-width: 720px) {
        height: 90px;
      }

      &:hover {
        transform: scale(1.05);
      }

      > img {
        display: block;
        filter: drop-shadow(2px 0 0 white) drop-shadow(-2px 0 0 white)
          drop-shadow(0 2px 0 white) drop-shadow(0 -2px 0 white);
        left: 50%;
        width: 50px;
        height: 50px;
        object-fit: contain;
        max-width: 75%;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);

        @media (min-width: 720px) {
          filter: drop-shadow(2px 0 0 white) drop-shadow(-2px 0 0 white)
            drop-shadow(0 2px 0 white) drop-shadow(0 -2px 0 white);
          height: 80px;
          width: 80px;
        }
      }

      > span {
        display: none;
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        font-size: 20px;
        font-weight: 700;
        display: block;
        margin-top: 10px;
        white-space: nowrap;
      }
    }

    &.step-1 {
      .button {
        &:not(:nth-child(2), :nth-child(4)) {
          pointer-events: none;
          opacity: 0.5;
        }
      }
    }

    &.step-2 {
      .button {
        &:not(:nth-child(1), :nth-child(2), :nth-child(4)) {
          pointer-events: none;
          opacity: 0.5;
        }
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

.tutorial-button {
  background-color: rgb(63, 165, 224);
  border: 2px solid white;
  border-radius: 15px;
  bottom: 120px;
  color: white;
  cursor: pointer;
  filter: drop-shadow(0 15px 15px rgba(37, 34, 49, 0.1));
  font-weight: 700;
  font-size: 20px;
  left: 50%;
  max-width: 200px;
  padding: 12px 20px;
  position: fixed;
  text-decoration: none;
  transform: scale(1) translateX(-50%);
  transition: transform 0.25s ease-in-out;
  transform-origin: left center;
  width: 100%;

  &:hover,
  &:focus {
    transform: scale(1.1) translateX(-50%);
  }

  &:active {
    transform: scale(0.95) translateX(-50%);
  }
}
</style>
