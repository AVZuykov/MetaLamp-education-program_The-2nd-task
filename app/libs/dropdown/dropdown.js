
function getTemplate(items, placeholder) {

  const dropdownItems = items.map((item, idx) => {
    const min = item.min ?? 0
    const max = item.max ?? 15
    const isActiveButton = +item.value === +min ? 'disable' : ''
    return `
    <li class="dropdown__option" 
      data-type="option" 
      data-id="${idx}" 
      data-max="${max}" 
      data-min="${min}">
      <span class="dropdown__option-title">${item.title}</span>
      <div class="dropdown__option-counter">
        <button class="dropdown__counter-minus-button ${isActiveButton}" type="button" data-type="minusBtn">-</button>
        <b class="dropdown__counter-total" data-type="counter"> ${item.value}</b>
        <button class="dropdown__counter-plus-button" type="button" data-type="plusBtn">+</button>
      </div>
    </li>
  `})

  return `
    <div class="dropdown__field" data-type="field">${placeholder ?? 'Укажите кол-во'}</div>
    <ul class="dropdown__select">
      ${dropdownItems.join('')}
      <li class="dropdown__controls-buttons"> 
        <button class="dropdown__clear-button" disabled type="button">Очистить</button>
        <button class="dropdown__accept-button" disabled type="button">Применить</button>
      </li>
    </ul>
  `

}

export class Dropdown {
  constructor(selector, options) {
    this.elem = selector
    this.options = options

    this.#render()
    this.#setup()
  }

  #render() {
    const { items, placeholder } = this.options
    this.elem.classList.add('dropdown')
    this.elem.innerHTML = getTemplate(items, placeholder)
  }

  #setup() {
    this.state = {
      default: this.options.items,
      current: this.options.items.map(a => ({ ...a })),
      draft: this.options.items.map(a => ({ ...a }))
    }


    this.clickHandler = this.clickHandler.bind(this)
    this.counterHandler = this.counterHandler.bind(this)
    this.accept = this.accept.bind(this)
    this.default = this.default.bind(this)

    document.addEventListener('click', this.clickHandler)

    this.field = this.elem.querySelector('.dropdown__field')
    this.select = this.elem.querySelector('.dropdown__select')

    this.acceptBtn = this.elem.querySelector('.dropdown__accept-button')
    this.clearBtn = this.elem.querySelector('.dropdown__clear-button')
    this.acceptBtn.addEventListener('click', this.accept)
    this.clearBtn.addEventListener('click', this.default)


    this.selectOptions = Array.from(this.elem.querySelectorAll('.dropdown__option'))

    this.select.addEventListener('click', this.counterHandler)
  }

  // Обработчик клика по полю или вне поля 

  clickHandler(event) {

    const { type } = event.target.dataset

    const dropdown = event.target.closest('.dropdown')

    if (dropdown !== this.elem) {
      this.saveAndClose()
      return
    }

    if (type === 'field') {
      this.isOpen ? this.saveAndClose() : this.open()
    }

  }

  // Обработчик счетчика 

  counterHandler(event) {
    const { type } = event.target.dataset

    const option = event.target.closest('[data-type="option"]')
    const iSdisabled = event.target.classList.contains('disable')

    if (option && !iSdisabled) {

      const id = option.dataset.id

      let count = this.state.draft[id].value

      if (type === 'minusBtn') {
        --count
        this.renderCount(option, count)

      } else if (type === 'plusBtn') {
        ++count
        this.renderCount(option, count)

      }
      this.state.draft[id].value = count
    }

    this.renderControlsButtons()
  }

  // Метод рендора счетчиков и кнопок

  renderCount(option, count) {
    const minusBtn = option.querySelector('[data-type="minusBtn"]')
    const plusBtn = option.querySelector('[data-type="plusBtn"]')

    const maxValue = +option.dataset.max
    const minValue = +option.dataset.min

    count === maxValue
      ? plusBtn.classList.add('disable')
      : plusBtn.classList.remove('disable')

    count === minValue
      ? minusBtn.classList.add('disable')
      : minusBtn.classList.remove('disable')

    option.querySelector('[data-type="counter"]').innerText = count
  }

  renderControlsButtons() {

    console.log(this.isSame, this.acceptBtn)
    this.isSame ? this.acceptBtn.setAttribute('disabled', '') : this.acceptBtn.removeAttribute('disabled')
    this.isDefault ? this.clearBtn.setAttribute('disabled', '') : this.clearBtn.removeAttribute('disabled')
  }

  saveAndClose(state = this.state.current) {
    this.state.current = state.map(a => ({ ...a }))
    this.state.draft = state.map(a => ({ ...a }))
    this.selectOptions.forEach((option, idx) => {
      const count = state[idx].value
      this.renderCount(option, count)
    })
    this.close()
  }

  default() {
    this.saveAndClose(this.state.default)
  }

  accept() {
    this.saveAndClose(this.state.draft)
  }

  open() {
    this.field.classList.add('dropdown__field_active')
  }

  close() {
    this.field.classList.remove('dropdown__field_active')
  }

  destroy() {

  }

  get isDefault() {
    return this.state.default.every((defItem, idx) => defItem.value === this.state.current[idx].value)
  }

  get isSame() {
    return this.state.current.every((curItem, idx) => curItem.value === this.state.draft[idx].value)
  }

  get isOpen() {
    return this.field.classList.contains('dropdown__field_active')
  }
}


