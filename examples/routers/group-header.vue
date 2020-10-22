<template>
  <div style="margin: 20px">
    <h3>表头分组</h3>

    <BeeGridTable border :columns="columns" :data="data" height="760">
    </BeeGridTable>

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
          align: "center",
          width: 200,
          filterHeight: 50,
          resizable: true,
          fixed: "left",
          filterMethod(column, field, value, row) {
            if (value === undefined || value === null || value === "") {
              return true;
            }
            return row.name.search(value) !== -1;
          },
        },
        {
          title: "Information",
          align: "center",
          children: [
            {
              title: "Age",
              key: "age",
              align: "center",
              width: 200,
              sortable: true,
            },
            {
              title: "Office",
              align: "center",
              children: [
                {
                  title: "Street",
                  key: "street",
                  align: "center",
                  width: 200,
                  hideFilter: true,
                  resizable: true,
                },
                {
                  title: "Block",
                  align: "center",
                  children: [
                    {
                      title: "Building",
                      key: "building",
                      align: "center",
                      width: 300,
                      sortable: true,
                      sortType: "desc",
                    },
                    {
                      title: "Door No.",
                      key: "door",
                      align: "center",
                      width: 300,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          title: "Company",
          align: "center",
          children: [
            {
              title: "Company Name",
              key: "cname",
              align: "center",
              width: 200,
            },
            {
              title: "Company Address",
              key: "caddress",
              align: "center",
              width: 200,
            },
          ],
        },
        {
          title: "Salary",
          key: "salary",
          align: "center",
          width: 200,
          filterHeight: 50,
          fixed: "right",
          resizable: true,
        },
      ],
      data: [],
      code: `    
    <BeeGridTable border :columns="columns" :data="data" height="760">
    </BeeGridTable>
`,
      codeJs: `
    columns: [
        {
          title: "Name",
          key: "name",
          align: "center",
          width: 200,
          filterHeight: 50,
          resizable: true,
          fixed: "left",
          filterMethod(column, field, value, row) {
            if (value === undefined || value === null || value === "") {
              return true;
            }
            return row.name.search(value) !== -1;
          },
        },
        {
          title: "Information",
          align: "center",
          children: [
            {
              title: "Age",
              key: "age",
              align: "center",
              width: 200,
              sortable: true,
            },
            {
              title: "Office",
              align: "center",
              children: [
                {
                  title: "Street",
                  key: "street",
                  align: "center",
                  width: 200,
                  hideFilter: true,
                  resizable: true,
                },
                {
                  title: "Block",
                  align: "center",
                  children: [
                    {
                      title: "Building",
                      key: "building",
                      align: "center",
                      width: 300,
                      sortable: true,
                      sortType: "desc",
                    },
                    {
                      title: "Door No.",
                      key: "door",
                      align: "center",
                      width: 300,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          title: "Company",
          align: "center",
          children: [
            {
              title: "Company Name",
              key: "cname",
              align: "center",
              width: 200,
            },
            {
              title: "Company Address",
              key: "caddress",
              align: "center",
              width: 200,
            },
          ],
        },
        {
          title: "Salary",
          key: "salary",
          align: "center",
          width: 200,
          filterHeight: 50,
          fixed: "right",
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
          name: "Bob" + i,
          age: i,
          street: "Walf Street",
          building: "D" + ((i % 10) + 1),
          door: i % 21,
          caddress: "Lake Street 41",
          cname: "SoftLake Co",
          salary: "￥" + i,
        });
      }
      this.data = tempData;
    }, 1000);
  },
};
</script>
