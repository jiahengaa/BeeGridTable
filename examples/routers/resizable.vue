<template>
  <div style="margin: 20px">
    <h3>可调整列宽</h3>
    <BeeGridTable border :columns="columns" :data="data"></BeeGridTable>

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
          resizable: true,
        },
        {
          title: "Age",
          key: "age",
          resizable: true,
        },
        {
          title: "Street",
          key: "street",
          resizable: true,
        },
        {
          title: "Gender",
          key: "gender",
          resizable: true,
        },
      ],
      data: [],
      code: `
    <BeeGridTable
        border
        :columns="columns"
        :data="data"
        ></BeeGridTable>
      `,
      codeJs: `
    columns: [
        {
          title: "Name",
          key: "name",
          resizable: true,
        },
        {
          title: "Age",
          key: "age",
          resizable: true,
        },
        {
          title: "Street",
          key: "street",
          resizable: true,
        },
        {
          title: "Gender",
          key: "gender",
          resizable: true,
        },
      ],
      `,
    };
  },
  methods: {},
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
