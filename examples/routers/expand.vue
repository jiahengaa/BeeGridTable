<template>
  <div style="margin: 20px">
    <h3>可展开</h3>
    <BeeGridTable border :columns="columns" :data="data">
      <template slot-scope="{ row, index }" slot="expand">
        <div>详情：</div>
        <div>{{ row.name }}</div>
        <div>
          <span> Company: </span>
          <span>{{ row.caddress + " " + row.building + " " + row.door }}</span>
        </div>
        <Button type="warning" size="small" style="margin-right: 5px"
          >编辑</Button
        >
        <Button type="error" size="small" @click="handleDelete(row, index)"
          >删除</Button
        >
      </template>
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
          type: "expand",
          hideFilter: true,
          slot: "expand",
          width: 50,
        },
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
    <BeeGridTable border :columns="columns" :data="data">
      <template slot-scope="{ row, index }" slot="expand">
        <div>详情：</div>
        <div>{{ row.name }}</div>
        <div>
          <span> Company: </span>
          <span>{{ row.caddress + " " + row.building + " " + row.door }}</span>
        </div>
        <Button type="warning" size="small" style="margin-right: 5px"
          >编辑</Button
        >
        <Button type="error" size="small" @click="handleDelete(row, index)"
          >删除</Button
        >
      </template>
    </BeeGridTable>
      `,
      codeJs: `
    columns: [
        {
          type: "expand",
          hideFilter: true,
          slot: "expand",
          width: 50,
        },
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
          gender: i % 2 == 0 ? "Man" : "Woman",
        });
      }
      this.data = tempData;
    }, 1000);
  },
};
</script>
