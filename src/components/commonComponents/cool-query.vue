<template>
    <div class="cool-query">
      <el-aside width="235px">
      <div style="text-align:center;">{{queryText}}</div>
  <el-main style="font-size:12px;padding:5px;">
    <el-row :gutter="1" type="flex" justify="center" align="middle" style="margin-bottom:10px;text-align:center" v-for="(item,index) in originCondition" :key="index">
      <el-col :span="showModeList ? 6 : 10">{{item.name}}</el-col>
      <el-col :span="5" v-if="showModeList">
        <el-dropdown trigger="click" @command="handleCommand" placement="bottom-start">
          <span class="el-dropdown-link" style="font-size:12px;">
            {{item.mode}}
          </span>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item v-for="(list,idx) in item.modeList" :command="{data:list,index:idx,mode:item}">{{list}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="showModeList ? 13 : 14">
        <el-input clearable :size="size" v-model="item.value" @change="updateCondition" v-if="item.form=='input'"></el-input>
        <el-row v-if="item.form=='radio'">
          <el-col :span="12">
            <el-radio label="true" v-model="item.value" :size="size" @change="updateCondition" v-if="item.form=='radio'">是</el-radio>
          </el-col>
          <el-col :span="12">
            <el-radio label="false" v-model="item.value" :size="size" @change="updateCondition" v-if="item.form=='radio'">否</el-radio>
          </el-col>
          <!-- <el-col :span="8">
            <el-radio label="" v-model="item.value" :size="size" @change="updateCondition" v-if="item.form=='radio'">空</el-radio>
          </el-col> -->
        </el-row>
          <!-- 带输入建议 -->
        <el-autocomplete v-model="item.value" :fetch-suggestions="querySearch" :size="size" :style="item.inputStyle" v-if="item.form=='autocomplete'" @select="handleSelect"  @change="updateCondition" @focus="focusEvent(item.name)"></el-autocomplete>
        <!-- switch -->
        <el-switch v-if="item.form == 'switch'" v-model="item.value" :active-color="item.activeColor" :inactive-color="item.inactiveColor" :disabled="item.disabled" :width="item.width" :active-icon-class="item.activeIconClass" :inactive-icon-class="item.inactiveIconClass" :active-text="item.activeText" :inactive-text="item.inactiveText" :active-value="item.activeValue" :inactive-value="item.inactiveValue" :validate-event="item.validateEvent" @change="updateCondition">
      </el-switch>
        <el-select v-model="item.value" v-if="item.form=='select'" :size="size" clearable  @change="updateCondition">
          <el-option v-for="option in item.options" :key="option.value" :value="option.value" :label="option.label"></el-option>
        </el-select>
        <!-- 单个日期选择 -->
        <el-date-picker style="width:100%;font-size:10px" v-model="item.value" type="date" :size="size" @change="updateCondition" v-if="item.form=='singleDate'" value-format="yyyy-MM-dd" :clearable="false"></el-date-picker>
        <!-- 两个日期选择 -->
        <el-date-picker style="width:100%;font-size:10px" v-model="item.value[0]" type="date" :size="size" @change="updateCondition" v-if="item.form=='date'" value-format="yyyy-MM-dd" :clearable="false"><br></el-date-picker>
        <el-date-picker style="width:100%;font-size:10px" v-model="item.value[1]" type="date" :size="size" @change="updateCondition" v-if="item.form=='date'" value-format="yyyy-MM-dd" :clearable="false"></el-date-picker>
        <el-input-number v-model="item.value" :size="size" :controls="true" @change="updateCondition" v-if="item.form=='number'" style="width:100%"></el-input-number>

      </el-col>

    </el-row>
     <slot name="querySlot" /> 
  </el-main>
</el-aside></div>
</template>

<script>
  import {isArrOrObj} from '@/utils/axios'
const component = {
    name: 'query',
    props: {
        showModeList:{
          type:Boolean,
          default:true
        },
        originCondition:{
          type:[Object, Array],
          default:function(){
            return {} || []
          }
        },
        queryText:{
          type:String,
          default:'查询条件'
        },
        isMethods:{
          type:Object,
          default:function(){
            return {}
          }
        }
    },
    install: (Vue, options) =>
        Vue.component(
            (options ? options.prefix : '') + component.name,
            component,
        ),
    data() {
      return {
        size: 'mini',
        condition: [],
        labelData:''
      }
    },
    mounted() {
      this.updateCondition()
    },
    methods: {
      focusEvent(arg){
        console.log(arg)
        this.labelData = arg
      },
      handleSelect(item) {
        this.$emit('select', item)
        this.updateCondition()
      },
      handleCommand(command) {
        command.mode.mode = command.data
        this.updateCondition()
      },
      querySearch(queryString, cb) {
          if(this.isMethods.isQuerySearch) 
              this.$emit('query-search', queryString, cb)
          else{
            for(let i in this.originCondition){
              if(this.originCondition[i].name == this.labelData){
                var results = queryString ? this.originCondition[i].data.filter(this.createFilter(queryString)) : this.originCondition[i].data
                console.log(results)
                cb(results)
              } 
            }  
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
      filterMthods(valueArray,p){
        if(!this.showModeList){
            if(p != '')valueArray.push({value:p})
          }else valueArray.push({value:p})
      },
      objFn(){
        this.condition = []
        var obj={}

        for (var prop in this.originCondition) {
            this.condition.push(this.originCondition[prop])
        }
        this.condition = this.condition.map(item=>{ 
            let valueArray =[]
            if(isArrOrObj(item.value)){
              item.value.map(p=>{
                this.filterMthods(valueArray,p)
                
              })
            }else if(typeof(item.value) ==='string'){
              if(item.value.indexOf(',') != -1 ){
                let newArr = item.value.split(',') 
               newArr.map(p=>{
                this.filterMthods(valueArray,p)
              })
              }else if(item.value.indexOf('，') != -1 ){
                let newArr = item.value.split('，') 
               newArr.map(p=>{
                this.filterMthods(valueArray,p)
              })
             }else{
              if(!this.showModeList){
                  if(item.value !== ''){
                    valueArray.push({value:item.value})
                  }
                }else valueArray.push({value:item.value})
                // valueArray.push({value:item.value})
              }         
            }else if(typeof(item.value) ==='boolean'){
                  valueArray.push({value:item.value})
            }
            return { 
                  "FieldName":item.fieldName,
                  "TableName":item.tableName,
                  "Value":valueArray,
                  "TableRelationMode":item.tableRelationMode,
                  "Mode":item.mode,
                  "DataType":item.dataType
                }         
              })
            if(this.showModeList)
            this.condition = this.condition.filter(item=>item.Mode != '不参与')
            else this.condition = this.condition.filter(item=>item.Value.length !== 0)
            console.log(this.condition)
        this.$emit('get-condition', this.condition)
      },
      updateCondition() {
        // this.showModeList ? this.objFn() : this.otherFuc()             
        this.objFn()        
      },
    }
}

export default component
</script>

<style scoped>

</style>