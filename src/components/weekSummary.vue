<template>
    <div>
        <!--<div style="margin-top: 50px">-->
        <!--<el-table :data="fileCaseData" style="margin-top: 50px" border>-->
        <!--<el-table-column label="案件编号" align="center" prop="case_id"></el-table-column>-->
        <!--<el-table-column label="登记时间" align="center" prop="occur_time"></el-table-column>-->
        <!--<el-table-column label="案件类型" align="center" prop="reporter.name"></el-table-column>-->
        <!--<el-table-column label="操作" align="center">-->
        <!--<template slot-scope="scope">-->
        <!--<el-button @click="showDetail(scope.row)" type="text" size="small">查看详情</el-button>-->
        <!--<el-button @click="download(scope.row)" type="text" size="small">下载详情</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <!--</el-table>-->
        <!--</div>-->
    </div>
</template>

<script>
    import axios from 'axios';
    import {
        mapState,
        mapMutations,
    } from 'vuex'

    export default {
        name: "weekSummary",
        methods: {
            getWeeks() {
                let data = {

                };
                axios.post("http://120.79.137.221:801/api/v1/cases/2019/weekly/")
                    .then((res) => {

                    })
                    .catch((err) => {

                    });
            },

            ...mapMutations(['setUserList']),
        },
        computed: {
            ...mapState({
                token: state => state.token,
            })
        },
        mounted() {
            axios.defaults.headers.common['Authorization'] = "JWT " + this.token;
            this.getWeeks();
        }
    }
</script>

<style scoped>

</style>