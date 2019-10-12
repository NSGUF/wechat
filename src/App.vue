<template>
    <div id="app">
        <!--    <div id="nav">-->
        <!--      <router-link to="/">Home</router-link> |-->
        <!--      <router-link to="/about">About</router-link>-->
        <!--    </div>-->
        <router-view/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component({})
    export default class Home extends Vue {

        mounted() {
            const userInfoStr = localStorage.getItem('userInfo')
            if(userInfoStr) {
                console.log('刷新了界面，从缓存中获取用户信息')
                const userInfo = JSON.parse(userInfoStr);
                this.$store.commit("setUser", userInfo)
                Vue.prototype.$socket.emit('login', userInfo._id)
            }


            Vue.prototype.$socket.on("refreshFriends", (data: any) => {
                console.log("获取新好友通知", data);
                // 存vuex

                this.$store.commit("setFriends", data);
            });
        }
    }
</script>
<style lang="stylus">

    body, div, span, header, footer, nav, section, aside, article, ul, dl, dt, dd, li, a, p, h1, h2, h3, h4, h5, h6, i, b, textarea, button, input, select, figure, figcaption {
        padding: 0;
        margin: 0;
        list-style: none;
        font-style: normal;
        text-decoration: none;
        border: none;
        box-sizing: border-box;
        font-family: Helvetica Neue,Helvetica,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;-webkit-tap-highlight-color: transparent;
        -webkit-font-smoothing: antialiased;

        &:focus {
            outline: none;
        }
    }

    input[type="button"], input[type="submit"], input[type="search"], input[type="reset"] {
        -webkit-appearance: none;
    }

    textarea {
        -webkit-appearance: none;
    }

    #app
        -webkit-font-smoothing antialiased
        -moz-osx-font-smoothing grayscale
        color #000

    #nav
        padding 30px

        a
            font-weight bold
            color #000

            &.router-link-exact-active
                color #000
</style>
