<template>
    <div class="search d-flex justify-content-end align-items-center">
        <div class="search-inner">
            <input v-model="searchInput" @input="searchCities" class="text" placeholder="Type a city ..." id="myInput" />
            <ul v-if="citySuggestions.length" class="input-return" ref="searchOptions">
                <li v-for="city in citySuggestions" :key="city.geometry" @click="selectCity(city)" class="text small">
                    {{ city.formatted }}
                </li>
            </ul>
            <SvgsSearchIcon />
        </div>
    </div>
</template>

<script setup>
import { usePlacesInfos } from '@/stores/placesInfos'
import { onClickOutside } from '@vueuse/core'

const selectedCities = usePlacesInfos()

const apiKey = '966330bbb748467a81ad9438f4d40ff3'
const searchInput = ref('')
const citySuggestions = ref([])
const searchOptions = ref(null)

const searchCities = async () => {
    try {
        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${searchInput.value}&language=en&key=${apiKey}`)
        const data = await response.json()

        citySuggestions.value = data.results.map((result) => ({
            formatted: result.formatted,
            geometry: result.geometry,
        }))
    } catch (error) {
        console.error('Error:', error)
    }
}

const selectCity = (city) => {
    // console.log('Selected city:', city)
    selectedCities.addPlace(city)

    searchInput.value = ''
    citySuggestions.value = ''
}

onClickOutside(searchOptions, () => {
    searchInput.value = ''
    citySuggestions.value = ''
})

watch(() => searchInput, searchCities)
</script>
