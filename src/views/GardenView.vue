<template>
  <div class="garden">
    <div class="nightlayer"></div>

    <GardenFireflies />

    <GardenClouds />

    <GardenFeeedbackText :showFeedbackText="showFeedbackText" />

    <GardenPatches
      :patches="patches"
      :patchClickHandler="patchClickHandler"
      :constructPlantImagePath="constructPlantImagePath"
    />

    <GardenFence />

    <div class="ui">
      <div class="ui__inner">
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
import GardenClouds from "@/components/garden/GardenClouds.vue";
import GardenFence from "@/components/garden/GardenFence.vue";
import GardenFireflies from "@/components/garden/GardenFireflies.vue";
import GardenPatches from "@/components/garden/GardenPatches.vue";
import GardenFeeedbackText from "@/components/garden/GardenFeeedbackText.vue";

export default {
  name: "GardenView",
  components: {
    GardenClouds,
    GardenFeeedbackText,
    GardenFence,
    GardenFireflies,
    GardenPatches,
  },
  computed: {
    patches() {
      return this.$store.state.patches;
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
@use "../scss/zIndex";

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
    z-index: zIndex.$gardenSunshine;

    @media (prefers-color-scheme: dark) {
      display: none;
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
  transform: translateX(-50%);
  z-index: zIndex.$gardenUi;

  @media (min-width: 720px) {
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
    z-index: zIndex.$gardenUiMenus;
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
    z-index: zIndex.$gardenNightlayer;
  }
}
</style>
