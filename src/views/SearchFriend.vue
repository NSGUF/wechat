<template>
    <section class="chat">
        <div class="header">
            <div class="left">
                <div class="back" @click="backLast">
                    <img src="../assets/images/chat/icon-back.png"/>
                </div>
                <input type="search" class="message-input" @keydown.enter="searchFriend" v-model="keywordInput"
                       placeholder="昵称/手机号"/>
            </div>
        </div>
        <div class="chat-lists">
            <friend-list v-for="(item, index) in resultList" :descInfo="item" :key="index"></friend-list>
        </div>

    </section>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import UserApi from "../apis/UserApi";
    import AjaxResponse = Response.AjaxResponse;
    import FriendList from '../components/FriendList.vue'

    @Component({
        components: {
            FriendList,
        },
    })
    export default class Home extends Vue {
        keywordInput: string = "";

        resultList: any[] = [];

        userApi: UserApi = new UserApi();

        backLast() {
            this.$router.back();
        }

        searchFriend() {
            this.userApi.searchFriend({keyword: this.keywordInput}).then((res: any) => {
                this.resultList = res.data;
                console.log(res.data)
            });
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

                .message-input {
                    flex-grow 1;
                    height 75px;
                    border: 0;
                    background titleBgColor;
                    border-radius 5px;
                    outline none;
                    padding-left: 10px;
                    font-size 32px;
                    color: #000;
                    width 550px;
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
            padding-bottom: 104px;
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
</style>
