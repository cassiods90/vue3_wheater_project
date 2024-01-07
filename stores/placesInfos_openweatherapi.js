import { defineStore } from 'pinia'
import axios from 'axios'

export const usePlacesInfos = defineStore('placesInfos', {
    state: function () {
        return {
            cities: [],
            citiesInfos: [],
        }
    },

    getters: {
        getCitiesInfos(state) {
            return state.citiesInfos
        },
    },

    actions: {
        async fetchWeatherInfoForCities() {
            this.citiesInfos = []
            const apiKey = 'b028ba8764408ede3f010f72a0fa5778'

            for (const city of this.cities) {
                // console.log('city: ', city)
                try {
                    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.formatted}&appid=${apiKey}`)

                    const data = response.data
                    // console.log('data: ', data)

                    const cityData = {
                        name: data.name,
                        hour: new Date(data.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
                        todayTemp: Math.round(data.main.temp - 273.15),
                        todayTempMin: Math.round(data.main.temp_min - 273.15),
                        todayTempMax: Math.round(data.main.temp_max - 273.15),
                        todayWheaterImage: data.weather[0].icon,
                        wheaterDescription: data.weather[0].description,
                        hourlyWeather: [],
                        dayForecast: [],
                    }

                    const hourlyResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city.formatted}&appid=${apiKey}`)
                    cityData.hourlyWeather = hourlyResponse.data.list.map((hourlyData) => ({
                        hour: new Date(hourlyData.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
                        temp: Math.round(hourlyData.main.temp - 273.15),
                        wheaterImage: hourlyData.weather[0].icon,
                    }))

                    const dailyResponse = await axios.get(
                        `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city.formatted}&appid=${apiKey}&cnt=7`
                    )
                    cityData.dayForecast = dailyResponse.data.list.map((dailyData) => ({
                        date: new Date(dailyData.dt * 1000).toLocaleDateString(),
                        weekDate: new Date(dailyData.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' }),
                        temp: Math.round(dailyData.temp.day - 273.15),
                        wheaterImage: dailyData.weather[0].icon,
                    }))

                    // this.citiesInfos.push(data)
                    this.citiesInfos.push(cityData)
                } catch (error) {
                    console.error(`Error to search infos for ${city.formatted} city:`, error)
                }
            }

            console.log('getCitiesInfos: ', this.citiesInfos)
        },

        addPlace(place) {
            this.cities.push(place)
            this.saveCitiesToLocalStorage()
        },

        deletePlace() {
            // this.count--

            this.saveCitiesToLocalStorage()
        },

        saveCitiesToLocalStorage() {
            localStorage.setItem('cities', JSON.stringify(this.cities))
        },

        loadCitiesFromLocalStorage() {
            const savedCities = localStorage.getItem('cities')

            if (savedCities) {
                this.cities = JSON.parse(savedCities)
                this.fetchWeatherInfoForCities()
            }
            console.log('load state cities from local storage: ', this.cities)
        },
    },
})
