import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import i18n from './locales/i18n'
import vueCustomElement from 'vue-custom-element'
import '@/assets/css/style.css' //custom css file 
import '@stripe/stripe-js'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import "@/assets/css/font-awesome.min.css";
import "@/assets/css/fonts.css";
import "@/assets/css/variable.css";
import "@/assets/css/responsive.css";
import "@/assets/css/common.css";

import 'document-register-element/build/document-register-element'


let el= document.querySelector("vue-widget");
createApp(App,{...el.dataset})
    .use(vueCustomElement)
    .use(router)
    .use(i18n)
    .use(store)
    .use(VueSweetalert2)
    .mount('vue-widget', App)


    
    // setTimeout(() => {
    //     document.querySelector("vue-widget").fields = {a:el.dataset};
    //   }, 1000);

    import {Demo} from '';

    // console.log('el',el.dataset)
    const Demo =new Demo(el.dataset.domain) // set base url
        async function main(){
           await Demo.authorize() //for auth 
           await Demo.useOrganizer(el.dataset.organizer_id)// set organization 
        }
     
        main();
    
    export default Demo