<template>
    <div>
        <!--编辑弹出框-->
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
            时间：
            <el-date-picker v-model="time" type="date" placeholder="请选择日期"></el-date-picker>&nbsp;&nbsp;&nbsp;&nbsp;
            报案人姓名：
            <el-input v-model="name" placeholder="请输入查询的报案人姓名" class="searchName"></el-input>
            <el-button type="success" style="margin: 0 20px" @click="search">搜索</el-button>
        </div>

        <div style="margin-top: 50px">
            <el-table :data="historyCaseData" border>
                <el-table-column label="案件编号" align="center" prop="case_id" width="90"></el-table-column>
                <el-table-column label="报案人姓名" align="center" prop="reporter.name" width="150"></el-table-column>
                <el-table-column label="性别" align="center" prop="reporter.gender"></el-table-column>
                <el-table-column label="年龄" align="center" prop="reporter.age"></el-table-column>
                <el-table-column label="联系方式" align="center" prop="reporter.phone" width="150"></el-table-column>
                <el-table-column label="报案时间" align="center" prop="occur_time" width="180"></el-table-column>
                <el-table-column label="案件类型" align="center" prop="case_type" width="220"></el-table-column>
                <el-table-column label="操作" align="center" fixed="right" width="150">
                    <template slot-scope="scope">
                        <el-button @click="showDetail(scope.row)" type="text" size="small">查看详情</el-button>
                        <el-button @click="dealCase(scope.row)" type="text" size="small">案件归档</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
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
        components: {caseDialog},
        data() {
            return {
                dialogVisible: false,//判断弹出框是否展示
                allData: [],//历史案件列表备份
                historyCaseData: [],//历史案件列表
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

                time: '',//搜索时候的时间
                name: '',//搜索的时候的名字
            }
        },
        methods: {
            getCases() {
                //获取所有案件
                let instance = axios.create({
                    headers: {
                        "Authorization": "JWT " + this.token,
                    }
                });
                instance.get("http://120.79.137.221:801/api/v1/cases/")
                    .then((res) => {
                        let historyCase = [];
                        let length = res.data.length;
                        for (let i = 0; i < length; i++) {
                            if (res.data[i].deal_status === 2) {
                                historyCase.push(res.data[i])
                            }
                        }
                        this.historyCaseData = historyCase;
                        this.allData = historyCase;

                    })
                    .catch((err) => {
                        this.fail('获取历史案件列表失败！');
                    });

            },

            showDetail(row) {
                //查看案件详情,判断各个模块是否展示
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
                this.caseDetail = {};
                this.caseDetailReporter = {};
                this.caseDetailSuffer = {};
                this.caseDetailSuspect = {};
                this.caseDetailWitness = {};
                this.caseDetailProperty = {};
                this.show_suffer = true;
                this.show_suspect = true;
                this.show_witness = true;
                this.show_property = true;
                this.dialogVisible = false;
            },

            dealCase(row) {
                //处理案件，将案件状态变为归档案件
                let qs = require('qs');
                let instance = axios.create({
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                });
                let data = qs.stringify({
                    deal_status: 3,
                });
                instance.post("http://120.79.137.221:801/api/v1/cases/" + row.id + "/deal/", data)
                    .then((res) => {
                        this.getCases();
                        this.$message({
                            message: "该案件状态更新为归档案件!",
                            type: 'success'
                        })
                    })
                    .catch((err) => {
                        this.$message({
                            message: "案件状态更新失败!",
                            type: 'error'
                        })
                    });
            },

            changeTime(time) {
                //将中国标准时间转换为年-月-日格式
                let year = time.getFullYear();
                let month = time.getMonth() + 1;
                let day = time.getDate();
                return year + "-" + this.formTime(month) + "-" + this.formTime(day);
            },
            formTime(str) {
                //规范分钟和秒的格式
                return str > 9 ? (str) : ("0" + str);
            },

            searchTime() {
                //根据时间搜索
                this.time = this.changeTime(this.time);
                let array = [];
                let length = this.historyCaseData.length;
                for (let i = 0; i < length; i++) {
                    let str = this.historyCaseData[i].occur_time.substring(0, 10);
                    if (str === this.time) {
                        array.push(this.historyCaseData[i]);
                    }
                }
                this.historyCaseData = array;
            },
            searchName() {
                //根据姓名搜索
                let array = [];
                let length = this.historyCaseData.length;
                for (let i = 0; i < length; i++) {
                    if (this.historyCaseData[i].reporter.name === this.name) {
                        array.push(this.historyCaseData[i]);
                    }
                }
                this.historyCaseData = array;
            },
            search() {
                //判断是根据时间搜索，或者根据姓名搜索，或者都搜索
                this.historyCaseData = this.allData;
                if ((this.time === '' || this.time === null) && this.name === '') {
                    this.$message('请输入要搜索的时间或者报案人姓名！');
                } else {
                    if (this.time !== '' && this.name === '') {
                        this.searchTime();
                    } else if ((this.time === '' || this.time === null) && this.name !== '') {
                        this.searchName();
                    } else if (this.time !== '' && this.name !== '') {
                        this.searchTime();
                        this.searchName();
                    }
                }
            },
            handleTime(str) {
                //处理时间格式
                let a = str.substring(0, 19);
                return a.replace("T", ' ');
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
        },
        mounted() {
            axios.defaults.headers.common['Authorization'] = "JWT " + this.token;
            this.getCases();
        },
        computed: {
            ...mapState({
                token: state => state.token,
                historyCase: state => state.historyCase,
            })
        },
        watch: {
            historyCaseData: function () {
                let length = this.historyCaseData.length;
                for (let i = 0; i < length; i++) {
                    this.historyCaseData[i].reporter.gender = this.historyCaseData[i].reporter.gender === true ? '男' : '女';
                    this.historyCaseData[i].occur_time = this.handleTime(this.historyCaseData[i].occur_time);
                    if (this.historyCaseData[i].check_status === 0) {
                        this.historyCaseData[i].check_status = '未审核';
                    } else if (this.historyCaseData[i].check_status === 1) {
                        this.historyCaseData[i].check_status = '审核通过';
                    } else if (this.historyCaseData[i].check_status === 2) {
                        this.historyCaseData[i].check_status = '审核未通过';
                    }
                    //处理学历表示问题
                    this.handleEducation(this.historyCaseData[i].reporter);
                    if(this.historyCaseData[i].sufferer){
                        this.handleEducation(this.historyCaseData[i].sufferer);
                    }
                    if(this.historyCaseData[i].suspect){
                        this.handleEducation(this.historyCaseData[i].suspect);
                    }
                    if(this.historyCaseData[i].witness){
                        this.handleEducation(this.historyCaseData[i].witness);
                    }
                    //处理证件类型问题
                    this.handleIdentityDocument(this.historyCaseData[i].reporter);
                    if(this.historyCaseData[i].sufferer){
                        this.handleIdentityDocument(this.historyCaseData[i].sufferer);
                    }
                    if(this.historyCaseData[i].suspect){
                        this.handleIdentityDocument(this.historyCaseData[i].suspect);
                    }
                    if(this.historyCaseData[i].witness){
                        this.handleIdentityDocument(this.historyCaseData[i].witness);
                    }
                }

            },
            time: function () {
                if ((this.time === '' || this.time === null) && this.name === '') {
                    this.historyCaseData = this.allData;
                }
            },
            name: function () {
                if ((this.time === '' || this.time === null) && this.name === '') {
                    this.historyCaseData = this.allData;
                }
            },
        }
    }
</script>
<style scoped>
    .el-form-item {
        color: red;
    }

    .searchName {
        width: 250px;
    }
</style>

