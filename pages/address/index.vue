<template>
  <div class='flex'>

    <div >
    <v-sheet  min-height='700' class='d-flex flex-column align-stretch '>
      <div>
        <Header class="fix-header" title="آدرس ها" />
        <div v-if="this.addresses.length<1" class="container">
          <div class="msg-center">
            <p class="empty-msg">هیج آدرسی ثبت نشده است</p>
          </div>
        </div>
        <div v-else>

        <AddressItem @editAddress="editAddress" @deleteAddress="deleteAddress" @selectAddress="selectAddress"
                     v-for="address in addresses"
                     :address="address" :key="address.id" />
        </div>

        <div style="height: 120px;">   </div>
    </div>
    </v-sheet>

    <div class="btn-container mt-auto">
      <v-btn @click="newAddress" class="btn-primary" depressed height="40" color="accent">
        ثبت آدرس جدید
      </v-btn>
    </div>
    </div>
  </div>
</template>

<script>
import AddressItem from '@/components/address/AddressItem'

export default {
  name: 'index',
  head:{
    title:'آدرس'
  },
  components: { AddressItem },
  data() {
    return {
      reload: false,
      addresses: []
    }
  },
  methods: {
    async selectAddress(addressId) {
      this.$repositories.customer.changeSelectedAddress(addressId)
        .then(res => {
          if (res !== false) {
            const index = this.addresses.findIndex(ad => ad.id === addressId)
            this.addresses.forEach(ad => {
              ad.selected = false
            })
            this.addresses[index].selected = true
          }
        })
    },
    newAddress() {
      this.$router.push('/address/new/new')
    },
    editAddress(addressId) {
      this.$router.push('/address/' + addressId)
    },
    async deleteAddress(addressId) {
      this.$repositories.customer.deleteSelectedAddress(addressId)
        .then(res => {
          if (res !== false) {
            $nuxt.refresh()
          }
        })
    }
  },
  async asyncData({ $repositories }) {
    let res = await $repositories.customer.getAddresses()
    if (res !== false) {
      if (res.data.length === 1 && res.data[0].selected === false){
       const selectSingleAddress =await $repositories.customer.changeSelectedAddress(res.data[0].id)
        if (selectSingleAddress !==false){
          res.data[0].selected = true
          return { addresses: res.data
          ,
            reload: false}
        }
      }else
        return { addresses: res.data ,
          reload: false}
    } else
      return { reload: true }
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
  z-index: 9;
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
.msg-center {
  margin: 0;
  position: absolute;
  top: 45%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.empty-msg {
  font-family: 'IranSansMobileBold', sans-serif;
  color: #808080;
  font-size: 0.8em;
  text-align: center;
  margin-top: auto;
}
</style>
