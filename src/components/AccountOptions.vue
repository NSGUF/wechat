<template>
    <div class="account-options">
        <div class="options-container">
            <div class="item">
                找回密码
            </div>
            <div class="decorate"></div>
            <div class="item">
                紧急冻结
            </div>
            <div class="decorate"></div>
            <div class="item" @click="toRegister">
                注册
            </div>
        </div>

    </div>
</template>

<script lang="ts">
    import {Component, Model, Vue} from "vue-property-decorator";

    @Component
    export default class AccountOptions extends Vue {

        toRegister() {
            this.$router.push("/register");
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

    @import "../assets/style/global.styl"
    .account-options {
        position absolute;
        bottom 20px;
        width 100%;

        .options-container {
            flexCenter();

            .item {
                color: agreementColor;
                font-size 27px;
            }
            .decorate {
                width 2px;
                height 45px;
                border-right solid 1px borderColor
                margin: 0 20px;
            }
        }
    }
</style>
