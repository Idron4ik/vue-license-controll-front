<template>
    <div :class="['validation-errors','error--text', classes]">
          {{msg}}  
    </div>
</template>

<script>
    export default {
        name: "valisateErrors",

        props:{
            msg: {
                type: String
            },
            classes:{
                type: String
            }

        }
    }
</script>

<style lang="scss" scoped>
    .validation-errors{
        font-weight: 600;
        margin-top: 15px;
    }
</style>