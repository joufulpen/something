/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2019-05-27 17:37:36
 * @version $Id$
 */
const coolTableMixin = {
	methods:{
		 // table主表方法
    tableRowClick(arg){
    	// console.log(arg)
      this.$emit('table-row-click',arg)
    },
    tableSelect(arg){
      this.$emit('table-select',arg)
    },
    tableSelectAll(arg){
      this.$emit('table-select-all',arg)
    },
    tableSelectionChange(arg){
    	// console.log(arg)
      this.$emit('table-selection-change',arg)
    },
    tableCellClick(arg){
      this.$emit('table-cell-click',arg)
    },
    tableRowDblclick(arg){
      this.$emit('table-row-dblclick',arg)
    },
    tableHeaderClick(arg){
      this.$emit('table-header-click',arg)
    },
    tableSortChange(arg){
      this.$emit('table-sort-change',arg)
    },
    tableCurrentChange(arg){
      this.$emit('table-current-change',arg)
    },
    paginationSizeChange(arg){
    	// console.log(arg)
      this.$emit('pagination-size-change',arg)
    },
    paginationCurrentChange(args){
      this.$emit('pagination-current-change',args)
    },
    clearSelectionOuter(){
        this.$refs.table.clearSelectionOuter();
    },
    clearCurrentRow(){
        this.$refs.table.clearCurrentRow();
    },
	}
}
export default coolTableMixin