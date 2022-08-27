import { Howl } from "howler";

function playSound(sound) {
  const loadedSound = new Howl({
    src: [sound],
  });

  loadedSound.play();
}

export function playClickSound() {
  playSound("test");
}
