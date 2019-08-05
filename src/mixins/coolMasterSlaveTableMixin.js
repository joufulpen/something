/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2019-05-28 09:45:49
 * @version $Id$
 */

const coolMasterSlaveTableMixin ={
	methods:{
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
	      this.$emit('dlt-selection-change',arg)
	    },
	    dltTableCellClick(arg){
	      this.$emit('dlt-cell-click',arg)
	    },
	    dltTableRowDblclick(arg){
	      this.$emit('dlt-row-dblclick',arg)
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
	        this.$refs.dltTable.clearSelectionOuter();
	    },
	    dltClearCurrentRow(){
	        this.$refs.dltTable.clearCurrentRow();
	    },
	}
}
export default coolMasterSlaveTableMixin 