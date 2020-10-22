<template>
  <table cellspacing="0" cellpadding="0" border="0" :style="styles">
    <colgroup>
      <col
        v-for="(column, colindex) in columns"
        :width="cellWidth(column)"
        :key="colindex"
      />
      <col
        v-if="$parent.showVerticalScrollBar"
        :width="$parent.scrollBarWidth"
      />
    </colgroup>
    <thead>
      <template v-for="(cols, rowIndex) in headRows">
        <tr :key="rowIndex" v-if="cols.length > 0 || fixed === false">
          <th
            v-for="(column, index) in cols"
            :colspan="column.colSpan"
            :rowspan="column.rowSpan"
            :class="alignCls(column)"
            :key="'hrow' + index"
          >
            <div :class="cellClasses(column)">
              <template v-if="column.type === 'expand'">
                <span v-if="!column.renderHeader">{{
                  column.title || ""
                }}</span>
                <render-header
                  v-else
                  :render="column.renderHeader"
                  :column="column"
                  :index="index"
                ></render-header>
              </template>
              <template v-else-if="column.type === 'selection'">
                <Checkbox
                  :value="isSelectAll"
                  :disabled="isSelectDisabled"
                  @on-change="selectAll"
                ></Checkbox>
              </template>
              <template v-else>
                <span
                  v-if="!column.renderHeader && !column.headSlot"
                  :class="{ [prefixCls + '-cell-sort']: column.sortable }"
                  @click="handleSortByHead(column)"
                  >{{ column.title || "#" }}</span
                >
                <render-header
                  v-else-if="column.renderHeader && !column.headSlot"
                  :render="column.renderHeader"
                  :column="column"
                  :index="index"
                ></render-header>
                <table-head-slot
                  v-else-if="column.headSlot"
                  :column="column"
                  :index="index"
                ></table-head-slot>
                <span :class="[prefixCls + '-sort']" v-if="column.sortable">
                  <i
                    class="bee-sys-icon md-arrow-dropup"
                    :class="{ on: getColumnSortType(column) === 'asc' }"
                    @click="handleSort(column, 'asc')"
                  ></i>
                  <i
                    class="bee-sys-icon md-arrow-dropdown"
                    :class="{ on: getColumnSortType(column) === 'desc' }"
                    @click="handleSort(column, 'desc')"
                  ></i>
                </span>
              </template>
            </div>
            <div
              v-if="column.resizable"
              class="bee-table-header-resizable"
              @mousedown="handleMouseDown(column, $event)"
              @mousemove="handleMouseMove(column, $event)"
              @mouseout="handleMouseOut"
            ></div>
          </th>
          <th
            v-if="$parent.showVerticalScrollBar && rowIndex === 0"
            :class="scrollBarCellClass()"
            :rowspan="headRows.length"
          ></th>
        </tr>

        <template
          v-if="cols.length > 0 && fixed !== false && headRows.length > 1"
        >
          <tr
            v-for="colIndex in headRows.length"
            :key="rowIndex + '-' + colIndex"
          >
            <th :colspan="1" style="height: 42px"></th>
          </tr>
        </template>
      </template>

      <tr v-if="showFilter">
        <th
          v-for="(fcolumn, hrowIndex) in filterRows"
          :colspan="fcolumn.colSpan"
          :rowspan="fcolumn.rowSpan"
          :key="'fhcrow' + hrowIndex"
          class="th-filter"
          :class="filterThClasses(fcolumn)"
          :style="filterThStyle(fcolumn)"
        >
          <div class="th-filter-content">
            <div
              :class="filterCellClasses(fcolumn)"
              v-if="fcolumn.hideFilter"
            ></div>
            <div :class="filterCellClasses(fcolumn)" v-if="!fcolumn.hideFilter">
              <template v-if="!fcolumn.headFilterSlot">
                <Poptip
                  v-if="isFilterPopperShow(fcolumn)"
                  v-model="fcolumn._filterVisible"
                  placement="bottom"
                  popper-class="bee-table-popper"
                  :capture="false"
                  transfer
                >
                  <span :class="[prefixCls + '-filter']">
                    <Icon :type="fcolumn._filterIcon" size="23"></Icon>
                  </span>

                  <div slot="content" :class="[prefixCls + '-filter-list']">
                    <ul :class="[prefixCls + '-filter-list-single']">
                      <li
                        :class="itemClasses(fcolumn, item)"
                        v-for="(item, cindex) in getFilterList(fcolumn)"
                        @click="handleSelect(fcolumn, item)"
                        :key="cindex"
                      >
                        <div>
                          <Icon :type="item.icon" size="23"></Icon>
                          {{ item.displayName }}
                        </div>
                      </li>
                    </ul>
                  </div>
                </Poptip>

                <Input
                  v-if="
                    fcolumn._type === 'number' && isFilterPopperShow(fcolumn)
                  "
                  clearable
                  number
                  v-model="fcolumn._filterValue"
                  placeholder
                  @input.native="handleInput($event, fcolumn)"
                  @on-enter="onInputEnter($event, fcolumn)"
                  @on-clear="handleInput($event, fcolumn)"
                />
                <Input
                  v-else-if="
                    (fcolumn._type === 'string' ||
                      (fcolumn._type === 'date' &&
                        fcolumn._filterOp.filterOperation === 'Reset')) &&
                    isFilterPopperShow(fcolumn)
                  "
                  clearable
                  v-model="fcolumn._filterValue"
                  placeholder
                  @input.native="handleInput($event, fcolumn)"
                  @on-enter="onInputEnter($event, fcolumn)"
                  @on-clear="handleInput($event, fcolumn)"
                />

                <div
                  v-else-if="
                    fcolumn._type === 'date' &&
                    isFilterPopperShow(fcolumn) &&
                    fcolumn._filterOp.filterOperation !== 'Reset'
                  "
                  :class="filterDatePickerContentClass(fcolumn)"
                >
                  <Date-picker
                    :type="fcolumn._dateType"
                    placement="bottom-end"
                    :transfer="true"
                    :confirm="false"
                    :value.sync="fcolumn._filterValue"
                    :placeholder="fcolumn._placeholder"
                    :class="filterDatePickerClass(fcolumn)"
                    @on-ok="onDateOk($event, fcolumn)"
                    @on-clear="onDateClear($event, fcolumn)"
                    @on-change="onDateChange($event, fcolumn)"
                  ></Date-picker>
                </div>
              </template>
              <template v-else-if="fcolumn.headFilterSlot">
                <table-head-filter-slot
                  :column="fcolumn"
                  :index="hrowIndex"
                ></table-head-filter-slot>
              </template>
            </div>
          </div>
        </th>
      </tr>
    </thead>
  </table>
