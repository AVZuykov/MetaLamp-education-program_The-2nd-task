export default class LikeButton {
  constructor(options) {

    this.elem = options.elem
    this.counter = options.elem.querySelector(options.counter)

    this.total = this.counter.innerText
    this.initialized = false
  }

  init() {

    this.handlerEventListeners()

    this.initialized = true

    return this
  }

  handlerEventListeners() {

    this.elem.addEventListener('click', (event) => {
      this.toggle()
    })

  }

  toggle() {
    if (this.elem.classList.contains('input-wrapper__like-button_active')) {
      this.total--
    } else {
      this.total++
    }
    this.render()
  }

  render() {
    this.counter.innerText = this.total
    this.elem.classList.toggle('input-wrapper__like-button_active')
  }

}