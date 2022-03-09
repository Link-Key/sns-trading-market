<template>
  <footer :class="'footer ' + ( ( route == 'main' || route == 'marketplace' || route == 'collection' || route == 'brand' ) ? '':'simple' )">
    <div class="wrap">
      <div class="menu">
        <div class="hub">
          <img src="@/assets/images/components/footer/logo_footer.png">
          <a href="mailto:info@nft.network" class="mail">info@zenithx.co</a>
        </div>
        <div class="community">
          <h2>Community</h2>
          <ul>
            <li><a href="https://t.me/zenithxnft" target="_blank">Telegram</a></li>
            <li><a href="https://twitter.com/zenithnft" target="_blank">Twitter</a></li>
            <li><a href="https://www.linkedin.com/in/zen-kim-b54645206" target="_blank">Linkdein</a></li>
            <li><a href="https://zenithx2020.medium.com/" target="_blank">Medium</a></li>
          </ul>
        </div>
        <div class="legal">
          <h2>Legal</h2>
          <ul>
            <li><a href="http://guide.zenithx.co/TermsCondition" target="_blank">Terms and conditions</a></li>
            <li><a href="http://guide.zenithx.co" target="_blank">Service Guide</a></li>
          </ul>
        </div>
      </div>

      <div class="rights">ⓒ 2020 top joy limited, All Rights Reserved.</div>
    </div>
  </footer>
</template>

<script>
export default {
  props:['route'],
}
</script>

<style lang="scss" scoped>

.footer{
  background: #030F21;
  display: flex;
  width: 100%;
  color: white;
  padding: 60px 0;

  .menu{
    display: flex;
    flex-direction: row;

    .hub{
      flex: 8;
      display: flex;
      flex-direction: column;
      img{
        width: 140px;
      }

      .mail{
        margin-top: 10px;
        color: white;
      }
    }

    .community{
      flex: 2;
      display: flex;
      flex-direction: column;
      h2{
        font-size: 1rem;
      }
      ul{
        margin-top: 10px;
      }
    }

    .legal{
      flex: 2;
      display: flex;
      flex-direction: column;
      h2{
        font-size: 1rem;
      }
      ul{
        margin-top: 10px;
      }
    }

    a{
      font-size: 0.875rem;
      text-decoration: none;
      color: white;
      &:visited{
        color: white;
      }
    }
  }

  .rights{
    font-size: 0.75rem;
    margin-top: 4px;
    color: #838383;
  }
}

.simple{
  background: #FFF;
  padding: 22px 0;
  border-top: 1px solid #eeeeee;

  .wrap{
    justify-content: center;
    align-items: center;
  }

  .menu{
    display: none;
  }

  .rights{
    color: #222222;
  }
}

@media screen and ( max-width: 768px ) {
  .footer{
    padding: 54px 0;

    .menu{
      flex-direction: row;
      flex-wrap: wrap;

      .hub{
        width: 100%;
        flex: auto;
        margin-bottom: 33px;

        .mail{
          font-weight: normal;
          font-size:0.875rem;
        }
      }

      .community{
        ul{
          font-size:0.875rem;
        }
      }

      .legal{
        ul{
          font-size:0.875rem;
        }
      }

    }

    .rights{
      margin-top: 43px;
    }
  }

  .simple{
    background: #FFF;
    padding: 22px 0;
    border-top: 1px solid #eeeeee;

    .wrap{
      justify-content: center;
      align-items: center;
    }

    .menu{
      display: none;
    }

    .rights{
      color: #222222;
      margin-top: 0;
    }
  }
}
</style>
