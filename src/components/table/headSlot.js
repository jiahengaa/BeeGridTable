export default {
    name: "TableHeadSlot",
    functional: true,
    inject: ["tableRoot"],
    props: {
        index: Number,
        column: {
            type: Object,
            default: null
        }
    },
    render: (h, ctx) => {
        return h(
            "div",
            ctx.injections.tableRoot.$scopedSlots[ctx.props.column.headSlot]({
                column: ctx.props.column,
                index: ctx.props.index
            })
        );
    }
};
