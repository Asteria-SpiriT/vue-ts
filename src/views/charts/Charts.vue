<template>
  <div class="container">
    <h3>图表统计中心</h3>
    
    <div class="rich-editor">
      <editor :initial-value="EditorContent" @onChange="onChangeHandler" id="tinyMce" :init="editorInit"></editor>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator'
import tinymce from 'tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/modern/theme'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'

@Component({
  components: {
    Editor,
  },
})
export default class Charts extends Vue {
  private EditorContent: any = ''
  private editorInit: any = {
    language_url: './tinymce/zh_CN.js',
    language: 'zh_CN',
    selector: 'textarea',
    skin_url: './tinymce/skins/lightgray',
    height: 300,
    // width:600,
    images_upload_url: 'https://api.uat.iyuedian.com/iyd-imall-manage/imall/v1/upload',
    plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
    toolbar: 'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
    images_upload_handler: (blobInfo: any, success: any, failure: any) => {
        let xhr: any
        let formData: any
        xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.open('POST', this.$store.state.imgUrl);
        xhr.onload = () => {
            if (xhr.status < 200 || xhr.status >= 300) {
                failure(xhr.status);
                return;
            }
            const json: any = JSON.parse(xhr.responseText);
            if ( json.code === 0) {
                success(json.data[0].newFileName);
            } else {
                failure('HTTP Error: ' + json.msg);
            }
        };
        formData = new FormData();
        formData.append('file', blobInfo.blob(), blobInfo.filename());
        xhr.send(formData);
    },
  }
  private onChangeHandler(res: any, index: any, tag: any) {
    // width height小程序不支持这个把这个替换了
    let html = res.level.content.replace('width', 'xxx')
    html = html.replace('height', 'height')
    this.$emit('update:EditorContent', html)
  }

  private created(): void {
    tinymce.init({})
  }
}
</script>
