<template>
  <div style="margin: 20px">
    <h3>排序</h3>
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
          sortable: true,
        },
        {
          title: "Street",
          key: "street",
        },
        {
          title: "Gender",
          key: "gender",
          sortable: true,
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
        sortable: true,
      },
      {
        title: "Street",
        key: "street",
      },
      {
        title: "Gender",
        key: "gender",
        sortable: true,
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
