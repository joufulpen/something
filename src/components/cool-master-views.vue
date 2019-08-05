<template>
    <el-container>    
        <el-header height="auto" v-if="buttons">
          <cool-button-group ref="buttonsGroup" :buttons="buttons" @button-click="buttonsevent" >
                <template #buttonSlot>
                  <slot name="buttonSlot" />
                </template>
          </cool-button-group>
          <slot name="headerSlot" />                 
       </el-header>
        <el-main>
          <el-container>
            <cool-query :isMethods="isMethods" ref="query" v-if="Object.keys(queryCondition).length != 0" :origin-condition="queryCondition"  :showModeList="showModeList" @get-condition="getCondition" >
              <template #querySlot>
                <slot name="querySlot"></slot>  
              </template>
            </cool-query>
            <cool-master-slave-table ref="table" :hdrTableData="hdrTableData" :dtlTableData="dtlTableData" @table-row-click="tableRowClick" @table-select="tableSelect" @table-select-all="tableSelectAll" @table-selection-change="tableSelectionChange" @table-cell-click="tableCellClick" @table-row-dblclick="tableRowDblclick" @table-header-click="tableHeaderClick" @table-sort-change="tableSortChange" @table-current-change="tableCurrentChange" @pagination-size-change="paginationSizeChange" @pagination-current-change="paginationCurrentChange"  @dlt-row-click="dltTableRowClick" @dlt-select="dltTableSelect" @dlt-select-all="dltTableSelectAll" @dlt-selection-change="dltTableSelectionChange" @dlt-cell-click="dltTableCellClick" @dlt-row-dblclick="dltTableRowDbclick" @dlt-header-click="dltTableHeaderClick" @dlt-sort-change="dltTableSortChange" @dlt-current-change="dltTableCurrentChange">
                <template #pageTableColumns>
                  <slot name="pageTableColumns"></slot>
                </template>
               <!--  <template v-for="dltTab in dtlTableData" v-slot:{dltTab.name}>
                  <slot :name="dltTab.name"></slot>
              </template> -->
            </cool-master-slave-table>
          </el-container>
        </el-main>
      <cool-multi-dialog ref="multiDialog" v-if="dialogs.length" :dialogs="dialogs" />  
  </el-container >
</template>
<script>
  // console.log('组件script开始',window.TESTDATA)
    // import buttonGroup from './commonComponents/cool-button.vue'
    // import query from './commonComponents/cool-query.vue'
    // import masterSlaveTable from './cool-master-slave-table'
    // import multiDialog from './cool-multi-dialog'
    import {isArrOrObj,settingAxios} from '@/utils/axios'
    import bus from '@/utils/bus'
    import dayjs from 'dayjs'
    import coolPageTableMixin from '../mixins/coolPageTableMixin.js'
