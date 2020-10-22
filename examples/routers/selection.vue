<template>
  <div style="margin: 20px">
    <h3>可选择</h3>
    <BeeGridTable
      border
      ref="selection"
      :columns="columns"
      :data="data"
    ></BeeGridTable>
    <Button type="primary" size="large" @click="handleSelectAll(true)">
      全选
    </Button>
    <Button type="primary" size="large" @click="handleSelectAll(false)">
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
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "Name",
          key: "name",
          align: "center",
        },
        {
          title: "Age",
          key: "age",
          align: "center",
        },
        {
          title: "Street",
          key: "street",
          align: "center",
        },
        {
          title: "Gender",
          key: "gender",
          align: "center",
        },
      ],
      data: [],
      code: `
    <BeeGridTable
      border
      ref="selection"
      :columns="columns"
      :data="data"
    ></BeeGridTable>
    <Button type="primary" size="large" @click="handleSelectAll(true)">
      全选
    </Button>
    <Button type="primary" size="large" @click="handleSelectAll(false)">
      清除选中
    </Button>
      `,
      codeJs: `
    columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "Name",
          key: "name",
          align: "center",
        },
        {
          title: "Age",
          key: "age",
          align: "center",
        },
        {
          title: "Street",
          key: "street",
          align: "center",
        },
        {
          title: "Gender",
          key: "gender",
          align: "center",
        },
      ],

      ...

    methods: {
        handleSelectAll(status) {
            this.$refs.selection.selectAll(status);
        },
    },
      `,
    };
  },
  methods: {
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
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
