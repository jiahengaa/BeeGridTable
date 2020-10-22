<template>
  <div style="margin: 20px">
    <h3>高亮行</h3>
    <BeeGridTable
      highlight-row
      ref="currentRowTable"
      height="560"
      border
      :columns="columns"
      :data="data"
    ></BeeGridTable>

    <Button type="primary" size="large" @click="handleClearCurrentRow">
      清除选中
    </Button>

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
      highlight-row
      height="560"
      border
      ref="currentRowTable"
      :columns="columns"
      :data="data"
    ></BeeGridTable>
    <Button type="primary" size="large" @click="handleClearCurrentRow">
      清除选中
    </Button>
      `,
      codeJs: `
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

    ...

    methods: {
        handleClearCurrentRow() {
            this.$refs.currentRowTable.clearCurrentRow();
        },
    },
      `,
    };
  },
  methods: {
    handleClearCurrentRow() {
      this.$refs.currentRowTable.clearCurrentRow();
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
