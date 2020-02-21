<template>
  <div>
    <NavigationBar />
    <p>Ordered by latest event</p>
    <table>
      <tr>
        <th>Name</th>
        <th>Device</th>
        <th>ID</th>
        <th>Status</th>
        <th>time</th>
        <th>Email</th>
      </tr>
      <tr v-for="snapshot in history" v-bind:key="snapshot.historyId">
        <td>{{ snapshot.name }}</td>
        <td>{{ snapshot.device }}</td>
        <td>{{ snapshot.id }}</td>
        <td>{{ snapshot.status }}</td>
        <td>{{ snapshot.time }}</td>
        <td>{{ snapshot.email }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";

export default {
  components: {
    NavigationBar
  },
  /* Update data to be real time binded so it updates as someone else changes it. */
  data: function() {
    return {
      history: this.$store.state.history
    };
  }
};
</script>

<style scoped>
table {
  width: 96vw;
  border: 1px solid grey;
}

td,
th {
  border: 1px solid grey;
}
</style>
