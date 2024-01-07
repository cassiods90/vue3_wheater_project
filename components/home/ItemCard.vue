<template>
    <div class="card-item" :class="wheaterClass">
        <div class="card-item-inner">
            <HomeItemCardContent :value="value" />

            <div class="card-buttons">
                <div class="card-buttons-inner d-flex justify-content-center align-items-center">
                    <div class="buttons-icon infos-icon" @click="togglemoreInfosCard()">
                        <SvgsInfosIcon />
                    </div>
                    <div class="buttons-icon delete-icon" @click="toggleDeleteModal()">
                        <SvgsDeleteIcon />
                    </div>
                </div>
            </div>

            <HomeDeleteCardModal
                :deleteCardModal="deleteCardModal"
                :closeModalFunction="toggleDeleteModal"
                :deleteCardFunction="deleteCard"
                v-if="deleteCardModal"
            />
            <HomeMoreInfosModal :value="value" :moreInfosModal="moreInfosModal" :closeModalFunction="togglemoreInfosCard" v-if="moreInfosModal" />
        </div>
    </div>
</template>

<script setup>
import { usePlacesInfos } from '@/stores/placesInfos'
const props = defineProps({
    value: {
        type: Object,
        required: true,
    },
})

const cities = usePlacesInfos()
const deleteCardModal = ref(false)
const moreInfosModal = ref(false)

const wheaterClass = computed(() => {
    const descriptionClass = `back-${props.value.currentWheater.currentWheaterIcon}`
    return descriptionClass
})

const togglemoreInfosCard = () => {
    moreInfosModal.value = !moreInfosModal.value
}

const toggleDeleteModal = () => {
    deleteCardModal.value = !deleteCardModal.value
}

const deleteCard = () => {
    const city = props.value.locale.name
    const country = props.value.locale.country
    cities.deletePlace(city, country)

    deleteCardModal.value = !deleteCardModal.value
}
</script>
