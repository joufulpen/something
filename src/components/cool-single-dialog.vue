<template>
    <el-dialog :top.sync="top" :visible.sync="visible" :width="width" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" @close="closedialog" append-to-body :class="uniqueKey">
    <div slot="title">
        {{editDialogTitle}}
    <cool-close-button ref="closeButton" @update-collapsed="collapsedClicked"  @back-event="backEvent" :btnStyle="btnStyle" :btnSize="btnSize" :closeBtnType="closeBtnType" />
    </div>
    <el-collapse-transition>
      <div v-show="!collapsed">
      <el-container :style="containerStyle"  style="height:auto">
        <el-main  height="auto">
            <slot name="coolForm"></slot>
          <cool-form-view ref="ruleForm" :form-items="formItems"  :inline="inline" :size="size" :itemWidth="itemWidth" :itemStyle="itemStyle" :labelWidth="labelWidth" :rules="rules" :labelPosition="labelPosition" @update-form="updateForm" @input-button-event="mixInputButtonEvent" @click-events="itemClick" @select="handleSelect" @query-search="querySearch" @keyup.enter.native="nextInputData" @keyup.up.native="backUp" @keyup.down.native="backDown">
            <template #formSlot>
              <slot name="formSlot" ></slot>
            </template>
         </cool-form-view>
        </el-main>
       <!--  <el-footer height="auto" v-if="editTabsData.length">
            <slot name="otherForm"></slot>
          <el-tabs :type="tabsType">
            <el-tab-pane v-for="(item,index) in editTabsData" :label="item.label">
                <cool-form ref="loopCoolForm" :form-items="item.formItems"  :inline="item.inline" :size="item.size" :itemWidth="item.itemWidth" :itemStyle="item.itemStyle" :labelWidth="item.labelWidth" :rules="item.rules" :labelPosition="item.labelPosition" @update-form="tabsUpdateForm(item.tabsUpdateForm)" @input-button-event="mixInputButtonEvent" @click-events="itemClick" @select="handleSelect" @query-search="querySearch">
                </cool-form>
            </el-tab-pane>
      </el-tabs>
        </el-footer>   -->
      </el-container>
         <cool-save-button ref="saveButton" :backBtnIcon="backBtnIcon" :saveBtnIcon="saveBtnIcon" :BtnSize="BtnSize" :backBtnText="backBtnText" :saveBtnText="saveBtnText" :backBtnType="backBtnType" :saveBtnType="saveBtnType" @back-event="backEvent" @save-event="saveEvent" />
      </div>
    </el-collapse-transition>
    </el-dialog>
</template>

<script>
    // import coolForm from './commonComponents/cool-form.vue'
    // import closeButton from './commonComponents/close-button.vue'
    // import saveButton from './commonComponents/save-button.vue'
    import closeButtonMixin from '../mixins/closeButtonMixin.js'
    import coolFormMixin from '../mixins/coolFormMixin.js'
    import saveButtonMixin from '../mixins/saveButtonMixin.js'
    // import axios from 'axios'
    import bus from '@/utils/bus'
