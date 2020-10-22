// Type definitions for beegridtable 1.0.0
// Project: https://github.com/jiahengaa/BeeGridTable
// Definitions by: liujiaheng
// Definitions: https://github.com/jiahengaa/BeeGridTable.git
import Vue from "vue";

export { Button, ButtonGroup } from "./button";
export { Cell, CellGroup } from "./cell";
export { Checkbox, CheckboxGroup } from "./checkbox";
export { DatePicker, DatePickerOptions } from "./date-picker";
export { Dropdown, DropdownMenu, DropdownItem } from "./dropdown";
export { Icon } from "./icon";
export { Input } from "./input";
export { InputNumber } from "./input-number";
export { Page } from "./page";
export { Poptip } from "./poptip";
export { Select, Option, OptionGroup } from "./select";
export { Spin } from "./spin";
export {
    Table,
    TableColumn,
    TableRenderCreateElementData,
    TableColumnRenderParams,
    TableColumnRenderHeadParams,
    TableExportCsvParams
} from "./table";
export { TimePicker } from "./time-picker";
export { Tooltip } from "./tooltip";
export { Transfer } from "./transfer";

interface IBeeGlobalOptions {
    size?: string;
    transfer?: boolean | string;
    select: {
        arrow: string;
        customArrow: string;
        arrowSize: number | string;
    };
    cell: {
        arrow: string;
        customArrow: string;
        arrowSize: number | string;
    };
    menu: {
        arrow: string;
        customArrow: string;
        arrowSize: number | string;
    };
    tree: {
        arrow: string;
        customArrow: string;
        arrowSize: number | string;
    };
    cascader: {
        arrow: string;
        customArrow: string;
        arrowSize: number | string;
        itemArrow: string;
        customItemArrow: string;
        itemArrowSize: number | string;
    };
    colorPicker: {
        arrow: string;
        customArrow: string;
        arrowSize: number | string;
    };
    datePicker: {
        icon: string;
        customIcon: string;
        iconSize: number | string;
    };
    timePicker: {
        icon: string;
        customIcon: string;
        iconSize: number | string;
    };
    tabs: {
        closeIcon: string;
        customCloseIcon: string;
        closeIconSize: number | string;
    };
    modal: {
        maskClosable: boolean | string;
    };
}

interface IBeeInstallOptions extends IBeeGlobalOptions {
    locale?: any;
    i18n?: any;
}

declare const API: {
    version: string;
    locale: (l: any) => void;
    i18n: (fn: any) => void;
    install: (Vue: Vue, opts: IBeeInstallOptions) => void;
    lang: (code: string) => void;
};

export default API;

declare module "vue/types/vue" {
    interface Vue {
        $BEETABLE: IBeeGlobalOptions;
    }
}
