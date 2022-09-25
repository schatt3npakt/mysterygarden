<template>
  <div class="almanach">
    <div class="page">
      <ul>
        <li v-for="herb in herbs" :key="herb.id">
          <div>
            <p class="headline">
              {{ translations[herb.title].title[language] }}
            </p>

            <p>
              {{ translations[herb.title].description[language] }}
            </p>
          </div>
        </li>
      </ul>
    </div>

    <BackButton />
  </div>
</template>

<script>
import BackButton from "@/components/BackButton.vue";

export default {
  data() {
    return {
      herbs: this.$store.state.availableHerbs,
      translations: require("@/translations/Herbs.json"),
      showTutorial: true,
    };
  },
  computed: {
    language() {
      return this.$store.state.language;
    },
    tutorialDone() {
      return this.$store.state.tutorial.tutorialDone;
    },
  },
  name: "AlmanachView",
  components: {
    BackButton,
  },
  mounted: function () {
    const tutorialState = this.$store.state.tutorial;

    if (tutorialState.tutorialDone === false) {
      if (tutorialState.almanachTutorialDone === false) {
        tutorialState.almanachTutorialDone = true;
      }
    }
  },
};
</script>

<style scoped lang="scss">
@use "../scss/animations";

.almanach {
  background-image: url("../assets/ui/ui-bg.png");
  animation: animations.$bg-tr-bl;
  padding: 10px;
  height: calc(100vh - 20px);
  overflow: auto;

  .page {
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;

      @media (min-width: 720px) {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 15px;
        max-width: 1200px;
        margin: auto;
      }

      li {
        background-color: rgb(236, 227, 208);
        box-shadow: 0 0 15px 15px rgba(37, 34, 49, 0.1);
        padding: 30px;
        gap: 10px;
        margin-bottom: 20px;
        border-radius: 15px;

        img {
          display: block;
          margin: auto;
        }

        p {
          color: rgb(152, 113, 74);
          text-align: left;
          font-size: 18px;

          &:last-of-type {
            margin-bottom: 0;
          }

          &.headline {
            font-weight: 900;
            font-size: 22px;
            margin-top: 0;
          }
        }
      }
    }
  }
}
</style>
