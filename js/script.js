//FAQ________________________________
const faqItems = document.querySelectorAll('.faq__item')

for (let faqItem of faqItems) {
  let heightEl = faqItem.querySelector('.faq__question-btn + .faq__answer-box .faq__answer').offsetHeight
  let answerBox = faqItem.querySelector('.faq__question-btn + .faq__answer-box')
  let iconArrow = faqItem.querySelector('.faq__question-btn .faq__question-icon')
  let faqBtn = faqItem.querySelector('.faq__question-btn')

  faqBtn.addEventListener('click', function () {
    if (faqItem.classList.contains('faq-open')) {
      answerBox.style.height = '0px'
      iconArrow.style.rotate = '0deg'
      faqItem.classList.remove('faq-open')
    }
    else {
      answerBox.style.height = heightEl + 'px'
      iconArrow.style.rotate = '90deg'
      faqItem.classList.add('faq-open')
    }
  })
}

//Slider________________________________
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

//Pop-up________________________________
const popUp = document.querySelector('.pop-up')
const body = document.querySelector('body')

$('.btn-open-pop-up').each(function () {
  $(this).on('click', function () {
    popUp.addClass('pop-up__open')
    body.addClass('scroll-none')
    if ($(this).data('title')) {
      $('.pop-up__title').html($(this).data('title'))
    }
    else {
      $('.pop-up__title').html($('.pop-up__title').data('title'))
    }
  })
})
$('.pop-up__exit').on('click', function () {
  popUp.removeClass('pop-up__open')
  body.removeClass('scroll-none')
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
const mobMenu = document.querySelector('.header__mob-nav')
const btnBurger = document.querySelector('.header__btn-burger')
const itemsMobMenu = document.querySelectorAll('.header__mob-nav-item a')

btnBurger.addEventListener('click', function () {
  if (mobMenu.classList.contains('header__mob-nav-open')) {
    mobMenu.classList.remove('header__mob-nav-open')
    btnBurger.classList.remove('header__btn-burger-exit')
  }
  else {
    mobMenu.classList.add('header__mob-nav-open')
    btnBurger.classList.add('header__btn-burger-exit')
  }
})

for (let itemMobMenu of itemsMobMenu){
  itemMobMenu.addEventListener('click', function(){
    mobMenu.classList.remove('header__mob-nav-open')
    btnBurger.classList.remove('header__btn-burger-exit')
  })
}