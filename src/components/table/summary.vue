<template>
  <div style="overflow: hidden">
    <table
      class="bee-table-summary"
      cellspacing="0"
      cellpadding="0"
      border="0"
      :style="styleObject"
    >
      <colgroup>
        <col v-for="(column, index) in columns" :width="setCellWidth(column)" />
      </colgroup>
      <tbody :class="[prefixCls + '-tbody']">
        <tr class="bee-table-row">
          <td
            v-for="(column, index) in columns"
            :class="summaryAlignCls(column)"
          >
            <div class="bee-table-cell" :class="cellCls(column)">
              <span>{{ data[column.key] ? data[column.key].value : "" }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import Mixin from "./mixin";

export default {
  name: "TableSummary",
  mixins: [Mixin],
  props: {
    prefixCls: String,
    styleObject: Object,
    columns: Array,
    data: Object,
    columnsWidth: Object,
    fixed: {
      type: [Boolean, String],
      default: false,
    },
  },
  methods: {
    cellCls(column) {
      return [
        {
          ["bee-table-hidden"]:
            (this.fixed === "left" && column.fixed !== "left") ||
            (this.fixed === "right" && column.fixed !== "right") ||
            (!this.fixed &&
              column.fixed &&
              (column.fixed === "left" || column.fixed === "right")),
        },
      ];
    },
  },
};
</script>
