<template>
    <el-container>
        <el-header height="auto" v-if="buttons">
          <cool-button-group ref="buttonsGroup" :buttons="buttons" @button-click="buttonsevent" @handle-command="handleCommand">
                <template #buttonSlot>
                  <slot name="buttonSlot" />
                </template>
          </cool-button-group>
          <slot name="headerSlot" /> 
        </el-header>
        <el-main>
          <el-container>
             <cool-query :isMethods="isMethods" ref="query" v-show="Object.keys(queryCondition).length != 0" :origin-condition="queryCondition" :showModeList="showModeList"  @get-condition="getCondition" >
              <template #querySlot>
                <slot name="querySlot"></slot>   
              </template>
            </cool-query>
            <cool-page-table ref="table" :class="singleTableData.tableClass" v-loading="singleTableData.vLoading" :style="singleTableData.tableStyle" :data="singleTableData.data" :showPage="singleTableData.showPage" :total="singleTableData.total" :layout="singleTableData.layout" :pageSize.sync="singleTableData.pageSize" :currentPage.sync="singleTableData.currentPage" :size="singleTableData.size" :width="singleTableData.width" :height="singleTableData.height" :max-height="singleTableData.maxHeight" :fit="singleTableData.fit" :stripe="singleTableData.stripe" :border="singleTableData.border" :row-key="singleTableData.rowKey" :context="singleTableData.context" :show-header="singleTableData.showHeader" :show-summary="singleTableData.showSummary" :sum-text="singleTableData.sumText" :summary-method="singleTableData.summaryMethod" :row-className="singleTableData.rowClassName" :row-style="singleTableData.rowStyle" :cell-class-name="singleTableData.cellClassName" :cell-style="singleTableData.cellStyle" :header-row-class-name="singleTableData.headerRowClassName" :header-row-style="singleTableData.headerRowStyle" :header-cell-class-name="singleTableData.headerCellClassName" :header-cell-style="singleTableData.headerCellStyle" :highlight-current-row="singleTableData.highlightCurrentRow" :current-row-key="singleTableData.currentRowKey" :empty-text="singleTableData.emptyText" :expand-row-keys="singleTableData.expandRowKeys" :default-expand-all="singleTableData.defaultExpandAll" :default-sort="singleTableData.defaultSort" :tooltip-effect="singleTableData.tooltipEffect" :span-method="singleTableData.spanMethod" :columns="singleTableData.columns" @table-row-click="tableRowClick" @table-select="tableSelect" @table-select-all="tableSelectAll" @table-selection-change="tableSelectionChange" @table-cell-click="tableCellClick" @table-row-dblclick="tableRowDblclick" @table-header-click="tableHeaderClick" @table-sort-change="tableSortChange" @table-current-change="tableCurrentChange"  @pagination-size-change="paginationSizeChange" @pagination-current-change="paginationCurrentChange">
              <template #columns>
                  <slot name="columnsSlot"></slot>  
              </template>
            </cool-page-table>
          </el-container>
        </el-main>
      <cool-multi-dialog ref="multiDialog" v-if="dialogs.length" :dialogs="dialogs" />
  </el-container >
</template>

<script>
    // import buttonGroup from './commonComponents/cool-button.vue'
    // import query from './commonComponents/cool-query.vue'
    // import coolTable from './commonComponents/cool-page-table.vue' 
    // import multiDialog from './cool-multi-dialog'
    // import axios from 'axios'
    import {isArrOrObj,settingAxios} from '@/utils/axios'
    import bus from '@/utils/bus'
    import dayjs from 'dayjs'
    import coolPageTableMixin from '../mixins/coolPageTableMixin.js'
