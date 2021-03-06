// Import jQuery module (npm i jquery)
import $ from 'jquery'
window.jQuery = $
window.$ = $


import Inputmask from 'inputmask'
import ionRangeSlider from 'ion-rangeslider'
import { Dropdown } from '~/app/libs/dropdown/dropdown'
import { LikeButton } from '~/app/libs/like/like-button'
import { RateButton } from '~/app/libs/rate/rate-button'
require('paginationjs')


// // Import vendor jQuery plugin example (not module)
// require('~/app/libs/mmenu/dist/mmenu.js')

// some variables

function test() {
  console.log('test')
}

window.test = test

const today = new Date()
const currentYear = today.getFullYear()
const currentDay = today.getDate()
const currentMonth = today.getMonth() + 1

document.addEventListener('DOMContentLoaded', () => {

  // dropdown init

  let dropdowns = Array.from(document.querySelectorAll('.dropdown'))

  dropdowns = dropdowns.map(dropdown => {
    return new Dropdown(dropdown, {
      placeholder: 'Сколько гостей',
      items: [
        {
          title: 'взрослые',
          min: 1,
          value: 2,
          titleForms: ['взрослый', 'взрослых', 'взрослых']
        },
        {
          title: 'Дети',
          max: 5,
          value: 1,
          titleForms: ['ребонок', 'ребонка', 'детей']
        },
        {
          title: 'Младенцы',
          max: 4,
          value: 0,
          titleForms: ['младенец', 'младенца', 'младенцев']
        }
      ]
    })
  })

  // like button init

  let likeButtons = Array.from(document.querySelectorAll('.like-button'))

  likeButtons = likeButtons.map(likeButton => {
    return new LikeButton(likeButton, {
      count: 22
    })
  })

  //  rate button init

  let rateButtons = Array.from(document.querySelectorAll('.rate-button'))

  rateButtons = rateButtons.map((rateButton, idx) => {
    return new RateButton(rateButton, {
      rate: 3,
      isFixed: idx > 0 ? true : false
    })
  })

  // Range slider init

  $('.range-slider').each(function () {

    const slider = $(this).find('input')
    const from = $(this).find('.range-slider__from')
    const to = $(this).find('.range-slider__to')

    slider.ionRangeSlider({
      type: 'double',
      step: 1000,
      min: 1000,
      max: 16000,
      min_interval: 2000,
      drag_interval: true,
      from: slider.data('from'),
      to: slider.data('to'),
      hide_min_max: true,
      hide_from_to: true,
      onStart: (data) => {
        from.text(data.from_pretty + '₽ - ')
        to.text(data.to_pretty + '₽')
      },
      onChange: (data) => {
        from.text(data.from_pretty + '₽ - ')
        to.text(data.to_pretty + '₽')
      }
    })
  })


  // Pagination

  $('.pagination').pagination({
    dataSource: function (done) {
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
