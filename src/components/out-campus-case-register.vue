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
                    <el-cascader
                            :options="cases"
                            v-model="caseInformation.caseType"></el-cascader>
                </el-form-item>
                <!--<el-form-item label="案件录入人" prop="spare2">-->
                <!--<el-input v-model="caseInformation.spare2"></el-input>-->
                <!--</el-form-item>-->
            </el-form>
        </div>
        <div style="text-align: left;margin-top: 20px">
            <span>报案人信息</span>
            <hr>
            <el-form :model="reportPerson" :inline="true" :rules="rules.reportPerson"  ref="reportPerson">
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
                <el-form-item label="单位">
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
                    <el-form-item label="单位">
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
            <el-form :model="situationOfCase" :inline="true" :rules="rules.situationOfCase" ref="situationOfCase">
                <el-form-item label="案发地点" prop="address">
                    <el-input v-model="situationOfCase.address"></el-input>
                    <!-- <el-cascader
                      :options="addresss"
                      v-model="situationOfCase.address"></el-cascader> -->
                </el-form-item>
                <el-form-item label="案发时间段" prop="period[0]">
                    <el-date-picker
                            v-model="situationOfCase.period"
                            @change="getDate"
                            type="datetimerange"
                            placeholder="选择时间范围">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="案情">
                    <el-input type="textarea" v-model="situationOfCase.detail" :rows="5" placeholder="请输入内容" style="width: 1000px"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div style="text-align: left;margin-top: 20px">
            案件处置结果
            <hr>
            <el-form :model="caseDisposal">
                <el-form-item label="是否告知报案人应当先报告公安人员等相关部门">
                    <el-radio class="radio" v-model="caseDisposal.ifKnowPublicSecurity" label="true">是</el-radio>
                    <el-radio class="radio" v-model="caseDisposal.ifKnowPublicSecurity" label="false">否</el-radio>
                </el-form-item>
                <el-form-item label="是否由公安机关带领其查看监控">
                    <el-radio class="radio" v-model="caseDisposal.ifViewMonitoring" label="true">是</el-radio>
                    <el-radio class="radio" v-model="caseDisposal.ifViewMonitoring" label="false">否</el-radio>
                </el-form-item>
                <el-form-item label="是否查看到监控" v-if="on_off2">
                    <el-radio class="radio" v-model="caseDisposal.ifViewMonitored" label="true">是</el-radio>
                    <el-radio class="radio" v-model="caseDisposal.ifViewMonitored" label="false">否</el-radio>
                    <el-form-item label="填写原因" v-if="on_off3">
                        <el-input v-model="caseDisposal.reason" style="width: 60%"></el-input>
                    </el-form-item>
                    <el-form-item label="录像资料存储目录" v-if="on_off4">
                        <el-input v-model="caseDisposal.videoInformation" style="width: 60%"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="处置结果">
                    <el-cascader
                            :options="results"
                            @change="ok"
                            v-model="caseDisposal.result"
                            style="width: 400px"></el-cascader>
                </el-form-item>
            </el-form>
        </div>
        <div style="margin-top: 20px;text-align: left">
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
                radio1:'1',
                on_off1:false,
                on_off2:false,
                on_off3:true,
                on_off4:false,
                period:'',
                cause:'',
                cases:[],
                occupations:[],
                addresss:[],
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
                results:[{
                    value:'报案',
                    label:'报案',
                    children:[{
                        value:'破案',
                        label:'破案',
                        children:[{
                            value:'挡获嫌疑人、未寻回损失财物',
                            label:'挡获嫌疑人、未寻回损失财物'
                        },{
                            value:'挡获嫌疑人、寻回损失财物',
                            label:'挡获嫌疑人、寻回损失财物'
                        },{
                            value:'未挡获嫌疑人、寻回损失财物',
                            label:'未挡获嫌疑人、寻回损失财物'
                        }]
                    },{
                        value:'调解和解',
                        label:'调解和解',
                        children:[{
                            value:'保卫处调解',
                            label:'保卫处调解'
                        },{
                            value:'双方和解',
                            label:'双方和解'
                        }]
                    },{
                        value:'未破案',
                        label:'未破案',
                        children:[{
                            value:'已查到监控录像',
                            label:'未查到监控录像'
                        }]
                    }]
                },{
                    value:'报警求助',
                    label:'报警求助',
                    children:[{
                        value:'已前往现场处置',
                        label:'已前往现场处置',
                        children:[{
                            value:'应急队员已经现场处置成功',
                            label:'应急队员已经现场处置成功'
                        },{
                            value:'应急队员已通知相关科室处置',
                            label:'应急队员已通知相关科室处置'
                        },{
                            value:'应急队员已通知值班干部处置',
                            label:'应急队员已通知值班干部处置'
                        }]
                    },{
                        value:'已联系相关单位',
                        label:'已联系相关单位',
                        children:[{
                            value:'联系后勤保障部',
                            label:'联系后勤保障部'
                        },{
                            value:'联系当事相关学院',
                            label:'联系当事相关学院'
                        },{
                            value:'联系当事机关单位',
                            label:'联系当事机关单位'
                        }]
                    }]
                },{
                    value:'其他',
                    label:'其他'
                }],
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
                    collegeUnit:'',
                    address:'',
                    contact:''
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
                    collegeUnit:'',
                    address:'',
                    contact:''
                },
                situationOfCase:{
                    address:'',
                    period:'',
                    detail:''
                },
                caseDisposal:{
                    ifKnowPublicSecurity:'true',
                    ifViewMonitoring:'false',
                    ifViewMonitored:'false',
                    videoInformation:'',
                    reason:'',
                    result:[],
                    inCampus:true
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
                            {required: true, message: '姓名不能为空', trigger: 'blur'}
                        ]
                    },
                    situationOfCase: {
                        address: [
                            {required: true, message: '案发地点不能为空', trigger: 'blur'}
                        ],
                        period: [
                            {type:'array', required: true, message: '案发时间段不能为空', trigger: 'blur'}
                        ],
                        'period[0]': [
                            {type:'date', required: true, message: '案发时间段不能为空', trigger: 'blur'}
                        ]
                    }
                }
            }
        },
        methods: {
            ok(){
                console.log(this.caseDisposal.result)
            },
            getTime(date){
                this.caseInformation.caseTime = date;
                console.log(this.caseInformation.caseTime)
            },
            getDate(val){
                this.period= val;
                console.log(this.period)
            },
            entering(formName){
                //案件录入
                let isValidate = false
                this.$refs['caseInformation'].validate((valid) => {
                    if (valid) {
                        this.$refs['reportPerson'].validate((vali) => {
                            if (vali) {
                                this.$refs['situationOfCase'].validate((val) => {
                                    if (val) {
                                        isValidate = true
                                    }
                                })
                            }
                        })
                    }
                })

                if (isValidate) {
                    this.$post(`/api/schoolPersonnelRegistrationcase/`,{
                            "caseInformation":this.caseInformation,
                            "reportPerson":[this.reportPerson],
                            "victim":[this.victim],
                            "suspectCase":[{}],
                            "caseWitness":[{}],
                            "lossOfFinancialSituation":{},
                            "situationOfCase":{
                                "address":this.situationOfCase.address,
                                "perioda":this.situationOfCase.period,
                                "detail":this.situationOfCase.detail
                            },
                            "caseDisposal":this.caseDisposal
                        }
                    ).then(res=>{
                        console.log(res);
//              this.caseInformation = {};
                        this.radio1 = '1';
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
                            collegeUnit:'',
                            address:'',
                            contact:''
                        };
                        this.victim = {
                            name:'',
                            gender:'',
                            age:'',
                            national:'',
                            occupation:'',
                            cardtype:'',
                            licenseNumber:'',
                            cultralLevel:'',
                            collegeUnit:'',
                            address:'',
                            contact:''
                        };
                        this.situationOfCase = {
                            address:[],
                            period:'',
                            detail:''
                        };
                        this.suspectCase = {};
                        this.caseWitness = {};
                        this.lossOfFinancialSituation = {};
                        this.caseDisposal = {
                            ifKnowPublicSecurity:'true',
                            ifViewMonitoring:'false',
                            ifViewMonitored:'false',
                            videoInformation:'',
                            reason:'',
                            result:[],
                            inCampus:true
                        };
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
                    res.body.occupation[1] && (this.occupations = res.body.occupation[1].tup);
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
                                siteC = {
                                    value:res.body.address[i].tup[e].tup[j].value,
                                    label:res.body.address[i].tup[e].tup[j].value
                                };
                                siteB.children && siteB.children.push(siteC)
                            }
                            siteA.children && siteA.children.push(siteB)
                        }
                        site.push(siteA);
                    }
                    this.addresss = site;
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
        },
        mounted: function () {
            this.caseType();
        },
        watch: {
            radio1:function () {
                if(this.radio1=='1'){
                    this.on_off1 = false;
                }else {
                    this.on_off1 = true;
                }
            },
            'caseDisposal.ifViewMonitoring':function () {
                if(this.caseDisposal.ifViewMonitoring=='true'){
                    this.on_off2 = true;
                }else {
                    this.on_off2 = false;
                }
            },
            'caseDisposal.ifViewMonitored':function () {
                if(this.caseDisposal.ifViewMonitored=='true'){
                    this.on_off3 = false;
                    this.on_off4 = true;
                }else {
                    this.on_off3 = true;
                    this.on_off4 = false;
                }
            }
        }
    }
</script>
<style scoped>

</style>

