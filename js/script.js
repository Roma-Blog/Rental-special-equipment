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
const priceDay = $('.calculator__total-subscription-price-day span:first-child')
const priceMonthly = $('.calculator__total-subscription-price-monthly span:first-child')

$('.calculator__item-parameters').each(function () {
  let inputNum = $(this).find('.calculator__item-number')
  let checkbox = $(this).find('.calculator__item-checkbox')
  let finishPrice = $(this).find('.calculator__final-price .calculator__final-price-number')

  Calculate(inputNum.val(), checkbox.prop('checked'), finishPrice)
  FinishCalculate()
  inputNum.on('focusout', function () {
    if (inputNum.val() == '') {
      inputNum.val('1')
    }
  })
  inputNum.on('change', function () {
    if (inputNum.val() > 99) {
      inputNum.val('99')
    }
    else if ($(this).val() < 1) {
      inputNum.val('1')
    }
    Calculate(inputNum.val(), checkbox.prop('checked'), finishPrice)
    FinishCalculate()
  })
  checkbox.on('change', function () {
    Calculate(inputNum.val(), checkbox.prop('checked'), finishPrice)
    FinishCalculate()
  })
})

function Calculate(num, checked, el) {
  if (checked) {
    el.html(el.data('price') * num).data('finishprice', el.data('price') * num)
  }
  else {
    el.html(0).data('finishprice', 0)
  }
}

function FinishCalculate() {
  let priceDaySum = 0
  $('.calculator__final-price-number').each(function () {
    priceDaySum += $(this).data('finishprice')
  })

  priceDay.html(priceDaySum + ' ₽')
  priceMonthly.html((priceDaySum * 30) + ' ₽')
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