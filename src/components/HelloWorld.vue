<template>
  <div class="hello">
    <table class="mt-table" v-table-column-filter="'table-column-10000'">
      <tr>
        <th col="列1">列1</th>
        <th col="列2" basic>列2</th>
        <th col="列3" unchecked>列3</th>
        <th col="列4">列4</th>
        <th col="列5">列5</th>
        <th col="列6">列6</th>
        <th col="列7">列7</th>
      </tr>
      <tr v-for="(row, idx) in tableData" :key="idx">
        <td v-for="(td, ix) in row" :key="ix">{{td}}</td>
      </tr>
    </table>
    <!-- <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul> -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      tableData: [],
    }
  },
  props: {
    msg: String,
  },
  mounted() {
    this.tableData.push(['val1', 'val2', 'val3', 'val4', 'val5', 'val6', 'val7' ])
    this.tableData.push(['val1', 'val2', 'val3', 'val4', 'val5', 'val6', 'val7' ])
    this.tableData.push(['val1', 'val2', 'val3', 'val4', 'val5', 'val6', 'val7' ])
    this.tableData.push(['val1', 'val2', 'val3', 'val4', 'val5', 'val6', 'val7' ])
    this.tableData.push(['val1', 'val2', 'val3', 'val4', 'val5', 'val6', 'val7' ])
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.mt-table {
  width: 100%;
  table-layout: fixed;
  word-break: break-all;
  border: 1px solid #dddee1;
  border-collapse: collapse;
}
.mt-table td,th {
  vertical-align: middle;
  height: 40px;
  padding: 8px 8px 8px 15px;
  text-align: left;
  font-size: 14px;
}
.mt-table td {
  border-top: 1px solid #e9eaec;
}
.mt-table th {
  background: #f8f8f9;
  border-bottom: none;
  color: #495060;
  font-weight: normal;
}
.mt-table:not(.dis-hover) tr:hover {
  background-color: #ebf7ff;
}
.mt-table-column{
  text-align: center !important;
}

a {
  color: blue!important;
}
</style>
