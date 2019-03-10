<template>
    <div id="detail_print">
        <div style="text-align: left">
            报案类型
            <hr>
            <el-form :inline="true">
                <el-form-item label="案发时间:" style="width: 30%">{{caseDetail.occur_time}}</el-form-item>
                <el-form-item label="报案类型:" style="width: 30%">{{caseDetail.case_type}}</el-form-item>
                <el-form-item label="案件录入人:" style="width: 30%">{{caseDetail.registrant.name}}</el-form-item>
            </el-form>
        </div>
        <div style="text-align: left">
            报案人信息
            <hr>
            <info :a="caseDetailReporter"></info>
        </div>
        <div v-if="!show_suffer" style="text-align: left;margin-bottom:25px;">报案人与受害者为同一人</div>
        <div style="text-align: left" v-if="show_suffer">
            受害人信息
            <hr>
            <info :a="caseDetailSuffer"></info>
        </div>
        <div style="text-align: left">
            案发情况
            <hr>
            <el-form :inline="true">
                <el-form-item label="案发地点:" style="width: 100%">{{caseDetail.occur_place}}</el-form-item>
                <el-form-item label="案发时间段:" style="width: 100%">
                    {{caseDetail.start_time}}—{{caseDetail.end_time}}
                </el-form-item>
                <el-form-item label="案情:" style="width: 100%">{{caseDetail.desc}}</el-form-item>
            </el-form>
        </div>
        <div style="text-align: left" v-if="show_suspect">嫌疑人信息
            <hr>
            <info :a="caseDetailSuspect"></info>
        </div>
        <div style="text-align: left" v-if="show_witness">
            案件证人信息
            <hr>
            <info :a="caseDetailWitness"></info>
        </div>
        <div style="text-align: left" v-if="show_property">
            损失财物信息
            <hr>
            <el-form :inline="true">
                <el-form-item label="物品名称:" style="width: 30%">{{caseDetailProperty.name}}</el-form-item>
                <el-form-item label="所有权性质:" style="width: 30%">
                    {{caseDetailProperty.is_private===true?'本人所有':'非本人所有'}}
                </el-form-item>
                <el-form-item label="品牌:" style="width: 30%">{{caseDetailProperty.brand}}</el-form-item>
                <el-form-item label="型号:" style="width: 30%">{{caseDetailProperty.version}}</el-form-item>
                <el-form-item label="颜色:" style="width: 30%">{{caseDetailProperty.color}}</el-form-item>
                <el-form-item label="其他特征:" style="width: 30%">{{caseDetailProperty.other_feature}}</el-form-item>
                <el-form-item label="数量:" style="width: 30%">{{caseDetailProperty.sum}}</el-form-item>
                <el-form-item label="购买时间:" style="width: 30%">{{caseDetailProperty.bought_time}}</el-form-item>
                <el-form-item label="购置价格:" style="width: 30%">{{caseDetailProperty.price}}</el-form-item>
            </el-form>
        </div>
        <div style="text-align: left">
            <hr>
            <el-form :inline="true">
                <el-form-item label="是否查看监控:" style="width: 100%">{{caseDetail.saw_monitoring?'是':'否'}}</el-form-item>
                <el-form-item label="是否通知公安机关等部门:" style="width: 100%">{{caseDetail.called_police?'是':'否'}}
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    import Info from './detailReview.vue'

    export default {
        props: ['caseDetail', 'caseDetailReporter',
            'caseDetailSuffer', 'caseDetailSuspect',
            'caseDetailWitness', 'caseDetailProperty',
            'show_suffer', 'show_suspect', 'show_witness', 'show_property'],
        components: {Info},
        name: "caseDialog",
        methods: {

        },
    }
</script>

<style scoped>
    .el-form-item {
        color: red;
    }
</style>