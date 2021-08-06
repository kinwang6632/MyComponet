<template>
  <input ref="input" type="text" @keydown="keydown" @input="inputChange" />
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
        currentPos :0,
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
      let Star = 0;
      let End = 0;
      this.inputKeyDown.key = e.key;
      this.inputKeyDown.keyCode = e.keyCode;
      this.inputKeyDown.selectionStart = this.$refs.input.selectionStart;
      this.inputKeyDown.selectionEnd = this.$refs.input.selectionEnd;
      Star = this.inputKeyDown.selectionStart;
      End = this.inputKeyDown.selectionEnd;
      if (End > Star) {
        End -=1;
      }
      if (e.keyCode === 8) {
        if (Star === End) {
          Star -= 1;                          
        }
      }      
      this.inputKeyDown.selectionStart = Star
      this.inputKeyDown.selectionEnd = End
      this.inputKeyDown.changeTime =
        new Date().getSeconds() + "-" + new Date().getMilliseconds();
      this.chgMsk = this.getMask(Star, End);
    },
    inputChange() {
      
      this.$refs.input.value = this.inputData.year.toString().replace(/,/g,'') + 
        '/' + this.inputData.month.toString().replace(/,/g,'')

      this.$refs.input.setSelectionRange(this.inputData.currentPos,this.inputData.currentPos)
    },
    getMask(Start, End) {
      let mask = [];
      let objName = "";
      let searchName = "";
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
              objName = "HH";
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
              mask.push({ name: objName, Start: i - p, End: i - p });
            }
          }
        }
      }

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
        if (Char === '') {
          
          return
        }        
        if (this.chgMsk.length >= 1) {
          for (let i = 0; i < this.chgMsk.length; i++) {
            let name = this.chgMsk[i].name;
            let start = this.chgMsk[i].Start;
            if ( v.keyCode !=46 && v.keyCode != 8 )  {
              console.log(v.keyCode)
              this.inputData.currentPos = v.selectionStart+1
            } else {
              if (v.keyCode !=8) {
                console.log(v.keyCode)
                this.inputData.currentPos = v.selectionStart-1
              }
            }
            if (this.inputData.currentPos < 0 ) {this.inputData.currentPos = 0}            
            let end = this.chgMsk[i].End;            
            for (let j = start; j <= end; j++) {
              this.inputData[name][j] = Char;              
              Char = " ";              
            }
          }
        }
        // this.$refs.input.value = this.inputData['year'].toString().replace(/,/g,'') + '/' +
        //       this.inputData['month'].toString().replace(/,/g,'').toString()
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