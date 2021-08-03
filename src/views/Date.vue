<template>
  <div>
    <input
      type="text"
      ref="input"
      v-model="dateValue"
      @input="change"
      @keydown="keydown"
    />
    <input
      type="text"
      ref="input2"
      v-model="inputValue2"
      @keydown="keydown2"
      @input="input"
    />
  </div>
</template>

<script>
//import {ref} from 'vue'
export default {
  data() {
    return {
      inputValue: "",
      inputValue2: "",
      selectionStart: 0,
      selectionEnd: 0,
      isBack: false,
      isDel: false,
      inputData: {
        year: [" ", " ", " ", " "],
        month: [" ", " "],
        day: [" ", " "],
        HH: [],
        mm: [],
        ss: [],
        StarPos: 0,
        keyCode: 0,
      },
      inputChangeData: {
        keyCode: -1,
        SelectionStart: 0,
        SelectionEnd: 0,
        key: "",
        forceChange: "",
      },
    };
  },
  methods: {
    change() {
      this.$refs.input.value = this.dateValue;
      if (this.selectionStart === 4 || this.selectionStart === 7) {
        this.selectionStart += 1;
      }
      if (this.selectionStart === 5 && (this.isBack || this.isDel)) {
        this.selectionStart = 4;
      }
      if (this.selectionStart === 8 && (this.isBack || this.isDel)) {
        this.selectionStart = 7;
      }

      this.$refs.input.selectionStart = this.selectionStart;
      this.$refs.input.selectionEnd = this.selectionStart;
      this.isBack = false;
      this.isDel = false;
    },
    input() {
      this.$refs.input2.value =
        this.inputData.year.toString().replace(/,/g, "") +
        "/" +
        this.inputData.month.toString().replace(/,/g, "") +
        "/" +
        this.inputData.day.toString().replace(/,/g, "");
      if (this.inputData.keyCode != 8 && this.inputData.keyCode != 46) {
        this.$refs.input2.setSelectionRange(
          this.inputData.StarPos + 1,
          this.inputData.StarPos + 1
        );
      } else {
        this.$refs.input2.setSelectionRange(
          this.inputData.StarPos,
          this.inputData.StarPos
        );
      }
      if (this.$refs.input2.selectionStart === 4) {
        if (this.inputData.keyCode != 8 && this.inputData.keyCode != 46) {
          this.$refs.input2.setSelectionRange(5, 5);
        }
      }
      if (this.$refs.input2.selectionStart === 7) {
        if (this.inputData.keyCode != 8 && this.inputData.keyCode != 46) {
          this.$refs.input2.setSelectionRange(8, 8);
        }
      }
    },
    keydown(e) {
      this.selectionStart = this.$refs.input.selectionStart;
      if (e.keyCode != 8 && e.keyCode != 46) {
        this.selectionStart += 1;
      } else {
        if (e.keyCode === 8) {
          this.selectionStart -= 1;
          this.isBack = true;
        } else {
          this.isDel = true;
        }
      }
    },
    keydown2(e) {
      this.inputChangeData.SelectionStart = this.$refs.input2.selectionStart;
      this.inputChangeData.SelectionEnd = this.$refs.input2.selectionEnd;
      this.inputChangeData.keyCode = e.keyCode;
      this.inputChangeData.key = e.key;
      this.inputChangeData.forceChange =
        new Date().getSeconds() + "-" + new Date().getMilliseconds();
      //this.selectionStart2 = this.$refs.input2.selectionStart;
      //this.selectionEnd2 = this.$refs.input2.selectionEnd;
      //console.log(this.$refs.input2.selectionStart + ',' + this.$refs.input2.selectionEnd )
    },
    keyup2() {
      //this.selectionRange = [this.$refs.input2.selectionStart,this.$refs.input2.selectionEnd,e.keyCode,this.inputValue2]
    },
  },
  watch: {
    inputChangeData: {
      handler(newValue) {
        let StarPos = newValue.SelectionStart;
        let EndPos = newValue.SelectionEnd;
        let Char = " ";
        let objname = "";
        this.inputData.keyCode = newValue.keyCode;
        if (StarPos <= 3) {
          objname = "year";
        }
        if (StarPos >= 5 && StarPos <= 6) {
          objname = "month";
        }
        if (StarPos >= 7 && StarPos <= 9) {
          objname = "day";
        }
        if (newValue.keyCode === 8 || newValue.keyCode === 46) {
          Char = " ";
          if (newValue.keyCode === 8) {
            if (StarPos === 4 || StarPos === 5) {
              objname = "year";
              if (StarPos == 5) {
                StarPos -= 1;
              }
            }
            if (StarPos === 8 || StarPos === 7) {
              objname = "month";
              if (StarPos === 8) {
                StarPos -= 1;
              }
            }
            if (StarPos === 10) {
              objname = "day";
            }
            StarPos -= 1;
          }
        } else {
          Char = newValue.key.toString().replace(/[^0-9]/g, "")[0];
        }
        this.inputData.StarPos = StarPos;
        let currentPos = StarPos;
        if (objname != "") {
          switch (objname.toUpperCase()) {
            case "month".toUpperCase():
              currentPos -= 5;
              break;
            case "day".toUpperCase():
              currentPos -= 8;
              break;
            default:
              break;
          }
          if (Char != undefined) {
            this.inputData[objname][currentPos] = Char;
          } else {
            this.inputData.StarPos -= 1;
          }
          if (newValue.keyCode === 46 ) {
            let tmp =[ ...this.inputData[objname]]
            for(let i=currentPos;i<=this.inputData[objname].length-1;i++){
              if(i<this.inputData[objname].length-1) {
                tmp[i] = this.inputData[objname][i+1]
              } else{
                tmp[this.inputData[objname].length-1] = " "
              }
              
            }
            this.inputData[objname] = tmp
          }
          if (EndPos>StarPos) {

            for(let i=1;i<EndPos-StarPos;i++){                                      
              if(StarPos<=4) {   
                console.log(EndPos-StarPos)
                this.inputData.year[StarPos+i] = " "
                // if (i===StarPos) {
                //   if(Char != undefined) {
                //     this.inputData.year[StarPos] = Char
                //   }  
                // }else{
                //   if (i<=this.inputData.year.length-1 && i>StarPos) {
                //     this.inputData.year[i] = " "
                //   }
                // }           
                
              }
            }
          }
          
          //if (newValue.keyCode === 32) {this.inputData.StarPos -=1}
        }
        /*
        console.log(objname);
        objname = "year";
        if (StarPos <= 4) {
          objname = "year";
          switch (newValue.keyCode) {
            case 8:
              StarPos -= 1;
              Char = " ";
              break;
            case 46:
              Char = " ";
              break;
            default:
              if (StarPos != 4) {
                Char = newValue.key.toString().replace(/[^0-9]/g, "")[0];
              } else {
                Char = "";
              }

              break;
          }
          //Char = Char.replace(/[^0-9]/g," ").toString()[0]
          this.inputData.StarPos = StarPos;
          if (Char != "" && Char != undefined) {
            if (StarPos < 4) {
              this.inputData[objname][StarPos] = Char;
            }

            if (newValue.keyCode === 8 || newValue.keyCode === 46) {
              for (let i = StarPos; i < 4; i++) {
                if (i == 3) {
                  this.inputData[objname][3] = " ";
                } else {
                  this.inputData[objname][i] = this.inputData[objname][i + 1];
                }
              }
            }

            for (let i = 0; i < EndPos - StarPos - 1; i++) {
              this.inputData[objname][StarPos + i + 1] = " ";
            }
          }
        }*/
      },
      deep: true,
    },
  },
  computed: {
    dateValue: {
      get() {
        //   let tmp = this.inputValue + "        "
        //   tmp = tmp.substr(0,4) + '/' + tmp.substr(5,2) + '/' + tmp.substr(7,2)
        //   this.inputValue = tmp
        return this.inputValue;
      },
      set(value) {
        value = value.replace(/[^0-9]/g, "");

        if (this.isDel) {
          if (this.$refs.input.selectionStart === 8) {
            this.selectionStart = 8;
            value = value.substr(0, value.length) + " ";
          }
          //console.log(this.$refs.input.selectionStart)
        }
        if (this.isBack) {
          //          console.log(this.$refs.input.selectionStart);
          switch (this.$refs.input.selectionStart) {
            case 8:
              value =
                value.substr(0, 4) +
                value.substr(4, 2) +
                " " +
                value.substr(6, 1);
              this.selectionStart = 8;
              break;
            case 7:
              value =
                value.substr(0, 4) +
                value.substr(4, 1) +
                " " +
                value.substr(5, 2);
              this.selectionStart = 6;
              break;
            case 6:
              value =
                value.substr(0, 4) +
                value.substr(4, 1) +
                " " +
                value.substr(5, 2);
              this.selectionStart = 6;
              break;
            case 5:
              value =
                value.substr(0, 4) +
                " " +
                value.substr(4, 1) +
                value.substr(5, 2);
              this.selectionStart = 5;
              break;
            default:
              break;
          }
        }
        //console.log(value)
        value = value + "        ";
        value =
          value.substr(0, 4) +
          "/" +
          value.substr(4, 2) +
          "/" +
          value.substr(6, 2);
        this.inputValue = value;
      },
    },
  },
  mounted() {
    //this.$refs.input.focus()
    this.$refs.input.value = "    /  /  ";
    //this.$refs.input.focus();
    this.$refs.input.selectionStart = 0;
    this.$refs.input.selectionEnd = 0;
    this.inputValue2 = "    /  /  ";
    this.dateValue = "   /  /  ";

    this.$refs.input2.selectionStart = 0;
    this.$refs.input2.selectionEnd = 0;
    this.$refs.input2.focus();
  },
};
</script>

<style>
</style>