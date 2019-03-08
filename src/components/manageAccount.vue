<template>
    <div>
        <!--删除弹出框-->
        <el-dialog title="确定删除该账户?" :visible.sync="dialogVisible_del" :before-close="delCancel">
            <span class="dialog-footer">
                <el-button @click="delCancel">取 消</el-button>
                <el-button type="primary" @click="deleteAccount">确 定</el-button>
           </span>
        </el-dialog>

        <!--修改信息弹出框-->
        <el-dialog title="修改信息" :visible.sync="dialogVisible_info" width="620px" :before-close="infoCancel">
            <el-form :model="form" :rules="RulesForm" ref="form" label-position="right" label-width="100px"
                     style="margin: 50px auto">
                <el-form-item label="姓 名：" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="电 话：" prop="phone">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮 箱：" prop="email">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="身份证：" prop="identity_card">
                    <el-input v-model="form.identity_card"></el-input>
                </el-form-item>
                <el-form-item label="用户名称：" prop="username">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <div>用户权限不可更改</div>
            </el-form>
            <span class="dialog-footer">
                <el-button @click="infoCancel">取 消</el-button>
                <el-button type="primary" @click="confirmInfo('form')">确 定</el-button>
            </span>
        </el-dialog>

        <el-table :data="users" border>
            <el-table-column label="用户名称" align="center" prop="username"></el-table-column>
            <el-table-column label="姓名" align="center" prop="name"></el-table-column>
            <el-table-column label="电话" align="center" prop="phone"></el-table-column>
            <el-table-column label="邮箱" align="center" prop="email"></el-table-column>
            <el-table-column label="身份证" align="center" prop="identity_card"></el-table-column>
            <el-table-column label="权限" align="center" prop="role"></el-table-column>
            <el-table-column fixed="right" align="center" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
                    <el-button @click="changeInfo(scope.row)" type="text" size="small">修改信息</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    import axios from 'axios';
    import {
        mapState,
        mapMutations,
    } from 'vuex'

    export default {
        components: {},
        data() {
            return {
                users: [],//所有账户列表
                id: Number,//需要删除，修改信息的账户的id

                dialogVisible_del: false,//删除用户的确认框是否展示
                dialogVisible_info: false,//修改信息的弹出框是否展示


                form: {//修改信息
                    name: '',
                    phone: '',
                    email: '',
                    identity_card: '',
                    username: '',
                    role: Number
                },
                RulesForm: {//修改信息验证规则
                    name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
                    email: [{type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}],
                    identity_card: [{required: true, message: '请输入身份证', trigger: 'blur'}],
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'}]
                }
            }

        },
        methods: {
            getAccount() {
                //获取所有账户列表
                let instance = axios.create({
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                });
                instance.get("http://120.79.137.221:801/api/v1/users/")
                    .then((res) => {
                        this.users = res.data;
                        this['setUserList'](res.data);
                    })
                    .catch((err) => {
                        this.fail('获取用户列表失败！');
                    });
            },
            resetForm(formName) {
                //重置修改信息的表单
                this.$refs[formName].resetFields();
            },

            deleteAccount() {
                //删除账号
                let instance = axios.create({
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                });
                instance.delete("http://120.79.137.221:801/api/v1/users/" + this.id + "/")
                    .then((res) => {
                        this.delCancel();
                        this.success('删除账号成功！');
                        this.getAccount();
                    })
                    .catch((err) => {
                        this.delCancel();
                        this.fail('删除账号失败！');
                        this.getAccount();
                    });
            },
            deleteClick(row) {
                //弹出删除密码弹出框
                this.id = row.id;
                this.dialogVisible_del = true;
            },


            changeInfo(row) {
                //展示修改信息弹出框，并设置id
                this.id = row.id;
                this.dialogVisible_info = true;
            },
            confirmInfo(formName) {
                //提交修改信息
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let qs = require('qs');
                        let instance = axios.create({
                            headers: {'content-type': 'application/x-www-form-urlencoded'}
                        });
                        let data = qs.stringify({
                            "name": this.form.name,
                            "email": this.form.email,
                            "phone": this.form.phone,
                            "identity_card": this.form.identity_card,
                            "role": this.form.role,
                            "username": this.form.username
                        });
                        instance.put("http://120.79.137.221:801/api/v1/users/" + this.id + "/", data)
                            .then((res) => {
                                this.infoCancel();
                                this.success('修改用户信息成功！');
                                this.getAccount();
                            })
                            .catch(function (err) {
                                this.infoCancel();
                                this.fail('修改用户信息失败！');
                                this.getAccount();
                            });
                    }
                });
            },

            delCancel() {
                //关闭确认删除弹窗
                this.dialogVisible_del = false;
                this.id = Number;
            },
            infoCancel() {
                //重置表单，关闭修改信息弹窗
                this.resetForm('form');
                this.dialogVisible_info = false;
                this.id = Number;
            },


            success(str) {
                this.$message({
                    message: str,
                    type: 'success'
                })
            },
            fail(str) {
                this.$message({
                    message: str,
                    type: 'error'
                })
            },
            ...mapMutations(['setUserList']),
        },
        computed: {
            ...mapState({
                token: state => state.token,
                userList: state => state.userList,
            })
        },
        mounted() {
            axios.defaults.headers.common['Authorization'] = "JWT " + this.token;
            this.getAccount();
        },

        watch: {
            users: function () {
                let length = this.users.length;
                for (let i = 0; i < length; i++) {
                    if (this.users[i].role === 0) {
                        this.users[i].role = '治安科工作人员'
                    } else if (this.users[i].role === 1) {
                        this.users[i].role = '治安科助管'
                    } else if (this.users[i].role === 2) {
                        this.users[i].role = '案件中心管理员'
                    }
                }
            }
        }
    }
</script>
<style scoped>

</style>

