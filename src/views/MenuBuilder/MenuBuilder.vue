<script>
import html2canvas from "html2canvas";
import axios from "axios";
import JSZip from "jszip";
import { saveAs } from "file-saver";
export default {
  data() {
    return {
      store_name: "來點熱炒熱炒店",
      tel: "0927735030",
      add: "新北市三峽區嘉添里3鄰81號",
      lang: "ja",
      userList: [
        { id: "P02", number: 2, level: 1, recommend: true, price: 120 },
        { id: "L03", number: 3, level: 2, recommend: true, price: 120 },
        { id: "B01", number: 1, level: 3, recommend: true, price: 120 },
        { id: "B02", number: 2, level: 3, recommend: true, price: 120 },
        { id: "B03", number: 3, level: 3, recommend: true, price: 120 },
        { id: "P03", number: 3, level: 1, recommend: true, price: 120 },
        { id: "P04", number: 4, level: 1, recommend: false, price: 120 },
        { id: "P01", number: 1, level: 1, recommend: false, price: 120 },
        { id: "V01", number: 1, level: 5, recommend: false, price: 120 },
        { id: "V03", number: 3, level: 5, recommend: false, price: 120 },
        { id: "V04", number: 4, level: 5, recommend: true, price: 120 },
        { id: "MD01", number: 1, level: 7, recommend: true, price: 120 },
        { id: "SD01", number: 1, level: 8, recommend: true, price: 120 },
        { id: "SD02", number: 2, level: 8, recommend: true, price: 120 },
        { id: "SD03", number: 3, level: 8, recommend: true, price: 120 },
        { id: "S01", number: 1, level: 6, recommend: true, price: 120 },
        { id: "S02", number: 2, level: 6, recommend: true, price: 120 },
        { id: "S03", number: 3, level: 6, recommend: true, price: 120 },
        { id: "S04", number: 4, level: 6, recommend: true, price: 120 },
        { id: "L02", number: 2, level: 2, recommend: true, price: 120 },
         { id: "MD02", number: 2, level: 7, recommend: true, price: 120 },
      ],
      // 處理截圖的data
      workId: 0,
      workList: [],
      comList: [],
      zip: null,
      zipfolder: null,
    };
  },
  methods: {
    async catchPic() {
      // 整理陣列
      await this.sortList();

      // 準備需要的東西
      this.zip = new JSZip();
      this.zipfolder = this.zip.folder("菜單圖檔");
      let imgUrlList = [];
      let vue_this = this;
      let catch_content = this.$refs.catch_content;
      let canvas_div = this.$refs.canvas_div

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
        if(sortList.length !== 0){
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
      await axios.get("/dishes.json").then((res) => {
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
        this.zipfolder.file(`菜單圖檔A4_${index + 1}.png`, baseUrl, {
          base64: true,
        });
      });
      this.zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, "菜單.zip");
      });
      // let link = document.createElement("a");
      // link.style.display = "none";
      // link.href = imgUrl;
      // link.download = "測試.png";
      // document.body.appendChild(link);
      // link.click();
      // link.remove();
    },
  },
  mounted() {
    this.$store.commit("navColor", "cream");
    this.$store.commit("langChange","ch")
    this.$root.$i18n.locale = "ch";
  },
  
};
</script>
<template src="./template.html"></template>
<style src="./style.css" scoped></style>
