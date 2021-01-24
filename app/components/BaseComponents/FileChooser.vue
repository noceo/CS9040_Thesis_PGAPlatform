<template>
  <div class="file-chooser flex items-center pr-px">
    <div class="flex-1 relative">
      <div
        class="drop-area flex justify-center rounded-lg border-gray-300 bg-white hover:border-gray-500"
        :class="[
          fileIsDraggedOver ? 'border-pink-500 border-2 dragover' : 'border',
          { 'border-dashed': !file },
        ]"
        @drop="onDrop"
        @dragover="onDragOver"
        @dragleave="onDragLeave"
      >
        <label
          class="inline-flex flex-wrap-reverse justify-center items-center w-full px-4 text-sm text-pink-500 text-center cursor-pointer"
          :class="[file ? 'py-3' : 'py-6']"
        >
          <template v-if="fileIsProcessed">
            <span class="mr-2 pointer-events-none">{{ fileName }}</span>
          </template>
          <template v-else-if="isLoading">
            <span class="mr-2 pointer-events-none"> Loading </span>
            <LoadingSpinner class="text-icon w-3 h-3" />
          </template>
          <template v-else>
            <span class="mr-2 pointer-events-none">
              Select or drop a file here
            </span>
            <DocumentIcon class="text-icon" />

            <input
              ref="fileInput"
              class="hidden"
              type="file"
              accept="csv"
              @change="onFileSelected"
            />
          </template>
        </label>
      </div>
      <PingNotifier
        class="z-10 absolute top-0 left-0 transform-gpu -translate-x-1/4 -translate-y-1/4"
      />
    </div>
    <BaseButton v-if="file" class="flex-shrink-0" @click="removeFile">
      <XIcon />
    </BaseButton>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import DocumentIcon from '~/assets/icons/outline/document-add.svg?inline'
import XIcon from '~/assets/icons/outline/x.svg?inline'

export default Vue.extend({
  name: 'FileChooser',
  components: { DocumentIcon, XIcon },
  data() {
    return {
      file: null as File | null,
      fileIsDraggedOver: false,
      isLoading: false as boolean,
      fileIsProcessed: false as boolean,
    }
  },
  computed: {
    fileName(): string {
      return this.file?.name.split(/(\\|\/)/g).pop() || ''
    },
  },
  watch: {
    loadProgress(newValue) {
      ;(this.$refs.progressBar as HTMLElement).style.width = `${newValue}%`
    },
  },
  methods: {
    onDragOver(event: DragEvent): void {
      event.preventDefault()
      this.fileIsDraggedOver = true
    },
    onDragLeave(event: DragEvent): void {
      event.preventDefault()
      this.fileIsDraggedOver = false
    },
    onDrop(event: DragEvent): void {
      event.preventDefault()
      this.fileIsDraggedOver = false
      this.processInput(event.dataTransfer!.files)
    },
    onFileSelected(event: any) {
      this.processInput(event.target!.files)
    },
    processInput(files: FileList): void {
      if (!files) {
        return
      }

      this.fileIsProcessed = false

      if (files.length > 1) {
        this.$services.notifications.error({
          title: 'Import Error',
          text: 'Only one file allowed.',
        })
        return
      }
      if (files.length === 1 && files[0].name.split('.').pop() !== 'csv') {
        this.$services.notifications.error({
          title: 'Import Error',
          text: 'Wrong file format. Only .csv allowed.',
        })
        return
      }
      this.file = files[0]

      this.isLoading = true
      this.$services.dataManager
        .processNewFile(this.file, { header: true })
        .then(() => {
          this.fileIsProcessed = true
        })
        .catch(() => {
          this.file = null
        })
        .finally(() => {
          this.isLoading = false
        })
      this.$emit('fileAdded', files)
    },
    removeFile(): void {
      this.fileIsProcessed = false
      this.file = null
    },
  },
})
</script>

<style lang="postcss" scoped>
/* Prevent from bumping because of border-width increase */
.drop-area {
  margin: -1px;
}

.droparea.dragover {
  margin: -2px;
}

label {
  transition: padding 0.3s ease-out;
}

.progress-bar {
  transition: width 2s ease-in-out;
}

.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-500;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>