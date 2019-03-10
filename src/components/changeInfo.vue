<template>
    <div>
        <h3 style="text-align: left">修改账户信息</h3>
        <hr>
        <el-form :model="form" :rules="RulesForm" ref="form" label-position="right" label-width="100px"
                 style="margin: 50px auto;width:500px">
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
            <div style="font-size:14px;">用户名以及用户权限不可更改</div>
        </el-form>
        <span class="dialog-footer">
                <el-button @click="resetForm('form')">重置</el-button>
                <el-button type="primary" @click="confirmInfo('form')">确 定</el-button>
            </span>
    </div>
</template>

<script>
    import axios from 'axios';
    import {
        mapState,
        mapMutations,
    } from 'vuex'

    export default {
        name: "changeInfo",
        data() {
            return {
                form: {//修改信息
                    name: '',
                    phone: '',
                    email: '',
                    identity_card: '',
                },
                RulesForm: {//修改信息验证规则
                    name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
                    email: [{required: true, message: '请输入姓名', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}],
                    identity_card: [{required: true, message: '请输入身份证', trigger: 'blur'}],
                    phone: [{required: true, message: '请输入联系方式', trigger: 'blur'}]
                }
            }
        },
        methods: {
            resetForm(formName) {
                //重置修改信息的表单
                this.$refs[formName].resetFields();
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
                        });
                        instance.post("/api/v1/users/change/", data)
                            .then((res) => {
                                this.resetForm('form');
                                this.$message({
                                    message: '修改用户信息成功！',
                                    type: 'success'
                                })
                            })
                            .catch(function (err) {
                                this.$message({
                                    message: '修改用户信息失败！',
                                    type: 'error'
                                })
                            });
                    }
                });
            },
        },
        computed: {
            ...mapState({
                token: state => state.token,
            })
        },
        mounted() {
            axios.defaults.headers.common['Authorization'] = "JWT " + this.token;
        },
    }
</script>

<style scoped>

</style>