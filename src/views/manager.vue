<template>
    <div>
        <el-row>
            <el-col :span="3">
                <div class="left">
                    <div>
                        <p style="color: #fff451;font-size: 20px">欢迎你:{{realname}}</p>
                        <p style="color: #ff2217;font-size: 12px;cursor: pointer" @click="exit">退出</p>
                    </div>
                    <div>
                        <el-menu :router="true" class="el-menu-vertical-demo "
                                 background-color="#324057"
                                 text-color="#fff"
                                 active-text-color="#20a0ff"
                                 :default-active="activeIndex"  :unique-opened="true">
                            <el-menu-item v-if="on_off" index="/manager/caseReview"><span>案件审核</span></el-menu-item>
                            <el-menu-item v-if="on_off1" index="/manager/reviewResult"><span>审核结果</span></el-menu-item>
                            <el-menu-item index="/manager/caseRegistration"><span>案件登记</span></el-menu-item>
                            <el-menu-item index="/manager/stayCase"><span>待办案件</span></el-menu-item>
                            <el-menu-item index="/manager/workCase"><span>在办案件</span></el-menu-item>
                            <el-menu-item index="/manager/historyCase"><span>历史案件</span></el-menu-item>
                            <el-menu-item index="/manager/fileCase"><span>归档案件</span></el-menu-item>
                            <!--<el-menu-item index="/index/CaseComplain"><span>申诉和补充</span></el-menu-item>-->
                            <!--<el-menu-item index="/index/DutyRecords"><span>值班记录</span></el-menu-item>-->
                            <el-menu-item v-if="on_off" index="/manager/addAccount"><span>新增账户</span></el-menu-item>
                            <el-menu-item index="/manager/setAccount"><span>账户设置</span></el-menu-item>
                            <el-menu-item v-if="on_off" index="/manager/manageAccount"><span>账户管理</span></el-menu-item>
                            <el-menu-item index="/manager/manageLabel"><span>标签管理</span></el-menu-item>
                        </el-menu>
                    </div>
                </div>
            </el-col>
            <el-col :span="21" style="padding: 50px;width: 87.5%;height: 1010px; overflow-y: auto">
                <router-view></router-view>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Menu",
        data(){
            return{
                activeIndex: '/',
                realname:'',
                on_off:true,
                on_off1:true,
            }
        },
        methods:{
            exit(){
                this.$router.push('/');
            }
        },
        mounted(){
            // console.log(JSON.parse(sessionStorage.userData));
            // this.realname = this.user.data.realname;
            // if(JSON.parse(sessionStorage.userData).data.level===3){
            //     this.on_off = true;
            //     this.on_off1 = false;
            // }else {
            //     this.on_off = false;
            //     this.on_off1 = true;
            // }
        },
        computed: {
            user(){
                return JSON.parse(sessionStorage.userData)
            }
        },
    }
</script>

<style scoped>
    .left{
        box-sizing: border-box;
        background-color: #324057;
        width: 100%;
        height: 1010px;
        overflow: hidden;
    }
    span{
        font-size: 16px;
    }
    .el-menu{
        border:1px solid #324057;
    }
</style>