export function setRandomHerbs(state) {
  // Copy all herbs with first slice, shuffle the array, then take the first three entries
  // TODO: get number of herbs from game options
  const herbs = require("@/data/herbs.json");
  // const selectedHerbs = shuffle(herbs.slice()).slice(0, 3);
  state.availableHerbs = herbs;
  state.taskHerbs = shuffle(herbs.slice()).slice(0, 2);
}

/**
 * https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
