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

/***/ "./src/Observer/MapObserver.ts":
/*!*************************************!*\
  !*** ./src/Observer/MapObserver.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.MapObserver = void 0;\nconst map_1 = __webpack_require__(/*! ../functionality/map */ \"./src/functionality/map.ts\");\nclass MapObserver {\n    constructor(latitude, longitude) {\n        this.L = window.L;\n        this.latitude = latitude;\n        this.longitude = longitude;\n        this.map = this.L.map('map').setView([latitude, longitude], 14);\n        this.L.marker([this.latitude, this.longitude], {\n            title: 'You',\n            icon: this.L.icon({\n                iconUrl: 'https://i.pinimg.com/originals/0f/61/ba/0f61ba72e0e12ba59d30a50295964871.png',\n                iconSize: [70, 70]\n            })\n        }).bindPopup('<h2>You</h2>').addTo(this.map);\n    }\n    update(subject) {\n        const { data } = subject.getState();\n        (0, map_1.displayMarkers)(this.L, this.map, data);\n    }\n}\nexports.MapObserver = MapObserver;\n\n\n//# sourceURL=webpack://new/./src/Observer/MapObserver.ts?");

/***/ }),

/***/ "./src/Observer/Subject.ts":
/*!*********************************!*\
  !*** ./src/Observer/Subject.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.subject = void 0;\nclass AppSubject {\n    constructor() {\n        this.state = { data: [], error: null };\n        this.observers = [];\n    }\n    getState() {\n        return this.state;\n    }\n    subscribeObserver(observer) {\n        const isExist = this.observers.includes(observer);\n        if (isExist) {\n            throw new Error('Observer has already been subscribe');\n        }\n        this.observers.push(observer);\n    }\n    unsubscribeObserver(observer) {\n        const observerIndex = this.observers.indexOf(observer);\n        if (observerIndex > -1) {\n            this.observers.splice(observerIndex, 1);\n        }\n        else {\n            console.log('Observer doesn`t exist');\n        }\n    }\n    notifyObservers() {\n        for (const observer of this.observers) {\n            observer.update(this);\n        }\n    }\n    updateState(newState) {\n        this.state = newState;\n        this.notifyObservers();\n    }\n}\nexports.subject = new AppSubject();\n\n\n//# sourceURL=webpack://new/./src/Observer/Subject.ts?");

/***/ }),

/***/ "./src/functionality/filterPlaces.ts":
/*!*******************************************!*\
  !*** ./src/functionality/filterPlaces.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.filterPlacesByCategory = void 0;\nconst filterPlacesByCategory = (event, placeList) => {\n    const placesElements = document.querySelectorAll('.place-item');\n    const copyArr = [...placeList];\n    if (event && event.target) {\n        const target = event.target;\n        const category = target.innerText.split(' ')[0];\n        let index = 0;\n        placesElements.forEach((place) => {\n            if (category === 'All') {\n                place.classList.remove('hidden');\n            }\n            else {\n                if (place.classList.contains(category)) {\n                    place.classList.remove('hidden');\n                }\n                else {\n                    place.classList.add('hidden');\n                    copyArr.splice(index, 1);\n                    index--;\n                }\n            }\n            index++;\n        });\n        return copyArr;\n    }\n    return [];\n};\nexports.filterPlacesByCategory = filterPlacesByCategory;\n\n\n//# sourceURL=webpack://new/./src/functionality/filterPlaces.ts?");

/***/ }),

/***/ "./src/functionality/generatePlacesCategoryBtn.ts":
/*!********************************************************!*\
  !*** ./src/functionality/generatePlacesCategoryBtn.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.generatePlacesCategoryBtns = void 0;\nfunction generatePlacesCategoryBtns(list) {\n    return list.map((item) => (`<button class=\"category ${item.split(' ')[0]}\">${item}</button>`));\n}\nexports.generatePlacesCategoryBtns = generatePlacesCategoryBtns;\n\n\n//# sourceURL=webpack://new/./src/functionality/generatePlacesCategoryBtn.ts?");

/***/ }),

