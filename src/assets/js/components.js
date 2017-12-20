import titleBar from '@/components/title-bar'
import searchGroup from '@/components/search-group'
import tableContainer from '@/components/table-container'
import tableCard from '@/components/table-card'

const components = {
  install: function(Vue){
    Vue.component('titleBar',titleBar)
    Vue.component('searchGroup',searchGroup)
    Vue.component('tableContainer',tableContainer)
    Vue.component('tableCard',tableCard)
  }
}

export default components
