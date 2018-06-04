<style lang="scss">
    #container {
        width: 100%;
        height: auto;
        text-align: center;

        h1 {
            color: #42b983;
        }
    }
</style>
<template>
    <div id="container">
        <h1>{{ msg }}</h1>
    </div>
</template>
<script>

    export default {

        data () {
            return {
                msg: 'this is a login page'
            }
        }

    }

</script>