<template>
	<!-- <el-footer height="auto" :style="footerPageStyle"> -->
 		<el-pagination ref="pagination" :class="paginationClass" :style="paginationStyle" :page-size="pageSize"  :total="total" :page-count="pageCount" :current-page="currentPage" :layout="layout" :page-sizes="pageSizes" :popper-class="popperClass" :prev-text="prevText" :next-text="nextText" :background="background">
 		</el-pagination>
 <!-- 	</el-footer>	 -->
</template>

<script>
	import paginationMixin from '../../mixins/paginationMixin.js'
	const component = {
	name: 'pagination',
	mixins:[paginationMixin],
	mounted: function() {
		this.$nextTick(this.registerPageEvents())
	    // setTimeout(this.registerPageEvents, 800)
	  },   
	methods:{
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
	    registerPageEvents: function() {
	      var pagination = this.$refs.pagination
	      console.log(pagination)
	      var paginationEvents = ['size-change', 'current-change']
	      this.redirectEvents(pagination, this, paginationEvents, 'pagination-')
	    },
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