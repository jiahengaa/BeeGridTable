export default {
    name: "TableExpand",
    functional: true,
    inject: ["tableRoot"],
    props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
            type: Object,
            default: null
        }
    },
    render: (h, ctx) => {
        const params = {
            row: ctx.props.row,
            index: ctx.props.index,
            column: null
        };
        if (ctx.props.column) params.column = ctx.props.column;

        if (params.column !== null) {
            if (params.column.slot !== undefined) {
                return h(
                    "div",
                    ctx.injections.tableRoot.$scopedSlots[
                        ctx.props.column.slot
                    ]({
                        row: ctx.props.row,
                        column: ctx.props.column,
                        index: ctx.props.index
                    })
                );
            }
        }
        return ctx.props.render(h, params);
    }
};
