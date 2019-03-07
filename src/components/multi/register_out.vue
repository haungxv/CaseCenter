<template>
    <el-form :model="a" :inline="true" :rules="b">
        <el-form-item label="姓名" prop="name">
            <el-input v-model="a.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
            <el-radio class="radio" v-model="a.gender" :label='true'>男</el-radio>
            <el-radio class="radio" v-model="a.gender" :label='false'>女</el-radio>
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
                        :value="item.id">
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
        <el-form-item label="单位">
            <el-input v-model="a.work_place"></el-input>
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

                },
            }
        },
        methods:{
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
                        // this.outSchools = array_2;
                        // this['setLabelProfession_in'](array_1);
                        // this['setLabelProfession_out'](array_2);
                    })
                    .catch((err) => {
                        this.fail('获取职业或身份失败！');
                    });
            },
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