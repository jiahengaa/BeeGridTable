
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
    filteredValue: Object,
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
      } else {
        this.tableRoot.columns.push(
          Object.assign({}, { key: this.field }, this.$props, this.$attrs)
        );
      }
    }
    if (this.$scopedSlots.default !== undefined) {
      this.tableRoot.$columnSlots[this.field] = this.$scopedSlots.default;
    }
  },
};
</script>