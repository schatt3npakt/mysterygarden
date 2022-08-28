<template>
  <div class="fireflies">
    <div><div class="firefly"></div></div>

    <div><div class="firefly"></div></div>

    <div><div class="firefly"></div></div>

    <div><div class="firefly"></div></div>

    <div><div class="firefly"></div></div>

    <div><div class="firefly"></div></div>
  </div>
</template>

<script>
export default {
  name: "GardenFireflies",
};
</script>

<style scoped lang="scss">
@use "../../scss/zIndex";

.fireflies {
  position: fixed;
  top: 50%;
  left: 0;
  z-index: zIndex.$gardenFireflies;
  pointer-events: none;

  > div {
    transform: translateX(-10vw);
    position: fixed;
    left: 20vw;
    top: 10vh;
    pointer-events: none;

    .firefly {
      animation: fireflies 2.5s infinite ease-in-out;
      pointer-events: none;

      &::before {
        animation: fireflies-move 2.5s infinite ease-in-out;
        pointer-events: none;
      }
    }

    &:nth-child(2) {
      left: 80vw;
      top: 25vh;

      .firefly {
        animation: fireflies 1.5s infinite reverse ease-in-out;

        &::before {
          animation: fireflies-move 1.5s infinite reverse ease-in-out;
        }
      }
    }

    &:nth-child(3) {
      top: 50vh;
      left: 20vw;

      .firefly {
        animation: fireflies 3s infinite ease-in-out;

        &::before {
          animation: fireflies-move 3s infinite ease-in-out;
        }
      }
    }

    &:nth-child(4) {
      top: 45vh;
      left: 70vw;

      .firefly {
        animation: fireflies 2s infinite alternate ease-in-out;

        &::before {
          animation: fireflies-move 2s infinite alternate ease-in-out;
        }
      }
    }

    &:nth-child(6) {
      top: 40vh;
      left: 60vw;

      .firefly {
        animation: fireflies 3s infinite ease-in-out;

        &::before {
          animation: fireflies-move 3s infinite ease-in-out;
        }
      }
    }

    &:nth-child(5) {
      top: 80vh;
      left: 65vw;

      .firefly {
        animation: fireflies 1.5s infinite reverse ease-in-out;

        &::before {
          animation: fireflies-move 1.5s infinite reverse ease-in-out;
        }
      }
    }
  }

  .firefly {
    display: none;

    @media (prefers-color-scheme: dark) {
      display: block;
      position: relative;
      width: 50px;
      height: 50px;
      background-size: 100% 100%;
      background: radial-gradient(
        circle,
        rgba(255, 255, 226, 0.2) 0%,
        rgba(255, 255, 226, 0) 50%,
        rgba(255, 255, 226, 0) 100%
      );
      transform: scaleY(0.5);
      pointer-events: none;

      &::before {
        position: absolute;
        top: 0;
        left: 50%;
        content: "";
        width: 30px;
        height: 30px;
        display: block;
        background-size: 100% 100%;
        background: radial-gradient(
          circle,
          rgba(255, 255, 226, 0.9) 0%,
          rgba(255, 255, 226, 0) 50%,
          rgba(255, 255, 226, 0) 100%
        );
        transform: translateY(-70px) translateX(-50%) scaleY(2);
      }
    }
  }
}

@keyframes fireflies {
  50% {
    opacity: 0.5;
  }
}

@keyframes fireflies-move {
  50% {
    transform: translateY(-100px) translateX(-50%) scaleY(2);
  }
}
</style>
