<template>
  <div class="container">
    <h3>消息中心</h3>
    <el-date-picker
      v-model="value1"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Message extends Vue {
  private value1: string = ''
}
</script>

