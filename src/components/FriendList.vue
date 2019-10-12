<template>
    <div class="friend-list" @click="addFriend(descInfo._id,descInfo.userName)">
        <div class="head-num">
            <img :src="descInfo.userHeadImg" class="head-img">
            <span class="number" v-if="false"></span>
        </div>

        <div class="desc-info">
            <div class="name-time">
                <span class="name">{{this.descInfo.userName}}</span>
                <span class="time"></span>
            </div>
            <div class="message">
                {{this.descInfo.status?'在线':'离线'}}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Model, Vue} from "vue-property-decorator";
    import {Getter} from "vuex-class";

    @Component
    export default class FriendList extends Vue {
        @Model("descInfo")
        readonly descInfo: any;

        @Getter getUser !: any;

        toChat() {

            this.$router.push("/chat");
        }

        mounted() {
        }

        addFriend(_id: string, userName: string) {
            console.log(_id);
            console.log(this.getUser);
            Vue.prototype.$socket.emit("addFriend", this.getUser._id, _id);

            this.$router.push({name: "chat", params: {_id, userName}});
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

    @import "../assets/style/global.styl"
    .friend-list {
        widthHeight(750px, 135px);
        flexSB()

        .head-num {
            widthHeight(90px, 90px);
            flexSB();
            margin-left: 28px;
            margin-right: 22px;
            position relative;
            z-index: -1;

            .head-img {
                widthHeight(90px, 90px);
                border-radius 10px;
            }

            .number {
                background #fa524f;
                display inline-block;
                position absolute;
                right 0;
                top 0;
                transform translate(50%, -50%)
                font-size: 24px;
                border-radius 50%;
                color: #fff;
                padding: 0 8px;
            }
        }


        .desc-info {
            widthHeight(610px, 135px);
            border-bottom borderColor 1px solid;
            display flex;
            flex-direction: column;
            justify-content center;

            .name-time {
                width 580px;
                flexSB();
                align-items flex-start;
                margin-left: 5px;

                .name {
                    font-size: 32px;
                }

                .time {
                    font-size: 20px;
                    color: tipColor;
                }
            }

            .message {
                width 485px;
                margin-top: 5px;
                color: tipColor;
                text-overflow ellipsis;
                overflow hidden;
                white-space: nowrap;
                font-size: 24px;
            }
        }
    }
</style>
