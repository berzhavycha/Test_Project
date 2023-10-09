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

/***/ "./src/functionality/getClosestPlacesByCoords.ts":
/*!*******************************************************!*\
  !*** ./src/functionality/getClosestPlacesByCoords.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.placeSearch = void 0;\nfunction placeSearch(latitude, longitude) {\n    return __awaiter(this, void 0, void 0, function* () {\n        try {\n            let places = null;\n            let i = 1;\n            do {\n                const searchParams = new URLSearchParams({\n                    query: 'coffee',\n                    ll: `${latitude},${longitude}`,\n                    open_now: 'true',\n                    sort: 'DISTANCE',\n                    radius: `${22000 * i}`\n                });\n                const results = yield fetch(`https://api.foursquare.com/v3/places/search?${searchParams}`, {\n                    method: 'GET',\n                    headers: {\n                        Accept: 'application/json',\n                        Authorization: 'fsq3C1EEWYk0pgVweHJQ0mELQHwD+jCkfg5zE4y5LV5T/x0=',\n                    }\n                });\n                const data = yield results.json();\n                places = data.results;\n                console.log(places);\n                i++;\n            } while ((places === null || places === void 0 ? void 0 : places.length) < 10);\n            const nearestPlace = findNearesPlace(places, latitude, longitude);\n            return nearestPlace;\n        }\n        catch (err) {\n            console.error(err);\n        }\n    });\n}\nexports.placeSearch = placeSearch;\nconst calculateDistance = (latitude, longitude, placeLatitude, placeLongitude) => {\n    const radiusEarthKm = 6371;\n    const diffLat = (placeLatitude - latitude) * (Math.PI / 180);\n    const diffLon = (placeLongitude - longitude) * (Math.PI / 180);\n    const a = 0.5 - Math.cos(diffLat) / 2 +\n        Math.cos(latitude * (Math.PI / 180)) * Math.cos(placeLatitude * (Math.PI / 180)) * (1 - Math.cos(diffLon)) / 2;\n    return radiusEarthKm * 2 * Math.asin(Math.sqrt(a));\n};\nconst findNearesPlace = (places, latitude, longitude) => {\n    let nearestPlace = null;\n    let minDistance = Number.MAX_VALUE;\n    places.forEach(place => {\n        const placeLatitude = place.geocodes.main.latitude;\n        const placeLongitude = place.geocodes.main.longitude;\n        const distance = calculateDistance(latitude, longitude, placeLatitude, placeLongitude);\n        if (distance < minDistance) {\n            minDistance = distance;\n            nearestPlace = place;\n        }\n    });\n    return nearestPlace;\n};\n\n\n//# sourceURL=webpack://new/./src/functionality/getClosestPlacesByCoords.ts?");

/***/ }),

/***/ "./src/functionality/getUserLocation.ts":
/*!**********************************************!*\
  !*** ./src/functionality/getUserLocation.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getLocation = void 0;\nfunction getLocation() {\n    if (navigator.geolocation) {\n        return navigator.geolocation.getCurrentPosition(showPosition, showError);\n    }\n    else {\n        console.log(\"Geolocation is not supported by this browser.\");\n    }\n}\nexports.getLocation = getLocation;\nfunction showPosition(position) {\n    const latitude = position.coords.latitude;\n    const longitude = position.coords.longitude;\n    return { latitude, longitude };\n}\nfunction showError(error) {\n    switch (error.code) {\n        case error.PERMISSION_DENIED:\n            console.log(\"User denied the request for Geolocation.\");\n            break;\n        case error.POSITION_UNAVAILABLE:\n            console.log(\"Location information is unavailable.\");\n            break;\n        case error.TIMEOUT:\n            console.log(\"The request to get user location timed out.\");\n            break;\n    }\n}\n\n\n//# sourceURL=webpack://new/./src/functionality/getUserLocation.ts?");

/***/ }),

/***/ "./src/functionality/submitForm.ts":
/*!*****************************************!*\
  !*** ./src/functionality/submitForm.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.submitForm = void 0;\nconst getUserLocation_1 = __webpack_require__(/*! ./getUserLocation */ \"./src/functionality/getUserLocation.ts\");\nconst getClosestPlacesByCoords_1 = __webpack_require__(/*! ./getClosestPlacesByCoords */ \"./src/functionality/getClosestPlacesByCoords.ts\");\nconst submitForm = (event) => __awaiter(void 0, void 0, void 0, function* () {\n    event.preventDefault();\n    if (event.target && event.target instanceof HTMLFormElement) {\n        const sendLocationBtn = event.target.querySelector('.send-location-btn');\n        if (sendLocationBtn && event.target.contains(sendLocationBtn)) {\n            const latitudeInput = document.getElementById('latitude');\n            const longitudeInput = document.getElementById('longitude');\n            if (latitudeInput && longitudeInput) {\n                const latitude = parseFloat(latitudeInput.value);\n                const longitude = parseFloat(longitudeInput.value);\n                if (isNaN(latitude) || isNaN(longitude)) {\n                    alert('Invalid input. Please enter valid latitude and longitude.');\n                    return;\n                }\n                try {\n                    const nearestPlaces = yield (0, getClosestPlacesByCoords_1.placeSearch)(latitude, longitude);\n                    console.log(nearestPlaces);\n                }\n                catch (error) {\n                    console.error(error);\n                    alert('Error occurred while fetching places.');\n                }\n            }\n        }\n        else {\n            const { latitude, longitude } = (0, getUserLocation_1.getLocation)();\n            const nearestPlaces = yield (0, getClosestPlacesByCoords_1.placeSearch)(latitude, longitude);\n            console.log(nearestPlaces);\n        }\n    }\n});\nexports.submitForm = submitForm;\n\n\n//# sourceURL=webpack://new/./src/functionality/submitForm.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst submitForm_1 = __webpack_require__(/*! ./functionality/submitForm */ \"./src/functionality/submitForm.ts\");\nconst form = document.querySelector('.location-form');\nform === null || form === void 0 ? void 0 : form.addEventListener('submit', submitForm_1.submitForm);\n\n\n//# sourceURL=webpack://new/./src/index.ts?");

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