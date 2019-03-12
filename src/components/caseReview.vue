<template>
    <div>
        <!--案件详细信息-->
        <el-dialog title="案件详情" width="90%" :visible.sync="dialogVisible" :before-close="closeDetail">
            <div id="detail_print">
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
                <div v-if="show_reviewResult" style="margin-top: 20px">
                    <el-form :model="review" :rules="rules" ref="case_review">
                        <el-form-item label="审核结果" prop="yes_no">
                            <el-radio class="radio" v-model="review.yes_no" label="1">通过</el-radio>
                            <el-radio class="radio" v-model="review.yes_no" label="2">不通过</el-radio>
                        </el-form-item>
                        <el-form-item label="原因" prop="reason">
                            <el-input v-model="review.reason"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer" v-if="show_reviewResult">
                   <el-button @click="dialogVisible = false">取 消</el-button>
                   <el-button type="primary" @click="review_case(caseDetail.id,'case_review')">确 定</el-button>
                </span>
                <div style="text-align: left" v-if="!show_reviewResult">
                    审核结果
                    <hr>
                    <el-form :inline="true">
                        <el-form-item label="审核结果:" style="width: 50%">{{caseDetail.check_status}}</el-form-item>
                        <el-form-item label="原因:" style="width: 100%">{{caseDetail.pass_reason}}</el-form-item>
                    </el-form>
                </div>
                <div style="text-align: left" class="print_detail_button">
                    <el-button type="message" @click="print">点击打印</el-button>
                </div>
            </div>
        </el-dialog>
        <div style="text-align: left">
            <el-button type="warning" @click="changeReview(0)" id="topClick">待审核案件</el-button>
            <el-button type="success" @click="changeReview(1)">审核通过案件</el-button>
            <el-button type="danger" @click="changeReview(2)">审核未通过案件</el-button>
        </div>
        <div style="margin-top: 50px">
            <el-table :data="caseReviewData" border>
                <el-table-column label="案件编号" align="center" prop="case_id"></el-table-column>
                <el-table-column label="提交时间" align="center" prop="occur_time"></el-table-column>
                <el-table-column label="报案人" align="center" prop="reporter.name"></el-table-column>
                <el-table-column label="状态" align="center" prop="check_status"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button @click="showDetail(scope.row)" type="text" size="small">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    import caseDialog from './multi/caseDialog.vue'
    import axios from 'axios'
    import {
        mapState,
        mapMutations,
    } from 'vuex'

    export default {
        components: {caseDialog},
        data() {
            return {
                dialogVisible: false,
                caseReviewData: [],//待审核，审核通过，审核未通过的案件列表
                case_noSee: [],//待审核案件
                case_yes: [],//审核通过案件
                case_no: [],//未审核案件
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
                show_reviewResult: true,//是否展示审核结果
                review: {
                    yes_no: null,//审核案件是否通过
                    reason: '',//案件审核是否通过的原因
                },
                rules: {
                    yes_no: [
                        {required: true, message: '请选择审核是否通过',}
                    ],
                    reason: [
                        {required: true, message: '请填写审核是否通过的原因', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            print() {
                if(this.show_reviewResult){
                    document.getElementsByClassName("dialog-footer")[0].style.display = 'none';
                }
                document.getElementsByClassName("print_detail_button")[0].style.display = 'none';
                let newstr = document.getElementById('detail_print').innerHTML;//得到需要打印的元素HTML
                document.body.innerHTML = newstr;
                window.print();
                window.location.reload();
            },
            getCases(num) {
                //获取所有案件
                this.$get("/api/v1/cases/")
                    .then((res) => {
                            let caseReview_noSee = [],
                                caseReview_yes = [],
                                caseReview_no = [];
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
                            this.case_noSee = caseReview_noSee;
                            this.case_yes = caseReview_yes;
                            this.case_no = caseReview_no;
                            if (num === 0) {
                                this.caseReviewData = this.case_noSee;
                            }
                        }
                    )
                    .catch((err) => {
                        this.$message({
                            message: "获取案件列表失败！",
                            type: 'error'
                        })
                    });
            },
            changeReview(id) {
                //通过点击按钮，切换查看待审核，审核通过，审核未通过案件
                if (id === 0) {
                    this.caseReviewData = this.case_noSee;
                    this.show_reviewResult = true;
                } else if (id === 1) {
                    this.caseReviewData = this.case_yes;
                    this.show_reviewResult = false;
                } else if (id === 2) {
                    this.caseReviewData = this.case_no;
                    this.show_reviewResult = false;
                }
            },
            showDetail(row) {
                //查看案件详情,判断各个模块是否展示
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
                this.review.yes_no = null;
                this.review.reason = '';
            },
            review_case(id, formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = this.$qs.stringify({
                            reason: this.review.reason,
                            check_status: this.review.yes_no,
                        });
                        this.$post("/api/v1/cases/" + id + "/check/", data)
                            .then((res) => {
                                this.closeDetail();
                                this.getCases(0);
                                this.review.yes_no = null;
                                this.review.reason = '';
                                this.$message({
                                    message: "审核成功!",
                                    type: 'success'
                                })
                            })
                            .catch((err) => {
                                this.closeDetail();
                                this.$refs[formName].resetFields();
                                this.$message({
                                    message: "审核失败!",
                                    type: 'error'
                                })
                            });
                    }
                })

            },
            closeDetail() {
                //关闭弹框前清空所有数据
                this.dialogVisible = false;
            },
            handleTime(str) {
                //处理时间格式
                if (str) {
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
            },
        },
        mounted() {
            axios.defaults.headers.common['Authorization'] = "JWT " + this.token;
            this.getCases(0);
            this.$nextTick(() => {
                this.changeReview(0);
            })
        },
        watch: {
            caseReviewData: function () {
                let length = this.caseReviewData.length;
                for (let i = 0; i < length; i++) {
                    //处理是待审核，审核通过，还是审核未通过
                    if (this.caseReviewData[i].check_status === 0) {
                        this.caseReviewData[i].check_status = '待审核'
                    } else if (this.caseReviewData[i].check_status === 1) {
                        this.caseReviewData[i].check_status = '审核通过'
                    } else if (this.caseReviewData[i].check_status === 2) {
                        this.caseReviewData[i].check_status = '审核未通过'
                    }
                    //处理时间格式
                    this.caseReviewData[i].occur_time = this.handleTime(this.caseReviewData[i].occur_time);
                    //处理学历表示问题
                    this.handleEducation(this.caseReviewData[i].reporter);
                    if (this.caseReviewData[i].sufferer) {
                        this.handleEducation(this.caseReviewData[i].sufferer);
                    }
                    if (this.caseReviewData[i].suspect) {
                        this.handleEducation(this.caseReviewData[i].suspect);
                    }
                    if (this.caseReviewData[i].witness) {
                        this.handleEducation(this.caseReviewData[i].witness);
                    }
                    //处理证件类型问题
                    this.handleIdentityDocument(this.caseReviewData[i].reporter);
                    if (this.caseReviewData[i].sufferer) {
                        this.handleIdentityDocument(this.caseReviewData[i].sufferer);
                    }
                    if (this.caseReviewData[i].suspect) {
                        this.handleIdentityDocument(this.caseReviewData[i].suspect);
                    }
                    if (this.caseReviewData[i].witness) {
                        this.handleIdentityDocument(this.caseReviewData[i].witness);
                    }
                }
            }
        },
        computed: {
            ...mapState({
                token: state => state.token,
            })
        }
    }
</script>
<style scoped>
    .el-form-item {
        color: red;
    }
</style>

