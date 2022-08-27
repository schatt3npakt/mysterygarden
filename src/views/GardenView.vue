<template>
  <div class="garden">
    <div class="nightlayer"></div>

    <div class="fireflies">
      <div><div class="firefly"></div></div>

      <div><div class="firefly"></div></div>

      <div><div class="firefly"></div></div>

      <div><div class="firefly"></div></div>

      <div><div class="firefly"></div></div>

      <div><div class="firefly"></div></div>
    </div>

    <div class="clouds"></div>

    <div class="feedbacktext" :class="{ show: showFeedbackText }">
      {{ feedbackText }}
    </div>

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

    <div class="fence">
      <div><img src="@/assets/tiles/tile-fence.png" alt="" /></div>
      <div><img src="@/assets/tiles/tile-fence.png" alt="" /></div>
    </div>

    <div class="ui">
      <div class="ui__inner">
        <!-- The button gets an active class if the id of the menu it represents matches the active menu id, unless it's the first item, since that instead navigates us to the home screen. Clicking on the button sets the active menu id -->
        <button
          :class="{ active: activeMenu === item.id && item.id !== 0 }"
          @click="navItemClickHandler(item.id)"
          v-for="item in navigationItems"
          :key="item.id"
        >
          <img :src="item.icon" alt="" />
          <span>{{ item.title }}</span>
        </button>
      </div>
    </div>

    <div class="menus">
      <div
        v-for="menu in menus"
        :key="menu.id"
        :class="{
          seeds: menu.id === 1,
          active: menu.id === activeMenu && menuIsOpen,
        }"
        class="menu"
      >
        <button
          @click="menuItemClickHandler(menu.id, menuItem.id)"
          :class="{ active: selections[menu.id - 1].selected === menuItem.id }"
          v-for="menuItem in menu.menuItems"
          :key="menuItem.id"
        >
          <img :src="menuItem.icon" alt="" />
          <span v-if="menu.id !== 1">{{ menuItem.title }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "GardenView",
  computed: {
    patches() {
      return this.$store.state.patches;
    },
    feedbackText() {
      return this.$store.state.feedbackText;
    },
  },
  data: function () {
    return {
      showFeedbackText: false,
      menuIsOpen: false,
      activeMenu: 0,
      selections: [
        {
          // Seeds
          id: 1,
          selected: 0,
        },
        {
          // Hydrations
          id: 2,
          selected: 0,
        },
        {
          // Runes
          id: 3,
          selected: 0,
        },
      ],
      navigationItems: [
        {
          id: 0,
          title: "Menu",
          icon: require("@/assets/ui/ui-button-left.svg"),
        },
        {
          id: 1,
          title: "Herbs",
          icon: "",
        },
        {
          id: 2,
          title: "Hydration",
          icon: "",
        },
        {
          id: 3,
          title: "Spells",
          icon: "",
        },
      ],
      menus: [
        {
          id: 1,
          title: "Herbs",
          menuItems: require("@/data/herbs.json"),
        },
        {
          id: 2,
          title: "Hydrations",
          menuItems: require("@/data/hydrations.json"),
        },
        {
          id: 3,
          title: "Spells",
          menuItems: require("@/data/spells.json"),
        },
      ],
    };
  },
  methods: {
    patchClickHandler(patchId) {
      this.showFeedbackText = true;
      window.setTimeout(() => {
        this.showFeedbackText = false;
      }, 3000);

      const thisPatch = this.$store.state.patches[patchId];
      const harvestedHerbs = this.$store.state.harvestedHerbs;

      // plant states: 0 unplanted 1 sapling 2 young plant 3 grown 4 dead
      // active menus 0 home 1 Seeds 2 Hydration 3 runes

      // if plant is done
      if (thisPatch.state.plant.state === 3) {
        if (!harvestedHerbs.includes(thisPatch.state.plant.id)) {
          harvestedHerbs.push(thisPatch.state.plant.id);
        }
        this.$store.state.feedbackText = "You harvested the herb!";
        thisPatch.state.plant.state = 0;
        thisPatch.state.plant.id = 0;
        thisPatch.state.plant.stateBeforeDeath = 0;
        thisPatch.state.wetness = 0;
        return;
      }

      // if plant is dead
      if (thisPatch.state.plant.state === 4) {
        this.$store.state.feedbackText = "Withered herb removed!";
        thisPatch.state.plant.state = 0;
        thisPatch.state.plant.id = 0;
        thisPatch.state.plant.stateBeforeDeath = 0;
        thisPatch.state.wetness = 0;
        return;
      }

      // if seed is selected
      if (this.activeMenu === 1) {
        if (thisPatch.state.plant.state === 0) {
          this.$store.state.feedbackText = "You planted the herb!";
          thisPatch.state.plant.state = 1;
          thisPatch.state.plant.id = this.selections[0].selected;
        } else {
          this.$store.state.feedbackText = "This patch is already planted!";
          return;
        }
      }

      // if hydration is selected
      if (this.activeMenu === 2) {
        if (thisPatch.state.plant.state === 1) {
          // make patch wet
          thisPatch.state.wetness = 1;

          // if hydration is correct
          if (
            this.menus[0].menuItems[
              thisPatch.state.plant.id
            ].requirements.hydrationIds.includes(this.selections[1].selected)
          ) {
            thisPatch.state.plant.state = 2;
            this.$store.state.feedbackText = "Your herb grew!";
          } else {
            // kill plant
            thisPatch.state.plant.stateBeforeDeath =
              thisPatch.state.plant.state;
            thisPatch.state.plant.state = 4;
            this.$store.state.feedbackText = "The plant withered...";
          }
        } else {
          this.$store.state.feedbackText = "You only have to water sprouts!";
        }
      }

      // If rune is selected
      if (this.activeMenu === 3) {
        if (thisPatch.state.plant.state === 2) {
          // if rune is correct
          if (
            this.menus[0].menuItems[
              thisPatch.state.plant.id
            ].requirements.runeIds.includes(this.selections[2].selected)
          ) {
            thisPatch.state.plant.state = 3;
            this.$store.state.feedbackText = "Your herb is fully grown!";
          } else {
            // kill plant
            thisPatch.state.plant.stateBeforeDeath =
              thisPatch.state.plant.state;
            thisPatch.state.plant.state = 4;
            this.$store.state.feedbackText = "The plant withered...";
          }
        } else {
          this.$store.state.feedbackText =
            "You only have to cast spells on young plants!";
        }
      }
    },
    navItemClickHandler(navItemId) {
      // Navigate to the home screen if the menu is already active
      if (navItemId === 0) {
        router.push("/");
        return;
      }

      // Set the active menu and open it if menu is currently not selected, otherwise close menu but keep active category status
      if (this.activeMenu !== navItemId) {
        this.activeMenu = navItemId;
        this.menuIsOpen = false;
      } else {
        this.menuIsOpen = true;
      }
    },
    menuItemClickHandler(menuId, menuItemId) {
      this.selections[menuId - 1].selected = menuItemId;
      this.navigationItems[menuId].icon =
        this.menus[menuId - 1].menuItems[
          this.selections[menuId - 1].selected
        ].icon;
      this.menuIsOpen = false;
    },
    constructPlantImagePath(patchId) {
      const plantState = this.$store.state.patches[patchId].state.plant.state;
      const plantId = this.$store.state.patches[patchId].state.plant.id;
      const plantStateBeforeDeath =
        this.$store.state.patches[patchId].state.plant.stateBeforeDeath;

      switch (plantState) {
        case 1:
          return this.menus[0].menuItems[plantId].stateImages.sapling;

        case 2:
          return this.menus[0].menuItems[plantId].stateImages.young;

        case 3:
          return this.menus[0].menuItems[plantId].stateImages.grown;

        case 4:
          switch (plantStateBeforeDeath) {
            case 1:
              return this.menus[0].menuItems[plantId].stateImages.sapling;

            case 2:
              return this.menus[0].menuItems[plantId].stateImages.young;
          }
          break;

        default:
          return "";
      }
    },
  },
  mounted: function () {
    this.navigationItems[1].icon = this.menus[0].menuItems[0].icon;
    this.navigationItems[2].icon = this.menus[1].menuItems[0].icon;
    this.navigationItems[3].icon = this.menus[2].menuItems[0].icon;

    const garden = document.getElementsByClassName("garden");

    garden[0].addEventListener("click", (event) => {
      if (
        event.target.closest(".ui, .menu") === null &&
        this.menuIsOpen === true
      ) {
        this.menuIsOpen = false;
      }
    });
  },
};
</script>