/***/ "./src/functionality/generatePlacesList.ts":
/*!*************************************************!*\
  !*** ./src/functionality/generatePlacesList.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.generetePlacesList = void 0;\nconst generetePlacesList = (list) => {\n    return list.map((item) => (` \r\n        <div class=\"place-item ${item.categories[0].name.split(' ')[0]}\">\r\n            <div class=\"place-item-info\">\r\n                <h3>${item.name}</h3>\r\n                <p class=\"categoty\">${item.categories[0].name}</p>\r\n                <p class=\"location\"><i class=\"fa-solid fa-location-dot\"></i> ${item.location.formattedAddress}</p>\r\n                <p class=\"distance\"><i class=\"fa-solid fa-person-walking\"></i> ${item.distanceToPlace} meters away</p>\r\n            </div>\r\n        </div>\r\n    `));\n};\nexports.generetePlacesList = generetePlacesList;\n\n\n//# sourceURL=webpack://new/./src/functionality/generatePlacesList.ts?");

/***/ }),

/***/ "./src/functionality/getClosestPlacesByCoords.ts":
/*!*******************************************************!*\
  !*** ./src/functionality/getClosestPlacesByCoords.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.memoizedPlaceSearch = exports.calculateDistance = exports.placeSearch = void 0;\nconst snakeToCamel_1 = __webpack_require__(/*! ./snakeToCamel */ \"./src/functionality/snakeToCamel.ts\");\nconst RADIUS = 100;\nconst MAX_ATTEMPTS = 25;\nconst MIN_PLACES = 10;\nfunction placeSearch(latitude, longitude) {\n    var _a;\n    return __awaiter(this, void 0, void 0, function* () {\n        try {\n            let allPlaces = {};\n            let i = 1;\n            do {\n                const searchParams = new URLSearchParams({\n                    ll: `${latitude},${longitude}`,\n                    radius: `${RADIUS * i}`,\n                });\n                const response = yield fetch(`https://api.foursquare.com/v3/places/search?${searchParams}`, {\n                    method: 'GET',\n                    headers: {\n                        Accept: 'application/json',\n                        Authorization: 'fsq3C1EEWYk0pgVweHJQ0mELQHwD+jCkfg5zE4y5LV5T/x0=',\n                    }\n                });\n                if (!response.ok) {\n                    throw new Error(\"Fetch places error!\");\n                }\n                const data = yield response.json();\n                const places = data.results;\n                places.forEach((place) => {\n                    if (!allPlaces[place.fsq_id]) {\n                        allPlaces[place.fsq_id] = place;\n                    }\n                });\n                i++;\n            } while ((_a = Object.keys(allPlaces).length <= MIN_PLACES) !== null && _a !== void 0 ? _a : i <= MAX_ATTEMPTS);\n            if (Object.keys(allPlaces).length < MIN_PLACES) {\n                throw new Error('There is no 10 places that is near you');\n            }\n            const placesWithDistance = Object.values(allPlaces).map((item) => (Object.assign(Object.assign({}, item), { distanceToPlace: Math.trunc((0, exports.calculateDistance)(latitude, longitude, item.geocodes.main.latitude, item.geocodes.main.longitude)) })));\n            return placesWithDistance.sort((a, b) => a.distanceToPlace - b.distanceToPlace).slice(0, 10).map(snakeToCamel_1.snakeToCamel);\n        }\n        catch (err) {\n            console.error(err);\n        }\n    });\n}\nexports.placeSearch = placeSearch;\nconst calculateDistance = (latitude, longitude, placeLatitude, placeLongitude) => {\n    const radiusEarthKm = 6371;\n    const diffLat = (placeLatitude - latitude) * (Math.PI / 180);\n    const diffLon = (placeLongitude - longitude) * (Math.PI / 180);\n    const a = 0.5 - Math.cos(diffLat) / 2 +\n        Math.cos(latitude * (Math.PI / 180)) * Math.cos(placeLatitude * (Math.PI / 180)) * (1 - Math.cos(diffLon)) / 2;\n    return radiusEarthKm * 2 * Math.asin(Math.sqrt(a)) * 1000;\n};\nexports.calculateDistance = calculateDistance;\nconst memoizedPlaceSearch = (latitude, longitude) => __awaiter(void 0, void 0, void 0, function* () {\n    const cacheKey = 'placeSearchCache';\n    const cachedData = localStorage.getItem(cacheKey);\n    const cache = cachedData ? new Map(JSON.parse(cachedData)) : new Map();\n    const key = `${latitude}:${longitude}`;\n    for (const [key, result] of cache.entries()) {\n        const [cachedLat, cachedLon] = key.split(':').map(parseFloat);\n        const distance = (0, exports.calculateDistance)(latitude, longitude, cachedLat, cachedLon);\n        if (distance <= 50) {\n            return result;\n        }\n    }\n    if (cache.has(key)) {\n        return cache.get(key);\n    }\n    const result = yield placeSearch(latitude, longitude);\n    cache.set(key, result);\n    localStorage.setItem(cacheKey, JSON.stringify(Array.from(cache.entries())));\n    return result;\n});\nexports.memoizedPlaceSearch = memoizedPlaceSearch;\n\n\n//# sourceURL=webpack://new/./src/functionality/getClosestPlacesByCoords.ts?");

