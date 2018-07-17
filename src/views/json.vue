<template>
    <el-row>
        <el-col :span="24" style="margin-bottom: 2em;">
            <el-input type="textarea" id="input-element" v-model="input" rows="10" resize="none"></el-input>
        </el-col>
        <el-col :span="24">
            <div id="jsoneditor-element"></div>
        </el-col>
    </el-row>
</template>

<script>
import JSONEditor from 'jsoneditor';

export default{
    mounted() {
        this.editor = new JSONEditor(document.getElementById('jsoneditor-element'), {});
    },
    data() {
        return {
            input: '',
            editor: null
        }
    },
    watch: {
        input: 'jsonParse'
    },
    methods: {
        jsonParse() {
            try {
                var json = {};

                if (this.input.trim()) {
                    json = JSON.parse(this.input);
                }

                this.editor.set(json);
            } catch (e) {}
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
