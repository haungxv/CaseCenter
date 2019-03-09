<template>
    <div>
        <!--案件详情弹出框-->
        <el-dialog title="案件详情" width="90%" :visible.sync="dialogVisible" :before-close="closeDetail">
            <case-dialog :caseDetail="caseDetail"
                         :caseDetailReporter="caseDetailReporter"
                         :caseDetailSuffer="caseDetailSuffer"
                         :caseDetailSuspect="caseDetailSuspect"
                         :caseDetailWitness="caseDetailWitness"
                         :caseDetailProperty="caseDetailProperty"
                         :show_suffer="show_suffer"
                         :show_suspect="show_suspect"
                         :show_witness="show_witness"
                         :show_property="show_property"
            ></case-dialog>
            <div style="text-align: left">
                审核结果
                <hr>
                <el-form :inline="true">
                    <el-form-item label="审核结果:" style="width: 20%">{{caseDetail.check_status}}</el-form-item>
                    <el-form-item label="原因:" style="width: 100%">{{caseDetail.pass_reason}}</el-form-item>
                </el-form>
            </div>
            <div style="text-align: left">
                处理结果
                <hr>
                <el-form :inline="true">
                    <el-form-item label="处理结果:" style="width: 100%">{{caseDetail.deal_result}}</el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <div style="margin-top:10px;text-align: left">
            学院或单位：
            <el-select v-model="college" placeholder="请选择" style="margin-right:20px;">
                <el-option
                        v-for="item in work_places"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                </el-option>
            </el-select>
            <el-button type="warning" @click="changeShow(0)">表格形式</el-button>
            <el-button type="success" @click="changeShow(1)">图表形式</el-button>
        </div>
        <div style="margin-top:25px;text-align: left" class="excel">
            <div style="float:left;margin-top:10px;">{{college}}共有 {{caseLists.length}} 起案件</div>
            <div style="float:right;margin-right:30px;">
                <el-button type="message" @click="tableExcel">导出Excel</el-button>
            </div>
        </div>
        <div style="margin-top: 40px" v-if="!show_chart">

            <el-table :data="caseLists" border>
                <el-table-column label="案件编号" align="center" prop="case_id"></el-table-column>
                <el-table-column label="报案人姓名" align="center" prop="reporter.name"></el-table-column>
                <el-table-column label="联系方式" align="center" prop="reporter.phone"></el-table-column>
                <el-table-column label="案件类型" align="center" prop="case_type"></el-table-column>
                <el-table-column label="学院或单位" align="center" prop="reporter.work_place"></el-table-column>
                <el-table-column label="上报人员" align="center" prop="registrant.name"></el-table-column>
                <el-table-column label="操作" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button @click="showDetail(scope.row)" type="text" size="small">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="chart" v-if="show_chart" style="margin-top:30px;">
            <div id="pie"></div>
            <div id="bar"></div>
        </div>
    </div>
</template>

