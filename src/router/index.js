import Vue from 'vue'
import Vrouter from 'vue-router'
Vue.use(Vrouter);
import Foods from '@/components/body/Foods'
import Comment from '@/components/body/Comment'
import Shop from '@/components/body/Shop'

var router=new Vrouter({
  routes:[
    {
      path:"/",
      redirect:"/foods"
    },
    {
      path:"/foods",
      component:Foods
    },
    {
      path:"/comment",
      component:Comment
    },
    {
      path:"/shop",
      component:Shop
    }
  ]
});
export default router;
