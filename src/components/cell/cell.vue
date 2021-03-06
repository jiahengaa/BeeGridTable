<template>
  <div :class="classes">
    <a
      v-if="to"
      :href="linkUrl"
      :target="target"
      class="bee-cell-link"
      @click.exact="handleClickItem($event, false)"
      @click.ctrl="handleClickItem($event, true)"
      @click.meta="handleClickItem($event, true)"
    >
      <CellItem :title="title" :label="label" :extra="extra">
        <slot name="icon" slot="icon"></slot>
        <slot slot="default"></slot>
        <slot name="extra" slot="extra"></slot>
        <slot name="label" slot="label"></slot>
      </CellItem>
    </a>
    <div class="bee-cell-link" v-else @click="handleClickItem">
      <CellItem :title="title" :label="label" :extra="extra">
        <slot name="icon" slot="icon"></slot>
        <slot slot="default"></slot>
        <slot name="extra" slot="extra"></slot>
        <slot name="label" slot="label"></slot>
      </CellItem>
    </div>
    <div class="bee-cell-arrow" v-if="to">
      <slot name="arrow">
        <Icon
          :type="arrowType"
          :custom="customArrowType"
          customPrefixCls
          customIconCls="bee-sys-icon"
          :size="arrowSize"
        />
      </slot>
    </div>
  </div>
</template>
<script>
import CellItem from "./cell-item.vue";
import Icon from "../icon/icon.vue";
import mixinsLink from "../../mixins/link";

const prefixCls = "bee-cell";

export default {
  name: "Cell",
  inject: ["cellGroup"],
  mixins: [mixinsLink],
  components: { CellItem, Icon },
  props: {
    name: {
      type: [String, Number],
    },
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
    disabled: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      prefixCls: prefixCls,
    };
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-disabled`]: this.disabled,
          [`${prefixCls}-selected`]: this.selected,
          [`${prefixCls}-with-link`]: this.to,
        },
      ];
    },
    arrowType() {
      let type = "ios-arrow-forward";

      if (this.$BEETABLE) {
        if (this.$BEETABLE.cell.customArrow) {
          type = "";
        } else if (this.$BEETABLE.cell.arrow) {
          type = this.$BEETABLE.cell.arrow;
        }
      }
      return type;
    },
    customArrowType() {
      let type = "";

      if (this.$BEETABLE) {
        if (this.$BEETABLE.cell.customArrow) {
          type = this.$BEETABLE.cell.customArrow;
        }
      }
      return type;
    },
    arrowSize() {
      let size = "";

      if (this.$BEETABLE) {
        if (this.$BEETABLE.cell.arrowSize) {
          size = this.$BEETABLE.cell.arrowSize;
        }
      }
      return size;
    },
  },
  methods: {
    handleClickItem(event, new_window) {
      this.cellGroup.handleClick(this.name);

      this.handleCheckClick(event, new_window);
    },
  },
};
</script>