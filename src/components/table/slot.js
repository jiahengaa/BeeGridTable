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
            ctx.injections.tableRoot.$columnSlots[ctx.props.column.slot] !==
            undefined
        ) {
            return h(
                "div",
                ctx.injections.tableRoot.$columnSlots[ctx.props.column.slot]({
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
