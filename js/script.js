$('.faq__question-btn').on('click', function(){
    let heightEl = $('.faq__question-btn + .faq__answer-box + .faq__answer').css('height')
    console.log(heightEl)
    $('.faq__question-btn + .faq__answer-box').css( 'height', heightEl)
});