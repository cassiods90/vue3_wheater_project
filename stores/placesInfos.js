import { defineStore } from 'pinia'
import axios from 'axios'

export const usePlacesInfos = defineStore('placesInfos', {
    state: function () {
        return {
            cities: [],
            citiesInfos: [],
            loading: true,
        }
    },

    getters: {
        getCitiesInfos(state) {
            return state.citiesInfos
        },
    },

    actions: {
        async fetchWeatherInfoForCities() {
            this.loading = true
            this.citiesInfos = []
            const apiKey = 'd86e3f786889443ab7765834240401'
            const apiDaysForecast = '3'

            for (const city of this.cities) {
                try {
                    const response = await axios.get(
                        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city.formatted}&days=${apiDaysForecast}`
                    )

                    const data = response.data.current
                    const location = response.data.location
                    const currentDay = response.data.forecast.forecastday[0].day
                    const hourly = response.data.forecast.forecastday[0].hour
                    const forecast = response.data.forecast.forecastday

                    const [todayDate, hourLocale] = location.localtime.split(' ')

                    const hourlyWeather = hourly.map((hourData) => {
                        const [date, time] = hourData.time.split(' ')

                        return {
                            date: date,
                            time: time,
                            temp: hourData.temp_c,
                            wheaterImage: hourData.condition.icon,
                            wheaterDescription: hourData.condition.text,
                            wheaterIcon: hourData.condition.code,
                            rainChance: hourData.chance_of_rain,
                            snowChance: hourData.chance_of_snow,
                        }
                    })

                    const dayForecast = forecast.slice(1).map((dailyData) => {
                        return {
                            date: dailyData.date,
                            tempMax: dailyData.day.maxtemp_c,
                            tempMin: dailyData.day.mintemp_c,
                            wheaterImage: dailyData.day.condition.icon,
                            wheaterDescription: dailyData.day.condition.text,
                            wheaterIcon: dailyData.day.condition.code,
                            rainChance: dailyData.day.daily_chance_of_rain,
                            snowChance: dailyData.day.daily_chance_of_snow,
                        }
                    })

                    const cityData = {
                        locale: {
                            country: location.country,
                            name: location.name,
                            hourLocale: hourLocale,
                            todayDate: todayDate,
                            latitude: location.lat,
                            longitude: location.lon,
                        },
                        currentWheater: {
                            currentTemp: data.temp_c,
                            currentFeelsLike: data.feelslike_c,
                            currentWheaterImage: data.condition.icon,
                            currentWheaterDescription: data.condition.text,
                            currentWheaterIcon: data.condition.code,
                            todayTempMin: currentDay.mintemp_c,
                            todayTempMax: currentDay.maxtemp_c,
                            todayRainChance: currentDay.daily_chance_of_rain,
                            todaySnowChance: currentDay.daily_chance_of_snow,
                        },
                        hourlyWeather: hourlyWeather,
                        dayForecast: dayForecast,
                    }

                    this.citiesInfos.push(cityData)
                } catch (error) {
                    alert('Error to search infos for ${city.formatted} city. This City will be deleted from the list of cities')

                    const indexCities = this.cities.findIndex((place) => place.formatted.includes(city.formatted))

                    if (indexCities !== -1) {
                        this.cities.splice(indexCities, 1)
                    }

                    this.saveCitiesToLocalStorage()
                }
            }

            console.log('getCitiesInfos: ', this.citiesInfos)
            this.loading = false
        },

        addPlace(city) {
            const cityExists = this.cities.some((existingCity) => existingCity.formatted === city.formatted)

            if (!cityExists) {
                this.cities.push(city)
                this.saveCitiesToLocalStorage()
                this.fetchWeatherInfoForCities()
            } else {
                alert(`The selected city: ${city.formatted}, alredy exist in the list.`)
            }
        },

        deletePlace(city, country) {
            const indexCitiesInfos = this.citiesInfos.findIndex((place) => place.locale.name === city && place.locale.country === country)

            const indexCities = this.cities.findIndex((place) => place.formatted.includes(city) && place.formatted.includes(country))

            if (indexCitiesInfos !== -1) {
                this.citiesInfos.splice(indexCitiesInfos, 1)
            }

            if (indexCities !== -1) {
                this.cities.splice(indexCities, 1)
            }

            this.saveCitiesToLocalStorage()
        },

        saveCitiesToLocalStorage() {
            localStorage.setItem('cities', JSON.stringify(this.cities))
        },

        loadCitiesFromLocalStorage() {
            const savedCities = localStorage.getItem('cities')
            console.log('savedCities: ', savedCities)
            if (savedCities) {
                this.cities = JSON.parse(savedCities)
                this.fetchWeatherInfoForCities()
            } else {
                this.loading = false
            }
            // console.log('load state cities from local storage: ', this.cities)
        },
    },
})
