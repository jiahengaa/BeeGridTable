<template>
  <div :class="wrapClasses" :style="styles">
    <div :class="classes">
      <div :class="[prefixCls + '-title']" v-if="showSlotHeader" ref="title">
        <slot name="header"></slot>
      </div>
      <div
        :class="[prefixCls + '-header']"
        v-if="showHeader"
        ref="header"
        @mousewheel="handleMouseWheel"
      >
        <table-head
          :showFilter="showFilter"
          :prefix-cls="prefixCls"
          :styleObject="tableHeaderStyle"
          :columns="normalColumns"
          :column-rows="columnRows"
          :filter-rows.sync="filterRows"
          :obj-data="objData"
          :columns-width="columnsWidth"
          :data="renderData"
        ></table-head>
      </div>
      <div
        :class="[prefixCls + '-body']"
        :style="bodyStyle"
        ref="body"
        @scroll="handleBodyScroll"
        v-show="
          !(
            (!!localeNoDataText && (!data || data.length === 0)) ||
            (!!localeNoFilteredDataText &&
              (!renderData || renderData.length === 0))
          )
        "
      >
        <table-body
          ref="tbody"
          :draggable="draggable"
          :prefix-cls="prefixCls"
          :styleObject="tableStyle"
          :columns="normalColumns"
          :data="renderData"
          :row-key="rowKey"
          :columns-width="columnsWidth"
          :obj-data="objData"
        ></table-body>
      </div>
      <table-summary
        v-if="showSummary && data && data.length"
        ref="summary"
        :prefix-cls="prefixCls"
        :styleObject="tableStyle"
        :columns="normalColumns"
        :data="summaryData"
        :columns-width="columnsWidth"
      />

      <div
        :class="[prefixCls + '-tip']"
        :style="bodyStyle"
        @scroll="handleBodyScroll"
        v-show="
          (!!localeNoDataText && (!data || data.length === 0)) ||
          (!!localeNoFilteredDataText &&
            (!renderData || renderData.length === 0))
        "
      >
        <table cellspacing="0" cellpadding="0" border="0">
          <tbody>
            <tr>
              <td
                :style="{
                  height: bodyStyle.height,
                  width: `${this.headerWidth}px`,
                }"
              >
                <span
                  v-html="localeNoDataText"
                  v-if="!data || data.length === 0"
                ></span>
                <span v-html="localeNoFilteredDataText" v-else></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        :class="[prefixCls + '-fixed']"
        :style="fixedTableStyle"
        v-if="isLeftFixed"
      >
        <div :class="fixedHeaderClasses" v-if="showHeader">
          <table-head
            :showFilter="showFilter"
            fixed="left"
            :prefix-cls="prefixCls"
            :styleObject="fixedTableStyle"
            :columns="leftFixedColumns"
            :column-rows="columnRows"
            :filter-rows.sync="leftFixedFilterRows"
            :fixed-column-rows="leftFixedColumnRows"
            :obj-data="objData"
            :columns-width="columnsWidth"
            :data="renderData"
          ></table-head>
        </div>
        <div
          :class="[prefixCls + '-fixed-body']"
          :style="fixedBodyStyle"
          ref="fixedBody"
          @mousewheel="handleFixedMousewheel"
          @DOMMouseScroll="handleFixedMousewheel"
        >
          <table-body
            fixed="left"
            :draggable="draggable"
            :prefix-cls="prefixCls"
            :styleObject="fixedTableStyle"
            :columns="leftFixedColumns"
            :data="renderData"
            :row-key="rowKey"
            :columns-width="columnsWidth"
            :obj-data="objData"
          ></table-body>
        </div>
        <table-summary
          v-if="showSummary && data && data.length"
          fixed="left"
          :prefix-cls="prefixCls"
          :styleObject="fixedTableStyle"
          :columns="leftFixedColumns"
          :data="summaryData"
          :columns-width="columnsWidth"
          :style="{
            'margin-top': showHorizontalScrollBar ? scrollBarWidth + 'px' : 0,
          }"
        />
      </div>
      <div
        :class="[prefixCls + '-fixed-right']"
        :style="fixedRightTableStyle"
        v-if="isRightFixed"
      >
        <div :class="fixedHeaderClasses" v-if="showHeader">
          <table-head
            :showFilter="showFilter"
            fixed="right"
            :prefix-cls="prefixCls"
            :styleObject="fixedRightTableStyle"
            :columns="rightFixedColumns"
            :column-rows="columnRows"
            :filter-rows.sync="rightFixedFilterRows"
            :fixed-column-rows="rightFixedColumnRows"
            :obj-data="objData"
            :columns-width="columnsWidth"
            :data="renderData"
          ></table-head>
        </div>
        <div
          :class="[prefixCls + '-fixed-body']"
          :style="fixedBodyStyle"
          ref="fixedRightBody"
          @mousewheel="handleFixedMousewheel"
          @DOMMouseScroll="handleFixedMousewheel"
        >
          <table-body
            fixed="right"
            :draggable="draggable"
            :prefix-cls="prefixCls"
            :styleObject="fixedRightTableStyle"
            :columns="rightFixedColumns"
            :data="renderData"
            :row-key="rowKey"
            :columns-width="columnsWidth"
            :obj-data="objData"
          ></table-body>
        </div>
        <table-summary
          v-if="showSummary && data && data.length"
          fixed="right"
          :prefix-cls="prefixCls"
          :styleObject="fixedRightTableStyle"
          :columns="rightFixedColumns"
          :data="summaryData"
          :columns-width="columnsWidth"
          :style="{
            'margin-top': showHorizontalScrollBar ? scrollBarWidth + 'px' : 0,
          }"
        />
      </div>
      <div
        :class="[prefixCls + '-fixed-right-header']"
        :style="fixedRightHeaderStyle"
        v-if="isRightFixed"
      ></div>
      <div :class="[prefixCls + '-footer']" v-if="showSlotFooter" ref="footer">
        <slot name="footer"></slot>
      </div>

      <div style="margin-top: 15px" v-if="showPager">
        <Page
          show-total
          :filterResultL="localeFilterResultL"
          :filterResultR="localeFilterResultR"
          ref="page"
          style="margin-left: 20px; margin-bottom: 10px"
          :total="data.length"
          :filterTotalData="rebuildData.length"
          size="small"
          show-elevator
          show-sizer
          :pageSize="pageSize"
          :pageCount="pageCount"
          @on-change="onPageChange"
          @on-page-size-change="onPageSizeChange"
        ></Page>
      </div>
    </div>

    <div
      class="bee-table-resize-line"
      v-show="showResizeLine"
      ref="resizeLine"
    ></div>

    <Spin fix size="large" v-if="loading">
      <slot name="loading"></slot>
    </Spin>
    <slot></slot>
  </div>
