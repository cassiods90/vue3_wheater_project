<template>
    <div class="d-flex justify-content-start align-items-center">
        <button @click="counter.decrement">--</button>
        <span>Pinia Counter: {{ counter.count }}</span>
        <button @click="counter.increment">++</button>
    </div>
</template>

<script setup>
import { useCounter } from '@/stores/counter'

const counter = useCounter()
</script>
