<template>
  <div class="patches">
    <div
      :class="{
        wet: patch.state.wetness !== 0,
      }"
      v-for="patch in patches"
      @click="patchClickHandler(patch.id)"
      :key="patch.id"
      class="patch"
    >
      <img
        class="plant"
        :class="{
          dead: patch.state.plant.state === 4,
          sprout: patch.state.plant.state === 1,
          young: patch.state.plant.state === 2,
          grown: patch.state.plant.state === 3,
        }"
        :src="constructPlantImagePath(patch.id)"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "GardenPatches",
  props: {
    constructPlantImagePath: Function,
    patchClickHandler: Function,
    patches: Array,
  },
};
</script>

<style scoped lang="scss">
.patches {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  max-width: 300px;
  margin: 20px auto 50px auto;
  gap: 15px;

  @media (min-width: 720px) {
    max-width: 400px;
    margin: 100px auto 50px auto;
  }

  .patch {
    background-image: url("@/assets/tiles/tile-earth.png");
    border-radius: 10px;
    position: relative;
    height: 80px;
    width: 80px;
    display: blocK;
    margin: auto;
    border: 5px solid rgb(163, 120, 79);
    transform: scale(1);
    cursor: pointer;
    transition: transform 0.25s ease-in-out;

    @media (min-width: 720px) {
      height: 100px;
      width: 100px;
    }

    &::before {
      background-size: cover;
      position: absolute;
      top: 100%;
      filter: brightness(0);
      opacity: 0.2;
      mix-blend-mode: multiply;
      left: 0;
      height: 10px;
      width: 100%;
      display: block;
      content: "";
      background-image: url("@/assets/tiles/tile-earth.png");
    }

    &:hover,
    &:focus {
      transform: scale(1.1);
    }

    &:active {
      transform: scale(0.95);
    }

    &.wet {
      background-image: url("@/assets/tiles/tile-earth-wet.png");
    }

    &.wetter {
      background-image: url("@/assets/tiles/tile-earth-wetter.png");
    }

    .plant {
      pointer-events: none;
      position: absolute;
      bottom: 50%;
      transform: translateX(-50%);
      transform-origin: center;
      object-fit: contain;
      object-position: center bottom;

      &.dead {
        width: 30px;
        height: 30px;
        filter: sepia(1) brightness(0.5);
      }

      &.sprout {
        width: 30px;
        height: 30px;
      }

      &.young {
        transform: translateX(-50%) scale(1.25);
        animation: ready 1s infinite;
        width: 50px;
        height: 50px;
      }

      &.grown {
        width: 60px;
        height: 60px;
        transform: translateX(-50%) scale(1.25);
        filter: drop-shadow(2px 0 0 white) drop-shadow(-2px 0 0 white)
          drop-shadow(0 2px 0 white) drop-shadow(0 -2px 0 white);
      }
    }
  }
}
</style>
