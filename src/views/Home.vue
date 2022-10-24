<template>
  <div class="home">

  </div>
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import {readSessionString} from "@/common/storage";

export default class Home extends Vue {

  created() {
    if (!readSessionString("userInfo")) {
      debugger
      this.$router.push('/login');
    }
  }
}
</script>
