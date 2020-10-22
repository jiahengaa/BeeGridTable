<template>
  <div style="margin: 20px">
    <h3>特定样式</h3>
    <br />
    <h4>自定义行样式</h4>
    <BeeGridTable
      border
      :row-class-name="rowClassName"
      :columns="columns"
      :data="data"
    ></BeeGridTable>
    <div v-highlight>
      <pre><code class="lang-html">  {{codeRow}}</code></pre>
    </div>
    <div v-highlight>
      <pre><code class="lang-javascript">  {{codeRowJs}}</code></pre>
    </div>
    <div v-highlight>
      <pre><code class="lang-css">  {{codeRowCss}}</code></pre>
    </div>
    <h4>自定义列样式</h4>
    <BeeGridTable border :columns="columns1" :data="data"></BeeGridTable>
    <div v-highlight>
      <pre><code class="lang-javascript">  {{codeCol}}</code></pre>
    </div>
    <div v-highlight>
      <pre><code class="lang-css">  {{codeColCss}}</code></pre>
    </div>
    <h4>自定义单元格样式</h4>
    <BeeGridTable border :columns="columns" :data="data1"></BeeGridTable>
    <div v-highlight>
      <pre><code class="lang-html">  {{codeCell}}</code></pre>
    </div>
    <div v-highlight>
      <pre><code class="lang-javascript">  {{codeCellJs}}</code></pre>
    </div>
    <div v-highlight>
      <pre><code class="lang-css">  {{codeCellCss}}</code></pre>
    </div>
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
          resizable: true,
        },
        {
          title: "Age",
          key: "age",
          align: "center",
          sortable: true,
        },
        {
          title: "Street",
          key: "street",
          align: "center",
          resizable: true,
        },
        {
          title: "Gender",
          key: "gender",
          align: "center",
        },
      ],
      columns1: [
        {
          title: "Name",
          key: "name",
          align: "center",
          resizable: true,
        },
        {
          title: "Age",
          key: "age",
          align: "center",
          sortable: true,
        },
        {
          title: "Street",
          key: "street",
          align: "center",
          className: "custom-table-info-column",
          resizable: true,
        },
        {
          title: "Gender",
          key: "gender",
          align: "center",
        },
      ],
      columns2: [
        {
          title: "Name",
          key: "name",
          align: "center",
          resizable: true,
        },
        {
          title: "Age",
          key: "age",
          align: "center",
          sortable: true,
        },
        {
          title: "Street",
          key: "street",
          align: "center",
          resizable: true,
        },
        {
          title: "Gender",
          key: "gender",
          align: "center",
        },
      ],
      data: [],
      data1: [],
      codeRow: `
    <BeeGridTable
        border
        :row-class-name="rowClassName"
        :columns="columns"
        :data="data"
        ></BeeGridTable>
      `,
      codeRowJs: `
    export default {
        methods: {
            rowClassName(row, index) {
            if (index === 1) {
                return "custom-table-info-row";
            } else if (index === 3) {
                return "custom-table-error-row";
            }
            return "";
            },
        },
    }
      `,
      codeRowCss: `
    .bee-table .custom-table-info-row td {
        background-color: #187;
        color: #fff;
    }
    .bee-table .custom-table-error-row td {
        background-color: darkkhaki;
        color: #fff;
    }
      `,
      codeCol: `
    columns1: [
        {
          title: "Name",
          key: "name",
          align: "center",
          resizable: true,
        },
        {
          title: "Age",
          key: "age",
          align: "center",
          sortable: true,
        },
        {
          title: "Street",
          key: "street",
          align: "center",
          className: "custom-table-info-column",
          resizable: true,
        },
        {
          title: "Gender",
          key: "gender",
          align: "center",
        },
      ],
      
      `,
      codeColCss: `
    .bee-table td.custom-table-info-column {
        background-color: #2db7f5;
        color: #fff;
    }
      `,
      codeCell: `
    <BeeGridTable
      border
      :columns="columns"
      :data="data1"
    ></BeeGridTable>
      `,
      codeCellJs: `
    let tempData1 = [];
      for (var i = 1; i < 1001; i++) {
        if (i % 5 === 1) {
          tempData1.push({
            key: i,
            name: "John" + i,
            age: i,
            street: "Lake Park",
            building: "dddf",
            door: i % 21,
            caddress: "Lake Street 41",
            cname: "SoftLake Co",
            gender: "M",
            cellClassName: {
              age: "custom-table-info-cell-age",
              gender: "custom-table-info-cell-address",
            },
          });
        }
        if (i % 7 === 3) {
          tempData1.push({
            key: i,
            name: "John" + i,
            age: i,
            street: "Lake Park",
            building: "dddf",
            door: i % 21,
            caddress: "Lake Street 41",
            cname: "SoftLake Co",
            gender: "M",
            cellClassName: {
              name: "custom-table-info-cell-name",
            },
          });
        }
      }
      this.data1 = tempData1;
      `,
      codeCellCss: `
    .bee-table .custom-table-info-cell-name {
        background-color: #2db7f5;
        color: #fff;
    }
    .bee-table .custom-table-info-cell-age {
        background-color: #ff6600;
        color: #fff;
    }
    .bee-table .custom-table-info-cell-address {
        background-color: #187;
        color: #fff;
    }
      `,
    };
  },
  methods: {
    rowClassName(row, index) {
      if (index === 1) {
        return "custom-table-info-row";
      } else if (index === 3) {
        return "custom-table-error-row";
      }
      return "";
    },
  },
  mounted() {
    setTimeout(() => {
      let tempData = [];
      for (var i = 1; i < 1001; i++) {
        tempData.push({
          key: i,
          name: "John" + i,
          age: i,
          street: "Lake Park",
          building: "dddf",
          door: i % 21,
          caddress: "Lake Street 41",
          cname: "SoftLake Co",
          gender: "M",
        });
      }
      this.data = tempData;

      let tempData1 = [];
      for (var i = 1; i < 1001; i++) {
        if (i % 5 === 1) {
          tempData1.push({
            key: i,
            name: "John" + i,
            age: i,
            street: "Lake Park",
            building: "dddf",
            door: i % 21,
            caddress: "Lake Street 41",
            cname: "SoftLake Co",
            gender: "M",
            cellClassName: {
              age: "custom-table-info-cell-age",
              gender: "custom-table-info-cell-address",
            },
          });
        }
        if (i % 7 === 3) {
          tempData1.push({
            key: i,
            name: "John" + i,
            age: i,
            street: "Lake Park",
            building: "dddf",
            door: i % 21,
            caddress: "Lake Street 41",
            cname: "SoftLake Co",
            gender: "M",
            cellClassName: {
              name: "custom-table-info-cell-name",
            },
          });
        }
      }
      this.data1 = tempData1;
    }, 1000);
  },
};
</script>
<style>
.bee-table .custom-table-info-row td {
  background-color: #187;
  color: #fff;
}
.bee-table .custom-table-error-row td {
  background-color: darkkhaki;
  color: #fff;
}
.bee-table td.custom-table-info-column {
  background-color: #2db7f5;
  color: #fff;
}
.bee-table .custom-table-info-cell-name {
  background-color: #2db7f5;
  color: #fff;
}
.bee-table .custom-table-info-cell-age {
  background-color: #ff6600;
  color: #fff;
}
.bee-table .custom-table-info-cell-address {
  background-color: #187;
  color: #fff;
}
</style>