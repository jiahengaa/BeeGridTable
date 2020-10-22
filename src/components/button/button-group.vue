<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>
<script>
import { oneOf } from "../../utils/assist";

const prefixCls = "bee-btn-group";

export default {
  name: "ButtonGroup",
  props: {
    size: {
      validator(value) {
        return oneOf(value, ["small", "large", "default"]);
      },
      default() {
        return !this.$BEETABLE || this.$BEETABLE.size === ""
          ? "default"
          : this.$BEETABLE.size;
      },
    },
    shape: {
      validator(value) {
        return oneOf(value, ["circle", "circle-outline"]);
      },
    },
    vertical: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.size}`]: !!this.size,
          [`${prefixCls}-${this.shape}`]: !!this.shape,
          [`${prefixCls}-vertical`]: this.vertical,
        },
      ];
    },
  },
};
</script>
