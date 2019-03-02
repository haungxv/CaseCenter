<template>
    <div>
        <div style="text-align: left;margin-top: 20px">
            <span>报案类型</span>
            <hr>
            <el-form :model="caseInformation" :rules="rules.baseInfo" ref="caseInformation" :inline="true">
                <el-form-item label="案发时间" prop="caseTime">
                    <el-date-picker
                            v-model="caseInformation.caseTime"
                            type="datetime"
                            @change="getTime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="报案类型" prop="caseType">
                    <el-cascader :options="cases" v-model="caseInformation.caseType"></el-cascader>
                </el-form-item>
                <!--<el-form-item label="案件录入人" prop="spare2">-->
                <!--<el-input v-model="caseInformation.spare2"></el-input>-->
                <!--</el-form-item>-->
            </el-form>
        </div>
        <div style="text-align: left;margin-top: 20px">
            <span>报案人信息</span>
            <hr>
            <el-form :model="reportPerson" :inline="true" ref="reportPerson" :rules="rules.reportPerson">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="reportPerson.name"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio class="radio" v-model="reportPerson.gender" label="0">男</el-radio>
                    <el-radio class="radio" v-model="reportPerson.gender" label="1">女</el-radio>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="reportPerson.age"></el-input>
                </el-form-item>
                <el-form-item label="民族(国籍)">
                    <el-input v-model="reportPerson.national"></el-input>
                </el-form-item>
                <el-form-item label="职业或身份">
                    <el-select v-model="reportPerson.occupation" placeholder="请选择">
                        <el-option
                                v-for="item in occupations"
                                :key="item.value"
                                :label="item.value"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="证件类型">
                    <el-select v-model="reportPerson.cardtype" placeholder="请选择">
                        <el-option
                                v-for="item in cardtypes"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号">
                    <el-input v-model="reportPerson.licenseNumber"></el-input>
                </el-form-item>
                <el-form-item label="文化程度">
                    <el-select v-model="reportPerson.cultralLevel" placeholder="请选择">
                        <el-option
                                v-for="item in cultralLevels"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年级">
                    <el-select v-model="reportPerson.grade" placeholder="请选择">
                        <el-option
                                v-for="item in grades"
                                :key="item.ctype"
                                :label="item.ctype"
                                :value="item.ctype">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学院或单位">
                    <el-input v-model="reportPerson.collegeUnit"></el-input>
                </el-form-item>
                <el-form-item label="住址">
                    <el-input v-model="reportPerson.address"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="reportPerson.contact"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-upload
                            class="upload-demo"
                            ref="informant"
                            :action="urls"
                            :on-success="informant"
                            list-type="picture">
                        <el-button type="primary">上传证件照</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
        </div>
        <div style="text-align: left;margin-top: 20px">
            <span style="margin-right: 20px">报案人是否与受害人为同一人:</span>
            <el-radio class="radio" v-model="radio1" label="1">是</el-radio>
            <el-radio class="radio" v-model="radio1" label="0">否</el-radio>
            <div style="margin-top: 20px" v-if="on_off1">
                <span>受害人信息</span>
                <hr>
                <el-form :model="victim" :inline="true">
                    <el-form-item label="姓名">
                        <el-input v-model="victim.name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio class="radio" v-model="victim.gender" label="0">男</el-radio>
                        <el-radio class="radio" v-model="victim.gender" label="1">女</el-radio>
                    </el-form-item>
                    <el-form-item label="年龄">
                        <el-input v-model="victim.age"></el-input>
                    </el-form-item>
                    <el-form-item label="民族(国籍)">
                        <el-input v-model="victim.national"></el-input>
                    </el-form-item>
                    <el-form-item label="职业或身份">
                        <el-select v-model="victim.occupation" placeholder="请选择">
                            <el-option
                                    v-for="item in occupations"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="证件类型">
                        <el-select v-model="victim.cardtype" placeholder="请选择">
                            <el-option
                                    v-for="item in cardtypes"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="证件号">
                        <el-input v-model="victim.licenseNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="文化程度">
                        <el-select v-model="victim.cultralLevel" placeholder="请选择">
                            <el-option
                                    v-for="item in cultralLevels"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="年级">
                        <el-select v-model="victim.grade" placeholder="请选择">
                            <el-option
                                    v-for="item in grades"
                                    :key="item.ctype"
                                    :label="item.ctype"
                                    :value="item.ctype">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学院或单位">
                        <el-input v-model="victim.collegeUnit"></el-input>
                    </el-form-item>
                    <el-form-item label="住址">
                        <el-input v-model="victim.address"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式">
                        <el-input v-model="victim.contact"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-upload
                                class="upload-demo"
                                ref="sufferer"
                                :action="urls"
                                :on-success="victimMan"
                                list-type="picture">
                            <el-button type="primary">上传证件照</el-button>
                        </el-upload>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div style="margin-top: 20px;text-align: left">
            案发情况
            <hr>
            <el-form :model="situationOfCase" :inline="true"  ref="situationOfCase" :rules="rules.situationOfCase">
                <el-form-item label="案发地点" prop="address">
                    <el-input v-model="situationOfCase.address"></el-input>
                    <!-- <el-cascader
                      :options="addresss"
                      v-model="situationOfCase.address"></el-cascader> -->
                </el-form-item>
                <el-form-item label="案发时间段" prop="period">
                    <el-date-picker
                            v-model="situationOfCase.period"
                            type="datetimerange"
                            @change="getDate"
                            placeholder="选择时间范围">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="案情">
                    <el-input type="textarea" v-model="situationOfCase.detail" :rows="5" placeholder="请输入内容" style="width: 1000px"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div style="text-align: left;margin-top: 20px">
            <span>嫌疑人信息</span>
            <hr>
            <span style="margin-right: 20px">是否有嫌疑人:</span>
            <el-radio class="radio" v-model="radio2" label="1">是</el-radio>
            <el-radio class="radio" v-model="radio2" label="0">否</el-radio>
            <div style="margin-top: 20px" v-if="on_off2">
                <el-form :model="suspectCase" :inline="true">
                    <el-form-item label="姓名">
                        <el-input v-model="suspectCase.name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio class="radio" v-model="suspectCase.gender" label="0">男</el-radio>
                        <el-radio class="radio" v-model="suspectCase.gender" label="1">女</el-radio>
                    </el-form-item>
                    <el-form-item label="年龄">
                        <el-input v-model="suspectCase.age"></el-input>
                    </el-form-item>
                    <el-form-item label="民族(国籍)">
                        <el-input v-model="suspectCase.national"></el-input>
                    </el-form-item>
                    <el-form-item label="职业或身份">
                        <el-select v-model="suspectCase.occupation" placeholder="请选择">
                            <el-option
                                    v-for="item in occupations"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="证件类型">
                        <el-select v-model="suspectCase.cardtype" placeholder="请选择">
                            <el-option
                                    v-for="item in cardtypes"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="证件号">
                        <el-input v-model="suspectCase.licenseNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="文化程度">
                        <el-select v-model="suspectCase.cultralLevel" placeholder="请选择">
                            <el-option
                                    v-for="item in cultralLevels"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="年级">
                        <el-select v-model="suspectCase.grade" placeholder="请选择">
                            <el-option
                                    v-for="item in grades"
                                    :key="item.ctype"
                                    :label="item.ctype"
                                    :value="item.ctype">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学院或单位">
                        <el-input v-model="suspectCase.collegeUnit"></el-input>
                    </el-form-item>
                    <el-form-item label="住址">
                        <el-input v-model="suspectCase.address"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式">
                        <el-input v-model="suspectCase.contact"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div style="text-align: left;margin-top: 20px">
            <span>案件证人信息</span>
            <hr>
            <span style="margin-right: 20px">是否有案件证人:</span>
            <el-radio class="radio" v-model="radio3" label="1">是</el-radio>
            <el-radio class="radio" v-model="radio3" label="0">否</el-radio>
            <div style="margin-top: 20px" v-if="on_off3">
                <el-form :model="caseWitness" :inline="true">
                    <el-form-item label="姓名">
                        <el-input v-model="caseWitness.name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio class="radio" v-model="caseWitness.gender" label="0">男</el-radio>
                        <el-radio class="radio" v-model="caseWitness.gender" label="1">女</el-radio>
                    </el-form-item>
                    <el-form-item label="年龄">
                        <el-input v-model="caseWitness.age"></el-input>
                    </el-form-item>
                    <el-form-item label="民族(国籍)">
                        <el-input v-model="caseWitness.national"></el-input>
                    </el-form-item>
                    <el-form-item label="职业或身份">
                        <el-select v-model="caseWitness.occupation" placeholder="请选择">
                            <el-option
                                    v-for="item in occupations"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="证件类型">
                        <el-select v-model="caseWitness.cardtype" placeholder="请选择">
                            <el-option
                                    v-for="item in cardtypes"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="证件号">
                        <el-input v-model="caseWitness.licenseNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="文化程度">
                        <el-select v-model="caseWitness.cultralLevel" placeholder="请选择">
                            <el-option
                                    v-for="item in cultralLevels"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="年级">
                        <el-select v-model="caseWitness.grade" placeholder="请选择">
                            <el-option
                                    v-for="item in grades"
                                    :key="item.ctype"
                                    :label="item.ctype"
                                    :value="item.ctype">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学院或单位">
                        <el-input v-model="caseWitness.collegeUnit"></el-input>
                    </el-form-item>
                    <el-form-item label="住址">
                        <el-input v-model="caseWitness.address"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式">
                        <el-input v-model="caseWitness.contact"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div style="text-align: left;margin-top: 20px">
            <span>损失财物情况</span>
            <hr>
            <span style="margin-right: 20px">是否有损失财物:</span>
            <el-radio class="radio" v-model="radio4" label="1">是</el-radio>
            <el-radio class="radio" v-model="radio4" label="0">否</el-radio>
            <div style="margin-top: 20px" v-if="on_off4">
                <el-form :model="lossOfFinancialSituation" :inline="true">
                    <el-form-item label="损失物品名称">
                        <el-input v-model="lossOfFinancialSituation.lossOfFinancialName"></el-input>
                    </el-form-item>
                    <el-form-item label="所有权性质">
                        <el-select v-model="lossOfFinancialSituation.natureOfOwnership" placeholder="请选择">
                            <el-option
                                    v-for="item in natureOfOwnerships"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="品牌">
                        <el-input v-model="lossOfFinancialSituation.brand"></el-input>
                    </el-form-item>
                    <el-form-item label="型号">
                        <el-input v-model="lossOfFinancialSituation.model"></el-input>
                    </el-form-item>
                    <el-form-item label="颜色">
                        <el-input v-model="lossOfFinancialSituation.color"></el-input>
                    </el-form-item>
                    <el-form-item label="尺寸">
                        <el-input v-model="lossOfFinancialSituation.size"></el-input>
                    </el-form-item>
                    <el-form-item label="其他特征">
                        <el-input v-model="lossOfFinancialSituation.other"></el-input>
                    </el-form-item>
                    <el-form-item label="数量">
                        <el-input v-model="lossOfFinancialSituation.number"></el-input>
                    </el-form-item>
                    <el-form-item label="购买时间">
                        <el-date-picker
                                v-model="lossOfFinancialSituation.purchaseTime"
                                @change="getshijian"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="购置价格">
                        <el-input v-model="lossOfFinancialSituation.purchaseValue"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-upload
                                class="upload-demo"
                                ref="evidence"
                                :action="urls"
                                :on-success="evidence"
                                list-type="picture">
                            <el-button type="primary">上传凭证</el-button>
                        </el-upload>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div style="text-align: left;margin-top: 20px">
            <hr>
            <span style="margin-right: 20px">报案人是否知晓报告公安机关等相关部门:</span>
            <el-radio class="radio" v-model="ifKnowPublicSecurity" label="true">是</el-radio>
            <el-radio class="radio" v-model="ifKnowPublicSecurity" label="false">否</el-radio>
            <span style="margin: 0 20px">报案人是否通知公安机关等部门:</span>
            <el-radio class="radio" v-model="ifNotifyPublicSecurity" label="true">是</el-radio>
            <el-radio class="radio" v-model="ifNotifyPublicSecurity" label="false">否</el-radio>
        </div>
        <div style="text-align: left;margin-top: 20px">
            案件处置结果
            <hr>
            <span style="margin-right: 20px">报案人是否查看监控:</span>
            <el-radio class="radio" v-model="ifViewMonitoring" label="true">是</el-radio>
            <el-radio class="radio" v-model="ifViewMonitoring" label="false">否</el-radio>
        </div>
        <div style="text-align: left;margin-top: 20px">
            <el-button type="success" @click="entering('caseInformation')">报 案</el-button>
        </div>
    </div>
