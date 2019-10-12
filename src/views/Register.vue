<template>
    <section class="register">
        <img class="back-img" src="../assets/images/login/icon-back-x.png" @click="toLogin" alt=""/>
        <h1 class="title">手机号注册</h1>
        <div class="basic-info">
            <div class="name">
                <div class="label">昵称</div>
                <input type="text" placeholder="例如：方智峰" v-model="userName"/>
            </div>
            <div class="head-img">
                <img src="../assets/images/login/icon-camera.png" alt="">
                <input type="file" class="add-img"/>
            </div>
        </div>
        <div class="country">
            <div class="label">国家/地区</div>
            <span>中国大陆(+86)</span>
        </div>
        <div class="tell-phone">
            <div class="label">手机号</div>
            <input type="tel" v-model="phoneNumber" placeholder="请填写手机"/>
        </div>
        <div class="password">
            <div class="label">密码</div>
            <input type="password" placeholder="填写密码" v-model="password"/>
        </div>
        <div class="agreement" @click="changeAgreement">
            <img :src="isAgreement?imgObjs.select:imgObjs.noSelect" alt="">
            已阅读并同意<span>《爱我软件许可及服务协议》</span>
        </div>
        <input type="submit" value="注册" class="submit-input" @click="submit" :disabled="!isCanSubmit" :class="isCanSubmit?'submit-input':'submit-input disabled-input'"/>

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
        userName: string = ''
        password: string = ''
        phoneNumber: string = ''


        isShowMessage: boolean = false;
        messageTip: string = '';

        isAgreement: boolean = false;
        isCanSubmit: boolean = false;

        registerApi: RegisterApi = new RegisterApi()

        imgObjs: any = {
            noSelect: require('../assets/images/login/icon-no-select.png'),
            select: require('../assets/images/login/icon-select.png'),
        }
        toLogin() {
            this.$router.push('/')
        }


        disapperMessage() {
            this.isShowMessage = true;
            setTimeout(() => {
                this.isShowMessage = false;
            }, 1.5 * 1000);
        }


        @Watch('userName')
        userNameChanged(newVal: string, oldVal: string) {
            this.refreshSubmit()
        }
        @Watch('password')
        passwordChanged(newVal: string, oldVal: string) {
            this.refreshSubmit()
        }
        @Watch('phoneNumber')
        phoneNumberChanged(newVal: string, oldVal: string) {
            this.refreshSubmit()
        }
        @Watch('isAgreement')
        isAgreementChanged(newVal: string, oldVal: string) {
            this.refreshSubmit()
        }

        submit() {
            console.log('test')
            this.registerApi.doRegiest({
                userName: this.userName,
                password: this.password,
                phoneNumber: this.phoneNumber,
            }).then((res: any) => {
                this.$router.push('/')
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
            if(this.userName!==''&&this.password!==''&&this.phoneNumber!==''&&this.isAgreement) {
                this.isCanSubmit = true
            } else {
                this.isCanSubmit = false
            }
        }

        changeAgreement() {
            this.isAgreement = !this.isAgreement
        }
    }
</script>
<style lang="stylus">
    @import "../assets/style/global.styl"

    .register {
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

        .tell-phone, .password {

            border-bottom: 1px solid borderColor;

            > input {
                background titleBgColor
                font-size 32px;
            }
        }

        .agreement {
            margin-top: 50px;
            font-size: 26px;
            color: tipColor;
            flexCenter()

            > img {
                widthHeight(30px, 30px);
                margin-right 12px;
            }

            > span {
                color: agreementColor;
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
            margin-top: 20px;
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
