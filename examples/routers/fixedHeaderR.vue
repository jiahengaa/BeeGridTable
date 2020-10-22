<template>
  <div style="margin: 20px">
    <h3>固定表头右侧列</h3>

    <BeeGridTable
      :border="true"
      height="560"
      :showSummary="false"
      :columns="columns"
      :data="data"
    >
      <template slot-scope="{ column }" slot="hop">
        <Button type="primary" size="small" style="margin-right: 5px"
          >刷新</Button
        >
        <Button type="warning" size="small" @click="addPatient(column)"
          >新增</Button
        >
      </template>
      <template slot-scope="{ row, index }" slot="op">
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
          title: "排队编号",
          key: "dialysisNumber",
          width: 150,
          filterHeight: 50,
          resizable: true,
        },
        {
          title: "姓名",
          key: "name",
          width: 150,
          filterHeight: 50,
          resizable: true,
        },
        { title: "性别", key: "sexName", width: 150, resizable: true },
        { title: "年龄", key: "birthDay", width: 150, resizable: true },
        {
          title: "排队分组",
          key: "doctorGroupName",
          width: 150,
          resizable: true,
        },
        {
          title: "状态",
          key: "treatStatusName",
          width: 150,
          resizable: true,
        },
        { title: "描述", key: "diagnosis", width: 150, resizable: true },
        { title: "血管路", key: "bloodRoad", resizable: true },
        { title: "队伍", key: "schedules", width: 150, resizable: true },
        {
          title: "严重程度",
          key: "visitTypeName",
          width: 150,
          resizable: true,
        },
        { title: "诊疗", key: "termTypeName", width: 150, resizable: true },
        {
          title: "首次冒险",
          key: "firstTreatDate",
          width: 150,
          resizable: true,
        },
        { title: "手机号码", key: "peopleCode", width: 150, resizable: true },
        {
          title: "证件号",
          key: "idNumber",
          width: 150,
          fixed: "right",
          resizable: true,
        },
        {
          title: "操作",
          slot: "op",
          headSlot: "hop",
          canEdit: false,
          key: "op",
          hideFilter: true,
          resizable: true,
          fixed: "right",
          width: 150,
        },
      ],
      data: [],
      code: `
    <BeeGridTable
      :border="true"
      height="560"
      :showSummary="false"
      :columns="columns"
      :data="data"
    >
      <template slot-scope="{ column }" slot="hop">
        <Button type="primary" size="small" style="margin-right: 5px"
          >刷新</Button
        >
        <Button type="warning" size="small" @click="addPatient(column)"
          >新增</Button
        >
      </template>
      <template slot-scope="{ row, index }" slot="op">
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
        ...
        { title: "手机号码", key: "peopleCode", width: 150, resizable: true },
        { title: "证件号", key: "idNumber", width: 150,fixed: "right", resizable: true },
        {
          title: "操作",
          slot: "op",
          headSlot: "hop",
          canEdit: false,
          key: "op",
          hideFilter: true,
          resizable: true,
          fixed: "right",
          width: 150,
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
