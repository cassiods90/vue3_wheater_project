<template>
    <div class="delete-card-modal d-flex justify-content-center align-items-center">
        <div class="delete-card-modal-inner">
            <div class="delete-card-modal-content d-flex flex-column justify-content-center align-items-center">
                <span class="text"> Are you sure you want to delete this card ? </span>
                <div class="delete-card-modal-buttons d-flex justify-content-center align-items-center">
                    <span class="text home d-flex justify-content-center align-items-center" @click="deleteCard()">Yes</span>
                    <span class="text home d-flex justify-content-center align-items-center" @click="closeModal()">No</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['deleteCardModal', 'closeModalFunction', 'deleteCardFunction'])

function deleteCard() {
    props.deleteCardFunction()
}

function closeModal() {
    props.closeModalFunction()
}
</script>
