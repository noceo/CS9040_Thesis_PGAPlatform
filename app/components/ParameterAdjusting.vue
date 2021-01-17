<template>
  <div>
    <div class="paramgroup">
      <h4>L-System related parameters</h4>
      <div class="bg-white border rounded-md">
        <ValueInput class="block" type="text" copy="Axiom" />
        <!-- <ValueInput class="block" type="text" copy="TestValueInput" /> -->
      </div>
    </div>
    <div class="paramgroup">
      <h4>Groupname</h4>
      <div class="bg-white border rounded-md">
        <ValueSlider :copy="'Test'" :min-max="[0, 1]" :interval="0.01" />
        <ValueSlider :copy="'Test'" />
        <ValueSlider :copy="'Test'" />
        <ValueSlider :copy="'Test'" />
        <ValueSlider :copy="'Test'" />
        <ValueSlider :copy="'Test'" />
        <ValueSlider :copy="'Test'" />
        <ValueSlider :copy="'Test'" />
        <ValueSlider :copy="'Test'" />
        <ValueSlider :copy="'Test'" />
        <ValueSlider :copy="'Test'" />
        <ValueSlider :copy="'Test'" />
        <ValueSlider :copy="'Test'" />
        <ValueSlider :copy="'Test'" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style lang="postcss" scoped>
.paramgroup > div {
  @apply border-b rounded-b-none;

  &:last-child {
    @apply border-b-0 rounded-b;
  }
}
</style>
