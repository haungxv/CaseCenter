<template>
    <div>
        <div>
            <!--编辑弹出框-->
            <el-dialog
                    title="案件详情"
                    size="large"
                    :visible.sync="dialogVisible">
                <div>
                    <div>
                        <el-table :data="table" border>
                            <el-table-column label="案件编号" align="center" prop="caseid" width="150"></el-table-column>
                            <el-table-column label="姓名" align="center" prop="callpeople"></el-table-column>
                            <el-table-column label="性别" align="center" prop="sex"></el-table-column>
                            <el-table-column label="年龄" align="center" prop="age"></el-table-column>
                            <el-table-column label="电话" align="center" prop="phone" width="150"></el-table-column>
                            <el-table-column label="身份证" align="center" prop="idcard" width="200"></el-table-column>
                            <el-table-column label="学院" align="center" prop="address" width="150"></el-table-column>
                            <el-table-column label="年级" align="center" prop="updatetime" width="150"></el-table-column>
                            <el-table-column label="邮箱" align="center" prop="email" width="200"></el-table-column>
                            <el-table-column label="案发地点" align="center" prop="caseaddress"
                                             width="150"></el-table-column>
                            <el-table-column label="案发时间" align="center" prop="peroid" width="320"></el-table-column>
                            <el-table-column label="报警类型" align="center" prop="type" width="150"></el-table-column>
                            <el-table-column label="是否查看监控" align="center" prop="referto"></el-table-column>
                            <el-table-column label="情况是否紧急" align="center" prop="emergency"></el-table-column>
                            <el-table-column label="事件详情" align="center" prop="details" width="400"></el-table-column>
                        </el-table>
                    </div>
                    <div v-if="update" style="margin-top: 20px">
                        <el-form :model="form">
                            <el-form-item label="审核结果">
                                <el-radio class="radio" v-model="form.audit" label="1">通过</el-radio>
                                <el-radio class="radio" v-model="form.audit" label="2">不通过</el-radio>
                            </el-form-item>
                            <el-form-item label="原因">
                                <el-input style="width: 80%" v-model="form.result"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
    <el-button v-if="update" @click="dialogVisible = false">取 消</el-button>
    <el-button v-if="update" type="primary" @click="audit">确 定</el-button>
  </span>
            </el-dialog>
        </div>
        <div style="text-align: left">
            <el-button type="warning" @click="unreviewed(0)">待审核案件</el-button>
            <el-button type="success" @click="unreviewed(1)">审核通过案件</el-button>
            <el-button type="danger" @click="unreviewed(2)">审核未通过案件</el-button>
        </div>
        <div style="margin-top: 50px">
            <el-table :data="tableData" border>
                <el-table-column label="案件编号" align="center" prop="caseid"></el-table-column>
                <el-table-column label="提交时间" align="center" prop="alarmtime"></el-table-column>
                <el-table-column label="登记人" align="center" prop="spare1"></el-table-column>
                <el-table-column label="状态" align="center" prop="audit"></el-table-column>
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

    export default {

        data() {
            return {
                dialogVisible: false,
                state: '0',
                update: false,
                currentPage: 1,
                pageCount: 0,
                tableData: [],
                table: [],
                form: {
                    id: '',
                    audit: '1',
                    result: ''
                }
            }
        },
        methods: {
            audit() {
                //审核案件
                this.$post('/api/OnDayup', this.form).then(res => {
                    console.log(res);
                    this.dialogVisible = false;
                    this.unreviewed(0);
                    this.form = {};
                })
            },
            unreviewed(id) {
                //查询未审核案件
                this.state = id;
                if (id == 0) {
                    this.update = true;
                } else {
                    this.update = false;
                }
                let instance = axios.create({
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        // 'cookie': 'JSESSIONID=A9A01F8BDB21DAD163456C0DD8C67C41'
                    }
                });
                axios.get(`http://222.197.183.59/bwc_monitor//api/findAduit/${id}/1`)
                    .then((res) => {
                        this.tableData = res.items;
                        this.pageCount = res.totalNum;
                    })
                    .catch((err) => {

                    });

            },
            handleClick(row) {
                console.log(row);
                this.$get(`/api/findOnCaseid?caseid=${row.caseid}`).then(res => {
                    console.log(res);
                    this.form.id = row.id;
                    this.dialogVisible = true;
                    this.table = [];
                    this.table = [Object.assign(res.casePeople, res.onDay)];
                });
//        this.form.id = row.id;
//        this.dialogVisible = true;
//        this.table = [];
//        this.table.push(row);
            },
            handleCurrentChange() {
                //分页
                this.$get(`/api/findAduit/${this.state}/${this.currentPage}`).then(res => {
                    console.log(res);
                    this.tableData = res.items;
                    this.pageCount = res.totalNum;
                })
            }
        },
        mounted: function () {
            this.unreviewed(0);
        },
        watch: {
            tableData: function () {
                for (let i = 0; i < this.tableData.length; i++) {
                    if (this.tableData[i].audit == '0') {
                        this.tableData[i].audit = '待审核'
                    } else if (this.tableData[i].audit == '1') {
                        this.tableData[i].audit = '审核通过'
                    } else {
                        this.tableData[i].audit = '审核未通过'
                    }
                }
            },
            table: function () {
                if (this.table[0].referto == 1) {
                    this.table[0].referto = '是'
                } else {
                    this.table[0].referto = '否'
                }
                if (this.table[0].emergency == 1) {
                    this.table[0].emergency = '是'
                } else {
                    this.table[0].emergency = '否'
                }
                if (this.table[0].sex == 1) {
                    this.table[0].sex = '男'
                } else {
                    this.table[0].sex = '女'
                }
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>

