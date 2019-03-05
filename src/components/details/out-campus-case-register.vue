<template>
    <div>
        <div style="text-align: left;margin-top: 20px">
            <span>报案类型</span>
            <hr>
            <el-form :model="caseInformation" :rules="rules.baseInfo" ref="caseInformation" :inline="true">
                <el-form-item label="登记时间" prop="caseTime">
                    <el-date-picker
                            v-model="caseInformation.caseTime"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="报案类型" prop="caseType">
                    <el-select v-model="caseInformation.caseType" placeholder="请选择活动区域">
                        <el-option
                                v-for="item in caseInformation.caseTypes"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="案件录入人" prop="registrant">
                    <el-input v-model="caseInformation.registrant"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div style="text-align: left;margin-top: 20px">
            <span>报案人信息</span>
            <hr>
            <info :a="reporter"></info>
        </div>
        <div style="text-align: left;margin-top: 20px">
            <span style="margin-right: 20px">报案人是否与受害人为同一人:</span>
            <el-radio class="radio" v-model="samePerson" label="1">是</el-radio>
            <el-radio class="radio" v-model="samePerson" label="0">否</el-radio>
            <div style="margin-top: 20px" v-if="show_suffer">
                <span>受害人信息</span>
                <hr>
                <info :a="sufferer"></info>
            </div>
        </div>
        <div style="margin-top: 20px;text-align: left">
            案发情况
            <hr>
            <el-form :model="caseInformation" :inline="true" :rules="rules.situationOfCase">
                <el-form-item label="案发地点" prop="address">
                    <el-input v-model="caseInformation.occur_place"></el-input>
                </el-form-item>
                <el-form-item label="案发时间段" prop="period">
                    <el-date-picker
                            v-model="caseInformation.period"
                            type="datetimerange"
                            placeholder="选择时间范围">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="案情">
                    <el-input type="textarea" v-model="caseInformation.desc" :rows="5" placeholder="请输入内容"
                              style="width: 1000px"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div style="text-align: left;margin-top: 20px">
            <hr>
            <span style="margin: 0 20px">报案人是否通知公安机关等部门:</span>
            <el-radio class="radio" v-model="called_police" label=true>是</el-radio>
            <el-radio class="radio" v-model="called_police" label=false>否</el-radio>
        </div>
        <div style="text-align: left;margin-top: 20px">
            案件处置结果
            <hr>
            <span style="margin-right: 20px">报案人是否查看监控:</span>
            <el-radio class="radio" v-model="saw_monitoring" label=true>是</el-radio>
            <el-radio class="radio" v-model="saw_monitoring" label=false>否</el-radio>
        </div>
        <div style="text-align: left;margin-top: 20px">
            <el-button type="success" @click="report()">报 案</el-button>
        </div>
    </div>
</template>
<script>

    import Info from '../multi/register_out.vue'
    import axios from 'axios';

    export default {
        components: {Info},
        data() {
            return {
                rules: {
                    baseInfo: {
                        caseTime: [
                            {required: true, message: '请选择日期时间', trigger: 'change'}
                        ],
                        caseType: [
                            {required: true, message: '请选择报案类型', trigger: 'change'}
                        ],
                        registrant: [
                            {required: true, message: '请输入案件录入人', trigger: 'blur'}
                        ]
                    },
                    situationOfCase: {
                        address: [
                            {required: true, message: '案发地点不能为空', trigger: 'blur'}
                        ],
                        period: [
                            {required: true, message: '案发时间段不能为空', trigger: 'blur'}
                        ]
                    }
                },
                caseInformation: {
                    caseTime: '',//登记时间
                    caseType: '',//案件类型
                    registrant: '',//案件登记人
                    occur_place: '',//案发地点
                    period: '',//案发时间段
                    desc: '',//案情
                    caseTypes: [
                        {
                            name: '盗刷饭卡',
                            id: 1,
                        },
                        {
                            name: '诈骗',
                            id: 2,
                        },
                        {
                            name: '伤害',
                            id: 3,
                        },
                        {
                            name: '毁坏财物',
                            id: 4,
                        },
                        {
                            name: '未关门窗',
                            id: 5,
                        },
                        {
                            name: '火警',
                            id: 6,
                        },
                        {
                            name: '性骚扰',
                            id: 7,
                        },
                        {
                            name: '扰乱秩序',
                            id: 8,
                        },
                        {
                            name: '不文明行为',
                            id: 9,
                        },
                        {
                            name: '推销',
                            id: 10,
                        },
                        {
                            name: '纠纷',
                            id: 11,
                        },
                        {
                            name: '交通肇事',
                            id: 12,
                        },
                        {
                            name: '交通违章',
                            id: 13,
                        },
                        {
                            name: '破坏周围网',
                            id: 14,
                        },
                        {
                            name: '通知维修',
                            id: 15,
                        },
                        {
                            name: '通知消防科',
                            id: 16,
                        },
                        {
                            name: '救助服务',
                            id: 17,
                        },
                        {
                            name: '失物招领',
                            id: 18,
                        },
                        {
                            name: '咨询、投诉和建议',
                            id: 19,
                        },
                        {
                            name: '遗失',
                            id: 20,
                        },
                        {
                            name: '其他',
                            id: 21,
                        }
                    ],
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
                    age: '',
                    grade: '',
                    gender: true,
                    education: 0,
                    home_addr: '宿舍',
                    identity_document: 1,
                    identity_number: '123',
                    name: '的事实',
                    nation: '中国',
                    phone: '123',
                    profession: 3,
                    work_place: '保卫处'
                },

                samePerson: '1',//报案人与受害人是否为同一人,1为是,0为否
                show_suffer: false,//是否展示受害人信息
                sufferer: {//受害人信息
                    age: '',
                    grade: '',
                    gender: '',
                    education: '',
                    home_addr: '',
                    identity_document: '',
                    identity_number: '',
                    name: '',
                    nationa: '',
                    phone: '',
                    profession: '',
                    work_place: ''
                },
                called_police: false,//是否通知公安机关等部门
                saw_monitoring: false,//是否查看监控
            }
        },
        methods: {
            report() {
                //案件录入
                if (!this.show_suffer) {
                    this.sufferer = null;
                }
                let qs = require('qs');
                let instance = axios.create({
                    headers: {'Content-Type': 'application/json'}
                });
                let data = {
                    "occur_time": "2019-04-09T16:00:00",
                    // "registrant": this.caseInformation.registrant,
                    "case_type": 1,
                    "reporter": this.reporter,
                    "sufferer": this.sufferer,
                    "occur_place": this.caseInformation.occur_place,
                    "start_time": "2019-04-09T16:00:00",
                    "end_time": "2019-04-09T16:00:00",
                    "desc": this.caseInformation.desc,
                    "deal_status": 0,
                    "check_status": 0,
                    "called_police": this.called_police,
                    "saw_monitoring": this.saw_monitoring,
                };
                axios.post("http://120.79.137.221:801/api/v1/cases/", data)
                    .then((res) => {

                    })
                    .catch((err) => {

                    });
            },
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
