<template>
  <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">

    <template v-for="(component, $index) in demo.mainComponents">
      <Component :is="component" />
    </template>

    <Architecture/>

    <Logs :app="demo.app" />

    <CodeSample />

    <UserStatus />

  </div>
</template>
<script>
import Logs from "~/components/demo/Logs.vue";
import UserStatus from "~/components/demo/UserStatus.vue";
import CodeSample from "./CodeSample";
import Architecture from "./Architecture";

export default {
  components: {
    Architecture,
    CodeSample,
    Logs,
    UserStatus,
  },
  props: {
    demo: {
      type: Object,
      required: true,
    },
  },
};
</script>
