<template>
  <div class="clouds"></div>
</template>

<script>
export default {
  name: "GardenClouds",
};
</script>

<style scoped lang="scss">
@use "../../scss/zIndex";

.clouds {
  pointer-events: none;

  &::before,
  &::after {
    mix-blend-mode: multiply;
    opacity: 0.2;
    content: "";
    display: block;
    position: fixed;
    left: 50px;
    background-color: black;
    width: 200px;
    height: 100px;
    border-radius: 100px;
    transform: translateX(-100vw);
    z-index: zIndex.$gardenClouds;
  }

  &::after {
    top: 50px;
    animation: clouds 240s infinite linear alternate;

    @media (min-width: 720px) {
      animation: clouds 480s infinite linear alternate;
    }
  }

  &::before {
    top: 200px;
    animation: clouds 300s infinite linear alternate-reverse;

    @media (min-width: 720px) {
      animation: clouds 410s infinite linear alternate-reverse;
    }
  }
}

@keyframes clouds {
  //first cloud start
  0% {
    transform: translateX(-100vw);
  }

  //first cloud end
  20% {
    transform: translateX(100vw);
  }

  21% {
    transform: translateX(100vw) translateY(-1000px);
  }

  22% {
    transform: translateX(100vw) translateY(-1000px);
  }

  23% {
    transform: translateX(-100vw) translateY(-1000px);
  }

  24% {
    transform: translateX(-100vw) translateY(-1000px);
  }

  25% {
    transform: translateX(-100vw) translateY(100px);
  }

  //Second cloud start
  35% {
    transform: translateX(-100vw) translateY(100px) scale(1.5);
  }

  //Second cloud end
  55% {
    transform: translateX(100vw) translateY(100px) scale(1.5);
  }

  66% {
    transform: translateX(100vw) translateY(-1000px);
  }

  67% {
    transform: translateX(100vw) translateY(-1000px);
  }

  68% {
    transform: translateX(-100vw) translateY(-1000px);
  }

  69% {
    transform: translateX(-100vw) translateY(-1000px);
  }

  70% {
    transform: translateX(-100vw) translateY(100px);
  }

  100% {
    transform: translateX(-100vw) translateY(100px);
  }
}
</style>
