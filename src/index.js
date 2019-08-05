const prefix = 'cool-'

import coolButton from './components/commonComponents/cool-button.vue'
import coolForm from './components/commonComponents/cool-form.vue'
import coolQuery from './components/commonComponents/cool-query.vue'
import coolTable from './components/commonComponents/cool-table.vue'
import coolPageTable from './components/commonComponents/cool-page-table.vue'
import closeButton from './components/commonComponents/close-button.vue'
import saveButton from './components/commonComponents/save-button.vue'
import coolPagination from './components/commonComponents/cool-pagination.vue'
import multiDialog from './components/cool-multi-dialog.vue'
import coolMasterSlaveTable from './components/cool-master-slave-table.vue'
import coolMasterView from './components/cool-master-views.vue'
import coolSingleView from './components/cool-single-view.vue'
import coolSingleDialog from './components/cool-single-dialog.vue'
import coolMasterDialog from './components/cool-master-dialog.vue'
import coolWorkFlow from './components/cool-work-flow.vue'

//再此处添加导入
const components = [
    coolButton,
    multiDialog,
    coolForm,
    coolMasterSlaveTable,
    coolQuery,
    coolTable,
    coolPageTable,
    coolMasterView,
    coolSingleDialog,
    coolSingleView,
    coolMasterDialog,
    closeButton,
    saveButton,
    coolPagination,
    coolWorkFlow
    //在此处添加注册
]

if (typeof window !== 'undefined' && window.Vue)
    components.forEach(element => element.install(window.Vue, { prefix }))

const modules = {}
components.forEach(component => modules[prefix + component.name] = component)
export default modules
