<template>
    <div>
        <div style="text-align: left">
            时间：
            <el-date-picker v-model="time" type="date" placeholder="请选择日期"></el-date-picker>&nbsp;&nbsp;&nbsp;&nbsp;
            用户名：
            <el-input v-model="name" placeholder="请输入查询的用户名" class="searchName"></el-input>
            <el-button type="success" style="margin: 0 20px" @click="search">搜索</el-button>
        </div>
        <div style="margin-top:50px;">
            <el-table :data="logs" border>
                <el-table-column label="用户名称" align="center" prop="username"></el-table-column>
                <el-table-column label="时间" align="center" prop="create_time"></el-table-column>
                <el-table-column label="操作" align="center" prop="operation"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {
        mapState,
        mapMutations,
    } from 'vuex'

    export default {
        name: "trackRecord",
        data() {
            return {
                allData: [],//留痕日志备份
                logs: [],//留痕日志
                time: '',
                name: '',
            }
        },
        methods: {
            getRecord() {
                //获取所有账户列表
                let instance = axios.create({
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                });
                instance.get("/api/v1/logs/")
                    .then((res) => {
                        let array = res.data;
                        array.reverse();
                        this.allData = array;
                        this.logs = array;
                    })
                    .catch((err) => {
                        this.$message({
                            message: '获取操作日志失败！',
                            type: 'error'
                        })
                    });
            },
            handleTime(str) {
                //处理时间格式
                let a = str.substring(0, 19);
                return a.replace("T", ' ');
            },
            changeTime(time) {
                //将中国标准时间转换为年-月-日格式
                if (time.getFullYear) {
                    let year = time.getFullYear();
                    let month = time.getMonth() + 1;
                    let day = time.getDate();
                    return year + "-" + this.formTime(month) + "-" + this.formTime(day);
                } else {
                    return time;
                }
            },
            formTime(str) {
                //规范分钟和秒的格式
                return str > 9 ? (str) : ("0" + str);
            },

            searchTime() {
                //根据时间搜索
                this.time = this.changeTime(this.time);
                let array = [];
                let length = this.logs.length;
                for (let i = 0; i < length; i++) {
                    let str = this.logs[i].create_time.substring(0, 10);
                    if (str === this.time) {
                        array.push(this.logs[i]);
                    }
                }
                this.logs = array;
            },
            searchName() {
                //根据用户名搜索
                let array = [];
                let length = this.logs.length;
                for (let i = 0; i < length; i++) {
                    if (this.logs[i].username === this.name) {
                        array.push(this.logs[i]);
                    }
                }
                this.logs = array;
            },
            search() {
                //判断是根据时间搜索，或者根据用户名搜索，或者都搜索
                this.logs = this.allData;
                if ((this.time === '' || this.time === null) && this.name === '') {
                    this.$message('请输入要搜索的时间或者用户名！');
                } else {
                    if (this.time !== '' && this.name === '') {
                        this.searchTime();
                    } else if ((this.time === '' || this.time === null) && this.name !== '') {
                        this.searchName();
                    } else if (this.time !== '' && this.name !== '') {
                        this.searchTime();
                        this.searchName();
                    }
                }
            },
        },
        computed: {
            ...mapState({
                token: state => state.token,
                track: state => state.track,
            })
        },
        mounted() {
            axios.defaults.headers.common['Authorization'] = "JWT " + this.token;
            this.getRecord();
        },
        watch: {
            logs: function () {
                let length = this.logs.length;
                for (let i = 0; i < length; i++) {
                    this.logs[i].create_time = this.handleTime(this.logs[i].create_time);
                }
            },
            time: function () {
                if ((this.time === '' || this.time === null) && this.name === '') {
                    this.logs = this.allData;
                }
            },
            name: function () {
                if ((this.time === '' || this.time === null) && this.name === '') {
                    this.logs = this.allData;
                }
            },
        }
    }
</script>

<style scoped>
    .searchName {
        width: 250px;
    }
</style>