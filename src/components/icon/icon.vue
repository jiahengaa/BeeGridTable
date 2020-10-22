<template>
  <i :class="classes" :style="styles" @click="handleClick"></i>
</template>
<script>
const defaultIconCls = "bee-icon";
const prefixCls = "icon-";

export default {
  name: "Icon",
  props: {
    type: {
      type: String,
      default: "",
    },
    size: [Number, String],
    color: String,
    custom: {
      type: String,
      default: "",
    },
    customIconCls: {
      type: String,
      default: "bee-icon",
      required: false,
    },
    customPrefixCls: {
      type: String,
      default: "icon-",
      required: false,
    },
  },
  computed: {
    classes() {
      return [
        `${this.customIconCls}`,
        {
          [`${
            this.customPrefixCls === undefined
              ? prefixCls
              : this.customPrefixCls
          }${this.type}`]: this.type !== "",
          [`${this.custom}`]: this.custom !== "",
        },
      ];
    },
    styles() {
      let style = {};

      if (this.size) {
        style["font-size"] = `${this.size}px`;
      }

      if (this.color) {
        style.color = this.color;
      }

      return style;
    },
  },
  methods: {
    handleClick(event) {
      this.$emit("click", event);
    },
  },
};
</script>
