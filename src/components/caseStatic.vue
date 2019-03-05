<template>
    <div class="chart">
        <div id="pie"></div>
        <div id="bar"></div>
    </div>
</template>

<script>
    //引入基本模板
    let echarts = require('echarts/lib/echarts');
    //引入柱状图组件
    require('echarts/lib/chart/bar');
    require('echarts/lib/chart/pie');
    //引入提示框和title组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    export default {
        name: "caseStatic",
        data() {
            return {}
        },
        methods: {
            drawPie() {
                let myChart = echarts.init(document.getElementById('pie'));
                myChart.setOption({
                    title: {text: 'Echart入门示例'},
                    series: [
                        {
                            name: '销量',
                            type: 'pie',
                            data: [
                                {name:'A',value:1212},
                                {name:'B',value:2323},
                                {name:'C',value:3434},
                            ]
                        }
                    ]
                })
            },
            drawBar() {
                let myChart = echarts.init(document.getElementById('bar'));
                myChart.setOption({
                    title: {text: 'Echart入门示例'},
                    tooltip: {},
                    xAxis: {
                        data: ['衬衫', '羊毛', '雪纺', '裤子', '高跟', '袜子']
                    },
                    yAxis: {},
                    series: [
                        {
                            name: '销量',
                            type: 'bar',
                            data: [5, 28, 46, 10, 10, 20]
                        }
                    ]
                })
            }
        },
        mounted() {
            this.drawBar();
            this.drawPie();
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
        border: 1px solid black;
        float: left;
    }
    #bar{
        margin-left:30px;
    }

</style>