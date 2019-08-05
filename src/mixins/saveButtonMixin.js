/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2019-05-30 17:53:28
 * @version $Id$
 */
const saveButtonMixin = {
	props:{
			// footerBtn
        backBtnIcon:{
        	type:String,
        	default:'el-icon-back'
        },
        saveBtnIcon:{
        	type:String,
        	default:'el-icon-document'
        },
        BtnSize:{
        	type:String,
        	default:'mini'
        },
        backBtnText:{
        	type:String,
        	default:'返回'
        },
        saveBtnText:{
        	type:String,
        	default:'保存'
        },
        backBtnType:String,
        saveBtnType:String,
		}
}
export default saveButtonMixin
