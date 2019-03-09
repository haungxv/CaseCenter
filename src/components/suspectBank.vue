<template>
    <div>
        <!--案件详情弹出框-->
        <el-dialog title="案件详情" width="90%" :visible.sync="dialogVisible" :before-close="closeDetail">
            <case-dialog :caseDetail="caseDetail"
                         :caseDetailReporter="caseDetailReporter"
                         :caseDetailSuffer="caseDetailSuffer"
                         :caseDetailSuspect="caseDetailSuspect"
                         :caseDetailWitness="caseDetailWitness"
                         :caseDetailProperty="caseDetailProperty"
                         :show_suffer="show_suffer"
                         :show_suspect="show_suspect"
                         :show_witness="show_witness"
                         :show_property="show_property"
            ></case-dialog>
            <div style="text-align: left">
                审核结果
                <hr>
                <el-form :inline="true">
                    <el-form-item label="审核结果:" style="width: 20%">{{caseDetail.check_status}}</el-form-item>
                    <el-form-item label="原因:" style="width: 100%">{{caseDetail.pass_reason}}</el-form-item>
                </el-form>
            </div>
            <div style="text-align: left">
                处理结果
                <hr>
                <el-form :inline="true">
                    <el-form-item label="处理结果:" style="width: 100%">{{caseDetail.deal_result}}</el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <div style="text-align: left">
            嫌疑人姓名:
            <el-input v-model="name" style="width: 20%"></el-input>
            <el-button type="success" @click="searchName">查询</el-button>
        </div>
        <el-table :data="suspectLists" style="margin-top: 50px" border>
            <el-table-column label="嫌疑人姓名" align="center" prop="suspect.name" width="150"></el-table-column>
            <el-table-column label="性别" align="center" prop="suspect.gender"></el-table-column>
            <el-table-column label="年龄" align="center" prop="suspect.age"></el-table-column>
            <el-table-column label="联系方式" align="center" prop="suspect.phone" width="130"></el-table-column>
            <el-table-column label="住址" align="center" prop="suspect.home_addr" width="200"></el-table-column>
            <el-table-column label="证件类型" align="center" prop="suspect.identity_document" width="110"></el-table-column>
            <el-table-column label="证件号" align="center" prop="suspect.identity_number" width="130"></el-table-column>
            <el-table-column label="工作地点" align="center" prop="suspect.work_place"></el-table-column>
            <el-table-column label="民族" align="center" prop="suspect.nation"></el-table-column>
            <el-table-column label="操作" align="center" fixed="right" width="150">
                <template slot-scope="scope">
                    <el-button @click="showDetail(scope.row)" type="text" size="small">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import caseDialog from './multi/caseDialog.vue'
    import axios from 'axios';
    import {
        mapState,
        mapMutations,
    } from 'vuex'

    export default {
        name: "suspectBank",
        components: {caseDialog},
        data() {
            return {
                suspectLists: [],//嫌疑人列表

                dialogVisible: false,//判断弹出框是否展示
                caseDetail: {},//弹出详情弹窗中的内容
                caseDetailReporter: {},//弹出详情弹窗中的内容--报案人信息
                caseDetailSuffer: {},//弹出详情弹窗中的内容--受害人信息
                caseDetailSuspect: {},//弹出详情弹窗中的内容--嫌疑人信息
                caseDetailWitness: {},//弹出详情弹窗中的内容--案件证人信息
                caseDetailProperty: {},//弹出详情弹窗中的内容--财产损失信息

                show_suffer: true,//是否展示受害人信息
                show_suspect: true,//是否展示嫌疑人信息
                show_witness: true,//是否展示案件证人信息
                show_property: true,//是否展示财产损失情况

                name: ''//搜索的姓名
            }
        },
        methods: {
            getSuspect() {
                //获取所有账户列表
                let instance = axios.create({
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                });
                instance.get("http://120.79.137.221:801/api/v1/cases/suspect/")
                    .then((res) => {
                        this.suspectLists = res.data;
                        this['setSuspect'](res.data);
                    })
                    .catch((err) => {

                    });
            },
            showDetail(row) {
                //查看案件详情,判断各个模块是否展示
                this.caseDetail = {};
                this.caseDetailReporter = {};
                this.caseDetailSuffer = {};
                this.caseDetailSuspect = {};
                this.caseDetailWitness = {};
                this.caseDetailProperty = {};

                this.dialogVisible = true;
                this.caseDetail = row;

                //报案人模块
                this.caseDetailReporter = row.reporter;

                //判断受害人模块是否展示
                if (!row.sufferer) {
                    this.show_suffer = false;
                } else {
                    this.caseDetailSuffer = row.sufferer;
                    this.show_suffer = true;
                }

                //判断嫌疑人模块是否展示
                if (!row.suspect) {
                    this.show_suspect = false;
                } else {
                    this.caseDetailSuspect = row.suspect;
                    this.show_suspect = true;
                }

                //判断案件证人模块是否展示
                if (!row.witness) {
                    this.show_witness = false;
                } else {
                    this.caseDetailWitness = row.witness;
                    this.show_witness = true;
                }

                //判断财产损失模块是否展示
                if (!row.property_loss) {
                    this.show_property = false;
                } else {
                    this.caseDetailProperty = row.property_loss;
                    this.show_property = true;
                }
            },
            closeDetail() {
                //关闭弹框前清空所有数据
                this.dialogVisible = false;
            },
            searchName() {
                //根据姓名搜索
                this.suspectLists=this.suspectList;
                if (this.name === '') {
                    this.$message('请输入要搜索的嫌疑人姓名！');
                } else {
                    let array = [];
                    let length = this.suspectLists.length;
                    for (let i = 0; i < length; i++) {
                        if (this.suspectLists[i].suspect.name === this.name) {
                            array.push(this.suspectLists[i]);
                        }
                    }
                    this.suspectLists = array;
                }
            },
            handleTime(str) {
                //处理时间格式
                if(str){
                    let a = str.substring(0, 19);
                    return a.replace("T", ' ');
                }
            },
            handleEducation(object) {
                switch (object.education) {
                    case 1:
                        object.education = "小学";
                        break;
                    case 2:
                        object.education = "初中";
                        break;
                    case 3:
                        object.education = "高中";
                        break;
                    case 4:
                        object.education = "专科";
                        break;
                    case 5:
                        object.education = "本科";
                        break;
                    case 6:
                        object.education = "硕士";
                        break;
                    case 7:
                        object.education = "博士";
                        break;
                    default :
                        break;
                }
            },
            handleIdentityDocument(object) {
                switch (object.identity_document) {
                    case 1:
                        object.identity_document = "护照";
                        break;
                    case 2:
                        object.identity_document = "学生证";
                        break;
                    case 3:
                        object.identity_document = "身份证";
                        break;
                    default :
                        break;
                }
            },
            ...mapMutations(['setSuspect']),
        },
        computed: {
            ...mapState({
                token: state => state.token,
                suspectList: state => state.suspectList,
            })
        },
        mounted() {
            axios.defaults.headers.common['Authorization'] = "JWT " + this.token;
            this.getSuspect();
        },
        watch: {
            suspectLists: function () {
                let length = this.suspectLists.length;
                for (let i = 0; i < length; i++) {
                    this.suspectLists[i].gender = this.suspectLists[i].gender ? '男' : '女';
                    //处理是待审核，审核通过，还是审核未通过
                    if (this.suspectLists[i].check_status === 0) {
                        this.suspectLists[i].check_status = '待审核'
                    } else if (this.suspectLists[i].check_status === 1) {
                        this.suspectLists[i].check_status = '审核通过'
                    } else if (this.suspectLists[i].check_status === 2) {
                        this.suspectLists[i].check_status = '审核未通过'
                    }
                    //处理时间格式
                    this.suspectLists[i].occur_time = this.handleTime(this.suspectLists[i].occur_time);
                    //处理学历表示问题
                    this.handleEducation(this.suspectLists[i].reporter);
                    if(this.suspectLists[i].sufferer){
                        this.handleEducation(this.suspectLists[i].sufferer);
                    }
                    if(this.suspectLists[i].suspect){
                        this.handleEducation(this.suspectLists[i].suspect);
                    }
                    if(this.suspectLists[i].witness){
                        this.handleEducation(this.suspectLists[i].witness);
                    }
                    //处理证件类型问题
                    this.handleIdentityDocument(this.suspectLists[i].reporter);
                    if(this.suspectLists[i].sufferer){
                        this.handleIdentityDocument(this.suspectLists[i].sufferer);
                    }
                    if(this.suspectLists[i].suspect){
                        this.handleIdentityDocument(this.suspectLists[i].suspect);
                    }
                    if(this.suspectLists[i].witness){
                        this.handleIdentityDocument(this.suspectLists[i].witness);
                    }
                }
            },
            name:function(){
                if (this.name === '') {
                    this.suspectLists=this.suspectList;
                }
            },
        }
    }
</script>

<style scoped>
    .el-form-item {
        color: red;
    }
</style>