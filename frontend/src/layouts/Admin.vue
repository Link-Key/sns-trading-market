<template>
  <div id="admin" style="padding: 100px 0 0 0;">
    <div class="wrap">
      <h1 class="big-title">Admin</h1>
      <div class="admin-content">
        <h3 style="position: relative;">
          List Admin
          <label class="admin-form">
            <input placeholder="input address" v-model="address"/>
            <button class="btn1" type="button" @click="edit(address,1)">Set Admin</button>
            <button class="btn2" type="button" @click="edit(address,0)">Unset Admin</button>
          </label>
        </h3>
        <div class="loading" v-if="isUpdate">
          <table cellpadding="0" cellspacing="0" width="100%" height="100%">
            <tr>
              <td>Processing, please wait</td>
            </tr>
          </table>
        </div>
        <div v-if="admins.length===0">No Data</div>
        <ul v-else class="admin-list" :style="show_all_text==='[Close]'?'height:auto;':'height:120px;'">
          <li v-for="(item,index) in admins">
            <span class="alt">{{item.account}}
              <span :class="'tag'+(item.isadmin===1?' active':'')"><em>{{item.account===$store.state.userInfo.address?'myself':(item.isadmin===1?'admin':'normal')}}</em></span>
            </span>
            <a class="edit" href="javascript:;" @click="edit(item.account,1)">Set Admin</a>
            <a class="del" href="javascript:;" @click="edit(item.account,0)">Unset Admin</a>
          </li>
          <li class="more" @click="showAll">{{show_all_text}}</li>
        </ul>
      </div>
      <div class="content" style="position: relative;">
        <div class="loading" v-if="isUpdate2">
          <table cellpadding="0" cellspacing="0" width="100%" height="100%">
            <tr>
              <td>Processing, please wait</td>
            </tr>
          </table>
        </div>
        <ListedCollectionComponent style="position: relative;z-index: 1;" :buttons="buttonsCollect" :data="collects" :callback="selectCollection" :callback2="collectionCallback"></ListedCollectionComponent>
      </div>
      <div class="ad-content" style="position: relative;">
        <h3 class="h3">List Ad</h3>
        <div class="loading" v-if="isUpdate3">
          <table cellpadding="0" cellspacing="0" width="100%" height="100%">
            <tr>
              <td>Processing, please wait</td>
            </tr>
          </table>
        </div>
        <div class="ad-list">
          <div class="ad-ban" v-if="banners.length>0" v-for="item in banners">
            <div class="cover">
              <button class="left" type="button" @click="adUpdate(item.id,'left')">Set Left</button>
              <button class="right" type="button" @click="adUpdate(item.id,'right')">Set Right</button>
            </div>
            <span :class="'cover-top '+item.type">{{item.type}}</span>
            <div class="file dropdown">
              <img width="100%" :src="item.uri.replace('https://ipfs.infura.io/ipfs','https://zenxhub.zenithx.co/mirror/ipfs')"/>
            </div>
            <div class="preview2">
              <button class="close" @click="deleteAd(item.id)"></button>
              <img width="100%" :src="preview"/>
            </div>
          </div>
          <div class="ad-ban">
            <div class="file dropdown" v-show="!preview">
              <DragAndDropComponent :callback="onDragEvent"></DragAndDropComponent>
              <p>PNG, JPEG. Max 2mb.</p>
              <label for="file">+ Add Banner</label><input id="file" type="file" @change="onChange" accept="image/png,image/jpeg,image/jpg">
            </div>

            <div :class="'preview ' + ( isVoice ? 'voice':'' )"  v-show="preview">
              <button class="close" @click="clearFile"></button>
              <img width="100%" :src="preview"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Popup :title="popup.title" :singleButton="true" :loading="popup.loading" :callback="popup.callback" :contents="popup.contents" v-if="popup.show"></Popup>
  </div>
</template>

<script>
import Popup from '@/components/popups/PopupComponent.vue'
import ListedCollectionComponent from '@/components/wallet/ListedCollectionComponent.vue'
import DragAndDropComponent from '@/components/item/DragAndDropComponent.vue'

