<template>
    <section class="login">
        <img class="back-img" @click="toBack" src="../assets/images/login/icon-back-x.png" alt=""/>
        <h1 class="title">微信号/QQ/邮箱登录</h1>
        <div class="tell-phone">
            <div class="label">账号</div>
            <input type="tel" v-model="phoneNumber" placeholder="请填写微信号/QQ/邮箱登录"/>
        </div>
        <div class="password">
            <div class="label">密码</div>
            <input type="password" placeholder="请填写密码" v-model="password"/>
        </div>
        <div class="other-way">
            用手机号登陆
        </div>
        <input type="submit" value="登陆" class="submit-input" @click="submit" :disabled="!isCanSubmit" :class="isCanSubmit?'submit-input':'submit-input disabled-input'"/>

        <Message :isShowMessage="isShowMessage" :messageTip="messageTip"></Message>
    </section>
</template>

<script lang="ts">
    import {Component,Watch, Vue} from "vue-property-decorator";
    import RegisterApi from '../apis/Register'
    import AjaxResponse = Response.AjaxResponse;
    import Message from '../components/Message.vue';

    import { AxiosRequestConfig, Method, AxiosResponse } from 'axios'
    @Component({
        components: {
            Message,
        },
    })
    export default class Home extends Vue {
        password: string = ''
        phoneNumber: string = ''


        isShowMessage: boolean = false;
        messageTip: string = '';

        isCanSubmit: boolean = false;

        registerApi: RegisterApi = new RegisterApi()

        imgObjs: any = {
            noSelect: require('../assets/images/login/icon-no-select.png'),
            select: require('../assets/images/login/icon-select.png'),
        }

        toBack() {
            this.$router.push('/')
        }

        disapperMessage() {
            this.isShowMessage = true;
            setTimeout(() => {
                this.isShowMessage = false;
            }, 1.5 * 1000);
        }

        @Watch('password')
        passwordChanged(newVal: string, oldVal: string) {
            this.refreshSubmit()
        }
        @Watch('phoneNumber')
        phoneNumberChanged(newVal: string, oldVal: string) {
            this.refreshSubmit()
        }

        submit() {
            this.registerApi.doLogin({
                password: this.password,
                phoneNumber: this.phoneNumber,
            }).then((res: any) => {
                localStorage.setItem("userInfo", JSON.stringify(res.data));
                this.$store.commit("setUser", res.data);
                Vue.prototype.$socket.emit('login', res.data._id)
                this.$router.push('/home')   
                console.log(res)
            }).catch((res: AjaxResponse) => {
                console.log(res)
                this.messageTip = res.msg||'';
                this.isShowMessage = false;
                this.disapperMessage();
            })
        }

        backLast() {
            this.$router.back();
        }

        refreshSubmit() {
            if(this.password!==''&&this.phoneNumber!=='') {
                this.isCanSubmit = true
            } else {
                this.isCanSubmit = false
            }
        }

    }
</script>
<style lang="stylus">
    @import "../assets/style/global.styl"

    .login {
        min-height 100vh
        background titleBgColor

        .back-img {
            widthHeight(30px, 30px);
            margin-left: 30px;
            margin-top: 30px;
        }

        .title {
            margin-top: 100px;
            font-size 48px;
            margin-left: 30px;
        }

        .basic-info {
            margin-top: 50px;
            height 120px;
            font-size 32px;
            width 750px;
            flexSB();

            .name {
                overflow hidden;
                width 565px;
                padding-top: 50px;
                height 120px;
                border-bottom: 1px solid borderColor;
                display flex
                margin-left: 20px;

                > input {
                    background titleBgColor
                    font-size 32px;
                    width 350px;
                }
            }

            .head-img {
                widthHeight(120px, 120px);
                position: relative
                margin-right 20px;

                > img {
                    widthHeight(120px, 120px);
                }

                .add-img {
                    widthHeight(120px, 120px);
                    position absolute
                    top: 0;
                    left: 0;
                    opacity: 0;
                }
            }
        }

        .country, .tell-phone, .password {
            margin: auto;
            widthHeight(710px, 105px);
            display flex
            align-items center

            > span {
                color submitColor;
                font-size 32px;
            }

        }
        .tell-phone {
            margin-top: 80px;
        }

        .other-way {
            font-size 32px;
            color: agreementColor;
            margin-top: 55px;
            margin-bottom 80px;
            margin-left: 40px;
        }

        .tell-phone, .password {

            border-bottom: 1px solid borderColor;

            > input {
                background titleBgColor
                font-size 32px;
            }
        }

        .submit-input {
            widthHeight(705px,90px);
            line-height 90px;
            text-align center;
            border-radius 10px;
            background submitColor;
            color: #fff;
            margin: auto;
            font-size: 36px;
            display block;
        }
        .disabled-input {
            background noSubmitColor
            color: #b5b5b5;
        }

        div {

            .label {
                margin-left 15px;
                font-size 32px;
                display flex
                align-items center

                width 185px;
            }
        }

    }
</style>
