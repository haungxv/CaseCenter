<template>
    <el-form :inline="true">
        <el-form :inline="true">
            <el-form-item label="姓名:" style="width: 13%">{{a.name}}</el-form-item>
            <el-form-item label="性别:" style="width: 10%">{{a.gender===true?'男':'女'}}</el-form-item>
            <el-form-item label="年龄:" style="width: 10%">{{a.age}}</el-form-item>
            <el-form-item label="民族:" style="width: 10%">{{a.nation}}</el-form-item>
            <el-form-item label="职业或身份:" style="width: 15%">{{a.profession}}</el-form-item>
            <el-form-item label="证件类型:" style="width: 11%">{{a.identity_document}}</el-form-item>
            <el-form-item label="证件号:" style="width: 20%">{{a.identity_number}}</el-form-item>
            <el-form-item label="文化程度:" style="width: 10%">{{a.education}}</el-form-item>
            <el-form-item label="年级:" style="width: 10%">{{a.grade}}</el-form-item>
            <el-form-item label="学院或单位:" style="width: 17%">{{a.work_place}}</el-form-item>
            <el-form-item label="住址:" style="width: 17%">{{a.home_addr}}</el-form-item>
            <el-form-item label="联系方式:" style="width: 15%">{{a.phone}}</el-form-item>
        </el-form>
    </el-form>
</template>

<script>
    export default {
        name: "detailinfo",
        props:['a'],
    }
</script>

<style scoped>
    .el-form-item {
        color: red;
    }
</style>