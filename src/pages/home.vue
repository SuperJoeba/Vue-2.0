<style lang="scss">
    #container {
        width: 100%;
        height: auto;
        text-align: center;

        h1 {
            color: #42b983;
        }
        button {
            color: #fff;
            width: 80px;
            height: 30px;
            background: #42b983;
            border-radius: 5px;
            text-align: center;
        }
    }
</style>
<template>
    <div id="container">
        <h1>{{ msg }}</h1>
        <button @click="Login">登录</button>
    </div>
</template>
<script>

    export default {

        data () {
            return {
                msg: 'Start VUE on this Page'
            }
        },
        methods: {
            Login() {
                debugger;
                location.href = './login';
            }
        }

    }

</script>