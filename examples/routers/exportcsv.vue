<template>
  <div style="margin: 20px">
    <h3>导出csv</h3>

    <Button type="primary" size="large" @click="exportData()">
      <Icon type="ios-download-outline"></Icon>Export data
    </Button>
    <BeeGridTable
      ref="table"
      border
      :columns="columns"
      :data="data"
    ></BeeGridTable>

    <div v-highlight>
      <pre><code class="lang-html">  {{code}}</code></pre>
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
      :loading="true"
      :columns="columns"
      :data="data"
    ></BeeGridTable>
      `,
    };
  },
  methods: {
    exportData() {
      this.$refs.table.exportCsv({
        filename: "mytable",
      });
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
