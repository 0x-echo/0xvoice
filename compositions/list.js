import { API } from '~~/libs/api'
import auth from './auth'

export default ({ page, loading, posts, done, type, auth, createdBy, profile }) => {
  const route = useRoute()
  const { $showLoading } = useNuxtApp()
  let showLoading

  const fetch = async () => {
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
          tag: route.query.tag
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