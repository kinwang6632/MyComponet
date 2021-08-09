<template>
  <input ref="input" type="text" @keydown="keydown" @input="inputChange" />
</template>

<script>
export default {
  data() {
    return {
      inputValue: "",
      inputData: {
        year: [" ", " ", " ", " "],
        month: [" ", " "],
        day: [" ", " "],
        hh: [" ", " "],
        mm: [" ", " "],
        ss: [" ", " "],
        currentPos: 0,
      },
      specialCharAry: [],
      inputKeyDown: {
        keyCode: 0,
        key: "",
        selectionStart: 0,
        selectionEnd: 0,
        changeTime: "",
      },
      mask: "yyyy/MM/dd",
      chgMsk: [],
    };
  },
  methods: {
    
    keydown(e) {
      

      let Star = 0;
      let End = 0;
      this.inputKeyDown.key = e.key;
      this.inputKeyDown.keyCode = e.keyCode;
      this.inputKeyDown.selectionStart = this.$refs.input.selectionStart;
      this.inputKeyDown.selectionEnd = this.$refs.input.selectionEnd;

      Star = this.inputKeyDown.selectionStart;
      End = this.inputKeyDown.selectionEnd;
      if (End > Star) {
        End -= 1;
      }

      if (Star < 0) {
        Star = 0;
      }
      if (End < 0) {
        End = 0;
      }
      this.inputKeyDown.selectionStart = Star;
      this.inputKeyDown.selectionEnd = End;
      this.inputKeyDown.changeTime =
        new Date().getSeconds() + "-" + new Date().getMilliseconds();
      this.chgMsk = this.getMask(Star, End, e.keyCode);
    },
    inputChange() {
      //yyyy/MM/dd HH:mm:ss
      let val = this.mask;
      if (val.indexOf("yyyy") >= 0) {
        val = val.replace(
          /yyyy/g,
          this.inputData.year.toString().replace(/,/g, "")
        );
      }
      if (val.indexOf("MM") >= 0) {
        val = val.replace(
          /MM/g,
          this.inputData.month.toString().replace(/,/g, "")
        );
      }
      if (val.indexOf("dd") >= 0) {
        val = val.replace(
          /dd/g,
          this.inputData.day.toString().replace(/,/g, "")
        );
      }
      if (val.indexOf("HH") >= 0) {
        val = val.replace(
          /HH/g,
          this.inputData.hh.toString().replace(/,/g, "")
        );
      }
      if (val.indexOf("mm") >= 0) {
        val = val.replace(
          /mm/g,
          this.inputData.mm.toString().replace(/,/g, "")
        );
      }
      if (val.indexOf("ss") >= 0) {
        val = val.replace(
          /ss/g,
          this.inputData.ss.toString().replace(/,/g, "")
        );
      }

      this.$refs.input.value = val;

      this.$refs.input.setSelectionRange(
        this.inputData.currentPos,
        this.inputData.currentPos
      );
    },
    getMask(Start, End, keyCode) {
      let mask = [];
      let objName = "";
      let searchName = "";
      let objArray;

      let year = Array.from(
        { length: 4 },
        (_, i) => this.mask.indexOf("yyyy") >=0 ? this.mask.indexOf("yyyy") + i:-1
      );
      let month = Array.from(
        { length: 2 },
        (_, i) => this.mask.indexOf("MM") >= 0 ? this.mask.indexOf("MM") + i:-1
      );
      let day = Array.from(
        { length: 2 },
        (_, i) => this.mask.indexOf("dd")>= 0 ? this.mask.indexOf("dd") + i:-1
      );
      let HH = Array.from({ length: 2 }, (_, i) => this.mask.indexOf("HH") >=0 ? this.mask.indexOf("HH") + i:-1);
      let mm = Array.from({ length: 2 }, (_, i) => this.mask.indexOf("mm") >=0 ? this.mask.indexOf("mm") + i:-1);
      let ss = Array.from({ length: 2 }, (_, i) => this.mask.indexOf("ss") >=0 ? this.mask.indexOf("ss") + i:-1);
      let tmpMask = this.mask;
      if (keyCode === 8) {
        if (Start === End) {
          Start -= 1;
          End = Start;
        }
      }

      for (let i = 0; i <= 4; i++) {
        let specialChar = "/";
        if (i === 2) {
          specialChar = " ";
        }
        if (i === 3 || i === 4) {
          specialChar = ":";
        }

        let specialCharPos = tmpMask.indexOf(specialChar);

        switch (specialChar) {
          case "/":
            tmpMask = tmpMask.replace(/\//, "X");
            break;
          case " ":
            tmpMask = tmpMask.replace(/ /, "X");
            break;
          default:
            tmpMask = tmpMask.replace(/:/, "X");
            break;
        }
        if (Start === specialCharPos && Start != 0) {
          if (keyCode === 8) {
            if (Start === End) {
              Start -= 1;
              End = Start;
            }
          }
        }
        if (Start === specialCharPos && keyCode != 8 && keyCode != 46) {
          Start += 1;
          End = Start;
        }
      }

      if (Start < 0) {
        Start = 0;
      }
      if (End < 0) {
        End = 0;
      }

      for (let i = Start; i <= End; i++) {
        for (let j = 0; j <= 5; j++) {
          switch (j) {
            case 0:
              objName = "year";
              objArray = year;
              searchName = "yyyy";
              break;
            case 1:
              objName = "month";
              objArray = month;
              searchName = "MM";
              break;
            case 2:
              objName = "day";
              objArray = day;
              searchName = "dd";
              break;
            case 3:
              objName = "hh";
              objArray = HH;
              searchName = "HH";
              break;
            case 4:
              objName = "mm";
              objArray = mm;
              searchName = "mm";
              break;
            case 5:
              objName = "ss";
              objArray = ss;
              searchName = "ss";
              break;
            default:
              break;
          }
          
          if (objArray.includes(i)) {
            const p = this.mask.indexOf(searchName);

            let pos = mask.findIndex((v) => v.name === objName);

            if (pos >= 0) {
              mask[pos].End = i - p;
            } else {
              try {
                mask.push({ name: objName, Start: i - p, End: i - p });
              } catch (e) {
                console.log(e);
              }
            }
          }
        }
      }
      this.inputData.currentPos = Start;
      
      return mask;
    },
  },
  watch: {
    inputKeyDown: {
      handler(v) {
        let Char = " ";

        Char = v.key.replace(/[^0-9]/g, "");
        if (Char == undefined || Char === "") {
          if (v.keyCode === 8 || v.keyCode === 46) {
            Char = " ";
          }
        }

        if (Char === "") {
          return;
        }

        if (this.chgMsk.length >= 1) {
          for (let i = 0; i < this.chgMsk.length; i++) {
            let name = this.chgMsk[i].name;
            let start = this.chgMsk[i].Start;
            if (v.keyCode != 46 && v.keyCode != 8) {
              this.inputData.currentPos = v.selectionStart + 1;
              if (this.specialCharAry.includes(this.inputData.currentPos)) {
                this.inputData.currentPos += 1;
              }
            } else {
              if (v.keyCode != 8 && v.keyCode != 46) {
                this.inputData.currentPos = v.selectionStart - 1;
              }
            }
            if (this.inputData.currentPos < 0) {
              this.inputData.currentPos = 0;
            }
            let end = this.chgMsk[i].End;
            for (let j = start; j <= end; j++) {
              this.inputData[name][j] = Char;
              Char = " ";
            }
          }
          if (v.selectionEnd - v.selectionStart > 0 && v.keyCode !=46 ) {
            let name = this.chgMsk[0].name;
            let o = Array.from(this.inputData[name]);
            let aryPreserve = o.slice(v.selectionEnd + 1,o.length)
            let Start = this.chgMsk[0].Start;
            let j = 0
            
            for(let i = Start+1;i<o.length;i++){              
              if (j<=aryPreserve.length-1) {
                this.inputData[name][i] = aryPreserve[j]
              } else {
                this.inputData[name][i] = " "
              }
              j+=1
            }
          }
          
          /* processing delete button */
          if (v.keyCode === 46 && this.chgMsk.length > 0  )  {            
            let name = this.chgMsk[0].name;
            let o = Array.from(this.inputData[name]);
            let Start = this.chgMsk[0].Start;
            let End = this.chgMsk[0].End;
            let aryPreserve = o.slice(End+1,o.length)
            let j = Start;
              
            for (let i = 0 ;i<aryPreserve.length;i++) {                
                this.inputData[name][j] = aryPreserve[i]
                j+=1                
            }
            
            for (let i=j;i<=o.length-1 ;i++) {
              this.inputData[name][i] = " "
            }
           
            
          }
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.inputValue = this.mask;
    this.inputValue = this.inputValue.replace(/y/g, " ");
    this.inputValue = this.inputValue.replace(/m/g, " ");
    this.inputValue = this.inputValue.replace(/M/g, " ");
    this.inputValue = this.inputValue.replace(/d/g, " ");
    this.inputValue = this.inputValue.replace(/H/g, " ");
    this.inputValue = this.inputValue.replace(/s/g, " ");
    this.$refs.input.value = this.mask;
    this.$refs.input.value = this.$refs.input.value.replace(/y/g, " ");
    this.$refs.input.value = this.$refs.input.value.replace(/M/g, " ");
    this.$refs.input.value = this.$refs.input.value.replace(/m/g, " ");
    this.$refs.input.value = this.$refs.input.value.replace(/s/g, " ");
    this.$refs.input.value = this.$refs.input.value.replace(/H/g, " ");
    this.$refs.input.value = this.$refs.input.value.replace(/d/g, " ");
    let tmp = this.mask;
    let specialChar = "";
    for (let i = 0; i <= 4; i++) {
      specialChar = "/";
      if (i === 2) {
        specialChar = " ";
      }
      if (i === 3 || i === 4) {
        specialChar = ":";
      }
      this.specialCharAry.push(tmp.indexOf(specialChar));
      switch (specialChar) {
        case "/":
          tmp = tmp.replace(/\//, "X");
          break;
        case " ":
          tmp = tmp.replace(/ /, "X");
          break;
        case ":":
          tmp = tmp.replace(/:/, "X");
          break;
        default:
          break;
      }
    }

    this.$refs.input.selectionStart = 0;
    this.$refs.input.focus();
  },
};
</script>

<style>
</style>