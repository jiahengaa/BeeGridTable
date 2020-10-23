
<template>
  <div>
    <slot :name="field"></slot>
  </div>
</template>
<script>
export default {
  name: "TableColumn",
  inject: ["tableRoot"],
  props: {
    field: {
      type: String,
      required: true,
    },
    index: Number,
    title: String,
    width: Number,
    resizable: Boolean,
    sortable: Boolean,
    align: String,
    type: String,
    width: Number,
    minWidth: Number,
    maxWidth: Number,
    className: String,
    fixed: String,
    ellipsis: Boolean,
    tooltip: Boolean,
    sortable: Object,
    sortMethod: Function,
    indexMethod: Function,
    sortType: String,
    filters: Object,
    filterMethod: Function,
    filterValue: Object | Number | String | Array,
  },
  mounted() {
    if (this.tableRoot.$columnSlots === undefined) {
      this.tableRoot.$columnSlots = [];
    }

    if (
      this.tableRoot.columns.find((p) => p.key === this.field) === undefined
    ) {
      if (this.$scopedSlots.default !== undefined) {
        this.tableRoot.columns.push(
          Object.assign(
            {},
            { key: this.field, slot: this.field },
            this.$props,
            this.$attrs
          )
        );
        this.tableRoot.$columnSlots[this.field] = this.$scopedSlots.default;
      } else {
        this.tableRoot.columns.push(
          Object.assign({}, { key: this.field }, this.$props, this.$attrs)
        );
      }
    } else {
      let column = this.tableRoot.columns.find((p) => p.key === this.field);
      const filterMethod = column.filterMethod;
      const filterValue = column.filterValue;

      Object.assign(column, { key: this.field }, this.$props, this.$attrs);
      column.filterMethod = filterMethod;
      column.filterValue = filterValue;

      if (this.$scopedSlots.default !== undefined) {
        column.slot = this.field;
        this.tableRoot.$columnSlots[this.field] = this.$scopedSlots.default;
      }
    }
  },
};
</script>