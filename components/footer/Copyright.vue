<template>
    <span class="text small"> &copy; Developed by Cassio Spessatto - {{ currentYear }} </span>
</template>

<script setup>
const currentYear = new Date().getUTCFullYear()
</script>
