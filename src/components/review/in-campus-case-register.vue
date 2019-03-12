<template>
    <div>
        <!--案件详细信息-->
        <div class="print">
            <div style="text-align: left">
                报案类型
                <hr>
                <el-form :inline="true">
                    <el-form-item label="登记时间:" style="width: 40%">{{caseInformation.caseTime}}</el-form-item>
                    <el-form-item label="报案类型:" style="width: 40%">{{print_caseType}}</el-form-item>
                </el-form>
            </div>
            <div style="text-align: left">
                报案人信息
                <hr>
                <el-form :inline="true">
                    <el-form-item label="姓名:" style="width: 30%">{{reporter.name}}</el-form-item>
                    <el-form-item label="性别:" style="width: 30%">{{reporter.gender?'男':'女'}}</el-form-item>
                    <el-form-item label="年龄:" style="width: 30%">{{reporter.age}}</el-form-item>
                    <el-form-item label="民族:" style="width: 30%">{{reporter.nation}}</el-form-item>
                    <el-form-item label="职业或身份:" style="width: 30%">{{reporter.profession}}</el-form-item>
                    <el-form-item label="证件类型:" style="width: 30%">{{reporter.identity_document}}</el-form-item>
                    <el-form-item label="证件号:" style="width: 30%">{{reporter.identity_number}}</el-form-item>
                    <el-form-item label="文化程度:" style="width: 30%">{{reporter.education}}</el-form-item>
                    <el-form-item label="年级:" style="width: 30%">{{reporter.grade}}</el-form-item>
                    <el-form-item label="学院或单位:" style="width: 30%">{{reporter.work_place}}</el-form-item>
                    <el-form-item label="联系方式:" style="width: 30%">{{reporter.phone}}</el-form-item>
                    <el-form-item label="住址:" style="width: 100%">{{reporter.home_addr}}</el-form-item>
                </el-form>
            </div>
            <div v-if="!show_suffer" style="text-align: left;margin-bottom:25px;">报案人与受害者为同一人</div>
            <div style="text-align: left" v-if="show_suffer">
                受害人信息
                <hr>
                <el-form :inline="true">
                    <el-form-item label="姓名:" style="width: 30%">{{sufferer.name}}</el-form-item>
                    <el-form-item label="性别:" style="width: 30%">{{sufferer.gender?'男':'女'}}</el-form-item>
                    <el-form-item label="年龄:" style="width: 30%">{{sufferer.age}}</el-form-item>
                    <el-form-item label="民族:" style="width: 30%">{{sufferer.nation}}</el-form-item>
                    <el-form-item label="职业或身份:" style="width: 30%">{{sufferer.profession}}</el-form-item>
                    <el-form-item label="证件类型:" style="width: 30%">{{sufferer.identity_document}}</el-form-item>
                    <el-form-item label="证件号:" style="width: 30%">{{sufferer.identity_number}}</el-form-item>
                    <el-form-item label="文化程度:" style="width: 30%">{{sufferer.education}}</el-form-item>
                    <el-form-item label="年级:" style="width: 30%">{{sufferer.grade}}</el-form-item>
                    <el-form-item label="学院或单位:" style="width: 30%">{{sufferer.work_place}}</el-form-item>
                    <el-form-item label="联系方式:" style="width: 30%">{{sufferer.phone}}</el-form-item>
                    <el-form-item label="住址:" style="width: 100%">{{sufferer.home_addr}}</el-form-item>
                </el-form>
            </div>
            <div style="text-align: left">
                案发情况
                <hr>
                <el-form :inline="true">
                    <el-form-item label="案发地点:" style="width: 100%">{{print_occur_place}}</el-form-item>
                    <el-form-item label="案发时间段:" style="width: 100%">
                        {{caseInformation.period[0]}}—{{caseInformation.period[1]}}
                    </el-form-item>
                    <el-form-item label="案情:" style="width: 100%">{{caseInformation.desc}}</el-form-item>
                </el-form>
            </div>
            <div style="text-align: left" v-if="show_suspect">嫌疑人信息
                <hr>
                <el-form :inline="true">
                    <el-form-item label="姓名:" style="width: 30%">{{suspect.name}}</el-form-item>
                    <el-form-item label="性别:" style="width: 30%">{{suspect.gender?'男':'女'}}</el-form-item>
                    <el-form-item label="年龄:" style="width: 30%">{{suspect.age}}</el-form-item>
                    <el-form-item label="民族:" style="width: 30%">{{suspect.nation}}</el-form-item>
                    <el-form-item label="职业或身份:" style="width: 30%">{{suspect.profession}}</el-form-item>
                    <el-form-item label="证件类型:" style="width: 30%">{{suspect.identity_document}}</el-form-item>
                    <el-form-item label="证件号:" style="width: 30%">{{suspect.identity_number}}</el-form-item>
                    <el-form-item label="文化程度:" style="width: 30%">{{suspect.education}}</el-form-item>
                    <el-form-item label="年级:" style="width: 30%">{{suspect.grade}}</el-form-item>
                    <el-form-item label="学院或单位:" style="width: 30%">{{suspect.work_place}}</el-form-item>
                    <el-form-item label="联系方式:" style="width: 30%">{{suspect.phone}}</el-form-item>
                    <el-form-item label="住址:" style="width: 100%">{{suspect.home_addr}}</el-form-item>
                </el-form>
            </div>
            <div style="text-align: left" v-if="show_witness">
                案件证人信息
                <hr>
                <el-form :inline="true">
                    <el-form-item label="姓名:" style="width: 30%">{{witness.name}}</el-form-item>
                    <el-form-item label="性别:" style="width: 30%">{{witness.gender?'男':'女'}}</el-form-item>
                    <el-form-item label="年龄:" style="width:30%">{{witness.age}}</el-form-item>
                    <el-form-item label="民族:" style="width: 30%">{{witness.nation}}</el-form-item>
                    <el-form-item label="职业或身份:" style="width: 30%">{{witness.profession}}</el-form-item>
                    <el-form-item label="证件类型:" style="width: 30%">{{witness.identity_document}}</el-form-item>
                    <el-form-item label="证件号:" style="width: 30%">{{witness.identity_number}}</el-form-item>
                    <el-form-item label="文化程度:" style="width: 30%">{{witness.education}}</el-form-item>
                    <el-form-item label="年级:" style="width: 30%">{{witness.grade}}</el-form-item>
                    <el-form-item label="学院或单位:" style="width: 30%">{{witness.work_place}}</el-form-item>
                    <el-form-item label="联系方式:" style="width: 30%">{{witness.phone}}</el-form-item>
                    <el-form-item label="住址:" style="width: 100%">{{witness.home_addr}}</el-form-item>
                </el-form>
            </div>
            <div style="text-align: left" v-if="show_loss">
                损失财物信息
                <hr>
                <el-form :inline="true">
                    <el-form-item label="物品名称:" style="width: 30%">{{loss.name}}</el-form-item>
                    <el-form-item label="所有权性质:" style="width: 30%">
                        {{loss.is_private===true?'本人所有':'非本人所有'}}
                    </el-form-item>
                    <el-form-item label="品牌:" style="width: 30%">{{loss.brand}}</el-form-item>
                    <el-form-item label="型号:" style="width: 30%">{{loss.version}}</el-form-item>
                    <el-form-item label="颜色:" style="width: 30%">{{loss.color}}</el-form-item>
                    <el-form-item label="其他特征:" style="width: 30%">{{loss.other_feature}}
                    </el-form-item>
                    <el-form-item label="数量:" style="width: 30%">{{loss.sum}}</el-form-item>
                    <el-form-item label="购置价格:" style="width: 30%">{{loss.price}}</el-form-item>
                    <el-form-item label="购买时间:" style="width: 100%">{{loss.bought_time}}</el-form-item>
                </el-form>
            </div>
            <div style="text-align: left">
                <hr>
                <el-form :inline="true">
                    <el-form-item label="是否查看监控:" style="width: 100%">{{saw_monitoring?'是':'否'}}</el-form-item>
                    <el-form-item label="是否通知公安机关等部门:" style="width: 100%">{{called_police?'是':'否'}}</el-form-item>
                </el-form>
            </div>
            <div style="text-align: left;margin-top:20px;">报案人签名：</div>
        </div>
        <div class="down">
            <div style="text-align: left;margin-top: 20px">
                <span>报案类型</span>
                <hr>
                <el-form :model="caseInformation" :rules="rules.baseInfo" ref="case_1" :inline="true">
                    <el-form-item label="登记时间" prop="caseTime">
                        <el-date-picker
                                v-model="caseInformation.caseTime"
                                type="datetime"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="报案类型" prop="caseType">
                        <el-cascader
                                expand-trigger="hover"
                                :options="caseInformation.caseTypes"
                                v-model="caseInformation.caseType"
                                placeholder="请选择报案类型">
                        </el-cascader>
                    </el-form-item>
                </el-form>
            </div>
            <div style="text-align: left;margin-top: 20px">
                <span>报案人信息</span>
                <hr>
                <el-form :model="reporter" :inline="true" :rules="rules.componentInfo" ref="case_3">
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="reporter.name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio class="radio" v-model="reporter.gender" :label=true>男</el-radio>
                        <el-radio class="radio" v-model="reporter.gender" :label=false>女</el-radio>
                    </el-form-item>
                    <el-form-item label="年龄" prop="age">
                        <el-input v-model.number="reporter.age"></el-input>
                    </el-form-item>
                    <el-form-item label="民族(国籍)">
                        <el-input v-model="reporter.nation"></el-input>
                    </el-form-item>
                    <el-form-item label="职业或身份">
                        <el-select v-model="reporter.profession" placeholder="请选择">
                            <el-option
                                    v-for="item in info.professions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="证件类型">
                        <el-select v-model="reporter.identity_document" placeholder="请选择">
                            <el-option
                                    v-for="item in info.identity_types"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="证件号">
                        <el-input v-model="reporter.identity_number"></el-input>
                    </el-form-item>
                    <el-form-item label="文化程度">
                        <el-select v-model="reporter.education" placeholder="请选择">
                            <el-option
                                    v-for="item in info.educations"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="年级">
                        <el-select v-model="reporter.grade" placeholder="请选择">
                            <el-option
                                    v-for="item in info.grades"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学院或单位">
                        <el-select v-model="reporter.work_place" placeholder="请选择">
                            <el-option
                                    v-for="item in info.work_places"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="住址">
                        <el-input v-model="reporter.home_addr"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式">
                        <el-input v-model="reporter.phone"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div style="text-align: left;margin-top: 20px">
                <span style="margin-right: 20px">报案人是否与受害人为同一人:</span>
                <el-radio class="radio" v-model="samePerson" label="1">是</el-radio>
                <el-radio class="radio" v-model="samePerson" label="0">否</el-radio>
                <div style="margin-top: 20px" v-if="show_suffer">
                    <span>受害人信息</span>
                    <hr>
                    <el-form :model="sufferer" :inline="true" :rules="rules.componentInfo" ref="case_suffer">
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="sufferer.name"></el-input>
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-radio class="radio" v-model="sufferer.gender" :label=true>男</el-radio>
                            <el-radio class="radio" v-model="sufferer.gender" :label=false>女</el-radio>
                        </el-form-item>
                        <el-form-item label="年龄" prop="age">
                            <el-input v-model.number="sufferer.age"></el-input>
                        </el-form-item>
                        <el-form-item label="民族(国籍)">
                            <el-input v-model="sufferer.nation"></el-input>
                        </el-form-item>
                        <el-form-item label="职业或身份">
                            <el-select v-model="sufferer.profession" placeholder="请选择">
                                <el-option
                                        v-for="item in info.professions"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="证件类型">
                            <el-select v-model="sufferer.identity_document" placeholder="请选择">
                                <el-option
                                        v-for="item in info.identity_types"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="证件号">
                            <el-input v-model="sufferer.identity_number"></el-input>
                        </el-form-item>
                        <el-form-item label="文化程度">
                            <el-select v-model="sufferer.education" placeholder="请选择">
                                <el-option
                                        v-for="item in info.educations"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="年级">
                            <el-select v-model="sufferer.grade" placeholder="请选择">
                                <el-option
                                        v-for="item in info.grades"
                                        :key="item.name"
                                        :label="item.name"
                                        :value="item.name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="学院或单位">
                            <el-select v-model="sufferer.work_place" placeholder="请选择">
                                <el-option
                                        v-for="item in info.work_places"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="住址">
                            <el-input v-model="sufferer.home_addr"></el-input>
                        </el-form-item>
                        <el-form-item label="联系方式">
                            <el-input v-model="sufferer.phone"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div style="margin-top: 20px;text-align: left">
                案发情况
                <hr>
                <el-form :model="caseInformation" :rules="rules.baseInfo" ref="case_2" :inline="true">
                    <el-form-item label="案发时间段" prop="period">
                        <el-date-picker
                                v-model="caseInformation.period"
                                type="datetimerange"
                                placeholder="选择时间范围">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="案发地点" prop="occur_place">
                        <el-cascader
                                expand-trigger="hover"
                                :options="caseInformation.occur_places"
                                v-model="caseInformation.occur_place"
                                placeholder="请选择报案类型">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="案情">
                        <el-input type="textarea" v-model="caseInformation.desc" :rows="5" placeholder="请输入内容"
                                  style="width: 1000px"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div style="text-align: left;margin-top: 20px">
                <span>嫌疑人信息</span>
                <hr>
                <span style="margin-right: 20px">是否有嫌疑人:</span>
                <el-radio class="radio" v-model="hasSuspect" label="1">是</el-radio>
                <el-radio class="radio" v-model="hasSuspect" label="0">否</el-radio>
                <div style="margin-top: 20px" v-if="show_suspect">
                    <el-form :model="suspect" :inline="true" :rules="rules.componentInfo" ref="case_suspect">
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="suspect.name"></el-input>
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-radio class="radio" v-model="suspect.gender" :label=true>男</el-radio>
                            <el-radio class="radio" v-model="suspect.gender" :label=false>女</el-radio>
                        </el-form-item>
                        <el-form-item label="年龄" prop="age">
                            <el-input v-model.number="suspect.age"></el-input>
                        </el-form-item>
                        <el-form-item label="民族(国籍)">
                            <el-input v-model="suspect.nation"></el-input>
                        </el-form-item>
                        <el-form-item label="职业或身份">
                            <el-select v-model="suspect.profession" placeholder="请选择">
                                <el-option
                                        v-for="item in info.professions"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="证件类型">
                            <el-select v-model="suspect.identity_document" placeholder="请选择">
                                <el-option
                                        v-for="item in info.identity_types"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="证件号">
                            <el-input v-model="suspect.identity_number"></el-input>
                        </el-form-item>
                        <el-form-item label="文化程度">
                            <el-select v-model="suspect.education" placeholder="请选择">
                                <el-option
                                        v-for="item in info.educations"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="年级">
                            <el-select v-model="suspect.grade" placeholder="请选择">
                                <el-option
                                        v-for="item in info.grades"
                                        :key="item.name"
                                        :label="item.name"
                                        :value="item.name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="学院或单位">
                            <el-select v-model="suspect.work_place" placeholder="请选择">
                                <el-option
                                        v-for="item in info.work_places"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="住址">
                            <el-input v-model="suspect.home_addr"></el-input>
                        </el-form-item>
                        <el-form-item label="联系方式">
                            <el-input v-model="suspect.phone"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div style="text-align: left;margin-top: 20px">
                <span>案件证人信息</span>
                <hr>
                <span style="margin-right: 20px">是否有案件证人:</span>
                <el-radio class="radio" v-model="hasWitness" label="1">是</el-radio>
                <el-radio class="radio" v-model="hasWitness" label="0">否</el-radio>
                <div style="margin-top: 20px" v-if="show_witness">
                    <el-form :model="witness" :inline="true" :rules="rules.componentInfo" ref="case_suspect">
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="witness.name"></el-input>
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-radio class="radio" v-model="witness.gender" :label=true>男</el-radio>
                            <el-radio class="radio" v-model="witness.gender" :label=false>女</el-radio>
                        </el-form-item>
                        <el-form-item label="年龄" prop="age">
                            <el-input v-model.number="witness.age"></el-input>
                        </el-form-item>
                        <el-form-item label="民族(国籍)">
                            <el-input v-model="witness.nation"></el-input>
                        </el-form-item>
                        <el-form-item label="职业或身份">
                            <el-select v-model="witness.profession" placeholder="请选择">
                                <el-option
                                        v-for="item in info.professions"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="证件类型">
                            <el-select v-model="witness.identity_document" placeholder="请选择">
                                <el-option
                                        v-for="item in info.identity_types"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="证件号">
                            <el-input v-model="witness.identity_number"></el-input>
                        </el-form-item>
                        <el-form-item label="文化程度">
                            <el-select v-model="witness.education" placeholder="请选择">
                                <el-option
                                        v-for="item in info.educations"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="年级">
                            <el-select v-model="witness.grade" placeholder="请选择">
                                <el-option
                                        v-for="item in info.grades"
                                        :key="item.name"
                                        :label="item.name"
                                        :value="item.name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="学院或单位">
                            <el-select v-model="witness.work_place" placeholder="请选择">
                                <el-option
                                        v-for="item in info.work_places"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="住址">
                            <el-input v-model="witness.home_addr"></el-input>
                        </el-form-item>
                        <el-form-item label="联系方式">
                            <el-input v-model="witness.phone"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div style="text-align: left;margin-top: 20px">
                <span>损失财物情况</span>
                <hr>
                <span style="margin-right: 20px">是否有损失财物:</span>
                <el-radio class="radio" v-model="has_loss" label="1">是</el-radio>
                <el-radio class="radio" v-model="has_loss" label="0">否</el-radio>
                <div style="margin-top: 20px" v-if="show_loss">
                    <el-form :model="loss" :rules="rules.lossInfo" :inline="true">
                        <el-form-item label="损失物品名称" prop="name">
                            <el-input v-model="loss.name"></el-input>
                        </el-form-item>
                        <el-form-item label="所有权性质">
                            <el-select v-model="loss.is_private" placeholder="请选择">
                                <el-option
                                        v-for="item in caseInformation.owner"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="品牌">
                            <el-input v-model="loss.brand"></el-input>
                        </el-form-item>
                        <el-form-item label="型号">
                            <el-input v-model="loss.version"></el-input>
                        </el-form-item>
                        <el-form-item label="颜色">
                            <el-input v-model="loss.color"></el-input>
                        </el-form-item>
                        <el-form-item label="其他特征">
                            <el-input v-model="loss.other_feature"></el-input>
                        </el-form-item>
                        <el-form-item label="数量">
                            <el-input v-model.number="loss.sum"></el-input>
                        </el-form-item>
                        <el-form-item label="购买时间" prop="bought_time">
                            <el-date-picker
                                    v-model="loss.bought_time"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="购置价格">
                            <el-input v-model="loss.price"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div style="text-align: left;margin-top: 20px">
                <hr>
                <span>报案人是否通知公安机关等部门:</span>
                <el-radio class="radio" v-model="called_police" :label=true>是</el-radio>
                <el-radio class="radio" v-model="called_police" :label=false>否</el-radio>
            </div>
            <div style="text-align: left;margin-top: 20px">
                <span style="margin-right: 20px">报案人是否查看监控:</span>
                <el-radio class="radio" v-model="saw_monitoring" :label=true>是</el-radio>
                <el-radio class="radio" v-model="saw_monitoring" :label=false>否</el-radio>
            </div>
            <div style="text-align: left;margin-top: 20px">
                <el-button type="success" @click="report('case_1','case_2','case_3')">报 案</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import caseDialog from '../multi/caseDialog.vue'
    import {
        mapState,
        mapMutations,
    } from 'vuex'

    export default {
        components: {caseDialog},
        props: ['msgIn'],
        data() {
            return {
                rules: {
                    baseInfo: {
                        caseTime: [
                            {required: true, message: '请填写登记时间', trigger: 'blur'}
                        ],
                        caseType: [
                            {required: true, message: '请选择报案类型', trigger: 'blur'}
                        ],
                        period: [
                            {required: true, message: '请选择案发时间段', trigger: 'blur'}
                        ],
                        occur_place: [
                            {required: true, message: '请选择案发地点', trigger: 'blur'}
                        ],
                    },
                    componentInfo: {
                        name: [
                            {required: true, message: '姓名不能为空', trigger: 'blur'}
                        ],
                        age: [
                            {type: 'number', max: 32767, message: '请填写小于32767的整数', trigger: 'blur'}
                        ]
                    },
                    lossInfo: {
                        name: [
                            {required: true, message: '姓名不能为空', trigger: 'blur'}
                        ],
                        bought_time: [
                            {required: true, message: '购买时间不能为空', trigger: 'blur'}
                        ],
                    }
                },

                caseInformation: {
                    caseTime: '',//登记时间
                    caseType: [],//案件类型
                    caseTypes: [],
                    registrant: '',//案件登记人
                    occur_place: [],//案发地点
                    occur_places: [],
                    period: [],//案发时间段
                    desc: '',//案情
                    owner: [
                        {
                            name: '本人所有',
                            value: true,
                        },
                        {
                            name: '非本人所有',
                            value: false
                        },
                    ],
                },

                reporter: { //报案人信息
                    age: null,
                    grade: null,
                    gender: true,
                    education: null,//学历
                    home_addr: "",//住址
                    identity_document: null,
                    identity_number: "",
                    name: "",
                    nation: "",
                    phone: "",
                    profession: null,//职业或者身份
                    work_place: null//学院或者单位
                },

                samePerson: '1',//报案人与受害人是否为同一人,1为是,0为否
                show_suffer: false,//是否展示受害人信息
                sufferer: {//受害人信息
                    age: null,
                    grade: null,
                    gender: true,
                    education: null,//学历
                    home_addr: "",//住址
                    identity_document: null,
                    identity_number: "",
                    name: "",
                    nation: "",
                    phone: "",
                    profession: null,//职业或者身份
                    work_place: null//学院或者单位
                },

                hasSuspect: '0',//是否有嫌疑人,1为是,0为否
                show_suspect: false,//是否展示嫌疑人信息
                suspect: {//嫌疑人信息
                    age: null,
                    grade: null,
                    gender: true,
                    education: null,//学历
                    home_addr: "",//住址
                    identity_document: null,
                    identity_number: "",
                    name: "",
                    nation: "",
                    phone: "",
                    profession: null,//职业或者身份
                    work_place: null//学院或者单位
                },

                hasWitness: '0',//是否有证人,1为是,0为否
                show_witness: false,//是否展示证人信息
                witness: {//证人信息
                    age: null,
                    grade: null,
                    gender: true,
                    education: null,//学历
                    home_addr: "",//住址
                    identity_document: null,
                    identity_number: "",
                    name: "",
                    nation: "",
                    phone: "",
                    profession: null,//职业或者身份
                    work_place: null//学院或者单位
                },

                has_loss: '0',//是否有财产损失,1为是,0为否
                show_loss: false,//是否展示财产损失信息
                loss: {
                    name: '',
                    is_private: true,
                    brand: '',
                    version: '',
                    color: '',
                    other_feature: '',
                    sum: 1,
                    bought_time: '',
                    price: '',
                },
                called_police: false,//是否通知公安机关等部门
                saw_monitoring: false,//是否查看监控
                info: {
                    professions: [],
                    identity_types: [
                        {
                            name: '护照',
                            id: 0,
                        },
                        {
                            name: '学生证',
                            id: 1,
                        },
                        {
                            name: '身份证',
                            id: 2,
                        },
                    ],
                    educations: [
                        {
                            name: '小学',
                            id: 0,
                        },
                        {
                            name: '初中',
                            id: 1,
                        },
                        {
                            name: '高中',
                            id: 2,
                        },
                        {
                            name: '专科',
                            id: 3,
                        },
                        {
                            name: '本科',
                            id: 4,
                        },
                        {
                            name: '硕士',
                            id: 5,
                        },
                        {
                            name: '博士',
                            id: 6,
                        },
                    ],
                    grades: [],
                    work_places: [],
                },
                print_caseType: '',
                print_occur_place: '',
            }
        },
        methods: {
            report(formName1, formName2, formName3) {
                // 案件录入
                let p1 = new Promise((resolve, reject) => {
                    this.$refs[formName1].validate((valid) => {
                        if (valid) {
                            resolve();
                        }
                    })
                });
                let p2 = new Promise((resolve, reject) => {
                    this.$refs[formName2].validate((valid) => {
                        if (valid) {
                            resolve();
                        }
                    })
                });
                let p3 = new Promise((resolve, reject) => {
                    this.$refs[formName3].validate((valid) => {
                        if (valid) {
                            resolve();
                        }
                    })
                });
                Promise.all([p2, p1, p3]).then(() => {
                    if (!this.show_suffer) {
                        this.sufferer = null;
                    } else {
                        if (this.sufferer.name === '') {
                            this.$message('受害人姓名不能为空！');
                            return;
                        }
                    }
                    if (!this.show_suspect) {
                        this.suspect = null;
                    } else {
                        if (this.suspect.name === '') {
                            this.$message('嫌疑人姓名不能为空！');
                            return;
                        }
                    }
                    if (!this.show_witness) {
                        this.witness = null;
                    } else {
                        if (this.witness.name === '') {
                            this.$message('案件证人姓名不能为空！');
                            return;
                        }
                    }
                    if (!this.show_loss) {
                        this.loss = null;
                    } else {
                        if (this.loss.name === '') {
                            this.$message('损失物品名称不能为空！');
                            return;
                        }
                        if (this.loss.bought_time === '' || this.loss.bought_time === null) {
                            this.$message('损失物品购买时间不能为空！');
                            return;
                        }
                        this.loss.bought_time = this.changeTime(this.loss.bought_time);
                    }
                    let case_type = '', occur_place = '';
                    case_type = (this.caseInformation.caseType.length === 1) ? this.caseInformation.caseType[0] : this.caseInformation.caseType[1];
                    occur_place = (this.caseInformation.occur_place.length === 1) ? this.caseInformation.occur_place[0] : this.caseInformation.occur_place[1];

                    let data = {
                        "occur_time": this.caseInformation.caseTime,
                        "registrant": null,
                        "case_type": case_type,
                        "sufferer": this.sufferer,
                        "occur_place": occur_place,
                        "start_time": this.caseInformation.period[0],
                        "end_time": this.caseInformation.period[1],
                        "desc": this.caseInformation.desc,
                        "suspect": this.suspect,
                        "witness": this.witness,
                        "property_loss": this.loss,
                        "deal_status": 0,
                        "check_status": 0,
                        "called_police": this.called_police,
                        "saw_monitoring": this.saw_monitoring,
                        "reporter": this.reporter,
                    };
                    this.$post("/api/v1/cases/", data)
                        .then((res) => {
                            this.success("案件录入成功！");
                            this.print();
                            this.$nextTick(() => {
                                this.reportClose();
                            });
                        })
                        .catch((err) => {
                            this.fail("案件录入失败！");
                        });
                });
            },
            getNowDate() {
                let date = new Date();
                let year = date.getFullYear();
                let length = year - 2010;
                let array = [];
                for (let i = 0; i < length; i++) {
                    array.push({
                        name: year,
                        id: i
                    });
                    year--;
                }
                this.info.grades = array;
            },
            reportClose() {
                this.caseInformation.caseTime = '';
                this.caseInformation.caseType = [];
                this.caseInformation.registrant = '';
                this.caseInformation.occur_place = [];
                this.caseInformation.period = [];
                this.caseInformation.desc = '';

                this.reporter = { //报案人信息
                    age: null,
                    grade: null,
                    gender: true,
                    education: null,//学历
                    home_addr: "",//住址
                    identity_document: null,
                    identity_number: "",
                    name: "",
                    nation: "",
                    phone: "",
                    profession: null,//职业或者身份
                    work_place: null//学院或者单位
                };

                this.samePerson = '1';//报案人与受害人是否为同一人,1为是,0为否
                this.show_suffer = false;//是否展示受害人信息
                this.sufferer = {//受害人信息
                    age: null,
                    grade: null,
                    gender: true,
                    education: null,//学历
                    home_addr: "",//住址
                    identity_document: null,
                    identity_number: "",
                    name: "",
                    nation: "",
                    phone: "",
                    profession: null,//职业或者身份
                    work_place: null//学院或者单位
                };

                this.hasSuspect = '0';//是否有嫌疑人,1为是,0为否
                this.show_suspect = false;//是否展示嫌疑人信息
                this.suspect = {//嫌疑人信息
                    age: null,
                    grade: null,
                    gender: true,
                    education: null,//学历
                    home_addr: "",//住址
                    identity_document: null,
                    identity_number: "",
                    name: "",
                    nation: "",
                    phone: "",
                    profession: null,//职业或者身份
                    work_place: null//学院或者单位
                };

                this.hasWitness = '0';//是否有证人,1为是,0为否
                this.show_witness = false;//是否展示证人信息
                this.witness = {//证人信息
                    age: null,
                    grade: null,
                    gender: true,
                    education: null,//学历
                    home_addr: "",//住址
                    identity_document: null,
                    identity_number: "",
                    name: "",
                    nation: "",
                    phone: "",
                    profession: null,//职业或者身份
                    work_place: null//学院或者单位
                };

                this.has_loss = '0';//是否有财产损失,1为是,0为否
                this.show_loss = false;//是否展示财产损失信息
                this.loss = {
                    name: '',
                    is_private: true,
                    brand: '',
                    version: '',
                    color: '',
                    other_feature: '',
                    sum: 1,
                    bought_time: '',
                    price: '',
                };

                this.called_police = false;//是否通知公安机关等部门
                this.saw_monitoring = false;//是否查看监控
                this.print_caseType = '';
                this.print_occur_place = '';
            },
            print() {
                //处理时间格式问题
                this.caseInformation.caseTime = this.changeTime_print(this.caseInformation.caseTime);
                let array = [];
                array.push(this.changeTime_print(this.caseInformation.period[0]));
                array.push(this.changeTime_print(this.caseInformation.period[1]));
                this.caseInformation.period = array;
                this.print_caseType = (this.caseInformation.caseType.length === 1) ? this.caseInformation.caseType[0] : this.caseInformation.caseType[1];
                this.print_occur_place = (this.caseInformation.occur_place.length === 1) ? this.caseInformation.occur_place[0] : this.caseInformation.occur_place[1];
                //处理学历表示问题
                this.handleEducation(this.reporter);
                if (this.sufferer) {
                    this.handleEducation(this.sufferer);
                }
                if (this.suspect) {
                    this.handleEducation(this.suspect);
                }
                if (this.witness) {
                    this.handleEducation(this.witness);
                }
                //处理证件类型问题
                this.handleIdentityDocument(this.reporter);
                if (this.sufferer) {
                    this.handleIdentityDocument(this.sufferer);
                }
                if (this.suspect) {
                    this.handleIdentityDocument(this.suspect);
                }
                if (this.witness) {
                    this.handleIdentityDocument(this.witness);
                }
                this.$nextTick(() => {
                    document.getElementsByClassName("print")[0].style.display = 'block';
                    document.getElementsByClassName("left")[0].style.display = 'none';
                    document.getElementsByClassName("down")[0].style.display = 'none';
                    window.print();
                    document.getElementsByClassName("left")[0].style.display = 'block';
                    document.getElementsByClassName("down")[0].style.display = 'block';
                    document.getElementsByClassName("print")[0].style.display = 'none';
                });
                return false;

            },
            changeTime(time) {
                //将中国标准时间转换为年-月-日格式
                if (time.getFullYear) {
                    let year = time.getFullYear();
                    let month = time.getMonth() + 1;
                    let day = time.getDate();
                    return year + "-" + this.formTime(month) + "-" + this.formTime(day);
                }
            },
            formTime(str) {
                //规范分钟和秒的格式
                return str > 9 ? (str) : ("0" + str);
            },

            getList(res) {
                //案发地点，案件类型,发送请求之后取得返回值整理数据结构
                let length = res.data.length;
                let array_1 = [];
                let array_2 = [];
                for (let i = 0; i < length; i++) {
                    if (res.data[i].is_parent) {
                        array_1.push({
                            id: res.data[i].id,
                            label: res.data[i].name,
                            value: res.data[i].name,
                            children: [],
                        })
                    } else {
                        array_2.push({
                            id: res.data[i].id,
                            label: res.data[i].name,
                            value: res.data[i].name,
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
            caseType() {
                //获取案件类型
                this.$get("/api/v1/casetype/")
                    .then((res) => {
                        let array_1 = this.getList(res);
                        let array_2 = [];
                        let length = array_1.length;
                        for (let i = 0; i < length; i++) {
                            let length_1 = array_1[i].children.length;
                            if (length_1 === 0) {
                                array_2.push({
                                    label: array_1[i].label,
                                    value: array_1[i].value,
                                });
                            } else {
                                array_2.push({
                                    label: array_1[i].label,
                                    value: array_1[i].value,
                                    children: [],
                                });
                                for (let j = 0; j < length_1; j++) {
                                    array_2[i].children.push({
                                        label: array_1[i].children[j].value,
                                        value: array_1[i].children[j].label,
                                    })
                                }
                            }
                        }
                        this.caseInformation.caseTypes = array_2;
                        this['setLabelType'](res.data);
                    })
                    .catch((err) => {
                        this.fail('获取案件类型失败！');
                    });
            },
            casePosition() {
                //获取案发地点
                this.$get("/api/v1/address/")
                    .then((res) => {
                        let array_1 = this.getList(res);
                        let array_2 = [];
                        let length = array_1.length;
                        for (let i = 0; i < length; i++) {
                            let length_1 = array_1[i].children.length;
                            if (length_1 === 0) {
                                array_2.push({
                                    label: array_1[i].label,
                                    value: array_1[i].value,
                                });
                            } else {
                                array_2.push({
                                    label: array_1[i].label,
                                    value: array_1[i].value,
                                    children: [],
                                });
                                for (let j = 0; j < length_1; j++) {
                                    array_2[i].children.push({
                                        label: array_1[i].children[j].value,
                                        value: array_1[i].children[j].label,
                                    })
                                }
                            }
                        }
                        this.caseInformation.occur_places = array_2;
                        // this['setLabelPosition'](res.data);
                    })
                    .catch((err) => {
                        this.fail('获取案发地点失败！');
                    });
            },
            profession() {
                //获取职业或者身份
                this.$get("/api/v1/profession/")
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
                        this.info.professions = array_1;
                    })
                    .catch((err) => {
                        this.fail('获取职业或身份失败！');
                    });
            },
            getUnits() {
                this.$get("/api/v1/workplace/")
                    .then((res) => {
                        this.info.work_places = res.data;
                    })
                    .catch((err) => {
                        this.fail('获取学院或单位失败！');
                    })
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
            changeTime_print(time) {
                //将中国标准时间转换为年-月-日格式
                if (time === '' || time === null) {
                    return '';
                } else {
                    if (time.getFullYear) {
                        let year = time.getFullYear();
                        let month = time.getMonth() + 1;
                        let day = time.getDate();
                        let hour = time.getHours(); //获取时
                        let minu = time.getMinutes(); //获取分钟
                        let sec = time.getSeconds(); //获取秒钟
                        return year + "-" + this.formTime(month) + "-" + this.formTime(day) + ' ' + this.formTime(hour) + ':' + this.formTime(minu) + ':' + this.formTime(sec);
                    } else {
                        return time;
                    }
                }
            },
            handleEducation(object) {
                switch (object.education) {
                    case 0:
                        object.education = "小学";
                        break;
                    case 1:
                        object.education = "初中";
                        break;
                    case 2:
                        object.education = "高中";
                        break;
                    case 3:
                        object.education = "专科";
                        break;
                    case 4:
                        object.education = "本科";
                        break;
                    case 5:
                        object.education = "硕士";
                        break;
                    case 6:
                        object.education = "博士";
                        break;
                    default :
                        break;
                }
            },
            handleIdentityDocument(object) {
                switch (object.identity_document) {
                    case 0:
                        object.identity_document = "护照";
                        break;
                    case 1:
                        object.identity_document = "学生证";
                        break;
                    case 2:
                        object.identity_document = "身份证";
                        break;
                    default :
                        break;
                }
            },
            ...mapMutations(['setLabelPosition', 'setLabelType']),
        }
        ,
        computed: {
            ...mapState({
                token: state => state.token,
                labelType: state => state.labelType,
                labelPosition: state => state.labelPosition,
            })
        }
        ,
        mounted() {
            axios.defaults.headers.common['Authorization'] = "JWT " + this.token;
            this.caseType();
            this.casePosition();
            this.profession();
            this.getUnits();
            this.getNowDate();
        }
        ,
        watch: {
            samePerson: function () {
                this.show_suffer = (this.samePerson === '1') ? false : true;
            },
            hasSuspect: function () {
                this.show_suspect = (this.hasSuspect === '0') ? false : true;
            },
            hasWitness: function () {
                this.show_witness = (this.hasWitness === '0') ? false : true;
            },
            has_loss: function () {
                this.show_loss = (this.has_loss === '0') ? false : true;
            },
            msgIn: function () {
                this.caseType();
                this.casePosition();
                this.profession();
                this.getUnits();
            }
        }
    }
</script>
<style scoped>
    .print {
        display: none;
    }
</style>
