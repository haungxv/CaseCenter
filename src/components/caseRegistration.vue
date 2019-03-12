<template>
    <div>
        <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane name="in" label="校内人员登记">
                <in-campus-case-register :msgIn="msgIn"></in-campus-case-register>
            </el-tab-pane>
            <el-tab-pane name="out" label="校外人员登记">
                <out-campus-case-register :msgOut="msgOut"></out-campus-case-register>
            </el-tab-pane>
            <el-tab-pane name="label" label="添加标签">
                <manager-label :msgLabel="msgLabel"></manager-label>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import inCampusCaseRegister from './review/in-campus-case-register.vue'
    import outCampusCaseRegister from './review/out-campus-case-register.vue'
    import managerLabel from './review/manageLabel.vue'

    export default {
        components: {
            inCampusCaseRegister,
            outCampusCaseRegister,
            managerLabel
        },
        data() {
            return {
                msgIn: 1,
                msgOut: 1,
                msgLabel: 1,
                activeName: '',
            }
        },
        methods: {
            handleClick() {
                console.log(this.activeName);
                if (this.activeName === 'in') {
                    this.msgIn++;
                } else if (this.activeName === 'out') {
                    this.msgOut++;
                } else if (this.activeName === 'label') {
                    this.msgLabel++;
                }
            },
        },
        mounted() {
            this.activeName = 'in'
        }
    }
</script>
<style scoped>

</style>

