<template>
    <div class="a2">
        <div class="a2-left">
            <div class="rs color1">
                <div class="pot"></div>
                <span class="ts">总人数：</span>
                <div class="sz">
                    <span v-for="(i,index) in zrs" :key="index">{{i}}</span>
                </div>
            </div>
            <div class="rs color2">
                <div class="pot"></div>
                <span class="ts">已报到：</span>
                <div class="sz">
                    <span v-for="(i,index) in ybd" :key="index">{{i}}</span>
                </div>
            </div>
            <div class="rs color3">
                <div class="pot"></div>
                <span class="ts">未报到：</span>
                <div class="sz">
                    <span v-for="(i,index) in wbd" :key="index">{{i}}</span>
                </div>
            </div>
        </div>
        <div class="a2-right" id="a2">123</div>
    </div>
</template>

<script>
    var option = {
        color: ['#FFD441', '#2AC5A9', '#ED82B0', '#0081D0', '#D58AEA', '#74C3CE', '#6283C0', '#5F83B7'],
        tooltip: {
            // trigger: 'item',
            // formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        // legend: {
        //     // orient: 'vertical',
        //     // x: 'left',
        //     // data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        // },
        graphic: {       //图形中间文字
            type: "text",
            left: "center",
            top: "center",
            style: {
                text: "33.33%",
                textAlign: "center",
                fill: "#fff",
                fontSize: 16
            }
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: ['70%', '80%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: false,
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    {value: 335, name: '直接访问'},
                    {value: 310, name: '邮件营销'},
                    {value: 234, name: '联盟广告'}
                ]
            }
        ]
    };

    const echarts = require('echarts');
    let Chart_a2;
    export default {
        name: "a2",
        data() {
            return {
                zrs: '',
                ybd: '',
                wbd: '',
                bdl: ''
            }
        },
        methods: {
            initA2() {
                Chart_a2 = echarts.init(document.getElementById('a2'));
                Chart_a2.setOption(option);
            },
            getData() {
                this.$axios.get('/api/bdl').then(res => {
                    let zrs = res.data.data.zrs + '';
                    let ybd = res.data.data.ybd + '';
                    let wbd = res.data.data.wbd + '';
                    this.bdl = res.data.data.bdl + '';
                    //位数不到5位，需要对字符串开头进行补全
                    if (zrs.length < 5) {
                        for (let j = 0; j < (5 - zrs.length); j++) {
                            zrs = '0' + zrs
                        }
                    }
                    this.zrs = zrs;
                    // console.log(ybd)
                    if (ybd.length < 5) {

                        for (let j = 0; j < (5 - ybd.length); j++) {
                            console.log(ybd)
                            ybd = '0' + ybd
                        }
                    }
                    this.ybd = ybd;
                    if (wbd.length < 5) {
                        for (let j = 0; j < (5 - wbd.length); j++) {
                            wbd = '0' + wbd
                        }
                    }
                    this.wbd = wbd;
                    this.ybd = ybd;
                    this.zrs = zrs;
                })
            }
        },
        mounted() {
            this.initA2()
            this.getData()
//窗口大小改变时，图标自动适应宽高
            window.onresize = function () {
                setTimeout(() => {
                    Chart_a2.resize();
                }, 300)
            }
        }
    }
</script>

<style scoped lang="scss">
    .a2 {
        padding: 2.8rem;
        @include flex(space-between, center);

        .a2-left {
            .rs {
                @include flex(space-between, center);

                .pot {
                    width: 12px;
                    height: 12px;
                    -webkit-border-radius: 50%;
                    -moz-border-radius: 50%;
                    border-radius: 50%;
                    margin-right: 2rem;
                }

                .ts {
                    font-size: 1.6rem;
                    font-family: SourceHanSansCN-Regular;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                    line-height: 2rem;
                    margin-right: 0.4rem;
                }

                .sz {
                    span {
                        display: inline-block;
                        width: 2rem;
                        height: 2.6rem;
                        border-radius: 0.3rem;
                        text-align: center;
                        font-size: 1.6rem;
                        font-family: Helvetica-Bold;
                        font-weight: 900;
                        color: rgba(28, 37, 49, 1);
                        line-height: 2.6rem;
                        margin: 0 0.2rem;
                    }

                    margin: 0 auto;
                }
            }

            .color1 {
                margin-bottom: 1.7rem;

                .pot {
                    background-color: rgba(255, 132, 68, 1);
                }

                .sz {
                    span {
                        background-color: rgba(255, 132, 68, 1);
                    }
                }
            }

            .color2 {
                margin-bottom: 1.7rem;

                .pot {
                    background-color: rgba(42, 197, 169, 1);
                }

                .sz {
                    span {
                        background-color: rgba(42, 197, 169, 1);
                    }
                }
            }

            .color3 {
                .pot {
                    background-color: rgba(237, 130, 176, 1);
                }

                .sz {
                    span {
                        background-color: rgba(237, 130, 176, 1);
                    }
                }
            }
        }

        .a2-right {
            width: 14.9rem;
            height: 14.9rem;
        }
    }
</style>