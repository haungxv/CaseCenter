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
        </el-dialog>
        <div style="text-align: left">
            时间:
            <el-date-picker v-model="time" type="date" placeholder="请选择日期" @change="getTime"></el-date-picker>
            <el-button type="success" style="margin: 0 20px" @click="search">搜索</el-button>
        </div>
        <div style="margin-top: 50px">
            <el-table :data="stayCaseData" border>
                <el-table-column label="案件编号" align="center" prop="case_id" width="100"></el-table-column>
                <el-table-column label="报案人姓名" align="center" prop="reporter.name" width="150"></el-table-column>
                <el-table-column label="性别" align="center" prop="reporter.gender"></el-table-column>
                <el-table-column label="年龄" align="center" prop="reporter.age"></el-table-column>
                <el-table-column label="联系方式" align="center" prop="reporter.phone" width="150"></el-table-column>
                <el-table-column label="报案时间" align="center" prop="occur_time" width="200"></el-table-column>
                <el-table-column label="案件类型" align="center" prop="case_type" width="250"></el-table-column>
                <el-table-column label="上报单位" align="center" prop="work_place" width="150"></el-table-column>
                <el-table-column label="上报人员" align="center" prop="registrant.name" width="150"></el-table-column>
                <el-table-column label="状态" align="center" prop="check_status" width="150"></el-table-column>
                <el-table-column label="操作" align="center" fixed="right" width="150">
                    <template slot-scope="scope">
                        <el-button @click="showDetail(scope.row)" type="text" size="small">查看详情</el-button>
                        <el-button @click="dealCase(scope.row)" type="text" size="small">开始处理</el-button>
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
                stayCaseData: [],//待办案件列表
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

                time: ''//搜索时的时间
            }
        },
        methods: {
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
            search() {
                console.log(this.time);
                if (this.time !== '' && this.time !== null) {
                    this.time = this.changeTime(this.time);
                    let array = [];
                    let length = this.stayCaseData.length;
                    for (let i = 0; i < length; i++) {
                        let str = this.stayCaseData[i].occur_time.substring(0, 10);
                        if (str === this.time) {
                            array.push(this.stayCaseData[i]);
                        }
                    }
                    this.stayCaseData = array;
                } else {
                    this.$message('请输入要搜索的时间！');
                }
            },
            getTime(val) {
                this.time = val;
                if (this.time === null || this.time === '') {
                    this.stayCaseData = this.stayCase;
                }
            },
            dealCase(row) {
                //处理案件，将案件状态变为在办案件
                let qs = require('qs');
                let instance = axios.create({
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                });
                let data = qs.stringify({
                    deal_status: 1
                });
                instance.post("http://120.79.137.221:801/api/v1/cases/" + row.id + "/deal/", data)
                    .then((res) => {
                        this.closeDetail();
                        this.$message({
                            message: "该案件状态更新为在办案件!",
                            type: 'success'
                        })
                    })
                    .catch((err) => {
                        this.closeDetail();
                        this.$message({
                            message: "案件状态更新失败!",
                            type: 'error'
                        })
                    });
            }

        },
        mounted() {
            this.stayCaseData = this.stayCase;
        },
        watch: {
            stayCaseData: function () {
                let length = this.stayCaseData.length;
                for (let i = 0; i < length; i++) {
                    this.stayCaseData[i].reporter.gender = this.stayCaseData[i].reporter.gender ? '男' : '女';
                    if (this.stayCaseData[i].check_status === 0) {
                        this.stayCaseData[i].check_status = '未审核';
                    } else if (this.stayCaseData[i].check_status === 1) {
                        this.stayCaseData[i].check_status = '审核通过';
                    } else if (this.stayCaseData[i].check_status === 2) {
                        this.stayCaseData[i].check_status = '审核未通过';
                    }
                }
            }
        },
        computed: {
            ...mapState({
                stayCase: state => state.stayCase,
            })
        }
    }
</script>
<style scoped>
    .el-form-item {
        color: red;
    }
</style>

