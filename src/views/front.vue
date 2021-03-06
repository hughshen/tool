<template>
    <el-form ref="form" :model="form" label-width="120px">
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
        <el-form-item label="IP 地址">
            <el-col :span="5">
                <el-input v-model="form.ipAddress" :disabled="!fetchSupported()"></el-input>
            </el-col>
            <el-col :span="5" class="center">
                <el-button type="primary" @click="fetchIpInfoCurrent" :disabled="!fetchSupported()">当前</el-button>
                <el-button type="primary" @click="fetchIpInfoDetails" :disabled="!fetchSupported()">详细</el-button>
            </el-col>
        </el-form-item>
        <el-form-item label="文件转Base64">
            <el-col :span="24">
                <el-upload action="" ref="fileToBase64Upload" class="fileToBase64-upload" :on-change="handleFileToBase64UploadChange" :auto-upload="false" :multiple="false" :limit="1">
                    <el-button slot="trigger" type="primary">选取文件</el-button>
                    <el-button style="margin-left: 10px;" type="primary" @click="handleFileToBase64ClearFiles">清除文件</el-button>
                    <el-button style="margin-left: 10px;" type="success" @click="handleFileToBase64">转换文件</el-button>
                </el-upload>
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
                randomString: '',
                ipAddress: '',
                fileList: []
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
        },
        fetchSupported() {
            return 'fetch' in window;
        },
        fetchIpInfoCurrent() {
            fetch('https://api.ip.sb/geoip')
                .then(resp => {
                    return resp.json();
                })
                .then(json => {
                    this.form.ipAddress = json.ip;
                })
                .catch(e => {
                    console.log(e);
                    this.$notify.error({title: '获取失败！', duration: 2000});
                });
        },
        fetchIpInfoDetails() {
            if (!this.form.ipAddress.trim().length) {
                this.$notify.error({title: '请输入 IP 地址！', duration: 2000});
                return;
            }

            fetch('https://api.ip.sb/geoip/' + this.form.ipAddress)
                .then(resp => {
                    return resp.json();
                })
                .then(json => {
                    var message = [];
                    for (var key in json) {
                        if (json.hasOwnProperty(key)) {
                            message.push(`<span class="bold">${key}:</span> ${json[key]}`);
                        }
                    }

                    this.$alert(message.join('<br>'), '详细信息', {
                        closeOnClickModal: true,
                        dangerouslyUseHTMLString: true
                    }).catch(e => {});
                })
                .catch(e => {
                    console.log(e);
                    this.$notify.error({title: '获取失败！', duration: 2000});
                });
        },
        handleFileToBase64UploadChange(file, fileList) {
            this.form.fileList = fileList;
        },
        handleFileToBase64ClearFiles() {
            this.form.fileList = [];
            this.$refs.fileToBase64Upload.clearFiles();
        },
        handleFileToBase64() {
            if (!this.form.fileList.length) {
                this.$notify.error({title: '请选择文件！', duration: 2000});
                return;
            }

            var file = this.form.fileList[0].raw;
            var fr = new FileReader()
            fr.onloadend = () => {
                var message = `<div class="fileToBase64-result"><textarea rows="12" class="el-textarea__inner" style="resize: none;">${fr.result}</textarea></div>`;

                this.$alert(message, '', {
                    customClass: 'fileToBase64-MessageBox',
                    closeOnClickModal: true,
                    dangerouslyUseHTMLString: true
                }).catch(e => {});

            }
            fr.readAsDataURL(file);
        }
    }
}
</script>

<style>
.bold {
    font-weight: bold;
}
.center {
    text-align: center;
}
.el-form {
    width: 100%;
}
.fileToBase64-MessageBox {
    width: 640px;
}
</style>
