<template>
  <div :class="classes" ref="cell">
    <template v-if="renderType === 'index'">
      <span>{{
        column.indexMethod ? column.indexMethod(row) : naturalIndex + 1
      }}</span>
    </template>
    <template v-if="renderType === 'selection'">
      <Checkbox
        :value="checked"
        @click.native.stop="handleClick"
        @on-change="toggleSelect"
        :disabled="disabled"
      ></Checkbox>
    </template>
    <template v-if="renderType === 'html'">
      <span v-html="row[column.key]"></span>
    </template>
    <template v-if="renderType === 'normal'">
      <template v-if="column.tooltip">
        <Tooltip
          transfer
          :placement="column.tooltipPlacement"
          :content="row[column.key]"
          :theme="tableRoot.tooltipTheme"
          :disabled="!showTooltip && !tooltipShow"
          :max-width="300"
          class="bee-table-cell-tooltip"
          @on-popper-show="handleTooltipShow"
          @on-popper-hide="handleTooltipHide"
        >
          <span
            ref="content"
            @mouseenter="handleTooltipIn"
            @mouseleave="handleTooltipOut"
            class="bee-table-cell-tooltip-content"
            >{{ row[column.key] }}</span
          >
        </Tooltip>
      </template>
      <span v-else>{{ cellText(row, column) }}</span>
    </template>
    <template v-if="renderType === 'expand' && !row._disableExpand">
      <div :class="expandCls" @click="toggleExpand">
        <Icon
          customPrefixCls
          customIconCls="bee-sys-icon"
          type="ios-arrow-forward"
        ></Icon>
      </div>
    </template>
    <table-expand
      v-if="renderType === 'render'"
      :row="row"
      :column="column"
      :index="index"
      :render="column.render"
    ></table-expand>
    <table-slot
      v-if="renderType === 'slot'"
      :row="row"
      :column="column"
      :index="index"
    ></table-slot>
  </div>
</template>
<script>
import TableExpand from "./expand";
import TableSlot from "./slot";
import Icon from "../icon/icon.vue";
import Checkbox from "../checkbox/checkbox.vue";
import Tooltip from "../tooltip/tooltip.vue";

import {
    DEFAULT_FORMATS,
    TYPE_VALUE_RESOLVER_MAP,
    getDayCountOfMonth
} from "../date-picker/util";

export default {
    name: "TableCell",
    components: { Icon, Checkbox, TableExpand, TableSlot, Tooltip },
    inject: ["tableRoot"],
    props: {
        prefixCls: String,
        row: Object,
        column: Object,
        naturalIndex: Number,
        index: Number,
        checked: Boolean,
        disabled: Boolean,
        expanded: Boolean,
        fixed: {
            type: [Boolean, String],
            default: false
        }
    },
    data() {
        return {
            renderType: "",
            uid: -1,
            context: this.$parent.$parent.$parent.currentContext,
            showTooltip: false,
            tooltipShow: false
        };
    },
    computed: {
        classes() {
            return [
                `${this.prefixCls}-cell`,
                {
                    [`${this.prefixCls}-hidden`]:
                        !this.fixed &&
                        this.column.fixed &&
                        (this.column.fixed === "left" ||
                            this.column.fixed === "right"),
                    [`${this.prefixCls}-cell-ellipsis`]:
                        this.column.ellipsis || false,
                    [`${this.prefixCls}-cell-with-expand`]:
                        this.renderType === "expand",
                    [`${this.prefixCls}-cell-with-selection`]:
                        this.renderType === "selection"
                }
            ];
        },
        expandCls() {
            return [
                `${this.prefixCls}-cell-expand`,
                {
                    [`${this.prefixCls}-cell-expand-expanded`]: this.expanded
                }
            ];
        },
        cellText() {
            return (row, column) => {
                if (column.type === "date") {
                    const format =
                        column.format || DEFAULT_FORMATS[column.dateType];
                    const formatter = (
                        TYPE_VALUE_RESOLVER_MAP["datetime"] ||
                        TYPE_VALUE_RESOLVER_MAP["default"]
                    ).formatter;

                    return formatter(row[column.key], format);
                }
                return row[column.key];
            };
        }
    },
    methods: {
        toggleSelect() {
            this.$parent.$parent.$parent.toggleSelect(this.index);
        },
        toggleExpand() {
            this.$parent.$parent.$parent.toggleExpand(this.index);
        },
        handleClick() {},
        handleTooltipIn() {
            const $content = this.$refs.content;
            this.showTooltip = $content.scrollWidth > $content.offsetWidth;
        },
        handleTooltipOut() {
            this.showTooltip = false;
        },
        handleTooltipShow() {
            this.tooltipShow = true;
        },
        handleTooltipHide() {
            this.tooltipShow = false;
        }
    },
    created() {
        if (this.column.type === "index") {
            this.renderType = "index";
        } else if (this.column.type === "selection") {
            this.renderType = "selection";
        } else if (this.column.type === "html") {
            this.renderType = "html";
        } else if (this.column.type === "expand") {
            this.renderType = "expand";
        } else if (this.column.render) {
            this.renderType = "render";
        } else if (this.column.slot) {
            this.renderType = "slot";
        } else {
            this.renderType = "normal";
        }

        if (this.tableRoot.defaultCell === true) {
            this.renderType = "slot";
        }
    }
};
</script>
