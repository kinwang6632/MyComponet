<template>
  <input ref="input" type="text" @keydown="keydown" />
</template>

<script>
export default {
  data() {
    return {
      inputData: {
        year: [" ", " ", " ", " "],
        month: [" ", " "],
        day: [" ", " "],
        hh: [" ", " "],
        mm: [" ", " "],
        ss: [" ", " "],
        key: "",
        keyCode: 0,
        selectionStart: 0,
        selectionEnd: 0,
      },
      inputKeyDown: {
        keyCode: 0,
        key: "",
        selectionStart: 0,
        selectionEnd: 0,
        changeTime: "",
      },
      mask: "yyyy/MM/dd HH:mm:ss",
      chgMsk: [],
    };
  },
  methods: {
    keydown(e) {
      this.inputKeyDown.key = e.key;
      this.inputKeyDown.keyCode = e.keyCode;
      this.inputKeyDown.selectionStart = this.$refs.input.selectionStart;
      this.inputKeyDown.selectionEnd = this.$refs.input.selectionEnd;
      this.inputKeyDown.changeTime =
        new Date().getSeconds() + "-" + new Date().getMilliseconds();

      this.chgMsk = this.getMask(
        this.inputKeyDown.selectionStart,
        this.inputKeyDown.selectionEnd
      );
    },
    getMask(Start, End) {
      let mask = [];
      let objName = "";
      let objArray;
      let year = Array.from(
        { length: 4 },
        (_, i) => this.mask.indexOf("yyyy") + i
      );
      let month = Array.from(
        { length: 2 },
        (_, i) => this.mask.indexOf("MM") + i
      );
      let day = Array.from(
        { length: 2 },
        (_, i) => this.mask.indexOf("dd") + i
      );
      let HH = Array.from({ length: 2 }, (_, i) => this.mask.indexOf("HH") + i);
      let mm = Array.from({ length: 2 }, (_, i) => this.mask.indexOf("mm") + i);
      let ss = Array.from({ length: 2 }, (_, i) => this.mask.indexOf("ss") + i);

      for (let i = Start; i <= End; i++) {
        for (let j = 0; j <= 5; j++) {
          switch (j) {
            case 0:
              objName = "year";
              objArray = year;
              break;
            case 1:
              objName = "month";
              objArray = month;
              break;
            case 2:
              objName = "day";
              objArray = day;
              break;
            case 3:
              objName = "HH";
              objArray = HH;
              break;
            case 4:
              objName = "mm";
              objArray = mm;
              break;
            case 5:
              objName = "ss";
              objArray = ss;
              break;
            default:
              break;
          }

          if (objArray.includes(i)) {
            
            let pos = mask.findIndex((v) => v.name === objName);                        
            if (pos >= 0) {
              mask[pos].End = i - Start;              
            } else {
              mask.push({ name: objName, Start: i - Start, End: i - Start });

            }
          }
        }
        /*
        let a = [
          { prop1: "abc", prop2: "qwe" },
          { prop1: "bnmb", prop2: "yutu" },
          { prop1: "zxvz", prop2: "qwrq" },
        ];

        let index = a.findIndex((x) => x.prop2 === "yutu");
        console.log(index) */
        //   let i = 100;
        //   if (year.includes(i)) {
        //     let pos = mask.findIndex((element) => (element.name = "year"));
        //     if (pos >= 0) {
        //       mask.push({ name: "year", Start: i - Start });
        //     } else {
        //       mask[pos].end = i - Start;
        //     }
        //   }
        //   if (month.includes(i)) {
        //     let pos = mask.findIndex((element) => (element.name = "month"));
        //     if (pos >= 0) {
        //       mask.push({ name: "month", Start: i - Start });
        //     } else {
        //       mask[pos].end = i - Start;
        //     }
        //   }
        //   if (day.includes(i)) {
        //     if (!mask.includes("day")) {
        //       mask.push("day");
        //     }
        //   }
        //   if (HH.includes(i)) {
        //     if (!mask.includes("hh")) {
        //       mask.push("hh");
        //     }
        //   }
        //   if (mm.includes(i)) {
        //     if (!mask.includes("mm")) {
        //       mask.push("mm");
        //     }
        //   }
        //   if (ss.includes(i)) {
        //     if (!mask.includes("ss")) {
        //       mask.push("ss");
        //     }
        //   }
      }
      
      return mask;
    },
  },
  watch: {
    inputKeyDown: {
      handler() {
        
      },
      deep: true,
    },
  },
  mounted() {
    this.$refs.input.focus();
  },
};
</script>

<style>
</style>