<template>
    <div id="spdiv">
        <SearchPane />
    </div>
</template>

<script>
import SearchPane from '@/components/SearchPane';

export default {
    name: 'SidePane',
    components: {
        SearchPane,
    }
}
</script>

<style scoped>
#spdiv {
    border: 1px solid red;
    float: left;
    height: 90vh;
    width: 25%;
}

nav * {
    display: inline-block;
    margin: 10px;
    padding: 10px;
}
</style>