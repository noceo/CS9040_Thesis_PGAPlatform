<template>
  <client-only>
    <notifications group="all" position="top left">
      <template slot="body" slot-scope="props">
        <div class="flex items-start mt-3 ml-3 p-3 bg-white rounded shadow-lg">
          <div class="flex-shrink-0 text-icon mr-3">
            <ExclamationCircleIcon
              name="outline/outline-exclamation-circle"
              class="text-icon text-red-500"
            />
          </div>
          <div class="flex-1 content text-sm mr-2">
            <p class="error mt-0">{{ props.item.title }}</p>
            <p class="copy-sm">{{ props.item.text }}</p>
          </div>
          <button class="text-icon focus:outline-none" @click="props.close">
            <XIcon />
          </button>
        </div>

        <!-- <div class="bg-white rounded shadow-lg">
          <a class="title">
            {{ props.item.title }}
          </a>
          <a class="close" @click="props.close">
            <i class="fa fa-fw fa-close"></i>
          </a>
          <div v-html="props.item.text"></div>
        </div> -->
      </template>
    </notifications>
  </client-only>
</template>

<script lang="ts">
import Vue from 'vue'
import ExclamationCircleIcon from '~/assets/icons/outline/exclamation-circle.svg?inline'
import XIcon from '~/assets/icons/outline/x.svg?inline'
export default Vue.extend({
  name: 'NotificationStack',
  components: { ExclamationCircleIcon, XIcon },
})
</script>
