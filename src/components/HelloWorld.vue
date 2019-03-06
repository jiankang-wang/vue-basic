<template>
  <div class="hello">
    <h1 class="title">{{ msg }}</h1>
    <h2 class="babel">{{ name | filteName }}</h2>
    <div v-show="false" class="squery"></div>
    <el-button v-show="false" type="primary" icon="el-icon-search">搜索</el-button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      name: 'wjk'
    }
  },
  filters: {
    filteName (val) {
      if (val === 'wjk') {
        return 'wcj'
      } else {
        return 'kjw'
      }
    }
  },
  computed: {
    ...mapGetters([
      'area'
    ])
  },
  methods: {
    ...mapActions([
      'getArea'
    ]),
    async getlist () {
      let data = await this.$http.area()
      console.log(data)
    }
  },
  created () {
    let arr = [1, 2, 3, 4, 'wjk', 'wcj', NaN, 1]
    console.log(arr)
    console.log('--数组去重之后--')
    console.log(new Set([...arr]))
    // this.getlist()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hello {
  .title {
    color: red;
  }
  .squery {
    margin-left: 48%;
    width: 5rem;
    height: 5rem;
    background: red;
  }
}
</style>
