<template>
  <div style="margin: 20px; margin-right: 50px">
    <br />
    <img src="../../assets/images/beegridtable.png" alt="" srcset="" />
    <div
      style="
        margin-left: 50px;
        background-color: aliceblue;
        font-size: x-large;
        font-family: emoji;
        border-radius: 20px;
        padding-left: 50px;
      "
    >
      <div>
        <span style="margin-left: 50px">BeeGridTable</span> Is A Vue Table
        libary.
      </div>
      <div>Rich functions、Easy to use!</div>
    </div>

    <br />
    <BeeGridTable
      ref="table"
      border
      :showSummary="true"
      :summary-method="customSummary"
      :columns="columns"
      :data="data"
      height="720"
      @on-row-click="onRowClick"
    >
      <template slot-scope="{ row }" slot="sex">
        <i
          style="font-size: x-large"
          class="bee-sys-icon md-man"
          v-if="row.sex === 0"
        ></i>
        <i
          style="font-size: x-large; color: red"
          class="bee-sys-icon md-woman"
          v-else
        ></i>
      </template>
      <template slot-scope="{ column, doSortAndFilter }" slot="fsex">
        <RadioGroup
          v-model="column.selectedSexCode"
          @on-change="sexSelected(column, doSortAndFilter)"
        >
          <Radio label="-1">
            <i class="bee-sys-icon md-people"></i>
            <span>所有</span>
          </Radio>
          <Radio label="0">
            <i class="bee-sys-icon md-man"></i>
            <span>男</span>
          </Radio>
          <Radio label="1">
            <i style="color: red" class="bee-sys-icon md-woman"></i>
            <span>女</span>
          </Radio>
        </RadioGroup>
      </template>
      <template slot="hop">
        <Button type="primary" size="large" @click="exportData()">
          Export
        </Button>
      </template>

      <template slot-scope="{ row, index }" slot="op">
        <Button type="warning" size="small" style="margin-right: 5px"
          >编辑</Button
        >
        <Button type="error" size="small" @click="handleDelete(row, index)"
          >删除</Button
        >
      </template>
    </BeeGridTable>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          title: "Name",
          key: "name",
          align: "center",
          width: 200,
          filterHeight: 50,
          resizable: true,
          fixed: "left",
          filterMethod(column, field, value, row) {
            if (value === undefined || value === null || value === "") {
              return true;
            }
            return row.name.search(value) !== -1;
          },
        },
        {
          title: "Infomation",
          align: "center",
          children: [
            {
              title: "Salary",
              key: "salary",
              showSummary: true,
              align: "center",
              width: 200,
              sortable: true,
            },
            {
              title: "Address",
              align: "center",
              children: [
                {
                  title: "Street",
                  key: "street",
                  align: "center",
                  width: 200,
                  hideFilter: true,
                  resizable: true,
                },
                {
                  title: "Block",
                  align: "center",
                  children: [
                    {
                      title: "Building",
                      key: "building",
                      align: "center",
                      width: 300,
                      sortable: true,
                      sortType: "desc",
                    },
                    {
                      title: "Door No.",
                      key: "door",
                      align: "center",
                      width: 300,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          title: "Company",
          align: "center",
          children: [
            {
              title: "Company Address",
              key: "caddress",
              align: "center",
              width: 200,
            },
            {
              title: "Company Name",
              key: "cname",
              align: "center",
              width: 200,
            },
          ],
        },
        {
          title: "Sex",
          key: "sex",
          align: "center",
          width: 200,
          filterHeight: 50,
          fixed: "right",
          resizable: true,
          slot: "sex",
          selectedSexCode: -1,
          headFilterSlot: "fsex",
        },
        {
          title: "操作",
          key: "op",
          slot: "op",
          headSlot: "hop",
          align: "center",
          width: 200,
          hideFilter: true,
          filterHeight: 50,
          fixed: "right",
          resizable: true,
        },
      ],

      data: [],
    };
  },
  methods: {
    handleResize(width) {},
    handleSpan({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          return [1, 2];
        } else if (columnIndex === 1) {
          return [0, 0];
        }
      }
    },
    onRowClick(row, index) {
      console.log(row, index);
    },
    exportData() {
      this.$refs.table.exportCsv({
        filename: "BeeGridTable",
      });
    },
    sexSelected(column, doSortAndFilter) {
      column.filterValue =
        column.selectedSexCode === "-1" ? null : column.selectedSexCode;
      doSortAndFilter();
    },
    //自定义合计方法
    customSummary({ columns, data }) {
      const sums = {};
      let doorNum = 0;
      columns.forEach((column, index) => {
        const key = column.key;
        if (column.key === "name") {
          sums[column.key] = {
            key: column.key,
            value: "合计",
          };
          return;
        }
        // 统计salary
        if (column.key === "salary") {
          const values = data.map((item) => Number(item[key]));
          if (!values.every((value) => isNaN(value))) {
            const v = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[key] = {
              key,
              value: v + " 元",
            };
          } else {
            sums[key] = {
              key,
              value: "N/A",
            };
          }
        }

        //统计门牌号共有多少个
        if (column.key === "door") {
          const values = data.map((item) => Number(item[key]));
          values.reduce((prev, curr) => {
            if (doorNum < curr) {
              doorNum = curr;
            }
            return doorNum;
          }, 0);
        }
      });
      sums["door"] = {
        key: "door",
        value: doorNum + " 个门牌号",
      };
      return sums;
    },
    handleSpan2({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
  },
  mounted() {
    setTimeout(() => {
      let tempData = [];
      for (var i = 1; i < 1001; i++) {
        tempData.push({
          key: i,
          name: "Bob" + i,
          salary: i,
          street: "Link Street",
          building: "A" + i,
          door: i % 21,
          caddress: "Lake Street 41",
          cname: "SoftLake Co",
          sex: i % 2,
        });
      }
      this.data = tempData;
    }, 1000);
  },
};
</script>
