import { deepCopy } from "../../utils/assist";

const convertColumnOrder = (columns, fixedType) => {
    let list = [];
    let other = [];
    columns.forEach(col => {
        if (col.fixed && col.fixed === fixedType) {
            list.push(col);
        } else {
            other.push(col);
        }
    });
    return list.concat(other);
};

export { convertColumnOrder };

const getAllColumns = (cols, forTableHead = false) => {
    const columns = deepCopy(cols);
    const result = [];
    columns.forEach(column => {
        if (column.children) {
            if (forTableHead) result.push(column);
            result.push.apply(
                result,
                getAllColumns(column.children, forTableHead)
            );
        } else {
            result.push(column);
        }
    });
    return result;
};

export { getAllColumns };

const jumUndefinedCol = (row, field) => {
    if (row[field] === undefined) {
        //没有找到当前列是，不做过滤
        return true;
    }
};

//field,filterValue,row
const getNumberFilter = filterOp => {
    switch (filterOp.filterOperation) {
        case "Equals":
            return (column, field, filterValue, row) => {
                if (jumUndefinedCol(row, field)) {
                    return true;
                }
                if (row[field] === null) {
                    return false;
                }

                return row[field] === Number.parseFloat(filterValue);
            };

        case "NotEquals":
            return (column, field, filterValue, row) => {
                if (jumUndefinedCol(row, field)) {
                    return true;
                }
                if (row[field] === null) {
                    return false;
                }
                return row[field] !== Number.parseFloat(filterValue);
            };

        case "Less":
            return (column, field, filterValue, row) => {
                if (jumUndefinedCol(row, field)) {
                    return true;
                }
                if (row[field] === null) {
                    return false;
                }

                return row[field] < Number.parseFloat(filterValue);
            };

        case "Greater":
            return (column, field, filterValue, row) => {
                if (jumUndefinedCol(row, field)) {
                    return true;
                }
                if (row[field] === null) {
                    return false;
                }
                return row[field] > Number.parseFloat(filterValue);
            };

        case "LessOrEquals":
            return (column, field, filterValue, row) => {
                if (jumUndefinedCol(row, field)) {
                    return true;
                }
                if (row[field] === null) {
                    return false;
                }
                return row[field] <= Number.parseFloat(filterValue);
            };

        case "GreaterOrEquals":
            return (column, field, filterValue, row) => {
                if (jumUndefinedCol(row, field)) {
                    return true;
                }
                if (row[field] === null) {
                    return false;
                }
                return row[field] >= Number.parseFloat(filterValue);
            };

        case "Between":
            return (column, field, filterValue, row) => {
                if (jumUndefinedCol(row, field)) {
                    return true;
                }
                if (row[field] === null) {
                    return false;
                }
                return (
                    row[field] > Number.parseFloat(filterValue.left) &&
                    row[field] < Number.parseFloat(filterValue.right)
                );
            };

        case "AnyOf":
            return (column, field, filterValue, row) => {
                if (jumUndefinedCol(row, field)) {
                    return true;
                }
                if (row[field] === null) {
                    return false;
                }
                return filterValue.search(row[field]) !== -1;
            };

        case "NoneOf":
            return (column, field, filterValue, row) => {
                if (jumUndefinedCol(row, field)) {
                    return true;
                }
                if (row[field] === null) {
                    return false;
                }
                return filterValue.search(row[field]) === -1;
            };

        case "LikeSome":
        case "Reset":
        default:
            return (column, field, filterValue, row) => {
                if (jumUndefinedCol(row, field)) {
                    return true;
                }
                if (row[field] === null) {
                    return false;
                }
                return row[field].toString().search(filterValue) !== -1;
            };
    }
};

export { getNumberFilter };

/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
 */
const getHandledValue = num => {
    return num < 10 ? "0" + num : num;
};

/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
 */
const getHandledMilliseValue = num => {
    return num < 10 ? "00" + num : num < 100 && num > 9 ? "0" + num : num;
};

