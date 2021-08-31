<template>
  <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">

    <template v-for="(component, $index) in demo.mainComponents">
      <Component :is="component" />
    </template>
    <div class="bg-white overflow-hidden sm:rounded-lg sm:shadow col-span-2 lg:col-span-1">
      <div class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Architecture
        </h3>
      </div>
    </div>
    
    <Logs :app="demo.app" />

    <div class="bg-white overflow-hidden sm:rounded-lg sm:shadow col-span-2 lg:col-span-1">
      <div class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Code</h3>
      </div>
    </div>
    
    <UserStatus />

  </div>
</template>
<script>
import Logs from "~/components/demo/Logs.vue";
import UserStatus from "~/components/demo/UserStatus.vue";

export default {
  components: {
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
