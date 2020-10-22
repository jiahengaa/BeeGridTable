<template>
  <div class="bee-cell-item">
    <div class="bee-cell-icon">
      <slot name="icon"></slot>
    </div>
    <div class="bee-cell-main">
      <div class="bee-cell-title">
        <slot>{{ title }}</slot>
      </div>
      <div class="bee-cell-label">
        <slot name="label">{{ label }}</slot>
      </div>
    </div>
    <div class="bee-cell-footer">
      <span class="bee-cell-extra">
        <slot name="extra">{{ extra }}</slot>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    extra: {
      type: String,
      default: "",
    },
  },
};
</script>