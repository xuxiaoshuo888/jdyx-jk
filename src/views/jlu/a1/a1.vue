<template>
    <div id="a1" class="a1">
        <div class="top">
            <div class="top-left">
                <div class="time">18:08:08</div>
                <div class="date">2019/8/7 pm 周三</div>
            </div>
            <div class="top-mid"></div>
            <div class="top-right1">3</div>
            <div class="top-right2">
                <div class="temp">25
                    <span>℃</span>
                </div>
                <div class="weather">多云转晴</div>
            </div>
            <div class="top-right3">
                <div>多云</div>
                <div>16~28℃</div>
                <div>吉林</div>
            </div>
        </div>
        <div class="bot">
            <div class="bot-block" v-for="i in 6" :key="i">
                <div class="wea">1</div>
                <div class="temp">18~28℃</div>
                <div class="week">周四</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "a1"
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