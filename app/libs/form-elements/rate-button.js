export default class RateButton {
  constructor(options) {

    this.elem = options.elem
    this.stars = Array.from(this.elem.children)
    this.activeStar = options.star.substring(1) + '_active'
    this.rate = 0

    this.initialized = false
  }

  init() {

    this.handlerEventListeners()

    this.initialized = true

    return this
  }

  handlerEventListeners() {

    this.stars.forEach((star, idx) => {

      star.addEventListener('click', (event) => {
        this.changeRate(idx)
      })
    })

  }

  changeRate(index) {
    this.rate = index + 1
    this.stars.forEach(star => star.classList.remove(this.activeStar))
    this.stars.filter((star, idx) => idx <= index).forEach(star => star.classList.add(this.activeStar))
  }



}