/***/ }),

/***/ "./src/functionality/getUserLocation.ts":
/*!**********************************************!*\
  !*** ./src/functionality/getUserLocation.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getLocation = void 0;\nfunction getLocation() {\n    return new Promise((resolve, reject) => {\n        if (navigator.geolocation) {\n            navigator.geolocation.getCurrentPosition(position => resolve(showPosition(position)), error => showError(error));\n        }\n        else {\n            console.log(\"Geolocation is not supported by this browser.\");\n            reject(new Error(\"Geolocation is not supported\"));\n        }\n    });\n}\nexports.getLocation = getLocation;\nfunction showPosition(position) {\n    const latitude = position.coords.latitude;\n    const longitude = position.coords.longitude;\n    return { latitude, longitude };\n}\nfunction showError(error) {\n    switch (error.code) {\n        case error.PERMISSION_DENIED:\n            console.log(\"User denied the request for Geolocation.\");\n            break;\n        case error.POSITION_UNAVAILABLE:\n            console.log(\"Location information is unavailable.\");\n            break;\n        case error.TIMEOUT:\n            console.log(\"The request to get user location timed out.\");\n            break;\n    }\n}\n\n\n//# sourceURL=webpack://new/./src/functionality/getUserLocation.ts?");

/***/ }),

/***/ "./src/functionality/map.ts":
/*!**********************************!*\
  !*** ./src/functionality/map.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.displayMarkers = void 0;\nconst displayMarkers = (L, map, list) => {\n    let markersArray = [];\n    map.eachLayer((layer) => {\n        if (layer instanceof L.Marker && layer.options.title && layer.options.title !== 'You') {\n            markersArray.push(layer);\n        }\n    });\n    if (markersArray.length) {\n        for (let i = 0; i < markersArray.length; i++) {\n            map.removeLayer(markersArray[i]);\n        }\n        markersArray = [];\n    }\n    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {\n        maxZoom: 19,\n        attribution: '&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a>'\n    }).addTo(map);\n    list.forEach((place) => {\n        const marker = L.marker([place.geocodes.main.latitude, place.geocodes.main.longitude], {\n            title: place.name,\n        }).bindPopup(generatePopup(place.name, place.location.address, place.distanceToPlace)).addTo(map);\n        markersArray.push(marker);\n    });\n};\nexports.displayMarkers = displayMarkers;\nfunction generatePopup(name, address, distance) {\n    return `\r\n        <div class=\"popup\">\r\n            <h4>${name}</h4>\r\n            <p><i class=\"fa-solid fa-location-dot\"></i> ${address}</p>\r\n            <p><i class=\"fa-solid fa-person-walking\"></i> ${distance} meters away</p>\r\n        </div>\r\n    `;\n}\n\n\n//# sourceURL=webpack://new/./src/functionality/map.ts?");

/***/ }),

