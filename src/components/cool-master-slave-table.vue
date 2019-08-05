<template>
    <el-container >
      <el-main>
        <cool-page-table ref="table" :showSummary="hdrTableData.showSummary" :tableClass="hdrTableData.tableClass" :tableStyle="hdrTableData.tableStyle" :paginationClass="hdrTableData.paginationClass" :paginationStyle="hdrTableData.paginationStyle" :vLoading="hdrTableData.vLoading" :stripe="hdrTableData.stripe" :size="hdrTableData.size" :width="hdrTableData.width" :height="hdrTableData.height" :maxHeight="hdrTableData.maxHeight" :fit="hdrTableData.fit" :rowKey="hdrTableData.rowKey" :showPage="hdrTableData.showPage" :border="hdrTableData.border" :data="hdrTableData.data" :columns="hdrTableData.columns" :total="hdrTableData.total" :layout="hdrTableData.layout" :pageSize.sync="hdrTableData.pageSize" :currentPage.sync="hdrTableData.currentPage" :context="hdrTableData.context" :showHeader="hdrTableData.showHeader" :sumText="hdrTableData.sumText" :summaryMethod="hdrTableData.summaryMethod" :rowClassName="hdrTableData.rowClassName" :rowStyle="hdrTableData.rowStyle" :cellClassName="hdrTableData.cellClassName" :cellStyle="hdrTableData.cellStyle" :headerRowClassName="hdrTableData.headerRowClassName" :headerRowStyle="hdrTableData.headerRowStyle" :headerCellClassName="hdrTableData.headerCellClassName" :headerCellStyle="hdrTableData.headerCellStyle" :highlightCurrentRow="hdrTableData.highlightCurrentRow" :currentRowKey="hdrTableData.currentRowKey" :emptyText="hdrTableData.emptyText" :expandRowKeys="hdrTableData.expandRowKeys" :defaultExpandAll="hdrTableData.defaultExpandAll" :defaultSort="hdrTableData.defaultSort" :tooltipEffect="hdrTableData.tooltipEffect" :spanMethod="hdrTableData.spanMethod" :pageCount="hdrTableData.pageCount" :pageSizes="hdrTableData.pageSizes" :popperClass="hdrTableData.popperClass" :prevText="hdrTableData.prevText" :nextText="hdrTableData.nextText" :background="hdrTableData.background" @table-row-click="tableRowClick" @table-select="tableSelect" @table-select-all="tableSelectAll" @table-selection-change="tableSelectionChange" @table-cell-click="tableCellClick" @table-row-dblclick="tableRowDblclick" @table-header-click="tableHeaderClick" @table-sort-change="tableSortChange" @table-current-change="tableCurrentChange" @pagination-size-change="paginationSizeChange" @pagination-current-change="paginationCurrentChange" :rowClick="rowClick">
            <template #pageTableColumns>
                <slot name="pageTableColumns"></slot>
            </template>
        </cool-page-table>
      </el-main>
      <el-footer :height="dltTableHeight">
        <el-tabs  ref="tabs" type="border-card" v-model="activeName">
          <el-tab-pane v-for="dltTab in dtlTableData" :label="dltTab.label" :name="dltTab.name">
            <span slot="tab.label"> {{dltTab.label}}</span>
            <cool-table-view ref="dltTable"  :showSummary="dltTab.showSummary"  :tableClass="dltTab.tableClass" :tableStyle="dltTab.tableStyle" :vLoading="dltTab.vLoading" :stripe="dltTab.stripe" :size="dltTab.size" :width="dltTab.width" :height="dltTab.height" :maxHeight="dltTab.maxHeight" :fit="dltTab.fit" :rowKey="dltTab.rowKey" :border="dltTab.border" :data="dltTab.data" :columns="dltTab.columns" :context="dltTab.context" :showHeader="dltTab.showHeader" :sumText="dltTab.sumText" :summaryMethod="dltTab.summaryMethod" :rowClassName="dltTab.rowClassName" :rowStyle="dltTab.rowStyle" :cellClassName="dltTab.cellClassName" :cellStyle="dltTab.cellStyle" :headerRowClassName="dltTab.headerRowClassName" :headerRowStyle="dltTab.headerRowStyle" :headerCellClassName="dltTab.headerCellClassName" :headerCellStyle="dltTab.headerCellStyle" :highlightCurrentRow="dltTab.highlightCurrentRow" :currentRowKey="dltTab.currentRowKey" :emptyText="dltTab.emptyText" :expandRowKeys="dltTab.expandRowKeys" :defaultExpandAll="dltTab.defaultExpandAll" :defaultSort="dltTab.defaultSort" :tooltipEffect="dltTab.tooltipEffect" :spanMethod="dltTab.spanMethod" @table-row-click="dltTableRowClick" @table-select="dltTableSelect" @table-select-all="dltTableSelectAll" @table-selection-change="dltTableSelectionChange" @table-cell-click="dltTableCellClick" @table-row-dblclick="dltTableRowDblclick" @table-header-click="dltTableHeaderClick" @table-sort-change="dltTableSortChange" @table-current-change="dltTableCurrentChange">
             <!--  <template #columns>
                  <slot :name="dltTab.name"></slot>
              </template> -->
            </cool-table-view>
          </el-tab-pane>
        </el-tabs>
      </el-footer>
    </el-container>
</template>

<script>
	// import coolPageTable from './commonComponents/cool-page-table.vue'
  // import coolTable from './commonComponents/cool-table.vue'
  import coolPageTableMixin from '../mixins/coolPageTableMixin.js'
  import coolMasterSlaveTableMixin from '../mixins/coolMasterSlaveTableMixin.js'
  const component = {
    name: 'master-slave-table',
    mixins:[coolPageTableMixin,coolMasterSlaveTableMixin],
    // components:{
    // 	coolPageTable,
    //   coolTable
    // },
    data:function(){
      return {
        // activeName: this.dtlTableData.length ? this.dtlTableData[0].name : ''
        activeName:'first',
        dltTableHeight:'260px'
      }
    },
    props: {
        // table主表的数据
        hdrTableData:{
          type:Object,
          default:function(){
            return {}
          }
        },
        // 是否显示从表
        showDltTable:{
          type:Boolean,
          default:false
        },
        //table从表的数据
        dtlTableData:{
          type:Array,
          default:function(){
            return []
          }
        },
        rowClick:Function
    },
    install: (Vue, options) =>
        Vue.component(
            (options ? options.prefix : '') + component.name,
            component,
        ),
  methods: {
    
  }
}

export default component
</script>

<style scoped>

</style>