</template>
<script>
import CheckboxGroup from "../checkbox/checkbox-group.vue";
import Checkbox from "../checkbox/checkbox.vue";
import Poptip from "../poptip/poptip.vue";
import iButton from "../button/button.vue";

import TableHeadSlot from "./headSlot";
import TableHeadFilterSlot from "./headFilterSlot";
import renderHeader from "./header";
import Mixin from "./mixin";
import Locale from "../../mixins/locale";
import throttle from "lodash.throttle";
import { getFilterMethod } from "./util";

export default {
  name: "TableHead",
  mixins: [Mixin, Locale],
  components: {
    CheckboxGroup,
    Checkbox,
    Poptip,
    TableHeadSlot,
    TableHeadFilterSlot,
    iButton,
    renderHeader,
  },
  inject: ["tableRoot"],
  props: {
    prefixCls: String,
    styleObject: Object,
    columns: Array,
    objData: Object,
    data: Array,
    columnsWidth: Object,
    fixed: {
      type: [Boolean, String],
      default: false,
    },
    showFilter: {
      type: Boolean,
      default: true,
    },
    columnRows: Array,
    fixedColumnRows: Array,
    filterActions: Array,
    filterRows: Array,
  },
  data() {
    return {
      onInputEvt: (e, c) => {},
      draggingColumn: null,
      dragging: false,
      dragState: {},

      numberFilter: [
        {
          filterOperation: "Equals",
          displayName: "等于",
          placeholder: "",
          icon: "equil",
        },
        {
          filterOperation: "NotEquals",
          displayName: "不等于",
          placeholder: "",
          icon: "notequil",
        },
        {
          filterOperation: "Less",
          displayName: "小于",
          placeholder: "",
          icon: "less",
        },
        {
          filterOperation: "Greater",
          displayName: "大于",
          placeholder: "",
          icon: "greater",
        },
        {
          filterOperation: "LessOrEquals",
          displayName: "小于或等于",
          placeholder: "",
          icon: "lessEquil",
        },
        {
          filterOperation: "GreaterOrEquals",
          displayName: "大于或等于",
          placeholder: "",
          icon: "greaterEquil",
        },
        {
          filterOperation: "Between",
          displayName: "之间",
          placeholder: "",
          icon: "bettween",
        },

        {
          filterOperation: "Reset",
          displayName: "重置",
          placeholder: "",
          icon: "search",
        },
      ],
      stringFilter: [
        {
          filterOperation: "Contains",
          displayName: "包含",
          placeholder: "",
          icon: "contain",
        },
        {
          filterOperation: "NotContains",
          displayName: "不包含",
          placeholder: "",
          icon: "notContain",
        },
        {
          filterOperation: "StartsWith",
          displayName: "以...开始",
          placeholder: "",
          icon: "startWith",
        },
        {
          filterOperation: "EndsWith",
          displayName: "结束于",
          placeholder: "",
          icon: "endWith",
        },
        // {
        //   filterOperation: "Equals",
        //   displayName: "等于",
        //   placeholder: "",
        //   icon: "equil",
        // },
        // {
        //   filterOperation: "NotEquals",
        //   displayName: "不等于",
        //   placeholder: "",
        //   icon: "notequil",
        // },
        // {
        //   filterOperation: "IsBlank",
        //   displayName: "空",
        //   placeholder: "",
        //   icon: "search",
        // },
        // {
        //   filterOperation: "IsNotBlank",
        //   displayName: "不为空",
        //   placeholder: "",
        //   icon: "search",
        // },
        // {
        //   filterOperation: "AnyOf",
        //   displayName: "任何一个",
        //   placeholder: "",
        //   icon: "search",
        // },
        // {
        //   filterOperation: "NoneOf",
        //   displayName: "任何一个都不",
        //   placeholder: "",
        //   icon: "search",
        // },
        {
          filterOperation: "Reset",
          displayName: "重置",
          placeholder: "",
          icon: "search",
        },
      ],
    };
  },
  computed: {
    cellWidth() {
      return (column) => {
        let width = "";
        if (column.width) {
          width = column.width;
        } else if (this.columnsWidth[column._index]) {
          width = this.columnsWidth[column._index].width;
        }
        if (width === "0") width = "";

        return width;
      };
    },
    styles() {
      const style = Object.assign({}, this.styleObject);
      const width = parseInt(this.styleObject.width);
      style.width = `${width}px`;
      return style;
    },
    isSelectAll() {
      let isSelectAll = true;
      if (!this.data.length) isSelectAll = false;
      if (!this.data.find((item) => !item._disabled)) isSelectAll = false;
      for (let i = 0; i < this.data.length; i++) {
        if (
          !this.objData[this.data[i]._index]._isChecked &&
          !this.objData[this.data[i]._index]._isDisabled
        ) {
          isSelectAll = false;
          break;
        }
      }

      return isSelectAll;
    },
    getFilterList() {
      return (fcolumn) => {
        if (fcolumn._type === "number") {
          return this.numberFilter;
        }
        if (fcolumn._type === "string") {
          return this.stringFilter;
        }
        if (fcolumn._type === "date") {
          return this.dateFilter(fcolumn);
        }

        return this.stringFilter;
      };
    },
    headRows() {
      const isGroup = this.columnRows.length > 1;

      if (isGroup) {
        return this.fixed ? this.fixedColumnRows : this.columnRows;
      } else {
        return this.fixed ? this.fixedColumnRows : this.columnRows;
      }
    },
    isSelectDisabled() {
      let isSelectDisabled = false;
      if (!this.data.length) isSelectDisabled = true;
      if (!this.data.find((item) => !item._disabled)) isSelectDisabled = true;
      return isSelectDisabled;
    },
    isFilterPopperShow() {
      return (column) => {
        return (
          (column.searchable !== undefined ? column.searchable : true) ||
          (!this.fixed && !column.fixed)
        );
      };
    },
  },
  watch: {
    filterRows: {
      handler(nValue, old) {},
      deep: true,
      immediate: true,
    },
  },
  methods: {
    dateFilter(column) {
      const dateTypes = [
        "date",
        "daterange",
        "datetime",
        "datetimerange",
        "year",
        "month",
      ];
      const curDateType = column._dateType
        ? dateTypes.some((p) => p === column._dateType)
          ? column._dateType
          : "date"
        : "date";
      return [
        {
          filterOperation: "Equals",
          displayName: "等于",
          placeholder: "",
          dateType: curDateType,
          icon: "equil",
        },
        {
          filterOperation: "NotEquals",
          displayName: "不等于",
          placeholder: "",
          dateType: curDateType,
          icon: "notequil",
        },
        {
          filterOperation: "Less",
          displayName: "小于",
          placeholder: "",
          dateType: curDateType,
          icon: "less",
        },
        {
          filterOperation: "Greater",
          displayName: "大于",
          placeholder: "",
          dateType: curDateType,
          icon: "greater",
        },
        {
          filterOperation: "LessOrEquals",
          displayName: "小于或等于",
          placeholder: "",
          dateType: curDateType,
          icon: "lessEquil",
        },
        {
          filterOperation: "GreaterOrEquals",
          displayName: "大于或等于",
          placeholder: "",
          dateType: curDateType,
          icon: "greaterEquil",
        },
        {
          filterOperation: "Between",
          displayName: "之间",
          placeholder: "从...到...",
          dateType: "datetimerange",
          icon: "bettween",
        },
        {
          filterOperation: "Reset",
          displayName: "重置",
          placeholder: "",
          dateType: curDateType,
          icon: "search",
        },
      ];
    },
    handleInput(e, fcolumn) {
      if (
        e === undefined ||
        e.data === null ||
        e.data === "" ||
        e.data.replace(/(^s*)|(s*$)/g, "").length == 0
      ) {
        fcolumn.filterValue = null;
        fcolumn._filterValue = null;
        this.$parent.doSortAndFilter(null, fcolumn);
      } else {
        this.onInputEvt(e, fcolumn);
      }
    },
    onDateOk(e, fcolumn) {
      this.$parent.doSortAndFilter(null, fcolumn);
    },
    onDateClear(e, fcolumn) {
      this.$parent.doSortAndFilter(null, fcolumn);
    },
    onDateChange(e, fcolumn) {
      fcolumn._filterValue = e;

      if (
        fcolumn._filterOp.dateType === "datetimerange" ||
        fcolumn._filterOp.dateType === "daterange"
      ) {
        if (e === undefined || e === null || e === "") {
          return;
        } else {
          if (e.constructor === Array) {
            if (e[0] === "") return;
          }
          this.$parent.doSortAndFilter(null, fcolumn);
        }
      } else {
        this.$parent.doSortAndFilter(null, fcolumn);
      }
    },
    onInputEnter(e, fcolumn) {
      fcolumn.filterValue = fcolumn._filterValue;
      this.$parent.doSortAndFilter(null, fcolumn);
    },
    onInput(evt, column) {
      column.filterValue = column._filterValue;
      this.$parent.doSortAndFilter(null, column);
    },
    cellClasses(column) {
      return [
        `${this.prefixCls}-cell`,
        {
          [`${this.prefixCls}-hidden`]:
            !this.fixed &&
            column.fixed &&
            (column.fixed === "left" || column.fixed === "right"),
          [`${this.prefixCls}-cell-with-selection`]:
            column.type === "selection",
        },
      ];
    },
    filterDatePickerClass(fcolumn) {
      return [`${this.prefixCls}-filter-date-picker-content`];
    },
    filterDatePickerContentClass(fcolumn) {
      return [`${this.prefixCls}-filter-date-picker`];
    },
    filterCellClasses(column) {
      return [
        `${this.prefixCls}-filter-cell`,
        `${column.title}`,
        {
          [`${this.prefixCls}-hidden`]:
            !this.fixed &&
            column.fixed &&
            (column.fixed === "left" || column.fixed === "right"),
          [`${this.prefixCls}-cell-with-selection`]:
            column.type === "selection",
          [`${this.prefixCls}-filter-hidden`]: column.hideFilter,
        },
      ];
    },
    filterThClasses(fcolumn) {
      return [
        {
          [`th-filter-hidden`]:
            !this.fixed &&
            fcolumn.fixed &&
            (fcolumn.fixed === "left" || fcolumn.fixed === "right"),
        },
      ];
    },
    filterThStyle(fcolumn) {
      if (fcolumn.filterHeight === undefined) {
        return {};
      } else {
        return {
          height: fcolumn.filterHeight + "px",
        };
      }
    },
    scrollBarCellClass() {
      let hasRightFixed = false;
      for (let i in this.headRows) {
        for (let j in this.headRows[i]) {
          if (this.headRows[i][j].fixed === "right") {
            hasRightFixed = true;
            break;
          }
          if (hasRightFixed) break;
        }
      }
      return [
        {
          [`${this.prefixCls}-hidden`]: hasRightFixed,
        },
      ];
    },
    itemClasses(column, item) {
      return [
        `${this.prefixCls}-filter-select-item`,
        {
          [`${this.prefixCls}-hidden`]:
            !this.fixed &&
            column.fixed &&
            (column.fixed === "left" || column.fixed === "right"),
          [`${this.prefixCls}-cell-with-selection`]:
            column.type === "selection",
        },
      ];
    },
    itemAllClasses(column) {
      return [
        `${this.prefixCls}-filter-select-item`,
        {
          [`${this.prefixCls}-filter-select-item-selected`]: !column
            ._filterChecked.length,
        },
      ];
    },
    selectAll() {
      const status = !this.isSelectAll;
      this.$parent.selectAll(status);
    },
    handleSort(column, type) {
      if (column._sortType === type) {
        type = "normal";
      }
      column._sortType = type;
      this.$parent.handleSort(column, type);
    },
    handleSortByHead(column) {
      if (column.sortable) {
        const type = column._sortType;
        if (type === "normal") {
          this.handleSort(column, "asc");
        } else if (type === "asc") {
          this.handleSort(column, "desc");
        } else {
          this.handleSort(column, "normal");
        }
      }
    },
    getColumnIsFiltered(column) {
      if (column) {
        return column._isFiltered;
      } else {
        return false;
      }
    },
    getColumnSortType(column) {
      if (column) {
        return column._sortType;
      } else {
        return "normal";
      }
    },
    handleFilter(index) {
      this.$parent.handleFilter(index);
    },
    handleSelect(column, filterOp) {
      column._filterVisible = false;
      column._filterOp = filterOp;
      column._filterIcon = filterOp.icon;
      column._placeholder = filterOp.placeholder;

      if (filterOp.filterOperation === "Reset") {
        if (column._type === "string") {
          column._filterValue = "";
        } else {
          column._filterValue = null;
        }
      }

      if (column._type === "date") {
        column._dateType = filterOp.dateType;
      }

      this.$parent.handleFilterSelect(column, filterOp);
    },
    handleReset(index) {
      this.$parent.handleFilterReset(index);
    },
    handleFilterHide(fcolumn) {
      this.$parent.handleFilterHide(fcolumn);
    },

    handleMouseDown(column, event) {
      if (this.$isServer) return;

      if (this.draggingColumn) {
        this.dragging = true;

        const table = this.$parent;
        const tableEl = table.$el;
        const tableLeft = tableEl.getBoundingClientRect().left;
        const columnEl = this.$el.querySelector(
          `th.bee-table-column-${column.__id}`
        );
        const columnRect = columnEl.getBoundingClientRect();
        const minLeft = columnRect.left - tableLeft + 30;

        table.showResizeLine = true;

        this.dragState = {
          startMouseLeft: event.clientX,
          startLeft: columnRect.right - tableLeft,
          startColumnLeft: columnRect.left - tableLeft,
          tableLeft,
        };

        const resizeProxy = table.$refs.resizeLine;
        resizeProxy.style.left = this.dragState.startLeft + "px";

        document.onselectstart = function () {
          return false;
        };
        document.ondragstart = function () {
          return false;
        };

        const handleMouseMove = (event) => {
          const deltaLeft = event.clientX - this.dragState.startMouseLeft;
          const proxyLeft = this.dragState.startLeft + deltaLeft;

          resizeProxy.style.left = Math.max(minLeft, proxyLeft) + "px";
        };

        const handleMouseUp = () => {
          if (this.dragging) {
            const { startColumnLeft, startLeft } = this.dragState;

            const finalLeft = parseInt(resizeProxy.style.left, 10);
            const columnWidth = finalLeft - startColumnLeft;

            const _column = table.filterRows.find(
              (item) => item.__id === column.__id
            );

            const hColumn = this.columns.find(
              (item) => item.__id === column.__id
            );

            if (_column) {
              _column.width = columnWidth;
              hColumn.width = columnWidth;

              const cIndex = this.$parent.cloneColumns.findIndex(
                (p) => p.__id === hColumn.__id
              );

              this.$parent.$set(this.$parent.cloneColumns, cIndex, hColumn);
            }

            table.$emit(
              "on-column-width-resize",
              _column.width,
              startLeft - startColumnLeft,
              column,
              event
            );

            document.body.style.cursor = "";
            this.dragging = false;
            this.draggingColumn = null;
            this.dragState = {};

            table.showResizeLine = false;
          }

          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
          document.onselectstart = null;
          document.ondragstart = null;
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      }
    },
    handleMouseMove(column, event) {
      let target = event.target;

      while (target && target.tagName !== "TH") {
        target = target.parentNode;
      }

      if (!column || !column.resizable) return;

      if (!this.dragging) {
        let rect = target.getBoundingClientRect();

        const bodyStyle = document.body.style;

        if (rect.width > 12 && rect.right - event.pageX < 8) {
          bodyStyle.cursor = "col-resize";
          this.draggingColumn = column;
        } else if (!this.dragging) {
          bodyStyle.cursor = "";
          this.draggingColumn = null;
        }
      }
    },
    handleMouseOut() {
      if (this.$isServer) return;
      document.body.style.cursor = "";
    },
  },

  created() {
    this.onInputEvt = throttle(this.onInput, 3500);
  },
};
</script>
