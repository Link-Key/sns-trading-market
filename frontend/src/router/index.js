import Vue from 'vue'
import Router from 'vue-router'
import HomePageLayout from '@/layouts/HomePageLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import MarketPlaceLayout from '@/layouts/MarketPlaceLayout.vue'
import ActivityLayout from '@/layouts/ActivityLayout.vue'
import CollectionLayout from '@/layouts/CollectionLayout.vue'
import BrandLayout from '@/layouts/BrandLayout.vue'
import DetailItemLayout from '@/layouts/DetailItemLayout.vue'
import MyWalletLayout from '@/layouts/MyWalletLayout.vue'
import Admin from '@/layouts/Admin.vue'
import ConnectWalletLayout from '@/layouts/ConnectWalletLayout.vue'
import CreateNFTLayout from '@/layouts/CreateNFTLayout.vue'
import ImportNFTLayout from '@/layouts/ImportNFTLayout.vue'
import CreateCollectionLayout from '@/layouts/CreateCollectionLayout.vue'
import ListingItemLayout from '@/layouts/ListingItemLayout.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/u/:id',
      name: 'homePage',
      props: true,
      component: HomePageLayout
    },
    {
      path: '/',
      name: 'marketplace',
      component: MarketPlaceLayout
    },
    {
      path: '/marketplace',
      name: 'marketplace',
      component: MarketPlaceLayout
    },
    {
      path: '/activity',
      name: 'activity',
      component: ActivityLayout
    },
    {
      path: '/collection',
      name: 'collection',
      component: CollectionLayout
    },
    {
      path: '/brand/:brand',
      name: 'brand',
      component: BrandLayout
    },
    {
      path: '/item/:address/:id',
      name: 'item',
      component: DetailItemLayout
    },
    {
      path: '/create',
      name: 'create',
      component: CreateNFTLayout,
    },
    {
      path: '/import',
      name: 'import',
      component: ImportNFTLayout
    },
    {
      path: '/createCollection',
      name: 'createCollection',
      component: CreateCollectionLayout
    },
    {
      path: '/listing/:address/:id',
      name: 'listing',
      component: ListingItemLayout
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: MyWalletLayout
    },
    {
      path: '/connect',
      name: 'connect',
      component: ConnectWalletLayout
    }
  ]
})
