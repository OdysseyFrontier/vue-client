<script setup>
    import MyInfo from "@/components/member/myPage/MyInfo.vue";
    import MyPlanList from "@/components/member/myPage/MyPlanList.vue";

</script>

<template>
    <div>
        <div class="container-fluid">
        <div class="row">
            <div class="col-12 section top-section">
                <MyInfo/>
            </div>
        </div>
        <div class="row">
            <div class="col-12 section bottom-section">
                <MyPlanList/>
            </div>
        </div>
    </div>
    </div>
</template>

<style scoped>
.section {
            padding: 20px;
        }

        .top-section {
            background-color: #F2F2F2
        }

        .bottom-section {
            background-color: #f8f9fa;
        }
</style>
