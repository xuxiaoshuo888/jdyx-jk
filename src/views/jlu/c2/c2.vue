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
                type: [],
                list: [],
                option: {
                    color: ['#FFD441', '#2AC5A9'],
                    textStyle: {color: '#000'},
                    tooltip: {
                        trigger: 'item',
                        formatter:'',
                    },
                    roam: true,
                    series: [
                        {
                            name: '',
                            type: 'map',
                            mapType: 'china',
                            // symbolSize: 20,
                            // symbol: 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z',
                            // symbolRotate: 35,
                            label: {
                                normal: {
                                    show: true
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            data: [
                                {
                                    "syd": "浙江",//省份
                                    "zrs": 64,//总人数
                                    "zykl0": 0,//理工人数 这个是和zykls里面的顺序对应
                                    "zykl1": 0,//艺术人数
                                    "zykl2": 64,//综合改革人数
                                    "zykl3": 0//文史人数
                                }
                            ]
                        }
                    ],
                    visualMap: {
                        left: 'left',
                        top: 'bottom',
                        calculable: true,
                        textStyle: {color: '#fff'},
                        min: 0,
                        max: 2000,
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
            getData() {
                this.$axios.get('/api/syddetail').then(res => {
                    this.type = res.data.data.zykls;
                    this.list = res.data.data.list;
                    //处理数据，syd字段,添加name
                    for (let i = 0; i < this.list.length; i++) {
                        this.list[i].name = this.list[i].syd
                        this.list[i].value = this.list[i].zrs

                    }
                    console.log(this.list)
                    let type = this.type
                    Chart_c2.setOption({
                        tooltip: {
                            formatter: (res) => {//格式化
                                console.log(res)
                                let data = res.data
                                let str = `${data.name}<br/>总人数：${data.zrs}人<br/>${type[0]}：${data['zykl0']}人<br/>${type[1]}：${data['zykl1']}人<br/>${type[2]}：${data['zykl2']}人<br/>${type[3]}：${data['zykl3']}人<br/>`
                                return str
                            }
                        },
                        series: [
                            {
                                data: this.list
                            }
                        ],
                    })
                })
            }
        },
        mounted() {
            this.getData()
            this.initC2()
        }
    }
</script>

<style scoped>

</style>