<template>
  <div>
    <v-sheet rounded outlined class="new-order">
      <v-icon style="margin: 1vh" color="accent" x-large>{{mdiCheckCircle}}</v-icon>
      <div style="margin: 1vh">سفارش شما با موفقیت ثبت گردید</div>
      <div class="tracking-number">شماره سفارش</div>
      <div class="tracking-number">{{ order.trackingNumber }}</div>
      <v-row no-gutters class="order-info">
        <v-col class="left-col">
          {{ order.createdDate.split('_')[0] }}
        </v-col>
        <v-col class="right-col">
          {{ order.createdDate.split('_')[1] }}
        </v-col>
      </v-row>
      <v-row no-gutters class="order-info">
        <v-col class="left-col">
          {{ getDeliveryType }}
          :نحوه ارسال
          <v-icon>{{mdiTruckOutline}}</v-icon>
        </v-col>
        <v-col class="right-col">
          آدرس:
          {{address.title}}
          <v-icon>{{mdiMapMarker}}</v-icon>
        </v-col>
      </v-row>
      <v-row no-gutters class="address-details" style="direction: rtl">
          {{ address.details }}
      </v-row>
    </v-sheet>

    <div class="btn-container">
      <v-btn @click="gotoOrderStatus" class="btn-primary" depressed height="40" color="accent">
        وضعیت سفارش
      </v-btn>
    </div>
  </div>

</template>

<script>
import { mdiCheckCircle, mdiTruckOutline, mdiMapMarker } from '@mdi/js'
export default {
  name: 'index',
  data(){
    return{
      mdiCheckCircle: mdiCheckCircle,
      mdiTruckOutline: mdiTruckOutline,
      mdiMapMarker: mdiMapMarker
    }
  },
  async mounted() {
    await this.$store.dispatch('cart/delete_cart')
  },
  methods: {
    gotoOrderStatus(){
      this.$router.push('/orders/status')
    }
  },
  computed: {
    getDeliveryType() {
      if (this.order.deliveryType === 'EXPRESS') {
        return 'اکسپرس'
      } else
        return 'عادی'
    }
  },
  async asyncData({ redirect, app }) {
    if (app.$storage.getCookie('order') !== undefined) {
      return {
        order: app.$storage.getCookie('order').orderDetail,
        address : app.$storage.getCookie('order').address
      }
    } else {
      redirect('/account')
    }
  },
  activated() {
    $nuxt.refresh()
  }
}
</script>

<style scoped>
.btn-container {
  position: fixed;
  position: -webkit-sticky;
  bottom: 56px;
  display: flex;
  width: 100%;
  z-index: 7;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: #F2F3F5;
}

.btn-primary {
  margin: 2vh auto;
  width: 94%;
  font-size: 1em;
  font-family: 'IranSansMobileBold', sans-serif;
}

.new-order {
  text-align: center;
  font-size: 1.15em;
  margin-top: 20vh;
  margin-left: 2vh;
  margin-right: 2vh;
  color: #808080;
}

.warning-balance {
  color: #FF6672;
}

.enough-balance {
  color: #0BCE83;
}

.order-info {
  font-size: 0.8em;
  margin: 1vh;
}
.address-details {
  font-size: 0.8em;
  margin-right: 1.5vh;
  margin-left: 1.5vh;
  margin-bottom: 1vh;
}

.left-col {
  text-align: left;
  font-size: 0.9em;
}

.right-col-op {
  text-align: right;
  font-size: 0.9em;
}

.left-col-op {
  text-align: left;
  direction: rtl;
  font-size: 0.9em;
}

.right-col {
  font-size: 0.9em;
  text-align: right;
}

.tracking-number {
  text-align: center;
  font-size: 1.1em;
  margin: 2vh;
  color: #0BCE83;
}

.new-order-operations {
  text-align: center;
  font-size: 1.1em;
  margin: 2vh;
}

.payment-status {
  text-align: center;
  font-size: 1em;

  color: #808080;
}
.enough-credit {
  text-align: center;
  font-size: 0.9em;
  color: #808080;
}
</style>
