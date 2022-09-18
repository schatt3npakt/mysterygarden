import { createStore } from "vuex";

const getDefaultState = () => {
  return {
    tutorial: {
      taskTutorialDone: false,
      almanachTutorialDone: false,
      gardenTutorialPlantedDone: false,
      gardenTutorialHydrationDone: false,
      gardenTutorialSpellsDone: false,
      tutorialDone: true,
    },
    language: "de",
    feedbackText: "",
    availableHerbs: [],
    harvestedHerbs: [],
    taskHerbs: [],
    patches: [
      // plant states: 0 unplanted 1 sapling 2 young plant 3 grown 4 dead
      {
        id: 0,
        state: {
          wetness: 0,
          plant: {
            id: 0,
            state: 0,
            stateBeforeDeath: 0,
          },
        },
      },
      {
        id: 1,
        state: {
          wetness: 0,
          plant: {
            id: 0,
            state: 0,
            stateBeforeDeath: 0,
          },
        },
      },
      {
        id: 2,
        state: {
          wetness: 0,
          plant: {
            id: 0,
            state: 0,
            stateBeforeDeath: 0,
          },
        },
      },
      {
        id: 3,
        state: {
          wetness: 0,
          plant: {
            id: 0,
            state: 0,
            stateBeforeDeath: 0,
          },
        },
      },
      {
        id: 4,
        state: {
          wetness: 0,
          plant: {
            id: 0,
            state: 0,
            stateBeforeDeath: 0,
          },
        },
      },
      {
        id: 5,
        state: {
          wetness: 0,
          plant: {
            id: 0,
            state: 0,
            stateBeforeDeath: 0,
          },
        },
      },
      {
        id: 6,
        state: {
          wetness: 0,
          plant: {
            id: 0,
            state: 0,
            stateBeforeDeath: 0,
          },
        },
      },
      {
        id: 7,
        state: {
          wetness: 0,
          plant: {
            id: 0,
            state: 0,
            stateBeforeDeath: 0,
          },
        },
      },
      {
        id: 8,
        state: {
          wetness: 0,
          plant: {
            id: 0,
            state: 0,
            stateBeforeDeath: 0,
          },
        },
      },
    ],
  };
};

const state = getDefaultState();

const mutations = {
  resetState(state) {
    // Merge rather than replace so we don't lose observers
    // https://github.com/vuejs/vuex/issues/1118
    Object.assign(state, getDefaultState());
  },
};

export default createStore({
  state: state,
  getters: {},
  mutations: mutations,
  actions: {},
  modules: {},
});
