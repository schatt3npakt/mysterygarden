<template>
  <div class="options">
    <div class="page">
      <h2>{{ translations.options[language] }}</h2>

      <div class="input">
        <div>
          <label>
            {{ translations.german[language] }}
            <input
              :checked="language === 'de'"
              @click="languageSelectClickHandler('de')"
              type="radio"
              name="language"
              value="Deutsch"
            />
          </label>
        </div>

        <div>
          <label>
            {{ translations.english[language] }}
            <input
              :checked="language === 'en'"
              @click="languageSelectClickHandler('en')"
              type="radio"
              name="language"
              value="English"
            />
          </label>
        </div>
      </div>
    </div>

    <BackButton />
  </div>
</template>

<script>
import BackButton from "@/components/BackButton.vue";

export default {
  data() {
    return {
      translations: require("@/translations/Options.json"),
    };
  },
  computed: {
    language() {
      return this.$store.state.language;
    },
  },
  methods: {
    languageSelectClickHandler(languageString) {
      this.$store.state.language = languageString;
    },
  },
  name: "OptionsView",
  components: {
    BackButton,
  },
};
</script>

<style scoped lang="scss">
@use "../scss/animations";

.options {
  background-image: url("../assets/ui/ui-bg.png");
  animation: animations.$bg-tr-bl;
  padding: 10px;
  height: calc(100vh - 20px);
  overflow: auto;

  h2 {
    color: rgb(63, 165, 224);
    font-weight: 900;
    font-size: 40px;
    filter: drop-shadow(2px 0 0 white) drop-shadow(-2px 0 0 white)
      drop-shadow(0 2px 0 white) drop-shadow(0 -2px 0 white);
  }

  .input {
    display: flex;
    color: white;
    font-weight: 700;
    font-size: 18px;
    gap: 30px;
    margin: auto;
    max-width: 200px;

    > * {
      display: block;
      transform: scale(1);
      transition: transform 0.25s ease-in-out;

      &:hover,
      &:focus {
        transform: scale(1.1);
      }
    }

    label {
      cursor: pointer;
    }

    input {
      cursor: pointer;
      margin-top: 10px;
      position: relative;

      &::after,
      &::before {
        pointer-events: none;
        content: "";
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      &::after {
        transform: scale(0) translate(-50%, -50%);
        transition: transform 0.25s ease-in-out;
        transform-origin: center center;
      }

      &::before {
        width: 20px;
        height: 20px;
        border-radius: 5px;
        background-color: white;
      }

      &:checked {
        &::after {
          width: 10px;
          height: 10px;
          border-radius: 10px;
          background-color: rgb(63, 165, 224);
          transform: scale(1) translate(-50%, -50%);
        }
      }
    }
  }
}
</style>
