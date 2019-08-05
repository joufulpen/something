<template>
    <div class="cool-form">
    <el-form :model="formItems" :rules="rules" ref="ruleForm" :size="size" :inline="inline" :label-position="labelPosition" :label-width="labelWidth">
      <el-form-item :label="item.label" :prop="'form.' + index + '.value'" v-for="(item,index) in formItems.form || formItems " :style="item.style" :key="index" :rules="item.rules">
        <el-input v-model="item.value"  @change="updateForm(item.label)" v-if="item.type=='input'"  :style="item.inputStyle" :size="inputSize" @click.native="itemClick" :name="item.prop" :disabled="item.disabled" :readonly="item.readonly" :placeholder="item.placeholder" :suffix-icon="item.suffixIcon" :prefix-icon="item.prefixIcon" :clearable="item.clearable" @keyup.enter.native="nextInputData" @keyup.up.native="backUp" @keyup.down.native="backDown" @focus="focusEvent(item.label)"></el-input>
        <el-radio-group v-model="item.value" v-if="item.type=='radio'" :style="item.inputStyle"  @change="updateForm" :size="inputSize" :disabled="item.disabled">
          <el-radio :label="ele.value" v-for="(ele,index) in item.radioItems" :key="index">{{ele.label}}</el-radio>
        </el-radio-group>
        <el-select v-model="item.value"  v-if="item.type=='select'" :style="item.inputStyle"  @change="updateForm(item.label)" :size="inputSize" @focus="focusEvent(item.label)">
          <el-option v-for="(ele,index) in item.options" :label="ele.label" :value="ele.value" :key="index"></el-option>
        </el-select>
        <el-checkbox-group v-model="item.value" v-if="item.type=='chenckbox'" :style="item.inputStyle" :size="inputSize">
          <el-checkbox v-for="ele in item.chenckboxItems" :key="ele.index" :label="ele.value"  @change="updateForm">{{item.label}}</el-checkbox>
        </el-checkbox-group>
        <!-- switch -->
        <el-switch v-if="item.type == 'switch'" v-model="item.value" :active-color="item.activeColor" :inactive-color="item.inactiveColor" :disabled="item.disabled" :width="item.width" :active-icon-class="item.activeIconClass" :inactive-icon-class="item.inactiveIconClass" :active-text="item.activeText" :inactive-text="item.inactiveText" :active-value="item.activeValue" :inactive-value="item.inactiveValue" :name="item.name" :validate-event="item.validateEvent" @change="updateForm" :style="item.inputStyle">
      </el-switch>
         <!-- 带输入建议 -->
        <el-autocomplete v-model="item.value" :fetch-suggestions="querySearch" :size="inputSize" :style="item.inputStyle" v-if="item.type=='autocomplete'" @select="handleSelect"  @change="updateForm" @focus="focusEvent(item.label)"></el-autocomplete>
        <el-date-picker type="date" v-model="item.value" :size="inputSize" :format="item.format" :value-format="item.valueFormat" :disabled="item.disabled" v-if="item.type=='date'" :style="item.inputStyle"  @change="updateForm" :clearable="false" format="yyyy-MM-dd" value-format="yyyy-MM-ddT00:00:00" @focus="focusEvent(item.label)"></el-date-picker>
        <el-input v-model="item.value" :size="inputSize" type="textarea" :rows="item.rows"  @change="updateForm" v-if="item.type=='textarea'" :style="item.inputStyle" @focus="focusEvent(item.label)"></el-input>
        <el-input-number class="formNumber" v-model="item.value" :size="inputSize" @change="updateForm" v-if="item.type=='inputNumber'" :min="item.min" :max="item.max" label="item.label" :style="item.inputStyle" :controls="false" :precision="item.precision" @focus="focusEvent(item.label)"></el-input-number>
        <el-input :placeholder="item.placeholder" v-model="item.value" @change="updateForm" v-if="item.type=='mixInput'"  :style="item.inputStyle" :size="inputSize" @click.native="itemClick" :name="item.prop" :disabled="item.disabled" @focus="focusEvent(item.label)">
            <el-button @click="mixInputButtonEvent" slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <cool-button-group v-if="item.type == 'button'" :buttons="item.buttons" @button-click="buttonsevent" />
      </el-form-item>
       <slot name="formSlot" ></slot>
    </el-form>   
  </div>
</template>

<script>
  // import buttonsGroup from './cool-button.vue'
  import coolFormMixin from '../../mixins/coolFormMixin.js'
const component = {
    // components:{
    //     buttonsGroup
    // },
    name: 'form-view',
    mixins:[coolFormMixin],
    props: {
      formItems: {
        type:[Object,Array],
        default:function(){
          return {} || []
        }
      },
      size: String,
      inline: Boolean,
      itemWidth: String,
      itemStyle: Object,
      labelWidth: String,
      rules: Object,
      labelPosition: String
    },
    methods:{
      validateForm(){
        let judge=undefined
        // console.log(this.$refs.ruleForm)
        this.$refs.ruleForm.validate((valid) => {
          return judge=valid
         })
         return judge
      },
      clearForm(){
        this.$refs.ruleForm.clearValidate()
      },
      resetForm(){
        this.$refs.ruleForm.resetFields()
      },
    },
    install: (Vue, options) =>
        Vue.component(
            (options ? options.prefix : '') + component.name,
            component,
        )  
}

export default component
</script>

<style scoped>

</style>