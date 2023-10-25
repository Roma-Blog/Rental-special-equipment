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