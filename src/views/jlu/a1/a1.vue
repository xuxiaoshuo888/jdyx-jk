<template>
    <div id="a1" class="a1">
        <div class="top">
            <div class="top-left">
                <div class="time">{{time}}</div>
                <div class="date">{{date}} 周三</div>
            </div>
            <div class="top-mid"></div>
            <div class="top-right1"><img :src="data.dayIcon" alt=""></div>
            <div class="top-right2">
                <div class="temp">{{data.temp}}
                    <span>℃</span>
                </div>
                <div class="weather">{{data.weather}}</div>
            </div>
            <div class="top-right3">
                <div>{{data.wind}}</div>
                <div>{{data.nightTemp}}~{{data.dayTemp}}℃</div>
                <div>pm2.5：{{data.pm25}}</div>
            </div>
        </div>
        <div class="bot">
            <div class="bot-text" style="text-align: center">{{province}} {{city}} {{area}}</div>
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
                province: "",
                city: "",
                area: "",
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
                width: 14.5rem;
                text-align: center;
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
                margin: 0 0.5rem;
            }
            .top-right1 {
                width: 8.2rem;
                height: 6.9rem;
                font-size: 5.8rem;
                font-weight: 400;
                color: rgba(255, 212, 65, 1);
                line-height: 6.9rem;
                img{
                    width: 100%;
                }
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
                margin-left: 1rem;
                font-size: 1.6rem;
                font-family: SourceHanSansCN-Regular;
                font-weight: 400;
                color: rgba(246, 246, 247, 1);
                line-height: 2.4rem;
            }
        }
        .bot {
            /*<!--@include flex(space-between, center);-->*/
            .bot-text{
                margin-top: 2rem;
                text-align: center;
            }
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