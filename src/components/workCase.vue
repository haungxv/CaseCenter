<template>
    <div>
        <!--案件详情弹出框 -->
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
        </el-dialog>
        <!--处理案件弹出框-->
        <el-dialog title="处理结果" :visible.sync="dialogDispose">
            <el-cascader
                    :options="results"
                    v-model="result"
                    style="width: 400px">
            </el-cascader>
            <span slot="footer" class="dialog-footer">
                 <el-button @click="dialogDispose = false">取 消</el-button>
                 <el-button type="primary" @click="handleDealCase()">确 定</el-button>
            </span>
        </el-dialog>
        <div style="text-align: left">
            时间：
            <el-date-picker v-model="time" type="date" placeholder="请选择日期" @change="getTime"></el-date-picker>
            <el-button type="success" style="margin: 0 20px" @click="searchTime">搜索</el-button>
            <br/>
            <div style="margin-top:40px;">
                审核状态：
                <el-radio class="radio" v-model="status" label="0">未审核</el-radio>
                <el-radio class="radio" v-model="status" label="1">审核通过</el-radio>
                <el-radio class="radio" v-model="status" label="2">审核未通过</el-radio>
                <el-radio class="radio" v-model="status" label="3">全部在办案件</el-radio>
            </div>
        </div>
        <div style="margin-top: 50px">
            <el-table :data="workCaseData" border>
                <el-table-column label="案件编号" align="center" prop="case_id" width="80"></el-table-column>
                <el-table-column label="报案人姓名" align="center" prop="reporter.name" width="100"></el-table-column>
                <el-table-column label="性别" align="center" prop="reporter.gender" width="70"></el-table-column>
                <el-table-column label="年龄" align="center" prop="reporter.age" width="70"></el-table-column>
                <el-table-column label="联系方式" align="center" prop="reporter.phone" width="150"></el-table-column>
                <el-table-column label="报案时间" align="center" prop="occur_time" width="200"></el-table-column>
                <el-table-column label="案件类型" align="center" prop="case_type" width="220"></el-table-column>
                <el-table-column label="上报单位" align="center" prop="work_place" width="100"></el-table-column>
                <el-table-column label="上报人员" align="center" prop="registrant.name" width="130"></el-table-column>
                <el-table-column label="状态" align="center" prop="check_status" width="140"></el-table-column>
                <el-table-column label="操作" align="center" fixed="right" width="150">
                    <template slot-scope="scope">
                        <el-button @click="showDetail(scope.row)" type="text" size="small">查看详情</el-button>
                        <el-button @click="dealCase(scope.row)" type="text" size="small">处理案件</el-button>
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
                allData: [],//在办案件列表备份
                workCaseData: [],//在办案件列表
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

                dialogDispose: false,//判断处理案件的弹出框是否展示
                row: {},//当前正在处理的案件的信息
                result: [],
                results: [
                    {
                        value: '报案',
                        label: '报案',
                        children: [
                            {
                                value: '破案',
                                label: '破案',
                                children: [
                                    {
                                        value: '挡获嫌疑人、未寻回损失财物',
                                        label: '挡获嫌疑人、未寻回损失财物'
                                    },
                                    {
                                        value: '挡获嫌疑人、寻回损失财物',
                                        label: '挡获嫌疑人、寻回损失财物'
                                    },
                                    {
                                        value: '未挡获嫌疑人、寻回损失财物',
                                        label: '未挡获嫌疑人、寻回损失财物'
                                    }
                                ]
                            },
                            {
                                value: '调解和解',
                                label: '调解和解',
                                children: [
                                    {
                                        value: '保卫处调解',
                                        label: '保卫处调解'
                                    }, {
                                        value: '双方和解',
                                        label: '双方和解'
                                    }
                                ]
                            },
                            {
                                value: '未破案',
                                label: '未破案',
                                children: [
                                    {
                                        value: '已查到监控录像',
                                        label: '未查到监控录像'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        value: '报警求助',
                        label: '报警求助',
                        children: [
                            {
                                value: '已前往现场处置',
                                label: '已前往现场处置',
                                children: [
                                    {
                                        value: '应急队员已经现场处置成功',
                                        label: '应急队员已经现场处置成功'
                                    },
                                    {
                                        value: '应急队员已通知相关科室处置',
                                        label: '应急队员已通知相关科室处置'
                                    },
                                    {
                                        value: '应急队员已通知值班干部处置',
                                        label: '应急队员已通知值班干部处置'
                                    }
                                ]
                            },
                            {
                                value: '已联系相关单位',
                                label: '已联系相关单位',
                                children: [
                                    {
                                        value: '联系后勤保障部',
                                        label: '联系后勤保障部'
                                    },
                                    {
                                        value: '联系当事相关学院',
                                        label: '联系当事相关学院'
                                    },
                                    {
                                        value: '联系当事机关单位',
                                        label: '联系当事机关单位'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        value: '其他',
                        label: '其他'
                    }
                ],//定义好的处理案件的结果

                time: '',//搜索时候的时间
                status: '3',//搜索的时候的审核状态
            }
        },
        methods: {
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
                        let workCase = [];
                        let length = res.data.length;
                        for (let i = 0; i < length; i++) {
                            if (res.data[i].deal_status === 1) {
                                workCase.push(res.data[i])
                            }
                        }
                        this.workCaseData = workCase;
                        this.allData = workCase;
                    })
                    .catch((err) => {
                        this.$message({
                            message: "获取在办案件列表失败！",
                            type: 'error'
                        })
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
                this.row = {};
                this.show_suffer = true;
                this.show_suspect = true;
                this.show_witness = true;
                this.show_property = true;
                this.dialogVisible = false;
            },

            dealCase(row) {
                //弹出处理案件的弹出框
                this.dialogDispose = true;
                this.row = row;
            },
            handleDealCase() {
                //发送请求处理案件
                let qs = require('qs');
                let instance = axios.create({
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                });
                let data = qs.stringify({
                    deal_status: 2,
                    deal_result: this.result.join('/'),
                });
                instance.post("http://120.79.137.221:801/api/v1/cases/" + this.row.id + "/deal/", data)
                    .then((res) => {
                        this.dialogDispose = false;
                        this.row = {};
                        this.result = [];
                        this.getCases();
                        this.$message({
                            message: "案件处理成功，案件状态更新为历史案件!",
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
                if (this.time === null || this.time === '') {
                    this.$message('请输入要搜索的时间！');
                } else {
                    this.status = '3';
                    this.workCaseData = this.allData;
                    this.$nextTick(() => {
                        this.time = this.changeTime(this.time);
                        let array = [];
                        let length = this.workCaseData.length;
                        for (let i = 0; i < length; i++) {
                            let str = this.workCaseData[i].occur_time.substring(0, 10);
                            if (str === this.time) {
                                array.push(this.workCaseData[i]);
                            }
                        }
                        this.workCaseData = array;
                    });
                }
            },
            getTime(val) {
                //如果删除搜索时间，将显示全部列表并且进行审核状态查询
                this.time = val;
                if (this.time === null || this.time === '') {
                    this.workCaseData = this.allData;
                    this.searchStatus();
                }
            },

            searchStatus() {
                if (this.status === '0' || this.status === '1' || this.status === '2') {
                    let array = [], str = '';
                    let length = this.workCaseData.length;
                    if (this.status === '0') {
                        str = '未审核';
                    } else if (this.status === '1') {
                        str = '审核通过'
                    } else if (this.status === '2') {
                        str = '审核未通过'
                    }
                    for (let i = 0; i < length; i++) {
                        if (str === this.workCaseData[i].check_status) {
                            array.push(this.workCaseData[i]);
                        }
                    }
                    this.workCaseData = array;
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
            }
        },
        mounted() {
            axios.defaults.headers.common['Authorization'] = "JWT " + this.token;
            this.getCases();
        },
        computed: {
            ...mapState({
                token: state => state.token,
                workCase: state => state.workCase,
            })
        },
        watch: {
            workCaseData: function () {
                console.log(this.workCaseData);
                let length = this.workCaseData.length;
                for (let i = 0; i < length; i++) {
                    this.workCaseData[i].reporter.gender = this.workCaseData[i].reporter.gender === true ? '男' : '女';
                    if (this.workCaseData[i].check_status === 0) {
                        this.workCaseData[i].check_status = '未审核';
                    } else if (this.workCaseData[i].check_status === 1) {
                        this.workCaseData[i].check_status = '审核通过';
                    } else if (this.workCaseData[i].check_status === 2) {
                        this.workCaseData[i].check_status = '审核未通过';
                    }
                    this.workCaseData[i].occur_time = this.handleTime(this.workCaseData[i].occur_time);
                    // 处理学历表示问题
                    this.handleEducation(this.workCaseData[i].reporter);
                    if (this.workCaseData[i].sufferer) {
                        this.handleEducation(this.workCaseData[i].sufferer);
                    }
                    if (this.workCaseData[i].suspect) {
                        this.handleEducation(this.workCaseData[i].suspect);
                    }
                    if (this.workCaseData[i].witness) {
                        this.handleEducation(this.workCaseData[i].witness);
                    }
                    //处理证件类型问题
                    this.handleIdentityDocument(this.workCaseData[i].reporter);
                    if (this.workCaseData[i].sufferer) {
                        this.handleIdentityDocument(this.workCaseData[i].sufferer);
                    }
                    if (this.workCaseData[i].suspect) {
                        this.handleIdentityDocument(this.workCaseData[i].suspect);
                    }
                    if (this.workCaseData[i].witness) {
                        this.handleIdentityDocument(this.workCaseData[i].witness);
                    }
                }
            },
            status: function () {
                this.workCaseData = this.allData;
                this.searchStatus();
                if (this.time === null || this.time === '') {
                    return;
                } else {
                    this.searchTime();
                }
            }
        },
    }
</script>
<style scoped>
    .el-form-item {
        color: red;
    }
</style>

