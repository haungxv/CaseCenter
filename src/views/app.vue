<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "app",
        created() {
            //在页面加载时读取sessionStorage里的状态信息
            if (sessionStorage.length) {
                this.$store.state.token = sessionStorage.getItem("token");
                this.$store.state.stayCase = JSON.parse(sessionStorage.getItem("stayCase"));
                this.$store.state.workCase = JSON.parse(sessionStorage.getItem("workCase"));
                this.$store.state.historyCase = JSON.parse(sessionStorage.getItem("historyCase"));
                this.$store.state.fileCase = JSON.parse(sessionStorage.getItem("fileCase"));
                this.$store.state.workCase = JSON.parse(sessionStorage.getItem("workCase"));
                this.$store.state.userList = JSON.parse(sessionStorage.getItem("userList"));
                this.$store.state.track = JSON.parse(sessionStorage.getItem("track"));
            }

            //在页面刷新时将vuex里的信息保存到sessionStorage里
            window.addEventListener("beforeunload", () => {
                sessionStorage.setItem("token", this.$store.state.token);
                sessionStorage.setItem("stayCase", JSON.stringify(this.$store.state.stayCase));//待办案件
                sessionStorage.setItem("workCase", JSON.stringify(this.$store.state.workCase));//在办案件
                sessionStorage.setItem("historyCase", JSON.stringify(this.$store.state.historyCase));//历史案件
                sessionStorage.setItem("fileCase", JSON.stringify(this.$store.state.fileCase));//归档案件
                sessionStorage.setItem("userList", JSON.stringify(this.$store.state.userList));//所有账户列表
                sessionStorage.setItem("track", JSON.stringify(this.$store.state.track));//所有操作日志
            })
        }
    }
</script>

<style scoped>
    #app {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>