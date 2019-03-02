<template>
    <div>
        <h3 style="text-align: left">标签管理</h3>
        <hr>
        <div style="text-align: left">
            <h4 style="text-align: left">职业或身份</h4>
            <el-form :inline="true">
                <el-form-item label="校内职业或身份">
                    <el-select v-model="inSchool" placeholder="校内职业详细">
                        <el-option
                                v-for="item in inSchools"
                                :key="item.id"
                                :label="item.value"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-input style="width: 200px;margin-right: 15px" v-model="addInSchool"
                          placeholder="新增校内职业或身份"></el-input>
                <el-button @click="addInSchool">添加</el-button>
                <el-button @click="delInSchool">删除</el-button>
            </el-form>
            <el-form :inline="true">
                <el-form-item label="校外职业或身份">
                    <el-select v-model="outSchool" placeholder="校外职业详细">
                        <el-option
                                v-for="item in outSchools"
                                :key="item.id"
                                :label="item.value"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-input style="width: 200px;margin-right: 15px" v-model="addOutSchool"
                          placeholder="新增校外职业或身份"></el-input>
                <el-button @click="addOutSchool">添加</el-button>
                <el-button @click="delOutSchool">删除</el-button>
            </el-form>
        </div>
        <div style="text-align: left">
            <h4>案发地点</h4>
            <el-form :inline="true">
                <el-form-item>
                    <el-select v-model.number="address1" placeholder="请选择">
                        <el-option
                                v-for="item in address1_s"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="showDialog('添加案发地点一级标签')">添加一级</el-button>
                    <el-button @click="delAddress_1">删除一级</el-button>
                </el-form-item>
                <el-form-item>
                    <el-select v-model.number="address2" placeholder="详细目录">
                        <el-option
                                v-for="item in address2_s"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="showDialog('添加案发地点二级标签')">添加二级</el-button>
                    <el-button @click="delAddress_2">删除二级</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div style="text-align: left">
            <h4>案件类型</h4>
            <el-form :inline="true">
                <el-form-item>
                    <el-select v-model="type1" placeholder="请选择">
                        <el-option
                                v-for="item in type1_s"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="showDialog('添加案件类型一级标签')">添加一级</el-button>
                    <el-button @click="delType_1">删除一级</el-button>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="type2" placeholder="详细目录">
                        <el-option
                                v-for="item in type2_s"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="showDialog('添加案件类型二级标签')">添加二级</el-button>
                    <el-button @click="delType_2">删除二级</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-dialog
                :title="dialogTitle"
                :visible.sync="dialogVisible">
            <div>
                <el-input v-model="add" placeholder="请输入标签名称"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="AddSure">确 定</el-button>
                </span>
        </el-dialog>
    </div>