const component = {
    name: 'single-dialog',
    mixins:[coolFormMixin,closeButtonMixin,saveButtonMixin],
    // components:{
    //     coolForm,
    //     closeButton,
    //     saveButton
    // },
    props: {
        uniqueKey:String,
        //dialog
        visible: Boolean,
        isMethods:{
          type:Object,
          default:function(){
            return {}
          }
        }
    },
    data:function(){
      return {
         //dialog
        top: '15vh',
        width:'50%',
        editDialogTitle:'',
        // collapsed:false,
        // cool-form
        formItems: {},
        size:'mini',
        inline: true,
        itemWidth: '',
        itemStyle: {},
        labelWidth: '',
        rules: {},
        labelPosition: '',
        // tabs
        tabsType:'card',
        editTabsData:[],
        // footer dltTable
        dtlTableData:{},
        dtlFormItems:{},
        // footerBtn
        // container style
        containerStyle:'border:1px solid #DCDFE6',
        //
        formItemsData:null,
        isEditData:null,
        isEdit:null,
        tableData:[],
        currentData:null,
        // newHdrItemData:null,
        // newDtlItemData:null
      }
    },
    install: (Vue, options) =>
        Vue.component(
            (options ? options.prefix : '') + component.name,
            component,
        ),
    created(){
      this.updateForm()
    },
    mounted(){
      // setAxios()
      // console.log(this.uniqueKey)
      this.takeJsonData2()
      // this.takeJsonData()
    },
    watch:{
      isEditData(val){
        if(val){
          this.closeClicked()
        }
      }
    },
    beforeUpdate(){
      bus.$on('isNewEdit',data=>{
        console.log(data)
        this.isEditData = data.isShow
        this.tableData = data.isData
        this.isEdit = false
        this.getNewItem()

      })
      bus.$on('isEditData',data=>{
        this.isEditData = true
        this.isEdit = true
        if(data){
          this.currentData = data.isCurrent
          this.tableData = data.isData
           console.log(data)
        //将选中编辑数据映射到表单
         this.formItems.form.forEach(item=>{
           for(let i  in data.isCurrent){
            if(i == item.name){
              item.value = data.isCurrent[i]
            }
           }
         })
         console.log(this.formItems.form)
        }
      })
    },
    methods:{
       takeJsonData2(){
        console.time("加载弹窗json数据的时间");
        for(let i in window.coolLocals){
        if(i == 'index.json'){
        for(let p in JSON.parse(window.coolLocals[i])){
          this[p] = JSON.parse(window.coolLocals[i])[p]
          this.JsonCallback(p)
        }
        }
      }
      console.timeEnd("加载弹窗json数据的时间");
      },
       // takeJsonData(){
       //    let instance = axios.create({
       //      baseURL: ''
       //    });
       //    let url
       //    if(this.uniqueKey.lastIndexOf('/') !== -1){
       //      url = './'+ this.uniqueKey.slice(this.uniqueKey.lastIndexOf('/') + 1) + '.json'
       //    }else url = './'+this.uniqueKey+'.json'
       //    let url = './'+this.uniqueKey+'.json'
       //    instance.get(url).then(res=>{
       //      // console.log(res)\\
       //        for(let i in res.data){
       //          // this[i] = res.data[i]
       //          console.log(i)
       //          this.JsonCallback()
       //        }
       //    }).catch(e=>{
       //      this.$message.error(e)
       //    })
       // },
       JsonCallback(i){
        if(i === 'formItems'){
            this.formItems.form.map(item=>{
              if(item.type == 'select' && item.api && item.options){
                axios.get(item.api).then(res=>{
                  console.log(res)
                  if(res){
                    item.options = []
                    res.map(p=>{
                      item.options.push({value:p.name,label:p.name})
                    })
                  }
                })
              }
              if(item.type == 'autocomplete' && item.api && item.data){
                axios.get(item.api).then(res=>{
                  console.log(res)
                  if(res){
                    item.data = []
                    res.map(p=>{
                      if(p.name) item.data.push({value:p.name})
                      else item.data.push({value:p})
                    })
                  }
                })
              }
            })
          }
       },
        // dialog
       closeClicked: function() {
        this.$emit('update:visible', !this.visible) //emit for sync
        },
        closedialog() {
          this.$emit('closedialog') //emit for sync
        },
        // cool-form
        updateForm(arg) {
          if(this.isMethods.isUpdateForm)
            this.$emit('update-form', arg)
          else{
            this.formItemsData = arg
            this.$emit('update-form', arg)
          }
        },
         querySearch(queryString, cb, labelData) {
          if(this.isMethods.isQuerySearch)
              this.$emit('query-search', queryString, cb)
          else{
            let index =  this.formItems.form.findIndex(p=>{
                  return p.label == labelData
              })
              var results = queryString ? this.formItems.form[index].data.filter(this.createFilter(queryString)) : this.formItems.form[index].data
              cb(results)
            this.$emit('query-search', queryString, cb)
          }
        },
        createFilter(queryString) {
          return name => {
            return (
              name.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1
            )
          }
        },
        // button
        backEvent(arg){
            bus.$off('isNewEdit')
            bus.$off('isEditData')
            this.currentData = null
            this.$refs.ruleForm.resetForm()
            this.formItems.form.forEach(item=>{
               item.value =  ''
            })
            this.isEditData = null
            this.isEdit = null
            this.$emit('update:visible', !this.visible)
            this.$emit('back-event', !this.visible)
        },
        getNewItem(){
          axios.get(this.uniqueKey+'/NewItem')
          .then(res => {
             console.log(res)
            if(res) this.newItemData = res
            })
        },
        saveEvent(arg){
          if(this.isMethods.isSaveEvent)
            this.$emit('save-event',arg)
          else{
            console.log(this.currentData,this.formItemsData,this.newItemData)
           if(this.$refs.ruleForm.validateForm()){
        // 判断编辑还是新建
          this.isEdit ? this.formItemsData = Object.assign(this.currentData,this.formItemsData) : this.formItemsData = Object.assign(this.newItemData,this.formItemsData)
          console.log(this.formItemsData)
          if(this.isEdit) {
            axios.put(this.uniqueKey,this.formItemsData).then(res=>{
            console.log(res)
            if(res){
              // 编辑 根据当前数据的id 在表格数据中找到它所在的索引 然后将编辑好的数据替换
              let currentDataIndex =  this.tableData.findIndex(item=>{
              return  item.id == res.id
            })
            console.log(currentDataIndex)
            this.tableData[currentDataIndex] = Object.assign( this.tableData[currentDataIndex],res)
            this.backEvent()
            }
            this.formItemsData = null
          })
          }else{
            axios.post(this.uniqueKey,this.formItemsData).then(res=>{
            console.log(res)
            if(this.isEdit == false && res){
                this.tableData.unshift(res)
                this.backEvent()
           }else{}
            this.formItemsData = null
          })
          }

        }
          this.$emit('save-event',arg)
          }
        }
    }
}

export default component
</script>

<style scoped>

</style>
