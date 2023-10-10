/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/functionality/filterPlaces.ts":
/*!*******************************************!*\
  !*** ./src/functionality/filterPlaces.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.filterPlacesByCategory = void 0;\nconst filterPlacesByCategory = (event, placeList, displayMarkers) => __awaiter(void 0, void 0, void 0, function* () {\n    const placesElements = document.querySelectorAll('.place-item');\n    const copyArr = [...placeList];\n    if (event && event.target) {\n        const target = event.target;\n        const category = target.innerText.split(' ')[0];\n        let index = 0;\n        placesElements.forEach((place) => {\n            if (category === 'All') {\n                place.classList.remove('hidden');\n            }\n            else {\n                if (place.classList.contains(category)) {\n                    place.classList.remove('hidden');\n                }\n                else {\n                    place.classList.add('hidden');\n                    copyArr.splice(index, 1);\n                    index--;\n                }\n            }\n            index++;\n        });\n    }\n    displayMarkers(copyArr);\n});\nexports.filterPlacesByCategory = filterPlacesByCategory;\n\n\n//# sourceURL=webpack://new/./src/functionality/filterPlaces.ts?");

/***/ }),

/***/ "./src/functionality/generatePlacesCategoryBtn.ts":
/*!********************************************************!*\
  !*** ./src/functionality/generatePlacesCategoryBtn.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.generetePlacesCategoryBtns = void 0;\nfunction generetePlacesCategoryBtns(list) {\n    return list.map((item) => (`<button class=\"category ${item.split(' ')[0]}\">${item}</button>`));\n}\nexports.generetePlacesCategoryBtns = generetePlacesCategoryBtns;\n\n\n//# sourceURL=webpack://new/./src/functionality/generatePlacesCategoryBtn.ts?");

/***/ }),

/***/ "./src/functionality/generetePlacesList.ts":
/*!*************************************************!*\
  !*** ./src/functionality/generetePlacesList.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.generetePlacesList = void 0;\nconst generetePlacesList = (list) => {\n    return list.map((item) => (` \r\n        <div class=\"place-item ${item.categories[0].name.split(' ')[0]}\">\r\n            <div class=\"place-item-info\">\r\n                <h3>${item.name}</h3>\r\n                <p class=\"categoty\">${item.categories[0].name}</p>\r\n                <p class=\"location\"><i class=\"fa-solid fa-location-dot\"></i> ${item.location.formatted_address}</p>\r\n                <p class=\"distance\"><i class=\"fa-solid fa-person-walking\"></i> ${item.distanceToPlace} meters away</p>\r\n            </div>\r\n        </div>\r\n    `));\n};\nexports.generetePlacesList = generetePlacesList;\n\n\n//# sourceURL=webpack://new/./src/functionality/generetePlacesList.ts?");

/***/ }),

/***/ "./src/functionality/getClosestPlacesByCoords.ts":
/*!*******************************************************!*\
  !*** ./src/functionality/getClosestPlacesByCoords.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.memoizedPlaceSearch = exports.calculateDistance = exports.placeSearch = void 0;\nfunction placeSearch(latitude, longitude) {\n    return __awaiter(this, void 0, void 0, function* () {\n        try {\n            let places = null;\n            let i = 1;\n            do {\n                const searchParams = new URLSearchParams({\n                    ll: `${latitude},${longitude}`,\n                    open_now: 'true',\n                    radius: `${2500 * i}`,\n                });\n                const results = yield fetch(`https://api.foursquare.com/v3/places/search?${searchParams}`, {\n                    method: 'GET',\n                    headers: {\n                        Accept: 'application/json',\n                        Authorization: 'fsq3C1EEWYk0pgVweHJQ0mELQHwD+jCkfg5zE4y5LV5T/x0=',\n                    }\n                });\n                const data = yield results.json();\n                places = data.results;\n                i++;\n            } while ((places === null || places === void 0 ? void 0 : places.length) < 10);\n            places = places.map((item) => (Object.assign(Object.assign({}, item), { distanceToPlace: Math.trunc((0, exports.calculateDistance)(latitude, longitude, item.geocodes.main.latitude, item.geocodes.main.longitude) * 1000) })));\n            return places.sort((a, b) => a.distanceToPlace - b.distanceToPlace);\n        }\n        catch (err) {\n            console.error(err);\n        }\n    });\n}\nexports.placeSearch = placeSearch;\nconst calculateDistance = (latitude, longitude, placeLatitude, placeLongitude) => {\n    const radiusEarthKm = 6371;\n    const diffLat = (placeLatitude - latitude) * (Math.PI / 180);\n    const diffLon = (placeLongitude - longitude) * (Math.PI / 180);\n    const a = 0.5 - Math.cos(diffLat) / 2 +\n        Math.cos(latitude * (Math.PI / 180)) * Math.cos(placeLatitude * (Math.PI / 180)) * (1 - Math.cos(diffLon)) / 2;\n    return radiusEarthKm * 2 * Math.asin(Math.sqrt(a));\n};\nexports.calculateDistance = calculateDistance;\nconst memoizedPlaceSearch = () => {\n    const cache = new Map();\n    return function (latitude, longitude) {\n        return __awaiter(this, void 0, void 0, function* () {\n            if (cache.has(`${latitude}:${longitude}`)) {\n                return cache.get(`${latitude}:${longitude}`);\n            }\n            const result = yield placeSearch(latitude, longitude);\n            cache.set(`${latitude}:${longitude}`, result);\n            return result;\n        });\n    };\n};\nexports.memoizedPlaceSearch = memoizedPlaceSearch;\n\n\n//# sourceURL=webpack://new/./src/functionality/getClosestPlacesByCoords.ts?");

/***/ }),