</template>
<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                inSchool: '',  //校内职业或身份
                inSchools: [],
                addInSchool: '',

                outSchool: '', //校外职业或身份
                outSchools: [],
                addOutSchool: '',

                address1: '',
                address1_s: [],// 案发地点一级标签
                address2: '',
                address2_s: [],// 案发地点二级标签

                type1: '',
                type1_s: [],  //案件类型一级标签
                type2: '',
                type2_s: [],   //案件类型二级标签

                dialogVisible: false,//添加标签弹窗是否展示
                dialogTitle: '',     //添加标签弹窗标题
                add: '',
            }
        },
        methods: {
            getList(res) {
                //案发地点，案件类型，职业，发送请求之后取得返回值整理数据结构
                let length = res.data.length;
                let array_1 = [];
                let array_2 = [];
                for (let i = 0; i < length; i++) {
                    if (res.data[i].is_parent) {
                        array_1.push({
                            id: res.data[i].id,
                            name: res.data[i].name,
                            children: [],
                        })
                    } else {
                        array_2.push({
                            id: res.data[i].id,
                            name: res.data[i].name,
                            parent: res.data[i].parent
                        })
                    }
                }
                let length_1 = array_1.length;
                let length_2 = array_2.length;

                for (let i = 0; i < length_2; i++) {
                    for (let j = 0; j < length_1; j++) {
                        if (array_1[j].id === array_2[i].parent) {
                            array_1[j].children.push(array_2[i]);
                        }
                    }
                }
                return array_1;
            },
            casePosition() {
                //获取案发地点
                let instance = axios.create({
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                });
                instance.get("http://120.79.137.221:801/api/v1/address/")
                    .then((res) => {
                        this.address1_s = this.getList(res);
                    })
                    .catch((err) => {

                    });
            },
            caseType() {
                //获取案件类型
                let instance = axios.create({
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                });
                instance.get("http://120.79.137.221:801/api/v1/casetype/")
                    .then((res) => {
                        this.type1_s = this.getList(res);
                    })
                    .catch((err) => {

                    });
            },
            profession() {
                //获取职业或者身份
                let instance = axios.create({
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                });
                instance.get("http://120.79.137.221:801/api/v1/profession/")
                    .then(function (res) {

                    })
                    .catch(function (err) {

                    });
            },

            addInSchool() {
                //添加校内职业
                if (this.identitySchool != '') {
                    let qs = require('qs');
                    let instance = axios.create({
                        headers: {'content-type': 'application/x-www-form-urlencoded'}
                    });
                    let data = qs.stringify({
                        "name": this.identitySchool,
                        "is_parent": true,
                    });
                    instance.get("http://120.79.137.221:801/api/v1/profession/")
                        .then(function (res) {

                        })
                        .catch(function (err) {

                        });

                }
                //     this.$get(`/api/addOccupation/?occupationName=${this.identitySchool}&aid=1`).then(res => {
                //         console.log(res);
                //         this.identitySchool = '';
                //         this.caseType();
                //         this.$message({
                //             message: '添加成功！',
                //             type: 'success'
                //         });
                //     })
                // } else {
                //     this.$message('请输入校内职业或身份！');
                // }
            },
            delInSchool() {
                //删除校内职业
                if (this.professionSchool != '') {
                    this.$confirm('此操作将删除选择的校内职业, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$get(`/api/deletePro?caseTypeLevel=2&id=${this.professionSchool}`).then(res => {
                            if (res && res.data.status === 1) {
                                this.professionSchool = ''
                                this.caseType()
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });

                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '删除失败!'
                                });
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                } else {
                    this.$message('请选择要删除的校内职业！');
                }
            },
            addOutSchool() {
                //增加校外职业
                if (this.identityExternals != '') {
                    this.$get(`/api/addOccupation/?occupationName=${this.identityExternals}&aid=2`).then(res => {
                        console.log(res)
                        this.identityExternals = ''
                        this.caseType()
                        this.$message({
                            message: '添加成功！',
                            type: 'success'
                        });
                    })
                } else {
                    this.$message('请输入校外职业或身份！')
                }
            },
            delOutSchool() {
                // 删除校外职业
                if (this.professionExternal != '') {
                    this.$confirm('此操作将删除选择的校外职业, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$get(`/api/deletePro?caseTypeLevel=2&id=${this.professionExternal}`).then(res => {
                            if (res && res.data.status === 1) {
                                this.professionExternal = ''
                                this.caseType()
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '删除失败!'
                                });
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                } else {
                    this.$message('请选择要删除的校外职业！');
                }
            },

            showDialog(str) {
                //显示添加标签弹窗，并设置当前弹窗题目
                if (str === "添加案发地点一级标签" || str === "添加案件类型一级标签" || (str === "添加案发地点二级标签" && this.address1 !== '') || (str === "添加案件类型二级标签" && this.type1 !== '')) {
                    this.dialogVisible = true;
                    this.dialogTitle = str;
                } else if ((str === "添加案发地点二级标签" && this.address1 === '') || (str === "添加案件类型二级标签" && this.type1 === '')) {
                    this.$message('请选择添加目录！');
                }

            },
            AddSure() {
                //根据添加标签弹窗题目的不同，调用不同的方法
                if (this.add === '') {
                    this.$message('请选择输入标签名称！');
                    return
                }
                if (this.dialogTitle === "添加案发地点一级标签") {
                    this.AddFirst('address');
                } else if (this.dialogTitle === "添加案发地点二级标签") {
                    this.AddSecond('address');
                } else if (this.dialogTitle === "添加案件类型一级标签") {
                    this.AddFirst('casetype');
                } else if (this.dialogTitle === "添加案件类型二级标签") {
                    this.AddSecond('casetype');
                }
            },
            AddFirst(site) {
                //添加一级标签，根据site区分是给哪个模块加（职业、案发地点、案件类型）
                let qs = require('qs');
                let instance = axios.create({
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                });
                let data = qs.stringify({
                    "name": this.add,
                    "is_parent": true,
                });
                instance.post("http://120.79.137.221:801/api/v1/" + site + "/", data)
                    .then((res) => {
                        this.dialogVisible = false;
                        this.add = '';
                        this.AddRefresh(site);
                        this.$message({
                            message: '添加成功！',
                            type: 'success'
                        })
                    })
                    .catch((err) => {

                    });
            },
            AddSecond(site) {
                //添加二级标签，根据site区分是给哪个模块加（职业、案发地点、案件类型）
                let parent = (site === 'address') ? this.address1 : this.type1;
                let qs = require('qs');
                let instance = axios.create({
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                });
                let data = qs.stringify({
                    "name": this.add,
                    "parent": parent,
                    "is_parent": false,
                });
                instance.post("http://120.79.137.221:801/api/v1/address/", data)
                    .then((res) => {
                        this.dialogVisible = false;
                        this.add = '';
                        this.AddRefresh(site);
                        this.$message({
                            message: '添加成功！',
                            type: 'success'
                        });
                    })
                    .catch(function (err) {

                    });
            },
            AddRefresh(site) {
                //添加或者删除成功后，重新请求数据
                if (site === 'address') {
                    this.casePosition();
                    this.address1 = '';
                    this.address2 = '';
                } else if (site === 'casetype') {
                    this.caseType();
                    this.type1 = '';
                    this.type2 = '';
                }
            },

            delAddress_1() {
                if (this.address1 !== '') {
                    this.$confirm('此操作将删除选择的一级案发地点, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let instance = axios.create({
                            headers: {'content-type': 'application/x-www-form-urlencoded'}
                        });
                        axios.delete("http://120.79.137.221:801/api/v1/address/" + this.address1)
                            .then((res) => {
                                this.casePosition();
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            })
                            .catch((err) => {

                            });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                } else {
                    this.$message('请选择要删除的一级案发地点！');
                }
            },
            delAddress_2() {
                if (this.Size2 != '') {
                    this.$confirm('此操作将删除选择的二级案发地点, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let qs = require('qs');
                        let instance = axios.create({
                            headers: {'content-type': 'application/x-www-form-urlencoded'}
                        });
                        let data = qs.stringify({
                            "name": this.Name3,
                            "is_parent": true
                        });
                        instance.delete("http://120.79.137.221:801/api/v1/address/2")
                            .then(function (res) {

                            })
                            .catch(function (err) {

                            });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                } else {
                    this.$message('请选择要删除的二级案发地点！');
                }
            },
            delType_1() {
                if (this.Type1 != '') {
                    this.$confirm('此操作将删除选择的一级案件类型, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let qs = require('qs');
                        let instance = axios.create({
                            headers: {'content-type': 'application/x-www-form-urlencoded'}
                        });
                        let data = qs.stringify({
                            "name": this.Name3,
                            "is_parent": true
                        });
                        instance.delete("http://120.79.137.221:801/api/v1/casetype/1")
                            .then(function (res) {

                            })
                            .catch(function (err) {

                            });
                        // this.$get(`/api/deleteType?caseTypeLevel=1&id=${this.Type1}`).then(res => {
                        //     if (res && res.data.status === 1) {
                        //         this.Type1 = ''
                        //         this.Type2 = ''
                        //         this.Type2s = []
                        //         this.caseType()
                        //         this.$message({
                        //             type: 'success',
                        //             message: '删除成功!'
                        //         });
                        //
                        //     } else {
                        //         this.$message({
                        //             type: 'error',
                        //             message: '删除失败!'
                        //         });
                        //     }
                        // })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                } else {
                    this.$message('请选择要删除的一级案件类型！');
                }
            },
            delType_2() {
                if (this.Type2 != '') {
                    this.$confirm('此操作将删除选择的二级案件类型, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let qs = require('qs');
                        let instance = axios.create({
                            headers: {'content-type': 'application/x-www-form-urlencoded'}
                        });
                        let data = qs.stringify({
                            "name": this.Name3,
                            "is_parent": true
                        });
                        instance.delete("http://120.79.137.221:801/api/v1/casetype/1")
                            .then(function (res) {

                            })
                            .catch(function (err) {

                            });
                        // this.$get(`/api/deleteType?caseTypeLevel=2&id=${this.Type2}`).then(res => {
                        //     if (res && res.data.status === 1) {
                        //         this.Type1 = ''
                        //         this.Type2 = ''
                        //         this.Type2s = []
                        //         this.caseType()
                        //         this.$message({
                        //             type: 'success',
                        //             message: '删除成功!'
                        //         });
                        //
                        //     } else {
                        //         this.$message({
                        //             type: 'error',
                        //             message: '删除失败!'
                        //         });
                        //     }
                        // })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                } else {
                    this.$message('请选择要删除的二级案件类型！');
                }
            },
        },
        mounted: function () {
            this.caseType();
            this.casePosition();
            this.profession();
        },
        watch: {
            address1: function (val, old) {
                let length = this.address1_s.length;
                for (let i = 0; i < length; i++) {
                    if (this.address1_s[i].id === this.address1) {
                        this.address2_s = this.address1_s[i].children;
                    }
                }
            },
            type1: function (val, old) {
                let length = this.type1_s.length;
                for (let i = 0; i < length; i++) {
                    if (this.type1_s[i].id === this.type1) {
                        this.type2_s = this.type1_s[i].children;
                    }
                }
            }
        }
    }
</script>
<style scoped>

</style>

