const mobMenu = document.querySelector('.header__mob-nav')
const btnBurger = document.querySelector('.header__btn-burger')
let itemMobMenu = document.querySelectorAll('.header__mob-nav-item a')
let menuOpen = false

const popUp = document.querySelector('.pop-up')
const body = document.querySelector('body')
const titlePopUp = document.querySelector('.pop-up__title')

//FAQ________________________________

document.querySelectorAll('.faq__item').forEach((elem) => {
  let heightEl = elem.querySelector('.faq__question-btn + .faq__answer-box .faq__answer').offsetHeight
  const answerBox = elem.querySelector('.faq__question-btn + .faq__answer-box')
  const iconArrow = elem.querySelector('.faq__question-btn .faq__question-icon')
  const faqBtn = elem.querySelector('.faq__question-btn')

  faqBtn.addEventListener('click', function () {
    if (this.classList.contains('faq-open')) {
      answerBox.style.height = 0 + 'px'
      iconArrow.style.rotate = 0 + 'deg'
      this.classList.remove('faq-open')
    }
    else {
      answerBox.style.height = heightEl + 'px'
      iconArrow.style.rotate = 90 + 'deg'
      this.classList.add('faq-open')
    }
  })
})

//Pop-up________________________________
document.querySelectorAll('.btn-open-pop-up').forEach((elem) => {
  elem.addEventListener('click', function () {
    if (!menuOpen) {
      popUp.classList.add('pop-up__open')
      body.classList.add('scroll-none')
    }
    if (elem.dataset.title) {
      titlePopUp.textContent = this.dataset.title
    }
    else {
      titlePopUp.textContent = titlePopUp.dataset.title
    }
  })
})
document.querySelector('.pop-up__exit').addEventListener('click', function () {
  popUp.classList.remove('pop-up__open')
  body.classList.remove('scroll-none')
})

//calculator________________________________
const priceDay = document.querySelector('.calculator__total-subscription-price-day span:first-child')
const priceMonthly = document.querySelector('.calculator__total-subscription-price-monthly span:first-child')

document.querySelectorAll('.calculator__item-parameters').forEach((elem) => {
  let inputNum = elem.querySelector('.calculator__item-number')
  let checkbox = elem.querySelector('.calculator__item-checkbox')
  let finishPrice = elem.querySelector('.calculator__final-price .calculator__final-price-number')

  Calculate(inputNum.value, checkbox.checked, finishPrice)
  FinishCalculate()
  inputNum.addEventListener('focusout', function () {
    if (inputNum.value == '') {
      inputNum.value = 1
    }
  })
  inputNum.addEventListener('change', function () {
    if (this.value > 99) {
      this.value = 99
    }
    else if (this.value < 1) {
      this.value = 1
    }
    Calculate(this.value, checkbox.checked, finishPrice)
    FinishCalculate()
  })
  checkbox.addEventListener('change', function () {
    Calculate(inputNum.value, checkbox.checked, finishPrice)
    FinishCalculate()
  })
})

function Calculate(num, checked, el) {
  if (checked) {
    el.textContent = el.dataset.price * num
    el.dataset.finishprice = el.dataset.price * num
  }
  else {
    el.textContent = 0
    el.dataset.finishprice = 0
  }
}

function FinishCalculate() {
  let priceDaySum = 0
  document.querySelectorAll('.calculator__final-price-number').forEach((elem) => {
    priceDaySum += elem.dataset.finishprice * 1
  })

  priceDay.textContent = priceDaySum + ' ₽'
  priceMonthly.textContent = (priceDaySum * 30) + ' ₽'
}

//mob_menu________________________

btnBurger.addEventListener('click', function () {
  mobMenu.classList.toggle('header__mob-nav-open')
  btnBurger.classList.toggle('header__btn-burger-exit')
  body.classList.toggle('scroll-none')
  menuOpen = !menuOpen
})

itemMobMenu.forEach((elem) => {
  elem.addEventListener('click', function () {
    mobMenu.classList.remove('header__mob-nav-open')
    btnBurger.classList.remove('header__btn-burger-exit')
    body.classList.remove('scroll-none')
    menuOpen = !menuOpen
  })
})

//mask-phone_______________________________
let phoneInputs = document.querySelectorAll('input[data-tel-input]')
let telValidate = false