const getDate = timeStamp => {
    const d = new Date(timeStamp);
    const year = d.getFullYear();
    const month = getHandledValue(d.getMonth() + 1);
    const date = getHandledValue(d.getDate());
    const hours = getHandledValue(d.getHours());
    const minutes = getHandledValue(d.getMinutes());
    const second = getHandledValue(d.getSeconds());
    const msecond = getHandledMilliseValue(d.getMilliseconds());
    let resStr = "";
    resStr =
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        second +
        ":" +
        msecond;
    return resStr;
};

const getDateFilter = filterOp => {
    switch (filterOp.filterOperation) {
        case "Equals":
            return (column, field, filterValue, row) => {
                if (jumUndefinedCol(row, field)) {
                    return true;
                }

                let curDate = row[field];
                if (row[field].length === "yyyy-MM-dd".length) {
                    curDate += " 00:00:00";
                }

                return (
                    new Date(curDate).getTime() ===
                    new Date(filterValue).getTime()
                );
            };

        case "NotEquals":
            return (column, field, filterValue, row) => {
                if (jumUndefinedCol(row, field)) {
                    return true;
                }
                let curDate = row[field];
                if (row[field].length === "yyyy-MM-dd".length) {
                    curDate += " 00:00:00";
                }

                return (
                    new Date(curDate).getTime() !==
                    new Date(filterValue).getTime()
                );
            };

        case "Less":
            return (column, field, filterValue, row) => {
                if (jumUndefinedCol(row, field)) {
                    return true;
                }
                let curDate = row[field];
                if (row[field].length === "yyyy-MM-dd".length) {
                    curDate += " 00:00:00";
                }

                return (
                    new Date(curDate).getTime() <
                    new Date(filterValue).getTime()
                );
            };

        case "Greater":
            return (column, field, filterValue, row) => {
                if (jumUndefinedCol(row, field)) {
                    return true;
                }

                let curDate = row[field];
                if (row[field].length === "yyyy-MM-dd".length) {
                    curDate += " 00:00:00";
                }

                return (
                    new Date(curDate).getTime() >
                    new Date(filterValue).getTime()
                );
            };

        case "LessOrEquals":
            return (column, field, filterValue, row) => {
                if (jumUndefinedCol(row, field)) {
                    return true;
                }
                let curDate = row[field];
                if (row[field].length === "yyyy-MM-dd".length) {
                    curDate += " 00:00:00";
                }

                return (
                    new Date(curDate).getTime() <=
                    new Date(filterValue).getTime()
                );
            };

        case "GreaterOrEquals":
            return (column, field, filterValue, row) => {
                if (jumUndefinedCol(row, field)) {
                    return true;
                }
                let curDate = row[field];
                if (row[field].length === "yyyy-MM-dd".length) {
                    curDate += " 00:00:00";
                }

                return (
                    new Date(curDate).getTime() >=
                    new Date(filterValue).getTime()
                );
            };

        case "Between":
            return (column, field, filterValue, row) => {
                if (jumUndefinedCol(row, field)) {
                    return true;
                }
                let curDate = row[field];
                if (row[field].length === "yyyy-MM-dd".length) {
                    curDate += " 00:00:00";
                }
                
                return (
                    new Date(curDate).getTime() >=
                        new Date(filterValue[0]).getTime() &&
                    new Date(curDate).getTime() <=
                        new Date(filterValue[1]).getTime()
                );
            };

        case "Reset":
        default:
            return (column, field, filterValue, row) => {
                if (jumUndefinedCol(row, field)) {
                    return true;
                }
                return getDate(row[field]).search(filterValue) !== -1;
            };
    }
};

