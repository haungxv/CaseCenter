<template>
    <div class="sign">
        <h1>案件中心后台管理系统</h1>
        <div class="sign_box">
            <el-form :model="form">
                <el-form-item>
                    <input v-model="form.username" class="self-input" type="text" placeholder="请输入账号"/>
                </el-form-item>
                <el-form-item>
                    <input v-model="form.password" class="self-input" type="password" placeholder="请输入密码"/>
                </el-form-item>
            </el-form>
            <el-button type="primary" style="width: 80%" @click="login">登录</el-button>
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
        name: "sign",
        data() {
            return {
                form: {
                    username: '',
                    password: '',
                }
            }
        },
        methods: {
            login() {
                let qs = require('qs');
                let instance = axios.create({
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                });
                let data = qs.stringify({
                    "username": this.form.username,
                    "password": this.form.password,
                });
                instance.post("http://120.79.137.221:801/token-auth/", data)
                    .then((res) => {
                        if (res.status) {
                            this.$router.push('/manager/caseReview');
                            this['setToken'](res.data.token);
                            this['setRole'](res.data.role);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            ...mapMutations(['setToken', 'setRole']),
        }
    }
</script>

<style scoped>
    .sign {
        width: 100%;
        height: 100vh;
        background-image: url("../images/bg.jpg");
        overflow: hidden;
    }

    .sign_box {
        width: 20%;
        border: 1px solid #BFCBD9;
        border-radius: 10px;
        margin: 10% auto 0 auto;
        padding: 50px 20px;
    }

    h1 {
        color: white;
        font-size: 50px;
        margin-top: 10%;
    }

    .self-input {
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        outline: 0;
        padding: 0 15px;
        width: 80%;
    }
    input:-ms-input-placeholder{color:#606266;}/* Internet Explorer 10+ */
    input::-webkit-input-placeholder{color:#606266;}/* WebKit browsers */
    input::-moz-placeholder{color:#606266;}/* Mozilla Firefox 4 to 18 */
    input:-moz-placeholder{color:#606266;}/* Mozilla Firefox 19+ */
</style>