<template>
    <el-form ref="form" :model="form">
        <el-row style="margin-bottom: 1em;">
            <el-col :span="24">
                <el-input type="textarea" v-model="form.input" rows="7" resize="none"></el-input>
            </el-col>
        </el-row>
        <el-row style="margin-bottom: 1em;">
            <el-col :span="24">
                <el-button type="success" @click="qrodeGenerate">生成图片</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-upload action="" ref="qrcodeUpload" class="qrcode-upload" :on-change="handleUploadChange" :auto-upload="false" accept="image/*">
                    <el-button slot="trigger" type="primary">选取文件</el-button>
                    <el-button style="margin-left: 10px;" type="primary" @click="handleClearFiles">清除文件</el-button>
                    <el-button style="margin-left: 10px;" type="success" @click="qrodeDecode">读取内容</el-button>
                </el-upload>
            </el-col>
        </el-row>
    </el-form>
</template>

<script>
import QRCode from 'qrcode';
import QRReader from 'qrcode-reader';

export default{
    data() {
        return {
            fileList: [],
            form: {
                input: ''
            }
        }
    },
    methods: {
        qrodeGenerate() {
            if (!this.form.input.trim().length) {
                this.$notify.info({title: '没有内容！', duration: 2000});
                return;
            };

            QRCode.toDataURL(this.form.input, {width: 300}, (err, url) => {
                if (err) {
                    this.$notify.error({title: err, duration: 2000});
                    return;
                }

                var message = `<div class="qrcode-image-wrap"><img src="${url}"></div>`;

                this.$alert(message, '', {
                    closeOnClickModal: true,
                    dangerouslyUseHTMLString: true
                }).catch(e => {});
            });
        },
        handleUploadChange(file, fileList) {
            this.fileList = fileList;
        },
        handleClearFiles() {
            this.fileList = [];
            this.$refs.qrcodeUpload.clearFiles();
        },
        qrodeDecode() {
            if (!this.fileList.length) {
                this.$notify.error({title: '请选择图片文件！', duration: 2000});
                return;
            }

            var self = this;
            var qr = new QRReader();

            qr.callback = function(err, result) {
                if (err) {
                    console.log(err);
                    self.$notify.error({title: err, duration: 2000});
                } else {
                    self.$alert(result.result, '', {
                        closeOnClickModal: true,
                    }).catch(e => {});
                }
            }

            var file = this.fileList[0].raw;

            if (!/^image\//.test(file.type)) {
                this.$notify.error({title: '请选择图片文件！', duration: 2000});
                return;
            }

            var fr = new FileReader()
            fr.onloadend = () => {
                qr.decode(fr.result);
            }
            fr.readAsDataURL(file)
        },
    }
}
</script>

<style>
.qrcode-image-wrap {
    text-align: center;
}
.qrcode-upload {
    max-width: 400px;
}
</style>
