
// 状态管理入口文件

import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';       //存放vuex的核心处理函数
import * as mutations from './mutations';   //改版store中各种状态的地方
import * as getters from './getters';       // 工具接口为了方便构建全局state自定义方法
import state from './rootState';            //创建rootState.js保存顶层的数据


Vue.use(Vuex);

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});

export default store;
