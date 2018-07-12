<template>
    <el-form ref="form" :model="form">
        <el-row style="margin-bottom: 2em;">
            <el-col :span="24">
                <el-input type="textarea" id="input-element" @change="jsonParse" v-model="form.input" rows="10" resize="none"></el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div id="jsoneditor-element"></div>
            </el-col>
        </el-row>
    </el-form>
</template>

<script>
import JSONEditor from 'jsoneditor';

export default{
    mounted() {
        this.editor = new JSONEditor(document.getElementById('jsoneditor-element'), {});
    },
    data() {
        return {
            editor: null,
            form: {
                input: ''
            }
        }
    },
    methods: {
        jsonParse() {
            try {
                var json = {};

                if (this.form.input.trim()) {
                    json = JSON.parse(this.form.input);
                }

                this.editor.set(json);
            } catch (e) {
                this.$notify.error({title: '格式错误！', duration: 2000});
            }
        }
    }
}
</script>

<style src="jsoneditor/dist/jsoneditor.min.css"></style>
<style>
.el-form {
    width: 100%;
}
#jsoneditor-element {
    height: 400px;
}
</style>
