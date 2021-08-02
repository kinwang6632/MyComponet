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
      @keyup="keyup2"
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
      inputChangeData: {
        year: [" ", " ", " ", " "],
        month: [" ", " "],
        day: [" ", " "],
        HH: [" ", " "],
        mm: [" ", " "],
        ss: [" ", " "],
        keyCode: -1,
        SelectionStart: 0,
        SelectionEnd: 0,
        key: "",
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
        let StarPos = newValue.SelectionStart
        let Char =  ' '        
        if (StarPos <=3) {
          switch (newValue.keyCode) {
            case 8:
              StarPos -=1;
              Char =  ' '
              break;
            case 46:
              Char = ' ';
              break;
            default:
              Char = newValue.key
              break;
            
          }
        }
          Char = Char.replace(/[^0-9]/g," ")
              console.log('Char:' + Char)              
              this.inputChangeData.year[StarPos]= Char
              
        //this.inputValue2 = this.inputChangeData.year.toString().replace(/,/g,"") + '/'
        /*
        if (startPos <= 3) {
          if (newValue.keyCode != 8 && newValue.keyCode != 46) {
            char = newValue.key;
          } else {
            if (newValue.keyCode === 8) {
              startPos -=1
            }
          }          
          year[startPos] = char;
        }
        
       // this.inputValue2 = year.toString().replace(/,/g,'') + '/' */
        
      },
      deep:true,
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