export default {
  mounted(){
    window.document.title = "ZENX NFT Collection"

    this.$wallet.addListener( ( success, params )=>{
      if( success ){
        this.setDatas()
      }else{
        location.href = '/connect'
      }
    })
  },
  data () {
    return {
      preview:null,
      file:null,
      isVoice:false,
      address:null,
      isUpdate:false,
      isUpdate2:false,
      isUpdate3:false,
      buttonsCollect:['All Collections','Pending', 'Approved'],
      collectsList:[],
      banners:[],
      show_all_text:"[Show All]",
      admins:[],
      position:0,
      collects:[],
      popup:{
        show:false,
        title:"Add Banner",
        contents:"",
        callback:null,
        loading:false
      }
    }
  },
  methods:{
    selectCollection( position ){
      this.position = position
      if( position === 0 ){
        this.collects = this.collectsList
      }else if( position === 1 ){
        this.collects = this.collectsList.filter( (element)=>{ return element.status === 0 } )
      }else if( position === 2 ){
        this.collects = this.collectsList.filter( (element)=>{ return element.status === 1 } )
      }
    },
    showAll(){
      if(this.show_all_text === "[Close]"){
        this.show_all_text = "[Show All]"
      }else{
        this.show_all_text = "[Close]"
      }
    },
    collectionCallback(id,status){
      this.isUpdate2 = true
      this.$axios.post('/v1/collection', {
        method: "UpdateCollection", param: {
          id: id,
          owner: this.$store.state.userInfo.address,
          status: status
        }
      }).then((res) => {
        if (res.data != null) {
          if (res.data.status === 200) {
            // alert(res.data.msg)
            this.getCollectionList()
          }
        }
      }).catch(() => {
      })
    },
    edit(account,isAdmin){
      if(account===this.$store.state.userInfo.address){
        alert('You can\'t operate yourself')
        return
      }
      this.isUpdate = true
      this.$axios.post( '/v1/adminlist', {method:"UpdateIsAdmin", param:{
        account:account,
        owner:this.$store.state.userInfo.address,
        isadmin:isAdmin
      }} ).then((res)=>{
        if( res.data != null ){
          if(res.data.status === 200){
            // alert(res.data.msg)
            this.getAdminList()
          }
        }
      }).catch(()=>{})
    },
    getAdminList(){
      this.isUpdate = true
      this.$axios.post( '/v1/adminlist', {method:"GetAdminList", param:{
        owner:this.$store.state.userInfo.address
      }} ).then((res)=>{
        this.isUpdate = false
        if( res.data != null ){
          this.admins = res.data.data
        }
      }).catch(()=>{})
    },
    getCollectionList(){
      this.isUpdate2 = true
      this.$axios.post( '/v1/collection', {method:"GetCollectionListAdmin", param:{
        owner:this.$store.state.userInfo.address
      }} ).then((res)=>{
        this.isUpdate2 = false
        if( res.data != null ){
          if( res.data.status !== 200 ){
            alert(res.data.msg)
            history.back()
            return
          }
          this.collectsList = res.data.data
          this.selectCollection(this.position)
        }
      }).catch(()=>{})
    },
    adUpdate(id,type){
      this.isUpdate3 = true
      this.$axios.post( '/v1/banner', {method:"Update", param:{
        owner:this.$store.state.userInfo.address,
        type:type,
        id:id
      }} ).then((res)=>{
        this.isUpdate3 = false
        if( res.data != null ){
          if( res.data.status !== 200 ){
            alert(res.data.msg)
          }else{
            alert('Update ok!')
            this.getBannerList()
          }
        }
      }).catch(()=>{})
    },
    deleteAd(id){
      this.isUpdate3 = true
      this.$axios.post( '/v1/banner', {method:"Delete", param:{
        owner:this.$store.state.userInfo.address,
        id:id
      }} ).then((res)=>{
        this.isUpdate3 = false
        if( res.data != null ){
          if( res.data.status !== 200 ){
            alert(res.data.msg)
          }else{
            alert('Delete ok!')
            this.getBannerList()
          }
        }
      }).catch(()=>{})
    },
    getBannerList(){
      this.isUpdate3 = true
      this.$axios.post( '/v1/banner', {method:"ListBanner", param:{
        owner:this.$store.state.userInfo.address
      }} ).then((res)=>{
        this.isUpdate3 = false
        if( res.data != null ){
          if( res.data.status !== 200 ){
            alert(res.data.msg)
            history.back()
            return
          }
          this.banners = res.data.data
        }
      }).catch(()=>{})
    },
    setDatas(){
      this.getAdminList()

      this.getCollectionList()

      this.getBannerList()
    },
    onUploadFile( files ){
      if( files !== undefined && files.length > 0 ){
        const file = files[0]

        if( ["image/png","image/jpeg","image/jpg"].indexOf( file.type ) > -1 ){

          this.file = file
          this.isVoice = false

          const reader = new FileReader();
          reader.onload = (e)=>{ this.preview = e.target.result }
          reader.readAsDataURL(file)

          this.addBanner()

        }else{

          this.popup.title = "Error"
          this.popup.contents = "Not supported file type"
          this.popup.loading = false
          this.popup.show = true
          this.popup.callback = ()=>{
            this.popup.show = false
          }

        }
      }
    },
    onChange( e ){
      this.onUploadFile( e.target.files )
    },
    onDragEvent( event, files ){
      switch( event ){
        case 'dragover':
          break
        case 'dragleave':
          break
        case 'drop':
          if( files !== undefined && files.length ){
            this.onUploadFile( files )
          }
          break
      }
    },
    clearFile(){
      this.preview = null
      this.file = null
    },
    addBanner(){
      this.popup.title = "Add Banner"
      this.popup.contents = "Please wait a minute..."
      this.popup.loading = true
      this.popup.show = true
      this.popup.callback = ()=>{}

      const ipfs = window.IpfsHttpClient.create({host:'zenxhub.zenithx.co', port: 443, protocol:'https'});
      // const ipfs = window.IpfsHttpClient.create({host:'ipfs.infura.io', port: 5001, protocol:'https'});
      const reader = new FileReader();
      reader.onload = (e)=>{
          ipfs.add(Buffer(reader.result))
          .then((result)=>{
            console.log("result================", result);
            const uri = process.env.IPFS_URL+result.path;
            this.$axios.post( '/v1/banner', {
              method:"Add",
              param:{
                owner: this.$store.state.userInfo.address,
                uri: uri
              }
            }).then( (res)=>{
              if( res.data ){
                if( res.data.status === 500 ){
                  this.fail_call();
                  return;
                }
                this.success_call();
              }
            }).catch((err)=>{
              console.log(err)
              this.fail_call();
            })
          })
          .catch((err)=>{
            console.log(err)
            this.fail_call()
          });
      }
      reader.readAsArrayBuffer(this.file);
    },
    success_call () {
        this.popup.title = "Add Banner"
        this.popup.contents = "Success Add Banner"
        this.popup.show = true
        this.popup.loading = false
        this.popup.callback = ()=>{
          this.popup.show = false
          this.getBannerList()
        }
        this.clearFile()
    },
    fail_call () {
        this.popup.title = "Failed"
        this.popup.contents = "Failed Add Banner Blockchain Error"
        this.popup.show = true
        this.popup.loading = false
        this.popup.callback = ()=>{
          this.popup.show = false
        }
        this.clearFile()
    }
  },
  components:{
    Popup,
    ListedCollectionComponent,
    DragAndDropComponent
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#admin {
  //min-height: calc( 100vh - 65px );
  padding-bottom: 40px;
  .content .wrap{
    padding: 20px 0;
  }
  .admin-form{
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 0;
    input{
      -moz-appearance: none;
      -webkit-appearance: none;
      width: 420px;
      border-radius: 8px;
      box-shadow: none;
      font-size: 14px;
      color: #333;
      height: 30px;
      border: 1px solid #ccc;
      padding: 0 10px;
      outline: none;
      &:focus{
        border: 1px solid #ccc;
      }
    }
    button{
      margin-left: 10px;
      font-size: 14px;
      color: #fff;
      border-radius: 8px;
      border: 1px solid #f90;
      height: 30px;
      padding: 0 15px;
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      &.btn1{
        border-color: #0e56c1;
        background-color: #0e56c1;
      }
      &.btn2{
        border-color: #c40404;
        background-color: #c40404;
      }
    }
  }
  .big-title{
    border-bottom: 1px solid #d7d7d7;
    margin-bottom: 10px;
  }
  .content .items .wrap{
    border-top: 0;
  }
  .content .wrap{
    padding-top: 0;
  }
  .admin-content{
    margin-top: 20px;
    position: relative;
    z-index: 3;
  }
  .loading{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 50px;
    z-index: 4;
    text-align: center;
    font-size: 28px;
    color: #283991;
    background:linear-gradient(to right,rgba(255,255,255,0.18),rgba(255,255,255,0.78),rgba(255,255,255,0.18));
  }
  .admin-list{
    font-size: 0;
    height: 196px;
    padding: 20px 0 40px 0;
    z-index: 1;
    overflow: hidden;
    position: relative;
    .more{
      position: absolute;
      background:linear-gradient(to top,rgba(255,255,255,1),rgba(255,255,255,0.78));
      text-align: center;
      font-size: 14px;
      line-height: 39px;
      height: 39px;
      color: #0e56c1;
      cursor: pointer;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      z-index: 3;
      margin: 0;
      &:hover{
        color: #c40404;
        text-decoration: underline;
      }
    }
    li{
      display: inline-block;
      margin: 20px 20px 0 0;
      width: 560px;
      .alt{
        color: #555;
        font-size: 14px;
        position: relative;
        line-height: 20px;
        height: 20px;
        .tag{
          font-size: 10px;
          position: absolute;
          left: 0;
          bottom: 100%;
          line-height: 12px;
          font-style: normal;
          padding: 2px 4px;
          border-radius: 2px;
          background-color: #7581b9;
          color: #fff;
          display: block;
          &:before{
            content: "";
            position: absolute;
            left: 4px;
            top: 100%;
            width: 6px;
            height: 6px;
            margin-top: -5px;
            border-radius: 1px;
            background-color: #7581b9;
            transform: rotate(65deg);
          }
          &.active{
            background-color: #ec008c;
            &:before{
              background-color: #ec008c;
            }
          }
          em{
            position: relative;
            z-index: 3;
          }
        }
      }
      a{
        cursor: pointer;
        &:hover{
          text-decoration: underline;
        }
      }
      .edit{
        color: #0e56c1;
        font-size: 14px;
        margin-left: 10px;
      }
      .del{
        color: #c40404;
        font-size: 14px;
        margin-left: 10px;
      }
    }
  }

  .ad-list {
    padding: 20px 0 40px 0;
    overflow: hidden;
    position: relative;
    z-index: 1;
    .ad-ban{
      position: relative;
      width: 374px;
      margin-right: 20px;
      margin-bottom: 20px;
      height: 187px;
      float: left;
      &:nth-child(3n+3){
        margin-right: 0;
      }
      &:hover .cover{
        display: block;
      }
      .cover-top{
        position: absolute;
        top: 0;
        left: 50%;
        right: 0;
        z-index: 3;
        width: 80px;
        margin-left: -40px;
        text-align: center;
        font-size: 14px;
        border-radius:0 0 8px 8px;
        line-height: 24px;
        color: #ffffff;
        &.left{
          background-color:#0e56c1;
        }
        &.right{
          background-color:#ff8282;
        }
      }
      .cover{
        display: none;
        position: absolute;
        left: 0;
        bottom: -4px;
        height: 30px;
        right: -4px;
        overflow: hidden;
        border-radius: 0 0 12px 12px;
        z-index: 3;
        font-size: 0;
        button{
          width: 50%;
          display: inline-block;
          -webkit-appearance: none;
          color: #fff;
          line-height: 30px;
          height: 30px;
          border: 0;
          font-size: 14px;
          cursor: pointer;
          &:hover{
            opacity: .9;
          }
        }
        .left{
          background-color: #0863ff;
        }
        .right{
          background-color: #ff8282;
        }
      }
    }
    .file {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 20px;
      border: dashed 2px #e1e1e1;
      background-color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      overflow: hidden;

      p {
        font-weight: 600;
        text-align: center;
        color: #888888;
        margin-bottom: 13px;
      }

      input[type=file] {
        display: none;
      }

      label {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 44px;
        padding: 0 44px;
        margin-top: 13px;
        border-radius: 16px;
        background-color: #0564ff;
        color: white;
        z-index: 1;
      }

    }
  }

  .preview{
    position: relative;
    width: 100%;
    height: 100%;

    &.voice{
    }

    img{
      width: 100%;
      border-radius: 36px;

    }
  }

  .close{
    position: absolute;
    right: 18px;
    top: 18px;
    width: 28px;
    height: 28px;
    background-color: transparent;
    background-image: url('~@/assets/images/icon_close.png');
    background-size: 100%;
    background-repeat: no-repeat;
    outline: none;
    border: none;
    cursor: pointer;
    z-index: 3;
    &:hover{
      opacity: .8;
    }
  }

  .preview2{
    position: absolute;
    right: 0;
    top: 0;
    width: 64px;
    height: 64px;
  }

  .ad-content{
    .loading{
      top: 0;
    }
  }
}
</style>
