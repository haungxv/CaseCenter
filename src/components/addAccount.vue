<template>
    <div>
        <h3 style="text-align: left">添加账户</h3>
        <hr>
        <el-form :model="form" :rules="rules" ref="form" label-position="right" label-width="100px"
                 style="width:600px; margin: 50px auto">
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
            <el-form-item label="权 限：">
                <el-radio class="radio" v-model="form.role" :label=0>案件中心管理员</el-radio>
                <el-radio class="radio" v-model="form.role" :label=1>治安科工作人员</el-radio>
                <el-radio class="radio" v-model="form.role" :label=2>治安科助管</el-radio>
            </el-form-item>
            <el-form-item label="用户名称：" prop="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="用户密码：" prop="password">
                <el-input v-model="form.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码：" prop="checkPass">
                <el-input v-model="form.checkPass" type="password"></el-input>
            </el-form-item>
        </el-form>
        <div>
            <el-button type="success" @click="submitForm('form')">提交</el-button>
            <el-button type="info" @click="resetForm('form')">重置</el-button>
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
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.form.checkPass !== '') {
                        this.$refs.form.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    name: '',
                    phone: '',
                    email: '',
                    identity_card: '',
                    role: 0,
                    username: '',
                    password: ''
                },
                rules: {
                    name: [{required: true, message: '请输入真实姓名', trigger: 'blur'}],
                    phone: [{required: true, message: '请输入电话', trigger: 'blur'}],
                    email: [{type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}],
                    identity_card: [{required: true, message: '请输入身份证', trigger: 'blur'}],
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, validator: validatePass, trigger: 'blur'}],
                    checkPass: [{required: true, validator: validatePass2, trigger: 'blur'}]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                        if (valid) {
                            let qs = require('qs');
                            let instance = axios.create({
                                headers: {'content-type': 'application/x-www-form-urlencoded'}
                            });
                            let data = qs.stringify({
                                "name": this.form.name,
                                "phone": this.form.phone,
                                "email": this.form.email,
                                "identity_card": this.form.identity_card,
                                "role": this.form.role,
                                "username": this.form.username,
                                "password": this.form.password
                            });
                            instance.post("/api/v1/users/", data)
                                .then((res) => {
                                    this.resetForm('form');
                                    this.$message({
                                        message: '添加成功！',
                                        type: 'success'
                                    })
                                })
                                .catch((err) => {
                                    this.$message({
                                        message: "添加失败！",
                                        type: 'error'
                                    })
                                });
                        }
                    }
                )
                ;
            },
            resetForm(formName) {
                //重置
                this.$refs[formName].resetFields();
            }
        },
        mounted() {
            axios.defaults.headers.common['Authorization'] = "JWT " + this.token;
        },
        computed: {
            ...mapState({
                token: state => state.token,
            })
        }
    }
</script>
<style scoped>

</style>

