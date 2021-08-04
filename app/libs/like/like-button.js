function getTemplate(options) {
  return `
  <div class="like-button">
    <span class="like-button__counter">${options.count}</span>
  </div>
  `
}

export class LikeButton {
  constructor(selector, options) {

    this.elem = selector

    this.options = options

    this.#render()
    this.#setup()
  }

  #render() {
    this.elem.classList.add('like-button')
    this.elem.innerHTML = getTemplate(this.options)
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this)

    this.isActive = false

    this.counter = this.elem.querySelector('.like-button__counter')

    this.count = this.counter.textContent

    this.elem.addEventListener('click', this.clickHandler)
  }

  clickHandler() {
    if (!this.isActive) {
      this.count++
    } else {
      this.count--
    }

    this.isActive = !this.isActive
    this.render()
  }

  render() {
    this.counter.innerText = this.count
    this.elem.classList.toggle('like-button_active')
  }

}