<template>
    <section class="home">
        <div class="header">
            微信{{getUnReadMessageCount===0?'':getUnReadMessageCount}}
            <div class="right">
                <div class="search">
                    <img src="../assets/images/icon-search.png"/>
                </div>
                <div class="setting" @click="toSearch">
                    <img src="../assets/images/icon-setting.png"/>
                </div>
            </div>
        </div>
        <div class="chat-lists">
            <chat-list v-for="(item, index) in getFriends" :key="index" :descInfo="item"></chat-list>
        </div>
        <img class="bottom" src="../assets/images/icon-bottom.png"/>
    </section>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {State, Action, Getter} from "vuex-class";

    import ChatList from "../components/ChatList.vue";

    @Component({
        components: {
            ChatList,
        },
    })
    export default class Home extends Vue {
        @Getter getUnReadMessageCount!: number;
        @Getter getFriends!: any[];
        @Getter getUser!: any;

        toSearch() {
            this.$router.push("/search");
        }

        mounted() {
            Vue.prototype.$socket.emit("getFriends", this.getUser._id);
        }
    }
</script>
<style lang="stylus">
    @import "../assets/style/global.styl"

    .home {

        .header {
            position sticky;
            top: 0;
            background titleBgColor;
            widthHeight(750px, 90px);
            font-size: 32px;
            display flex;
            padding-left: 25px;
            align-items center;
            justify-content space-between;
            box-sizing border-box;
            border-bottom 1px solid #e6e6e6;

            .right {
                display flex;
                widthHeight(180px, 90px);

                .search {
                    flexCenter()
                    widthHeight(90px, 90px);

                    > img {
                        widthHeight(36px, 36px);
                    }
                }

                .setting {
                    flexCenter()
                    widthHeight(90px, 90px);

                    > img {
                        widthHeight(39px, 39px);
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
        }
    }
</style>
