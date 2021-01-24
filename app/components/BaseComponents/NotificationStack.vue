<template>
  <client-only>
    <notifications group="all" position="top left">
      <template slot="body" slot-scope="props">
        <div
          class="flex items-start mt-3 ml-3 p-3 bg-gray-300 rounded shadow-lg"
        >
          <div class="flex-shrink-0 text-icon mr-3">
            <template v-if="props.item.type === 'success'">
              <SuccessIcon class="text-icon text-green-500" />
            </template>
            <template v-if="props.item.type === 'error'">
              <ErrorIcon class="text-icon text-red-500" />
            </template>
            <template v-if="props.item.type === 'alert'">
              <AlertIcon class="text-icon text-yellow-500" />
            </template>
            <template v-if="props.item.type === 'info'">
              <InfoIcon class="text-icon text-gray-700" />
            </template>
          </div>
          <div class="flex-1 content text-sm mr-2">
            <p class="error mt-0">{{ props.item.title }}</p>
            <p class="copy-sm">{{ props.item.text }}</p>
          </div>
          <button class="text-icon focus:outline-none" @click="props.close">
            <XIcon />
          </button>
        </div>
      </template>
    </notifications>
  </client-only>
</template>

<script lang="ts">
import Vue from 'vue'
import SuccessIcon from '~/assets/icons/outline/success.svg?inline'
import ErrorIcon from '~/assets/icons/outline/error.svg?inline'
import AlertIcon from '~/assets/icons/outline/alert.svg?inline'
import InfoIcon from '~/assets/icons/outline/info.svg?inline'
import XIcon from '~/assets/icons/outline/x.svg?inline'
export default Vue.extend({
  name: 'NotificationStack',
  components: {
    SuccessIcon,
    ErrorIcon,
    AlertIcon,
    InfoIcon,
    XIcon,
  },
})
</script>
