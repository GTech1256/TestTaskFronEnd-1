var maxValue = 15; // максимальное значение
var nowMoney = 0; // сейчас денег
var stepMoney = 0.2 // денег за тик
var inter;

function onGoodResponse() {

	/* 
	
	** При 'Хорошем' ответе от сервера **
	1. Заменяеться картинка ожидания на инфо.
	2. Поясвляеться стрелочка под прогрессом.
	3. Изменяеться текст под стрелочкой и текст информации.
	
	*/
  $('.content__description_info').text('You need $15.00 more to reach your target.');
  $('.progressDiv__arrow-up_money').text(`$0.00`);

  $('.progressDiv__arrow-up').css('display', 'flex');



  /* лень скачивать картинки :) */
  $('.content__description_image').css('content', `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAQ5SURBVFhHvVhLT1NBFK4bdeH7B0gipRhMNBHYSFCMGuPCZzQmGldG0I0aDTuXxq0I6lZdmBhMxBh6W3wBQUETCO29lzcoUB5qgFKFYnl0PGfutF6aU3rntuFLvqTtnDPzdR7nnBlHunAqvZtcilbocqunnIp6EZnt8Z/MdasF2CbMVhGMrcmp9e/P8aiPnIrWlePR2MpUO9AWfdBX9JJ5wGysc3rUq06PNkALsUBF7QOW5lXra0W3mYHL7T8Gs9BPDmqHIDTbox0V3dtHVv339Xx5qEEyQNgiVbgyYjg55Hn1bTmK1kx1nEnCtmnaXqtuFcNaQ1ZN+xY4jT6qQyvc/baDvRieZMH5ReafDrOShh7SLkYca8e71s1i+JWBywr/6gvVkVU++T7BzHg1EiTtzIQxP1k6PLDnHlMdyHB0bl5IM+D9ESLtEol7UsigYZxW2lmGAzN/hTQDN33DpB1Fp1c9IuQshzixGQklpa2DLAT7L7y4xCr7fpI2SamoveRSYxAmHWwy16uxnV6dbEtJt35FyBLA9JXBQOwC7qqzKQ4Js7gsLUJULyENJYgzdq1tiLVMzrBZWNoo7L1ngxOkrTX6i4U8fnLTyhaHGnuYLxg2ToQJi9Go7WWGnF8p5PH910kZWeH19mE2s7AkJC3H8GyE9LFERdUNcVCzkQYWWO4P8FlC6KEw6/kzxz/H8DIwRfpZoqJG8+r1DQ4sNkmDFLwN4iJLUeYen2bnWwb4bxqkNTNwdhP9ZJhdp+bDAdFPUI2peOnrN1Zc3x3/Xvi+k4HeOHBmC+A3s48sIbMcdzi9/gtUoyxv+QJCmoHWqVnSToaoLWMCa0aDQpqBil7JDEKQC7S7xGZiDJyILAhpBs4095O2MuRLjLcvqlGGp0GMGVORRS6aspUh3A73phVmYsTlNOPNWOr6LyVjYYbHwjQCNbItOCukGShXA6SdFGOBGpFOqsNQEgvWCPy072MXaStFRa0Q8jCbqAdIIwu8AcWoGZ2hOdJOli63ViTkAbDcwks1YZiKT6FiMeP50CRpJ8XEcgsBy1xGGqcg3trMuKOPxtvwJJe1DbIiySWH8HJZyPoPLLNROeWQjHlQlM6b8xvgbEs/y4d9ea9rnAXCEZ6fMQ1S/hRBXHfS2x0+R1BOyXgQ7ruJ8IyH+F0E0fjrN9sDd2TKlySEFljJw0IODTgwD0lnguegikmGaii1ZItVmL0HQkZy4FsJ/JPPVAeJxL1lDjEILF6xTqTsVyLE4g+WX73wGcLq08fdzjGe2kZgv+GJNpdgVgni2i0/fcSADzrg2ER1mGE24FuQGFYO/NFS0aqITtOncSDu235+MwOfI2RD0ErEUJLytMqCx0m48aclFHwxCFs+DLbAXyH8xRgSYECdFGIm2kDi57k1MX2tBnJfd23E2xdW5liic0IljL/F6znbcDj+AVqiipsKTMibAAAAAElFTkSuQmCC")`);
  $('.content__description_image').css('animation', 'none')

}

function startAnimate(balance_usd) {


  var maxPerce = balance_usd / maxValue * 100; // Максимум процентов на прогрессе

  var steps = balance_usd / stepMoney; // Всего тиков в интервале

  var stepPerce = maxPerce / steps // Процент за шаг
  var nowStep = 0; // Начальные шаг


  var inter = setInterval(function () {

    nowStep++

    var barPerce = nowStep * stepPerce; // Процент на баре

    if (nowStep <= steps) { // если не все шаги пройдены
      $('.progressDiv__progress').css('width', `${barPerce}%`); // изменяет прогресс бар

      nowMoney = stepMoney * nowStep;
      // изменяет текст You need
      $('.progressDiv__arrow-up_money').text(`$${nowMoney.toFixed(2)}`);
    }
    else
      clearInterval(inter);// 'удаляет' интервал после всех тиков. 

    if (barPerce === 100)
      onTarget() // если все 15$


    const left = (maxValue - nowMoney).toFixed(2)
    $('.content__description_info').text(`You need $${left} more to reach your target.`)

  }, 2000) // тик каждые 2с
}


function onTarget() {

	/*

	** При достижении 100% 15$ **

	1. Меняеться цвет  [Target $15] 
	2. Стрелка встает под  [Target $15] 
	3. “You need...” убираеться
	*/

  $('.content__main_target').css({
    "background": "linear-gradient(to bottom, #72a02c 0%,#72a02c 50%,#a1d54f 50%,#3b8e11 51%,#7cbc0a 100%)", "color": "#ebebeb"
  });
  $('.progressDiv__arrow-up').css({ "left": "117%" })
  $('.progressDiv__arrow-up').css({ "top": "25px" })
  $('.content__description').hide();
}

function err(mes) {
	/*
		** При ошибке **

		1. Прячеться основной контент
		2. Показываеться контент с ошибкой
		3. В контенте с ошибка пишеться ошибка
	*/
  $('.panel__body_content').hide(1000);
  $('.panel__body_error').show(1000);
  $('.panel__body_error > h1').text(mes);
}

$(function () {

  var test = false /* при true и не убранном ниже (!) будет ошибка запроса
	Если убрать ниже (!) воскл знак, то:
	1. Будет искуственная задержка
	2. Баланс с сервера поставиться в максимальное значение(15$)
*/
  // СНЯТЬ !
  var good = !test ? 'http://alex.devel.softservice.org/testapi/' : 'http://alex.devel.softservice.org';

  var testTimeout = test ? 1000 : 400;

  setTimeout(() => $.ajax({
    url: good,
    error(jqXHR, textStatus, errorThrown) {
      err(`The server responded with an error ${jqXHR.status}`); // При ошибке
    },
    success({ balance_usd }) {

      if (test)
        balance_usd = 999

      if (!balance_usd) {
        err('The server did not give a balance'); //Если поле balance_usd в ответе не обнаружено
      } else if (balance_usd > maxValue)
        balance_usd = maxValue	//Если сервер дал больше, чем клиент ожидал

      onGoodResponse();

      startAnimate(balance_usd);
    }
  }), testTimeout)// при тесте искуственный задержка сервера 1сек


})