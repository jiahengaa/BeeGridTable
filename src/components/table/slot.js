export default {
    name: "TableSlot",
    functional: true,
    inject: ["tableRoot"],
    props: {
        row: Object,
        index: Number,
        column: {
            type: Object,
            default: null
        }
    },
    render: (h, ctx) => {
        if (
            ctx.injections.tableRoot.$columnSlots !== undefined &&
            ctx.injections.tableRoot.$columnSlots[ctx.props.column.key] !==
                undefined
        ) {
            return h(
                "div",
                ctx.injections.tableRoot.$columnSlots[ctx.props.column.key]({
                    row: ctx.props.row,
                    column: ctx.props.column,
                    index: ctx.props.index
                })
            );
        } else if (
            ctx.injections.tableRoot.$scopedSlots[ctx.props.column.slot] !==
            undefined
        ) {
            return h(
                "div",
                ctx.injections.tableRoot.$scopedSlots[ctx.props.column.slot]({
                    row: ctx.props.row,
                    column: ctx.props.column,
                    index: ctx.props.index
                })
            );
        } else if (
            ctx.injections.tableRoot.$scopedSlots['defaultCell'] !==
            undefined
        ){
  
            return h(
                "div",
                ctx.injections.tableRoot.$scopedSlots['defaultCell']({
                    row: ctx.props.row,
                    column: ctx.props.column,
                    index: ctx.props.index
                })
            );
        } else {
      
            return h("div");
        }
    }
};