<style scoped lang="scss">
@use "../scss/animations";

.garden {
  background-image: url("../assets/tiles/tile-grass.png");
  min-height: calc(100vh - 40px);
  padding: 20px;
  overflow: hidden;

  &::before {
    opacity: 0.3;
    content: "";
    position: fixed;
    top: -100px;
    left: 0;
    width: 100vw;
    height: 50vh;
    pointer-events: none;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 226, 1) 0%,
      rgba(255, 255, 226, 1) 35%,
      rgba(255, 255, 226, 0) 100%
    );
    z-index: 3;

    @media (prefers-color-scheme: dark) {
      display: none;
    }
  }

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
      background-image: url("../assets/tiles/tile-earth.png");
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
        background-image: url("../assets/tiles/tile-earth.png");
      }

      &:hover,
      &:focus {
        transform: scale(1.1);
      }

      &:active {
        transform: scale(0.95);
      }

      &.wet {
        background-image: url("../assets/tiles/tile-earth-wet.png");
      }

      &.wetter {
        background-image: url("../assets/tiles/tile-earth-wetter.png");
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
}

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
    z-index: 2;
  }

  &::after {
    top: 50px;
    animation: clouds 35s infinite linear alternate;

    @media (min-width: 720px) {
      animation: clouds 65s infinite linear alternate;
    }
  }

  &::before {
    top: 200px;
    animation-delay: 10s;
    animation: clouds 35s infinite linear alternate-reverse;

    @media (min-width: 720px) {
      animation: clouds 65s infinite linear alternate-reverse;
    }
  }
}

