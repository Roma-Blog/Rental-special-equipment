//mask-phone________________________________
$('.art-stranger').mask('+7 (999) 999-99-99');

        $.fn.setCursorPosition = function(pos) {
        if ($(this).get(0).setSelectionRange) {
            $(this).get(0).setSelectionRange(pos, pos);
        } else if ($(this).get(0).createTextRange) {
            var range = $(this).get(0).createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
        };

        $('input[type="tel"]').click(function(){
            $(this).setCursorPosition(4); 
        });


//FAQ________________________________
$('.faq__item').each(function(){
    let heightEl = $(this).find('.faq__question-btn + .faq__answer-box .faq__answer').css('height')
    const answerBox = $(this).find('.faq__question-btn + .faq__answer-box')
    const iconArrow = $(this).find('.faq__question-btn .faq__question-icon')
    const faqBtn = $(this).find('.faq__question-btn')
    faqBtn.on('click', function(){
        if ($(this).hasClass('faq-open')){
            answerBox.css('height', '0px')
            iconArrow.css('rotate', '0deg')
            $(this).removeClass('faq-open')
        }
        else{
            answerBox.css('height', heightEl)
            iconArrow.css('rotate', '90deg')
            $(this).addClass('faq-open')
        }
    })
})

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

$('.partners__btn--next').on('click', function(){
    $('.partners__list').slick('slickNext')
})
$('.partners__btn--previous').on('click', function(){
    $('.partners__list').slick('slickPrev')
})

//Pop-up________________________________
const popUp = $('.pop-up')
const body = $('body')

$('.btn-open-pop-up').each(function(){
  $(this).on('click', function(){
    popUp.addClass('pop-up__open')
    body.addClass('scroll-none')
    if ($(this).data('title')){
      $('.pop-up__title').html($(this).data('title'))
    }
    else {
      $('.pop-up__title').html($('.pop-up__title').data('title'))
    }
  })
})
$('.pop-up__exit').on('click', function(){
  popUp.removeClass('pop-up__open')
  body.removeClass('scroll-none')
})

//calculator________________________________
const priceDay = $('.calculator__total-subscription-price-day span:first-child')
const priceMonthly= $('.calculator__total-subscription-price-monthly span:first-child')

$('.calculator__item-parameters').each(function(){
  let inputNum = $(this).find('.calculator__item-number')
  let checkbox = $(this).find('.calculator__item-checkbox')
  let finishPrice = $(this).find('.calculator__final-price .calculator__final-price-number')

  Calculate(inputNum.val(), checkbox.prop('checked'), finishPrice)
  FinishCalculate()
  inputNum.on('focusout', function(){
    if(inputNum.val() == ''){
      inputNum.val('1')
    }
  })
  inputNum.on('change', function(){
    if(inputNum.val() > 99){
      inputNum.val('99')
    }
    else if ($(this).val() < 1){
      inputNum.val('1')
    }
    Calculate(inputNum.val(), checkbox.prop('checked'), finishPrice)
    FinishCalculate()
  })
  checkbox.on('change', function(){
    Calculate(inputNum.val(), checkbox.prop('checked'), finishPrice)
    FinishCalculate()
  })
})

function Calculate( num, checked , el){
  if (checked){
    el.html(el.data('price')*num).data('finishprice', el.data('price')*num)
  }
  else{
    el.html(0).data('finishprice', 0)
  }
}

function FinishCalculate(){
  let priceDaySum = 0
  $('.calculator__final-price-number').each(function(){
    priceDaySum += $(this).data('finishprice')
  })
  
  priceDay.html(priceDaySum + ' ₽')
  priceMonthly.html((priceDaySum * 30) + ' ₽')
}