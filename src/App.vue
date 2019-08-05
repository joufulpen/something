<template>
    <div >
        <cool-master-view ref="masterView" :unique-deploy-key="uniqueDeployKey" :axios-setting="axiosSetting"  @audit="testEvent" @table-row-click="rowClick"  :showModeList="showModeList" @get-condition="getCondition">
          <!-- <template #buttonSlot="slotProps">
               <el-input size="mini"  placeholder="输入姓名以查询" style="width:300px;float:right ">
              <el-button slot="append" icon="el-icon-search" type="primary" ></el-button>
            </el-input>
          </template>
          <template #pageTableColumns>
              <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
          </template> -->
        </cool-master-view>
         <!-- <el-row>
          <el-col :span="16">
             <cool-button-group :buttons="buttons" ></cool-button-group>
          </el-col>
          <el-col :span="8">
            <el-input size="mini"  placeholder="输入姓名以查询">
              <el-button slot="append" icon="el-icon-search" type="primary"></el-button>
            </el-input>
          </el-col>
        </el-row> -->
        <!-- <cool-form-view :formItems="formItems1" /> -->
        <!-- <cool-views :unique-deploy-key="uniqueDeployKey" @hdr-page-size-change="paginationSizeChange" @hdr-pagination-current-change="paginationCurrentChange"/> -->

        <cool-master-dialog ref="dialog" :unique-key="uniqueKey" :visible.sync="showEditDialog" >
          <!-- <template #tableHeader >
              <el-row style="padding:8px">
          <el-col :span="4">
              <h2>样品列表</h2>
          </el-col>
          <el-col :span="20">
             <cool-button-group :buttons="buttons" ></cool-button-group>
          </el-col>
        </el-row>
          </template>
           <template #columns>
              <el-table-column
                fixed="right"
                label="操作"
                width="120">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="deleteRow(scope.$index)"
                    type="text"
                    size="small">
                    移除
                  </el-button>
                </template>
              </el-table-column>
            </template> -->
        </cool-master-dialog>
    </div>
</template>

<script>
import coolElements from './index.js'
import tableMixin from './mixins/tableMixin'
// import axios from 'axios'
// import {setAxios} from '../utils/axios'
export default {
    components: coolElements,
    mixins:[tableMixin],
    data(){
            return {
              isMthods:{
                isTableRowClick:false
              },
              showModeList:true,
              uniqueKey:'http://198.168.1.98:97/api/PurOrder',
              uniqueDeployKey:{
                api:'http://198.168.1.98:97/api/PurOrder',
                buttons:'Emp_button',                
                queryCondition:'Emp_query', 
                hdrTableData:'Emp_table',
                
                dltTableData:'Emp_dltTable',
                modeList:'Emp_modeList',
               },
               axiosSetting:{
                  baseURL:'http://198.168.1.98:8096/api/',
                },
              showEditDialog:false,
              formItems1: {
            form: [{
                type: 'date',
                value: '',
                label: '发货时间',
                name: 'deliveryTime',
                placeholder:"选择日期",
                style: {
                  width: '30%',
                },
                rules: {
                  required: true,
                  message: '发货时间不能为空',
                  trigger: 'blur'
                }
              }, {
                type: 'input',
                inputType:"text",
                value: '',
                label: '联系人',
                name: 'contact',
                disabled: false,
                style: {
                  width:'23.33%'
                }
              }, {
                type: 'input',
                inputType:"tel",
                value: '',
                label: '联系电话',
                name: 'contactTEL',
                style: {
                  width:'23.33%'
                },
                disabled: false
              }, 
              {
                type: 'input',
                inputType:"text",
                value: '',
                label: '货运地址',
                name: 'address',
                disabled: true,
                style: {
                  width:'23.33%'
                },
              }
            ]
          },
               buttons: [{
                text: '查询',
                
                size: 'mini',
                icon: 'el-icon-search',
                disabled: false
              },
              {
                text: '提交',
                size: 'mini',
                
                icon: 'el-icon-upload2',
                disabled: false
              },
              {
                text: '新建',
                size: 'mini',
                
                icon: 'el-icon-plus',
                disabled: false
              },
              {
                text: '导出',
                size: 'mini',
               
                icon: 'el-icon-download',
                disabled: false
              }
            ],
          
            }

        },
    mounted(){
      // this.testEvent()
    },    
    methods:{
      getCondition(arg){
        console.log(arg)
      },
      testEvent(arg){
          console.log(arg)
    },
     deleteRow(index) {
      console.log(this.$refs.dialog.$refs.table.data)
       this.$refs.dialog.$refs.table.data.splice(index, 1)
      },
    rowClick(arg){
      console.log(arg,this.$refs.masterView.$refs.table)
      
    }
  }
}
</script>
<style>
 *{
  padding:0;
  margin:0;
}

</style>