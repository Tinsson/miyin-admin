import Vue from 'vue'
import {crossObj, uploadData} from "../../utils/common";

Vue.prototype.$oss_url = 'http://myin.oss-cn-beijing.aliyuncs.com/';
Vue.prototype.$crossObj = crossObj;
Vue.prototype.$uploadData = uploadData;

export default Vue
