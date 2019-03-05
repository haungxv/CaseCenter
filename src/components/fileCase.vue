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
        </el-dialog>
        <div style="text-align: left">
            报案人姓名:
            <el-input v-model="name" style="width: 20%"></el-input>
            <el-button type="success" @click="searchName">查询</el-button>
        </div>
        <div style="margin-top: 50px">
            <el-table :data="fileCaseData" border>
                <el-table-column label="案件编号" align="center" prop="case_id"></el-table-column>
                <el-table-column label="归档时间" align="center" prop="occur_time"></el-table-column>
                <el-table-column label="报案人" align="center" prop="reporter.name"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button @click="showDetail(scope.row)" type="text" size="small">查看详情</el-button>
                        <el-button @click="download(scope.row)" type="text" size="small">下载详情</el-button>
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
                fileCaseData: [],//历史案件列表
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

                name: '',//搜索的时候的名字
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
            searchName() {
                //根据姓名搜索
                this.fileCaseData = this.fileCase;
                if (this.name === '') {
                    this.$message('请输入要搜索的报案人姓名！');
                } else {
                    let array = [];
                    let length = this.fileCaseData.length;
                    for (let i = 0; i < length; i++) {
                        if (this.fileCaseData[i].reporter.name === this.name) {
                            array.push(this.fileCaseData[i]);
                        }
                    }
                    this.fileCaseData = array;
                }
            },
            download() {

            },
        },
        mounted() {
            this.fileCaseData = this.fileCase;
        },
        watch: {},
        computed: {
            ...mapState({
                fileCase: state => state.fileCase,
            })
        }
    }
</script>
<style scoped>
    .el-form-item {
        color: red;
    }
</style>

