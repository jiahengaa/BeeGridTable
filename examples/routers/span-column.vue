<template>
  <div style="margin: 20px">
    <h3>行数据合并</h3>
    <BeeGridTable
      border
      :columns="columns"
      :data="data"
      :span-method="customSpan"
    ></BeeGridTable>

    <div v-highlight>
      <pre><code class="lang-html">  {{code}}</code></pre>
    </div>
    <div v-highlight>
      <pre><code class="lang-javascript">  {{codeJs}}</code></pre>
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
        },
        {
          title: "Age",
          key: "age",
        },
        {
          title: "Street",
          key: "street",
        },
        {
          title: "Gender",
          key: "gender",
        },
      ],
      data: [],
      code: `
    <BeeGridTable
      border
      :columns="columns"
      :data="data"
      :span-method="customSpan"
    ></BeeGridTable>
      `,
      codeJs: `
   methods: {
    customSpan({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0 && columnIndex === 0) {
        return [1, 2];
      } else if (rowIndex === 0 && columnIndex === 1) {
        return [0, 0];
      }
      if (rowIndex === 2 && columnIndex === 0) {
        return {
          rowspan: 2,
          colspan: 1,
        };
      } else if (rowIndex === 3 && columnIndex === 0) {
        return {
          rowspan: 0,
          colspan: 0,
        };
      }
    },
  },
      `,
    };
  },
  methods: {
    customSpan({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0 && columnIndex === 0) {
        return [1, 2];
      } else if (rowIndex === 0 && columnIndex === 1) {
        return [0, 0];
      }
      if (rowIndex === 2 && columnIndex === 0) {
        return {
          rowspan: 2,
          colspan: 1,
        };
      } else if (rowIndex === 3 && columnIndex === 0) {
        return {
          rowspan: 0,
          colspan: 0,
        };
      }
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
    }, 1000);
  },
};
</script>
