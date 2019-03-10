<template>
    <div>
        <!--编辑弹出框-->
        <el-dialog
                title="案件详情"
                width="90%"
                :visible.sync="dialogVisible">
            <div style="text-align: left">
                报案类型
                <hr>
                <el-form :inline="true">
                    <el-form-item label="案件编号:" style="width: 20%">{{caseDetail.caseid}}</el-form-item>
                    <el-form-item label="报案类型:" style="width: 20%">{{caseDetail.type}}</el-form-item>
                </el-form>
            </div>
            <div style="text-align: left">
                报案人信息
                <hr>
                <el-form :inline="true">
                    <el-form-item label="姓名:" style="width: 20%">{{caseDetail.callpeople}}</el-form-item>
                    <el-form-item label="性别:" style="width: 20%">{{caseDetail.sex}}</el-form-item>
                    <el-form-item label="年龄:" style="width: 20%">{{caseDetail.age}}</el-form-item>
                    <el-form-item label="电话:" style="width: 20%">{{caseDetail.phone}}</el-form-item>
                    <el-form-item label="年级:" style="width: 20%">{{caseDetail.updatetime}}</el-form-item>
                    <el-form-item label="学院:" style="width: 20%">{{caseDetail.address}}</el-form-item>
                    <el-form-item label="邮箱:" style="width: 20%">{{caseDetail.email}}</el-form-item>
                    <el-form-item label="身份证:" style="width: 20%">{{caseDetail.idcard}}</el-form-item>
                </el-form>
            </div>
            <div style="text-align: left">
                案发情况
                <hr>
                <el-form :inline="true">
                    <el-form-item label="案发时间:" style="width: 20%">{{caseDetail.peroid}}</el-form-item>
                    <el-form-item label="案发地点:" style="width: 20%">{{caseDetail.caseaddress}}</el-form-item>
                    <el-form-item label="事件详情:" style="width: 100%">{{caseDetail.details}}</el-form-item>
                    <el-form-item label="情况是否紧急:" style="width: 20%">{{caseDetail.emergency}}</el-form-item>
                    <el-form-item label="是否查看监控:" style="width: 20%">{{caseDetail.referto}}</el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <div style="text-align: left">
            <el-button type="warning" @click="unreviewed(0)">待审核案件</el-button>
            <el-button type="success" @click="unreviewed(1)">审核通过案件</el-button>
            <el-button type="danger" @click="unreviewed(2)">审核未通过案件</el-button>
        </div>
        <div style="margin-top: 50px">
            <el-table :data="tableData" border>
                <el-table-column label="案件编号" align="center" prop="caseid"></el-table-column>
                <el-table-column label="报案人" align="center" prop="callpeople"></el-table-column>
                <el-table-column label="提交时间" align="center" prop="alarmtime"></el-table-column>
                <el-table-column label="登记人" align="center" prop="spare1"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="text-align: center;margin-top: 20px">
            <el-pagination @current-change="handleCurrentChange"
                           :current-page.sync="currentPage"
                           :page-size="10"
                           layout="prev, pager, next, jumper"
                           :total="pageCount">
            </el-pagination>
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
        data() {
            return {
                dialogVisible: false,
                state: '0',
                currentPage: 1,
                pageCount: 0,
                tableData: [],
                caseDetail: {},
                form: {
                    id: '',
                    audit: '1',
                    result: ''
                }
            }
        },
        methods: {
            unreviewed(id) {
                //待审核案件，审核通过案件，审核未通过案件
                this.state = id;
                let qs = require('qs');
                let instance = axios.create({
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                });
                let data = qs.stringify({
                    type_code: this.state,
                    page_code: this.currentPage,
                });
                instance.post(`/api/v1/cases/get_monitoring/`, data)
                    .then((res) => {
                        this.tableData = res.data.items;
                        this.pageCount = res.data.totalNum;
                    })
                    .catch((err) => {
                        this.$message({
                            message: err,
                            type: 'error'
                        })
                    });

            },
            handleClick(row) {
                this.caseDetail = row;
                this.dialogVisible = true;
            },
            handleCurrentChange() {
                //分页
                let qs = require('qs');
                let instance = axios.create({
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                });
                let data = qs.stringify({
                    type_code: this.state,
                    page_code: this.currentPage,
                });
                instance.post(`/api/v1/cases/get_monitoring/`, data)
                    .then((res) => {
                        this.tableData = res.data.items;
                        this.pageCount = res.data.totalNum;
                    })
                    .catch((err) => {

                    });
            }
        },
        mounted: function () {
            axios.defaults.headers.common['Authorization'] = "JWT " + this.token;
            this.unreviewed(0);
        },
        computed: {
            ...mapState({
                token: state => state.token,
            })
        },
        watch: {
            tableData: function () {
                let length = this.tableData.length;
                for (let i = 0; i < length; i++) {
                    if (this.tableData[i].referto == 1) {
                        this.tableData[i].referto = '是'
                    } else {
                        this.tableData[i].referto = '否'
                    }
                    if (this.tableData[i].emergency == 1) {
                        this.tableData[i].emergency = '是'
                    } else {
                        this.tableData[i].emergency = '否'
                    }
                    if (this.tableData[i].sex == 1) {
                        this.tableData[i].sex = '男'
                    } else {
                        this.tableData[i].sex = '女'
                    }
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

