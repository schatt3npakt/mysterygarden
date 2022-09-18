<template>
  <div
    @click="closeClickHandler()"
    class="hint-layer"
    :class="{ hide: this.hide }"
  >
    <span>X</span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "HintLayer",
  data: () => {
    return {
      hide: false,
    };
  },
  methods: {
    closeClickHandler() {
      this.hide = true;
    },
  },
};
</script>

<style lang="scss">
.hint-layer {
  cursor: pointer;
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100vw - 70px);
  background-color: rgb(63, 165, 224);
  border: 2px solid white;
  border-radius: 15px;
  box-shadow: 0 0 15px 15px rgba(37, 34, 49, 0.1);
  padding: 15px 35px 15px 15px;

  @media (min-width: 720px) {
    max-width: 720px;
    margin: auto;
  }

  &.hide {
    display: none;
  }

  span {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    border: none;
    color: white;
    font-size: 20px;
  }

  p {
    margin-top: 0;
    color: white;
    font-weight: 700;
    font-size: 20px;

    &:only-child {
      margin: 0;
    }
  }
}
</style>
