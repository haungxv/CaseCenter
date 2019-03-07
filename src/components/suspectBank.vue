<template>
    <div style="margin-top: 50px">
        <el-table :data="suspectLists" border>
            <el-table-column label="嫌疑人姓名" align="center" prop="name" width="120"></el-table-column>
            <el-table-column label="性别" align="center" prop="gender" width="70"></el-table-column>
            <el-table-column label="年龄" align="center" prop="age" width="70"></el-table-column>
            <el-table-column label="联系方式" align="center" prop="phone" width="150"></el-table-column>
            <el-table-column label="住址" align="center" prop="home_addr" width="200"></el-table-column>
            <el-table-column label="证件类型" align="center" prop="identity_document" width="110"></el-table-column>
            <el-table-column label="证件号" align="center" prop="identity_number" width="130"></el-table-column>
            <el-table-column label="工作地点" align="center" prop="work_place" width="200"></el-table-column>
            <el-table-column label="学历" align="center" prop="education" width="120"></el-table-column>
            <el-table-column label="民族" align="center" prop="nation" width="100"></el-table-column>
            <el-table-column label="操作" align="center" fixed="right" width="150">
                <template slot-scope="scope">
                    <el-button @click="showDetail(scope.row)" type="text" size="small">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div v-if="showDetail">
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
                            <!--<el-button @click="download(scope.row)" type="text" size="small">下载详情</el-button>-->
                        </template>
                    </el-table-column>
                </el-table>
            </div>
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
        name: "suspectBank",
        data() {
            return {
                suspectLists: [],//嫌疑人列表

                showDetail:false,//是否展示嫌疑人案件详情

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
            }
        },
        methods: {
            getSuspect() {
                //获取所有账户列表
                // if (this.userList.length) {
                //     this.users = this.userList;
                // } else
                //     {
                let instance = axios.create({
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                });
                instance.get("http://120.79.137.221:801/api/v1/persons/")
                    .then((res) => {
                        this.suspectLists = res.data;
                        // this['setUserList'](res.data);
                    })
                    .catch((err) => {
                        // this.fail('获取用户列表失败！');
                    });
                // }
            },
            showDetail(){},
            ...mapMutations(['setUserList']),
        },
        computed: {
            ...mapState({
                token: state => state.token,
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
                    // this.suspectLists[i].occur_time = this.handleTime(this.suspectLists[i].occur_time);
                }
            }
        }
    }
</script>

<style scoped>

</style>