<template>
    <div>
        <div>
            <el-dialog
                    title="修改密码"
                    :visible.sync="dialogVisible"
                    size="tiny">
                <div>
                    <el-form :model="PasswordForm" :rules="rules" ref="PasswordForm">
                        <el-form-item label="新密码" prop="pass">
                            <el-input placeholder="请输入新的密码" v-model="PasswordForm.pass" style="width: 80%" type="password"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" prop="checkPass">
                            <el-input placeholder="请输入再次输入密码" v-model="PasswordForm.checkPass" style="width: 80%" type="password"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
    <el-button @click="resetForm('PasswordForm')">重置</el-button>
    <el-button type="primary" @click="submitForm('PasswordForm')">确 定</el-button>
  </span>
            </el-dialog>
        </div>
        <h3 style="text-align: left">账户设置</h3>
        <hr>
        <div>
            <el-form :model="form" :rules="RulesForm" label-position="left"  label-width="80px" ref="form" style="width: 30%;margin: 50px auto">
                <el-form-item label="姓 名" prop="realname">
                    <el-input :disabled="disabled"  v-model="form.realname"></el-input>
                </el-form-item>
                <el-form-item label="电 话" prop="phone">
                    <el-input :disabled="disabled" v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮 箱" prop="email">
                    <el-input :disabled="disabled"  v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="身份证" prop="cardid">
                    <el-input :disabled="disabled"  v-model="form.cardid"></el-input>
                </el-form-item>
                <el-form-item label="用户名称" prop="username">
                    <el-input :disabled="disabled"  v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="权 限">
                    <span style="color:red;">{{jurisdiction}}</span>
                </el-form-item>
                <el-form-item>
                    <el-button v-if="on" type="info" @click="ChangeInformation">修改信息</el-button>
                    <el-button v-if="off" type="info" @click="notarize('form')">确认</el-button>
                    <el-button v-if="off" @click="cancel">取消</el-button>
                    <el-button type="success" @click="dialogVisible = true">修改密码</el-button>
                </el-form-item>
            </el-form>
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
                disabled: true,
                dialogVisible:false,
                on:true,
                off:false,
                jurisdiction:'',
                realname:'',
                form:{
                    realname:'',
                    phone:'',
                    email:'',
                    cardid:'',
                    username:''
                },
                PasswordForm:{
                    pass:'',
                    checkPass:''
                },
                rules: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                },
                RulesForm:{
                    realname:[{required: true, message: '请输入姓名', trigger: 'blur'}],
                    phone:[{required: true, message: '请输入电话', trigger: 'blur'}],
                    email:[
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }],
                    cardid:[{required: true, message: '请输入身份证', trigger: 'blur'}],
                    username:[{required: true, message: '请输入用户名', trigger: 'blur'}]
                }
            }
        },
        methods: {
            load(){
                //获取登录用户信息
                this.$get(`/api/user_info`).then(res=>{
                    console.log(res);
                    this.realname = res.data.realname;
                    this.form = res.data;
                    if(res.data.level===3){
                        this.jurisdiction = '案件中心管理员'
                    }else if(res.data.level===0){
                        this.jurisdiction = '治安科工作人员'
                    }else if(res.data.level===1){
                        this.jurisdiction = '治安科助管'
                    }
                })
            },
            ChangeInformation(){
                //修改信息
                this.disabled = false;
                this.on = false;
                this.off = true;
            },
            cancel(){
                //取消
                this.on = true;
                this.off = false;
                this.disabled = true;
            },
            notarize(formName){
                //提交修改信息
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$post(`/api/changeUserInfo`,this.form).then(res=>{
                            console.log(res);
                            if(res.status===1){
                                this.on = true;
                                this.off = false;
                                this.disabled = true;
                                this.load();
                                this.$message({
                                    message: '修改成功！',
                                    type: 'success'
                                });
                            }else {
                                this.$message.error(res.msg);
                            }

                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            submitForm(formName) {
                //修改密码
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$post(`/api/changeUserInfo`,{
                            realname:this.realname,
                            password:this.PasswordForm.pass
                        }).then(res=>{
                            console.log(res);
                            if(res.status===1){
                                this.dialogVisible = false;
                                this.$message({
                                    message: '修改成功！',
                                    type: 'success'
                                });
                            }else {
                                this.$message.error(res.msg);
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        mounted: function () {
            this.load();
        },
        watch: {}
    }
</script>
<style scoped>

</style>

