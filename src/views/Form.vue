<template>
  <div id="form">
    <NavigationBar />
    <p class="notice">{{ notice }}</p>

    <!-- Iframe defaults to the non prefilled form -->
    <iframe
      id="google_form"
      src="https://docs.google.com/forms/d/e/1FAIpQLSc2vDScbMRJ9YWeDM9Q99jl_gJm4YVpYOGX3i4hCGmASHyVyw/viewform?embedded=true"
      height="1120"
      frameborder="0"
      scrolling="no"
      @load="formLoaded"
    />
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";

export default {
  components: {
    NavigationBar
  },
  data() {
    const userPrefilledForm = this.$store.state.forms[
      this.$store.state.user.email
    ];
    if (userPrefilledForm) this.loadPreFilledForm(userPrefilledForm);

    return {
      notice: "Loading standup form…"
    };
  },
  methods: {
    formLoaded() {
      console.log("google form loaded");
      this.notice = "";
    },
    loadPreFilledForm(formURL) {
      // Scroll to the top of the page
      window.scrollTo(0, 0);

      // Update user that pre filled form is found
      this.notice = "Found pre filled form, loading it now...";

      // Update the source of the iframe to load the new pre-filled form
      document.getElementById("google_form").src = formURL;
    }
  }
};
</script>

<style scoped></style>
