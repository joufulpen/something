<template>
	<div>
		<template v-for="dialog in dialogs">
            <cool-dialog class="rawdialog" :name="dialog.name" :visible.sync="dialog.visible" :fullscreen.sync="dialog.fullscreen" :collapsed.sync="dialog.collapsed" :width="dialog.width" :iframe-height="dialog.iframeHeight" :title="dialog.title" :src.sync="dialog.src" :top="dialog.top"  @closedialog="closedialog" ></cool-dialog>
    	</template>
	</div>
</template>

<script>
	import coolDialog from './commonComponents/cool-dialog.vue'
	const component = {
		name: 'multi-dialog',
		components: {
			coolDialog
		},
		props: {
		    dialogs: Array
		  },
		  install: (Vue, options) =>
        Vue.component(
            (options ? options.prefix : '') + component.name,
            component,
        ),
		methods: {
		    closedialog() {
		      this.$emit('closedialog')
		    }
		  }
	}
	export default component
</script>

<style>

</style>