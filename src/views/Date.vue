<template>
  <div>
    <input
      type="text"
      ref="input"
      v-model="dateValue"
      @input="change"
      @keydown="keydown"
    />
    <input type="text" ref="input2" v-model="inputValue2" >
  </div>
</template>

<script>
//import {ref} from 'vue'
export default {
  data() {
    return {
      inputValue: "",
      inputValue2:"",
      selectionStart: 0,
      selectionEnd: 0,
      isBack: false,
      isDel: false,
      year : [' ',' ', ' ', ' '],
      month : [' ', ' '],
      day : [' ', ' '],
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
          this.isDel = true
        }
      }
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
            this.selectionStart = 8
            value = value.substr(0,value.length)+ ' '
          }
          //console.log(this.$refs.input.selectionStart)
        }
        if (this.isBack) {
          console.log(this.$refs.input.selectionStart)
          switch (this.$refs.input.selectionStart) {
            case 8:              
              value = value.substr(0,4) + value.substr(4,2) + ' ' +  value.substr(6,1)
              this.selectionStart = 8
              break;
            case 7:              
              value = value.substr(0,4) + value.substr(4,1) + ' ' + value.substr(5,2)
              this.selectionStart = 6
              break;
            case 6:
              value = value.substr(0,4) + value.substr(4,1) + ' ' + value.substr(5,2)
              this.selectionStart = 6
              break;
            case 5:
              
              value = value.substr(0,4) + ' ' + value.substr(4,1) + value.substr(5,2)
              this.selectionStart = 5
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
    this.$refs.input.focus();
    this.$refs.input.selectionStart = 0;
    this.$refs.input.selectionEnd = 0;
    this.inputValue2 = "   /  /  "
    this.dateValue = "   /  /  "
  },
};
</script>

<style>
</style>