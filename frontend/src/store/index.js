import Vue from 'vue'
import Vuex from 'vuex'
import Moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      currency:{
        settimestamp:null,
        isSet:false,
        ethbtc:null,
        ethbtc_tilestamp:null,
        ethusd:null,
        ethusd_timestamp:null
      },
      count: 0,
      userInfo:{
        isSet:false,
        address:null,
        account:null,
        name:null,
        email:null,
        introduction:null,
        registered:0
      }
    },
    mutations: {
      setCurrency( state, currency ){
        state.currency={
          settimestamp:Moment().unix(),
          ethbtc:currency.ethbtc,
          ethbtc_tilestamp:currency.ethbtc_tilestamp,
          ethusd:currency.ethusd,
          ethusd_timestamp:currency.ethusd_timestamp
        }
      },
      setNoBody( state, ){
        state.userInfo = {
          isSet:false,
          address:null,
          account:null,
          name:null,
          email:null,
          introduction:null,
          registered:0
        }
      },
      setUserInfo( state, info ){
        state.userInfo = {
            isSet:info.isSet,
            address:info.address,
            account:info.account,
            name:info.name,
            email:info.email,
            isadmin:info.isadmin,
            introduction:info.introduction,
            registered:info.registered
        }
      }
    }
})
