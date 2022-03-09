<template>
    <div id="create">
      <div class="wrap">
        <h1>Create <br class="pc-none">your Collection here</h1>
        <div class="input__group">
          <h2>Upload file</h2>

          <div class="file dropdown" v-show="!preview">
            <DragAndDropComponent :callback="onDragEvent"></DragAndDropComponent>
            <p>PNG, JPEG. Max 2mb.</p>
            <label for="file">Add Cover Image</label><input id="file" type="file" @change="onChange" accept="image/png,image/jpeg,image/jpg">
          </div>

          <div :class="'preview ' + ( isVoice ? 'voice':'' )"  v-show="preview">
            <button class="close" @click="clearFile"></button>
            <img :src="preview">
          </div>

        </div>
        <div class="input__group">
          <h2>Title</h2>
          <input type="text" placeholder="Title" v-model="title">
        </div>
        <div class="input__group">
          <h2>Description</h2>
          <textarea placeholder="Description" v-model="description"></textarea>
        </div>
        <div class="input__group">
          <h2>Home Page</h2>
          <div class="short-uri">
            <span class="short-uri-prev">{{currentdomain}}</span>
            <input class="short-uri-input" type="text" placeholder="Enter short field settings home page" v-model="shorturi" @input="shortUriChange"/>
            <p class="short-uri-tip">{{shortUriTip}}</p>
          </div>
        </div>
        <div class="input__group">
          <button class="submit" @click="createCollection" :disabled="!isEnable()">Create Collection</button>
        </div>
      </div>
      <Popup :title="popup.title" :singleButton="true" :loading="popup.loading" :callback="popup.callback" :contents="popup.contents" v-if="popup.show"></Popup>
  </div>
</template>

<script>
import Popup from '@/components/popups/PopupComponent.vue'
import DragAndDropComponent from '@/components/item/DragAndDropComponent.vue'