// export default class Dropdown {
//   constructor(options) {


//     this.elem = options.elem


//     // serch elems

//     this.dropdownField = this.elem.querySelector(options.field)
//     this.acceptBtn = this.elem.querySelector(options.acceptBtn)
//     this.clearBtn = this.elem.querySelector(options.clearBtn)
//     this.options = Array.from(this.elem.querySelectorAll(options.option))

//     this.counter = options.counter

//     this.dropdownActiveClassField = options.field.substring(1) + '_active'

//     // other settings 

//     this.isShowTotal = options.isShowTotal
//     this.initialized = false

//     // states

//     this.defaultState = defaultState(this.options)
//     this.state = this.defaultState.map(a => ({ ...a }))
//     this.draftState = []
//   }

//   init() {

//     this.handlerEventListeners(this.elem)

//     this.initialized = true

//     return this
//   }

//   handlerEventListeners(elem) {

//     // Выпадание и схлопывание

//     this.dropdownField.addEventListener('click', (event) => {
//       this.toggleDropdown()
//     })

//     document.addEventListener('click', (event) => {

//       const ddElem = event.target.closest('.dropdown')

//       if (!ddElem || ddElem !== this.elem) {
//         this.toggleDropdown('close')
//       }
//     })

//     // Изменение кол-ва и его сохранение

//     this.options.forEach((option, idx) => {
//       const counterElements = option.querySelector(this.counter).children

//       this.count(counterElements, idx)
//     })

//     if (this.acceptBtn && this.clearBtn) {

//       // Сброс состояния

//       this.clearBtn.addEventListener('click', (event) => {
//         this.default()
//       })

//       // Сохранить изменения

//       this.acceptBtn.addEventListener('click', (event) => {
//         this.save()
//       })
//     }

//   }

//   // Показывать выбранное

//   showTotal(isShow = false) {
//     if (isShow) {

//       let text = ''

//       this.state.forEach(el => {
//         text = `${text}${!text ? '' : ','} ${el.total} ${el.title}`
//       })

//       this.dropdownField.innerText = text.length > 31 ? text.toLowerCase().slice(0, 31) + '...' : text.toLowerCase()
//     }
//   }

//   // Открыть закрыть

//   toggleDropdown(close = false) {
//     if (!close) {
//       this.dropdownField.classList.toggle(this.dropdownActiveClassField)
//     }
//     else
//       this.dropdownField.classList.remove(this.dropdownActiveClassField)
//   }

//   // Изменить draftState и визуальную часть dropdawn

//   count(elements, index) {

//     const minus = elements[0]
//     const total = elements[1]
//     const plus = elements[2]


//     minus.addEventListener('click', (event) => {
//       if (total.innerText >= 1) {
//         total.innerText--
//         this.draftState[index] = total.innerText
//       }
//     })

//     plus.addEventListener('click', (event) => {
//       if (total.innerText <= 29) {
//         total.innerText++
//         this.draftState[index] = total.innerText
//       }
//     })
//   }

//   // Приведение dropdown в исходное состояние

//   default() {

//     this.draftState = []

//     this.state = this.defaultState.map(a => ({ ...a }))

//     this.options.forEach((option, idx) => {

//       const total = option.querySelector(this.counter).children[1]

//       total.innerText = this.defaultState[idx]['total']
//     })

//     this.showTotal(this.isShowTotal)
//   }

//   // Сохранине

//   save() {
//     this.draftState.forEach((el, idx) => {
//       if (el !== null) {
//         this.state[idx]['total'] = el
//       }
//     })
//     this.toggleDropdown('close')
//     this.showTotal(this.isShowTotal)
//   }

// }

// function defaultState(options) {

//   const state = []

//   options.forEach(option => {

//     const title = option.querySelector('.dropdown__option-title').innerText
//     const total = option.querySelector('.dropdown__counter-total').innerText

//     state.push({ title, total })

//   })

//   return state
// }