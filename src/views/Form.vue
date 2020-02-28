<template>
  <div id="form">
    <NavigationBar />
    <p class="notice">{{ notice }}</p>

    <!-- Iframe defaults to the non prefilled form -->
    <iframe
      id="google_form"
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
    return {
      notice: "Loading standup form…"
    };
  },
  mounted() {
    this.loadForm();
  },
  methods: {
    formLoaded() {
      console.log("google form loaded");
      this.notice = "";
    },
    loadForm(formURL) {
      // Scroll to the top of the page
      window.scrollTo(0, 0);

      // Default embeddable form
      formURL =
        "https://docs.google.com/forms/d/e/1FAIpQLSc2vDScbMRJ9YWeDM9Q99jl_gJm4YVpYOGX3i4hCGmASHyVyw/viewform?embedded=true";

      /* Format the date nicely so it can used in the URL string for getting a pre-filled form */
      const date = new Date();
      const currentMonth =
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1;
      const currentDate =
        date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
      const datePreFill = `&entry.1613076786=${date.getFullYear()}-${currentMonth}-${currentDate}`;
      console.log(`Date used for form prefill: ${datePreFill}`);
      formURL += datePreFill;

      const userName = `&entry.2047896550=${this.$store.state.user.name}`;
      console.log(`Name used for form prefill: ${userName}`);
      formURL += userName;

      // Update source of iframe to load pre-filled form
      console.log("Form URL used: ", formURL);
      document.getElementById("google_form").src = formURL;
    }
  }
};
</script>

<style scoped></style>
