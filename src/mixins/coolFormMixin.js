/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2019-05-28 17:24:26
 * @version $Id$
 */

const coolFormMixn ={
	    data() {
	    return {
	      inputSize: 'mini',
	      labelData:''
	    }
	  },
	  mounted() {
	    this.updateForm()
	  },
	  methods: {
	    updateForm(arg) {
	      var obj = {}
	      if(this.formItems.hasOwnProperty('form')){
	        this.formItems.form.forEach(p => {
	        obj[p.name] = p.value
	        })
	      } 
	      console.log(obj)    
	      this.$emit('update-form', obj,arg)
	    },
	    mixInputButtonEvent(){
	      this.$emit('input-button-event')
	    },

	    itemClick(ev) {
	      this.$emit('click-events', ev)
	    },
	    focusEvent(arg){
	      this.labelData = arg
	       this.$emit('focus-event', arg)
	    },
	    querySearch(queryString, cb) {
	      // console.log(this.labelData)
	      this.$emit('query-search', queryString, cb ,this.labelData)
	    },
	    handleSelect(item) {
	      this.$emit('select', item)
	      this.updateForm()
	    },
	    nextInputData(arg){
	      this.$emit('keyup-enter',arg)
	    },
	    backUp(arg){
	      this.$emit('keyup-up',arg)
	    },

	    backDown(arg){
	      this.$emit('keyup-down',arg)
	    },
	    buttonsevent(arg){
	      this.$emit('button-click',arg)
	    }
	  }
}
export default coolFormMixn