/***/ "./src/functionality/snakeToCamel.ts":
/*!*******************************************!*\
  !*** ./src/functionality/snakeToCamel.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.snakeToCamel = void 0;\nconst isObject = (obj) => {\n    return obj !== null && typeof obj === 'object';\n};\nconst snakeKeyToCamel = (str) => {\n    return str.split('_')\n        .map((word, index) => !index ? word : word[0].toUpperCase() + word.slice(1))\n        .join('');\n};\nconst snakeToCamel = (obj) => {\n    const camelCaseObj = {};\n    for (const key in obj) {\n        if (obj.hasOwnProperty(key)) {\n            const value = obj[key];\n            const camelCaseKey = snakeKeyToCamel(key);\n            if (isObject(value)) {\n                camelCaseObj[camelCaseKey] = (0, exports.snakeToCamel)(value);\n            }\n            else if (Array.isArray(value)) {\n                value.forEach(elem => {\n                    if (isObject(elem)) {\n                        snakeKeyToCamel(elem);\n                    }\n                });\n            }\n            else {\n                camelCaseObj[camelCaseKey] = value;\n            }\n        }\n    }\n    return camelCaseObj;\n};\nexports.snakeToCamel = snakeToCamel;\n\n\n//# sourceURL=webpack://new/./src/functionality/snakeToCamel.ts?");

/***/ }),

