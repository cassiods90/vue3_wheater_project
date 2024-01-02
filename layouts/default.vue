<!-- 

    THIS FILE IST'T BEING USED, THE PROJECT IS USING THE APP.VUE FILE
    IF DELETE THE APP.VUE FILE, THIS PATH LAYOUTS/DEFAULT.VUE STARTS WORKS AUTOMATICALLY

 -->

<template>
    <div>
        <!-- <header>
            <h2>Intro Nuxt</h2>
            <Navbar />
        </header>

        <main>
            <slot></slot>
        </main>

        <footer>
            <span> &copy; Cassio Spessatto - {{ currentYear }} </span>
        </footer> -->
    </div>
</template>

<script setup>
const currentYear = new Date().getUTCFullYear()
</script>