/***/ "./src/functionality/getUserLocation.ts":
/*!**********************************************!*\
  !*** ./src/functionality/getUserLocation.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.customLocation = exports.getLocation = void 0;\nfunction getLocation() {\n    if (navigator.geolocation) {\n        return navigator.geolocation.getCurrentPosition(showPosition, showError);\n    }\n    else {\n        console.log(\"Geolocation is not supported by this browser.\");\n    }\n}\nexports.getLocation = getLocation;\nconst customLocation = () => {\n    let latitude = 0;\n    let longitude = 0;\n    const setCoords = (lat, lon) => {\n        latitude = lat;\n        longitude = lon;\n    };\n    const getCoords = () => ({ latitude, longitude });\n    return {\n        setCoords,\n        getCoords,\n    };\n};\nexports.customLocation = customLocation;\nfunction showPosition(position) {\n    const latitude = position.coords.latitude;\n    const longitude = position.coords.longitude;\n    return { latitude, longitude };\n}\nfunction showError(error) {\n    switch (error.code) {\n        case error.PERMISSION_DENIED:\n            console.log(\"User denied the request for Geolocation.\");\n            break;\n        case error.POSITION_UNAVAILABLE:\n            console.log(\"Location information is unavailable.\");\n            break;\n        case error.TIMEOUT:\n            console.log(\"The request to get user location timed out.\");\n            break;\n    }\n}\n\n\n//# sourceURL=webpack://new/./src/functionality/getUserLocation.ts?");

/***/ }),

/***/ "./src/functionality/map.ts":
/*!**********************************!*\
  !*** ./src/functionality/map.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.displayMarkersWrapper = void 0;\nconst displayMarkersWrapper = (latitude, longitude) => {\n    const L = window.L;\n    let map = null;\n    let markers = [];\n    let icon = L.icon({\n        iconUrl: 'https://i.pinimg.com/originals/0f/61/ba/0f61ba72e0e12ba59d30a50295964871.png',\n        iconSize: [70, 70]\n    });\n    map = L.map('map').setView([latitude, longitude], 14);\n    L.marker([latitude, longitude], {\n        title: 'You',\n        icon\n    }).bindPopup('<h2>You</h2>').addTo(map);\n    return function (list) {\n        if (markers.length) {\n            for (let i = 0; i < markers.length; i++) {\n                map.removeLayer(markers[i]);\n            }\n            markers = [];\n        }\n        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {\n            maxZoom: 19,\n            attribution: '&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a>'\n        }).addTo(map);\n        list.forEach((place) => {\n            const marker = L.marker([place.geocodes.main.latitude, place.geocodes.main.longitude], {\n                title: place.name,\n            }).bindPopup(generatePopup(place.name, place.location.address, place.distanceToPlace)).addTo(map);\n            markers.push(marker);\n        });\n    };\n};\nexports.displayMarkersWrapper = displayMarkersWrapper;\nfunction generatePopup(name, address, distance) {\n    return `\r\n        <div class=\"popup\">\r\n            <h4>${name}</h4>\r\n            <p><i class=\"fa-solid fa-location-dot\"></i> ${address}</p>\r\n            <p><i class=\"fa-solid fa-person-walking\"></i> ${distance} meters away</p>\r\n        </div>\r\n    `;\n}\n\n\n//# sourceURL=webpack://new/./src/functionality/map.ts?");

/***/ }),

