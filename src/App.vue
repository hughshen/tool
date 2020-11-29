<template>
    <div id="app">
        <el-container>
            <el-header>
                <el-menu router :default-active="$route.path" :menu-trigger="triggerType" mode="horizontal" >
                    <el-menu-item index="/">首页</el-menu-item>
                    <el-menu-item index="/front">前端</el-menu-item>
                    <el-menu-item index="/json">JSON</el-menu-item>
                    <el-menu-item index="/qrcode">二维码</el-menu-item>
                    <el-submenu index="">
                        <template slot="title">其他工具</template>
                        <el-menu-item index="">
                            <a href="https://css3generator.com/" target="_blank">CSS3 Generator</a>
                        </el-menu-item>
                        <el-menu-item index="">
                            <a href="https://regexr.com/" target="_blank">正则表达式在线测试</a>
                        </el-menu-item>
                        <el-menu-item index="">
                            <a href="http://24mail.chacuo.net/" target="_blank">十分钟邮箱</a>
                        </el-menu-item>
                        <el-menu-item index="">
                            <a href="https://www.moakt.com/" target="_blank">临时邮箱服务</a>
                        </el-menu-item>
                        <el-menu-item index="">
                            <a href="https://www.easymp3converter.com/" target="_blank">Easy YouTube to Mp3 Converter</a>
                        </el-menu-item>
                        <el-menu-item index="">
                            <a href="https://www.clipconverter.cc/" target="_blank">YouTube to MP4 & MP3 Converter</a>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            triggerType: 'click'
        }
    }
}
</script>

<style src="./css/site.css"></style>
