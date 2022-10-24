<template>
  <div class="home">
    <div>This is home page!</div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted} from "vue";
import {useRouter} from "vue-router";
import {getCookie} from "@/utils/cookie";

const router = useRouter();

onMounted(() => {
  if (getCookie("userInfo") === '') {
    router.push('/login');
  }
})

</script>
