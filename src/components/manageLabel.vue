<template>
    <div>
        <h3 style="text-align: left">标签管理</h3>
        <hr>
        <div style="text-align: left">
            <h4 style="text-align: left">职业或身份</h4>
            <el-form :inline="true">
                <el-form-item label="校内职业或身份">
                    <el-select v-model.number="inSchool" placeholder="校内职业详细">
                        <el-option
                                v-for="item in inSchools"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-input style="width: 200px;margin-right: 15px" v-model="addInSchool"
                          placeholder="新增校内职业或身份"></el-input>
                <el-button @click="addIn_School">添加</el-button>
                <el-button @click="delIn_School">删除</el-button>
            </el-form>
            <el-form :inline="true">
                <el-form-item label="校外职业或身份">
                    <el-select v-model.number="outSchool" placeholder="校外职业详细">
                        <el-option
                                v-for="item in outSchools"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-input style="width: 200px;margin-right: 15px" v-model="addOutSchool"
                          placeholder="新增校外职业或身份"></el-input>
                <el-button @click="addOut_School">添加</el-button>
                <el-button @click="delOut_School">删除</el-button>
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
                    <el-select v-model.number="type1" placeholder="请选择">
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
                    <el-select v-model.number="type2" placeholder="详细目录">
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
                //案发地点，案件类型,发送请求之后取得返回值整理数据结构
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
                        this.fail('获取案发地点失败！');
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
                        this.fail('获取案件类型失败！');
                    });
            },
            profession() {
                //获取职业或者身份
                let instance = axios.create({
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                });
                instance.get("http://120.79.137.221:801/api/v1/profession/")
                    .then((res) => {
                        let length = res.data.length;
                        let array_1 = [];
                        let array_2 = [];
                        for (let i = 0; i < length; i++) {
                            if (res.data[i].in_school) {
                                array_1.push({
                                    id: res.data[i].id,
                                    name: res.data[i].name,
                                })
                            } else {
                                array_2.push({
                                    id: res.data[i].id,
                                    name: res.data[i].name,
                                })
                            }
                        }
                        this.inSchools = array_1;
                        this.outSchools = array_2;
                    })
                    .catch((err) => {
                        this.fail('获取职业或身份失败！');
                    });
            },

            addProfession(str) {
                //添加校内或者校外职业，根据传入的字符串进行区分
                let name = (str === 'inSchool') ? this.addInSchool : this.addOutSchool;
                let in_school = (str === 'inSchool') ? 'True' : 'False';

                let qs = require('qs');
                let instance = axios.create({
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                });
                let data = qs.stringify({
                    "name": name,
                    "in_school": in_school,
                });
                instance.post("http://120.79.137.221:801/api/v1/profession/", data)
                    .then((res) => {
                        this.Refresh('profession');
                        this.success('添加成功！');
                    })
                    .catch((err) => {
                        this.Refresh('profession');
                        this.fail('添加失败！');
                    });
            },
            delProfession(str) {
                //删除校内或者校外职业，根据传入的字符串进行区分
                let name = (str === 'inSchool') ? '校内' : '校外';
                let in_school = (str === 'inSchool') ? this.inSchool : this.outSchool;

                this.$confirm('此操作将删除选择的' + name + '职业, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let instance = axios.create({
                        headers: {'content-type': 'application/x-www-form-urlencoded'}
                    });
                    instance.delete("http://120.79.137.221:801/api/v1/profession/" + in_school + "/")
                        .then((res) => {
                            this.Refresh('profession');
                            this.success('删除成功！');
                        })
                        .catch((err) => {
                            this.Refresh('profession');
                            this.fail('删除失败！');
                        });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            addIn_School() {
                //添加校内职业
                if (this.addInSchool !== '') {
                    this.addProfession('inSchool');
                } else {
                    this.$message('请输入校内职业或身份！');
                }
            },
            delIn_School() {
                //删除校内职业
                if (this.inSchool !== '') {
                    this.delProfession('inSchool');
                } else {
                    this.$message('请选择要删除的校内职业！');
                }
            },
            addOut_School() {
                //增加校外职业
                if (this.addOutSchool !== '') {
                    this.addProfession('outSchool');
                } else {
                    this.$message('请输入校外职业或身份！');
                }
            },
            delOut_School() {
                // 删除校外职业
                if (this.outSchool !== '') {
                    this.delProfession('outSchool');
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
                //根据添加标签弹窗题目的不同，调用不同的添加方法
                if (this.add === '') {
                    this.$message('请选择输入标签名称！');
                    return
                }
                if (this.dialogTitle === "添加案发地点一级标签") {
                    this.addAddressType('address', 1);
                } else if (this.dialogTitle === "添加案发地点二级标签") {
                    this.addAddressType('address', 2);
                } else if (this.dialogTitle === "添加案件类型一级标签") {
                    this.addAddressType('casetype', 1);
                } else if (this.dialogTitle === "添加案件类型二级标签") {
                    this.addAddressType('casetype', 2);
                }
            },
            addAddressType(site, num) {
                //添加一级、二级，案发地点、案件类型，根据传入的参数判断
                let data = {};
                let qs = require('qs');
                let instance = axios.create({
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                });
                if (num === 1) {
                    data = qs.stringify({
                        "name": this.add,
                        "is_parent": true,
                    });
                } else if (num === 2) {
                    let parent = (site === 'address') ? this.address1 : this.type1;
                    data = qs.stringify({
                        "name": this.add,
                        "parent": parent,
                        "is_parent": false,
                    });
                }
                instance.post("http://120.79.137.221:801/api/v1/" + site + '/', data)
                    .then((res) => {
                        this.dialogVisible = false;
                        this.add = '';
                        this.Refresh(site);
                        this.success('添加成功！');
                    })
                    .catch(function (err) {
                        this.dialogVisible = false;
                        this.add = '';
                        this.Refresh(site);
                        this.fail('添加失败！');
                    });
            },

            delAddressType(str, num) {
                //删除一级、二级，案发地点、案件类型，根据传入的参数判断
                let level = (num === 1) ? '一级' : '二级';
                let name = (str === 'address') ? '案发地点' : '案件类型';
                let id = '';
                if (str === 'address') {
                    if (num === 1) {
                        id = this.address1
                    } else if (num === 2) {
                        id = this.address2
                    }
                } else if (str === 'casetype') {
                    if (num === 1) {
                        id = this.type1
                    } else if (num === 2) {
                        id = this.type2
                    }
                }
                this.$confirm('此操作将删除选择的' + level + name + ', 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let instance = axios.create({
                        headers: {'content-type': 'application/x-www-form-urlencoded'}
                    });
                    instance.delete("http://120.79.137.221:801/api/v1/" + str + "/" + id + "/")
                        .then((res) => {
                            this.Refresh(str);
                            this.success('删除成功！');
                        })
                        .catch((err) => {
                            this.Refresh(str);
                            this.fail('删除失败！');
                        });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            delAddress_1() {
                //删除一级案发地点
                if (this.address1 !== '') {
                    this.delAddressType('address', 1);
                } else {
                    this.$message('请选择要删除的一级案发地点！');
                }
            },
            delAddress_2() {
                //删除二级案发地点
                if (this.address2 !== '') {
                    this.delAddressType('address', 2);
                } else {
                    this.$message('请选择要删除的二级案发地点！');
                }
            },
            delType_1() {
                //删除一级案件类型
                if (this.type1 !== '') {
                    this.delAddressType('casetype', 1);
                } else {
                    this.$message('请选择要删除的一级案件类型！');
                }
            },
            delType_2() {
                //删除二级案件类型
                if (this.type2 !== '') {
                    this.delAddressType('casetype', 2);
                } else {
                    this.$message('请选择要删除的二级案件类型！');
                }
            },

            Refresh(site) {
                //添加或者删除成功后，重新请求数据
                if (site === 'address') {
                    this.address1 = '';
                    this.address1_s = [];
                    this.address2 = '';
                    this.address2_s = [];
                    this.casePosition();
                } else if (site === 'casetype') {
                    this.type1 = '';
                    this.type1_s = [];
                    this.type2 = '';
                    this.type2_s = [];
                    this.caseType();
                } else if (site === 'profession') {
                    this.inSchool = '';
                    this.inSchools = [];
                    this.addInSchool = '';
                    this.outSchool = '';
                    this.outSchools = [];
                    this.addOutSchool = '';
                    this.profession();
                }
            },
            success(str) {
                this.$message({
                    message: str,
                    type: 'success'
                })
            },
            fail(str) {
                this.$message({
                    message: str,
                    type: 'error'
                })
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

