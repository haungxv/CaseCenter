<template>
    <div class="sign">
        <h1>案件中心后台管理系统</h1>
        <div class="sign_box">
            <el-form :model="form">
                <el-form-item>
                    <el-input v-model="form.username" style="width: 80%" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.password" style="width: 80%" placeholder="请输入密码"></el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" style="width: 80%" @click="login">登录</el-button>
        </div>
    </div>
</template>

<script>
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
                this.$router.push('/manager')
            }
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
</style>