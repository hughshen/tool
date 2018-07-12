<template>
    <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="User-Agent">
            <el-input v-model="form.ua"></el-input>
        </el-form-item>
        <el-form-item label="时间戳">
            <el-col :span="5">
                <el-input v-model="form.timestamp"></el-input>
            </el-col>
            <el-col :span="5" class="center">
                <el-button type="primary" @click="toTimestamp">&lt;&lt;</el-button>
                <el-button type="primary" @click="toDateText">&gt;&gt;</el-button>
            </el-col>
            <el-col :span="5">
                <el-input v-model="form.dateText"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="随机串">
            <el-col :span="5">
                <el-input-number v-model="form.randomLength" :min="1" :max="100"></el-input-number>
            </el-col>
            <el-col :span="3" class="center">
                <el-button type="primary" @click="generateRandomString">生成</el-button>
            </el-col>
            <el-col :span="16">
                <el-input v-model="form.randomString"></el-input>
            </el-col>
        </el-form-item>
    </el-form>
</template>

<script>
import dayjs from 'dayjs';
import randomstring from 'randomstring';

export default{
    mounted() {
        this.form.ua = navigator.userAgent;
        this.form.timestamp = Math.floor(Date.now() / 1000);
        this.form.dateText = dayjs().format('YYYY-MM-DD HH:mm:ss');
    },
    data() {
        return {
            form: {
                ua: '',
                timestamp: '',
                dateText: '',
                randomLength: 16,
                randomString: ''
            }
        }
    },
    methods: {
        toTimestamp() {
            this.form.timestamp = dayjs(this.form.dateText).unix();
        },
        toDateText() {
            var t = parseInt(this.form.timestamp * 1000);
            this.form.dateText = dayjs(t).format('YYYY-MM-DD HH:mm:ss');
        },
        generateRandomString() {
            this.form.randomString = randomstring.generate(this.form.randomLength);
        }
    }
}
</script>

<style>
.center {
    text-align: center;
}
.el-form {
    width: 100%;
}
</style>
