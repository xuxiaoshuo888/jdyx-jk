<template>
    <div id="c2" class="fullSize"></div>
</template>

<script>
    var echarts = require('echarts');
    import 'echarts/map/js/china.js';

    var Chart_c2;

    export default {
        name: "c2",
        data() {
            return {
                option: {
                    color: ['#FFD441', '#2AC5A9'],
                    textStyle: {color: '#000'},
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}<br/>{a0}:{c0}'//地图 : {a}（系列名称），{b}（区域名称），{c}（合并数值）, {d}（无）

                    },
                    series: [
                        {
                            name: '文史',
                            type: 'map',
                            mapType: 'china',
                            label: {
                                normal: {
                                    show: true
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            data: [
                                {name: '广东', value: 1000},
                                {name: '福建', value: 2100},
                                {name: '广西', value: 3100},
                                {name: '云南', value: 4100},
                                {name: '湖北', value: 5100},
                                {name: '湖南', value: 2100},
                                {name: '贵州', value: 3100},
                                {name: '山东', value: 1100},
                                {name: '山西', value: 2100},
                                {name: '天津', value: 3100},

                            ]
                        },
                        {
                            name: '理科',
                            type: 'map',
                            mapType: 'china',
                            label: {
                                normal: {
                                    show: true
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            data: [
                                {name: '广东', value: 1000},
                                {name: '福建', value: 2100},
                                {name: '广西', value: 3100},
                                {name: '云南', value: 4100},
                                {name: '湖北', value: 5100},
                                {name: '湖南', value: 2100},
                                {name: '贵州', value: 3100},
                                {name: '山东', value: 1100},
                                {name: '山西', value: 2100},
                                {name: '天津', value: 3100},

                            ]
                        },
                        {
                            name: '工科',
                            type: 'map',
                            mapType: 'china',
                            label: {
                                normal: {
                                    show: true
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            data: [
                                {name: '广东', value: 1000},
                                {name: '福建', value: 2100},
                                {name: '广西', value: 3100},
                                {name: '云南', value: 4100},
                                {name: '湖北', value: 5100},
                                {name: '湖南', value: 2100},
                                {name: '贵州', value: 3100},
                                {name: '山东', value: 1100},
                                {name: '山西', value: 2100},
                                {name: '天津', value: 3100},

                            ]
                        },
                        {
                            name: '体育',
                            type: 'map',
                            mapType: 'china',
                            label: {
                                normal: {
                                    show: true
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            data: [
                                {name: '广东', value: 1000},
                                {name: '福建', value: 2100},
                                {name: '广西', value: 3100},
                                {name: '云南', value: 4100},
                                {name: '湖北', value: 5100},
                                {name: '湖南', value: 2100},
                                {name: '贵州', value: 3100},
                                {name: '山东', value: 1100},
                                {name: '山西', value: 2100},
                                {name: '天津', value: 3100},

                            ]
                        }
                    ],
                    visualMap: {
                        left: 'left',
                        top: 'bottom',
                        calculable: true,
                        textStyle: {color: '#fff'},
                        min: 0,
                        max: 5100,
                        text: ['高（人数）', '低（人数）'],
                        // Map the score column to color
                        dimension: 0,
                        inRange: {
                            color: ['#D7DA8B', '#E15457']
                        }
                    },
                }
            }
        },
        methods: {
            initC2() {
                Chart_c2 = echarts.init(document.getElementById('c2'));
                Chart_c2.setOption(this.option);
            },
        },
        mounted() {
            this.initC2()
        }
    }
</script>

<style scoped>

</style>