<template>
    <div class="manager">
        <div class="left">
            <div style="color: #ff2217;font-size: 12px;cursor: pointer;margin-top:20px;" @click="exit">退出</div>
            <el-menu :router="true" class="el-menu-vertical-demo " background-color="#324057" text-color="#fff"
                     active-text-color="#20a0ff"
                     :default-active="activeIndex" :unique-opened="true">
                <el-menu-item index="/manager/caseReview" id="leftClick"><span>案件审核</span></el-menu-item>
                <el-menu-item index="/manager/caseRegistration"><span>案件登记</span></el-menu-item>
                <el-menu-item index="/manager/stayCase"><span>待办案件</span></el-menu-item>
                <el-menu-item index="/manager/workCase"><span>在办案件</span></el-menu-item>
                <el-menu-item index="/manager/historyCase"><span>历史案件</span></el-menu-item>
                <el-menu-item index="/manager/fileCase"><span>归档案件</span></el-menu-item>
                <el-menu-item index="/manager/monitorCenter"><span>监控中心</span></el-menu-item>
                <el-menu-item v-if="on_off" index="/manager/manageAccount"><span>账户管理</span></el-menu-item>
                <el-menu-item v-if="on_off" index="/manager/addAccount"><span>新增账户</span></el-menu-item>
                <el-menu-item index="/manager/changePass"><span>修改密码</span></el-menu-item>
                <el-menu-item index="/manager/changeInfo"><span>修改账户</span></el-menu-item>
                <el-menu-item index="/manager/manageLabel"><span>标签管理</span></el-menu-item>
                <el-menu-item index="/manager/trackRecord"><span>留痕日志</span></el-menu-item>
                <el-menu-item index="/manager/caseStatic"><span>案件统计</span></el-menu-item>
                <el-menu-item index="/manager/weekSummary"><span>每周总结</span></el-menu-item>
                <el-menu-item index="/manager/suspectBank"><span>嫌疑人库</span></el-menu-item>
            </el-menu>
        </div>
        <div class="right">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {
        mapState,
        mapMutations,
    } from 'vuex'

    export default {
        name: "Menu",
        data() {
            return {
                activeIndex: '/',
                on_off: true,
            }
        },
        methods: {
            exit() {
                //退出
                this.$router.push('/');
            },
        },
        computed: {
            ...mapState({
                token: state => state.token,
                role: state => state.role,
            })
        },
        mounted() {
            if (this.role == 0) {
                this.on_off = true;
            } else {
                this.on_off = false;
            }
        },
    }
</script>

<style scoped>
    .manager {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        position: relative;
    }

    .left {
        box-sizing: border-box;
        background-color: #324057;
        width: 12.5%;
        min-height: 100%;
        left: 0;
        z-index: 2;

        top: 0;
        bottom: 0;
        position: fixed;
        overflow-y: auto;
        overflow-x: hidden;

    }

    .right {
        box-sizing: border-box;
        width: 87.5%;
        height: 100%;
        margin-left: 12.5%;
        padding: 50px;
    }

    span {
        font-size: 16px;
    }

    .el-menu {
        border: 1px solid #324057;
    }
</style>