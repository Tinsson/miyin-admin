import titleBar from '@/components/title-bar'
import searchGroup from '@/components/search-group'
import tableContainer from '@/components/table-container'
import tableCard from '@/components/table-card'
import newTableCard from '@/components/new-table-card'
import myUpload from '@/components/my-upload'
import playground from '@/components/playground'

const components = {
  install: function(Vue){
    Vue.component('titleBar',titleBar)
    Vue.component('searchGroup',searchGroup)
    Vue.component('tableContainer',tableContainer)
    Vue.component('tableCard',tableCard)
    Vue.component('newTableCard',newTableCard)
    Vue.component('myUpload',myUpload)
    Vue.component('playground',playground)
  }
}

export default components