/***/ "./src/functionality/submitForm.ts":
/*!*****************************************!*\
  !*** ./src/functionality/submitForm.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.displayPlaces = exports.findUserLocation = exports.submitForm = void 0;\nconst getUserLocation_1 = __webpack_require__(/*! ./getUserLocation */ \"./src/functionality/getUserLocation.ts\");\nconst getClosestPlacesByCoords_1 = __webpack_require__(/*! ./getClosestPlacesByCoords */ \"./src/functionality/getClosestPlacesByCoords.ts\");\nconst generatePlacesList_1 = __webpack_require__(/*! ./generatePlacesList */ \"./src/functionality/generatePlacesList.ts\");\nconst generatePlacesCategoryBtn_1 = __webpack_require__(/*! ./generatePlacesCategoryBtn */ \"./src/functionality/generatePlacesCategoryBtn.ts\");\nconst filterPlaces_1 = __webpack_require__(/*! ./filterPlaces */ \"./src/functionality/filterPlaces.ts\");\nconst Subject_1 = __webpack_require__(/*! ../Observer/Subject */ \"./src/Observer/Subject.ts\");\nconst MapObserver_1 = __webpack_require__(/*! ../Observer/MapObserver */ \"./src/Observer/MapObserver.ts\");\nconst submitForm = (event) => __awaiter(void 0, void 0, void 0, function* () {\n    event.preventDefault();\n    let nearestPlaces = [];\n    if (event.target && event.target instanceof HTMLFormElement) {\n        const sendLocationBtn = event.target.querySelector('.send-location-btn');\n        const latitudeInput = document.getElementById('latitude');\n        const longitudeInput = document.getElementById('longitude');\n        const formElement = document.querySelector('.location-form-wrapper');\n        const errorElement = document.querySelector('.error-block');\n        if (latitudeInput && longitudeInput) {\n            const latitude = parseFloat(latitudeInput.value);\n            const longitude = parseFloat(longitudeInput.value);\n            if (sendLocationBtn && event.target.contains(sendLocationBtn)) {\n                sendLocationBtn.innerText = 'Loading...';\n                try {\n                    if (isNaN(latitude) || isNaN(longitude)) {\n                        if (errorElement) {\n                            errorElement.style.display = 'block';\n                        }\n                        return;\n                    }\n                    nearestPlaces = yield (0, getClosestPlacesByCoords_1.memoizedPlaceSearch)(latitude, longitude);\n                    if (formElement) {\n                        formElement.style.display = 'none';\n                        formElement.style.opacity = '0';\n                        formElement.style.visibility = 'hidden';\n                    }\n                    const mapObserver = new MapObserver_1.MapObserver(latitude, longitude);\n                    Subject_1.subject.subscribeObserver(mapObserver);\n                    (0, exports.displayPlaces)(nearestPlaces);\n                    Subject_1.subject.updateState({ data: nearestPlaces, error: null });\n                }\n                catch (error) {\n                    console.error(error);\n                    Subject_1.subject.updateState({ data: [], error: error });\n                }\n            }\n            const filterBtnsContainer = document.querySelector('.filter-btns');\n            if (filterBtnsContainer) {\n                filterBtnsContainer.addEventListener('click', (e) => {\n                    let resultArr = [];\n                    const target = e.target;\n                    if (target && target.tagName === 'BUTTON') {\n                        resultArr = (0, filterPlaces_1.filterPlacesByCategory)(e, nearestPlaces);\n                        Subject_1.subject.updateState({ data: resultArr, error: null });\n                    }\n                });\n            }\n        }\n    }\n});\nexports.submitForm = submitForm;\nconst findUserLocation = (e) => __awaiter(void 0, void 0, void 0, function* () {\n    e.preventDefault();\n    const { latitude, longitude } = yield (0, getUserLocation_1.getLocation)();\n    const latitudeInput = document.getElementById('latitude');\n    const longitudeInput = document.getElementById('longitude');\n    if (latitudeInput && longitudeInput) {\n        latitudeInput.value = `${latitude}`;\n        longitudeInput.value = `${longitude}`;\n    }\n});\nexports.findUserLocation = findUserLocation;\nconst getAllCategories = (arr) => {\n    return arr.reduce((acc, item) => {\n        const category = item.categories[0].name;\n        if (!acc.includes(category)) {\n            acc.push(category);\n        }\n        return acc;\n    }, []);\n};\nconst displayPlaces = (list) => {\n    const placesHTMLlist = (0, generatePlacesList_1.generetePlacesList)(list);\n    const placesCategoryFilterBtns = (0, generatePlacesCategoryBtn_1.generatePlacesCategoryBtns)(getAllCategories(list));\n    const placeListElement = document.querySelector('.place-list');\n    if (placeListElement) {\n        placeListElement.style.display = 'flex';\n        placeListElement.innerHTML += `\r\n        <div class=\"places-list-top\">\r\n            <h2>10 Nearest Places Next to You</h2>\r\n            <div class=\"filter-btns\">\r\n             <button>All</button>\r\n                ${placesCategoryFilterBtns.join('')}\r\n            </div>\r\n        </div>\r\n        `;\n        placeListElement.innerHTML += placesHTMLlist.join('');\n    }\n};\nexports.displayPlaces = displayPlaces;\n\n\n//# sourceURL=webpack://new/./src/functionality/submitForm.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst submitForm_1 = __webpack_require__(/*! ./functionality/submitForm */ \"./src/functionality/submitForm.ts\");\nconst form = document.querySelector('.location-form');\nform === null || form === void 0 ? void 0 : form.addEventListener('submit', submitForm_1.submitForm);\nconst findUserLocationButton = document.querySelector('.find-location-button');\nfindUserLocationButton === null || findUserLocationButton === void 0 ? void 0 : findUserLocationButton.addEventListener('click', submitForm_1.findUserLocation);\n\n\n//# sourceURL=webpack://new/./src/index.ts?");

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