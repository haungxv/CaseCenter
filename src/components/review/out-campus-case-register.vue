<template>
    <div>
        <!--案件详细信息-->
        <div class="print_1">
            <div style="text-align: left">
                报案类型
                <hr>
                <el-form :inline="true">
                    <el-form-item label="登记时间:" style="width: 40%">{{caseInformation.caseTime}}</el-form-item>
                    <el-form-item label="报案类型:" style="width: 40%">{{print_caseType}}</el-form-item>
                </el-form>
            </div>
            <div style="text-align: left">
                报案人信息
                <hr>
                <el-form :inline="true">
                    <el-form-item label="姓名:" style="width: 30%">{{reporter.name}}</el-form-item>
                    <el-form-item label="性别:" style="width: 30%">{{reporter.gender?'男':'女'}}</el-form-item>
                    <el-form-item label="年龄:" style="width: 30%">{{reporter.age}}</el-form-item>
                    <el-form-item label="民族:" style="width: 30%">{{reporter.nation}}</el-form-item>
                    <el-form-item label="职业或身份:" style="width: 30%">{{reporter.profession}}</el-form-item>
                    <el-form-item label="证件类型:" style="width: 30%">{{reporter.identity_document}}</el-form-item>
                    <el-form-item label="证件号:" style="width: 30%">{{reporter.identity_number}}</el-form-item>
                    <el-form-item label="文化程度:" style="width: 30%">{{reporter.education}}</el-form-item>
                    <el-form-item label="年级:" style="width: 30%">{{reporter.grade}}</el-form-item>
                    <el-form-item label="学院或单位:" style="width: 30%">{{reporter.work_place}}</el-form-item>
                    <el-form-item label="联系方式:" style="width: 30%">{{reporter.phone}}</el-form-item>
                    <el-form-item label="住址:" style="width: 100%">{{reporter.home_addr}}</el-form-item>
                </el-form>
            </div>
            <div v-if="!show_suffer" style="text-align: left;margin-bottom:25px;">报案人与受害者为同一人</div>
            <div style="text-align: left" v-if="show_suffer">
                受害人信息
                <hr>
                <el-form :inline="true">
                    <el-form-item label="姓名:" style="width: 30%">{{sufferer.name}}</el-form-item>
                    <el-form-item label="性别:" style="width: 30%">{{sufferer.gender?'男':'女'}}</el-form-item>
                    <el-form-item label="年龄:" style="width: 30%">{{sufferer.age}}</el-form-item>
                    <el-form-item label="民族:" style="width: 30%">{{sufferer.nation}}</el-form-item>
                    <el-form-item label="职业或身份:" style="width: 30%">{{sufferer.profession}}</el-form-item>
                    <el-form-item label="证件类型:" style="width: 30%">{{sufferer.identity_document}}</el-form-item>
                    <el-form-item label="证件号:" style="width: 30%">{{sufferer.identity_number}}</el-form-item>
                    <el-form-item label="文化程度:" style="width: 30%">{{sufferer.education}}</el-form-item>
                    <el-form-item label="年级:" style="width: 30%">{{sufferer.grade}}</el-form-item>
                    <el-form-item label="学院或单位:" style="width: 30%">{{sufferer.work_place}}</el-form-item>
                    <el-form-item label="联系方式:" style="width: 30%">{{sufferer.phone}}</el-form-item>
                    <el-form-item label="住址:" style="width: 100%">{{sufferer.home_addr}}</el-form-item>
                </el-form>
            </div>
            <div style="text-align: left">
                案发情况
                <hr>
                <el-form :inline="true">
                    <el-form-item label="案发地点:" style="width: 100%">{{print_occur_place}}</el-form-item>
                    <el-form-item label="案发时间段:" style="width: 100%">
                        {{caseInformation.period[0]}}—{{caseInformation.period[1]}}
                    </el-form-item>
                    <el-form-item label="案情:" style="width: 100%">{{caseInformation.desc}}</el-form-item>
                </el-form>
            </div>
            <div style="text-align: left">
                <hr>
                <el-form :inline="true">
                    <el-form-item label="是否查看监控:" style="width: 100%">{{saw_monitoring?'是':'否'}}</el-form-item>
                    <el-form-item label="是否通知公安机关等部门:" style="width: 100%">{{called_police?'是':'否'}}</el-form-item>
                </el-form>
            </div>
            <div style="text-align: left;margin-top:20px;">报案人签名：</div>
        </div>
        <div class="down_1">
            <div style="text-align: left;margin-top: 20px">
                <span>报案类型</span>
                <hr>
                <el-form :model="caseInformation" :rules="rules.baseInfo" ref="case_1" :inline="true">
                    <el-form-item label="登记时间" prop="caseTime">
                        <el-date-picker
                                v-model="caseInformation.caseTime"
                                type="datetime"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="报案类型" prop="caseType">
                        <el-cascader
                                expand-trigger="hover"
                                :options="caseInformation.caseTypes"
                                v-model="caseInformation.caseType"
                                placeholder="请选择报案类型">
                        </el-cascader>
                    </el-form-item>
                </el-form>
            </div>
            <div style="text-align: left;margin-top: 20px">
                <span>报案人信息</span>
                <hr>
                <el-form :model="reporter" :inline="true" :rules="rules.componentInfo" ref="case_3">
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="reporter.name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio class="radio" v-model="reporter.gender" :label='true'>男</el-radio>
                        <el-radio class="radio" v-model="reporter.gender" :label='false'>女</el-radio>
                    </el-form-item>
                    <el-form-item label="年龄" prop="age">
                        <el-input v-model.number="reporter.age"></el-input>
                    </el-form-item>
                    <el-form-item label="民族(国籍)">
                        <el-input v-model="reporter.nation"></el-input>
                    </el-form-item>
                    <el-form-item label="职业或身份">
                        <el-select v-model="reporter.profession" placeholder="请选择">
                            <el-option
                                    v-for="item in info.professions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="证件类型">
                        <el-select v-model="reporter.identity_document" placeholder="请选择">
                            <el-option
                                    v-for="item in info.identity_types"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="证件号">
                        <el-input v-model="reporter.identity_number"></el-input>
                    </el-form-item>
                    <el-form-item label="文化程度">
                        <el-select v-model="reporter.education" placeholder="请选择">
                            <el-option
                                    v-for="item in info.educations"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="单位">
                        <el-input v-model="reporter.work_place"></el-input>
                    </el-form-item>
                    <el-form-item label="住址">
                        <el-input v-model="reporter.home_addr"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式">
                        <el-input v-model="reporter.phone"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div style="text-align: left;margin-top: 20px">
                <span style="margin-right: 20px">报案人是否与受害人为同一人:</span>
                <el-radio class="radio" v-model="samePerson" label="1">是</el-radio>
                <el-radio class="radio" v-model="samePerson" label="0">否</el-radio>
                <div style="margin-top: 20px" v-if="show_suffer">
                    <span>受害人信息</span>
                    <hr>
                    <el-form :model="sufferer" :inline="true" :rules="rules.componentInfo">
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="sufferer.name"></el-input>
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-radio class="radio" v-model="sufferer.gender" :label='true'>男</el-radio>
                            <el-radio class="radio" v-model="sufferer.gender" :label='false'>女</el-radio>
                        </el-form-item>
                        <el-form-item label="年龄" prop="age">
                            <el-input v-model.number="sufferer.age"></el-input>
                        </el-form-item>
                        <el-form-item label="民族(国籍)">
                            <el-input v-model="sufferer.nation"></el-input>
                        </el-form-item>
                        <el-form-item label="职业或身份">
                            <el-select v-model="sufferer.profession" placeholder="请选择">
                                <el-option
                                        v-for="item in info.professions"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="证件类型">
                            <el-select v-model="sufferer.identity_document" placeholder="请选择">
                                <el-option
                                        v-for="item in info.identity_types"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="证件号">
                            <el-input v-model="sufferer.identity_number"></el-input>
                        </el-form-item>
                        <el-form-item label="文化程度">
                            <el-select v-model="sufferer.education" placeholder="请选择">
                                <el-option
                                        v-for="item in info.educations"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="单位">
                            <el-input v-model="sufferer.work_place"></el-input>
                        </el-form-item>
                        <el-form-item label="住址">
                            <el-input v-model="sufferer.home_addr"></el-input>
                        </el-form-item>
                        <el-form-item label="联系方式">
                            <el-input v-model="sufferer.phone"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div style="margin-top: 20px;text-align: left">
                案发情况
                <hr>
                <el-form :model="caseInformation" :inline="true" ref="case_2" :rules="rules.baseInfo">
                    <el-form-item label="案发时间段" prop="period">
                        <el-date-picker
                                v-model="caseInformation.period"
                                type="datetimerange"
                                placeholder="选择时间范围">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="案发地点" prop="occur_place">
                        <el-cascader
                                expand-trigger="hover"
                                :options="caseInformation.occur_places"
                                v-model="caseInformation.occur_place"
                                placeholder="请选择报案类型">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="案情">
                        <el-input type="textarea" v-model="caseInformation.desc" :rows="5" placeholder="请输入内容"
                                  style="width: 1000px"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div style="text-align: left;margin-top: 20px">
                <hr>
                <span style="margin-top: 20px">报案人是否通知公安机关等部门:</span>
                <el-radio class="radio" v-model="called_police" :label=true>是</el-radio>
                <el-radio class="radio" v-model="called_police" :label=false>否</el-radio>
            </div>
            <div style="text-align: left;margin-top: 20px">
                <span style="margin-right: 20px">报案人是否查看监控:</span>
                <el-radio class="radio" v-model="saw_monitoring" :label=true>是</el-radio>
                <el-radio class="radio" v-model="saw_monitoring" :label=false>否</el-radio>
            </div>
            <div style="text-align: left;margin-top: 20px">
                <el-button type="success" @click="report('case_1','case_2','case_3')">报 案</el-button>
                <!--<el-button type="message" @click="print">点击打印</el-button>-->
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'

    import {
        mapState,
        mapMutations,
    } from 'vuex'

    export default {
        props:['msgOut'],
        data() {
            return {
                rules: {
                    baseInfo: {
                        caseTime: [
                            {required: true, message: '请选择日期时间', trigger: 'blur'}
                        ],
                        caseType: [
                            {required: true, message: '请选择报案类型', trigger: 'blur'}
                        ],
                        occur_place: [
                            {required: true, message: '案发地点不能为空', trigger: 'blur'}
                        ],
                        period: [
                            {required: true, message: '案发时间段不能为空', trigger: 'blur'}
                        ]
                    },
                    componentInfo: {
                        name: [
                            {required: true, message: '姓名不能为空', trigger: 'blur'}
                        ],
                        age: [
                            {type: 'number', max: 32767, message: '请填写小于32767整数', trigger: 'blur'}
                        ]
                    },
                },
                caseInformation: {
                    caseTime: '',//登记时间
                    caseType: [],//案件类型
                    registrant: '',//案件登记人
                    occur_place: [],//案发地点
                    period: '',//案发时间段
                    desc: '',//案情
                    caseTypes: [],
                    occur_places: [],
                },
                reporter: { //报案人信息
                    age: null,
                    grade: null,
                    gender: Boolean,
                    education: null,//学历
                    home_addr: "",//住址
                    identity_document: null,
                    identity_number: "",
                    name: "",
                    nation: "",
                    phone: "",
                    profession: null,//职业或者身份
                    work_place: null//学院或者单位
                },

                samePerson: '1',//报案人与受害人是否为同一人,1为是,0为否
                show_suffer: false,//是否展示受害人信息
                sufferer: {//受害人信息
                    age: null,
                    grade: null,
                    gender: Boolean,
                    education: null,//学历
                    home_addr: "",//住址
                    identity_document: null,
                    identity_number: "",
                    name: "",
                    nation: "",
                    phone: "",
                    profession: null,//职业或者身份
                    work_place: null//学院或者单位
                },

                called_police: false,//是否通知公安机关等部门
                saw_monitoring: false,//是否查看监控

                info: {
                    professions: [],
                    identity_types: [
                        {
                            name: '护照',
                            id: 0,
                        },
                        {
                            name: '学生证',
                            id: 1,
                        },
                        {
                            name: '身份证',
                            id: 2,
                        },
                    ],
                    educations: [
                        {
                            name: '小学',
                            id: 0,
                        },
                        {
                            name: '初中',
                            id: 1,
                        },
                        {
                            name: '高中',
                            id: 2,
                        },
                        {
                            name: '专科',
                            id: 3,
                        },
                        {
                            name: '本科',
                            id: 4,
                        },
                        {
                            name: '硕士',
                            id: 5,
                        },
                        {
                            name: '博士',
                            id: 6,
                        },
                    ],
                },
                print_caseType: '',
                print_occur_place: '',
            }
        },
        methods: {
            report(formName1, formName2, formName3) {
                //案件录入
                let p1 = new Promise((resolve, reject) => {
                    this.$refs[formName1].validate((valid) => {
                        if (valid) {
                            resolve();
                        }
                    })
                });
                let p2 = new Promise((resolve, reject) => {
                    this.$refs[formName2].validate((valid) => {
                        if (valid) {
                            resolve();
                        }
                    })
                });
                let p3 = new Promise((resolve, reject) => {
                    this.$refs[formName3].validate((valid) => {
                        if (valid) {
                            resolve();
                        }
                    })
                });
                Promise.all([p2, p1, p3]).then(() => {
                    if (!this.show_suffer) {
                        this.sufferer = null;
                    } else {
                        if (this.sufferer.name === '') {
                            this.$message('受害人姓名不能为空！');
                            return;
                        }
                    }
                    let case_type = '', occur_place = '';
                    case_type = (this.caseInformation.caseType.length === 1) ? this.caseInformation.caseType[0] : this.caseInformation.caseType[1];
                    occur_place = (this.caseInformation.occur_place.length === 1) ? this.caseInformation.occur_place[0] : this.caseInformation.occur_place[1];

                    let data = {
                        "occur_time": this.caseInformation.caseTime,
                        "registrant": null,
                        "case_type": case_type,
                        "reporter": this.reporter,
                        "sufferer": this.sufferer,
                        "occur_place": occur_place,
                        "start_time": this.caseInformation.period[0],
                        "end_time": this.caseInformation.period[0],
                        "desc": this.caseInformation.desc,
                        "deal_status": 0,
                        "check_status": 0,
                        "called_police": this.called_police,
                        "saw_monitoring": this.saw_monitoring,
                    };
                    this.$post("/api/v1/cases/", data)
                        .then((res) => {
                            this.success("案件录入成功！");
                            this.print();
                            this.$nextTick(() => {
                                this.reportClose();
                            });
                        })
                        .catch((err) => {
                            this.fail(err);
                        });
                });
            },
            reportClose() {
                this.caseInformation.caseTime = '';
                this.caseInformation.caseType = [];
                this.caseInformation.registrant = '';
                this.caseInformation.occur_place = [];
                this.caseInformation.period = '';
                this.caseInformation.desc = '';

                this.reporter = { //报案人信息
                    age: null,
                    grade: null,
                    gender: Boolean,
                    education: null,//学历
                    home_addr: "",//住址
                    identity_document: null,
                    identity_number: "",
                    name: "",
                    nation: "",
                    phone: "",
                    profession: null,//职业或者身份
                    work_place: null//学院或者单位
                };
                this.samePerson = '1';//报案人与受害人是否为同一人,1为是,0为否
                this.show_suffer = false;//是否展示受害人信息
                this.sufferer = {//受害人信息
                    age: null,
                    grade: null,
                    gender: Boolean,
                    education: null,//学历
                    home_addr: "",//住址
                    identity_document: null,
                    identity_number: "",
                    name: "",
                    nation: "",
                    phone: "",
                    profession: null,//职业或者身份
                    work_place: null//学院或者单位
                };
                this.called_police = false;//是否通知公安机关等部门
                this.saw_monitoring = false;//是否查看监控
                this.print_caseType = '';
                this.print_occur_place = '';
            },

            getList(res) {
                //案发地点，案件类型,发送请求之后取得返回值整理数据结构
                let length = res.data.length;
                let array_1 = [];
                let array_2 = [];
                for (let i = 0; i < length; i++) {
                    if (res.data[i].is_parent) {
                        array_1.push({
                            id: res.data[i].id,
                            label: res.data[i].name,
                            value: res.data[i].name,
                            children: [],
                        })
                    } else {
                        array_2.push({
                            id: res.data[i].id,
                            label: res.data[i].name,
                            value: res.data[i].name,
                            parent: res.data[i].parent
                        })
                    }
                }
                let length_1 = array_1.length;
                let length_2 = array_2.length;

                for (let i = 0; i < length_2; i++) {
                    for (let j = 0; j < length_1; j++) {
                        if (array_1[j].id === array_2[i].parent) {
                            array_1[j].children.push(array_2[i]);
                        }
                    }
                }
                return array_1;
            },
            caseType() {
                //获取案件类型
                this.$get("/api/v1/casetype/")
                    .then((res) => {
                        let array_1 = this.getList(res);
                        let array_2 = [];
                        let length = array_1.length;
                        for (let i = 0; i < length; i++) {
                            let length_1 = array_1[i].children.length;
                            if (length_1 === 0) {
                                array_2.push({
                                    label: array_1[i].label,
                                    value: array_1[i].value,
                                });
                            } else {
                                array_2.push({
                                    label: array_1[i].label,
                                    value: array_1[i].value,
                                    children: [],
                                });
                                for (let j = 0; j < length_1; j++) {
                                    array_2[i].children.push({
                                        label: array_1[i].children[j].value,
                                        value: array_1[i].children[j].label,
                                    })
                                }
                            }
                        }
                        this.caseInformation.caseTypes = array_2;
                        // this['setLabelType'](res.data);
                    })
                    .catch((err) => {
                        this.fail('获取案件类型失败！');
                    });
            },
            casePosition() {
                //获取案发地点
                this.$get("/api/v1/address/")
                    .then((res) => {
                        let array_1 = this.getList(res);
                        let array_2 = [];
                        let length = array_1.length;
                        for (let i = 0; i < length; i++) {
                            let length_1 = array_1[i].children.length;
                            if (length_1 === 0) {
                                array_2.push({
                                    label: array_1[i].label,
                                    value: array_1[i].value,
                                });
                            } else {
                                array_2.push({
                                    label: array_1[i].label,
                                    value: array_1[i].value,
                                    children: [],
                                });
                                for (let j = 0; j < length_1; j++) {
                                    array_2[i].children.push({
                                        label: array_1[i].children[j].value,
                                        value: array_1[i].children[j].label,
                                    })
                                }
                            }
                        }
                        this.caseInformation.occur_places = array_2;
                        // this['setLabelPosition'](res.data);
                    })
                    .catch((err) => {
                        this.fail('获取案发地点失败！');
                    });
            },
            profession() {
                //获取职业或者身份
                this.$get("/api/v1/profession/")
                    .then((res) => {
                        let length = res.data.length;
                        let array_1 = [];
                        let array_2 = [];
                        for (let i = 0; i < length; i++) {
                            if (res.data[i].in_school) {
                                array_1.push({
                                    id: res.data[i].id,
                                    name: res.data[i].name,
                                })
                            } else {
                                array_2.push({
                                    id: res.data[i].id,
                                    name: res.data[i].name,
                                })
                            }
                        }
                        this.info.professions = array_2;
                    })
                    .catch((err) => {
                        this.fail('获取职业或身份失败！');
                    });
            },
            print() {
                //处理时间格式问题
                this.caseInformation.caseTime = this.changeTime_print(this.caseInformation.caseTime);
                let array = [];
                array.push(this.changeTime_print(this.caseInformation.period[0]));
                array.push(this.changeTime_print(this.caseInformation.period[1]));
                this.caseInformation.period = array;
                this.print_caseType = (this.caseInformation.caseType.length === 1) ? this.caseInformation.caseType[0] : this.caseInformation.caseType[1];
                this.print_occur_place = (this.caseInformation.occur_place.length === 1) ? this.caseInformation.occur_place[0] : this.caseInformation.occur_place[1];
                //处理学历表示问题
                this.handleEducation(this.reporter);
                if (this.sufferer) {
                    this.handleEducation(this.sufferer);
                }
                if (this.suspect) {
                    this.handleEducation(this.suspect);
                }
                //处理证件类型问题
                this.handleIdentityDocument(this.reporter);
                if (this.sufferer) {
                    this.handleIdentityDocument(this.sufferer);
                }
                if (this.suspect) {
                    this.handleIdentityDocument(this.suspect);
                }
                this.$nextTick(() => {
                    document.getElementsByClassName("print_1")[0].style.display = 'block';
                    document.getElementsByClassName("left")[0].style.display = 'none';
                    document.getElementsByClassName("down_1")[0].style.display = 'none';
                    window.print();
                    document.getElementsByClassName("left")[0].style.display = 'block';
                    document.getElementsByClassName("down_1")[0].style.display = 'block';
                    document.getElementsByClassName("print_1")[0].style.display = 'none';
                });
                return false;

            },
            formTime(str) {
                //规范分钟和秒的格式
                return str > 9 ? (str) : ("0" + str);
            },
            changeTime_print(time) {
                //将中国标准时间转换为年-月-日格式
                if (time === '' || time === null) {
                    return '';
                } else {
                    if (time.getFullYear) {
                        let year = time.getFullYear();
                        let month = time.getMonth() + 1;
                        let day = time.getDate();
                        let hour = time.getHours(); //获取时
                        let minu = time.getMinutes(); //获取分钟
                        let sec = time.getSeconds(); //获取秒钟
                        return year + "-" + this.formTime(month) + "-" + this.formTime(day) + ' ' + this.formTime(hour) + ':' + this.formTime(minu) + ':' + this.formTime(sec);
                    } else {
                        return time;
                    }
                }
            },
            handleEducation(object) {
                switch (object.education) {
                    case 0:
                        object.education = "小学";
                        break;
                    case 1:
                        object.education = "初中";
                        break;
                    case 2:
                        object.education = "高中";
                        break;
                    case 3:
                        object.education = "专科";
                        break;
                    case 4:
                        object.education = "本科";
                        break;
                    case 5:
                        object.education = "硕士";
                        break;
                    case 6:
                        object.education = "博士";
                        break;
                    default :
                        break;
                }
            },
            handleIdentityDocument(object) {
                switch (object.identity_document) {
                    case 0:
                        object.identity_document = "护照";
                        break;
                    case 1:
                        object.identity_document = "学生证";
                        break;
                    case 2:
                        object.identity_document = "身份证";
                        break;
                    default :
                        break;
                }
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
        },
        computed: {
            ...mapState({
                token: state => state.token,
            })
        },
        mounted() {
            axios.defaults.headers.common['Authorization'] = "JWT " + this.token;
            this.caseType();
            this.casePosition();
            this.profession();
        },
        watch: {
            samePerson: function () {
                this.show_suffer = (this.samePerson === '1') ? false : true;
            },
            msgOut: function () {
                this.caseType();
                this.casePosition();
                this.profession();
            }
        }
    }
</script>
<style scoped>
    .print_1 {
        display: none;
    }
</style>
