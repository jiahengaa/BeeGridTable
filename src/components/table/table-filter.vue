
<template>
  <div>
    <slot :name="filterSlot"></slot>
  </div>
</template>
<script>
export default {
  name: "TableColumnFilter",
  inject: ["tableRoot"],
  props: {
    field: {
      type: String,
      required: true,
    },
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
            { key: this.field, headFilterSlot: "bee-filter-" + this.field },
            this.$props,
            this.$attrs
          )
        );
        this.tableRoot.$columnSlots[
          "bee-filter-" + this.field
        ] = this.$scopedSlots.default;
      } else {
        this.tableRoot.columns.push(
          Object.assign({}, { key: this.field }, this.$props, this.$attrs)
        );
      }
    } else {
      let column = this.tableRoot.columns.find((p) => p.key === this.field);
      Object.assign(column, this.$props, this.$attrs);
      column.filterMethod = this.filterMethod;
      column.filterValue = this.filterValue;

      if (this.$scopedSlots.default !== undefined) {
        column.headFilterSlot = "bee-filter-" + this.field;
        this.tableRoot.$columnSlots[
          "bee-filter-" + this.field
        ] = this.$scopedSlots.default;
      }
    }
  },
  computed: {
    filterSlot() {
      return "bee-filter-" + this.field;
    },
  },
};
</script>