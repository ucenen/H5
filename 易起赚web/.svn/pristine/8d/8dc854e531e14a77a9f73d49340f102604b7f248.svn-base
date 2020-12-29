<template>
    <div class="categoryManagement">
        <div class="contain-mod">
            <div class="tree-mod">
                <el-tree
                        :data="data"
                        node-key="id"
                        default-expand-all
                        :expand-on-click-node="false">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                  <em class="add-btn" @click="() => append(data)"></em>
                  <em class="del-btn" @click="() => remove(node, data)"></em>
                  <em class="change-btn"></em>
                </span>
              </span>
                </el-tree>
            </div>
        </div>
        <!--loading-->
        <transition name="fade">
            <div class="loading-container" v-show="loadingShow">
                <loading :loadingText="loadingText"></loading>
            </div>
        </transition>
        <footerbar/>
        <el-dialog title="修改类目"
                   class="minW"
                   :visible.sync="serachBoxShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <el-form :model="form">
                <el-form-item size="small" label="*名称：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item size="small" label="*上级分类：" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择活动区域" style="width: 100%">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="small" label="*排序号：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item size="small" label="类目描述：" :label-width="formLabelWidth">
                    <el-input
                            type="textarea"
                            :rows="3"
                            placeholder="请输入内容"
                            v-model="form.name">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="serachBoxShow = false">取消</el-button>
                <el-button size="small" type="primary" @click="serachBoxShow = false">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog
                title="还原商品"
                :visible.sync="recoverShow"
                width="30%"
                :close-on-click-modal="false"
                :close-on-press-escape="false">
            <span>是否要将本商品进行还原？</span>
            <span slot="footer" class="dialog-footer">
                    <el-button size="small" @click="recoverShow = false">取 消</el-button>
                    <el-button size="small" type="primary" @click="recoverShow = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
                title="删除商品"
                :visible.sync="delShow"
                width="30%"
                :close-on-click-modal="false"
                :close-on-press-escape="false">
            <span>是否要将本商品进行删除？</span>
            <span slot="footer" class="dialog-footer">
                    <el-button size="small" @click="delShow = false">取 消</el-button>
                    <el-button size="small" type="primary" @click="delShow = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import store from 'si-store'
    import {MyGet, MyPost} from 'common/js/request'
    import Loading from 'base/loading/loading'
    import footerbar from '../footerbar/footerbar.vue'

    let id = 1000;
    export default {
        name: 'categoryManagement',
        components: {
            Loading,
            footerbar
        },
        data() {
            const data = [
                {
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 4,
                        label: '二级 1-1',
                        children: [
                            {
                                id: 9,
                                label: '三级 1-1-1'
                            },
                            {
                                id: 10,
                                label: '三级 1-1-2'
                            }
                        ]
                    }]
                },
                {
                    id: 2,
                    label: '一级 2',
                    children: [
                        {
                            id: 5,
                            label: '二级 2-1'
                        },
                        {
                            id: 6,
                            label: '二级 2-2'
                        }
                    ]
                },
                {
                    id: 3,
                    label: '一级 3',
                    children: [
                        {
                            id: 7,
                            label: '二级 3-1'
                        },
                        {
                            id: 8,
                            label: '二级 3-2'
                        }
                    ]
                }
            ];
            return {
                loadingShow: false,
                loadingText: '正在加载中...',
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                serachBoxShow: false,//添加弹窗显示
                formLabelWidth: '120px',
                recoverShow: false,
                delShow: false,
                data: JSON.parse(JSON.stringify(data)),
            }
        },
        created() {
            this.$store.state.navTit = '商品';
            this.$store.state.navChildTit = '类目管理';
        },
        methods: {
            append(data) {
                console.log(data)
                this.serachBoxShow = true;

                /*const newChild = {id: id++, label: 'testtest', children: []};
                if (!data.children) {
                    this.$set(data, 'children', []);
                }
                data.children.push(newChild);*/
            },

            remove(node, data) {
                /*const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);*/
                console.log(node)
                console.log(data)
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .categoryManagement
        .minW .el-dialog
            width 640px
        .contain-mod
            background #fff
            overflow hidden
            padding-left 18px
            padding-right 18px
            .tree-mod
                padding 16px 0 60px 0
                .custom-tree-node
                    font-size 16px
                    line-height 16px
                    color #333
                .el-tree-node__children
                    .custom-tree-node
                        font-size 14px
                .add-btn
                    width 16px
                    height 16px
                    background url("./add-icon.png") no-repeat 0 0
                    background-size contain
                    display inline-block
                    vertical-align middle
                    margin-left 10px
                .del-btn
                    width 16px
                    height 16px
                    background url("./del-icon.png") no-repeat 0 0
                    background-size contain
                    display inline-block
                    vertical-align middle
                    margin-left 10px
                .change-btn
                    width 16px
                    height 16px
                    background url("./change-icon.png") no-repeat 0 0
                    background-size contain
                    display inline-block
                    vertical-align middle
                    margin-left 10px
</style>
