// // Import jQuery module (npm i jquery)
// import $ from 'jquery'
// window.jQuery = $
// window.$ = $

import Inputmask from 'inputmask'

// // Import vendor jQuery plugin example (not module)
// require('~/app/libs/mmenu/dist/mmenu.js')

const today = new Date()

const currentYear = today.getFullYear()
const currentDay = today.getDate()
const currentMonth = today.getMonth() + 1

document.addEventListener('DOMContentLoaded', () => {

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
    }).mask(el)
  })

  inputEmail.forEach(el => {
    Inputmask({
      alias: 'email',
    }).mask(el)
  })




})
