export default class LikeButton {
  constructor(options) {

    this.elem = options.elem
    this.counter = options.elem.querySelector(options.counter)

    this.initialized = false
  }

  init() {



    this.handlerEventListeners()

    this.initialized = true


  }

  handlerEventListeners() {

    this.elem.addEventListener('click', (event) => {
      this.toggle()
    })

  }

  toggle() {
    if (this.elem.classList.contains('input-wrapper__like-button_active')) {
      this.counter.innerText--
    } else {
      this.counter.innerText++
    }
    this.elem.classList.toggle('input-wrapper__like-button_active')
  }

}