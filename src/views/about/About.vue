<template>
  <div class="about">
    <el-button type="success" @click="addItem('add')">新增</el-button>
    <el-table :data="movieList">
      <el-table-column prop="name" label="电影名字"></el-table-column>
      <el-table-column prop="publish" label="上线日期">
        <template slot-scope="scope">
          <span>{{scope.row.publish | dateFormat}}</span>
        </template>
      </el-table-column>
      <el-table-column label="资源网站">
        <template slot-scope="scope">
          <span v-for="(item, index) in scope.row.source" :key="index+'_source'">{{item.source}}&nbsp;</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="modifyItem(scope.row, 'edit')">修改</el-button>
          <el-button type="danger" @click="deleteItem(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="(dialogStatus == 'add' ? '新增':'修改')+'电影'"
      :close-on-click-modal="false"
      :visible.sync="isShowDialog">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
          <el-form-item label="电影名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="别名" prop="alias">
            <el-input v-model="form.alias" placeholder="多个别名用英文逗号(,)隔开"></el-input>
          </el-form-item>
          <el-form-item label="上映日期" prop="publish">
            <el-date-picker
              v-model="form.publish"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="来源" prop="source">
                <el-select v-model="form.source" placeholder="请选择" multiple >
                  <el-option
                    v-for="item in sourceOptions"
                    :key="item.source"
                    :label="item.source"
                    :value="item.source">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label-width="0" prop="swfLink">
                <el-input v-model="form.swfLink" @input="iptLink($event)"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowDialog = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue  } from 'vue-property-decorator'
import { getList, addMovie, deleteMovie, updateMovie } from '../../api/about'
import { deepClone } from '../../utils/common'

@Component({
  name: 'About',
})

export default class About extends Vue {
  private movieList: object[] = []
  private isShowDialog: boolean = false
  private dialogStatus: string = 'add'
  private form: any = {
    name: '',
    publish: '',
    alias: '',
    source: [],
    swfLink: '',
  }
  private sourceOptions: any = [{
    source: '优酷',
    link: 'http://www.youku.com',
    swfLink: 'http://player.youku.com/player.php/sid/XMTY4NzM5ODc2/v.swf',
    quality: '高清',
    version: '正片',
    lang: '汉语',
    subtitle: '中文字幕',
    }, {
    source: '搜狐',
    link: 'http://tv.sohu.com',
    swfLink: 'http://share.vrs.sohu.com/75837/v.swf&topBar=1&autoplay=false&plid=3860&pub_catecode=',
    quality: '高清',
    version: '正片',
    lang: '汉语',
    subtitle: '中文字幕',
  }]
  private rules: any = {
    name: [{required: true, trigger: 'blur', message: '请填写电影名称'}],
    alias: [{required: true, trigger: 'blur', message: '请填写电影别名'}],
    publish: [{required: true, trigger: 'blur', message: '请填写电影上映日期'}],
  }

  private getMovieList(): void {
    getList().then((res: any) => {
      this.movieList = res.data
    }).catch((err: any) => {})
  }

  private addItem(params: string): void {
    this.dialogStatus = params
    this.isShowDialog = true
    this.resetForm()
  }

  private modifyItem(data: object, params: string): void {
    this.dialogStatus = params
    this.isShowDialog = true

    this.form = Object.assign({swfLink: ''}, deepClone(data))
    const swfLinkArr: string[] = []
    this.form.source = this.form.source.map((item: any) => {
      swfLinkArr.push(item.swfLink)
      return item.source
    })
    this.form.swfLink = swfLinkArr.join(',')
    this.form.alias = this.form.alias.join(',')
  }

  private deleteItem(data: object): void {
    const dataObj: object = {
      id: data._id,
    }
    deleteMovie(dataObj).then((res: any) => {
      this.$message.success(res.message)
      this.getMovieList()
    })
  }

  private iptLink(e): void {
    console.log(e)
  }

  private submit(): void {
    this.$refs.form.validate((valid: boolean) => {
      if (valid) {
        this.save()
      }
    })
  }
  private save(): void {
    this.form.publish = '' + this.form.publish
    const dataObj: any = deepClone(this.form)
    const sourceArr: object[] = []
    this.sourceOptions.forEach((element: any) => {
      if (dataObj.source.includes(element.source)) {
        sourceArr.push(Object.assign({}, element, { swfLink: this.form.swfLink }))
      }
    });
    dataObj.source = sourceArr
    dataObj.alias = dataObj.alias.split(',')
    if (this.dialogStatus === 'add') {
      addMovie(dataObj).then((res: any) => {
        this.$message.success(res.message)
        this.isShowDialog = false
        this.getMovieList()
      }).catch((err: any) => {})
    } else if (this.dialogStatus === 'edit') {
      updateMovie(dataObj).then((res: any) => {
        this.$message.success(res.message)
        this.isShowDialog = false
        this.getMovieList()
      }).catch((err: any) => {})
    }
  }
  private resetForm(): void {
    this.form = {
      name: '',
      publish: '',
      alias: '',
      source: [],
      swfLink: '',
    }
  }

  private created(): void {
    this.getMovieList()
  }
}
</script>
