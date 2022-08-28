<template>
  <div class="feedbacktext" :class="{ show: showFeedbackText }">
    {{ feedbackText }}
  </div>
</template>

<script>
export default {
  name: "GardenFeeedbackText",
  computed: {
    feedbackText() {
      return this.$store.state.feedbackText;
    },
  },
  props: {
    showFeedbackText: Boolean,
  },
};
</script>

<style scoped lang="scss">
@use "../../scss/zIndex";

.feedbacktext {
  position: fixed;
  max-width: calc(100vw - 40px);
  width: 100%;
  top: 20px;
  left: 50%;
  z-index: zIndex.$gardenFeedbackText;
  transform: translateX(-50%) translateY(-100px);
  color: rgb(63, 165, 224);
  font-size: 24px;
  font-weight: 900;
  filter: drop-shadow(3px 0 0 white) drop-shadow(-3px 0 0 white)
    drop-shadow(0 3px 0 white) drop-shadow(0 -3px 0 white)
    drop-shadow(0 15px 15px rgba(37, 34, 49, 0.1));

  &.show {
    animation: bounce-in 3s ease-in-out alternate forwards;
  }
}

@keyframes bounce-in {
  0% {
    transform: translateY(-100px) translateX(-50%);
  }

  10% {
    transform: translateY(20px) translateX(-50%);
  }

  20% {
    transform: translateY(10px) translateX(-50%);
  }

  90% {
    transform: translateY(10px) translateX(-50%);
  }

  100% {
    transform: translateY(-100px) translateX(-50%);
  }
}
</style>
