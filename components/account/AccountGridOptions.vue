<template>
  <div>
  <div class="option-list">
    <div v-for="op in getOptions">
      <AccountOption @chooseOp="clickOp" :op="op" :key="op.id" />
    </div>
  </div>
    <div v-for="op in getOptionList">
      <AccountOptionList :op="op" @chooseOp="clickOp"/>
    </div>
  </div>
</template>

<script>
import AccountOption from '@/components/account/AccountOption'

export default {
  name: 'AccountGridOptions',
  props: { registered: Boolean,supportTel:String },
  components: { AccountOption },
  data() {
    return {
      options: [
        { id: 'op1', name: 'وضعیت سفارش', iconName: require('~/assets/icon/order-status-24px.svg') , disable: true },
        { id: 'op2', name: 'خریدهای گذشته', iconName: require('~/assets/icon/orders-24px.svg'), disable: true },
        { id: 'op3', name: 'آدرس ها', iconName: require('~/assets/icon/addresses-24px.svg'), disable: true },
      ],
      optionList:[
        { id: 'op4', name: 'پشتیبانی', iconName: require('~/assets/icon/call-24px.svg'), disable: false },
        { id: 'op5', name: 'معرفی به دوستان', iconName: require('~/assets/icon/share-24px.svg'), disable: false },
        { id: 'op6', name: 'ارسال پیام', iconName: require('~/assets/icon/send-message-24px.svg'), disable: true },
        { id: 'op7', name: 'قوانین', iconName: require('~/assets/icon/rules-24px.svg'), disable: false },
        { id: 'op9', name: 'خروج', iconName: require('~/assets/icon/logout-24px.svg'), disable: true }
      ]
    }
  },
  computed: {
    getOptions() {
      if (this.registered)
        return [
          { id: 'op1', name: 'وضعیت سفارش', iconName: require('~/assets/icon/order-status-24px.svg'), disable: false },
          { id: 'op2', name: 'خریدهای گذشته', iconName: require('~/assets/icon/orders-24px.svg'), disable: false },
          { id: 'op3', name: 'آدرس ها', iconName: require('~/assets/icon/addresses-24px.svg'), disable: false }
        ]
      else return this.options
    },
    getOptionList(){
      if (this.registered)
      return [
        { id: 'op4', name: 'پشتیبانی', iconName: require('~/assets/icon/call-24px.svg'), disable: false },
        { id: 'op5', name: 'معرفی به دوستان', iconName: require('~/assets/icon/share-24px.svg'), disable: false },
        { id: 'op6', name: 'ارسال پیام', iconName: require('~/assets/icon/send-message-24px.svg'), disable: true },
        { id: 'op7', name: 'قوانین', iconName: require('~/assets/icon/rules-24px.svg'), disable: false },
        { id: 'op9', name: 'خروج', iconName: require('~/assets/icon/logout-24px.svg'), disable: false }
      ]
      else return this.optionList
    }
  },
  methods: {
    clickOp(opId) {
      switch (opId) {
        case 'op1': {
          this.$router.push('/orders/status')
          break
        }
        case 'op2': {
          this.$router.push('/orders/transaction')
          break
        }
        case 'op3': {
          this.$router.push('/address')
          break
        }
        case 'op4': {
          window.location ='tel:'+this.supportTel;
          break
        }
        case 'op7': {
          this.$router.push("/rules")
          break
        }
        case 'op9': {
          this.$storage.removeUniversal('token')
          this.$storage.removeUniversal('mobile')
          this.$axios.defaults.headers.common = {}
            $nuxt.refresh()
          break
        }
      }
    }
  }
}
</script>

<style scoped>
.option-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
