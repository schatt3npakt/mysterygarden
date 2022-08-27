<template>
  <div class="herbs">
    <div class="page">
      <ul>
        <li
          v-for="herb in taskHerbs"
          @click="taskClickHandler(herb.id)"
          :key="herb.id"
        >
          <img
            v-if="herb.solution !== undefined"
            :src="constructHerbImagePath(herb.solution)"
            alt=""
          />
          <img v-else src="/img/ui-question.svg" alt="" />

          <p>{{ herb.title }}</p>
        </li>
      </ul>
    </div>

    <div v-show="selectionIsOpen" class="solution-layer">
      <p>Harvested Herbs</p>
      <div v-if="harvestedHerbs.length >= 1">
        <ul>
          <li
            v-for="herb in harvestedHerbs"
            @click="harvestedHerbClickHandler(herb.id)"
            :key="herb.id"
          >
            <button>
              <img :src="herb.stateImages.grown" alt="" />
            </button>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No herbs harvested yet!</p>
      </div>
    </div>

    <BackButton />
  </div>
</template>

<script>
import BackButton from "@/components/BackButton.vue";
import router from "@/router";

export default {
  name: "TasksView",
  data: function () {
    return {
      selectionIsOpen: false,
      activeTaskId: 0,
    };
  },
  computed: {
    harvestedHerbs() {
      return this.$store.state.availableHerbs.filter((elem) =>
        this.$store.state.harvestedHerbs.includes(elem.id)
      );
    },
    taskHerbs() {
      return this.$store.state.taskHerbs;
    },
  },
  components: {
    BackButton,
  },
  methods: {
    constructHerbImagePath(solutionId) {
      return this.$store.state.availableHerbs[solutionId].stateImages.grown;
    },
    taskClickHandler(taskId) {
      this.selectionIsOpen = true;
      this.activeTaskId = taskId;
    },
    harvestedHerbClickHandler(herbId) {
      // Search for index of task with currently selected id
      const targetIndex = this.$store.state.taskHerbs
        .map((object) => object.id)
        .indexOf(this.activeTaskId);
      this.$store.state.taskHerbs[targetIndex].solution = herbId;
      this.selectionIsOpen = false;

      this.checkForWin();
    },
    checkForWin() {
      let correctSolutions = 0;
      let taskHerbs = this.$store.state.taskHerbs;

      for (let herb of taskHerbs) {
        if (herb.id === herb.solution) {
          correctSolutions++;
        }
      }

      if (correctSolutions === taskHerbs.length) {
        router.push("/win");
      }
    },
  },
};
</script>

<style scoped lang="scss">
@use "../scss/animations";

.herbs {
  background-image: url("../assets/ui/ui-bg.png");
  animation: animations.$bg-tr-bl;
  padding: 10px;
  height: calc(100vh - 20px);
  overflow: auto;

  .page {
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      display: grid;
      grid-template-columns: 1fr;
      gap: 15px;

      @media (min-width: 720px) {
        grid-template-columns: 1fr 1fr;
        gap: 15px;
        max-width: 720px;
        margin: auto;
      }

      li {
        cursor: pointer;
        display: block;
        background-color: rgb(236, 227, 208);
        border-radius: 15px;
        box-shadow: 0 0 15px 15px rgba(37, 34, 49, 0.1);
        padding: 30px;
        gap: 10px;
        transform: scale(1);
        transition: transform 0.25s ease-in-out;

        &:hover,
        &:focus {
          transform: scale(1.05);
        }

        img {
          display: block;
          margin: auto;
          width: 64px;
          height: 64px;
          object-fit: contain;
          margin: auto;
        }

        p {
          color: rgb(152, 113, 74);
          text-align: center;
          font-size: 22px;
          font-weight: 900;
          margin-bottom: 0;
          line-height: 1;
        }
      }
    }
  }
}

.solution-layer {
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100vw - 70px);
  background-color: rgb(63, 165, 224);
  border: 3px solid white;
  border-radius: 15px;
  box-shadow: 0 0 15px 15px rgba(37, 34, 49, 0.1);
  padding: 15px;

  @media (min-width: 720px) {
    max-width: 720px;
    margin: auto;
  }

  p {
    margin-top: 0;
    color: white;
    font-weight: 900;
    font-size: 20px;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    max-height: 200px;
    overflow: auto;
    gap: 25px;

    button {
      background-color: transparent;
      border: none;
      transform: scale(1);
      cursor: pointer;
      transition: transform 0.25s ease-in-out;

      &:hover,
      &:focus {
        transform: scale(1.1);
      }

      &:active {
        transform: scale(0.95);
      }

      img {
        display: block;
        width: 64px;
        height: 64px;
        object-fit: contain;
        margin: auto;
        filter: drop-shadow(2px 0 0 white) drop-shadow(-2px 0 0 white)
          drop-shadow(0 2px 0 white) drop-shadow(0 -2px 0 white);
      }
    }
  }
}
</style>
