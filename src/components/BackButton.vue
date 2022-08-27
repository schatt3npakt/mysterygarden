<template>
  <router-link class="back-button" :to="'/'">Home</router-link>
</template>

<script>
export default {
  name: "BackButton",
};
</script>

<style scoped lang="scss">
.back-button {
  background-color: rgb(63, 165, 224);
  border: 2px solid white;
  border-radius: 15px;
  bottom: 20px;
  color: white;
  cursor: pointer;
  filter: drop-shadow(0 15px 15px rgba(37, 34, 49, 0.1));
  font-weight: 700;
  font-size: 20px;
  left: 50%;
  max-width: 200px;
  padding: 12px 20px;
  position: fixed;
  text-decoration: none;
  transform: scale(1) translateX(-50%);
  transition: transform 0.25s ease-in-out;
  transform-origin: left center;
  width: 100%;

  &:hover,
  &:focus {
    transform: scale(1.1) translateX(-50%);
  }

  &:active {
    transform: scale(0.95) translateX(-50%);
  }
}
</style>
