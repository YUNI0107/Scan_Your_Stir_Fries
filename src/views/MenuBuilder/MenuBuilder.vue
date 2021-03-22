<script>
import html2canvas from "html2canvas";
import JSZip from "jszip";
import { saveAs } from "file-saver";
export default {
  data() {
    return {
      userList: [
        { id: "P02", number: 2, level: 1 },
        { id: "L01", number: 1, level: 2 },
        { id: "L03", number: 3, level: 2 },
        { id: "L04", number: 4, level: 2 },
        { id: "L05", number: 5, level: 2 },
        { id: "L06", number: 6, level: 2 },
        { id: "B01", number: 1, level: 3 },
        { id: "P03", number: 3, level: 1 },
        { id: "C01", numer: 1, level: 4 },
        { id: "P01", number: 1, level: 1 },
        { id: "V01", number: 1, level: 5 },
        { id: "MD01", number: 1, level: 7 },
        { id: "SD01", number: 1, level: 8 },
        { id: "S01", number: 1, level: 6 },
        { id: "L02", number: 2, level: 2 },
      ],
      workId: 0,
      workList: [],
      comList: [],
      zip: null,
      zipfolder: null,
    };
  },
  methods: {
    async catchPic() {
      this.sortList();

      this.zip = new JSZip();
      this.zipfolder = this.zip.folder("菜單圖檔");
      let imgUrlList = [];
      let vue_this = this;
      let catch_content = this.$refs.catch_content;
      for (let i = 0; i < this.comList.length; i++) {
        await this.changeId(i);
        let new_canvas = document.createElement("canvas");
        new_canvas.width = 2479;
        new_canvas.height = 3508;
        new_canvas.style.width = 2479 + "px";
        new_canvas.style.height = 3508 + "px";
        this.$refs.canvas_div.appendChild(new_canvas);
        await html2canvas(catch_content, {
          canvas: new_canvas,
        }).then(function(canvas) {
          document.body.appendChild(canvas);
          imgUrlList.push(canvas.toDataURL());
          new_canvas.remove();
          if (i == vue_this.comList.length - 1) {
            vue_this.workId = 0;
            vue_this.workList = [];
            // vue_this.comList = [];
          }
        });
      }
      this.fileDownload(imgUrlList);
    },
    sortList() {
      let levelList = this.userList.sort((a, b) => {
        return a.level - b.level;
      });
      let sortList = [];
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
        this.workList.push({
          id,
          level: 0,
        });
        sortList.forEach((item) => {
          this.workList.push(item);
        });
      }

      // 切割陣列函式 多少數字換一頁
      let eachPage = 5;
      // 首先先看要重複幾次切割，分成幾頁
      for (let i = 0; i < parseInt(this.workList.length / eachPage) + 1; i++) {
        // 檢查要切割的原始陣列，尾巴是不是title
        let now_title = this.workList.slice(i * eachPage, i * eachPage + eachPage)[4]
        let front_title = this.workList.slice( (i - 1) * eachPage,(i - 1) * eachPage + eachPage)[4]

        console.log(now_title,front_title);
        if (now_title !==undefined  && now_title.level == 0) {
          // console.log("標題在尾巴，只取前面的");
          this.comList.push(this.workList.slice(i * 5, i * 5 + 4));
        } else if (i !== 0 && front_title !== undefined && front_title.level == 0) {
          // 檢查要切割的陣列，上一個陣列底尾巴是否是title(使用原始陣列作查詢)
          this.comList.push(this.workList.slice(i * 5, i * 5 + 5));
          // 將上個陣列的尾巴加到下一頁的第一個
          this.comList[this.comList.length - 1].unshift(
            this.workList.slice((i - 1) * 5, (i - 1) * 5 + 5)[4]
          );
        } else {
          this.comList.push(this.workList.slice(i * 5, i * 5 + 5));
        }
      }
    },
    async changeId(i) {
      this.workId = i;
    },
    async fileDownload(imgUrlList) {
      imgUrlList.forEach((imgUrl, index) => {
        let baseUrl = imgUrl.replace(/^data:image\/(png|jpg);base64,/, "");
        this.zipfolder.file(`菜單圖檔A4_${index+1}.png`, baseUrl, {
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
  },
};
</script>
<template src="./template.html"></template>
<style src="./style.css" scoped></style>
