<template>
  <div class="fence">
    <div><img src="@/assets/tiles/tile-fence.png" alt="" /></div>
    <div><img src="@/assets/tiles/tile-fence.png" alt="" /></div>
  </div>
</template>

<script>
export default {
  name: "GardenFence",
};
</script>

<style scoped lang="scss">
@use "../../scss/zIndex";

.fence {
  display: flex;
  justify-content: space-between;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);

  img {
    width: 170px;

    @media (min-width: 720px) {
      width: 220px;
    }
  }

  div {
    position: relative;
    width: 170px;

    @media (min-width: 720px) {
      width: 220px;
    }

    &:first-child {
      transform: translateX(-50%);
    }

    &:last-child {
      transform: translateX(50%);
    }

    &::before {
      background-size: cover;
      position: absolute;
      top: calc(100% - 7px);
      transform: rotate(180deg);
      filter: brightness(0);
      opacity: 0.2;
      mix-blend-mode: multiply;
      left: 0;
      width: 100%;
      height: 100px;
      display: block;
      content: "";
      background-image: url("@/assets/tiles/tile-fence.png");
    }
  }
}
</style>
