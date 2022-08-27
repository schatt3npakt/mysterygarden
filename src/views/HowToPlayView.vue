<template>
  <div class="how-to">
    <div class="page">
      <div class="headline">How To Play</div>

      <div class="content">
        <p class="intro">
          The master druid has run out of herbs! As his apprentice, it's your
          job to refill the stock.
        </p>

        <div class="content-headline">Get to work!</div>

        <p>
          Your master wrote down the herbs you have to plant and harvest, gave
          you a bundle of seeds and left. Unfortunately, he
          <b>didn't bother to tell you which seed grows into which herb</b>.
          Your job is to <b>grow the herbs</b>, <b>harvest them</b> and
          <b>find out what they are</b>!
        </p>

        <!-- <img src="https://via.placeholder.com/300x200" alt="" /> -->

        <div class="content-headline">Tasks</div>

        <p>
          Look at the <b>Tasks</b> your master left for you. Each <b>Task</b> is
          a herb found in the master's <b>Almanach</b>. If you know what herb
          you've grown, harvest it and assign it to the corresponding task.
          Assign every herb correctly and you win!
        </p>

        <!-- <img src="https://via.placeholder.com/300x200" alt="" /> -->

        <div class="content-headline">Almanach</div>

        <p>
          The great <b>Druid Almanach</b> lists every herb, plant and weed an
          aspiring druid ought to know. Your master wrote down names, properties
          and cultivation instructions for every herb at your disposal. Study
          the entries well! They are the key to identifying the herbs.
        </p>

        <!-- <img src="https://via.placeholder.com/300x200" alt="" /> -->

        <div class="content-headline">Growing herbs</div>

        <p>
          You grow herbs inside the <b>Garden</b>. Don't worry, you have plenty
          of seeds available! To successfully grow a herb, you need to do three
          things: <b>Plant the herb, water it and cast a spell on it</b>. Some
          herbs are easy to care for, others are very delicate and might wither
          if you don't treat them correctly. Pay close attention to the herbs'
          needs, they might help you to identify them!
        </p>

        <!-- <img src="https://via.placeholder.com/300x200" alt="" /> -->
      </div>
    </div>

    <BackButton />
  </div>
</template>

<script>
import BackButton from "@/components/BackButton.vue";

export default {
  computed: {
    herbs() {
      return this.$store.state.availableHerbs;
    },
  },
  components: {
    BackButton,
  },
  name: "HotToPlayView",
};
</script>

<style scoped lang="scss">
@use "../scss/animations";

.how-to {
  background-image: url("../assets/ui/ui-bg.png");
  animation: animations.$bg-tr-bl;
  padding: 10px;
  height: calc(100vh - 20px);
  overflow: auto;

  .headline {
    color: rgb(63, 165, 224) !important;
    font-weight: 900;
    font-size: 40px;
    filter: drop-shadow(2px 0 0 white) drop-shadow(-2px 0 0 white)
      drop-shadow(0 2px 0 white) drop-shadow(0 -2px 0 white);
  }

  .content {
    max-width: 720px;
    margin: 30px auto 0 auto;
    background-color: white;
    text-align: left;
    hyphens: auto;
    font-size: 18px;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 0 15px 15px rgba(37, 34, 49, 0.1);

    .content-headline {
      color: rgb(63, 165, 224) !important;
      font-size: 28px;
      font-weight: 900;
      margin-bottom: 0;
      line-height: 0.1;
    }

    img {
      display: block;
      margin: 0 auto 40px auto;
      border-radius: 15px;
    }

    p {
      margin: 20px auto 80px auto;

      b {
        color: rgb(63, 165, 224) !important;
        font-weight: 900;
      }

      &.intro {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 50px;
      }
    }
  }
}
</style>
