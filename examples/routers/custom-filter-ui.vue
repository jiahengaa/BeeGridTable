<template>
  <div style="margin: 20px">
    <h3>自定义筛选UI</h3>
    <br />
    <h4>自定义UI,使用默认筛选算法</h4>
    <BeeGridTable
      border
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
      <template slot-scope="{ row }" slot="sex">
        <i
          style="font-size: x-large"
          class="bee-sys-icon md-man"
          v-if="row.sex === 0"
        ></i>
        <i
          style="font-size: x-large; color: red"
          class="bee-sys-icon md-woman"
          v-else
        ></i>
      </template>
      <template slot-scope="{ column, doSortAndFilter }" slot="fsex">
        <RadioGroup
          v-model="column.selectedSexCode"
          @on-change="sexSelected(column, doSortAndFilter)"
        >
          <Radio label="-1">
            <i class="bee-sys-icon md-people"></i>
            <span>所有</span>
          </Radio>
          <Radio label="0">
            <i class="bee-sys-icon md-man"></i>
            <span>男</span>
          </Radio>
          <Radio label="1">
            <i style="color: red" class="bee-sys-icon md-woman"></i>
            <span>女</span>
          </Radio>
        </RadioGroup>
      </template>

      <template slot-scope="{ row }" slot="state">
        <Select v-model="row.state" style="width: 100px">
          <Option
            v-for="item in stateList"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</Option
          >
        </Select>
      </template>
      <template slot-scope="{ row }" slot="group">
        <Select v-model="row.groupCode" style="width: 100px">
          <Option
            v-for="item in groupList"
            :value="item.code"
            :key="item.name"
            >{{ item.name }}</Option
          >
        </Select>
      </template>
    </BeeGridTable>

    <div v-highlight>
      <pre><code class="lang-html">  {{code}}</code></pre>
    </div>
    <div v-highlight>
      <pre><code class="lang-javascript">  {{codeJs}}</code></pre>
    </div>

    <br />
    <h4>自定义UI,使用自定义筛选算法</h4>
    <BeeGridTable
      border
      height="560"
      :showSummary="false"
      :columns="columnsCustom"
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
      <template slot-scope="{ row }" slot="sex">
        <i
          style="font-size: x-large"
          class="bee-sys-icon md-man"
          v-if="row.sex === 0"
        ></i>
        <i
          style="font-size: x-large; color: red"
          class="bee-sys-icon md-woman"
          v-else
        ></i>
      </template>
      <template slot-scope="{ column, doSortAndFilter }" slot="fsex">
        <RadioGroup
          v-model="column.selectedSexCode"
          @on-change="sexSelected(column, doSortAndFilter)"
        >
          <Radio label="-1">
            <i class="bee-sys-icon md-people"></i>
            <span>所有</span>
          </Radio>
          <Radio label="0">
            <i class="bee-sys-icon md-man"></i>
            <span>男</span>
          </Radio>
          <Radio label="1">
            <i style="color: red" class="bee-sys-icon md-woman"></i>
            <span>女</span>
          </Radio>
        </RadioGroup>
      </template>

      <template slot-scope="{ row }" slot="state">
        <Select v-model="row.state" style="width: 100px">
          <Option
            v-for="item in stateList"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</Option
          >
        </Select>
      </template>
      <template slot-scope="{ row }" slot="group">
        <Select v-model="row.groupCode" style="width: 100px">
          <Option
            v-for="item in groupList"
            :value="item.code"
            :key="item.name"
            >{{ item.name }}</Option
          >
        </Select>
      </template>

      <template slot-scope="{ column, doSortAndFilter }" slot="hgroup">
        <Select
          transfer
          clearable
          v-model="column.selectedGroup"
          @on-change="filterGroupSelectChange(column, doSortAndFilter)"
          style="width: 100px"
        >
          <Option
            v-for="item in groupList"
            :value="item.code"
            :key="item.name"
            >{{ item.name }}</Option
          >
        </Select>
      </template>
    </BeeGridTable>

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
          title: "编号",
          key: "code",
          width: 150,
          resizable: true,
        },
        {
          title: "姓名",
          key: "name",
          width: 150,
        },
        {
          title: "性别",
          slot: "sex",
          key: "sex",
          width: 100,
          selectedSexCode: -1,
          headFilterSlot: "fsex",
        },
        { title: "年龄", key: "age", width: 150, resizable: true },
        {
          title: "分组",
          slot: "group",
          key: "groupName",
          resizable: true,
        },
        {
          title: "观察状态",
          slot: "state",
          key: "state",
          width: 200,
        },
        {
          title: "操作",
          slot: "op",
          key: "op",
          width: 150,
        },
      ],
      columnsCustom: [
        {
          title: "编号",
          key: "code",
          width: 150,
          resizable: true,
        },
        {
          title: "姓名",
          key: "name",
          width: 150,
        },
        {
          title: "性别",
          slot: "sex",
          key: "sex",
          width: 100,
          selectedSexCode: -1,
          headFilterSlot: "fsex",
        },
        { title: "年龄", key: "age", width: 150, resizable: true },
        {
          title: "分组",
          slot: "group",
          headFilterSlot: "hgroup",
          key: "groupName",
          selectedGroup: null,
          filterMethod(column, field, value, row) {
            if (value === undefined || value === null) {
              return true;
            }

            return value === row.groupCode;
          },
          resizable: true,
        },
        {
          title: "观察状态",
          slot: "state",
          key: "state",
          width: 200,
        },
        {
          title: "操作",
          slot: "op",
          hideFilter: true,
          key: "op",
          width: 150,
        },
      ],
      data: [],
      groupList: [
        {
          code: 1,
          name: "第1次",
        },
        {
          code: 2,
          name: "第2次",
        },
        {
          code: 3,
          name: "第3次",
        },
      ],
      stateList: [
        {
          value: 0,
          label: "准备中",
        },
        {
          value: 1,
          label: "开始",
        },
        {
          value: 2,
          label: "爆发",
        },
        {
          value: 3,
          label: "结束",
        },
      ],
      code: `
    <BeeGridTable
      border
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
      <template slot-scope="{ row }" slot="sex">
        <i
          style="font-size: x-large"
          class="bee-sys-icon md-man"
          v-if="row.sex === 0"
        ></i>
        <i
          style="font-size: x-large; color: red"
          class="bee-sys-icon md-woman"
          v-else
        ></i>
      </template>
      <template slot-scope="{ column, doSortAndFilter }" slot="fsex">
        <RadioGroup
          v-model="column.selectedSexCode"
          @on-change="sexSelected(column, doSortAndFilter)"
        >
          <Radio label="-1">
            <i class="bee-sys-icon md-people"></i>
            <span>所有</span>
          </Radio>
          <Radio label="0">
            <i class="bee-sys-icon md-man"></i>
            <span>男</span>
          </Radio>
          <Radio label="1">
            <i style="color: red" class="bee-sys-icon md-woman"></i>
            <span>女</span>
          </Radio>
        </RadioGroup>
      </template>

      <template slot-scope="{ row }" slot="state">
        <Select v-model="row.state" style="width: 100px">
          <Option
            v-for="item in stateList"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</Option
          >
        </Select>
      </template>
      <template slot-scope="{ row }" slot="group">
        <Select v-model="row.groupCode" style="width: 100px">
          <Option
            v-for="item in groupList"
            :value="item.code"
            :key="item.name"
            >{{ item.name }}</Option
          >
        </Select>
      </template>
    </BeeGridTable>

      `,
      codeJs: `
    columns: [
        {
          title: "编号",
          key: "code",
          width: 150,
          resizable: true,
        },
        {
          title: "姓名",
          key: "name",
          width: 150,
        },
        {
          title: "性别",
          slot: "sex",
          key: "sex",
          width: 100,
          selectedSexCode: -1,
          headFilterSlot: "fsex",
        },
        { title: "年龄", key: "age", width: 150, resizable: true },
        {
          title: "分组",
          slot: "group",
          key: "groupName",
          resizable: true,
        },
        {
          title: "观察状态",
          slot: "state",
          key: "state",
          width: 200,
        },
        {
          title: "操作",
          slot: "op",
          key: "op",
          width: 150,
        },
    ],
      
    ...
    methods: {
    sexSelected(column, doSortAndFilter) {
      column.filterValue =
        column.selectedSexCode === "-1" ? null : column.selectedSexCode;
      doSortAndFilter();
    },
  },
    
      `,
      code1: `
    <BeeGridTable
      border
      height="560"
      :showSummary="false"
      :columns="columnsCustom"
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
      <template slot-scope="{ row }" slot="sex">
        <i
          style="font-size: x-large"
          class="bee-sys-icon md-man"
          v-if="row.sex === 0"
        ></i>
        <i
          style="font-size: x-large; color: red"
          class="bee-sys-icon md-woman"
          v-else
        ></i>
      </template>
      <template slot-scope="{ column, doSortAndFilter }" slot="fsex">
        <RadioGroup
          v-model="column.selectedSexCode"
          @on-change="sexSelected(column, doSortAndFilter)"
        >
          <Radio label="-1">
            <i class="bee-sys-icon md-people"></i>
            <span>所有</span>
          </Radio>
          <Radio label="0">
            <i class="bee-sys-icon md-man"></i>
            <span>男</span>
          </Radio>
          <Radio label="1">
            <i style="color: red" class="bee-sys-icon md-woman"></i>
            <span>女</span>
          </Radio>
        </RadioGroup>
      </template>

      <template slot-scope="{ row }" slot="state">
        <Select v-model="row.state" style="width: 100px">
          <Option
            v-for="item in stateList"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</Option
          >
        </Select>
      </template>
      <template slot-scope="{ row }" slot="group">
        <Select v-model="row.groupCode" style="width: 100px">
          <Option
            v-for="item in groupList"
            :value="item.code"
            :key="item.name"
            >{{ item.name }}</Option
          >
        </Select>
      </template>

      <template slot-scope="{ column, doSortAndFilter }" slot="hgroup">
        <Select
          transfer
          clearable
          v-model="column.selectedGroup"
          @on-change="filterGroupSelectChange(column, doSortAndFilter)"
          style="width: 100px"
        >
          <Option
            v-for="item in groupList"
            :value="item.code"
            :key="item.name"
            >{{ item.name }}</Option
          >
        </Select>
      </template>
    </BeeGridTable>
  
      `,
      codeJs1: `
  columnsCustom: [
    {
        title: "编号",
        key: "code",
        width: 150,
        resizable: true,
    },
    {
        title: "姓名",
        key: "name",
        width: 150,
    },
    {
        title: "性别",
        slot: "sex",
        key: "sex",
        width: 100,
        selectedSexCode: -1,
        headFilterSlot: "fsex",
    },
    { title: "年龄", key: "age", width: 150, resizable: true },
    {
        title: "分组",
        slot: "group",
        headFilterSlot: "hgroup",
        key: "groupName",
        selectedGroup: null,
        filterMethod(column, field, value, row) {
        if (value === undefined || value === null) {
            return true;
        }

        return value === row.groupCode;
        },
        resizable: true,
    },
    {
        title: "观察状态",
        slot: "state",
        key: "state",
        width: 200,
    },
    {
        title: "操作",
        slot: "op",
        hideFilter: true,
        key: "op",
        width: 150,
    },
    ],
        

  ...

  methods: {
    sexSelected(column, doSortAndFilter) {
      column.filterValue =
        column.selectedSexCode === "-1" ? null : column.selectedSexCode;
      doSortAndFilter();
    },
    filterGroupSelectChange(column, doSortAndFilter) {
      column.filterValue = column.selectedGroup;
      doSortAndFilter();
    },
  },  
    `,
    };
  },
  methods: {
    sexSelected(column, doSortAndFilter) {
      column.filterValue =
        column.selectedSexCode === "-1" ? null : column.selectedSexCode;
      doSortAndFilter();
    },
    filterGroupSelectChange(column, doSortAndFilter) {
      column.filterValue = column.selectedGroup;
      doSortAndFilter();
    },
  },
  mounted() {
    setTimeout(() => {
      let tempData = [];
      for (var i = 1; i < 1001; i++) {
        tempData.push({
          key: i,
          code: `abc` + i,
          name: "John" + i,
          birthDay: "",
          age: (i % 65) + 5,
          groupCode: (i % 3) + 1,
          groupName: "第" + ((i % 3) + 1) + "组",
          state: i % 4,
          sex: i % 2,
        });
      }
      this.data = tempData;
    }, 1000);
  },
};
</script>
