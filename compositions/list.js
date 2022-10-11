import { storeToRefs } from 'pinia'
import { API } from '~~/libs/api'
import auth from './auth'

const LIMIT = 20

export default ({ page, loading, posts, done, type, auth, createdBy, profile, store }) => {
  const route = useRoute()
  const { $showLoading } = useNuxtApp()
  let showLoading

  const fetch = async () => {
    // if not yet authorized but type = following
    if (!store.auth.hasLogined && type === 'following') {
      return
    }
    if (done.value) {
      return
    }
    loading.value = true
    showLoading = $showLoading()
    try {
      const data = await $fetch(API.GET_POST, {
        params: {
          page: page.value,
          type,
          created_by: createdBy,
          tag: route.query.tag,
          limit: LIMIT
        },
        headers: auth.getCommonHeader()
      })

      if (profile && data.data.profile) {
        Object.assign(profile, data.data.profile)
      }
      
      if (page.value === 1) {
        posts.length = 0
      }

      if (!data.data.list.length) {
        done.value = true
      } else {
        data.data.list.forEach(one => {
          posts.push(one)
        })
      }
      if (data.data.list.length < LIMIT) {
        done.value = true
      }
    } catch (e) {
      console.log('list:', e)
    } finally {
      loading.value = false
      showLoading && showLoading.close()
    }
  }

  const handleScroll = async (e) => {
    let element = document.querySelector('.app-main-content__wrapper')
    if (element.getBoundingClientRect().bottom <= window.innerHeight + 100) {
      if (loading.value) {
        return
      }
      if (done.value) {
        return
      }
      page.value++
      await fetch()
    }
  }

  const _onMounted = async () => {
    await fetch()

    watch(route, async (val) => {
      page.value = 1
      done.value = false
      await fetch()
    })
  
    const element = document.querySelector('.app-main-content')
    element.addEventListener('scroll', handleScroll)
  }


  const _onBeforeUnmount = async () => {
    const element = document.querySelector('.app-main-content')
    element && element.removeEventListener('scroll', handleScroll)
  }

  return {
    fetch,
    handleScroll,
    _onMounted,
    _onBeforeUnmount
  }
}