<script>
    import caseDialog from './multi/caseDialog.vue'
    import axios from 'axios';
    import {
        mapState,
        mapMutations,
    } from 'vuex'

    //引入基本模板
    let echarts = require('echarts/lib/echarts');
    //引入柱状图和饼形图组件
    require('echarts/lib/chart/bar');
    require('echarts/lib/chart/pie');
    //引入提示框和title组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    export default {
        name: "caseStatic",
        components: {caseDialog},
        data() {
            return {
                college: '',//所选择的学院
                allCases: [],//这一年所有的数据列表备份
                caseLists: [],//返回这一年的所有数据列表
                caseType: [],//案件类型数组
                caseTypeNumber: [],//相应案件类型对应的案件数量
                show_chart: false,//是否以图表形式展示
                work_places: [
                    {
                        name: "信息与通信工程学院",
                        id: 1,
                    },
                    {
                        name: "材料与能源学院",
                        id: 2,
                    },
                    {
                        name: "光电科学与工程学院",
                        id: 3,
                    },
                    {
                        name: "材料与环境学院",
                        id: 4,
                    },
                    {
                        name: "信息与软件工程学院",
                        id: 5,
                    },
                    {
                        name: "数学科学学院",
                        id: 6,
                    },
                    {
                        name: "医学院",
                        id: 7,
                    },
                    {
                        name: "经济与管理学院",
                        id: 8,
                    },
                    {
                        name: "外国语学院",
                        id: 9,
                    },
                    {
                        name: "格拉斯哥学院",
                        id: 10,
                    },
                    {
                        name: "基础与前沿研究院",
                        id: 11,
                    },
                    {
                        name: "英才实验学院",
                        id: 12,
                    },
                    {
                        name: "电子科学与工程学院",
                        id: 13,
                    },
                    {
                        name: "机械与电气工程学院",
                        id: 14,
                    },
                    {
                        name: "自动化工程学院",
                        id: 15,
                    },
                    {
                        name: "计算机科学与工程学院",
                        id: 16,
                    },
                    {
                        name: "航空航天学院",
                        id: 17,
                    },
                    {
                        name: "物理学院",
                        id: 18,
                    },
                    {
                        name: "生命科学与技术学院",
                        id: 19,
                    },
                    {
                        name: "公共管理学院",
                        id: 20,
                    },
                    {
                        name: "马克思主义学院",
                        id: 21,
                    },
                    {
                        name: "体育部",
                        id: 22,
                    },
                    {
                        name: "通信抗干扰技术国家级重点实验室",
                        id: 23,
                    },
                    {
                        name: "学校办公室",
                        id: 24,
                    },
                    {
                        name: "图书馆",
                        id: 25,
                    },
                    {
                        name: "校团委(创新创业学院)",
                        id: 26,
                    },
                    {
                        name: "校医院",
                        id: 29,
                    },
                    {
                        name: "保卫处",
                        id: 30,
                    },
                    {
                        name: "教务处",
                        id: 31,
                    },
                    {
                        name: "财务处",
                        id: 32,
                    },
                    {
                        name: "其他",
                        id: 33,
                    },
                    {
                        name: "全部",
                        id: 34,
                    },
                ],

                dialogVisible: false,//判断弹出框是否展示
                caseDetail: {},//弹出详情弹窗中的内容
                caseDetailReporter: {},//弹出详情弹窗中的内容--报案人信息
                caseDetailSuffer: {},//弹出详情弹窗中的内容--受害人信息
                caseDetailSuspect: {},//弹出详情弹窗中的内容--嫌疑人信息
                caseDetailWitness: {},//弹出详情弹窗中的内容--案件证人信息
                caseDetailProperty: {},//弹出详情弹窗中的内容--财产损失信息

                show_suffer: true,//是否展示受害人信息
                show_suspect: true,//是否展示嫌疑人信息
                show_witness: true,//是否展示案件证人信息
                show_property: true,//是否展示财产损失情况

                jsonData: [],//导出excel时的
            }
        },
        methods: {
            getCases() {
                //获取所有案件
                let instance = axios.create({
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                    }
                });
                instance.get("http://120.79.137.221:801/api/v1/cases/")
                    .then((res) => {
                            this.allCases = res.data;
                            this.caseLists = res.data;
                        }
                    )
                    .catch((err) => {
                        this.$message({
                            message: "获取案件列表失败！",
                            type: 'error'
                        })
                    });
            },
            drawPie(title, data) {
                let myChart = echarts.init(document.getElementById('pie'));
                myChart.setOption({
                    // title: {text: title},
                    series: [
                        {
                            type: 'pie',
                            data: data
                        }
                    ]
                })
            },
            drawBar(title, type, num) {
                let myChart = echarts.init(document.getElementById('bar'));
                myChart.setOption({
                    // title: {text: title},
                    tooltip: {},
                    xAxis: {
                        data: type
                    },
                    yAxis: {},
                    series: [
                        {
                            type: 'bar',
                            data: num
                        }
                    ]
                })
            },
            changeShow(num) {
                if (num === 0) {
                    this.show_chart = false;
                } else if (num === 1) {
                    if (this.college === '' || this.college === '全部') {
                        this.$message('请选择学院或者单位！');
                    } else {
                        this.show_chart = true;
                        this.$nextTick(function () {
                            this.drawBar(this.college, this.caseType, this.caseTypeNumber);//柱状图
                            this.drawPie(this.college, this.organizePieArray(this.caseType, this.caseTypeNumber))//饼状图
                        })
                    }
                }
            },
            organizePieArray(arr_1, arr_2) {
                let length = arr_1.length;
                let array = [];
                for (let i = 0; i < length; i++) {
                    array.push({
                        name: arr_1[i],
                        value: arr_2[i]
                    })
                }
                return array;
            },
            showDetail(row) {
                //查看案件详情,判断各个模块是否展示
                this.caseDetail = {};
                this.caseDetailReporter = {};
                this.caseDetailSuffer = {};
                this.caseDetailSuspect = {};
                this.caseDetailWitness = {};
                this.caseDetailProperty = {};

                this.dialogVisible = true;
                this.caseDetail = row;

                //报案人模块
                this.caseDetailReporter = row.reporter;

                //判断受害人模块是否展示
                if (!row.sufferer) {
                    this.show_suffer = false;
                } else {
                    this.caseDetailSuffer = row.sufferer;
                    this.show_suffer = true;
                }

                //判断嫌疑人模块是否展示
                if (!row.suspect) {
                    this.show_suspect = false;
                } else {
                    this.caseDetailSuspect = row.suspect;
                    this.show_suspect = true;
                }

                //判断案件证人模块是否展示
                if (!row.witness) {
                    this.show_witness = false;
                } else {
                    this.caseDetailWitness = row.witness;
                    this.show_witness = true;
                }

                //判断财产损失模块是否展示
                if (!row.property_loss) {
                    this.show_property = false;
                } else {
                    this.caseDetailProperty = row.property_loss;
                    this.show_property = true;
                }
            },
            closeDetail() {
                //关闭弹框前清空所有数据
                this.dialogVisible = false;
            },
            handleJsonTable() {
                let length=this.caseLists.length;
                this.jsonData.push({
                    case_id:"案件编号",
                    name:"报案人姓名",
                    phone:"电话",
                    case_type:"案件类型",
                    work_place:"学院或单位",
                    registrant:"登记人"
                });
                for(let i=0;i<length;i++){
                    this.jsonData.push({
                        case_id:this.caseLists[i].case_id,
                        name:this.caseLists[i].reporter.name,
                        phone:this.caseLists[i].reporter.phone,
                        case_type:this.caseLists[i].case_type,
                        work_place:this.caseLists[i].reporter.work_place,
                        registrant:this.caseLists[i].registrant.name
                    })
                }
            },
            tableExcel() {
                this.handleJsonTable();
                let str = ``;
                let length = this.jsonData.length;
                for (let i = 0; i < length; i++) {
                    for (let item in this.jsonData[i]) {
                        str += `${this.jsonData[i][item] + '\t'},`;
                    }
                    str += '\n';
                }
                let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
                let link = document.createElement("a");
                link.href = uri;
                link.download = "案件统计.csv";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            },
            handleTime(str) {
                //处理时间格式
                if(str){
                    let a = str.substring(0, 19);
                    return a.replace("T", ' ');
                }
            },
            handleEducation(object) {
                switch (object.education) {
                    case 1:
                        object.education = "小学";
                        break;
                    case 2:
                        object.education = "初中";
                        break;
                    case 3:
                        object.education = "高中";
                        break;
                    case 4:
                        object.education = "专科";
                        break;
                    case 5:
                        object.education = "本科";
                        break;
                    case 6:
                        object.education = "硕士";
                        break;
                    case 7:
                        object.education = "博士";
                        break;
                    default :
                        break;
                }
            },
            handleIdentityDocument(object) {
                switch (object.identity_document) {
                    case 1:
                        object.identity_document = "护照";
                        break;
                    case 2:
                        object.identity_document = "学生证";
                        break;
                    case 3:
                        object.identity_document = "身份证";
                        break;
                    default :
                        break;
                }
            }
        },
        computed: {
            ...mapState({
                token: state => state.token,
            })
        },
        mounted() {
            axios.defaults.headers.common['Authorization'] = "JWT " + this.token;
            this.getCases();
        },
        watch: {
            college: function () {
                if (this.college === '全部') {
                    this.caseLists = this.allCases;
                    this.show_chart = false;
                } else {
                    //查找这个学院发生的案件
                    this.caseLists = this.allCases;
                    let length = this.caseLists.length;
                    let array_case = [];
                    for (let i = 0; i < length; i++) {
                        if (this.college === this.caseLists[i].reporter.work_place) {
                            array_case.push(this.caseLists[i]);
                        }
                    }
                    this.caseLists = array_case;
                    this.caseLists.sort((a, b) => {
                        return a.case_type - b.case_type
                    });

                    //查找案件类型
                    let array_type = [];
                    let length_1 = this.caseLists.length;
                    for (let i = 0; i < length_1; i++) {
                        array_type.push(this.caseLists[i].case_type);
                    }
                    //为案件类型数组去重
                    array_type.sort();
                    let arrayType = [array_type[0]];
                    for (let i = 1; i < length_1; i++) {
                        if (array_type[i] !== arrayType[arrayType.length - 1]) {
                            arrayType.push(array_type[i]);
                        }
                    }
                    this.caseType = arrayType;
                    console.log(this.caseType);
                    //查看某类案件在数组中出现了多少次
                    let length_2 = this.caseType.length;
                    let arrayNumber = new Array(length_2);
                    arrayNumber.fill(0);
                    for (let i = 0; i < length_2; i++) {
                        for (let j = 0; j < length_1; j++) {
                            if (this.caseType[i] === array_type[j]) {
                                arrayNumber[i] += 1;
                            }
                        }
                    }
                    this.caseTypeNumber = arrayNumber;
                    console.log(this.caseTypeNumber);

                    if (this.show_chart) {
                        if (this.college === '') {
                            this.$message('请选择学院或者单位！');
                        } else {
                            this.show_chart = true;
                            this.$nextTick(function () {
                                this.drawBar(this.college, this.caseType, this.caseTypeNumber);//柱状图
                                this.drawPie(this.college, this.organizePieArray(this.caseType, this.caseTypeNumber))//饼状图
                            })
                        }
                    }
                }
            },
            caseLists: function () {
                let length = this.caseLists.length;
                for (let i = 0; i < length; i++) {
                    //处理是待审核，审核通过，还是审核未通过
                    if (this.caseLists[i].check_status === 0) {
                        this.caseLists[i].check_status = '待审核'
                    } else if (this.caseLists[i].check_status === 1) {
                        this.caseLists[i].check_status = '审核通过'
                    } else if (this.caseLists[i].check_status === 2) {
                        this.caseLists[i].check_status = '审核未通过'
                    }
                    //处理时间格式
                    this.caseLists[i].occur_time = this.handleTime(this.caseLists[i].occur_time);
                    //处理学历表示问题
                    this.handleEducation(this.caseLists[i].reporter);
                    if (this.caseLists[i].sufferer) {
                        this.handleEducation(this.caseLists[i].sufferer);
                    }
                    if (this.caseLists[i].suspect) {
                        this.handleEducation(this.caseLists[i].suspect);
                    }
                    if (this.caseLists[i].witness) {
                        this.handleEducation(this.caseLists[i].witness);
                    }
                    //处理证件类型问题
                    this.handleIdentityDocument(this.caseLists[i].reporter);
                    if (this.caseLists[i].sufferer) {
                        this.handleIdentityDocument(this.caseLists[i].sufferer);
                    }
                    if (this.caseLists[i].suspect) {
                        this.handleIdentityDocument(this.caseLists[i].suspect);
                    }
                    if (this.caseLists[i].witness) {
                        this.handleIdentityDocument(this.caseLists[i].witness);
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .el-form-item {
        color: red;
    }

    .chart {
        width: 100%;
        height: 100%;
    }

    .chart:after {
        clear: both;
        content: '';
        display: block;
        height: 0;
        overflow: hidden;
        visibility: hidden;
    }

    #pie, #bar {
        width: 500px;
        height: 500px;
        float: left;
        margin-right: 30px;
        margin-left: 10px;
    }

    .excel:after {
        clear: both;
        content: '';
        display: block;
    }


</style>