<template>
    <div class="manager">
        <div class="left">
            <div style="color: #fff451;font-size: 20px;margin-top:10px;">欢迎你:{{realname}}</div>
            <div style="color: #ff2217;font-size: 12px;cursor: pointer;margin-top:10px;" @click="exit">退出</div>
            <el-menu :router="true" class="el-menu-vertical-demo " background-color="#324057" text-color="#fff"
                     active-text-color="#20a0ff"
                     :default-active="activeIndex" :unique-opened="true">
                <el-menu-item v-if="on_off" index="/manager/caseReview" id="leftClick"><span>案件审核</span></el-menu-item>
                <el-menu-item index="/manager/caseRegistration"><span>案件登记</span></el-menu-item>
                <el-menu-item index="/manager/stayCase"><span>待办案件</span></el-menu-item>
                <el-menu-item index="/manager/workCase"><span>在办案件</span></el-menu-item>
                <el-menu-item index="/manager/historyCase"><span>历史案件</span></el-menu-item>
                <el-menu-item index="/manager/fileCase"><span>归档案件</span></el-menu-item>
                <el-menu-item index="/manager/monitorCenter"><span>监控中心</span></el-menu-item>
                <el-menu-item v-if="on_off" index="/manager/manageAccount"><span>账户管理</span></el-menu-item>
                <el-menu-item v-if="on_off" index="/manager/addAccount"><span>新增账户</span></el-menu-item>
                <el-menu-item v-if="on_off" index="/manager/changePass"><span>修改密码</span></el-menu-item>
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
                realname: '',
                on_off: true,
                on_off1: true,
            }
        },
        methods: {
            exit() {
                //退出
                this.$router.push('/');
            },
            getCases() {
                //获取所有案件
                let instance = axios.create({
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        "Authorization": "JWT " + this.token,
                    }
                });
                instance.get("http://120.79.137.221:801/api/v1/cases/")
                    .then((res) => {
                        console.log(res.data);
                        this['setAllCases'](res.data);
                        let caseReview_noSee = [],
                            caseReview_yes = [],
                            caseReview_no = [],
                            stayCase = [],
                            workCase = [],
                            historyCase = [],
                            fileCase = [];
                        let length = res.data.length;
                        for (let i = 0; i < length; i++) {
                            if (res.data[i].check_status === 0) {
                                caseReview_noSee.push(res.data[i])
                            } else if (res.data[i].check_status === 1) {
                                caseReview_yes.push(res.data[i])
                            } else if (res.data[i].check_status === 2) {
                                caseReview_no.push(res.data[i])
                            }
                        }
                        for (let i = 0; i < length; i++) {
                            if (res.data[i].deal_status === 0) {
                                stayCase.push(res.data[i])
                            } else if (res.data[i].deal_status === 1) {
                                workCase.push(res.data[i])
                            } else if (res.data[i].deal_status === 2) {
                                historyCase.push(res.data[i])
                            } else if (res.data[i].deal_status === 3) {
                                fileCase.push(res.data[i])
                            }
                        }
                        this['setCaseReview_noSee'](caseReview_noSee);
                        this['setCaseReview_yes'](caseReview_yes);
                        this['setCaseReview_no'](caseReview_no);
                        this['setStayCase'](stayCase);
                        this['setWorkCase'](workCase);
                        this['setHistoryCase'](historyCase);
                        this['setFileCase'](fileCase);
                    })
                    .catch((err) => {
                        this.fail('获取案件失败！');
                    });

            },
            success(str) {
                this.$message({
                    message: str,
                    type: 'success'
                })
            },
            fail(str) {
                this.$message({
                    message: str,
                    type: 'error'
                })
            },
            ...mapMutations(['setAllCases', 'setCaseReview_noSee', 'setCaseReview_yes', 'setCaseReview_no', 'setStayCase', 'setWorkCase', 'setHistoryCase', 'setFileCase']),
        },
        computed: {
            ...mapState({
                token: state => state.token,
            })
        },
        mounted() {
            this.getCases();
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
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 2;
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