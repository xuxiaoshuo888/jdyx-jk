<template>
    <!--少数名族占比前十学院-->
    <div id="d1" class="fullSize" style="width:44rem !important;height:102rem !important;"></div>
</template>

<script>
    var echarts = require('echarts');

    var Chart_d1;

    export default {
        name: "d1",
        data() {
            return {
                list: [],
                list_name: [],//学院名集合
                list_value: [],//对应值集合
                option: {
                    color: ['#6283C0', '#5F83B7'],
                    textStyle: {color: '#fff'},
                    title: {
                        text: '各学院报到情况实时统计',
                        subtext: '',
                        left:10,
                        top:10,
                        textStyle: {color: '#fff', fontSize: 18}
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {
                            type : 'shadow'
                        },
                        confine:true,
                        formatter : function(params) {
                            var zrs = 0;
                            for(var i=0; i<params.length;i++){
                                zrs += params[i].value;
                            }
                            var showItem = '';
                            for(var m=0; m<params.length;m++){
                                var item = params[m];
                                var percent = ((item.value / zrs) * 100).toFixed(2);
                                var dotColor = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span>';
                                showItem += (dotColor + item.seriesName + "：" + item.value + ' （' + percent + '%' + '）' + '</br>')
                            }
                            return params[0].name+'<br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;"></span>总人数：'+zrs+'<br>'+showItem;
                        }
                    },
                    legend: {
                        data: ['已报到','未报到'],
                        right: '20px',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        axisLine:{
                            lineStyle:{
                                color:'#fff',
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(255,255,255,0.2)'
                            }
                        },
                        boundaryGap: [0, 0.1]
                    },
                    yAxis: {
                        type: 'category',
                        axisLine:{
                            lineStyle:{
                                color:'#fff',
                            }
                        },
                        data: []
                    },
                    series: [
                        {
                            name: '已报到',
                            type: 'bar',
                            stack: '总量',
                            barWidth: '80%',
                            label: {
                                show: true
                            },
                            itemStyle:{color:'#00A2DD'},
                            data: []
                        },
                        {
                            name: '未报到',
                            type: 'bar',
                            stack: '总量',
                            barWidth: '80%',
                            label: {
                                show: true
                            },
                            itemStyle:{color:'#F03DAB'},
                            data: []
                        }
                    ]
                }
            }
        },
        methods: {
            initD1() {
                Chart_d1 = echarts.init(document.getElementById('d1'));
                // console.log(this.option)
                Chart_d1.setOption(this.option);
            },
            getData() {
                this.$axios.get('/api/xybdl').then(res => {
                    this.list = res.data.data
                    let list_name = []
                    let list_value = []
                    for (let x = 0; x < this.list.length; x++) {
                        list_name.push(this.list[x].deptname)
                        list_value.push(this.list[x].ybd)
                    }
                    Chart_d1.setOption({
                        yAxis: {
                            data: list_name
                        },
                        series: [
                            {
                                data: list_value
                            }
                        ]
                    })
                })
            }
        },
        mounted() {
            this.getData()
            this.initD1()
            //间隔更新数据
            this.update = setInterval(() => {
                this.getData()
            }, 10000)
            //窗口大小改变时，图标自动适应宽高
            window.onresize = function () {
                // console.log('resize d1')
                setTimeout(() => {
                    Chart_d1.resize();
                }, 300)
            }
        },
        beforeDestroy() {
            if (this.update) {
                clearInterval(this.update)
            }
        }
    }
</script>

<style scoped>

</style>