/***/ "./src/functionality/submitForm.ts":
/*!*****************************************!*\
  !*** ./src/functionality/submitForm.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.submitForm = void 0;\nconst getUserLocation_1 = __webpack_require__(/*! ./getUserLocation */ \"./src/functionality/getUserLocation.ts\");\nconst getClosestPlacesByCoords_1 = __webpack_require__(/*! ./getClosestPlacesByCoords */ \"./src/functionality/getClosestPlacesByCoords.ts\");\nconst generetePlacesList_1 = __webpack_require__(/*! ./generetePlacesList */ \"./src/functionality/generetePlacesList.ts\");\nconst generatePlacesCategoryBtn_1 = __webpack_require__(/*! ./generatePlacesCategoryBtn */ \"./src/functionality/generatePlacesCategoryBtn.ts\");\nconst filterPlaces_1 = __webpack_require__(/*! ./filterPlaces */ \"./src/functionality/filterPlaces.ts\");\nconst map_1 = __webpack_require__(/*! ./map */ \"./src/functionality/map.ts\");\nconst placeSearch = (0, getClosestPlacesByCoords_1.memoizedPlaceSearch)();\nconst submitForm = (event) => __awaiter(void 0, void 0, void 0, function* () {\n    event.preventDefault();\n    let nearestPlaces = null;\n    let displayMarkers;\n    if (event.target && event.target instanceof HTMLFormElement) {\n        const sendLocationBtn = event.target.querySelector('.send-location-btn');\n        const latitudeInput = document.getElementById('latitude');\n        const longitudeInput = document.getElementById('longitude');\n        if (latitudeInput && longitudeInput) {\n            const latitude = parseFloat(latitudeInput.value);\n            const longitude = parseFloat(longitudeInput.value);\n            if (isNaN(latitude) || isNaN(longitude)) {\n                alert('Invalid input. Please enter valid latitude and longitude.');\n                return;\n            }\n            if (sendLocationBtn && event.target.contains(sendLocationBtn)) {\n                try {\n                    nearestPlaces = yield placeSearch(latitude, longitude);\n                    const formElement = document.querySelector('.location-form-wrapper');\n                    if (formElement) {\n                        formElement.style.display = 'none';\n                        formElement.style.opacity = '0';\n                        formElement.style.visibility = 'hidden';\n                    }\n                    displayMarkers = (0, map_1.displayMarkersWrapper)(latitude, longitude);\n                    displayPlaces(nearestPlaces);\n                    displayMarkers(nearestPlaces);\n                }\n                catch (error) {\n                    console.error(error);\n                    alert('Error occurred while fetching places.');\n                }\n            }\n            else {\n                const { latitude, longitude } = (0, getUserLocation_1.getLocation)();\n                latitudeInput.value = latitude;\n                longitudeInput.value = longitude;\n            }\n            const filterBtns = document.querySelectorAll('.filter-btns button');\n            filterBtns.forEach(btn => {\n                btn.addEventListener('click', e => (0, filterPlaces_1.filterPlacesByCategory)(e, nearestPlaces, displayMarkers));\n            });\n        }\n    }\n});\nexports.submitForm = submitForm;\nconst getAllCategories = (arr) => {\n    return arr.reduce((acc, item) => {\n        const category = item.categories[0].name;\n        if (!acc.includes(category)) {\n            acc.push(category);\n        }\n        return acc;\n    }, []);\n};\nconst displayPlaces = (list) => {\n    const placesHTMLlist = (0, generetePlacesList_1.generetePlacesList)(list);\n    const placesCategoryFilterBtns = (0, generatePlacesCategoryBtn_1.generetePlacesCategoryBtns)(getAllCategories(list));\n    const placeListElement = document.querySelector('.place-list');\n    if (placeListElement) {\n        placeListElement.style.display = 'flex';\n        placeListElement.innerHTML += `\r\n        <div class=\"places-list-top\">\r\n            <h2>10 Nearest Places Next to You</h2>\r\n            <div class=\"filter-btns\">\r\n             <button>All</button>\r\n                ${placesCategoryFilterBtns.join('')}\r\n            </div>\r\n        </div>\r\n        `;\n        placeListElement.innerHTML += placesHTMLlist.join('');\n    }\n};\n\n\n//# sourceURL=webpack://new/./src/functionality/submitForm.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst submitForm_1 = __webpack_require__(/*! ./functionality/submitForm */ \"./src/functionality/submitForm.ts\");\nconst form = document.querySelector('.location-form');\nform === null || form === void 0 ? void 0 : form.addEventListener('submit', submitForm_1.submitForm);\n// navigator.geolocation.watchPosition(success, error)\n// function success(pos: any) {\n//     const lat = pos.coords.latitude\n//     const lon = pos.coords.longitude\n//     const accuracy = pos.coords.accuracy\n//     let marker = L.marker([lat, lon]).addTo(map)\n//     let circle = L.circle([lat, lon], { radius: accuracy }).addTo(map)\n//     map.fitBounds(circle.getBounds())\n// }\n// function error(err: any) {\n//     if (err.code === 1) {\n//         alert(\"Please give location access\")\n//     } else {\n//         alert('something went wrong')\n//     }\n// }\n\n\n//# sourceURL=webpack://new/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;