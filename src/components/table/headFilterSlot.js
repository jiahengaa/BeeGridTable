export default {
    name: "TableHeadFilterSlot",
    functional: true,
    inject: ["tableRoot"],
    props: {
        index: Number,
        column: {
            type: Object,
            default: null
        },
        doSortAndFilter: Function
    },
    render: (h, ctx) => {
        return h(
            "div",
            ctx.injections.tableRoot.$scopedSlots[
                ctx.props.column.headFilterSlot
            ]({
                column: ctx.props.column,
                index: ctx.props.index,
                doSortAndFilter: () => {
                    ctx.injections.tableRoot.doSortAndFilter(
                        null,
                        ctx.props.column
                    );
                }
            })
        );
    }
};
