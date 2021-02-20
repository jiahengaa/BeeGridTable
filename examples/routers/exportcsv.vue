<template>
  <div style="margin: 20px">
    <h3>导出csv</h3>

    <Button type="primary" size="large" @click="exportData()">
      <Icon type="ios-download-outline"></Icon>Export data
    </Button>
    <Button type="primary" size="large" @click="exportXlsx()">
      <Icon type="ios-download-outline"></Icon>Export array data as xlsx
    </Button>
    <Button type="primary" size="large" @click="exportXlsxJson()">
      <Icon type="ios-download-outline"></Icon>Export json data as xlsx
    </Button>

    <BeeGridTable
      ref="table"
      border
      :columns="columns"
      :data="data"
      :defaultCell="true"
    >
      <template slot="defaultCell" slot-scope="{ row, column }">
        <div style="background: beige">{{ row[column.key] }}</div>
      </template>
    </BeeGridTable>

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
    exportXlsx() {
      this.$refs.table.exportXlsx({ dataType: "array" });
    },
    exportXlsxJson() {
      this.$refs.table.exportXlsx({
        fileName: "调查表",
        header: ["name", "street"],
        headerDisplay: { name: "姓名", street: "街道" },
      });
    },
  },
  computed: {
    getText() {
      return (row, column) => {
        return row[column.key];
      };
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