export { getDateFilter };
const getStrFilter = filterOp => {
    switch (filterOp.filterOperation) {
        case "Contains":
            return (column, field, filterValue, row) => {
                const filterValueIsEmpty =
                    filterValue === undefined ||
                    filterValue === null ||
                    filterValue.trim() === "";
                if (row[field] === undefined || filterValueIsEmpty) {
                    //没有找到当前列是，不做过滤
                    return true;
                }

                if (row[field] === null) {
                    return false;
                }

                return (
                    row[field].toString().search(filterValue.trim()) !== -1 ||
                    filterValueIsEmpty
                );
            };

        case "NotContains":
            return (column, field, filterValue, row) => {
                const filterValueIsEmpty =
                    filterValue === undefined ||
                    filterValue === null ||
                    filterValue.trim() === "";
                if (row[field] === undefined || filterValueIsEmpty) {
                    //没有找到当前列是，不做过滤
                    return true;
                }

                if (row[field] === null) {
                    return false;
                }

                return (
                    row[field].toString().search(filterValue.trim()) === -1 ||
                    filterValueIsEmpty
                );
            };

        case "StartsWith":
            return (column, field, filterValue, row) => {
                const filterValueIsEmpty =
                    filterValue === undefined ||
                    filterValue === null ||
                    filterValue.trim() === "";
                if (row[field] === undefined || filterValueIsEmpty) {
                    //没有找到当前列是，不做过滤
                    return true;
                }
                if (row[field] === null) {
                    return false;
                }
                return (
                    row[field].toString().startsWith(filterValue.trim()) ||
                    filterValueIsEmpty
                );
            };

        case "EndsWith":
            return (column, field, filterValue, row) => {
                const filterValueIsEmpty =
                    filterValue === undefined ||
                    filterValue === null ||
                    filterValue.trim() === "";
                if (row[field] === undefined || filterValueIsEmpty) {
                    //没有找到当前列是，不做过滤
                    return true;
                }
                if (row[field] === null) {
                    return false;
                }
                return (
                    row[field].toString().endsWith(filterValue.trim()) ||
                    filterValueIsEmpty
                );
            };

        case "Equals":
            return (column, field, filterValue, row) => {
                const filterValueIsEmpty =
                    filterValue === undefined ||
                    filterValue === null ||
                    filterValue.trim() === "";
                if (row[field] === undefined || filterValueIsEmpty) {
                    //没有找到当前列是，不做过滤
                    return true;
                }
                if (row[field] === null) {
                    return false;
                }
                return (
                    row[field].toString() === filterValue.trim() ||
                    filterValueIsEmpty
                );
            };

        case "NotEquals":
            return (column, field, filterValue, row) => {
                const filterValueIsEmpty =
                    filterValue === undefined ||
                    filterValue === null ||
                    filterValue.trim() === "";
                if (row[field] === undefined || filterValueIsEmpty) {
                    //没有找到当前列是，不做过滤
                    return true;
                }
                if (row[field] === null) {
                    return false;
                }
                return (
                    row[field].toString() !== filterValue.trim() ||
                    filterValueIsEmpty
                );
            };

        case "IsBlank":
            return (column, field, filterValue, row) => {
                const filterValueIsEmpty =
                    filterValue === undefined ||
                    filterValue === null ||
                    filterValue.trim() === "";
                if (row[field] === undefined) {
                    //没有找到当前列是，不做过滤
                    return true;
                }
                if (row[field] === null) {
                    return false;
                }
                return filterValueIsEmpty;
            };

        case "IsNotBlank":
            return (column, field, filterValue, row) => {
                const filterValueIsEmpty =
                    filterValue === undefined ||
                    filterValue === null ||
                    filterValue.trim() === "";
                if (row[field] === undefined) {
                    //没有找到当前列是，不做过滤
                    return true;
                }
                if (row[field] === null) {
                    return false;
                }
                return !filterValueIsEmpty;
            };

        case "AnyOf":
            return (column, field, filterValue, row) => {
                const filterValueIsEmpty =
                    filterValue === undefined ||
                    filterValue === null ||
                    filterValue.trim() === "";
                if (row[field] === undefined || filterValueIsEmpty) {
                    //没有找到当前列是，不做过滤
                    return true;
                }

                if (row[field] === null) {
                    return false;
                }

                return filterValue.some(ele => {
                    return row[field].toString() === filterValue.trim();
                });
            };

        case "NoneOf":
            return (column, field, filterValue, row) => {
                const filterValueIsEmpty =
                    filterValue === undefined ||
                    filterValue === null ||
                    filterValue.trim() === "";
                if (row[field] === undefined || filterValueIsEmpty) {
                    //没有找到当前列是，不做过滤
                    return true;
                }
                if (row[field] === null) {
                    return false;
                }

                return filterValue.every(ele => {
                    return row[field].toString() !== filterValue.trim();
                });
            };

        default:
            return (column, field, filterValue, row) => {
                const filterValueIsEmpty =
                    filterValue === undefined ||
                    filterValue === null ||
                    filterValue.trim() === "";
                if (row[field] === undefined || filterValueIsEmpty) {
                    //没有找到当前列是，不做过滤
                    return true;
                }
                if (row[field] === null) {
                    return false;
                }

                return row[field].toString().search(filterValue.trim()) !== -1;
            };
    }
};
export { getStrFilter };

