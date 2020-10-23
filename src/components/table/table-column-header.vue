
<template>
  <div>
    <slot :name="headerSlot"></slot>
  </div>
</template>
<script>
export default {
  name: "TableColumnHeader",
  inject: ["tableRoot"],
  props: {
    field: {
      type: String,
      required: true,
    },
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
            { key: this.field, headSlot: "bee-header-" + this.field },
            this.$props,
            this.$attrs
          )
        );
        this.tableRoot.$columnSlots[
          "bee-header-" + this.field
        ] = this.$scopedSlots.default;
      } else {
        this.tableRoot.columns.push(
          Object.assign({}, { key: this.field }, this.$props, this.$attrs)
        );
      }
    } else {
      let column = this.tableRoot.columns.find((p) => p.key === this.field);
      Object.assign(column, this.$props, this.$attrs);

      if (this.$scopedSlots.default !== undefined) {
        column.headSlot = "bee-header-" + this.field;
        this.tableRoot.$columnSlots[
          "bee-header-" + this.field
        ] = this.$scopedSlots.default;
      }
    }
  },
  computed: {
    headerSlot() {
      return "bee-header-" + this.field;
    },
  },
};
</script>