function getInputNumbersValue (input) {
    return input.value.replace(/\D/g, '')
}

function onPhonePaste (e) {
    let input = e.target,
        inputNumbersValue = getInputNumbersValue(input)
    let pasted = e.clipboardData || window.clipboardData
    if (pasted) {
        let pastedText = pasted.getData('Text')
        if (/\D/g.test(pastedText)) {
            input.value = inputNumbersValue
            return
        }
    }
}

function onPhoneInput (e) {
    let input = e.target,
        inputNumbersValue = getInputNumbersValue(input),
        selectionStart = input.selectionStart,
        formattedInputValue = ""

    if (!inputNumbersValue) {
        return input.value = ""
    }

    if (input.value.length != selectionStart) {
        if (e.data && /\D/g.test(e.data)) {
            input.value = inputNumbersValue
        }
        return
    }
    if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
        if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue
        let firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7"
        formattedInputValue = input.value = firstSymbols + " "
        if (inputNumbersValue.length > 1) {
            formattedInputValue += '(' + inputNumbersValue.substring(1, 4)
        }
        if (inputNumbersValue.length >= 5) {
            formattedInputValue += ') ' + inputNumbersValue.substring(4, 7)
        }
        if (inputNumbersValue.length >= 8) {
            formattedInputValue += '-' + inputNumbersValue.substring(7, 9)
        }
        if (inputNumbersValue.length >= 10) {
            formattedInputValue += '-' + inputNumbersValue.substring(9, 11)
        }
    } else {
        formattedInputValue = '+7(' + inputNumbersValue.substring(0, 16)
    }
    input.value = formattedInputValue
}
function onPhoneKeyDown (e) {
    let inputValue = e.target.value.replace(/\D/g, '')
    if (e.keyCode == 8 && inputValue.length == 1) {
        e.target.value = ""
    }
}

for (let phoneInput of phoneInputs) {
    phoneInput.addEventListener('keydown', onPhoneKeyDown)
    phoneInput.addEventListener('input', onPhoneInput, false)
    phoneInput.addEventListener('paste', onPhonePaste, false)
    phoneInput.addEventListener('blur', InputValidateTel)
}

//Validate____________________________________________________________
let forms = document.querySelectorAll('form')

for (let form of forms) {
    form.addEventListener('submit', CheckFormValidate)

}

function CheckFormValidate(e){
    if (!InputValidateTel(e.target.querySelector('input[data-tel-input]'))){
        e.preventDefault()
    }
}

function InputValidateTel(e){
    if (e.target) e = e.target

    let str = e.value
    let textError = e.nextElementSibling
    
    if(str.length == 0){
        e.classList.add('invalid-input')
        e.addEventListener('input', InputValidateTel)
        textError.classList.add('order__text-error-block')
        ErrorMessage(textError, 'Введите ваш номер телефона')
        return false 
    }
    else if (str.length == CheckingFirstNum(str[0])){
        e.classList.remove('invalid-input')
        textError.classList.remove('order__text-error-block')
        return true
    }
    else {
        e.classList.add('invalid-input')
        e.addEventListener('input', InputValidateTel)
        ErrorMessage(textError, 'Номер телефона введен не полностью')
        return false
    }
}

function CheckingFirstNum(num) {
    if (num == '+') return 18
    else if (num == '8') return 17
}

function ErrorMessage(el, text){
    el.classList.add('order__text-error-block')
    el.innerHTML = text
}

function onInput(e) {
    if (e.target) e = e.target

    let textError = e.nextElementSibling

	if (isEmailValid(e.value)) {
		e.classList.remove('invalid-input')
        textError.classList.remove('order__text-error-block')
        return true
	} else {
		e.classList.add('invalid-input')
        if (e.value == '') ErrorMessage(textError, 'Введите ваш e-mail')
        else ErrorMessage(textError, 'E-mail введен не корректно')
        e.addEventListener('input', onInput)
        return false
	}
}

//Jquery____________________________________________
//Slider
$('.partners__list').slick({
  infinite: true,
  slidesToShow: 3,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 680,
      settings: {
        slidesToShow: 1,
      }
    }
  ]
})

$('.partners__btn--next').on('click', function () {
  $('.partners__list').slick('slickNext')
})
$('.partners__btn--previous').on('click', function () {
  $('.partners__list').slick('slickPrev')
})