<template>
  <v-sheet class="customer-container" rounded outlined>
    <div style="direction: rtl;margin: 1vw;text-align: center">
      <div class="customer-info">{{ name }}</div>
      <div class="customer-info">{{ engDigitToPersianDigit(customerInfo.mobile) }}</div>
    </div>
    <div style="direction: rtl">
      <v-btn rounded depressed class="btn" @click="customerData">
        <v-icon size="24" class="icon-btn" color="secondary">{{mdiPencilOutline}}</v-icon>
      </v-btn>
    </div>
    <v-sheet style="margin: 4vh 1.5vh 1.5vh;" rounded outlined>
      <v-row no-gutters class="row-customer-balance">
        <v-col cols="1">
          <v-icon>{{mdiWallet}}</v-icon>
        </v-col>
        <v-col>
          اعتبار کاربر
        </v-col>
        <v-col style="text-align: left">
          {{ engDigitToPersianPrice(customerInfo.balance) }}
        </v-col>
      </v-row>
    </v-sheet>
  </v-sheet>
</template>

<script>
import PersianUtil from '@/utils/PersianUtil'
import {mdiPencilOutline,  mdiWallet } from '@mdi/js'

export default {
  name: 'RegisteredCustomer',
  props: { customerInfo: Object },
  data() {
    return {
      mdiWallet: mdiWallet,
      mdiPencilOutline: mdiPencilOutline,
      name: this.customerInfo.name == null ? '' : this.customerInfo.name
    }
  },
  methods: {
    customerData(){
      this.$router.push('/account/1')
    },
    engDigitToPersianPrice: function(val) {
      return PersianUtil.makePersianPrice(val)
    },
    engDigitToPersianDigit: function(val) {
      return PersianUtil.covertEngDigitToPersianDigit(val)
    }
  }
}
</script>

<style scoped>
.row {
  margin: 1.5vh;
}

.account-card {

}

.customer-container {
  height: 30vh;
  margin: 2vh 1.6vw 1.6vw;
}

.btn {
  background-color: #E6E6E6;
  margin-right: 2vh;
}

.customer-info {
  margin: 1vh;
  font-size: 1em;
}

.row-customer-balance {
  direction: rtl;
}
</style>
