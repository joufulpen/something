<template>
	<el-table ref="table" :class="tableClass" v-loading="vLoading" :style="tableStyle" :data="data" :size="size" :width="width" :height="height" :max-height="maxHeight" :fit="fit" :stripe="stripe" :border="border" :row-key="rowKey" :context="context" :show-header="showHeader" :show-summary="showSummary" :sum-text="sumText" :summary-method="summaryMethod" :row-className="rowClassName" :row-style="rowStyle" :cell-class-name="cellClassName" :cell-style="cellStyle" :header-row-class-name="headerRowClassName" :header-row-style="headerRowStyle" :header-cell-class-name="headerCellClassName" :header-cell-style="headerCellStyle" :highlight-current-row="highlightCurrentRow" :current-row-key="currentRowKey" :empty-text="emptyText" :expand-row-keys="expandRowKeys" :default-expand-all="defaultExpandAll" :default-sort="defaultSort" :tooltip-effect="tooltipEffect" :span-method="spanMethod"> 
        <el-table-column v-for="column in columns" :type="column.type" :label="column.label" :class-name="column.className" element-loading-text="拼命加载中"  element-loading-spinner="el-icon-loading":label-class-name="column.labelClassName" :prop="column.prop" :width="column.width" :min-width="column.minWidth" :sortable="column.sortable" :sort-method="column.sortMethod" :sort-by="column.sortBy" :resizable="column.resizable" :column-key="column.columnKey" :align="column.align" :header-align="column.headerAlign" :show-tooltip-when-overflow="column.showTooltipWhenOverflow" :show-overflow-tooltip="true" :fixed="column.fixed" :formatter="column.formatter" :selectable="column.selectable" :filter-method="column.filterMethod" :filters="column.filters" :filter-placement="column.filterPlacement" :filter-multiple="column.filterMultiple" :index="column.index" :key="column.columnKey">
      </el-table-column>
        <slot name="columns"></slot>
     </el-table>
</template>
<script>
	import tableMixin from '../../mixins/tableMixin.js'
	const component = {
		name: 'table-view',
		mixins:[tableMixin],
		mounted: function() {
    setTimeout(this.registerEvents, 800)
  },      
  methods: {
    clearSelectionOuter(){
        this.$refs.table.clearSelection();
    },
    clearCurrentRow(){
        this.$refs.table.setCurrentRow();
    },
    redirectEvents: function(source, target, events, prefix) {
	      events.forEach(function(event) {
	        if (source) {
	          source.$on(event, function(args) {
	            if (args != null) {
	              if (args.data) {
	                args.data = source
	              }
	            }
	            target.$emit(prefix + event, args)
	          })
	        }
	      })
	    },
	    registerEvents: function() {
	      var table = this.$refs.table
	      // console.log(table,this.$refs.pagination)
	      if (this.$refs.tableButtons) {
	        var buttons = this.$refs.tableButtons.$children
	        var buttonEvents = ['click']
	        buttons.forEach(p => {
	          this.redirectEvents(p, this, buttonEvents, 'button-')
	        })
	      }
	      var tableEvents = [
	        'select',
	        'select-all',
	        'selection-change',
	        'cell-click',
	        'row-click',
	        'row-dblclick',
	        'header-click',
	        'sort-change',
	        'current-change'
	      ]
	      this.redirectEvents(table, this, tableEvents, 'table-')
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

</style>