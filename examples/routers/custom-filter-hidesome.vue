<template>
  <div style="margin: 20px">
    <h3>筛选列隐藏项</h3>
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
        },
        {
          title: "Age",
          key: "age",
          hideFilter: true,
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
    ></BeeGridTable>
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
            hideFilter: true,
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
