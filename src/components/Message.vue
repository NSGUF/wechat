<template>
  <div class='message-page' v-if="isShowMessage">
    <div class="container">
      <div class="context">
        <div class="tip">{{messageTip}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Component from 'vue-class-component';
  import { Vue, Model } from 'vue-property-decorator';
  @Component({
    components: {},
  })
  export default class Message extends Vue {
    @Model('isShowMessage', { type: Boolean }) readonly isShowMessage!: boolean;

    @Model('messageTip', { type: String }) readonly messageTip!: string;


    mounted() {
    }
  }
</script>

<style lang="stylus" scoped>

  .message-page {

    .container {
      position fixed
      z-index 9999
      display flex
      background rgba(0, 0, 0, .8)
      color #fff
      border-radius 16px
      font-size 28px
      top 50%
      left 50%
      padding 20px
      transition: all 0.3s ease-out 0s;
      transform translateX(-50%) translateY(-50%)

      .context {
        display flex
        flex-direction column
        align-items center
        max-width 440px

        .title {
          text-align center
          line-height 50px
          padding-bottom 20px
          font-size 32px
        }

        .tip {
          text-align center
        }

        .btn {
          width 100%
          font-size 32px
          padding-top 20px
          text-align center
        }
      }
    }
  }

</style>
