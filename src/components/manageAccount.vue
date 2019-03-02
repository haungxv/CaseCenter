<template>
    <div>
        <el-dialog
                title="确定删除该账户?"
                :visible.sync="dialogVisible"
                size="tiny">
    <span  class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleteAccount">确 定</el-button>
  </span>
        </el-dialog>
        <div>
            <el-table :data="tableData">
                <el-table-column label="用户名称" align="center" prop="username"></el-table-column>
                <el-table-column label="姓名" align="center" prop="realname"></el-table-column>
                <el-table-column label="电话" align="center" prop="phone"></el-table-column>
                <el-table-column label="邮箱" align="center" prop="email"></el-table-column>
                <el-table-column label="身份证" align="center" prop="cardid"></el-table-column>
                <el-table-column label="权限" align="center" prop="level"></el-table-column>
                <el-table-column
                        fixed="right"
                        align="center"
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
                        <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="text-align: center;margin-top: 20px">
            <el-pagination background @current-change="hand" :current-page.sync="currentPage" :page-size="10" layout="prev, pager, next, jumper" :total="pageCount">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    export default {
        components: {},
        data () {
            return {
                dialogVisible:false,
                tableData:[],
                currentPage:1,
                pageCount:0,
                id:''
            }
        },
        methods: {
            deleteAccount(){
                //删除账号
                this.$get(`/api/deleteUser/${this.id}`).then(res=>{
                    console.log(res);
                    if(res.data.status===1){
                        this.dialogVisible = false;
                        this.id = '';
                        this.load();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    }
                })
            },
            deleteClick(row){
                console.log(row);
                this.id = row.id;
                this.dialogVisible = true;
            },
            hand(){
                //分页
                this.load();
            },
            load(){
                //加载所有账户信息
                this.$get(`/api/adminList/${this.currentPage}`).then(res=>{
                    console.log(res);
                    this.tableData = res.data.items;
                    this.pageCount = res.data.totalNum;
                })
            }
        },
        mounted () {
            this.load();
        },
        watch: {
            tableData:function () {
                for(let i=0;i<this.tableData.length;i++){
                    if(this.tableData[i].level=='0'){
                        this.tableData[i].level = '治安科工作人员'
                    }else if(this.tableData[i].level=='1'){
                        this.tableData[i].level = '治安科助管'
                    }else if(this.tableData[i].level=='3'){
                        this.tableData[i].level = '案件中心管理员'
                    }
                }
            }
        }
    }
</script>
<style scoped>

</style>

