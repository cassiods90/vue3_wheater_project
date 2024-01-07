<template>
    <div class="cards-items d-flex justify-content-center align-items-center">
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-4" v-for="city in value" :key="city.locale.name">
                    <HomeItemCard :value="city" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    value: {
        type: Array,
        required: true,
    },
})
</script>
