<template>
    <el-form :model="a" :inline="true" :rules="b" ref="caseInformation">
        <el-form-item label="姓名" prop="name">
            <el-input v-model="a.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
            <el-radio class="radio" v-model="a.gender" :label=true>男</el-radio>
            <el-radio class="radio" v-model="a.gender" :label=false>女</el-radio>
        </el-form-item>
        <el-form-item label="年龄">
            <el-input v-model="a.age"></el-input>
        </el-form-item>
        <el-form-item label="民族(国籍)">
            <el-input v-model="a.nation"></el-input>
        </el-form-item>
        <el-form-item label="职业或身份">
            <el-select v-model="a.profession" placeholder="请选择">
                <el-option
                        v-for="item in info.professions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="证件类型">
            <el-select v-model="a.identity_document" placeholder="请选择">
                <el-option
                        v-for="item in info.identity_types"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="证件号">
            <el-input v-model="a.identity_num"></el-input>
        </el-form-item>
        <el-form-item label="文化程度">
            <el-select v-model="a.education" placeholder="请选择">
                <el-option
                        v-for="item in info.educations"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="年级">
            <el-select v-model="a.grade" placeholder="请选择">
                <el-option
                        v-for="item in info.grades"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="学院或单位">
            <el-select v-model="a.work_place" placeholder="请选择">
                <el-option
                        v-for="item in info.work_places"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="住址">
            <el-input v-model="a.home_addr"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
            <el-input v-model="a.phone"></el-input>
        </el-form-item>
    </el-form>
</template>

<script>
    import axios from 'axios';
    import {
        mapState,
        mapMutations,
    } from 'vuex'

    export default {
        props: ['a','b'],
        data() {
            return {
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
                    grades: [
                        {
                            name: '2011',
                            id: 1,
                        },
                        {
                            name: '2012',
                            id: 2,
                        },
                        {
                            name: '2013',
                            id: 3,
                        },
                        {
                            name: '2014',
                            id: 4,
                        },
                        {
                            name: '2015',
                            id: 5,
                        },
                        {
                            name: '2016',
                            id: 6,
                        },
                        {
                            name: '2017',
                            id: 7,
                        },
                        {
                            name: '2018',
                            id: 8,
                        },
                        {
                            name: '2019',
                            id: 9,
                        },

                    ],
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
                },
            }
        },
        methods: {
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
                        this.info.professions = array_1;
                        // this.outSchools = array_2;
                        // this['setLabelProfession_in'](array_1);
                        // this['setLabelProfession_out'](array_2);
                    })
                    .catch((err) => {
                        this.fail('获取职业或身份失败！');
                    });
            },
            ...mapMutations(['setLabelProfession_in','setLabelProfession_out','setLabelPosition','setLabelType']),
        },
        mounted: function () {
            axios.defaults.headers.common['Authorization'] = "JWT " + this.token;
            this.profession();
        },
        computed: {
            ...mapState({
                token: state => state.token,
                // labelType:state=>state.labelType,
                // labelPosition:state=>state.labelPosition,
                // labelProfession_in:state=>state.labelProfession_in,
                // labelProfession_out:state=>state.labelProfession_out,
            })
        },

    }
</script>

<style scoped>

</style>