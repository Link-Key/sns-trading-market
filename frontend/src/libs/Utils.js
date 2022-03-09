import Web3 from 'web3'
import Moment from 'moment'
import Axios from 'axios'

class Utils{
    constructor(){}

    getCurrency( store ){
      if( store.state.currency.settimestamp == null  || store.state.currency.settimestamp + 15 < Moment().unix() ){
        Axios.get( "https://zenxhub.zenithx.co/etherscan/api?module=stats&action=ethprice" ).then( (res)=>{
          if( res.data && res.data.result ){
            store.commit( "setCurrency", res.data.result )
          }
        }).catch(()=>{})
      }
    }

    fromWei( price, length = 7 ){
        if( price != null && price != undefined && price != "" ){
          // if( price.indexOf('E') > -1 || price.indexOf('e') > -1 ){
          //   price = new Number( price ).toFixed();
          // }
          var result = Web3.utils.fromWei( "" + price );

          if( result.indexOf("0.") == 0 && result.length > 8){
            return result.substring(0, length )
          }
          return result
        }
        return "0";
      }

      shorten( string, length = 14 ){
        if( string != null && typeof(string) == 'string' )
          return string.substring(0, length)
        return null
      }

      dateFormat( timestamp ){
        if( !timestamp ) return "-"

        if( Number.isInteger(timestamp) ){
          if( String(timestamp).length <= 10  ){
              timestamp = timestamp * 1000
          }
          var datetime = Moment(timestamp)
          var currentTime = Moment()
          if( datetime.diff( currentTime, 'days' ) > 0 ){
            return datetime.format( "YYYY-MM-DD" )
          }else if( datetime.diff( currentTime, 'days' ) < 0 ){
              return datetime.format( "YYYY-MM-DD" )
          }else if( datetime.diff( currentTime, 'hours' ) < 0 ){
              return Math.abs(datetime.diff( currentTime, 'hours' ) ) + "시간 전"
          }else{
              return Math.floor( Math.abs(datetime.diff( currentTime, 'seconds' )/60) ) + "분 전"
          }
        }else{
            return "-"
        }
      }
}

export default new Utils()
