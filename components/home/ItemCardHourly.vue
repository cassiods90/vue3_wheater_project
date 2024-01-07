<template>
    <div class="card-item-hourly d-flex flex-column justify-content-between align-items-start">
        <div class="card-title d-flex flex-column justify-content-center align-items-center">
            <span class="text subtitle">Wheater Hourly:</span>
        </div>

        <div class="hourly-items d-flex justify-content-center align-items-start">
            <div v-for="hour in value.hourlyWeather" :key="value.hourlyWeather.time" class="hourly-item">
                <div class="hourly-item-content d-flex flex-column justify-content-center align-items-center">
                    <span class="text"> {{ hour.time }} </span>
                    <!-- <span class="text"> {{ hour.wheaterDescription }} </span> -->
                    <div class="hourly-image">
                        <img :src="hour.wheaterImage" class="text" />
                    </div>
                    <span class="text"> {{ hour.temp }}°C </span>
                </div>
            </div>
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
