<template>
    <div>
        <div>
            <!--编辑弹出框-->
            <el-dialog
                    title="案件详情"
                    size="large"
                    :visible.sync="dialogVisible"
                    :before-close="handleClose">
                <div>
                    <div>
                        <div style="text-align: left">
                            报案类型<hr>
                            <el-form :model="form1" :inline="true">
                                <el-form-item label="案发时间:" style="width: 20%">{{form2.spare1}}</el-form-item>
                                <el-form-item label="报案类型:" style="width: 20%">{{form1.casetype}}</el-form-item>
                                <el-form-item label="案件录入人:" style="width: 20%">{{form1.spare2}}</el-form-item>
                            </el-form>
                        </div>
                        <div style="text-align: left">
                            报案人信息<hr>
                            <el-form :model="form2" :inline="true">
                                <el-form-item label="姓名:" style="width: 10%">{{form2.name}}</el-form-item>
                                <el-form-item label="性别:" style="width: 10%">{{form2.gender}}</el-form-item>
                                <el-form-item label="年龄:" style="width: 10%">{{form2.age}}</el-form-item>
                                <el-form-item label="民族:" style="width: 10%">{{form2.nation}}</el-form-item>
                                <el-form-item label="职业或身份:" style="width: 15%">{{form2.occupation}}</el-form-item>
                                <el-form-item label="证件类型:" style="width: 10%">{{form2.cardtype}}</el-form-item>
                                <el-form-item label="证件号:" style="width: 20%">{{form2.cardid}}</el-form-item>
                                <el-form-item label="文化程度:" style="width: 10%">{{form2.education}}</el-form-item>
                                <el-form-item label="年级:" style="width: 10%">{{form2.grade}}</el-form-item>
                                <el-form-item label="学院或单位:" style="width: 15%">{{form2.reportunit}}</el-form-item>
                                <el-form-item label="住址:" style="width: 15%">{{form2.address}}</el-form-item>
                                <el-form-item label="联系方式:" style="width: 15%">{{form2.contact}}</el-form-item>
                                <el-form-item label="照片:" style="width: 10%">
                                    <img :src="img1" alt="没有照片" style="width: 100px;height: 100px">
                                </el-form-item>
                            </el-form>
                        </div>
                        <div style="text-align: left" v-if="update1">
                            受害人信息<hr>
                            <el-form :model="form3" :inline="true">
                                <el-form-item label="姓名:" style="width: 10%">{{form3.name}}</el-form-item>
                                <el-form-item label="性别:" style="width: 10%">{{form3.gender}}</el-form-item>
                                <el-form-item label="年龄:" style="width: 10%">{{form3.age}}</el-form-item>
                                <el-form-item label="民族:" style="width: 10%">{{form3.nation}}</el-form-item>
                                <el-form-item label="职业或身份:" style="width: 15%">{{form3.occupation}}</el-form-item>
                                <el-form-item label="证件类型:" style="width: 10%">{{form3.cardtype}}</el-form-item>
                                <el-form-item label="证件号:" style="width: 20%">{{form3.cardid}}</el-form-item>
                                <el-form-item label="文化程度:" style="width: 10%">{{form3.education}}</el-form-item>
                                <el-form-item label="年级:" style="width: 10%">{{form3.grade}}</el-form-item>
                                <el-form-item label="学院或单位:" style="width: 15%">{{form3.reportunit}}</el-form-item>
                                <el-form-item label="住址:" style="width: 15%">{{form3.address}}</el-form-item>
                                <el-form-item label="联系方式:" style="width: 15%">{{form3.contact}}</el-form-item>
                                <el-form-item label="照片:" style="width: 10%">
                                    <img :src="img2" alt="没有照片" style="width: 100px;height: 100px">
                                </el-form-item>
                            </el-form>
                        </div>
                        <div style="text-align: left">
                            案发情况<hr>
                            <el-form :model="form4" :inline="true">
                                <el-form-item label="案发地点:" style="width: 30%">{{form4.caseaddress}}</el-form-item>
                                <el-form-item label="案发时间段:" style="width: 50%">{{form2.peroid}}</el-form-item>
                                <el-form-item label="案情:" style="width: 100%">{{form4.casedescription}}</el-form-item>
                            </el-form>
                        </div>
                        <div style="text-align: left" v-if="update2">
                            嫌疑人信息<hr>
                            <el-form :model="form5" :inline="true">
                                <el-form-item label="姓名:" style="width: 10%">{{form5.name}}</el-form-item>
                                <el-form-item label="性别:" style="width: 10%">{{form5.gender}}</el-form-item>
                                <el-form-item label="年龄:" style="width: 10%">{{form5.age}}</el-form-item>
                                <el-form-item label="民族:" style="width: 10%">{{form5.nation}}</el-form-item>
                                <el-form-item label="职业或身份:" style="width: 15%">{{form5.occupation}}</el-form-item>
                                <el-form-item label="证件类型:" style="width: 10%">{{form5.cardtype}}</el-form-item>
                                <el-form-item label="证件号:" style="width: 20%">{{form5.cardid}}</el-form-item>
                                <el-form-item label="文化程度:" style="width: 10%">{{form5.education}}</el-form-item>
                                <el-form-item label="年级:" style="width: 10%">{{form5.grade}}</el-form-item>
                                <el-form-item label="学院或单位:" style="width: 15%">{{form5.reportunit}}</el-form-item>
                                <el-form-item label="住址:" style="width: 15%">{{form5.address}}</el-form-item>
                                <el-form-item label="联系方式:" style="width: 15%">{{form5.contact}}</el-form-item>
                            </el-form>
                        </div>
                        <div style="text-align: left" v-if="update3">
                            案件证人信息<hr>
                            <el-form :model="form6" :inline="true">
                                <el-form-item label="姓名:" style="width: 10%">{{form6.name}}</el-form-item>
                                <el-form-item label="性别:" style="width: 10%">{{form6.gender}}</el-form-item>
                                <el-form-item label="年龄:" style="width: 10%">{{form6.age}}</el-form-item>
                                <el-form-item label="民族:" style="width: 10%">{{form6.nation}}</el-form-item>
                                <el-form-item label="职业或身份:" style="width: 15%">{{form6.occupation}}</el-form-item>
                                <el-form-item label="证件类型:" style="width: 10%">{{form6.cardtype}}</el-form-item>
                                <el-form-item label="证件号:" style="width: 20%">{{form6.cardid}}</el-form-item>
                                <el-form-item label="文化程度:" style="width: 10%">{{form6.education}}</el-form-item>
                                <el-form-item label="年级:" style="width: 10%">{{form6.grade}}</el-form-item>
                                <el-form-item label="学院或单位:" style="width: 15%">{{form6.reportunit}}</el-form-item>
                                <el-form-item label="住址:" style="width: 15%">{{form6.address}}</el-form-item>
                                <el-form-item label="联系方式:" style="width: 15%">{{form6.contact}}</el-form-item>
                            </el-form>
                        </div>
                        <div style="text-align: left" v-if="update4">
                            损失财物信息<hr>
                            <el-form :model="form7" :inline="true">
                                <el-form-item label="物品名称:" style="width: 10%">{{form7.lossoffinancialname}}</el-form-item>
                                <el-form-item label="所有权性质:" style="width: 20%">{{form7.natureofownership}}</el-form-item>
                                <el-form-item label="品牌:" style="width: 10%">{{form7.brand}}</el-form-item>
                                <el-form-item label="型号:" style="width: 10%">{{form7.model}}</el-form-item>
                                <el-form-item label="颜色:" style="width: 10%">{{form7.color}}</el-form-item>
                                <el-form-item label="尺寸:" style="width: 10%">{{form7.size}}</el-form-item>
                                <el-form-item label="其他特征:" style="width: 20%">{{form7.other}}</el-form-item>
                                <el-form-item label="数量:" style="width: 10%">{{form7.number}}</el-form-item>
                                <el-form-item label="购买时间:" style="width: 20%">{{form7.purchasetime}}</el-form-item>
                                <el-form-item label="购置价格:" style="width: 10%">{{form7.purchasevalue}}</el-form-item>
                                <el-form-item label="凭证照片:" style="width: 10%">
                                    <img :src="img3" alt="没有照片" style="width: 100px;height: 100px">
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
        <div style="text-align: left">
            时间:
            <el-date-picker v-model="time" type="date" placeholder="请选择日期" @change="getTime"></el-date-picker>
            <el-button type="success" style="margin: 0 20px" @click="inquire">搜索</el-button>
        </div>
        <div style="margin-top: 50px">
            <el-table :data="tableData" border>
                <el-table-column label="案件编号" align="center" prop="caseid" width="150"></el-table-column>
                <el-table-column label="报案人姓名" align="center" prop="name"></el-table-column>
                <el-table-column label="性别" align="center" prop="gender"></el-table-column>
                <el-table-column label="年龄" align="center" prop="age"></el-table-column>
                <el-table-column label="联系方式" align="center" prop="contact"></el-table-column>
                <el-table-column label="报案时间" align="center" prop="spare1" width="200"></el-table-column>
                <el-table-column label="案件类型" align="center" prop="caseType" width="300"></el-table-column>
                <el-table-column label="上报单位" align="center" prop="reportunit"></el-table-column>
                <el-table-column label="上报人员" align="center" prop="education"></el-table-column>
                <el-table-column label="状态" align="center" prop="spare3"></el-table-column>
                <el-table-column label="操作" align="center" fixed="right" width="150">
                    <template slot-scope="scope">
                        <el-button @click="lookCase(scope.row)" type="text" size="small">查看详情</el-button>
                        <el-button @click="handleClick(scope.row)" type="text" size="small">开始处理</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="text-align: center;margin-top: 20px">
            <el-pagination  @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="prev, pager, next, jumper" :total="pageCount">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                img1:'',
                img2:'',
                img3:'',
                update1:false,
                update2:false,
                update3:false,
                update4:false,
                dialogVisible:false,
                time:'',
                date:'',
                currentPage:1,
                pageCount:0,
                tableData:[],
                form1:{},
                form2:{},
                form3:{},
                form4:{},
                form5:{},
                form6:{},
                form7:{},
            }
        },
        methods: {
            getTime(val){
                //时间格式转换
                this.date = val;
                console.log(val);
            },
            inquire(){
                //查询
                if(this.time!=''){
                    this.$get(`/api/searchByTimeDealingCase/${this.currentPage}/1/${this.date}`).then(res=>{
                        console.log(res);
                        if(res.data!=''){
                            let item = res.data.items;
                            let Data = [];
                            let data = {};
                            for(let i=0;i<item.length;i++){
                                data = {
                                    caseid:item[i].setCasePeople.caseid,
                                    name:item[i].setCasePeople.name,
                                    gender:item[i].setCasePeople.gender,
                                    age:item[i].setCasePeople.age,
                                    contact:item[i].setCasePeople.contact,
                                    spare1:item[i].setCasePeople.spare1,
                                    caseType:item[i].caseType,
                                    reportunit:item[i].reportunit,
                                    education:item[i].education,
                                    spare3:item[i].spare3,
                                };
                                Data.push(data);
                            }
                            this.tableData = Data;
                            this.pageCount = res.data.totalNum;
                        }else {
                            this.tableData = [];
                        }
                    })
                }else {
                    this.load();
                }
            },
            handleClose(done){
                //关闭弹框前清空所有数据
                this.img1 = '';
                this.img2 = '';
                this.img3 = '';
                this.form1 = {};
                this.form2 = {};
                this.form3 = {};
                this.form4 = {};
                this.form5 = {};
                this.form6 = {};
                this.form7 = {};
                this.update1 = false;
                this.update2 = false;
                this.update3 = false;
                this.update4 = false;
                done();
            },
            lookCase(row){
                //查看案件详情
                this.dialogVisible = true;
                this.$get(`/api/dealingCaseId/?caseid=${row.caseid}`).then(res=>{
                    console.log(res);
                    this.form1=res.data.caseRecord;//报案类型
                    this.form4=res.data.caseRecord;//案发情况
                    if(res.data.lossoffinancial.lossoffinancialname!=null){
                        this.update4=true;
                        this.form7=res.data.lossoffinancial;//损失物品信息
                        this.img3=this.DEFINES.url+res.data.lossoffinancial.certificate;
                    }
                    let item = res.data.casePeople;
                    for(let i=0;i<item.length;i++){
                        if(item[i].sufferer==1){
                            this.form2=item[i];//报案人信息
                            this.img1=this.DEFINES.url+item[i].cardimg;
                        }else if (item[i].sufferer==2){
                            this.update1=true;
                            this.form3=item[i];//受害人信息
                            this.img2=this.DEFINES.url+item[i].cardimg;
                        }else if(item[i].sufferer==3){
                            this.update2=true;
                            this.form5=item[i];//嫌疑人信息
                        }else if(item[i].sufferer==4){
                            this.update3=true;
                            this.form6=item[i];//案件证人信息
                        }
                    }
                })
            },
            handleClick(row){
                //处理案件状态
                console.log(row);
                this.$get(`/api/changeCase?isdelete=2&caseid=${row.caseid}`).then(res=>{
                    console.log(res);
                    this.load();
                    this.$message({
                        message: '开始处理！',
                        type: 'success'
                    });
                })
            },
            load(){
                //获取案件列表
                this.$get(`/api/daelingCase/${this.currentPage}/1`).then(res=>{
                    console.log(res);
                    if(res.data!=''){
                        let item = res.data.items;
                        let Data = [];
                        let data = {};
                        for(let i=0;i<item.length;i++){
                            data = {
                                caseid:item[i].setCasePeople.caseid,
                                name:item[i].setCasePeople.name,
                                gender:item[i].setCasePeople.gender,
                                age:item[i].setCasePeople.age,
                                contact:item[i].setCasePeople.contact,
                                spare1:item[i].setCasePeople.spare1,
                                caseType:item[i].caseType,
                                reportunit:item[i].reportunit,
                                education:item[i].education,
                                spare3:item[i].spare3,
                            };
                            Data.push(data);
                        }
                        this.tableData = Data;
                        this.pageCount = res.data.totalNum;

                    }else {
                        this.tableData = [];
                    }
                })
            },
            handleCurrentChange(){
                //分页
                if(this.time!=''){
                    this.inquire(this.currentPage);
                }else {
                    this.load(this.currentPage);
                }
            }
        },
        mounted () {
            this.load();
        },
        watch: {
            tableData:function () {
                for(let i=0;i<this.tableData.length;i++){
                    if(this.tableData[i].gender==0){
                        this.tableData[i].gender = '男'
                    }else {
                        this.tableData[i].gender = '女'
                    }
                }
            }
        }
    }
</script>
<style scoped>
    .el-form-item{
        color: red;
    }
</style>

