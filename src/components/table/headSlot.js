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
        if (
            ctx.injections.tableRoot.$columnSlots !== undefined &&
            ctx.injections.tableRoot.$columnSlots[
                "bee-header-" + ctx.props.column.key
            ] !== undefined
        ) {
            return h(
                "div",
                ctx.injections.tableRoot.$columnSlots[
                    "bee-header-" + ctx.props.column.key
                ]({
                    column: ctx.props.column,
                    index: ctx.props.index
                })
            );
        } else if (
            ctx.injections.tableRoot.$scopedSlots[ctx.props.column.headSlot] !==
            undefined
        ) {
            return h(
                "div",
                ctx.injections.tableRoot.$scopedSlots[
                    ctx.props.column.headSlot
                ]({
                    column: ctx.props.column,
                    index: ctx.props.index
                })
            );
        } else {
            return h("div");
        }

        ///
        if (
            ctx.injections.tableRoot.$scopedSlots[ctx.props.column.headSlot] !==
            undefined
        ) {
            return h(
                "div",
                ctx.injections.tableRoot.$scopedSlots[
                    ctx.props.column.headSlot
                ]({
                    column: ctx.props.column,
                    index: ctx.props.index
                })
            );
        } else {
            return h("div");
        }
    }
};