const getFilterMethod = (dataType, filterOp) => {
    const dtype =
        dataType === "string"
            ? String
            : dataType === "number"
                ? Number
                : dataType === undefined
                    ? String
                    : Date;

    switch (dtype) {
        case Number:
            return getNumberFilter(filterOp);
        case Date:
            return getDateFilter(filterOp);
        case String:
            return getStrFilter(filterOp);
        default:
            return getStrFilter(filterOp);
    }
};

export { getFilterMethod };

const convertToRows = (columns, fixedType = false) => {
    const originColumns = fixedType
        ? fixedType === "left"
            ? deepCopy(convertColumnOrder(columns, "left"))
            : deepCopy(convertColumnOrder(columns, "right"))
        : deepCopy(columns);
    let maxLevel = 1;
    const traverse = (column, parent) => {
        if (parent) {
            column.level = parent.level + 1;
            if (maxLevel < column.level) {
                maxLevel = column.level;
            }
        }
        if (column.children) {
            let colSpan = 0;
            column.children.forEach(subColumn => {
                traverse(subColumn, column);
                colSpan += subColumn.colSpan;
            });
            column.colSpan = colSpan;
        } else {
            column.colSpan = 1;
            // 用于搜索的值
            column._filterValue =
                column.filterValue === undefined ? null : column.filterValue;
            column._filterIcon = "search";
            column._type = column.type === undefined ? "string" : column.type;
            column._sortType =
                column.sortType === undefined ? "normal" : column.sortType;

            if (
                column.filterMethod === undefined ||
                column.filterMethod === null
            ) {
                const filterOp = {
                    filterOperation: "Reset",
                    displayName: "Reset",
                    icon: "search"
                };
                column._filterOp = filterOp;
                column._filterMethod = getFilterMethod(column.type, filterOp);
            } else {
                const filterOp = {
                    filterOperation: column.filterOperation || "Custom",
                    displayName: column.filterName || "CustomFilter",
                    icon: column.filterIcon || "search"
                };
                column._filterOp = filterOp;
                column._filterMethod = column.filterMethod;
            }
        }
    };

    originColumns.forEach(column => {
        column.level = 1;

        traverse(column);

        // 用于搜索的值
        column._filterValue =
            column.filterValue === undefined ? null : column.filterValue;
        column._filterIcon = "search";
        column._type = column.type === undefined ? "string" : column.type;
        column._sortType =
            column.sortType === undefined ? "normal" : column.sortType;

        //column.filterMethod 自定义过滤函数
        //column._filterMethod 运行时过滤函数

        if (column.filterMethod === undefined || column.filterMethod === null) {
            const filterOp = {
                filterOperation: "Reset",
                displayName: "Reset",
                icon: "search"
            };
            column._filterOp = filterOp;
            column._filterMethod = getFilterMethod(column.type, filterOp);
        } else {
            const filterOp = {
                filterOperation: column.filterOperation || "Custom",
                displayName: column.filterName || "CustomFilter",
                icon: column.filterIcon || "search"
            };
            column._filterOp = filterOp;
            column._filterMethod = column.filterMethod;
        }
    });

    const rows = [];
    for (let i = 0; i < maxLevel; i++) {
        rows.push([]);
    }

    const allColumns = getAllColumns(originColumns, true);

    allColumns.forEach((column) => {
        if (!column.children) {
            column.rowSpan = maxLevel - column.level + 1;
        } else {
            column.rowSpan = 1;
        }
        rows[column.level - 1].push(column);
    });

    return rows;
};

export { convertToRows };

const getRandomStr = function(len = 32) {
    const $chars =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    const maxPos = $chars.length;
    let str = "";
    for (let i = 0; i < len; i++) {
        str += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return str;
};

export { getRandomStr };
