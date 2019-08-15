<template>
    <div class="contain">
        <div class="col1">
            <div id="a1" class="type1">1</div>
            <div id="a2" class="type1">2</div>
            <div id="a3" class="type1">3</div>
            <div id="a4" class="type2">4</div>
        </div>
        <div class="col2">
            <div class="type-head">吉林大学2019级自助数字化迎新展示</div>
            <div class="mid-contain">
                <div class="mid-left">
                    <div class="type3"></div>
                    <div class="type4"></div>
                </div>
                <div class="mid-right-map"></div>
            </div>
            <div class="mid-bottom">
                <div id="b4" class="type2 mid-bottom-left"></div>
                <div id="c3" class="type2 mid-bottom-right"></div>
            </div>
        </div>
        <div class="col3">
            <div id="d1" class="type2"></div>
            <div id="d2" class="type2"></div>
            <div id="d3" class="type2"></div>
        </div>
    </div>
</template>

<script>
    /*业务组件*/
    import Total from './total/total.vue'
    import Time from './time/time.vue'
    import Gender from './gender/gender.vue'
    import weather from './weather/weather.vue'
    /*图标类组件*/
    import polygonal from '@/components/polygonal'

    var echarts = require('echarts');

    //选项
    var option1 = {
        color: ['#FFD441', '#2AC5A9', '#ED82B0', '#0081D0', '#D58AEA', '#74C3CE', '#6283C0', '#5F83B7'],
        title: {textStyle: '#fff'},
        textStyle: {color: '#fff'},
        legend: {
            textStyle: {color: '#fff'}
        },
        tooltip: {
            textStyle: {color: '#fff'}
        },
        dataset: {
            source: [
                ['product', '2015', '2016', '2017'],
                ['Matcha Latte', 43.3, 85.8, 93.7],
                ['Milk Tea', 83.1, 73.4, 55.1],
                ['Cheese Cocoa', 86.4, 65.2, 82.5],
                ['Walnut Brownie', 72.4, 53.9, 39.1]
            ]
        },
        xAxis: {type: 'category'},
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
            {type: 'bar'},
            {type: 'bar'},
            {type: 'bar'}
        ]
    }

    var option2 = {
        color: ['#FFD441', '#2AC5A9', '#ED82B0', '#0081D0', '#D58AEA', '#74C3CE', '#6283C0', '#5F83B7'],
        textStyle: {color: '#fff'},
        tooltip: {
            textStyle: {color: '#fff'},
            trigger: 'axis'
        },
        title: {
            textStyle: '#fff'
        },
        legend: {
            data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
            textStyle: {color: '#fff'}
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '邮件营销',
                type: 'line',
                stack: '总量',
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '联盟广告',
                type: 'line',
                stack: '总量',
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: '视频广告',
                type: 'line',
                stack: '总量',
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: '直接访问',
                type: 'line',
                stack: '总量',
                data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
                name: '搜索引擎',
                type: 'line',
                stack: '总量',
                data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    }
    //实例
    var Chart_a4;

    var Chart_b4;
    var Chart_c3;

    var Chart_d1;
    var Chart_d2;
    var Chart_d3;
    export default {
        name: "index",
        components: {Total, Time, Gender, weather, polygonal},
        data() {
            return {}
        },
        methods: {
            initA4() {
                Chart_a4 = echarts.init(document.getElementById('a4'));
                Chart_a4.setOption(option1);
            },

            initB4() {
                Chart_b4 = echarts.init(document.getElementById('b4'));
                Chart_b4.setOption(option1);
            },
            initC3() {
                Chart_c3 = echarts.init(document.getElementById('c3'));
                Chart_c3.setOption(option1);
            },
            initD1() {
                Chart_d1 = echarts.init(document.getElementById('d1'));
                Chart_d1.setOption(option1);
            },
            initD2() {
                Chart_d2 = echarts.init(document.getElementById('d2'));
                Chart_d2.setOption(option2);
            },
            initD3() {
                Chart_d3 = echarts.init(document.getElementById('d3'));
                Chart_d3.setOption(option1);
            },


        },
        mounted() {
            //挂在时初始化
            this.initA4();

            this.initB4();

            this.initC3();

            this.initD1();
            this.initD2();
            this.initD3();
            //窗口大小改变时，图标自动适应宽高
            window.onresize = function () {
                setTimeout(() => {
                    Chart_a4.resize();
                    Chart_b4.resize();
                    Chart_c3.resize();

                    Chart_d1.resize();
                    Chart_d2.resize();
                    Chart_d3.resize();
                }, 300)
            }
        }
    }
</script>

<style scoped>

</style>