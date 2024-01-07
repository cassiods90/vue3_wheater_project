<template>
    <div class="pages home-page">
        <AppLoader v-if="selectedCities.loading" />

        <div class="page-title d-flex flex-column justify-content-center align-items-center">
            <h1 class="text bigtitle">My Cities:</h1>
        </div>

        <HomeCardsItems :value="citiesInfos" />
    </div>
</template>

<script setup>
import { usePlacesInfos } from '@/stores/placesInfos'

const selectedCities = usePlacesInfos()
const citiesInfos = computed(() => selectedCities.getCitiesInfos)

async function load() {
    await selectedCities.loadCitiesFromLocalStorage()
}
onMounted(load)
</script>
