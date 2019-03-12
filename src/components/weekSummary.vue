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
                    <el-form-item label="审核结果:" style="width: 50%">{{caseDetail.check_status}}</el-form-item>
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
        <div style="margin-top:10px;text-align: left">
            年份：
            <el-select v-model="year" placeholder="请选择年份" style="margin-right:20px;">
                <el-option
                        v-for="item in years"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                </el-option>
            </el-select>
            周数：
            <el-select v-model="week" placeholder="请选择周数" style="margin-right:20px;">
                <el-option
                        v-for="item in 53"
                        :key="item"
                        :label="item"
                        :value="item">
                </el-option>
            </el-select>
        </div>
        <div style="text-align: left;margin-top:30px;">日期：{{weekCase.monday}}—{{weekCase.sunday}}</div>
        <div style="margin-top: 50px">
            <el-table :data="weekCase.cases" border>
                <el-table-column label="案件编号" align="center" prop="case_id"></el-table-column>
                <el-table-column label="报案人姓名" align="center" prop="reporter.name"></el-table-column>
                <el-table-column label="年龄" align="center" prop="reporter.age"></el-table-column>
                <el-table-column label="联系方式" align="center" prop="reporter.phone"></el-table-column>
                <el-table-column label="报案时间" align="center" prop="occur_time" width="200"></el-table-column>
                <el-table-column label="案件类型" align="center" prop="case_type"></el-table-column>
                <el-table-column label="操作" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button @click="showDetail(scope.row)" type="text" size="small">查看详情</el-button>
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
        name: "weekSummary",
        components: {caseDialog},
        data() {
            return {
                weeklyLists: [],
                weekCase: {},
                years: [
                    {
                        name: '2011',
                        id: 1,
                    },
                    {
                        name: '2012',
                        id: 2,
                    },
                    {
                        name: '2013',
                        id: 3,
                    },
                    {
                        name: '2014',
                        id: 4,
                    },
                    {
                        name: '2015',
                        id: 5,
                    },
                    {
                        name: '2016',
                        id: 6,
                    },
                    {
                        name: '2017',
                        id: 7,
                    },
                    {
                        name: '2018',
                        id: 8,
                    },
                    {
                        name: '2019',
                        id: 9,
                    },

                ],

                year: '',
                week: null,

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
            }
        },
        methods: {
            getWeeks() {
                this.$post("/api/v1/cases/" + this.year + "/weekly/")
                    .then((res) => {
                        this.weeklyLists = res.data;
                        this.week = this.weeklyLists.length;
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
            handleTime(str) {
                //处理时间格式
                if(str){
                    let a = str.substring(0, 19);
                    return a.replace("T", ' ');
                }
            },
            handleEducation(object) {
                switch (object.education) {
                    case 0:
                        object.education = "小学";
                        break;
                    case 1:
                        object.education = "初中";
                        break;
                    case 2:
                        object.education = "高中";
                        break;
                    case 3:
                        object.education = "专科";
                        break;
                    case 4:
                        object.education = "本科";
                        break;
                    case 5:
                        object.education = "硕士";
                        break;
                    case 6:
                        object.education = "博士";
                        break;
                    default :
                        break;
                }
            },
            handleIdentityDocument(object) {
                switch (object.identity_document) {
                    case 0:
                        object.identity_document = "护照";
                        break;
                    case 1:
                        object.identity_document = "学生证";
                        break;
                    case 2:
                        object.identity_document = "身份证";
                        break;
                    default :
                        break;
                }
            }
        },
        computed: {
            ...mapState({
                token: state => state.token,
            })
        },
        mounted() {
            axios.defaults.headers.common['Authorization'] = "JWT " + this.token;
            this.year = '2019';
        },
        watch: {
            year: function () {
                this.weeklyLists = [];
                this.getWeeks();
            },
            week: function () {
                this.weekCase = {};
                this.weekCase = this.weeklyLists[this.week - 1];
                let length = this.weekCase.cases.length;
                for (let i = 0; i < length; i++) {
                    this.weekCase.cases[i].occur_time = this.handleTime(this.weekCase.cases[i].occur_time);
                }
            },
            weekCase: function () {
                let length = this.weekCase.cases.length;
                for (let i = 0; i < length; i++) {
                    //处理是待审核，审核通过，还是审核未通过
                    if (this.weekCase.cases[i].check_status === 0) {
                        this.weekCase.cases[i].check_status = '待审核'
                    } else if (this.weekCase.cases[i].check_status === 1) {
                        this.weekCase.cases[i].check_status = '审核通过'
                    } else if (this.weekCase.cases[i].check_status === 2) {
                        this.weekCase.cases[i].check_status = '审核未通过'
                    }
                    //处理时间格式
                    this.weekCase.cases[i].occur_time = this.handleTime(this.weekCase.cases[i].occur_time);
                    //处理学历表示问题
                    this.handleEducation(this.weekCase.cases[i].reporter);
                    if (this.weekCase.cases[i].sufferer) {
                        this.handleEducation(this.weekCase.cases[i].sufferer);
                    }
                    if (this.weekCase.cases[i].suspect) {
                        this.handleEducation(this.weekCase.cases[i].suspect);
                    }
                    if (this.weekCase.cases[i].witness) {
                        this.handleEducation(this.weekCase.cases[i].witness);
                    }
                    //处理证件类型问题
                    this.handleIdentityDocument(this.weekCase.cases[i].reporter);
                    if (this.weekCase.cases[i].sufferer) {
                        this.handleIdentityDocument(this.weekCase.cases[i].sufferer);
                    }
                    if (this.weekCase.cases[i].suspect) {
                        this.handleIdentityDocument(this.weekCase.cases[i].suspect);
                    }
                    if (this.weekCase.cases[i].witness) {
                        this.handleIdentityDocument(this.weekCase.cases[i].witness);
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .el-form-item {
        color: red;
    }
</style>