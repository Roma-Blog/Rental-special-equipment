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