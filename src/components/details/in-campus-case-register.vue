<template>
    <div class="print_All">
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
            <info :a="reporter" :b="rules.componentInfo"></info>
        </div>
        <div style="text-align: left;margin-top: 20px">
            <span style="margin-right: 20px">报案人是否与受害人为同一人:</span>
            <el-radio class="radio" v-model="samePerson" label="1">是</el-radio>
            <el-radio class="radio" v-model="samePerson" label="0">否</el-radio>
            <div style="margin-top: 20px" v-if="show_suffer">
                <span>受害人信息</span>
                <hr>
                <info :a="sufferer" :b="rules.componentInfo"></info>
            </div>
        </div>
        <div style="margin-top: 20px;text-align: left">
            案发情况
            <hr>
            <el-form :model="caseInformation" :rules="rules.baseInfo" ref="case_2" :inline="true">
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
            <span>嫌疑人信息</span>
            <hr>
            <span style="margin-right: 20px">是否有嫌疑人:</span>
            <el-radio class="radio" v-model="hasSuspect" label="1">是</el-radio>
            <el-radio class="radio" v-model="hasSuspect" label="0">否</el-radio>
            <div style="margin-top: 20px" v-if="show_suspect">
                <info :a="suspect" :b="rules.componentInfo"></info>
            </div>
        </div>
        <div style="text-align: left;margin-top: 20px">
            <span>案件证人信息</span>
            <hr>
            <span style="margin-right: 20px">是否有案件证人:</span>
            <el-radio class="radio" v-model="hasWitness" label="1">是</el-radio>
            <el-radio class="radio" v-model="hasWitness" label="0">否</el-radio>
            <div style="margin-top: 20px" v-if="show_witness">
                <info :a="witness" :b="rules.componentInfo"></info>
            </div>
        </div>
        <div style="text-align: left;margin-top: 20px">
            <span>损失财物情况</span>
            <hr>
            <span style="margin-right: 20px">是否有损失财物:</span>
            <el-radio class="radio" v-model="has_loss" label="1">是</el-radio>
            <el-radio class="radio" v-model="has_loss" label="0">否</el-radio>
            <div style="margin-top: 20px" v-if="show_loss">
                <el-form :model="loss" :rules="rules.lossInfo" ref="case_3" :inline="true">
                    <el-form-item label="损失物品名称" prop="name">
                        <el-input v-model="loss.name"></el-input>
                    </el-form-item>
                    <el-form-item label="所有权性质">
                        <el-select v-model="loss.is_private" placeholder="请选择">
                            <el-option
                                    v-for="item in caseInformation.owner"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="品牌">
                        <el-input v-model="loss.brand"></el-input>
                    </el-form-item>
                    <el-form-item label="型号">
                        <el-input v-model="loss.version"></el-input>
                    </el-form-item>
                    <el-form-item label="颜色">
                        <el-input v-model="loss.color"></el-input>
                    </el-form-item>
                    <el-form-item label="其他特征">
                        <el-input v-model="loss.other_feature"></el-input>
                    </el-form-item>
                    <el-form-item label="数量">
                        <el-input v-model.number="loss.sum"></el-input>
                    </el-form-item>
                    <el-form-item label="购买时间" prop="bought_time">
                        <el-date-picker
                                v-model="loss.bought_time"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="购置价格">
                        <el-input v-model="loss.price"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div style="text-align: left;margin-top: 20px">
            <hr>
            <span>报案人是否通知公安机关等部门:</span>
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
        </div>
        <div @click="print">点击打印</div>
    </div>
