// Import jQuery module (npm i jquery)
import $ from 'jquery'
window.jQuery = $
window.$ = $


import Inputmask from 'inputmask'
import ionRangeSlider from 'ion-rangeslider'
require('paginationjs')


// // Import vendor jQuery plugin example (not module)
// require('~/app/libs/mmenu/dist/mmenu.js')

// some variables

const today = new Date()
const currentYear = today.getFullYear()
const currentDay = today.getDate()
const currentMonth = today.getMonth() + 1

document.addEventListener('DOMContentLoaded', () => {



	// Range slider

	$('#example_id').ionRangeSlider({
		type: 'double',
		step: 100,
		min: 100,
		max: 16000,
		from: 5000,
		to: 10000,
		hide_min_max: true,
		hide_from_to: true,
	})

	// Pagination

	$('.input-wrapper__pagination').pagination({
		dataSource: function(done){
			var result = [];
			for (var i = 1; i < 110; i++) {
					result.push(i);
			}
			done(result);
	 },
		pageSize: 5,
		pageRange: 1,
		autoHidePrevious: true,
		autoHideNext: true,
	})

	// Masks

	const inputDate = document.querySelectorAll('input[name="maskedDate"]')
	const inputEmail = document.querySelectorAll('input[name="maskedEmail"]')

	inputDate.forEach(el => {
		el.value = `${currentDay < 10 ? '0' + currentDay : currentDay}.${currentMonth < 10 ? '0' + currentMonth : currentMonth}.${currentYear}`
		Inputmask({
			alias: 'datetime',
			inputFormat: 'dd.mm.yyyy',
			min: `${currentDay < 10 ? '0' + currentDay : currentDay}.${currentMonth < 10 ? '0' + currentMonth : currentMonth}.${currentYear}`,
			max: `31.12.${currentYear + 1}`,
			placeholder: '_',
			prefillYear: false
		}).mask(el)
	})

	inputEmail.forEach(el => {
		Inputmask({
			alias: 'email',
		}).mask(el)
	})




})
