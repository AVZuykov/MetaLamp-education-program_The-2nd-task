export default class Dropdown {
  constructor(elem) {

    this.initialized = false

    // elems

    this.elem = elem
    this.dropdownField = this.elem.querySelector('.input-wrapper__field_dropdown')
    this.options = Array.from(this.elem.querySelectorAll('.dropdown-select__option'))
    this.isShowTotal = this.elem.querySelector('.showTotal')

    // states
    
    this.defaultState = defaultState(this.options)
    this.state = this.defaultState.map(a => ({ ...a }))
    this.draftState = []
  }

  init() {

    this.handlerEventListeners(this.elem)

    // set initialized to `true`
    this.initialized = true

    return this
  }

  handlerEventListeners(elem) {

    // Выпадание и схлопывание

    this.dropdownField.addEventListener('click', (event) => {
      this.toggleDropdown()
    })

    document.addEventListener('click', (event) => {

      const ddElem = event.target.closest('.input-wrapper_dropdown')

      if (!ddElem || ddElem !== this.elem) {
        this.toggleDropdown('close')
      }
    })

    // Изменение кол-ва и его сохранение

    const acceptBtn = elem.querySelector('.dropdown-select__accept')
    const clearBtn = elem.querySelector('.dropdown-select__clear')

    this.options.forEach((option, idx) => {
      const counterElements = option.querySelector('.dropdown-select__counter').children

      this.count(counterElements, idx)
    })

    // Сброс состояния

    clearBtn.addEventListener('click', (event) => {
      this.default()
    })

    // Сохранить изменения

    acceptBtn.addEventListener('click', (event) => {
      this.save()
    })

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
      this.dropdownField.classList.toggle('input-wrapper__field_dropdown-active')
    } else
      this.dropdownField.classList.remove('input-wrapper__field_dropdown-active')
  }

  // Изменить draftState и визуальную часть dropdawn

  count(elements, index) {

    const minus = elements[0]
    const total = elements[1]
    const plus  = elements[2]


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

      const total = option.querySelector('.dropdown-select__total')

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

    const title = option.querySelector('.dropdown-select__title').innerText
    const total = option.querySelector('.dropdown-select__total').innerText

    state.push({ title, total })

  })

  return state
}