</template>
<script>
import tableHead from "./table-head.vue";
import tableBody from "./table-body.vue";
import tableSummary from "./summary.vue";
import Spin from "../spin/spin.vue";
import Page from "../page/page.vue";
import {
  oneOf,
  getStyle,
  deepCopy,
  getScrollBarSize,
} from "../../utils/assist";
import { on, off } from "../../utils/dom";
import Csv from "../../utils/csv";
import ExportCsv from "./export-csv";
import ExportXlsx from "./exprot-xlsx";
import Locale from "../../mixins/locale";
import Mixin from "./mixin";
import elementResizeDetectorMaker from "element-resize-detector";
import {
  getAllColumns,
  convertToRows,
  convertColumnOrder,
  getRandomStr,
  getFilterMethod,
} from "./util";

const prefixCls = "bee-table";

let rowKey = 1;
let columnKey = 1;

export default {
  name: "BeeGridTable",
  mixins: [Mixin, Locale],
  components: { tableHead, tableBody, tableSummary, Spin, Page },
  provide() {
    return {
      tableRoot: this,
    };
  },
  props: {
    defaultCell: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
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
    width: {
      type: [Number, String],
    },
    height: {
      type: [Number, String],
    },

    maxHeight: {
      type: [Number, String],
    },
    stripe: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: false,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    showFilter: {
      type: Boolean,
      default: true,
    },
    highlightRow: {
      type: Boolean,
      default: false,
    },
    rowClassName: {
      type: Function,
      default() {
        return "";
      },
    },
    context: {
      type: Object,
    },
    noDataText: {
      type: String,
    },
    noFilteredDataText: {
      type: String,
    },
    disabledHover: {
      type: Boolean,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    draggable: {
      type: Boolean,
      default: false,
    },
    tooltipTheme: {
      validator(value) {
        return oneOf(value, ["dark", "light"]);
      },
      default: "dark",
    },

    rowKey: {
      type: Boolean,
      default: false,
    },

    spanMethod: {
      type: Function,
    },

    showSummary: {
      type: Boolean,
      default: false,
    },

    summaryMethod: {
      type: Function,
    },

    sumText: {
      type: String,
    },
    filterContain: {
      type: String,
    },
    filterNotContain: {
      type: String,
    },
    filterStartWith: {
      type: String,
    },
    filterEndWith: {
      type: String,
    },
    filterResultL: {
      type: String,
    },
    filterResultR: {
      type: String,
    },
    filterEqual: {
      type: String,
    },
    filterNotEqual: {
      type: String,
    },
    filterLess: {
      type: String,
    },
    filterLessEqual: {
      type: String,
    },
    filterLarger: {
      type: String,
    },
    filterLargerEqual: {
      type: String,
    },
    filterBetween: {
      type: String,
    },
    filterBetweenPlaceHolder: {
      type: String,
    },
    resetFilter: {
      type: String,
    },
    showPager: {
      type: Boolean,
      default: true,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    pageCount: {
      type: Number,
      default: 4,
    },
  },
  data() {
    return {
      ready: false,
      tableWidth: 0,
      columnsWidth: {},
      prefixCls: prefixCls,
      compiledUids: [],
      objData: {}, // 增加了 checkbox , highlight-row的属性
      rebuildDataStr: "[]", // 用于重构 sort or filter
      renderData: [],
      cloneColumns: [],
      columnRows: [],
      currentIndex: 0,
      currentSize: 10,
      originalData: "",
      filterRows: [],
      leftFixedColumnRows: [],
      leftFixedFilterRows: [],
      rightFixedColumnRows: [],
      rightFixedFilterRows: [],
      allColumns: [],
      showSlotHeader: true,
      showSlotFooter: true,
      bodyHeight: 0,
      scrollBarWidth: getScrollBarSize(),
      currentContext: this.context,
      showVerticalScrollBar: false,
      showHorizontalScrollBar: false,
      headerWidth: 0,
      headerHeight: 0,
      showResizeLine: false,
    };
  },
  computed: {
    rebuildData() {
      return JSON.parse(this.rebuildDataStr);
    },
    localeNoDataText() {
      if (this.noDataText === undefined) {
        return this.t("i.table.noDataText");
      } else {
        return this.noDataText;
      }
    },
    localeNoFilteredDataText() {
      if (this.noFilteredDataText === undefined) {
        return this.t("i.table.noFilteredDataText");
      } else {
        return this.noFilteredDataText;
      }
    },
    localeSumText() {
      if (this.sumText === undefined) {
        return this.t("i.table.sumText");
      } else {
        return this.sumText;
      }
    },
    localeFilterContain() {
      if (this.filterContain === undefined) {
        return this.t("i.table.filterContain");
      } else {
        return this.filterContain;
      }
    },
    localeFilterNotContain() {
      if (this.filterNotContain === undefined) {
        return this.t("i.table.filterNotContain");
      } else {
        return this.filterNotContain;
      }
    },
    localeFilterStartWith() {
      if (this.filterStartWith === undefined) {
        return this.t("i.table.filterStartWith");
      } else {
        return this.filterStartWith;
      }
    },
    localeFilterEndWith() {
      if (this.filterEndWith === undefined) {
        return this.t("i.table.filterEndWith");
      } else {
        return this.filterEndWith;
      }
    },
    localeResetFilter() {
      if (this.resetFilter === undefined) {
        return this.t("i.table.resetFilter");
      } else {
        return this.resetFilter;
      }
    },
    localeFilterResultL() {
      if (this.filterResultL === undefined) {
        return this.t("i.table.filterResultL");
      } else {
        return this.filterResultL;
      }
    },
    localeFilterResultR() {
      if (this.filterResultR === undefined) {
        return this.t("i.table.filterResultR");
      } else {
        return this.filterResultR;
      }
    },
    localeFilterEqual() {
      if (this.filterEqual === undefined) {
        return this.t("i.table.filterEqual");
      } else {
        return this.filterEqual;
      }
    },
    localeFilterNotEqual() {
      if (this.filterNotEqual === undefined) {
        return this.t("i.table.filterNotEqual");
      } else {
        return this.filterNotEqual;
      }
    },
    localeFilterLess() {
      if (this.filterLess === undefined) {
        return this.t("i.table.filterLess");
      } else {
        return this.filterLess;
      }
    },
    localeFilterLessEqual() {
      if (this.filterLessEqual === undefined) {
        return this.t("i.table.filterLessEqual");
      } else {
        return this.filterLessEqual;
      }
    },
    localeFilterLarger() {
      if (this.filterLarger === undefined) {
        return this.t("i.table.filterLarger");
      } else {
        return this.filterLarger;
      }
    },
    localeFilterLargerEqual() {
      if (this.filterLargerEqual === undefined) {
        return this.t("i.table.filterLargerEqual");
      } else {
        return this.filterLargerEqual;
      }
    },
    localeFilterBetween() {
      if (this.filterBetween === undefined) {
        return this.t("i.table.filterBetween");
      } else {
        return this.filterBetween;
      }
    },
    localeFilterBetweenPlaceHolder() {
      if (this.filterBetweenPlaceHolder === undefined) {
        return this.t("i.table.filterBetweenPlaceHolder");
      } else {
        return this.filterBetweenPlaceHolder;
      }
    },

    wrapClasses() {
      return [
        `${prefixCls}-wrapper`,
        {
          [`${prefixCls}-hide`]: !this.ready,
          [`${prefixCls}-with-header`]: this.showSlotHeader,
          [`${prefixCls}-with-footer`]: this.showSlotFooter,
          [`${prefixCls}-with-summary`]: this.showSummary,
          [`${prefixCls}-wrapper-with-border`]: this.border,
        },
      ];
    },
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.size}`]: !!this.size,
          [`${prefixCls}-border`]: this.border,
          [`${prefixCls}-stripe`]: this.stripe,
          [`${prefixCls}-with-fixed-top`]: !!this.height,
        },
      ];
    },
    fixedHeaderClasses() {
      return [
        `${prefixCls}-fixed-header`,
        {
          [`${prefixCls}-fixed-header-with-empty`]: !this.rebuildData.length,
        },
      ];
    },
    styles() {
      let style = {};
      let summaryHeight = 0;
      let pageRowHeight = 60;
      if (this.showSummary) {
        if (this.size === "small") summaryHeight = 40;
        else if (this.size === "large") summaryHeight = 60;
        else summaryHeight = 48;
      }
      if (this.height) {
        let height = parseInt(this.height) + summaryHeight;
        if (this.showPager) {
          style.height = `${height + pageRowHeight}px`;
        } else {
          style.height = `${height}px`;
        }
      }
      if (this.maxHeight) {
        const maxHeight =
          parseInt(this.maxHeight) + summaryHeight + pageRowHeight;
        if (this.showPager) {
          style.maxHeight = `${maxHeight + pageRowHeight}px`;
        } else {
          style.maxHeight = `${maxHeight}px`;
        }
      }
      if (this.width) style.width = `${this.width}px`;
      return style;
    },
    tableStyle() {
      let style = {};
      if (this.tableWidth !== 0) {
        let width = "";
        if (this.bodyHeight === 0) {
          width = this.tableWidth;
        } else {
          width =
            this.tableWidth -
            (this.showVerticalScrollBar ? this.scrollBarWidth : 0);
        }

        style.width = `${width}px`;
      }
      return style;
    },
    tableHeaderStyle() {
      let style = {};
      if (this.tableWidth !== 0) {
        let width = "";
        width = this.tableWidth;
        style.width = `${width}px`;
      }
      return style;
    },
    fixedTableStyle() {
      let style = {};
      let width = 0;
      this.leftFixedColumns.forEach((col) => {
        if (col.fixed && col.fixed === "left") width += col.width;
      });
      style.width = `${width}px`;

      return style;
    },
    fixedRightTableStyle() {
      let style = {};
      let width = 0;
      this.rightFixedColumns.forEach((col) => {
        if (col.fixed && col.fixed === "right") width += col.width;
      });
      //width += this.scrollBarWidth;
      style.width = `${width}px`;
      style.right = `${this.showVerticalScrollBar ? this.scrollBarWidth : 0}px`;
      return style;
    },
    fixedRightHeaderStyle() {
      let style = {};
      let width = 0;
      let height = this.headerHeight + 1;
      if (this.showVerticalScrollBar) {
        width = this.scrollBarWidth;
      }
      style.width = `${width}px`;
      style.height = `${height}px`;
      return style;
    },
    bodyStyle() {
      let style = {};

      if (this.bodyHeight !== 0) {
        const height = this.bodyHeight;
        if (this.height) {
          style.height = `${height}px`;
        } else if (this.maxHeight) {
          style.maxHeight = `${height}px`;
        }
      }
      return style;
    },
    fixedBodyStyle() {
      let style = {};
      if (this.bodyHeight !== 0) {
        let height =
          this.bodyHeight -
          (this.showHorizontalScrollBar ? this.scrollBarWidth : 0);
        style.height = this.showHorizontalScrollBar
          ? `${height}px`
          : `${height - 1}px`;
      }
      return style;
    },
    normalColumns() {
      return this.cloneColumns;
    },
    leftFixedColumns() {
      // return this.cloneColumns.filter((p) => p.fixed === "left");
      return convertColumnOrder(this.cloneColumns, "left");
    },
    rightFixedColumns() {
      //return this.cloneColumns.filter((p) => p.fixed === "right");
      return convertColumnOrder(this.cloneColumns, "right");
    },
    isLeftFixed() {
      return this.columns.some((col) => col.fixed && col.fixed === "left");
    },
    isRightFixed() {
      return this.columns.some((col) => col.fixed && col.fixed === "right");
    },

    summaryData() {
      if (!this.showSummary) return {};

      let sums = {};

      if (this.filterRows[0] !== undefined && this.filterRows[0] !== null) {
        sums[this.filterRows[0].key] = {
          key: this.filterRows[0].key.key,
          value: this.localeSumText,
        };
      }

      if (this.summaryMethod) {
        sums = this.summaryMethod({
          columns: this.filterRows,
          data: this.rebuildData,
        });
      } else {
        for (let index = 1; index < this.filterRows.length; index++) {
          const column = this.filterRows[index];

          if (!column.showSummary) {
            sums[column.key] = {
              key: column.key,
              value: "",
            };
            continue;
          }
          const key = column.key;
          if (index === 0) {
            sums[column.key] = {
              key: column.key,
              value: this.localeSumText,
            };
            return;
          }

          if (this.rebuildData !== undefined) {
            const values = this.rebuildData.map((item) =>
              Number(item[column.key])
            );
            const precisions = [];
            let notNumber = true;
            values.forEach((value) => {
              if (!isNaN(value)) {
                notNumber = false;
                let decimal = ("" + value).split(".")[1];
                precisions.push(decimal ? decimal.length : 0);
              }
            });
            const precision = Math.max.apply(null, precisions);
            if (!notNumber) {
              const currentValue = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return parseFloat(
                    (prev + curr).toFixed(Math.min(precision, 20))
                  );
                } else {
                  return prev;
                }
              }, 0);
              sums[column.key] = {
                key: column.key,
                value: currentValue,
              };
            } else {
              sums[column.key] = {
                key: column.key,
                value: "",
              };
            }
          }
        }
      }

      return sums;
    },
  },
  methods: {
    onPageChange(pageIndex) {
      this.currentIndex = this.$refs.page.currentPage;
      this.currentSize = this.$refs.page.currentPageSize;
      this.getRenderData();
    },
    onPageSizeChange(pageSize) {
      this.currentIndex = this.$refs.page.currentPage;
      this.currentSize = this.$refs.page.currentPageSize;
      this.getRenderData();
    },
    getRenderData() {
      if (this.showPager) {
        var skipNum = (this.currentIndex - 1) * this.currentSize;

        this.renderData =
          skipNum + this.currentSize >= this.rebuildData.length
            ? this.rebuildData.slice(skipNum, this.rebuildData.length)
            : this.rebuildData.slice(skipNum, skipNum + this.currentSize);
      } else {
        this.renderData = this.rebuildData;
      }
    },
    makeFilterRows(tempColRows) {
      let hRows = [];
      const curColRows = tempColRows;
      const isGroup = curColRows.length > 1;
      if (isGroup) {
        let fRows = [];
        hRows = this.fixed ? this.fixedColumnRows : curColRows;
        fRows.push(...this.getFilterColumns(...hRows));
        hRows = fRows;
      } else {
        hRows = [...tempColRows[0]];

        for (var i = 0; i < hRows.length; i++) {
          if (
            hRows[i].dateType !== null &&
            hRows[i].dateType !== undefined &&
            hRows[i].type === "date"
          ) {
            hRows[i]._dateType = hRows[i].dateType;
          }
        }
      }
      return hRows;
    },
    getFilterColumns(hRows) {
      let fRows = [];
      if (hRows !== undefined && hRows !== null) {
        for (var i = 0; i < hRows.length; i++) {
          if (
            hRows[i].children === undefined ||
            hRows[i].children === null ||
            hRows[i].children.length === 0
          ) {
            if (
              hRows[i].dateType !== null &&
              hRows[i].dateType !== undefined &&
              hRows[i].type === "date"
            ) {
              hRows[i]._dateType = hRows[i].dateType;
            }
            fRows.push(hRows[i]);
          } else {
            fRows.push(...this.getFilterColumns(hRows[i].children));
          }
        }
      }

      return fRows;
    },
    rowClsName(index) {
      return this.rowClassName(this.data[index], index);
    },
    handleResize() {
      let tableWidth = this.$el.offsetWidth - 1;
      let columnsWidth = {};
      let sumMinWidth = 0;
      let hasWidthColumns = [];
      let noWidthColumns = [];
      let maxWidthColumns = [];
      let noMaxWidthColumns = [];
      this.filterRows.forEach((col) => {
        if (col.width) {
          hasWidthColumns.push(col);
        } else {
          noWidthColumns.push(col);
          if (col.minWidth) {
            sumMinWidth += col.minWidth;
          }
          if (col.maxWidth) {
            maxWidthColumns.push(col);
          } else {
            noMaxWidthColumns.push(col);
          }
        }
        col._width = null;
      });

      let unUsableWidth = hasWidthColumns
        .map((cell) => cell.width)
        .reduce((a, b) => a + b, 0);
      let usableWidth =
        tableWidth -
        unUsableWidth -
        sumMinWidth -
        (this.showVerticalScrollBar ? this.scrollBarWidth : 0) -
        1;
      let usableLength = noWidthColumns.length;
      let columnWidth = 0;
      if (usableWidth > 0 && usableLength > 0) {
        columnWidth = parseInt(usableWidth / usableLength);
      }

      for (let i = 0; i < this.filterRows.length; i++) {
        const column = this.filterRows[i];
        let width = columnWidth + (column.minWidth ? column.minWidth : 0);
        if (column.width) {
          width = column.width;
        } else {
          if (column._width) {
            width = column._width;
          } else {
            if (column.minWidth > width) {
              width = column.minWidth;
            } else if (column.maxWidth < width) {
              width = column.maxWidth;
            }

            if (usableWidth > 0) {
              usableWidth -= width - (column.minWidth ? column.minWidth : 0);
              usableLength--;
              if (usableLength > 0) {
                columnWidth = parseInt(usableWidth / usableLength);
              } else {
                columnWidth = 0;
              }
            } else {
              columnWidth = 0;
            }
          }
        }

        column._width = width;

        columnsWidth[column._index] = {
          width: width,
        };
      }
      if (usableWidth > 0) {
        usableLength = noMaxWidthColumns.length;
        columnWidth = parseInt(usableWidth / usableLength);
        for (let i = 0; i < noMaxWidthColumns.length; i++) {
          const column = noMaxWidthColumns[i];
          let width = column._width + columnWidth;
          if (usableLength > 1) {
            usableLength--;
            usableWidth -= columnWidth;
            columnWidth = parseInt(usableWidth / usableLength);
          } else {
            columnWidth = 0;
          }

          column._width = width;

          columnsWidth[column._index] = {
            width: width,
          };
        }
      }

      this.tableWidth =
        this.filterRows.map((cell) => cell._width).reduce((a, b) => a + b, 0) +
        (this.showVerticalScrollBar ? this.scrollBarWidth : 0) +
        1;
      this.columnsWidth = columnsWidth;
      this.fixedHeader();
    },
    handleMouseIn(_index) {
      if (this.disabledHover) return;
      if (this.objData[_index]._isHover) return;
      this.objData[_index]._isHover = true;
    },
    handleMouseOut(_index) {
      if (this.disabledHover) return;
      this.objData[_index]._isHover = false;
    },

    handleCurrentRow(type, _index) {
      let oldIndex = -1;
      for (let i in this.objData) {
        if (this.objData[i]._isHighlight) {
          oldIndex = parseInt(i);
          this.objData[i]._isHighlight = false;
        }
      }
      if (type === "highlight") this.objData[_index]._isHighlight = true;
      const oldData =
        oldIndex < 0
          ? null
          : JSON.parse(JSON.stringify(this.rebuildData[oldIndex]));
      const newData =
        type === "highlight"
          ? JSON.parse(JSON.stringify(this.rebuildData[_index]))
          : null;
      this.$emit("on-current-change", newData, oldData);
    },
    highlightCurrentRow(_index) {
      if (!this.highlightRow || this.objData[_index]._isHighlight) return;
      this.handleCurrentRow("highlight", _index);
    },
    clearCurrentRow() {
      if (!this.highlightRow) return;
      this.handleCurrentRow("clear");
    },
    clickCurrentRow(_index) {
      this.highlightCurrentRow(_index);
      this.$emit("on-row-click", JSON.parse(this.originalData)[_index], _index);
    },
    dblclickCurrentRow(_index) {
      this.highlightCurrentRow(_index);
      this.$emit(
        "on-row-dblclick",
        JSON.parse(this.originalData)[_index],
        _index
      );
    },
    getSelection() {
      let selectionIndexes = [];
      for (let i in this.objData) {
        if (this.objData[i]._isChecked) selectionIndexes.push(parseInt(i));
      }
      return JSON.parse(
        JSON.stringify(
          this.data.filter(
            (data, index) => selectionIndexes.indexOf(index) > -1
          )
        )
      );
    },
    toggleSelect(_index) {
      let data = {};

      for (let i in this.objData) {
        if (parseInt(i) === _index) {
          data = this.objData[i];
          break;
        }
      }
      const status = !data._isChecked;

      this.objData[_index]._isChecked = status;

      const selection = this.getSelection();
      this.$emit(
        status ? "on-select" : "on-select-cancel",
        selection,
        JSON.parse(JSON.stringify(this.data[_index]))
      );
      this.$emit("on-selection-change", selection);
    },
    toggleExpand(_index) {
      let data = {};

      for (let i in this.objData) {
        if (parseInt(i) === _index) {
          data = this.objData[i];
          break;
        }
      }
      const status = !data._isExpanded;
      this.objData[_index]._isExpanded = status;
      this.$emit(
        "on-expand",
        JSON.parse(JSON.stringify(this.rebuildData[_index])),
        status
      );

      if (this.height || this.maxHeight) {
        this.$nextTick(() => this.fixedBody());
      }
    },
    selectAll(status) {
      for (const data of this.rebuildData) {
        if (this.objData[data._index]._isDisabled) {
          continue;
        } else {
          this.objData[data._index]._isChecked = status;
        }
      }
      const selection = this.getSelection();
      if (status) {
        this.$emit("on-select-all", selection);
      } else {
        this.$emit("on-select-all-cancel", selection);
      }
      this.$emit("on-selection-change", selection);
    },

    fixedHeader() {
      if (this.height || this.maxHeight) {
        this.$nextTick(() => {
          const titleHeight =
            parseInt(getStyle(this.$refs.title, "height")) || 0;
          const headerHeight =
            parseInt(getStyle(this.$refs.header, "height")) || 0;
          const footerHeight =
            parseInt(getStyle(this.$refs.footer, "height")) || 0;
          if (this.height) {
            this.bodyHeight =
              this.height - titleHeight - headerHeight - footerHeight;
          } else if (this.maxHeight) {
            this.bodyHeight =
              this.maxHeight - titleHeight - headerHeight - footerHeight;
          }
          this.$nextTick(() => this.fixedBody());
        });
      } else {
        this.bodyHeight = 0;
        this.$nextTick(() => this.fixedBody());
      }
    },
    fixedBody() {
      if (this.$refs.header) {
        this.headerWidth = this.$refs.header.children[0].offsetWidth;
        this.headerHeight = this.$refs.header.children[0].offsetHeight;
        //this.showHorizontalScrollBar = this.headerWidth>this.$refs.header.offsetWidth;
      }

      if (!this.$refs.tbody || !this.data || this.data.length === 0) {
        this.showVerticalScrollBar = false;
      } else {
        let bodyContentEl = this.$refs.tbody.$el;
        let bodyEl = bodyContentEl.parentElement;
        let bodyContentHeight = bodyContentEl.offsetHeight;
        let bodyHeight = bodyEl.offsetHeight;

        this.showHorizontalScrollBar =
          bodyEl.offsetWidth <
          bodyContentEl.offsetWidth +
            (this.showVerticalScrollBar ? this.scrollBarWidth : 0);
        this.showVerticalScrollBar = this.bodyHeight
          ? bodyHeight -
              (this.showHorizontalScrollBar ? this.scrollBarWidth : 0) <
            bodyContentHeight
          : false;

        if (this.showVerticalScrollBar) {
          bodyEl.classList.add(this.prefixCls + "-overflowY");
        } else {
          bodyEl.classList.remove(this.prefixCls + "-overflowY");
        }
        if (this.showHorizontalScrollBar) {
          bodyEl.classList.add(this.prefixCls + "-overflowX");
        } else {
          bodyEl.classList.remove(this.prefixCls + "-overflowX");
        }
      }
    },

    hideColumnFilter() {
      this.cloneColumns.forEach((col) => (col._filterVisible = false));
    },
    handleBodyScroll(event) {
      if (this.showHeader)
        this.$refs.header.scrollLeft = event.target.scrollLeft;
      if (this.isLeftFixed)
        this.$refs.fixedBody.scrollTop = event.target.scrollTop;
      if (this.isRightFixed)
        this.$refs.fixedRightBody.scrollTop = event.target.scrollTop;
      if (this.showSummary)
        this.$refs.summary.$el.scrollLeft = event.target.scrollLeft;
      this.hideColumnFilter();
    },
    handleFixedMousewheel(event) {
      let deltaY = event.deltaY;
      if (!deltaY && event.detail) {
        deltaY = event.detail * 40;
      }
      if (!deltaY && event.wheelDeltaY) {
        deltaY = -event.wheelDeltaY;
      }
      if (!deltaY && event.wheelDelta) {
        deltaY = -event.wheelDelta;
      }
      if (!deltaY) return;
      const body = this.$refs.body;
      const currentScrollTop = body.scrollTop;
      if (deltaY < 0 && currentScrollTop !== 0) {
        event.preventDefault();
      }
      if (
        deltaY > 0 &&
        body.scrollHeight - body.clientHeight > currentScrollTop
      ) {
        event.preventDefault();
      }
      //body.scrollTop += deltaY;
      let step = 0;
      let timeId = setInterval(() => {
        step += 5;
        if (deltaY > 0) {
          body.scrollTop += 2;
        } else {
          body.scrollTop -= 2;
        }
        if (step >= Math.abs(deltaY)) {
          clearInterval(timeId);
        }
      }, 5);
    },
    handleMouseWheel(event) {
      const deltaX = event.deltaX;
      const $body = this.$refs.body;

      if (deltaX > 0) {
        $body.scrollLeft = $body.scrollLeft + 10;
      } else {
        $body.scrollLeft = $body.scrollLeft - 10;
      }
    },
    sortData(data, column) {
      data.sort((a, b) => {
        if (column.sortMethod) {
          return column.sortMethod(
            a[column.key],
            b[column.key],
            column._sortType
          );
        } else {
          if (column._sortType === "asc") {
            return a[column.key] > b[column.key] ? 1 : -1;
          } else if (column._sortType === "desc") {
            return a[column.key] < b[column.key] ? 1 : -1;
          }
        }
      });
      return data;
    },
    handleSort(column, type) {
      if (column.sortable !== "custom") {
        if (column._sortType === "normal") {
          this.rebuildDataStr = JSON.stringify(this.makeDataWithFilter());
        } else {
          this.rebuildDataStr = JSON.stringify(
            this.sortData(this.rebuildData, column)
          );
        }
      }

      this.getRenderData();

      this.$emit("on-sort-change", {
        column,
      });
    },
    filterData(data, column) {
      if (
        column._filterOp !== undefined &&
        column._filterOp.filterOperation !== "Custom"
      ) {
        if (
          typeof column._filterMethod !== "function" ||
          typeof column.filterRemote === "function"
        ) {
          return data;
        }
        if (column._type === "number" || column._type === "string") {
          if (
            column._filterValue === null ||
            column._filterValue === undefined ||
            column._filterValue === ""
          ) {
            return data;
          }
        } else if (column._type === "date") {
          if (column._dateType === undefined || column._dateType === null) {
            return data;
          }
          if (column._dateType.includes("range")) {
            if (
              JSON.stringify(column._filterValue) ===
                JSON.stringify(["", ""]) ||
              column._filterValue === null
            ) {
              return data;
            }
          } else {
            if (column._filterValue === null || column._filterValue === "") {
              return data;
            }
          }
        } else {
          if (
            column._filterValue !== undefined &&
            column._filterValue !== null &&
            column._filterValue.constructor === Array
          ) {
            if (column._filterValue[0] === "") {
              return data;
            }
          } else {
            if (
              column._filterValue === null ||
              column._filterValue === undefined ||
              column._filterValue.replace(/(^s*)|(s*$)/g, "").length === 0
            ) {
              return data;
            }
          }
        }
      } else {
        if (column._filterValue === undefined || column._filterValue === null) {
          return data;
        }
      }

      return data.filter((row) => {
        return column._filterMethod(
          column,
          column.key,
          column._filterValue,
          row
        );
      });
    },
    filterOtherData(data, index) {
      let column = this.cloneColumns[index];
      if (typeof column.filterRemote === "function") {
        column.filterRemote.call(
          this.$parent,
          column._filterChecked,
          column.key,
          column
        );
      }

      this.cloneColumns.forEach((col, colIndex) => {
        if (colIndex !== index) {
          data = this.filterData(data, col);
        }
      });
      return data;
    },
    handleFilter(index) {
      const column = this.cloneColumns[index];
      let filterData = JSON.parse(this.originalData);

      filterData = this.filterOtherData(filterData, index);
      this.rebuildDataStr = JSON.stringify(this.filterData(filterData, column));
      this.getRenderData();

      this.cloneColumns[index]._isFiltered = true;

      this.cloneColumns[index]._filterVisible = false;
      this.$emit("on-filter-change", column);
    },
    GetOriginalIndex(_index) {
      return this.cloneColumns.findIndex((item) => item._index === _index);
    },
    handleFilterSelect(column, filterOp) {
      const curColumn = this.filterRows.find(
        (p) => p.__id === column.__id && p.key === column.key
      );

      curColumn._filterIcon = filterOp.icon;
      curColumn._filterOp = filterOp;
      curColumn._filterMethod = getFilterMethod(column.type, filterOp);

      this.doSortAndFilter(null, curColumn);
    },
    handleFilterReset(_index) {
      const index = this.GetOriginalIndex(_index);
      this.cloneColumns[index]._isFiltered = false;

      this.cloneColumns[index]._filterVisible = false;
      this.cloneColumns[index]._filterChecked = [];

      let filterData = JSON.parse(this.originalData);
      filterData = this.filterOtherData(filterData, index);
      this.rebuildDataStr = JSON.stringify(filterData);
      this.getRenderData();
      this.$emit("on-filter-change", this.cloneColumns[index]);
    },
    makeData() {
      let data = deepCopy(this.data);
      data.forEach((row, index) => {
        row._index = index;
        row._rowKey = rowKey++;
      });
      return JSON.stringify(data);
    },
    makeDataWithFilter() {
      let data = JSON.parse(this.originalData);
      this.cloneColumns.forEach((col) => (data = this.filterData(data, col)));
      return data;
    },
    //全部计算排序一遍
    makeDataWithSortAndFilter(sender, column) {
      let data = JSON.parse(this.originalData);
      const filterExecRows = [];

      filterExecRows.push(
        ...this.leftFixedFilterRows.filter((col) => {
          if (col.fixed !== undefined && col.fixed !== null) {
            if (col.fixed === "left") {
              return true;
            }
          }
          return false;
        })
      );

      filterExecRows.push(
        ...this.filterRows.filter((col) => {
          if (col.fixed !== undefined && col.fixed !== null) {
            if (col.fixed === "left" || col.fixed === "right") {
              return false;
            }
          }
          return true;
        })
      );

      filterExecRows.push(
        ...this.rightFixedFilterRows.filter((col) => {
          if (col.fixed !== undefined && col.fixed !== null) {
            if (col.fixed === "right") {
              return true;
            }
          }
          return false;
        })
      );

      filterExecRows.forEach((col) => {
        if (column) {
          if (col.__id === column.__id && col.key === column.key) {
            if (column._filterOp.filterOperation === "Custom") {
              let curCol = this.columns.find((p) => p.key === column.key);
              col._filterMethod = curCol.filterMethod;
              col._filterValue = column.filterValue;
              col.filterValue = column.filterValue;
            } else {
              col._filterMethod = getFilterMethod(
                column._type,
                column._filterOp
              );

              if (column.filterValue !== undefined) {
                column._filterValue = column.filterValue;
              }

              col._filterValue = column._filterValue;
            }
          }
        }

        data = this.filterData(data, col);
      });

      return data;
    },
    doSortAndFilter(sender, column) {
      this.rebuildDataStr = JSON.stringify(
        this.makeDataWithSortAndFilter(sender, column)
      );

      if (this.showPager) {
        this.$refs.page.currentPage = 1;

        this.currentIndex = 1;
      }
      this.getRenderData();
    },
    makeObjData() {
      let data = {};
      this.data.forEach((row, index) => {
        const newRow = deepCopy(row);
        newRow._isHover = false;
        if (newRow._disabled) {
          newRow._isDisabled = newRow._disabled;
        } else {
          newRow._isDisabled = false;
        }
        if (newRow._checked) {
          newRow._isChecked = newRow._checked;
        } else {
          newRow._isChecked = false;
        }
        if (newRow._expanded) {
          newRow._isExpanded = newRow._expanded;
        } else {
          newRow._isExpanded = false;
        }
        if (newRow._highlight) {
          newRow._isHighlight = newRow._highlight;
        } else {
          newRow._isHighlight = false;
        }
        data[index] = newRow;
      });
      return data;
    },

    makeColumnsId(columns) {
      return columns.map((item) => {
        if ("children" in item) this.makeColumnsId(item.children);
        item.__id = getRandomStr(6);
        return item;
      });
    },
    makeColumns(cols) {
      let columns = deepCopy(getAllColumns(cols));
      let left = [];
      let right = [];
      let center = [];

      columns.forEach((column, index) => {
        column._index = index;
        column._columnKey = columnKey++;
        column.width = parseInt(column.width);
        column._width = column.width ? column.width : "";
        column._sortType = "normal";
        column._filterVisible = false;
        column._isFiltered = false;

        column._filterValue = null;
        column._filterIcon = "search";
        column._type = column.type === undefined ? "string" : column.type;

        column._filterMethod = column.filterMethod;
        if (column.filterMethod === undefined || column.filterMethod === null) {
          column._filterMethod = getFilterMethod(column.type, {
            filterOperation: "Reset",
            displayName: "重置",
            icon: "search",
          });
        }

        if ("sortType" in column) {
          column._sortType = column.sortType;
        }

        if (column.fixed && column.fixed === "left") {
          left.push(column);
        } else if (column.fixed && column.fixed === "right") {
          right.push(column);
        } else {
          center.push(column);
        }
      });
      return left.concat(center).concat(right);
    },

    makeColumnRows(fixedType, cols) {
      return convertToRows(cols, fixedType);
    },
    exportCsv(params) {
      if (params.filename) {
        if (params.filename.indexOf(".csv") === -1) {
          params.filename += ".csv";
        }
      } else {
        params.filename = "table.csv";
      }

      let columns = [];
      let datas = [];
      if (params.columns && params.data) {
        columns = params.columns;
        datas = params.data;
      } else {
        columns = this.allColumns;
        if (!("original" in params)) params.original = true;
        datas = params.original ? this.data : this.rebuildData;
      }

      let noHeader = false;
      if ("noHeader" in params) noHeader = params.noHeader;

      const data = Csv(columns, datas, params, noHeader);
      if (params.callback) params.callback(data);
      else ExportCsv.download(params.filename, data);
    },
    exportXlsx({
      fileName,
      header,
      headerDisplay,
      rows,
      formats,
      dataType = "json",
    }) {
      if (dataType === "json") {
        this.exportXlsxJson({
          fileName,
          header,
          headerDisplay,
          rows,
          formats,
        });
      }
      if (dataType === "array") {
        this.exportXlsxAoa({
          fileName,
          header,
          rows,
        });
      }
    },
    exportXlsxAoa({ fileName, header, rows }) {
      let defaultHeader = [];
      for (let i = 0; i < this.columns.length; i++) {
        defaultHeader.push(this.columns[i].key);
      }
      let exportRows = [];

      for (let m = 0; m < this.rebuildData.length; m++) {
        let row = [];
        for (let n = 0; n < defaultHeader.length; n++) {
          row.push(this.rebuildData[m][defaultHeader[n]]);
        }
        exportRows.push(row);
      }
      ExportXlsx.outPutAoA({
        header: header ? header : defaultHeader,
        rows: rows ? rows : exportRows,
        name: fileName ? fileName : "xlsxfile",
      });
    },
    exportXlsxJson({ fileName, header, headerDisplay, rows, formats }) {
      let defaultHeader = [];
      let defaultDisplayHeader = {};
      if (header !== null && header !== undefined) {
        defaultHeader = header;
      } else {
        for (let i = 0; i < this.columns.length; i++) {
          defaultHeader.push(this.columns[i].key);
          defaultDisplayHeader[this.columns[i].key] = this.columns[i].title;
        }
      }

      if (headerDisplay !== null && headerDisplay !== undefined) {
        defaultDisplayHeader = headerDisplay;
      }
      for (let i = 0; i < this.columns.length; i++) {
        if (defaultHeader.some((p) => p === this.columns[i].key)) {
          if (!defaultDisplayHeader.hasOwnProperty(this.columns[i].key)) {
            defaultDisplayHeader[this.columns[i].key] = this.columns[i].title;
          }
        }
      }

      let exportRows = [];

      for (let m = 0; m < this.rebuildData.length; m++) {
        let row = {};
        for (let n = 0; n < defaultHeader.length; n++) {
          row[defaultHeader[n]] = this.rebuildData[m][defaultHeader[n]];

          if (formats !== null && formats !== undefined) {
            if (
              formats[defaultHeader[n]] !== undefined &&
              formats[defaultHeader[n]] !== null &&
              formats[defaultHeader[n]].constructor === Function
            ) {
              try {
                row[defaultHeader[n]] = formats[defaultHeader[n]](
                  this.rebuildData[m],
                  this.columns.find((p) => p.key === defaultHeader[n]),
                  this.rebuildData[m][defaultHeader[n]]
                );
              } catch (e) {
                console.log("format method of defaultHeader[n] not valid", e);
              }
            }
          }
        }
        exportRows.push(row);
      }

      ExportXlsx.outPutJson({
        header: defaultHeader,
        headerDisplay: defaultDisplayHeader,
        rows: rows ? rows : exportRows,
        name: fileName ? fileName : "xlsxfile",
      });
    },
    dragAndDrop(a, b) {
      this.$emit("on-drag-drop", a, b);
    },
    initColumns() {
      //初始化列
      const colsWithId = this.makeColumnsId(this.columns);
      this.cloneColumns = this.makeColumns(colsWithId);
      this.leftFixedColumnRows = this.makeColumnRows("left", colsWithId);
      this.rightFixedColumnRows = this.makeColumnRows("right", colsWithId);
      this.columnRows = this.makeColumnRows(false, colsWithId);
      this.filterRows = this.makeFilterRows(this.columnRows);
      this.leftFixedFilterRows = this.makeFilterRows(this.leftFixedColumnRows);
      this.rightFixedFilterRows = this.makeFilterRows(
        this.rightFixedColumnRows
      );
      this.allColumns = getAllColumns(colsWithId);
    },
  },
  created() {
    if (!this.context) this.currentContext = this.$parent;
    this.showSlotHeader = this.$slots.header !== undefined;
    this.showSlotFooter = this.$slots.footer !== undefined;

    setTimeout(() => {
      this.objData = this.makeObjData();
      this.originalData = this.makeData();
      this.rebuildDataStr = JSON.stringify(this.makeDataWithSortAndFilter());

      if (this.rebuildData !== undefined) {
        const oldDataLen = this.rebuildData.length;

        if (this.$refs.page !== undefined) {
          this.currentIndex = this.$refs.page.currentPage;
          this.currentSize = this.$refs.page.currentPageSize;
        } else {
          this.currentIndex = 0;
          this.currentSize = 10;
        }

        this.getRenderData();
        // this.handleResize();
        // if (!oldDataLen) {
        //   this.fixedHeader();
        // }
      } else {
        console.log("undefined rebuildData!");
      }
    }, 0);
  },

  beforeMount() {
    this.initColumns();
  },
  mounted() {
    this.handleResize();
    this.$nextTick(() => {
      this.ready = true;
    });

    on(window, "resize", this.handleResize);
    this.observer = elementResizeDetectorMaker();
    this.observer.listenTo(this.$el, this.handleResize);

    this.$on("on-visible-change", (val) => {
      if (val) {
        this.$nextTick(() => {
          this.handleResize();
        });
      }
    });
  },
  beforeDestroy() {
    off(window, "resize", this.handleResize);
    this.observer.removeListener(this.$el, this.handleResize);
  },
  watch: {
    columns: {
      handler(nVal, oVal) {
        this.initColumns();
      },
      deep: true,
    },
    data: {
      handler(nVal, oVal) {
        // here will trigger before clickCurrentRow, so use async
        setTimeout(() => {
          this.objData = this.makeObjData();
          this.originalData = this.makeData();
          this.rebuildDataStr = JSON.stringify(
            this.makeDataWithSortAndFilter()
          );

          if (this.rebuildData !== undefined) {
            const oldDataLen = this.rebuildData.length;

            if (this.$refs.page !== undefined) {
              this.currentIndex = this.$refs.page.currentPage;
              this.currentSize = this.$refs.page.currentPageSize;
            } else {
              this.currentIndex = 0;
              this.currentSize = 10;
            }

            this.getRenderData();
            this.handleResize();
            if (!oldDataLen) {
              this.fixedHeader();
            }
          } else {
            console.log("undefined rebuildData!");
          }
        }, 0);
      },
      deep: true,
    },
    height() {
      this.handleResize();
    },
    maxHeight() {
      this.handleResize();
    },
    showHorizontalScrollBar() {
      this.handleResize();
    },
    showVerticalScrollBar() {
      this.handleResize();
    },
  },
};
</script>
