<template>
  <img class="mg-logo" src="/img/mg-logo.png" alt="" />

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

  <div class="kenney-logo">
    <img src="/img/logo.png" alt="" />
  </div>
</template>

<script>
import { setRandomHerbs } from "@/herbService";

export default {
  name: "App",
  mounted: function () {
    setRandomHerbs(this.$store.state);
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@500;700;900&display=swap");

.fade-enter-active,
.fade-leave-active {
  transition: transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  transform: rotateY(90deg);
}

.fade-enter-to {
  transition-delay: 0.25s;
}

:root {
  --bg-color: #97714a;
}

* {
  font-family: "Nunito", sans-serif;
}

body,
html {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: rgb(63, 165, 224);
  min-height: 100vh;
  width: 100vw;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
}

.mg-logo {
  width: calc(100vw - 20px);
  height: auto;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  max-width: 400px;
  transform: translate(-50%, -50%);
  z-index: -1;
}

.kenney-logo {
  pointer-events: none;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(30, 30, 30);
  width: 100vw;
  height: 100vh;
  clip-path: circle(150vw);
  animation: 1.5s reveal forwards ease-in-out;
  animation-delay: 1.5s;
  z-index: 10;

  img {
    display: block;
    max-width: 200px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: intro 1s ease forwards;

    @media (min-width: 720px) {
      max-width: 320px;
    }
  }
}

@keyframes intro {
  0% {
    opacity: 0;
    transform: translateY(calc(100vh - 50%)) translateX(-50%);
  }

  70% {
    transform: translateY(calc(-30px - 50%)) translateX(-50%);
  }

  80% {
    transform: translateY(calc(10px - 50%)) translateX(-50%);
  }
  100% {
    transform: translateY(-50%) translateX(-50%);
  }
}

@keyframes reveal {
  from {
    clip-path: circle(150vw);
  }

  to {
    clip-path: circle(0);
  }
}
</style>
