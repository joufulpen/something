<template>
	<div>
          <el-button :icon="backBtnIcon" @click="backEvent" :size="BtnSize" :type="backBtnType">{{backBtnText}}</el-button>
          <el-button :icon="saveBtnIcon" @click="saveEvent" :size="BtnSize" style="float:right;" :type="saveBtnType">{{saveBtnText}}</el-button>
     </div>
</template>

<script>
	import saveButtonMixin from '../../mixins/saveButtonMixin.js'
	const component = {
		name: 'save-button',
		mixins:[saveButtonMixin],
		methods:{
			backEvent(){
				this.$emit('back-event')
			},
			saveEvent(){
				this.$emit('save-event')
			}
		},		  	
		install: (Vue, options) =>
		    Vue.component(
		        (options ? options.prefix : '') + component.name,
		        component,
		    )
	}

export default component	
</script>

<style>

</style>