<template>
  <div
    :class="[prefixCls]"
    @mouseenter="handleShowPopper"
    @mouseleave="handleClosePopper"
  >
    <div :class="[prefixCls + '-rel']" ref="reference">
      <slot></slot>
    </div>
    <transition name="fade">
      <div
        :class="[prefixCls + '-popper', prefixCls + '-' + theme]"
        :style="dropStyles"
        ref="popper"
        v-show="!disabled && (visible || always)"
        @mouseenter="handleShowPopper"
        @mouseleave="handleClosePopper"
        :data-transfer="transfer"
        v-transfer-dom
      >
        <div :class="[prefixCls + '-content']">
          <div :class="[prefixCls + '-arrow']"></div>
          <div :class="innerClasses" :style="innerStyles">
            <slot name="content">{{ content }}</slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import Popper from "../base/popper";
import TransferDom from "../../directives/transfer-dom";
import { oneOf } from "../../utils/assist";
import { transferIndex, transferIncrease } from "../../utils/transfer-queue";

const prefixCls = "bee-tooltip";

export default {
  name: "Tooltip",
  directives: { TransferDom },
  mixins: [Popper],
  props: {
    placement: {
      validator(value) {
        return oneOf(value, [
          "top",
          "top-start",
          "top-end",
          "bottom",
          "bottom-start",
          "bottom-end",
          "left",
          "left-start",
          "left-end",
          "right",
          "right-start",
          "right-end",
        ]);
      },
      default: "bottom",
    },
    content: {
      type: [String, Number],
      default: "",
    },
    delay: {
      type: Number,
      default: 100,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    controlled: {
      type: Boolean,
      default: false,
    },
    always: {
      type: Boolean,
      default: false,
    },
    transfer: {
      type: Boolean,
      default() {
        return !this.$BEETABLE || this.$BEETABLE.transfer === ""
          ? false
          : this.$BEETABLE.transfer;
      },
    },
    theme: {
      validator(value) {
        return oneOf(value, ["dark", "light"]);
      },
      default: "dark",
    },
    maxWidth: {
      type: [String, Number],
    },
  },
  data() {
    return {
      prefixCls: prefixCls,
      tIndex: this.handleGetIndex(),
    };
  },
  computed: {
    innerStyles() {
      const styles = {};
      if (this.maxWidth) styles["max-width"] = `${this.maxWidth}px`;
      return styles;
    },
    innerClasses() {
      return [
        `${prefixCls}-inner`,
        {
          [`${prefixCls}-inner-with-width`]: !!this.maxWidth,
        },
      ];
    },
    dropStyles() {
      let styles = {};

      let baseZIndex = 1060;
      if (this.$BEETABLE) {
        if (this.$BEETABLE.zIndex) {
          baseZIndex = this.$BEETABLE.zIndex;
        }
      }
      if (this.transfer) styles["z-index"] = baseZIndex + this.tIndex;

      return styles;
    },
  },
  watch: {
    content() {
      this.updatePopper();
    },
  },
  methods: {
    handleShowPopper() {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.visible = true;
      }, this.delay);
      this.tIndex = this.handleGetIndex();
    },
    handleClosePopper() {
      if (this.timeout) {
        clearTimeout(this.timeout);
        if (!this.controlled) {
          this.timeout = setTimeout(() => {
            this.visible = false;
          }, 100);
        }
      }
    },
    handleGetIndex() {
      transferIncrease();
      return transferIndex;
    },
  },
  mounted() {
    if (this.always) {
      this.updatePopper();
    }
  },
};
</script>
