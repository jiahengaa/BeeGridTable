<template>
  <div style="margin: 20px">
    <h3>合计</h3>
    <h4>指定列采用默认算法合计数值</h4>
    <BeeGridTable
      border
      :columns="columns"
      :data="data"
      :showSummary="true"
    ></BeeGridTable>

    <div v-highlight>
      <pre><code class="lang-html">  {{code}}</code></pre>
    </div>
    <div v-highlight>
      <pre><code class="lang-javascript">  {{codeJs}}</code></pre>
    </div>

    <h4>指定列采用自定义算法合计数值</h4>
    <BeeGridTable
      border
      :columns="columns"
      :data="data"
      :showSummary="true"
      :summary-method="customSummary"
    ></BeeGridTable>

    <div v-highlight>
      <pre><code class="lang-html">  {{code1}}</code></pre>
    </div>
    <div v-highlight>
      <pre><code class="lang-javascript">  {{codeJs1}}</code></pre>
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
          title: "工时",
          key: "money",
          showSummary: true,
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
      :showSummary="true"
    ></BeeGridTable>
      `,
      codeJs: `
    columns: [
        {
          title: "Name",
          key: "name",
        },
        {
          title: "工时",
          key: "money",
          showSummary: true,
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
      code1: `
    <BeeGridTable
      border
      :columns="columns"
      :data="data"
      :showSummary="true"
      :summary-method="customSummary"
    ></BeeGridTable>
      `,
      codeJs1: `
    methods: {
    //自定义合计方法
    customSummary({ columns, data }) {
      const sums = {};
      columns.forEach((column, index) => {
        console.log(column);
        const key = column.key;
        if (column.key === "name") {
          sums[column.key] = {
            key: column.key,
            value: "合计",
          };
          return;
        }
        // 统计money
        if (column.key === "money") {
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
      });

      return sums;
    },
  },
      `,
    };
  },
  methods: {
    //自定义合计方法
    customSummary({ columns, data }) {
      const sums = {};
      columns.forEach((column, index) => {
        console.log(column);
        const key = column.key;
        if (column.key === "name") {
          sums[column.key] = {
            key: column.key,
            value: "合计",
          };
          return;
        }
        // 统计money
        if (column.key === "money") {
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
      });

      return sums;
    },
  },
  mounted() {
    setTimeout(() => {
      let tempData = [];
      for (var i = 1; i < 1001; i++) {
        tempData.push({
          key: i,
          name: "John" + i,
          money: i,
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
