<template>
    <div>
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


        <div style="margin-top:30px;text-align: left">{{college}}共有 {{caseLists.length}} 起案件</div>
        <div style="margin-top: 40px" v-if="!show_chart">
            <el-table :data="caseLists" border>
                <el-table-column label="案件编号" align="center" prop="case_id"></el-table-column>
                <el-table-column label="报案人姓名" align="center" prop="reporter.name" width="100"></el-table-column>
                <el-table-column label="联系方式" align="center" prop="reporter.phone" width="160"></el-table-column>
                <el-table-column label="案件类型" align="center" prop="case_type" width="210"></el-table-column>
                <el-table-column label="学院或单位" align="center" prop="reporter.work_place" width="230"></el-table-column>
                <el-table-column label="上报人员" align="center" prop="registrant.name" width="130"></el-table-column>
                <el-table-column label="操作" align="center" fixed="right" width="130">
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
        data() {
            return {
                college: '',
                caseLists: [],

                caseType: [],
                caseTypeNumber: [],

                show_chart: false,

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
                ]
            }
        },
        methods: {
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
                    this.show_chart = true;
                    this.$nextTick(function () {
                        this.drawBar(this.college, this.caseType, this.caseTypeNumber);//柱状图
                        this.drawPie(this.college, this.organizeArray(this.caseType, this.caseTypeNumber))//饼状图
                    })
                }
            },
            organizeArray(arr_1, arr_2) {
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
            },
            ...mapMutations(['setUserList']),
        },
        computed: {
            ...mapState({
                token: state => state.token,
                allCases: state => state.allCases,
                userList: state => state.userList,
            })
        },
        mounted() {
            axios.defaults.headers.common['Authorization'] = "JWT " + this.token;
            this.caseLists = this.allCases;

        },
        watch: {
            college: function () {
                //查找这个学院发生的案件
                this.caseLists = this.allCases;
                let length = this.caseLists.length;
                let array_case = [];
                for (let i = 0; i < length; i++) {
                    if (this.college === this.caseLists[i].reporter.work_place) {
                        array_case.push(this.caseLists[i]);
                    }
                }
                // array_case.sort((a, b) => {
                //     return a.case_type - b.case_type
                // });
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
            }
        }
    }
</script>

<style scoped>
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
        /*border: 1px solid black;*/
        float: left;
        margin-right: 30px;
    }

    /*#bar {*/
    /*margin-left: 30px;*/
    /*}*/

</style>