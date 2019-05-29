<template>
  <div class="container">
    <h3>新闻大事件</h3>

    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator'
@Component
export default class News extends Vue {
  public dialogImageUrl: string = ''
  public dialogVisible: boolean = false
  private handlePictureCardPreview(file: any) {
    this.dialogImageUrl = file.url;
    this.dialogVisible = true;
  }
  private handleRemove(file: any, fileList: object[]) {
    console.log(file, fileList)
  }
}
</script>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

