<template>
  <section class="top">
    <div class="background"></div>
    <div class="wrap">
      <h1></h1>
      <p>A better marketplace for digital item ownership</p>
      <a href="/marketplace" class="explore">Explore Now</a>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.top{
  height: 56.25vw;
  min-height: 600px;
  position: relative;

  .background{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-image: url('~@/assets/images/bg.jpg');
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: bottom;

    //&::before{
    //  content: '';
    //  position: absolute;
    //  display: block;
    //  height: 100%;
    //  width: 100%;
    //  background-image: url('~@/assets/images/layouts/main/background_top_left.png');
    //  background-size: auto 100%;
    //  background-repeat: no-repeat;
    //  background-position: left;
    //  z-index: -1;
    //}

    //&::after{
    //  content: '';
    //  position: absolute;
    //  display: block;
    //  height: 100%;
    //  width: 100%;
    //  background-image: url('~@/assets/images/layouts/main/background_top_right.png');
    //  background-size: auto 100%;
    //  background-repeat: no-repeat;
    //  background-position: right;
    //  z-index: -1;
    //}
  }

  .wrap{
    position: relative;
    justify-content: center;
    height: calc(100%);

    h1{
      height: 190px;
      background-image: url("~@/assets/images/layouts/main/image_title_main.png");
      background-size: auto 100%;
      background-position: center;
      background-repeat: no-repeat;
    }

    p{
      font-size: 2.25rem;
      color: #f1f1f1;
      font-weight: 200;
      text-align: center;
      padding: 0 8%;

      @media screen and ( max-width: 768px ) {
        font-size: 1.8rem;
        margin-top: 24px;
      }
    }

    .explore{
      text-decoration: none;
      position: relative;
      font-size: 1.25rem;
      display: inline-block;
      margin: 0 auto;
      margin-top: 100px;
      color: #cccccc;

      &:visited{
        color: #ffffff;
      }

      &::before{
        content: '';
        display: block;
        position: absolute;
        width: 31px;
        height: 1px;
        right: -39px;
        bottom: 11px;
        z-index: -1;
        background: #cccccc;
        transition: all 0.3s ease-out;
      }

      &::after{
        content: '';
        display: block;
        position: absolute;
        width: 10px;
        height: 1px;
        right: -40px;
        bottom: 14px;
        z-index: -1;
        background: #cccccc;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        transition: all 0.3s ease-out;
      }

      &:hover{
        color: #da56d1;
        transition: all 0.3s ease-out;

        &::before{
          width: 79px;
          right: -87px;
          background: #0564ff;
          transition: all 0.3s ease-out;
        }

        &::after{
          right: -88px;
          background: #0564ff;
        transition: all 0.3s ease-out;
        }
      }
    }
  }

}


@media screen and ( max-width: 768px ) {

  .top{
    height: 74vw;
    min-height: auto;

    .background{

      &::before{
        @media screen and ( max-width: 768px ){
          background-size: auto 85%;
          background-position: bottom left;
        }
      }

      &::after{
        @media screen and ( max-width: 768px ){

        }
      }
    }

    .wrap{
      justify-content: center;
      padding-top: 17px;

      h1{
        height: 50px;
      }

      p{
        font-size: 0.625rem;
        font-weight: 400;
        margin: 0;
      }

      .explore{
        margin-top: 26px;
        font-size: 0.75rem;
        font-weight: bold;
        color: #cccccc;

        &:visited{
          color: #cccccc;
        }

        &::before{
          display: none;
        }

        &::after{
          display: none;
        }

        &:hover{

          &::before{
            display: none;
          }

          &::after{
            display: none;
          }
        }
      }
    }

  }
}

</style>
