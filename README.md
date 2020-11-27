# BeeGridTable [(中文)](./README.zh.md)

#### Description

BeeGridTable , is a Highly Customizable Table UI component library based on Vue.js. Rich functions、More efficient、Easy to use!

#### [Interactive Document](http://www.beegridtable.com/index)

http://www.beegridtable.com/index
![home](https://www.codeproject.com/KB/Articles/5286163/extracted-image-1.png)

#### Installation

-   1.  npm

```
npm i beegridtable -S
```

-   2.  Or yarn

```
yarn add beegridtable
```

#### Features

-   Friendly API.
-   Great documentation.
-   It is awesome.
-   Support Vue.js 2.

#### How to use

-   First of all, Import BeeGridTable
    import BeeGridTable in the entry file (main.js as usual) of webpack:

```
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import BeeGridTable from "beegridtable";
//import BeeLocale from "beegridtable/src/locale"; //default English
import BeelocaleZh from 'beegridtable/src/locale/lang/zh-CN' // Set zh-CN default

import 'beegridtable/dist/styles/beegridtable.css';

Vue.use(BeeGridTable, {
  locale:BeelocaleZh,
  capture: true,
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
```

-   Basic Simple

![basic.png](https://www.codeproject.com/KB/Articles/5286163/extracted-image-2.png)

```
//Vue Template
<BeeGridTable
    :columns="columns"
    :data="data"
></BeeGridTable>

// JS
data() {
    return {
      columns: [
        {
          title: "Name",
          key: "name",
          align: "center",
          resizable: true,
        },
        {
          title: "Age",
          key: "age",
          align: "center",
          sortable: true,
        },
        {
          title: "Street",
          key: "street",
          align: "center",
          resizable: true,
        },
        {
          title: "Gender",
          key: "gender",
          align: "center",
        },
      ],
      data: [],
    };
  },
```

-   Fixed

![fixed.png](https://www.codeproject.com/KB/Articles/5286163/extracted-image-3.png)

```
//Vue Template
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
</BeeGridTable>

//JS
columns: [
    {
        title: "排队编号",
        key: "dialysisNumber",
        fixed: "left",
        width: 150,
        filterHeight: 50,
        resizable: true,
    },
    {
        title: "姓名",
        key: "name",
        fixed: "left",
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
    { title: "严重程度", key: "visitTypeName", width: 150, resizable: true },
    { title: "诊疗", key: "termTypeName", width: 150, resizable: true },
    {
        title: "首次冒险",
        key: "firstTreatDate",
        width: 150,
        resizable: true,
    },
    { title: "手机号码", key: "peopleCode", width: 150, resizable: true },
    { title: "证件号", key: "idNumber", width: 150, resizable: true },
    {
        title: "操作",
        slot: "op",
        headSlot: "hop",
        fixed: "right",
        canEdit: false,
        key: "op",
        hideFilter: true,
        resizable: true,
        //   filterHeight: 50,
        width: 150,
    },
    ],
```

- Column Components

```
    //Template
    <BeeGridTable
      border
      height="560"
      :showSummary="false"
      fixed="left"
      :data="data"
    >
      <BeeColumn field="code" title="Code"></BeeColumn>
      <BeeColumn field="name" title="Name" resizable></BeeColumn>

      <BeeColumn field="sex" title="Sex" type="number">
        <template slot-scope="{ row }">
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
      </BeeColumn>

      <BeeColumn field="state" title="State">
        <template slot-scope="{ row }">
          <Select v-model="row.state" style="width: 100px">
            <Option
              v-for="item in stateList"
              :value="item.value"
              :key="item.value"
              >{{ item.label }}</Option
            >
          </Select>
        </template>
      </BeeColumn>

      <BeeColumn field="group" title="Group">
        <template slot-scope="{ row }">
          <Select v-model="row.groupCode" style="width: 100px">
            <Option
              v-for="item in groupList"
              :value="item.code"
              :key="item.name"
              >{{ item.name }}</Option
            >
          </Select>
        </template>
      </BeeColumn>
      <BeeColumnHeader field="sex">
        <template slot-scope="{ column }">
          <Button style="color: red">{{ column.title }}</Button>
        </template>
      </BeeColumnHeader>
      <BeeColumnFilter
        field="sex"
        :selectedSexCode="selectedSexCode"
        :filterValue="1"
        type="number"
      >
        <template slot-scope="{ column, doSortAndFilter }">
          <RadioGroup
            v-model="column.selectedSexCode"
            @on-change="sexSelected(column, doSortAndFilter)"
          >
            <Radio label="-1">
              <i class="bee-sys-icon md-people"></i>
              <span>All</span>
            </Radio>
            <Radio label="0">
              <i class="bee-sys-icon md-man"></i>
              <span>Boy</span>
            </Radio>
            <Radio label="1">
              <i style="color: red" class="bee-sys-icon md-woman"></i>
              <span>Girl</span>
            </Radio>
          </RadioGroup>
        </template>
      </BeeColumnFilter>
    </BeeGridTable>
```

```
  //JS
  data() {
    return {
       // columns: [],
      data: [],
      ...
    };
  },
      
```

#### [More](http://www.beegridtable.com/index)

#### [License MIT](./LICENSE)