export default {
  mounted(){
  },
  data () {
    return {
      preview:null,
      isVoice:false,
      file:null,
      shorturi:null,
      currentdomain:null,
      title:null,
      shortUriTip:null,
      description:null,
      shorturibool:false,
      popup:{
        show:false,
        title:"Create Collection",
        contents:"",
        callback:null,
        loading:false
      }
    }
  },
  created(){
    this.currentdomain = window.location.origin + '/u/';
  },
  methods:{
    onUploadFile( files ){
      if( files !== undefined && files.length > 0 ){
        const file = files[0]

        if( ["image/png","image/jpeg","image/jpg"].indexOf( file.type ) > -1 ){

          this.file = file
          this.isVoice = false

          const reader = new FileReader();
          reader.onload = (e)=>{ this.preview = e.target.result }
          reader.readAsDataURL(file);

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
    isEnable(){
      return (
        this.file != null &&
        this.description != null &&
        this.title != null &&
        this.description.length > 0 &&
        this.title.length > 0 &&
        this.shorturi != null &&
        this.shorturi.length > 0 &&
        this.shorturibool
      )
    },
    shortUriChange(){
      if(this.shorturi.length<=3){
        return this.shortUriTip = 'At least 4 letters'
      }
      this.$axios.post( '/v1/collection', {
        method:"ShortUriCheck",
        param:{
          owner: this.$store.state.userInfo.address,
          uri: this.shorturi
        }
      }).then( (res)=>{
        console.log('res========',res.data)
        if(res.data.status !== 200){
          this.shorturibool = false
          this.shortUriTip = res.data.msg?res.data.msg:'Please try another one'
        }else{
          this.shorturibool = true
          this.shortUriTip = ''
        }
      })
    },
    createCollection(){
      if( this.isEnable() ){

        this.popup.title = "Create Collection"
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
              this.$axios.post( '/v1/collection', {
                method:"RegisterCollection",
                param:{
                  owner: this.$store.state.userInfo.address,
                  title: this.title,
                  uri: uri,
                  shorturi:this.shorturi,
                  description: this.description
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
      }
    },
    success_call () {
        this.popup.title = "Create Collection"
        this.popup.contents = "Success Create Collection"
        this.popup.show = true
        this.popup.loading = false
        this.popup.callback = ()=>{
          this.popup.show = false
          location.href = '/wallet'
        }
    },
    fail_call () {
        this.popup.title = "Failed"
        this.popup.contents = "Failed Create Collection Blockchain Error"
        this.popup.show = true
        this.popup.loading = false
        this.popup.callback = ()=>{
          this.popup.show = false
        }
    }
  },
  components:{
    DragAndDropComponent,
    Popup
  }
}
</script>

<style lang="scss" scoped>
#create{
  min-height: calc( 100vh - 65px );
  padding-bottom: 100px;

  h1{
    width: 100%;
    margin-top: 160px;
    padding-bottom: 52px;
    margin-bottom: 28px;
    border-bottom: 1px solid #d7d7d7;
    font-size: 2rem;
    font-weight: bold;
    color: #222222;
  }

  .input__group{
    margin-top: 32px;

    h2{
      font-size: 1rem;
      font-weight: bold;
      color: #222222;
      margin-bottom: 12px;
    }

    input[type=text], textarea, select{
      height: 48px;
      min-width:300px;
      width: 40%;
      border-radius: 16px;
      padding: 0 20px;
      line-height: 48px;
      border: solid 1px #dadada;
      background-color: #ffffff;
      outline: none;
      font-size: 0.875rem;
      color: #222222;

      &::placeholder{
        color:#a8a8a8;
      }

      &:focus{
        border-color: #0564ff;
      }
    }

    textarea{
      resize: vertical;
      min-width:500px;
      width: 55%;
      min-height: 110px;
    }

    select {
      background: transparent;
      appearance: none;
      /* for Firefox */
      -moz-appearance: none;
      /* for Chrome */
      -webkit-appearance: none;
      /* For IE10 */
      &::-ms-expand {
        display: none;
      }
    }

    .file{
      position: relative;
      width: 60%;
      min-width: 500px;
      min-height: 278px;
      border-radius: 20px;
      border: dashed 2px #e1e1e1;
      background-color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      overflow: hidden;

      p{
        font-weight: 600;
        text-align: center;
        color: #888888;
        margin-bottom: 13px;
      }

      input[type=file]{
        display: none;
      }

      label{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 44px;
        padding: 0 44px;
        margin-top: 13px;
        border-radius: 16px;
        background-color: #0564ff;
        color: white;
        z-index: 2;
      }

    }

  }
  .preview{
    position: relative;
    max-width: 550px;
    min-width: 250px;
    min-height: 200px;
    width: 60%;

    &.voice{
      width: 250px;
      height: 250px;
    }

    img{
      width: 100%;
      border-radius: 36px;

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
      z-index: 7;
    }
  }

  .submit{
    justify-content: center;
    align-items: center;
    height: 54px;
    padding: 0 124px;
    margin-top: 13px;
    border-radius: 16px;
    background-color: #092148;
    color: white;
    z-index: 2;
    font-size: 1.125rem;

    &:disabled{
      background-color: #eaeaea;
      color: #adaaaa;
    }
  }


  .short-uri{
    height: 48px;
    width: 553px;
    border-radius: 16px;
    padding: 0 0 0 20px;
    line-height: 48px;
    border: solid 1px #dadada;
    background-color: #ffffff;
    outline: none;
    font-size: 0;
    color: #222222;
    position: relative;

    .short-uri-prev{
      display: inline-block;
      color: #283991;
      float: left;
      font-size: 0.875rem;
    }

    .short-uri-input{
      font-size: 0.875rem!important;
      border-radius: 0!important;
      font-weight: bolder!important;
      color: #ec008c!important;
      min-width: auto!important;
      border: none!important;
      display: inline-block!important;
      float: left!important;
      width: 315px!important;
      margin-left: 2px!important;
      padding: 0!important;
      &::-webkit-input-placeholder{
        color: #ccc;
        font-weight: normal;
      }
    }

    .short-uri-tip{
      position: absolute;
      top: 100%;
      left: 20px;
      margin-top: 4px;
      font-size: 14px;
      line-height: 16px;
      color: #f00;
    }
  }
}

@media screen and ( max-width: 768px ) {
#create{
  min-height: calc( 100vh - 65px );
  padding-bottom: 100px;

  h1{
    margin-top: 108px;
  }

  .input__group{
    margin-top: 32px;

    h2{
      font-size: 1rem;
      font-weight: bold;
      color: #222222;
      margin-bottom: 12px;
    }

    input[type=text], textarea, select{
      display: flex;
      height: 48px;
      min-width:0;
      width: calc( 100% - 40px );
    }

    textarea{
      resize: vertical;
      min-width:0;
      width: calc( 100% - 40px );
      min-height: 110px;
    }

    select {
      width: 100%;
    }

    .file{
      min-width:0;
      width: 100%;

      p{
        font-size: 0.875rem;
      }

    }

  }
  .preview{
    max-width: 100%;
    min-width: 0;
    min-height: 200px;
    width: 100%;

    &.voice{
      width: 250px;
      height: 250px;
    }

    img{
      width: 100%;
      border-radius: 36px;
    }
  }

  .submit{
      width: 100%;
      padding: 0;
    }
  }
}
</style>
