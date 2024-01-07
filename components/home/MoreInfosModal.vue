<template>
    <div class="more-infos-modal d-flex justify-content-center align-items-center">
        <div class="container">
            <div class="more-infos-modal-inner" :class="wheaterClass">
                <div class="icon-close" @click="closeModal()">
                    <SvgsCloseIcon />
                </div>

                <HomeItemCardContent :value="value" />
                <HomeItemCardHourly :value="value" />
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['deleteCardModal', 'closeModalFunction', 'value'])

const wheaterClass = computed(() => {
    const descriptionClass = `back-${props.value.currentWheater.currentWheaterIcon}`
    return descriptionClass
})

function closeModal() {
    props.closeModalFunction()
}
</script>
