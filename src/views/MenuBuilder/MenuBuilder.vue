<script>
import html2canvas from "html2canvas";
import axios from "axios";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Modal } from "bootstrap";

import BuildBlock from "../../components/BuildBlock/BuildBlock";
import FooterSection from "../../components/Footer/Footer";
export default {
  data() {
    return {
      make: false,
      store_name: "來點熱炒熱炒店",
      tel: "",
      add: "",
      lang: "en",
      userList: [],
      // 處理截圖的data
      workId: 0,
      workList: [],
      comList: [],
      zip: null,
      zipfolder: null,
      scrollTimeout: null,
      myModal: null,
    };
  },
  computed:{
    make_text(){
      if(this.make){
        return "生成中"
      }else{
        return "菜單生成"
      }
    },
    chi_lang(){
      if(this.lang=="en"){
        return "英文"
      }else if(this.lang=="ja"){
        return "日文"
      }else{
        return "韓文"
      }
    }
  },
  components: {
    BuildBlock,
    FooterSection,
  },
  methods: {
    async scrollToTop(){
      window.addEventListener("scroll", this.checkScroll)
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    },
    checkScroll(){
      this.make = true;
      this.myModal.show()
      clearTimeout(this.scrollTimeout)
      this.scrollTimeout = setTimeout(()=>{
        this.catchPic()
        window.removeEventListener("scroll", this.checkScroll)
      },100)
    },
    async catchPic() {
      // 整理陣列
      await this.sortList();

      // 準備需要的東西
      this.zip = new JSZip();
      this.zipfolder = this.zip.folder("菜單圖檔");
      let imgUrlList = [];
      let vue_this = this;
      let catch_content = this.$refs.catch_content;
      let canvas_div = this.$refs.canvas_div;

      // 在設定好的地方創造canvas，然後隱藏包住的元素
      // 創建canvas截好圖後做刪除
      this.$i18n.locale = this.lang;
      for (let i = 0; i < this.comList.length; i++) {
        await this.changeId(i);
        let new_canvas = document.createElement("canvas");
        new_canvas.width = 2479 * 2;
        new_canvas.height = 3508 * 2;
        new_canvas.style.width = 2479 + "px";
        new_canvas.style.height = 3508 + "px";
        canvas_div.append(new_canvas);
        await html2canvas(catch_content, {
          canvas: new_canvas,
        }).then(function(canvas) {
          // 把base24丟進去圖片列表裡面
          imgUrlList.push(canvas.toDataURL());
          new_canvas.remove();
          if (i == vue_this.comList.length - 1) {
            vue_this.workId = 0;
            vue_this.workList = [];
            vue_this.comList = [];
            vue_this.$i18n.locale = "ch";
          }
        });
      }
      this.fileDownload(imgUrlList);
    },
    async sortList() {
      // 分類的排序
      let levelList = this.userList.sort((a, b) => {
        return a.level - b.level;
      });
      let sortList = [];
      // 分類中數字的排序
      for (let i = 1; i < 9; i++) {
        sortList = levelList.filter((item) => item.level == i);
        sortList.sort((a, b) => {
          return a.number - b.number;
        });
        let id = "";
        if (i == 1) {
          id = "pork";
        } else if (i == 2) {
          id = "lamb";
        } else if (i == 3) {
          id = "beef";
        } else if (i == 4) {
          id = "chicken";
        } else if (i == 5) {
          id = "veg";
        } else if (i == 6) {
          id = "sea";
        } else if (i == 7) {
          id = "main";
        } else if (i == 8) {
          id = "side";
        }
        // 把title推到每個分類的最前面
        if (sortList.length !== 0) {
          this.workList.push({
            id,
            level: 0,
          });
        }
        // 再把該分類的菜色推進去
        for (let i = 0; i < sortList.length; i++) {
          await this.getDishes(sortList[i]);
        }
      }

      // 切割陣列函式 多少數字換一頁
      let eachPage = 24;
      // 首先先看要重複幾次切割，分成幾頁
      for (let i = 0; i < parseInt(this.workList.length / eachPage) + 1; i++) {
        // 檢查要切割的原始陣列，尾巴是不是title
        let now_title = this.workList.slice(
          i * eachPage,
          i * eachPage + eachPage
        )[eachPage - 1];
        let front_title = this.workList.slice(
          (i - 1) * eachPage,
          (i - 1) * eachPage + eachPage
        )[eachPage - 1];

        if (now_title !== undefined && now_title.level == 0) {
          // console.log("標題在尾巴，只取前面的");
          this.comList.push(
            this.workList.slice(i * eachPage, i * eachPage + (eachPage - 1))
          );
        } else if (
          i !== 0 &&
          front_title !== undefined &&
          front_title.level == 0
        ) {
          // 檢查要切割的陣列，上一個陣列底尾巴是否是title(使用原始陣列作查詢)
          this.comList.push(
            this.workList.slice(i * eachPage, i * eachPage + eachPage)
          );
          // 將上個陣列的尾巴加到下一頁的第一個
          this.comList[this.comList.length - 1].unshift(
            this.workList.slice(
              (i - 1) * eachPage,
              (i - 1) * eachPage + eachPage
            )[eachPage - 1]
          );
        } else {
          this.comList.push(
            this.workList.slice(i * eachPage, i * eachPage + eachPage)
          );
        }
      }
    },
    async getDishes(item) {
      await axios.get("dishes.json").then((res) => {
        item.ingredient = res.data[item.id].ingredient;
        this.workList.push(item);
      });
    },
    async changeId(i) {
      this.workId = i;
    },
    async fileDownload(imgUrlList) {
      imgUrlList.forEach((imgUrl, index) => {
        let baseUrl = imgUrl.replace(/^data:image\/(png|jpg);base64,/, "");
        this.zipfolder.file(`${this.chi_lang}菜單圖檔A4_${index + 1}.png`, baseUrl, {
          base64: true,
        });
      });
      this.make = false;
      this.myModal.hide()
      this.zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, `${this.chi_lang}_菜單.zip`);
        
      });
      // let link = document.createElement("a");
      // link.style.display = "none";
      // link.href = imgUrl;
      // link.download = "測試.png";
      // document.body.appendChild(link);
      // link.click();
      // link.remove();
    },
    userListPush(each_dishes) {
      let check_index = this.userList.findIndex(
        (element) => element.id == each_dishes.id
      );
      if (check_index == -1) {
        this.userList.push(each_dishes);
      } else {
        this.userList.splice(check_index, 1, each_dishes);
      }
    },
    dishesDelete(id) {
      let check_index = this.userList.findIndex((element) => element.id == id);
      this.userList.splice(check_index, 1);
    },
  },
  mounted() {
    this.$store.commit("navColor", "cream");
    this.$store.commit("langChange", "ch");
    this.$root.$i18n.locale = "ch";
    let modal = this.$refs.makeHideModal;
    this.myModal = new Modal(modal)
  },
  destroyed(){
    window.removeEventListener("scroll", this.checkScroll)
  }
};
</script>
<template src="./template.html"></template>
<style src="./style.css" scoped></style>
