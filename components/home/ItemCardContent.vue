<template>
    <div class="card-item-content d-flex justify-content-between align-items-start">
        <div class="content-left d-flex flex-column justify-content-between align-items-start">
            <div class="top">
                <span class="text">{{ value.locale.name }}, {{ value.locale.country }}</span>
                <span class="text">{{ value.locale.hourLocale }}</span>
            </div>
            <div class="bottom">
                <span class="text mainTemp">{{ value.currentWheater.currentTemp }}°C</span>
                <span class="text small">Max: {{ value.currentWheater.todayTempMax }}°C | Min: {{ value.currentWheater.todayTempMin }}°C</span>
                <span class="text small">Rain: {{ value.currentWheater.todayRainChance }}% | Snow: {{ value.currentWheater.todaySnowChance }}%</span>
            </div>
        </div>

        <div class="content-right d-flex flex-column justify-content-center align-items-center">
            <span class="text">{{ value.currentWheater.currentWheaterDescription }}</span>
            <img :src="value.currentWheater.currentWheaterImage" alt="" />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    value: {
        type: Object,
        required: true,
    },
})
</script>