const component = {
    name: 'single-view',
    mixins:[coolPageTableMixin],
    // components:{
    //     buttonGroup,
    //     query,
    //     multiDialog,
    //     coolTable
    // },
    props: {
        showSaveButton:{
          type:Boolean,
          default:false
        },
        uniqueDeployKey:Object,
        axiosSetting:Object,
        showModeList:Boolean,
        // 弹窗数据
        dialogs:{
          type:Array,
          default:function(){
            return []
          }
        },
        hasParentId:String,
        isMethods:{
          type:Object,
          default:function(){
            return {}
          }
        }
    },
    data:function(){
      return{
        // showQuery:false,
        isEdit:true,
        isNewEdit:true,
        ids:null,
        isCurrentData:{},//当前选中的数据
        buttons: [],
        // 查询条件组件
        queryCondition: {} || [],
        // table主表的数据
        singleTableData:{},
        //table从表的数据
        // dltTableData:[],
        // 弹窗数据
        // dialogs:[],
        // 查询参数
        condition:[],
        // 
        modeList:{}
      }
    },
   created(){
      settingAxios(this.axiosSetting)
      // this.takeJsonData()
      // console.time("加载json文件的时间");
      // this.takeJsonData().then(res=>{
      //      this.JsonCallback()
      //   })
      //  console.timeEnd("加载json文件的时间"); 
      this.takeJsonData2()
    },
    mounted(){
      // this.getData()
      // console.log(axios.defaults.headers.common['cool-token'])
    },
    methods:{
      takeJsonData2(){
        console.time("加载window的json文件时间");
        for(let i in window.coolLocals){
        if(i != 'index.json'){
        for(let p in JSON.parse(window.coolLocals[i])){
          this[p] = JSON.parse(window.coolLocals[i])[p]
        }
        }      
      }
        this.JsonCallback()
        console.timeEnd("加载window的json文件时间");
      },
       // takeJsonData(){
       //  console.time("加载json文件的时间");
       //    let instance = axios.create({
       //      baseURL: ''
       //    });
       //     let myPromise
       //     let url = []
       //     for(let i in this.uniqueDeployKey){
       //      if(i !== 'api'){
       //        url.push(i)
       //      }
       //     }
       //      myPromise =  axios.all(url.map(item=>{
       //        return instance.get(`./${this.uniqueDeployKey[item]}.json`).then(res=>{
       //             this[item] = res.data[item]
       //        }).catch(e=>{
       //            this.$message.error(e)
       //          })
       //     }))
       //    console.timeEnd("加载json文件的时间"); 
       //    return myPromise                         
       // },
       JsonCallback(){
        if(Object.keys(this.queryCondition).length != 0){
           console.log(this.queryCondition,this.modeList,this.showModeList)
            console.time("加载queryCondition数据的时间");
              for(let p in this.queryCondition){
                this.QueryCallback(p)
                this.QueryApiCallback(p)                      
              }
            console.timeEnd("加载queryCondition数据的时间");                   
          }
       },
       QueryCallback(p){
        // if(this.queryCondition[p].hasOwnProperty('modeList') && this.queryCondition[p].hasOwnProperty('dataType')){
                   for (let k in this.queryCondition[p]){
                      if(k === 'form' && this.queryCondition[p][k] === 'autocomplete'){
                        console.log(this.queryCondition[p][k])
                          axios.get(this.queryCondition[p].api).then(res=>{
                            console.log(res)
                            if(res){
                              this.queryCondition[p].data = []
                              res.map(item=>{
                                if(item.name) this.queryCondition[p].data.push({value:item.name})
                                else this.queryCondition[p].data.push({value:item})                               
                              })
                              console.log(this.queryCondition[p].data)
                            }                       
                          })
                        }
                      if (this.showModeList && k === 'dataType' && Object.keys(this.modeList).length != 0){
                          let key = this.queryCondition[p][k]
                         this.queryCondition[p].modeList =JSON.parse(JSON.stringify(this.modeList[key]))        
                      }
                      if(k === 'form' && this.queryCondition[p][k] === 'date'){
                        let currentData =  dayjs().format("YYYY-MM-DD")
                        let subtractData = dayjs().subtract(1,'month').format("YYYY-MM-DD")
                        this.queryCondition[p].value[0] = subtractData;
                        this.queryCondition[p].value[1] = currentData;
                      }
                   }                                         
       },
       QueryApiCallback(p){
        if(this.queryCondition[p].hasOwnProperty('api') && this.queryCondition[p].hasOwnProperty('options')){
                  axios.get(this.queryCondition[p].api).then(res=>{
                    if(res){
                      this.queryCondition[p].options = []
                      res.map(item=>{
                          this.queryCondition[p].options.push({value:item.name,label:item.name})                              
                      })
                    }                           
                  })
                } 
       },
       // 
       handleCommand(arg){
        console.log(arg,window.serveObject)
        this.buttons.map(item=>{
          if(item.dropdownModule){
            item.dropdownModule.map(p=>{
              if(p.command == arg){
                window.vm.dialogs[0].src = `${window.serveObject[p.serveApi]}${p.url}#${window.token}#${this.ids}`
                window.vm.dialogs[0].name = p.command
                window.vm.dialogs[0].title = p.text
                window.vm.getDialog(p.command).visible = true
              }
            })
          }
        })
      },
       // 查询
       query(){
        let param ={
          condition:JSON.stringify(this.condition)
        };
        axios.get(this.uniqueDeployKey.api + '/GetList',{
        params:param
        }).then(res => {
            console.log(res)
            if(res){
              this.singleTableData.data = []
              res.forEach( item=> {
                this.singleTableData.data.push(item)
              });
            }                  
          })
      },
      // 新建
      construction(){
            let newData = {
              isShow:this.isNewEdit,
              isData:this.singleTableData.data
            }
            bus.$emit('isNewEdit', newData)
            this.hdrClearSelectionOuter()
      },
      // 编辑
      edit(){
           let editData = {
              isCurrent:this.isCurrentData,
              isData:this.singleTableData.data
            }
            bus.$emit('isEditData',editData)
            setTimeout(()=>{
              this.hdrClearSelectionOuter()
            },0)
      },
      // 删除
      delete() {
          this.$confirm('此操作将删除所选数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios({
              method:"delete",
              url:this.uniqueDeployKey.api,
              data:this.isCurrentData             
            }).then(res=>{
              console.log(res)
              if(res) this.query()              
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            duration: 1000
          });
        });
      },
       //按钮事件 
        buttonsevent(arg){
          let action = arg.data.$vnode.data.key
          console.log(action)
          if(typeof this[action] == 'function')
            this[action].call(this, arg)
          else
            this.$emit(action,arg)
        },
        // getConditionWare(arg){
        //     this.$emit('get-condition-ware',arg)
        // },
        
        getCondition(arg){
          if(this.isMethods.isGetCondition){
            // console.log(arg)
            this.$emit('get-condition',arg)        
          }
          else{
            this.condition = arg
            this.$emit('get-condition',arg)
          }                    
        },
   
        tableSelectionChange(arg){
          this.buttons.forEach(item=>{
            if(item.controlDisable == 'single') item.disabled = arg.length !== 1
            if(item.controlDisable == 'multiple') item.disabled = arg.length === 0
            }) 
          // if(window.hasOwnProperty('vm') && window.vm.hasOwnProperty('isTableSelectionChange') && window.vm.isTableSelectionChange)
          if(this.isMethods.isTableSelectionChange){
            console.log(arg)
            this.$emit('table-selection-change',arg)
          }
          else{            
              console.log(arg)    
             if (arg.length != 0) {
              this.isCurrentData = arg[0]
              this.ids = arg[0].id
            }
            this.$emit('table-selection-change',arg)  
          }                
        },
        hdrClearSelectionOuter(){
            this.$refs.table.clearSelectionOuter();
        },
        hdrClearCurrentRow(){
            this.$refs.table.clearCurrentRow();
        }
    },
    install: (Vue, options) =>
        Vue.component(
            (options ? options.prefix : '') + component.name,
            component,
        ),
}

export default component
</script>

<style scoped>

</style>