<template>
  <div class="options">
    <div class="page"></div>

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
}
</style>
