<template>
    <el-dialog :top.sync="top" :visible.sync="visible" :width="width" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" @close="closedialog" append-to-body>
    <div slot="title">
        {{title}}
        <el-button-group style="float: right">
            <el-button :disabled="fullscreen" style="width:24px; padding:4px;" size="mini" icon="el-icon-d-caret" @click="collapsedClicked"></el-button>
            <el-button style="width:24px; padding:4px;" size="mini" icon="el-icon-close" type="danger" @click="closeClicked"></el-button>
        </el-button-group>
    </div>
    <el-collapse-transition>
        <div v-show="!collapsed" style="overflow: hidden;border:1px solid #DCDFE6;">
            <iframe ref="iframe" :src="src" style="width:100%;border:none;height:80vh;vertical-align:bottom;"></iframe>      
        </div>      
    </el-collapse-transition>
	</el-dialog>
</template>

<script>
const component = {
    name: 'cool-dialog',
    props: {
        name: String,
	    visible: Boolean,
	    width: String,
	    iframeHeight: String,
	    fullscreen: Boolean,
	    collapsed: Boolean,
	    title: String,
	    src: String,
	    top: String
    },
    install: (Vue, options) =>
        Vue.component(
            (options ? options.prefix : '') + component.name,
            component,
        ),
    methods: {
    collapsedClicked: function() {
      this.$emit('update:collapsed', !this.collapsed) //emit for sync
    },
    closeClicked: function() {
      this.$emit('update:visible', !this.visible) //emit for sync
    },
    closedialog() {
      this.$emit('closedialog')
      // this.$emit('update:src', '')  //emit for sync
    },
    backEvent(){
        this.$emit('back-event')
    },
    saveEvent(){
      this.$emit('save-event')  
    }
  },
}

export default component
</script>

<style scoped>

</style>