const component = {
    name: 'master-view',
    mixins:[coolPageTableMixin],
    props: {
        isMthods:{
          type:Object,
          default:function(){
            return {}
          }
        },
        showModeList:Boolean,
        uniqueDeployKey:Object,
        axiosSetting:Object,
       // 弹窗数据
        dialogs:{
          type:Array,
          default:function(){
            return []
          }
        },
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
        queryCondition: {},
        // table主表的数据
        hdrTableData:{},
        //table从表的数据
        dtlTableData:[],
        // 查询参数
        condition:[],
        // 
        modeList:{}
      }
    },
   created(){
    // console.log('组件created')
      settingAxios(this.axiosSetting)
       // this.takeJsonData().then(res=>{
       //     this.JsonCallback()
       //  })
        this.takeJsonData2()
    },
    mounted(){
      // console.log('组件mounted')
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
      //   console.time("加载json文件的时间"); 
      //      let instance = axios.create({
      //       baseURL: ''
      //     });
      //      let myPromise
      //      let url = []
      //      for(let i in this.uniqueDeployKey){
      //       if(i !== 'api'){
      //         url.push(i)
      //       }
      //      }
      //       myPromise =  axios.all(url.map(item=>{
      //         return instance.get(`./${this.uniqueDeployKey[item]}.json`).then(res=>{
      //              this[item] = res.data[item]
      //         }).catch(e=>{
      //             this.$message.error(e)
      //           })
      //      }))
        
      //     //  for(let i in this.uniqueDeployKey){
      //     //   if(i !== 'api'){
      //     //     myPromise = new Promise((resolve,reject)=>{
      //     //       url = './'+this.uniqueDeployKey[i]+'.json'
      //     //       instance.get(url).then(res=>{
      //     //           this[i] = res.data[i]
      //     //           console.log(i)
      //     //           resolve(i)
      //     //           // this.JsonCallback(i)
      //     //       }).catch(e=>{
      //     //         this.$message.error(e)
      //     //       })
      //     //  });      
      //     //   }            
      //     // }; 
      //     console.timeEnd("加载json文件的时间"); 
      //     return myPromise          
      //  },
       JsonCallback(){  
        console.time("加载queryCondition数据的时间"); 
        if(Object.keys(this.queryCondition).length != 0){
                for(let p in this.queryCondition){
                  this.QueryCallback(p)
                  this.QueryApiCallback(p)                 
                }    
            }
        console.timeEnd("加载queryCondition数据的时间");     
       },
       QueryCallback(p){
              for (let k in this.queryCondition[p]){
                if(k === 'form' && this.queryCondition[p][k] === 'autocomplete'){
                        console.log(this.queryCondition[p][k])
                          axios.get(this.queryCondition[p].api).then(res=>{
                            console.log(res)
                            if(res){
                              this.queryCondition[p].data = []
                              res.map(item=>{
                                this.queryCondition[p].data.push({value:item})
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
       query(){
        this.dtlTableData[0].data.splice(0,this.dtlTableData[0].data.length)
        let param = { 
          condition:JSON.stringify(this.condition),page:JSON.stringify(this.hdrTableData.currentPage),size:JSON.stringify(this.hdrTableData.pageSize) 
        }
        axios.get(this.uniqueDeployKey.api + '/GetHdrPageList',{
        params:param
        }).then(res => {
           console.log(res) 
            if(res){
              this.hdrTableData.data = []
            res.rows.forEach( item=> {
              this.hdrTableData.data.push(item)
            });
            this.hdrTableData.total = res.total 
            }                         
          })
      },
      construction(){
            let newData = {
              isShow:this.isNewEdit,
              isData:this.hdrTableData.data
            }
            bus.$emit('isNewEdit', newData)
            this.clearSelectionOuter()
      },
      edit(){
             let editData = {
              isCurrent:this.isCurrentData,
              isData:this.hdrTableData.data
            }
            bus.$emit('isEditData',editData)
            setTimeout(()=>{
              this.clearSelectionOuter()
            },0)
          },
        // 删除数据
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
              }).catch((error) => {
              setTimeout(() => {
                this.$message.error('请求异常，请联系管理员');
              }, 500)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            duration: 1000
          });
        });
        },
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
          if(this.isMthods.isGetCondition){
            this.$emit('get-condition',arg)          
          }else{
            this.condition = arg
            this.$emit('get-condition',arg) 
          }         
        },
        // table主表方法
        tableRowClick(arg){          
          if(this.isMthods.isTableRowClick){
            this.$emit('table-row-click',arg)          
            console.log(arg)
          }else{
            if(this.dtlTableData.length){
            console.log(arg.formno)
            let param = { 
              formno:arg.formno,condition:JSON.stringify(this.condition)
            }
            axios.get(this.uniqueDeployKey.api + '/GetDtlList',{
            params:param
            }).then(res => {
                console.log(res) 
                if(res){
                  this.dtlTableData[0].data = []
                  res.forEach( item=> {
                    this.dtlTableData[0].data.push(item)
                  });
                }             
              })
          }
            this.$emit('table-row-click',arg)
          }                         
        },
        // tableSelect(arg){
        //   this.$emit('hdr-select',arg)
        // },
        // tableSelectAll(arg){
        //   this.$emit('hdr-select-all',arg)
        // },
        tableSelectionChange(arg){
          this.buttons.forEach(item=>{
              if(item.controlDisable == 'single') item.disabled = arg.length !== 1
              if(item.controlDisable == 'multiple') item.disabled = arg.length === 0
            }) 
          if(this.isMthods.isTableSelectionChange){ 
             this.$emit('table-select-change',arg)         
            console.log(arg)
          }else{    
             if (arg.length != 0) {
              this.isCurrentData = arg[0]
              this.ids = arg[0].id
            }
            this.$emit('table-select-change',arg)
          }                   
        },
        // tableCellClick(arg){
        //   this.$emit('hdr-cell-click',arg)
        // },
        // tableRowDblclick(arg){
        //   console.log(arg)
        //   this.$emit('hdr-row-dbclick',arg)
        // },
        // tableHeaderClick(arg){
        //   this.$emit('hdr-header-click',arg)
        // },
        // tableSortChange(arg){
        //   this.$emit('hdr-sort-change',arg)
        // },
        // tableCurrentChange(args){
        //   this.$emit('hdr-current-change',args)
        // },
        paginationSizeChange(args){
          console.log(args)
          if(this.isMthods.isPaginationSizeChange){
            this.$emit('pagination-size-change',args)        
            console.log(args)
          }else{
            this.hdrTableData.currentPage = 1
            this.hdrTableData.pageSize = args
            this.query()
          }
        },
        paginationCurrentChange(args){
          console.log(args)
          if(this.isMthods.isPaginationCurrentChange){
            this.$emit('pagination-current-change',args)        
          }else{
            this.hdrTableData.currentPage = args
            this.query()
          }          
        },
        // hdrClearSelectionOuter(){
        //     this.$refs.tableView.clearSelectionOuter();
        // },
        // hdrClearCurrentRow(){
        //     this.$refs.tableView.clearCurrentRow();
        // },
        // 从表表格方法
        dltTableRowClick(arg){
          this.$emit('dlt-row-click',arg)
        },
        dltTableSelect(arg){
          this.$emit('dlt-select',arg)
        },
        dltTableSelectAll(arg){
          this.$emit('dlt-select-all',arg)
        },
        dltTableSelectionChange(arg){
          this.$emit('dlt-select-change',arg)
        },
        dltTableCellClick(arg){
          this.$emit('dlt-cell-click',arg)
        },
        dltTableRowDbclick(arg){
          // console.log(arg)
          this.$emit('dlt-row-dbclick',arg)
        },
        dltTableHeaderClick(arg){
          this.$emit('dlt-header-click',arg)
        },
        dltTableSortChange(arg){
          this.$emit('dlt-sort-change',arg)
        },
        dltTableCurrentChange(arg){
          this.$emit('dlt-current-change',arg)
        },
        dltClearSelectionOuter(){
            this.$refs.tableView.dltClearSelectionOuter();
        },
        dltClearCurrentRow(){
            this.$refs.tableView.dltClearCurrentRow();
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

<style>
  /*@import '../assets/common.css'*/
</style>