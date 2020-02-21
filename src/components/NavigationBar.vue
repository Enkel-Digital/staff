<template>
  <div class="nav">
    <button id="back-btn" @click="back">Back</button>
    <button id="home-btn" @click="home">Home</button>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.back();
    },
    home() {
      // Route user back to home page
      this.$router.push({ name: "home" });
    }
  }
};
</script>

<style scoped>
.nav {
  position: fixed;
  z-index: 100;

  left: 0vw;
  bottom: 0vh;
  min-width: 100vw;
  height: 2em;

  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-template-areas: "back-btn home-btn";
  grid-gap: 1em;
}

button {
  color: blue;

  border-style: solid;
  border-width: thin;
  border-radius: 4em;
}
</style>
