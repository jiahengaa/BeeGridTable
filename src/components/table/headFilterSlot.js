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
        if (
            ctx.injections.tableRoot.$columnSlots !== undefined &&
            ctx.injections.tableRoot.$columnSlots[
                "bee-filter-" + ctx.props.column.key
            ] !== undefined
        ) {
            return h(
                "div",
                ctx.injections.tableRoot.$columnSlots[
                    "bee-filter-" + ctx.props.column.key
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
        } else if (
            ctx.injections.tableRoot.$scopedSlots[
                ctx.props.column.headFilterSlot
            ] !== undefined
        ) {
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
        } else {
            return h("div");
        }
    }
};
