<template>
    <div>
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
            <el-button type="message" @click="print">点击打印</el-button>
        </div>
        <div style="text-align: left;margin-top:20px;">报案人签名：</div>
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
                            {type: 'number',max:32767, message: '请填写小于32767整数', trigger: 'blur'}
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
                            id: 1,
                        },
                        {
                            name: '学生证',
                            id: 2,
                        },
                        {
                            name: '身份证',
                            id: 3,
                        },
                    ],
                    educations: [
                        {
                            name: '小学',
                            id: 1,
                        },
                        {
                            name: '初中',
                            id: 2,
                        },
                        {
                            name: '高中',
                            id: 3,
                        },
                        {
                            name: '专科',
                            id: 4,
                        },
                        {
                            name: '本科',
                            id: 5,
                        },
                        {
                            name: '硕士',
                            id: 6,
                        },
                        {
                            name: '博士',
                            id: 7,
                        },
                    ],
                },
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

                    let qs = require('qs');
                    let instance = axios.create({
                        headers: {'Content-Type': 'application/json'}
                    });
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
                    axios.post("http://120.79.137.221:801/api/v1/cases/", data)
                        .then((res) => {
                            this.success("案件录入成功！");
                            this.print();
                            this.reportClose();
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
                let instance = axios.create({
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                });
                axios.get("http://120.79.137.221:801/api/v1/casetype/")
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
                let instance = axios.create({
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                });
                axios.get("http://120.79.137.221:801/api/v1/address/")
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
                let instance = axios.create({
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                });
                instance.get("http://120.79.137.221:801/api/v1/profession/")
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
                document.getElementsByClassName("left")[0].style.display = 'none';
                window.print();
                document.getElementsByClassName("left")[0].style.display = 'block';
                return false;
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
        }
    }
</script>
<style scoped>

</style>
