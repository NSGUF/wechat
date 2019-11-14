<template>
    <section class="chat">
        <div class="header">
            <div class="left">
                <div class="back" @click="backLast">
                    <img src="../assets/images/chat/icon-back.png"/>
                </div>
                {{this.$route.params.userName}}
            </div>
            <div class="right">
                <div class="setting">
                    <img src="../assets/images/chat/icon-more.png"/>
                </div>
            </div>
        </div>
        <div class="chat-lists">
            <scroller ref="scroller" class="scroller"
                      :on-refresh="loadMoreMessage">

                <div :class="getUser._id===item.fromId?'message you':'message'" v-for="(item, index) in chatContent">
                    <div class="time-info" v-if="item.isShowTime">
                        <div class="time-text">{{item.dateStr}}</div>
                    </div>
                    <div class="message-content">
                        <img class="head-img" :src="getUser._id===item.fromId?item.fromUserHeadImg:item.toUserHeadImg"
                             alt="">
                        <div class="message">
                            <div class="message-text">
                                {{item.message}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hight-add"></div>
            </scroller>
        </div>
        <div class="bottom">
            <div class="icon-voice">
                <img class="icon-voice" src="../assets/images/chat/icon-voice.png" alt="">
            </div>
            <input type="text" class="message-input" v-model="messageInput"/>
            <div class="expression-setting">
                <img class="icon-expression" src="../assets/images/chat/icon-expression.png" alt="">
                <img class="icon-setting" src="../assets/images/chat/icon-more-setting.png" alt="" v-if="!messageInput">
                <input type="submit" class="submit-input" value="发送" @click="sendMessage" v-else/>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {Getter} from "vuex-class";
    import UserApi from "../apis/UserApi";
    import AjaxResponse = Response.AjaxResponse;

    @Component({
        components: {},
    })
    export default class Home extends Vue {
        messageInput: string = "";

        @Getter getUser!: any;

        userApi: UserApi = new UserApi();

        hasMsgMore: boolean = true;
        isLoading: boolean = false;
        chatContent: any[] = [];

        page: number = 1;
        pageSize: number = 15;


        backLast() {
            this.$router.push("/home");
        }

        sendMessage() {
            Vue.prototype.$socket.emit("sendPrivateMsg",
                this.getUser._id,
                this.$route.params._id,
                this.messageInput,
            );
            this.messageInput = "";
        }

        mounted() {
            Vue.prototype.$socket.emit("seed", this.getUser._id, this.$route.params._id);
            Vue.prototype.$socket.on("newMsg", (data: any) => {
                this.chatContent.push(data);
                console.log(data);

                console.log(this.getUser._id);
                if (String(data.fromId) !== String(this.getUser._id)) {
                    Vue.prototype.$socket.emit("seed", this.getUser._id, this.$route.params._id);
                }
                this.toBottomA();
            });
            this.pullMessage();
            this.toBottomA();
        }

        pullMessage(loaded?: any) {
            if (this.hasMsgMore && !this.isLoading) {
                this.isLoading = true;
                this.userApi.getMessages(this.getUser._id, this.$route.params._id, this.page, this.pageSize).then((res: any) => {
                    this.chatContent = [...res.data, ...this.chatContent];
                    if (res.data.length === this.pageSize) {
                        this.hasMsgMore = true;
                    } else {
                        this.hasMsgMore = false;
                    }
                    this.$forceUpdate();
                    if (loaded) {
                        loaded();
                    }
                    this.isLoading = false
                });
            } else {
                if (!this.hasMsgMore) {
                    console.log("没有了更多消息了");
                } else {
                    console.log("正在加载");
                }
                if (loaded) {
                    loaded();
                }
            }
        }

        loadMoreMessage(loaded: any) {
            console.log("more");
            this.page++;
            this.pullMessage(loaded);
        }

        get myScroll() {
            if (this.$refs.scroller) {
                const obj: any = this.$refs.scroller;
                return obj;
            } else {
                return null;
            }
        }

        toBottomA() {
            if (this.myScroll) {
                setTimeout(() => {
                    this.myScroll.scrollTo(0, document.getElementsByClassName("_v-content")[0].clientHeight, true);
                }, 100);
            }
        }

    }
</script>
<style lang="stylus">
    @import "../assets/style/global.styl"

    .chat {

        .header {
            position sticky;
            top: 0;
            background titleBgColor;
            widthHeight(750px, 90px);
            font-size: 32px;
            display flex;
            align-items center;
            justify-content space-between;
            box-sizing border-box;
            color #000;
            border-bottom 1px solid #e6e6e6;

            .left {
                display flex;
                align-items center;

                .back {
                    flexCenter()
                    widthHeight(90px, 90px);

                    > img {
                        widthHeight(20px, 34px);
                    }
                }

            }

            .right {
                .setting {
                    flexCenter()
                    widthHeight(90px, 90px);

                    > img {
                        widthHeight(35px, 9px);
                    }
                }
            }
        }

        .chat-lists {
            box-sizing border-box;
            padding: 0 25px 124px;
            background titleBgColor
            min-height 100vh;

            .scroller {
                top: 90px;

                .hight-add {
                    height: 104px;
                }
            }

            .message {
                width 700px;
                margin: auto;

                .time-info {
                    padding-top: 30px;
                    padding-bottom: 40px;
                    //    32px

                    .time-text {
                        font-size 24px;
                        color: timeColor;
                        text-align center;
                    }
                }

                .message-content {
                    margin-bottom 20px;

                    .head-img {
                        float left;
                        width 75px;
                        height 75px;
                        border-radius 10px;
                    }

                    .message {
                        margin: auto;

                        .message-text {
                            margin-left 20px;
                            background #fff;
                            max-width 515px;
                            line-height: 1.10rem;
                            display: inline-block;
                            vertical-align: top;
                            position: relative;
                            text-align: left;
                            font-size 32px;
                            border-radius: 10px;
                            padding: 20px 25px;
                            word-break: break-all;
                        }

                        .message-text::before {
                            position: absolute;
                            top: 35px;
                            border: 10px solid transparent;
                            content: "";
                            border-right-color: #fff;
                            border-right-width: 10px;
                            right: 100%;
                        }

                    }


                }

            }

            .you {
                .message-content {
                    overflow hidden

                    .head-img {
                        float right;
                        width 75px;
                        height 75px;
                        border-radius 10px;
                    }

                    .message {


                        .message-text {
                            float right;
                            margin-right 20px;
                            background myMessageColor;
                            max-width 515px;
                            line-height: 1.12rem;
                            display: inline-block;
                            vertical-align: top;
                            position: relative;
                            text-align: left;
                            font-size 32px;
                            border-radius: 10px;
                            padding: 25px;
                            word-wrap: break-word;
                            word-break: break-all;
                        }

                        .message-text::before {
                            position: absolute;
                            top: 35px;
                            border: 10px solid transparent;
                            content: "";
                            border-left-color: myMessageColor;
                            border-left-width: 10px;
                            left: 100%;
                        }


                    }

                }
            }
        }

        .bottom {
            width: 750px;
            height: 104px;
            position: fixed;
            bottom: 0;
            left: 0;
            border-top: 1px solid #d7d7d7;
            display flex
            align-items center
            box-sizing border-box;
            background bottomColor;

            .message-input {
                flex-grow 1;
                height 75px;
                border: 0;
                border-radius 5px;
                outline none;
                padding-left: 10px;
                font-size 32px;
                color: #000;
            }

            .icon-voice {
                flexCenter()
                widthHeight(90px, 90px);

                > img {
                    widthHeight(53px, 53px);
                }
            }

            .expression-setting {
                flexCenter()
                margin-left: 20px;
                justify-content space-between

                > img {
                    widthHeight(53px, 53px);
                    margin-right 20px;
                }

                .submit-input {
                    display inline-block;
                    widthHeight(110px, 60px);
                    background submitColor
                    color #fff;
                    font-size 30px;
                    margin-right 20px;
                    border-radius 7px;
                }
            }
        }
    }

    /deep/ ._v-container {
        top: 110px;
    }

    /deep/ .arrow {
        width 30px !important
        height 30px !important
    }

    /deep/ .text {
        font-size 14px !important
    }

    /deep/ .spinner {
        width 50px !important
        height 50px !important
    }

    .bottom {
        background #eeeeee;
    }
</style>
