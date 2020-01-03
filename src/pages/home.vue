 <style scoped>
   
</style>
<template>
    <div id="container">
        <h1 class="test">{{ getMsg() }}</h1>
        <!-- <button @click="notify">click Me</button> -->
        <form @submit.prevent="register" autocomplete="off">
            <div>
                <label for="phone">手机号</label>
                <input type="number" id="phone" v-model="form.memberMobile"/>
            </div>
            <div>
                <label for="name">密码</label>
                <input type="text" id="name" v-model="form.memberPassword"/>
            </div>

            <button type="submit">注册</button>
        </form>
        <button @click="updateData">更新</button>
        <button @click="deleteData">删除</button>
    </div>
</template>
<script>
    import axios from 'axios'
    import Qs from 'qs'
    export default {

        data () {
            return {
                msg: 'Start VUE on this Page',
                form: {
                  memberMobile: '',
                  memberPassword: ''
                }
            }
        },
        beforeUpdate () {
          console.log(this.$data)
        },
        methods: {
            notify () {
              this.$notify({
                content: '这个是测试提示'
              })
            },
            getMsg () {
              console.log('msg updated')
              return this.msg + '1'
            },
            register () {
              let param = new URLSearchParams();
              param.append('memberMobile', this.form.memberMobile);
              param.append('memberPassword', this.form.memberPassword);
              axios.post('http://localhost:8080/maven-ssm-web/mysql/register', param).then(res => {
                console.log(res)
              })
            },
            updateData () {
              let param = Qs.stringify(this.form)
              console.log(param)
              axios({
                url:'http://localhost:8080/maven-ssm-web/mysql/update',
                method: 'put',
                data: param
              }).then(res => {
                console.log(res)
              })
            },
            deleteData () {
                axios.delete('http://localhost:8080/maven-ssm-web/mysql/delete?id=12').then(res => {
                  console.log(res)
                })
            }
        },
        mounted () {
          axios({
            url: 'http://localhost:8000/maven-ssm-web/mysql/select',
            params: {
              id: 4
            },
            method: 'get'
          }).then(res => {
            console.log(res)
          })
          axios({
            baseURL: '/api',
            methods: 'get',
            params: {
              key: 'B22BZ-CTOKQ-6OE5F-GQYSI-VYXH5-H3F4Z'
            }
          }).then(res => {
            console.log(res)
          })
        }

    }

</script>