.ui {
  position: fixed;
  animation: animations.$bg-tr-tl;
  bottom: 0;
  left: 50%;
  width: 100%;
  max-width: 720px;
  height: 120px;
  background-image: url("../assets/ui/ui-bg.png");
  border-top: 3px solid white;
  box-shadow: 0 0 15px 15px rgba(37, 34, 49, 0.1);
  transform: translateX(-50%);
  z-index: 4;

  @media (min-width: 720px) {
    border: none;
    box-shadow: none;
    border: 2px solid white;
    bottom: -2px;
  }

  &__inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    gap: 25px;
    padding: 10px;

    button {
      cursor: pointer;
      background-color: transparent;
      border: none;
      // filter: drop-shadow(3px 0 0 white) drop-shadow(-3px 0 0 white)
      //   drop-shadow(0 3px 0 white) drop-shadow(0 -3px 0 white);
      padding: 0;
      transform: scale(1);
      transition: transform 0.25s ease-in-out;

      &:hover,
      &:focus {
        transform: scale(1.1);
      }

      &:active {
        transform: scale(0.95);
      }

      &.active {
        img {
          filter: drop-shadow(3px 0 0 white) drop-shadow(-3px 0 0 white)
            drop-shadow(0 3px 0 white) drop-shadow(0 -3px 0 white);
        }
      }

      img {
        height: 50px;
        width: 50px;
        object-fit: contain;
      }

      span {
        display: block;
        color: white;
        font-weight: 900;
        font-size: 16px;
        margin-top: 0;
      }
    }
  }
}

.menus {
  .menu {
    position: fixed;
    bottom: 140px;
    left: 50%;
    width: 100vw;
    height: 100vh;
    max-width: 300px;
    max-height: 280px;
    border-radius: 26px;
    padding: 10px;
    background-image: url("../assets/ui/ui-bg.png");
    animation: animations.$bg-tr-tl;
    border: 3px solid white;
    display: grid;
    grid-template-columns: 1fr 1fr;
    box-shadow: 0 0 15px 15px rgba(37, 34, 49, 0.1);
    z-index: 4;
    transform: scale(0) translateX(-50%);
    transform-origin: bottom left;
    transition: transform 0.25s ease-in-out;

    &.active {
      transform: scale(1) translateX(-50%);
    }

    &.seeds {
      grid-template-columns: 1fr 1fr 1fr;
    }

    button {
      background-color: transparent;
      border: none;
      width: 80px;
      height: 80px;
      margin: auto;
      padding: 0;
      position: relative;
      transform: scale(1);
      transition: transform 0.25s ease-in-out;
      cursor: pointer;

      &:hover,
      &:focus {
        transform: scale(1.1);
      }

      &:active {
        transform: scale(0.95);
      }

      &.active {
        img {
          filter: drop-shadow(3px 0 0 white) drop-shadow(-3px 0 0 white)
            drop-shadow(0 3px 0 white) drop-shadow(0 -3px 0 white)
            drop-shadow(0 15px 15px rgba(37, 34, 49, 0.1));
        }
      }

      img {
        display: block;
        width: 64px;
        height: 64px;
        object-fit: contain;
        margin: auto;
      }

      span {
        display: block;
        color: white;
        font-weight: 900;
        font-size: 16px;
        position: absolute;
        bottom: -30px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}

.feedbacktext {
  position: fixed;
  max-width: calc(100vw - 40px);
  width: 100%;
  top: 20px;
  left: 50%;
  z-index: 5;
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

.nightlayer {
  display: none;

  @media (prefers-color-scheme: dark) {
    display: block;
    pointer-events: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: steelblue;
    mix-blend-mode: multiply;
    opacity: 0.75;
    z-index: 3;
  }
}

.fireflies {
  position: fixed;
  top: 50%;
  left: 0;
  z-index: 4;
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
