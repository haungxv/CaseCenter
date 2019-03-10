<template>
    <div>
        <h3 style="text-align: left">修改密码</h3>
        <hr>
        <el-form :model="PasswordForm" :rules="PassRules" ref="PasswordForm"  label-position="right" label-width="100px"
                 style="width:500px; margin: 70px auto">
            <el-form-item label="新密码" prop="pass">
                <el-input placeholder="请输入新的密码" v-model="PasswordForm.pass" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input placeholder="请再次输入新密码" v-model="PasswordForm.checkPass"
                          type="password"></el-input>
            </el-form-item>
        </el-form>
        <div>
            <el-button @click="resetForm('PasswordForm')">重置</el-button>
            <el-button type="primary" @click="confirmPass('PasswordForm')">确 定</el-button>
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
        name: "changePass",
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.PasswordForm.checkPass !== '') {
                        this.$refs.PasswordForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.PasswordForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                PasswordForm: {//修改密码
                    pass: '',
                    checkPass: ''
                },
                PassRules: {//修改密码验证规则
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ]
                },
            }
        },
        methods: {
            resetForm(formName) {
                //重置修改密码或者修改信息的表单
                this.$refs[formName].resetFields();
            },
            confirmPass(formName) {
                //修改密码
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let qs = require('qs');
                        let instance = axios.create({
                            headers: {'content-type': 'application/x-www-form-urlencoded'}
                        });
                        let data = qs.stringify({
                            "password": this.PasswordForm.pass,
                        });
                        instance.post("/api/v1/users/reset_pwd/", data)
                            .then((res) => {
                                this.resetForm('PasswordForm');
                                this.$message({
                                    message: "修改密码成功！",
                                    type: 'success'
                                })
                            })
                            .catch((err) => {
                                this.$message({
                                    message: "修改密码失败！",
                                    type: 'error'
                                })
                            });
                    }
                })
            },
        },
        computed: {
            ...mapState({
                token: state => state.token,
            })
        },
        mounted(){
            axios.defaults.headers.common['Authorization'] = "JWT " + this.token;
        }
    }
</script>

<style scoped>

</style>