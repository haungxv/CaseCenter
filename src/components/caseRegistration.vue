<template>
    <div>
        <el-tabs type="card">
            <el-tab-pane label="校内人员登记">
                <in-campus-case-register></in-campus-case-register>
            </el-tab-pane>
            <el-tab-pane label="校外人员登记">
                <out-campus-case-register></out-campus-case-register>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import inCampusCaseRegister from './details/in-campus-case-register.vue'
    import outCampusCaseRegister from './details/out-campus-case-register.vue'
    export default {
        components: {
            inCampusCaseRegister,
            outCampusCaseRegister
        },
    }
</script>
<style scoped>

</style>