</template>
<script>

    export default {
        data () {
            return {
                // urls:this.DEFINES.url+`api/upload/`,
                urls:'',
                period:'',
                radio1:'1',
                radio2:'0',
                radio3:'0',
                radio4:'0',
                on_off1:false,
                on_off2:false,
                on_off3:false,
                on_off4:false,
                ifKnowPublicSecurity:'false',
                ifNotifyPublicSecurity:'false',
                ifViewMonitoring:'false',
                cases:[],
                addresss:[],
                occupations:[],
                natureOfOwnerships:[{
                    value: '0',
                    label: '本人所有'
                },{
                    value: '1',
                    label: '非本人所有'
                }],
                cardtypes:[{
                    value: '护照',
                    label: '护照'
                },{
                    value: '学生证',
                    label: '学生证'
                },{
                    value: '身份证',
                    label: '身份证'
                }],
                cultralLevels:[{
                    value: '小学',
                    label: '小学'
                },{
                    value: '初中',
                    label: '初中'
                },{
                    value: '高中',
                    label: '高中'
                },{
                    value: '专科',
                    label: '专科'
                },{
                    value: '本科',
                    label: '本科'
                },{
                    value: '硕士',
                    label: '硕士'
                },{
                    value: '博士',
                    label: '博士'
                }],
                grades:[],
                caseInformation:{
                    caseTime:'',
                    caseType:[],
                    spare2:''
                },
                reportPerson:{
                    name:'',
                    gender:'',
                    age:'',
                    national:'',
                    occupation:'',
                    cardtype:'',
                    licenseNumber:'',
                    cultralLevel:'',
                    grade:'',
                    collegeUnit:'',
                    address:'',
                    contact:'',
                    licensePhoto:''
                },
                victim:{
                    name:'',
                    gender:'',
                    age:'',
                    national:'',
                    occupation:'',
                    cardtype:'',
                    licenseNumber:'',
                    cultralLevel:'',
                    grade:'',
                    collegeUnit:'',
                    address:'',
                    contact:'',
                    licensePhoto:''
                },
                situationOfCase:{
                    address:'',
                    period:'',
                    detail:''
                },
                suspectCase:{
                    name:'',
                    gender:'',
                    age:'',
                    national:'',
                    occupation:'',
                    cardtype:'',
                    licenseNumber:'',
                    cultralLevel:'',
                    grade:'',
                    collegeUnit:'',
                    address:'',
                    contact:''
                },
                caseWitness:{
                    name:'',
                    gender:'',
                    age:'',
                    national:'',
                    occupation:'',
                    cardtype:'',
                    licenseNumber:'',
                    cultralLevel:'',
                    grade:'',
                    collegeUnit:'',
                    address:'',
                    contact:''
                },
                lossOfFinancialSituation:{
                    lossOfFinancialName:'',
                    natureOfOwnership:'',
                    brand:'',
                    model:'',
                    color:'',
                    size:'',
                    other:'',
                    number:'',
                    purchaseTimea:'',
                    purchaseValue:'',
                    certificate:''
                },
                rules:{
                    baseInfo: {
                        caseTime:[
                            { required: true, message: '请选择日期时间', trigger: 'change' }
                        ],
                        caseType:[
                            { type: 'array', required: true, message: '请选择报案类型', trigger: 'change' }
                        ],
                        spare2:[
                            { required: true, message: '请输入案件录入人', trigger: 'blur' }
                        ]
                    },
                    reportPerson: {
                        name: [
                            {required: true, message: '报案人姓名不能为空', trigger: 'blur'}
                        ]
                    },
                    situationOfCase: {
                        address: [
                            {required: true, message: '案发地点不能为空', trigger: 'blur'}
                        ],
                        period: [
                            {type: 'array', required: true, message: '案发时间段不能为空', trigger: 'blur'}
                        ]
                    }
                }
            }
        },
        methods: {
            getshijian(date){
                this.lossOfFinancialSituation.purchaseTimea = date;
            },
            getTime(date){
                this.caseInformation.caseTime = date;
                console.log(this.caseInformation.caseTime)
            },
            getDate(val){
                this.period= val;
                console.log(this.period);
            },
            entering(formName){
                //案件录入
                let isValidate = false;
                this.$refs['caseInformation'].validate((valid) => {
                    if (valid) {
                        this.$refs['reportPerson'].validate((valid) => {
                            if (valid) {
                                this.$refs['situationOfCase'].validate((valid) => {
                                    if (valid) {
                                        isValidate = true
                                    }
                                })
                            }
                        })
                    }
                })

                if (isValidate) {
                    this.$post(`/api/schoolPersonnelRegistrationcase/`,{
                            "caseInformation": this.caseInformation,
                            "reportPerson":[this.reportPerson],
                            "victim":[this.victim],
                            "situationOfCase":{
                                "address":this.situationOfCase.address,
                                "perioda":this.situationOfCase.period,
                                "detail":this.situationOfCase.detail
                            },
                            "suspectCase":[this.suspectCase],
                            "caseWitness":[this.caseWitness],
                            "lossOfFinancialSituation":this.lossOfFinancialSituation,
                            "caseDisposal":{
                                "ifKnowPublicSecurity":this.ifKnowPublicSecurity,
                                "ifNotifyPublicSecurity":this.ifNotifyPublicSecurity,
                                "ifViewMonitoring":this.ifViewMonitoring,
                                "result":[],
                                "inCampus":false
                            }
                        }
                    ).then(res=>{
                        console.log(res);
//              this.caseInformation = {};
                        this.radio1 = '1';
                        this.radio2 = '0';
                        this.radio3 = '0';
                        this.radio4 = '0';
                        this.$refs['caseInformation'].resetFields();
                        this.$refs['reportPerson'].resetFields();
                        this.$refs['situationOfCase'].resetFields();
                        this.reportPerson = {
                            name:'',
                            gender:'',
                            age:'',
                            national:'',
                            occupation:'',
                            cardtype:'',
                            licenseNumber:'',
                            cultralLevel:'',
                            grade:'',
                            collegeUnit:'',
                            address:'',
                            contact:'',
                            licensePhoto:''
                        },
                            this.victim = {
                                name:'',
                                gender:'',
                                age:'',
                                national:'',
                                occupation:'',
                                cardtype:'',
                                licenseNumber:'',
                                cultralLevel:'',
                                grade:'',
                                collegeUnit:'',
                                address:'',
                                contact:'',
                                licensePhoto:''
                            }
                        this.situationOfCase = {
                            address:[],
                            period:'',
                            detail:''
                        }
                        this.suspectCase = {
                            name:'',
                            gender:'',
                            age:'',
                            national:'',
                            occupation:'',
                            cardtype:'',
                            licenseNumber:'',
                            cultralLevel:'',
                            grade:'',
                            collegeUnit:'',
                            address:'',
                            contact:''
                        }
                        this.caseWitness = {
                            name:'',
                            gender:'',
                            age:'',
                            national:'',
                            occupation:'',
                            cardtype:'',
                            licenseNumber:'',
                            cultralLevel:'',
                            grade:'',
                            collegeUnit:'',
                            address:'',
                            contact:''
                        }
                        this.lossOfFinancialSituation = {
                            lossOfFinancialName:'',
                            natureOfOwnership:'',
                            brand:'',
                            model:'',
                            color:'',
                            size:'',
                            other:'',
                            number:'',
                            purchaseTimea:'',
                            purchaseValue:'',
                            certificate:''
                        }
                        this.period = '';
                        this.$message({
                            message: '录入成功！',
                            type: 'success'
                        });
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            },
            caseType(){
                //获取案件类型/职业/案发地点
                this.$get(`/api/findItem`).then(res=>{
                    console.log(res.body);
                    let type = [];
                    let typeA = {};
                    let typeB = {};
                    let typeC = {};
                    let site = [];
                    let siteA = {};
                    let siteB = {};
                    let siteC = {};
                    for(let i=0;i<res.body.caseType.length;i++){
                        typeA = {
                            value:res.body.caseType[i].caseT.label,
                            label:res.body.caseType[i].caseT.value
                        };
                        res.body.caseType[i].data.length > 0 && (typeA.children = [])
                        for(let e=0;e<res.body.caseType[i].data.length;e++){
                            typeB = {
                                value:res.body.caseType[i].data[e].caseT.label,
                                label:res.body.caseType[i].data[e].caseT.value
                            };
                            res.body.caseType[i].data[e].data.length > 0 && (typeB.children = [])
                            for(let j=0;j<res.body.caseType[i].data[e].data.length;j++){
                                typeC = {
                                    value:res.body.caseType[i].data[e].data[j].caseT.label,
                                    label:res.body.caseType[i].data[e].data[j].caseT.value
                                };
                                typeB.children.push(typeC)
                            }
                            typeA.children.push(typeB)
                        }
                        type.push(typeA);
                    }
                    this.cases = type;
                    res.body.occupation[0] && (this.occupations = res.body.occupation[0].tup); // 职业或身份
                    for(let i=0;i<res.body.address.length;i++){
                        siteA = {
                            value:res.body.address[i].value,
                            label:res.body.address[i].value
                        };
                        res.body.address[i].tup.length > 0 && (siteA.children = [])
                        for(let e=0;e<res.body.address[i].tup.length;e++){
                            siteB = {
                                value:res.body.address[i].tup[e].value,
                                label:res.body.address[i].tup[e].value
                            };
                            res.body.address[i].tup[e].tup.length > 0 && (typeB.children = [])
                            for(let j=0;j<res.body.address[i].tup[e].tup.length;j++){
                                const situation = res.body.address[i].tup[e].tup[j].value
                                siteC = {
                                    value: situation,
                                    label:situation
                                };
                                siteB.children && siteB.children.push(siteC)
                            }
                            siteA.children && siteA.children.push(siteB)
                        }
                        site.push(siteA);
                    }
                    this.addresss = site;
                    console.log(site)
                })
            },
            getGrades(){
                //获取年级信息
                this.$get(`/api/findClass`).then(res=>{
                    this.grades = res.body;
                })
            },
            informant(file){
                //上传报案人照片服务器返回值
                console.log(file);
                this.reportPerson.licensePhoto = file.data;
                setTimeout(this.$refs.informant.clearFiles,3000);
            },
            victimMan(file){
                //上传受害人照片服务器返回值
                console.log(file);
                this.victim.licensePhoto = file.data;
                setTimeout(this.$refs.sufferer.clearFiles,3000);
            },
            evidence(file){
                //上传损失财物凭证
                console.log(file);
                this.lossOfFinancialSituation.certificate = file.data;
                setTimeout(this.$refs.evidence.clearFiles,3000)
            }
        },
        mounted: function () {
            this.caseType();
            this.getGrades();
        },
        watch: {
            radio1:function () {
                if(this.radio1=='1'){
                    this.on_off1 = false;
                }else {
                    this.on_off1 = true;
                }
            },
            radio2:function () {
                if(this.radio2=='0'){
                    this.on_off2 = false;
                }else {
                    this.on_off2 = true;
                }
            },
            radio3:function () {
                if(this.radio3=='0'){
                    this.on_off3 = false;
                }else {
                    this.on_off3 = true;
                }
            },
            radio4:function () {
                if(this.radio4=='0'){
                    this.on_off4 = false;
                }else {
                    this.on_off4 = true;
                }
            },

        }
    }
</script>
<style scoped>

</style>
