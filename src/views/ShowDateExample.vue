<template>
  <Date2 :inputMask="`yyyy/MM/dd HH:mm:ss`"></Date2>
  <Date2 :inputMask="`yyyy/MM/dd`"></Date2>
  <Date2 :inputMask="`yyyy/MM/dd HH:mm`"></Date2>
  <Date2 :inputMask="`HH:mm:ss`"></Date2>
  <Date2 :inputMask="`MM/yyyy`"></Date2>

</template>

<script>
import Date2 from './Date2.vue'
export default {
    components:{Date2},
    
}
</script>
  
<style>

</style>