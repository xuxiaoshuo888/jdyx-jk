<template>
    <div id="a1" class="a1">
        <div class="top">
            <div class="top-left">
                <div class="time">{{time}}</div>
                <div class="date">{{date}} 周三</div>
                <!--pm：{{data.pm25}}-->
            </div>
            <div class="top-mid"></div>
            <div class="top-right1"><img :src="data.dayIcon" alt=""></div>
            <div class="top-right2">
                <div class="temp">{{data.temp}}
                    <span>℃</span>
                </div>
                <div class="weather">多云转晴</div>
            </div>
            <div class="top-right3">
                <div>{{data.weather}}</div>
                <div>{{data.nightTemp}}~{{data.dayTemp}}℃</div>
                <div>pm：{{data.pm25}}</div>
            </div>
        </div>
        <div class="bot">
            {{province}} {{city}} {{area}}
            <!--<div class="bot-block" v-for="i in 6" :key="i">-->
            <!--<div class="wea">1</div>-->
            <!--<div class="temp">18~28℃</div>-->
            <!--<div class="week">周四</div>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)

    Date.prototype.Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    export default {
        name: "a1",
        data() {
            return {
                province: "1",
                city: "2",
                area: "3",
                time: "",
                date: "",
                data: {}
            }
        },
        methods: {
            getData() {//天气
                this.$axios.get('/api/weather').then(res => {
                    console.log(res.data)
                    this.province = res.data.data.province;
                    this.city = res.data.data.city;
                    this.area = res.data.data.area;
                    this.data = res.data.data.data
                })
            },
            getTime() {
                this.timer = setInterval(() => {
                    this.date = (new Date()).Format("yyyy-MM-dd")
                    this.time = (new Date()).Format("hh:mm:ss")
                }, 1000)
            }
        },
        mounted() {
            this.getTime()
            this.getData()
        },
        beforeDestroy() {
            if (this.timer) {
                clearInterval(this.timer)
            }
        }

    }
</script>

<style scoped lang="scss">
    .a1 {
        padding: 2.3rem 2.6rem;
        .top {
            @include flex(flex-start, center);
            .top-left {
                .time {
                    font-size: 3.7rem;
                    font-family: Helvetica;
                    color: rgba(255, 255, 255, 1);
                    line-height: 4.4rem;
                }
                .date {
                    font-size: 1.6rem;
                    font-family: Helvetica;
                    color: rgba(255, 255, 255, 1);
                    line-height: 1.9rem;
                    @include flex(space-around, center)
                }
            }
            .top-mid {
                width: 1px;
                height: 30px;
                background-color: rgba(216, 216, 216, 1);
                border-radius: 2px;
                opacity: 0.1;
                margin: 0 1.5rem;
            }
            .top-right1 {
                width: 8.2rem;
                height: 6.9rem;
                font-size: 5.8rem;
                font-weight: 400;
                color: rgba(255, 212, 65, 1);
                line-height: 6.9rem;
            }
            .top-right2 {
                .temp {
                    width: 5.6rem;
                    height: 6rem;
                    font-size: 4rem;
                    font-family: Helvetica;
                    color: rgba(255, 255, 255, 1);
                    line-height: 6rem;
                    position: relative;
                    /*padding: 1rem 1rem 0;*/
                    box-sizing: border-box;
                    text-align: center;
                    span {
                        font-size: 1.2rem;
                        font-family: WeatherIcons-Regular;
                        font-weight: 400;
                        color: rgba(246, 246, 247, 1);
                        line-height: 1.9rem;
                        position: absolute;
                        right: 0;
                        top: 0;
                    }
                }
                .weather {
                    font-size: 1rem;
                    font-family: SourceHanSansCN-Regular;
                    font-weight: 400;
                    color: rgba(246, 246, 247, 1);
                    line-height: 1.5rem;
                    text-align: center;
                }
            }
            .top-right3 {
                margin-left: 1.3rem;
                font-size: 1.6rem;
                font-family: SourceHanSansCN-Regular;
                font-weight: 400;
                color: rgba(246, 246, 247, 1);
                line-height: 2.4rem;
            }
        }
        .bot {
            @include flex(space-between, center);
            height: 8rem;
            font-size: 4rem;
            .bot-block {
                text-align: center;
                margin-top: 1.4rem;
                .wea {
                    font-size: 2rem;
                    font-weight: 400;
                    color: rgba(255, 212, 65, 1);
                    line-height: 2.4rem;
                    margin-bottom: 0.4rem;
                }
                .temp {
                    font-size: 1.6rem;
                    font-family: Helvetica;
                    color: rgba(246, 246, 247, 1);
                    line-height: 1.9rem;
                    margin-bottom: 0.4rem;
                }
                .week {
                    font-size: 1rem;
                    font-family: PingFangSC-Regular;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                    line-height: 1.4rem;
                }
            }
        }
    }

</style>