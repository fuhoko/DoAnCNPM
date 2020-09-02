import Vue from 'vue'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'

Object.keys(rules).forEach((rule) => {
  // eslint-disable-next-line import/namespace
  extend(rule, rules[rule])
})

Vue.component('validationObserver', ValidationObserver)
Vue.component('validationProvider', ValidationProvider)
