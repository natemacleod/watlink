<template>
    <form id="advSearch">
        <div class="together">
            <h3>Search All Fields</h3>
            <br>
            <div class="topflex">
                <InputText type="text" v-model="search" placeholder="Search" style="width:300px; margin-right: 1em;" />
                <CheckBox binary v-model="showFull" id="full" style="margin-right: 0.4em;" />
                <label for="full">Show full events</label>
            </div>
        </div>
        <div class="together">
            <h3>Filter by Course</h3>
            <br>
            <div class="topflex">
                <div id="classSelect">
                    <DropdownMenu id="cl" type="text" v-model="cl" filter :options="subj" style="width:300px;" />
                    <InputNumber id="max" v-model="clnum" inputStyle="width:80px; text-align:center; margin-left:20px"
                        :min="100" :max="499" placeholder="Number" />

                </div>
            </div>
        </div>
        <div class="together">
            <h3>Filter by Creator</h3>
            <br>
            <CheckBox binary v-model="showMine" id="mine" style="margin-right: 0.4em;" />
            <label for="mine" style="margin-right: 1.5em;">Show events you've created</label>
            <CheckBox binary v-model="showOthers" id="others" style="margin-right: 0.4em;" />
            <label for="others">Show events created by others</label>
        </div>
        <div class="together">
            <h3>Filter by Join Status</h3>
            <br>
            <CheckBox binary v-model="showJoined" id="join" style="margin-right: 0.4em;" />
            <label for="join" style="margin-right: 1.5em;">Show events you've joined</label>
            <CheckBox binary v-model="showUnjoined" id="unjoin" style="margin-right: 0.4em;" />
            <label for="unjoin">Show events you haven't joined</label>
        </div>
        <PrimeButton icon="pi pi-search" label="Search" @click="$emit('set-filters', [[this.search, this.showFull,
        this.showMine, this.showOthers, this.showJoined, this.showUnjoined, this.cl, this.clnum], true])"
            style="margin-right: .5em;" />
        <PrimeButton icon="pi pi-trash" class="p-button-danger" label="Reset Filters" @click="reset" />
    </form>
</template>

<script>
import { subjects } from '@/subjectCodes';
export default {
    name: "AdvancedSearch",
    props: {
        query: Array,
    },
    data() {
        return {
            search: this.query[0],
            showFull: this.query[1],
            showMine: this.query[2],
            showOthers: this.query[3],
            showJoined: this.query[4],
            showUnjoined: this.query[5],

            subj: subjects,
            cl: this.query[6],
            clnum: this.query[7],
        }
    },
    methods: {
        reset() {
            this.search = "";
            this.showFull = true;
            this.showMine = true;
            this.showOthers = true;
            this.showJoined = true;
            this.showUnjoined = true;
            this.cl = "Don't specify a course";
            this.clnum = null;

            this.$emit('set-filters', [[this.search, this.showFull, this.showMine, this.showOthers, this.showJoined, this.showUnjoined, this.cl, this.clnum], false]);
        }
    }
}
</script>

<style scoped>
#advSearch {
    margin: 20px 50px 30px 50px;
    align-items: center;
}

.topflex {
    display: flex;
    align-items: center;
}

.together {
    margin-bottom: 50px;
}
</style>