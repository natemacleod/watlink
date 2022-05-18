<template>
<nav>
    <p id="left">Logo</p>
    <p>Profile</p>
</nav>
</template>

<script>
export default {
    name: "TopBar"
}
</script>

<style scoped>
nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
    flex-direction: row;
}

nav * {
    padding: 0 10px;
    float: right;
}

#left {
    float: left;
}
</style>