</template>
<script>

    import Info from '../multi/register_in.vue'
    import axios from 'axios';
    import {
        mapState,
        mapMutations,
    } from 'vuex'

    export default {
        components: {Info},
        data() {
            return {
                rules: {
                    baseInfo: {
                        caseTime: [
                            {required: true, message: '请填写登记时间', trigger: 'blur'}
                        ],
                        caseType: [
                            {required: true, message: '请选择报案类型', trigger: 'change'}
                        ],
                        period: [
                            {required: true, message: '请选择案发时间段', trigger: 'blur'}
                        ],
                        occur_place: [
                            {required: true, message: '请选择案发地点', trigger: 'change'}
                        ],
                    },
                    componentInfo: {
                        name: [
                            {required: true, message: '姓名不能为空', trigger: 'blur'}
                        ]
                    },
                    lossInfo: {
                        name: [
                            {required: true, message: '姓名不能为空', trigger: 'blur'}
                        ],
                        bought_time: [
                            {required: true, message: '购买时间不能为空', trigger: 'blur'}
                        ],
                    }
                },

                caseInformation: {
                    caseTime: '',//登记时间
                    caseType: [],//案件类型
                    caseTypes: [],
                    registrant: '',//案件登记人
                    occur_place: [],//案发地点
                    occur_places: [],
                    period: '',//案发时间段
                    desc: '',//案情
                    owner: [
                        {
                            name: '本人所有',
                            value: true,
                        },
                        {
                            name: '非本人所有',
                            value: false
                        },
                    ],
                },

                reporter: { //报案人信息
                    age: null,
                    grade: null,
                    gender: Boolean,
                    education: null,//学历
                    home_addr: "",//住址
                    identity_document: null,
                    identity_num: "",
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
                    identity_num: "",
                    name: "",
                    nation: "",
                    phone: "",
                    profession: null,//职业或者身份
                    work_place: null//学院或者单位
                },

                hasSuspect: '0',//是否有嫌疑人,1为是,0为否
                show_suspect: false,//是否展示嫌疑人信息
                suspect: {//嫌疑人信息
                    age: null,
                    grade: null,
                    gender: Boolean,
                    education: null,//学历
                    home_addr: "",//住址
                    identity_document: null,
                    identity_num: "",
                    name: "",
                    nation: "",
                    phone: "",
                    profession: null,//职业或者身份
                    work_place: null//学院或者单位
                },

                hasWitness: '0',//是否有证人,1为是,0为否
                show_witness: false,//是否展示证人信息
                witness: {//证人信息
                    age: null,
                    grade: null,
                    gender: Boolean,
                    education: null,//学历
                    home_addr: "",//住址
                    identity_document: null,
                    identity_num: "",
                    name: "",
                    nation: "",
                    phone: "",
                    profession: null,//职业或者身份
                    work_place: null//学院或者单位
                },

                has_loss: '0',//是否有财产损失,1为是,0为否
                show_loss: false,//是否展示财产损失信息
                loss: {
                    name: '',
                    is_private: true,
                    brand: '',
                    version: '',
                    color: '',
                    other_feature: '',
                    sum: 1,
                    bought_time: '',
                    price: '',
                },

                called_police: false,//是否通知公安机关等部门
                saw_monitoring: false,//是否查看监控
            }
        },
        methods: {
            report(formName1, formName2, formName3) {
                // 案件录入
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
                // let p3 = new Promise((resolve, reject) => {
                //     this.$refs[formName3].validate((valid) => {
                //         if (valid) {
                //             resolve();
                //         }
                //     })
                // });
                Promise.all([p2, p1]).then(() => {

                    if (!this.show_suffer) {
                        this.sufferer = null;
                    }
                    if (!this.show_suspect) {
                        this.suspect = null;
                    }
                    if (!this.show_witness) {
                        this.witness = null;
                    }
                    if (!this.show_loss) {
                        this.loss = null;
                    } else {
                        this.loss.bought_time = this.changeTime(this.loss.bought_time);
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
                        "sufferer": this.sufferer,
                        "occur_place": occur_place,
                        "start_time": this.caseInformation.period[0],
                        "end_time": this.caseInformation.period[1],
                        "desc": this.caseInformation.desc,
                        "suspect": this.suspect,
                        "witness": this.witness,
                        "property_loss": this.loss,
                        "deal_status": 0,
                        "check_status": 0,
                        "called_police": this.called_police,
                        "saw_monitoring": this.saw_monitoring,
                        "reporter": this.reporter,
                    };
                    instance.post("http://120.79.137.221:801/api/v1/cases/", data)
                        .then((res) => {
                            this.success("案件录入成功！");
                        })
                        .catch((err) => {
                            this.fail("案件录入失败！");
                        });
                });
            },
            print() {
                //     let oldHtml = document.body.innerHTML;
                //     let printbox = document.getElementsByClassName("print_All")[0].innerHTML;
                //     document.body.innerHTML = printbox;
                //     window.print();
                //     document.body.innerHTML = oldHtml;
            },
            changeTime(time) {
                //将中国标准时间转换为年-月-日格式
                let year = time.getFullYear();
                let month = time.getMonth() + 1;
                let day = time.getDate();
                return year + "-" + this.formTime(month) + "-" + this.formTime(day);
            },
            formTime(str) {
                //规范分钟和秒的格式
                return str > 9 ? (str) : ("0" + str);
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
                        this['setLabelType'](res.data);
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
            ...mapMutations(['setLabelPosition', 'setLabelType']),
        }
        ,
        computed: {
            ...
                mapState({
                    token: state => state.token,
                    labelType: state => state.labelType,
                    labelPosition: state => state.labelPosition,
                })
        }
        ,
        mounted() {
            axios.defaults.headers.common['Authorization'] = "JWT " + this.token;
            this.caseType();
            this.casePosition();
        }
        ,
        watch: {
            samePerson: function () {
                this.show_suffer = (this.samePerson === '1') ? false : true;
            }
            ,
            hasSuspect: function () {
                this.show_suspect = (this.hasSuspect === '0') ? false : true;
            }
            ,
            hasWitness: function () {
                this.show_witness = (this.hasWitness === '0') ? false : true;
            }
            ,
            has_loss: function () {
                this.show_loss = (this.has_loss == '0') ? false : true;
            }
            ,

        }
    }
</script>
<style scoped>

</style>
