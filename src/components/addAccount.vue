<template>
    <div>
        <h3 style="text-align: left">添加账户</h3>
        <hr>
        <el-form :model="form" :rules="rules" ref="form" label-position="left"  label-width="80px" style="width:50%; margin: 50px auto">
            <el-form-item label="姓 名" prop="realname">
                <el-input v-model="form.realname" style="width: 80%"></el-input>
            </el-form-item>
            <el-form-item label="电 话" prop="phone">
                <el-input v-model="form.phone" style="width: 80%"></el-input>
            </el-form-item>
            <el-form-item label="邮 箱" prop="email">
                <el-input v-model="form.email" style="width: 80%"></el-input>
            </el-form-item>
            <el-form-item label="身份证" prop="cardid">
                <el-input v-model="form.cardid" style="width: 80%"></el-input>
            </el-form-item>
            <el-form-item label="权 限">
                <el-radio class="radio" v-model="form.level" label="3">案件中心管理员</el-radio>
                <el-radio class="radio" v-model="form.level" label="0">治安科工作人员</el-radio>
                <el-radio class="radio" v-model="form.level" label="1">治安科助管</el-radio>
            </el-form-item>
            <el-form-item label="用户名称" prop="username">
                <el-input v-model="form.username" style="width: 80%"></el-input>
            </el-form-item>
            <el-form-item label="用户密码" prop="password">
                <el-input v-model="form.password" style="width: 80%" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input style="width: 80%" v-model="form.checkPass" type="password"></el-input>
            </el-form-item>
        </el-form>
        <div>
            <el-button type="success" @click="submitForm('form')">提交</el-button>
            <el-button type="info" @click="resetForm('form')">重置</el-button>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
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
                form:{
                    realname:'',
                    phone:'',
                    email:'',
                    cardid:'',
                    level:'0',
                    username:'',
                    password:''
                },
                rules:{
                    realname:[{required: true, message: '请输入姓名', trigger: 'blur'}],
                    phone:[{required: true, message: '请输入电话', trigger: 'blur'}],
                    email:[
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }],
                    cardid:[{required: true, message: '请输入身份证', trigger: 'blur'}],
                    username:[{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password:[{required: true, validator: validatePass, trigger: 'blur' }],
                    checkPass:[{required: true, validator: validatePass2, trigger: 'blur'}]
                }
            }
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.form);
                        this.$post('/api/regist',this.form).then(res=>{
                            console.log(res);
                            if(res.status===1){
                                this.$refs[formName].resetFields();
                                this.$message({
                                    message: '注册成功！',
                                    type: 'success'
                                });
                            }else {
                                this.$message.error(res);
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                //重置
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style scoped>

</style>

