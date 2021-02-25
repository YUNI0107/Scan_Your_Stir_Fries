<script>
import MenuDishesList from '../../components/MenuDishesList/MenuDishesList'
import AddModal from '../../components/AddModal/AddModal'
import Footer_section from '../../components/Footer/Footer'
import axios from 'axios'
export default {
    props: ['id'],
    data(){
        return{
            catelist:[
                {name: "pork"},
                {name: "lamb"},
                {name: "beef"},
                {name: "chicken"},
                {name: "veg"},
                {name: "sea"},
                {name: "main"},
                {name: "side"},
            ],
            dishesList: [],
            loading: true,
            infoOpenID: "P01",
        }
    },
    watch:{
        id(){
            this.getDishesList()
        }
    },
    methods:{
        getDishesList(){
            this.dishesList = [];
            this.loading = true;
            axios.get('../dishes.json').then(res=>{
            for( let i in res.data ){
                if(res.data[i].cate == this.id){
                    this.dishesList.push(res.data[i])
                }
            }
            this.loading = false;
        })
        },
        openInfoID(id){
            this.infoOpenID = id;
        }
    },
    components:{
        MenuDishesList,
        Footer_section,
        AddModal,
    },
    mounted() {
        this.$store.commit('navColor', 'cream')
        this.getDishesList()
    },
}
</script>
<template src="./template.html"></template>
<style src="./style.css" scoped></style>