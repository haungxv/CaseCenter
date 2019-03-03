<template>
    <el-form :model="a" :inline="true" :rules="rules.must">
        <el-form-item label="姓名" prop="name">
            <el-input v-model="a.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
            <el-radio class="radio" v-model="a.gender" label='true'>男</el-radio>
            <el-radio class="radio" v-model="a.gender" label='false'>女</el-radio>
        </el-form-item>
        <el-form-item label="年龄">
            <el-input v-model="a.age"></el-input>
        </el-form-item>
        <el-form-item label="民族(国籍)">
            <el-input v-model="a.nationa"></el-input>
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
            <el-input v-model="a.identity_number"></el-input>
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
                        :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="学院或单位">
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
    export default {
        name: "detailRegister",
        props:['a'],
        data(){
            return {
                info:{
                    professions:[
                        {
                            name:'教师',
                            id:1,
                        },
                        {
                            name:'教授',
                            id:2,
                        },
                        {
                            name:'学生',
                            id:3,
                        },
                        {
                            name:'在编职工',
                            id:4,
                        },
                        {
                            name:'外聘职工',
                            id:5,
                        },
                        {
                            name:'学院聘请人员',
                            id:6,
                        },
                        {
                            name:'本科生',
                            id:7,
                        },
                        {
                            name:'硕士研究生',
                            id:8,
                        },
                        {
                            name:'博士研究生',
                            id:9,
                        },
                        {
                            name:'继续教育',
                            id:10,
                        },
                        {
                            name:'其他',
                            id:11,
                        },
                    ],
                    identity_types:[
                        {
                            name:'护照',
                            id:1,
                        },
                        {
                            name:'学生证',
                            id:2,
                        },
                        {
                            name:'身份证',
                            id:3,
                        },
                    ],
                    educations:[
                        {
                            name:'小学',
                            id:1,
                        },
                        {
                            name:'初中',
                            id:2,
                        },
                        {
                            name:'高中',
                            id:3,
                        },
                        {
                            name:'专科',
                            id:4,
                        },
                        {
                            name:'本科',
                            id:5,
                        },
                        {
                            name:'硕士',
                            id:6,
                        },
                        {
                            name:'博士',
                            id:7,
                        },
                    ],
                    grades:[
                        {
                            name:'2015级',
                            id:1,
                        },
                        {
                            name:'2016级',
                            id:2,
                        },
                        {
                            name:'2017级',
                            id:3,
                        },
                        {
                            name:'2018级',
                            id:4,
                        },
                        {
                            name:'2019级',
                            id:5,
                        },
                        {
                            name:'其他',
                            id:6,
                        },
                    ]
                },
                rules: {
                    must: {
                        name: [
                            {required: true, message: '报案人姓名不能为空', trigger: 'blur'}
                        ]
                    },
                },
            }
        }
    }
</script>

<style scoped>

</style>