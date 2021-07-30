export default class Dropdown {
  constructor(options) {


    this.elem = options.elem


    // serch elems

    this.dropdownField = this.elem.querySelector(options.field)
    this.acceptBtn = this.elem.querySelector(options.acceptBtn)
    this.clearBtn = this.elem.querySelector(options.clearBtn)
    this.options = Array.from(this.elem.querySelectorAll(options.option))

    this.counter = options.counter

    this.dropdownActiveClassField = options.field.substring(1) + '_active'

    // other settings 

    this.isShowTotal = options.isShowTotal
    this.initialized = false

    // states

    this.defaultState = defaultState(this.options)
    this.state = this.defaultState.map(a => ({ ...a }))
    this.draftState = []
  }

  init() {

    this.handlerEventListeners(this.elem)

    this.initialized = true

    return this
  }

  handlerEventListeners(elem) {

    // Выпадание и схлопывание

    this.dropdownField.addEventListener('click', (event) => {
      this.toggleDropdown()
    })

    document.addEventListener('click', (event) => {

      const ddElem = event.target.closest('.dropdown')

      if (!ddElem || ddElem !== this.elem) {
        this.toggleDropdown('close')
      }
    })

    // Изменение кол-ва и его сохранение

    this.options.forEach((option, idx) => {
      const counterElements = option.querySelector(this.counter).children

      this.count(counterElements, idx)
    })

    if (this.acceptBtn && this.clearBtn) {
      
      // Сброс состояния

      this.clearBtn.addEventListener('click', (event) => {
        this.default()
      })

      // Сохранить изменения

      this.acceptBtn.addEventListener('click', (event) => {
        this.save()
      })
    }

  }

  // Показывать выбранное

  showTotal(isShow = false) {
    if (isShow) {

      let text = ''

      this.state.forEach(el => {
        text = `${text}${!text ? '' : ','} ${el.total} ${el.title}`
      })

      this.dropdownField.innerText = text.length > 31 ? text.toLowerCase().slice(0, 31) + '...' : text.toLowerCase()
    }
  }

  // Открыть закрыть

  toggleDropdown(close = false) {
    if (!close) {
      this.dropdownField.classList.toggle(this.dropdownActiveClassField)
    }
    else
      this.dropdownField.classList.remove(this.dropdownActiveClassField)
  }

  // Изменить draftState и визуальную часть dropdawn

  count(elements, index) {

    const minus = elements[0]
    const total = elements[1]
    const plus = elements[2]


    minus.addEventListener('click', (event) => {
      if (total.innerText >= 1) {
        total.innerText--
        this.draftState[index] = total.innerText
      }
    })

    plus.addEventListener('click', (event) => {
      if (total.innerText <= 29) {
        total.innerText++
        this.draftState[index] = total.innerText
      }
    })
  }

  // Приведение dropdown в исходное состояние

  default() {

    this.draftState = []

    this.state = this.defaultState.map(a => ({ ...a }))

    this.options.forEach((option, idx) => {

      const total = option.querySelector(this.counter).children[1]

      total.innerText = this.defaultState[idx]['total']
    })

    this.showTotal(this.isShowTotal)
  }

  // Сохранине

  save() {
    this.draftState.forEach((el, idx) => {
      if (el !== null) {
        this.state[idx]['total'] = el
      }
    })
    this.toggleDropdown('close')
    this.showTotal(this.isShowTotal)
  }

}

function defaultState(options) {

  const state = []

  options.forEach(option => {

    const title = option.querySelector('.dropdown__option-title').innerText
    const total = option.querySelector('.dropdown__counter-total').innerText

    state.push({ title, total })

  })

  return state
}