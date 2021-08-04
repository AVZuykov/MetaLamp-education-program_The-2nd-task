function getTemplate(options) {
  const rate = options.rate
  let star = ''
  for (let index = 0; index < 5; index++) {
    star += `<div 
      class="rate-button__star ${(index + 1) <= rate ? 'active' : ''}" 
      data-id=${index}
      ></div>
    `
  }
  return star
}
export class RateButton {
  constructor(selector, options) {

    this.elem = selector

    this.options = options

    this.#render()
    this.#setup()
  }

  #render() {
    this.elem.classList.add(this.options.isFixed && 'rate-button_fixed', 'rate-button')
    this.elem.innerHTML = getTemplate(this.options)
  }

  #setup() {

    if (!this.options.isFixed) {

      this.clickHandler = this.clickHandler.bind(this)

      this.elem.addEventListener('click', this.clickHandler)

    }

    this.stars = Array.from(this.elem.querySelectorAll('.rate-button__star'))

    this.rate = this.options.rate


  }

  clickHandler(event) {
    const { id } = event.target.dataset
    this.rate = id + 1
    this.renderStars(id)
  }

  renderStars(id) {
    this.stars.forEach(star => star.classList.remove('active'))
    this.stars.filter((_, idx) => idx <= id).forEach(star => star.classList.add('active'))
  }
}