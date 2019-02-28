# 可视化模板

> 这是一个可视化模板demo

#### 引用的依赖

> npm install element-ui vuedraggable vuex --save

##### 大致思路

- 点击页面中左侧菜单,生成一个item(item是一个组件,先定义好引入)并更新到store中的items数组中;

- 使用vuedraggable实现对手机中模块(每一个部分是一个组件)拖动顺序;

- 遍历items数组时,将index作为参数传入每个子组件;

- 点击删除按钮,通过传入的属性更新store中items数组的值,并在父组件中监听items的变化,及时渲染页面;

- 点击上移或者下移按钮时,将与之相邻的item顺序与之调换,更新store

#### 遇到的问题

##### 1. 在点击上移或者下移按钮时,更新store时,页面没有重新渲染

 - 查找资料后借鉴了这篇文章: https://forum.vuejs.org/t/vuex/44287

   > 已解决, 因为helplink 是一个数组, 在状态管理器里面 修改的时候 是修改的 数组的某一位的值 导致监听不到重新赋值 state.helplink = payload 就监听到了

 - 在banner.vue文件中做了修改,其他两个组件同理,直接更改数组元素是不行的,可以操作数组中的对象

   ```javascript
   moveUp(index) {
       if(index === 0){
           this.$message.warning("已经是第一个了,不能再上移了")
           return
       }
       let items = store.state.items
       let tempA = items[index].comp
       let tempB = items[index - 1].comp
       items[index - 1].comp = tempA
       items[index].comp = tempB
       // store.dispatch('orderByItem', items)
       store.commit('orderByItemArr', items)
   }
   ```

##### 2. 点击下移按钮时,根据父组件传入的index与store中items的长度比较,如果是最后一个模块,就提示它不能再下移了,此中直接监听items数组的长度,会出现错误,第二次点击下移时直接返回0,所以要在点击时去获取数组长度

```javascript
moveDown(index) {
    let length = store.state.items.length
    if(index === length - 1){
        this.$message.warning("已经是最后一个了,不能再下移了")
        return
    }
    let items = store.state.items
    let tempA = items[index].comp
    let tempB = items[index + 1].comp
    items[index + 1].comp = tempA
    items[index].comp = tempB
    // store.dispatch('orderByItem', items)
    store.commit('orderByItemArr', items)
}
```


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
