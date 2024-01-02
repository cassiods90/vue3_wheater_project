<template>
    <span> &copy; Cassio Possamai Spessatto - {{ currentYear }} </span>
</template>

<script setup>
const currentYear = new Date().getUTCFullYear()
</script>
