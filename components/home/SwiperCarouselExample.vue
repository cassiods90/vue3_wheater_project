<template>
    <swiper
        class="home-carousel"
        :slides-per-view="5"
        :loop="true"
        :space-between="50"
        :breakpoints="breakpoints"
        :autoplay="autoplay"
        :navigation="navigation"
        :pagination="pagination"
        :modules="modules"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
    >
        <!-- Left Arrow Carousel Navigation -->
        <div class="carousel-navigation arrow-left">
            <span>left</span>
        </div>

        <!-- Carousel Items  -->
        <swiper-slide v-for="(item, index) in 10" :key="index">
            <a href="http://placehold.it/150x150" class="d-flex flex-column justify-content-center align-items-center">
                <img src="http://placehold.it/150x150" alt="" />
                <span class="d-flex flex-column justify-content-center align-items-center">Slide {{ item }}</span>
            </a>
        </swiper-slide>

        <!-- Dots Central Carousel Pagination -->
        <div class="carousel-pagination carousel-dots"></div>

        <!-- Right Arrow Carousel Navigation -->
        <div class="carousel-navigation arrow-right">
            <span>right</span>
        </div>
    </swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper'
import 'swiper/swiper-bundle.css'

SwiperCore.use([Autoplay, Navigation, Pagination])

const breakpoints = {
    1: {
        slidesPerView: 2,
        spaceBetween: 15,
    },
    744: {
        slidesPerView: 3,
        spaceBetween: 20,
    },
    1024: {
        slidesPerView: 5,
        spaceBetween: 30,
    },
}

const autoplay = {
    delay: 55000,
}

const navigation = {
    nextEl: '.carousel-navigation.arrow-left',
    prevEl: '.carousel-navigation.arrow-right',
}

const pagination = {
    el: '.carousel-pagination',
    type: 'bullets',
    clickable: true,
}

const onSwiper = (swiper) => {
    // console.log(swiper)
}

const onSlideChange = () => {
    // console.log('slide change')
}
</script>

<style>
.swiper {
    padding-bottom: 50px;
}
.swiper-slide span {
    width: 150px;
    padding: 10px;
    color: white;
    background: black;
}
.swiper-slide img {
    max-width: 150px;
    max-height: 150px;
}
.carousel-navigation {
    background: white;
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 5px;
    z-index: 1;
}
.carousel-navigation.arrow-right {
    left: auto;
    right: 5px;
}
.carousel-pagination {
    display: flex;
    justify-content: center;
    padding-top: 20px;
}
</style>
