// Скролл по Оси Z

let zSpacing = -1500,    //Расстояние между фреймами
  lastPos = zSpacing / 5,  //Расстояние от экрана до фрейма
  $frames = document.getElementsByClassName('frame'),  //Поиск элемента по его классу
  frames = Array.from($frames), //Создание массива из числа найденных элементов
  zVals = []

window.onscroll = () => {
  let top = document.documentElement.scrollTop,  //Расстояние от верха до текущей позиции фрейма
    delta = lastPos - top    //Вычисление позиции путем вычетания последнего значения позиции до верхнего скролла

  lastPos = top  // за счет строк 9-13 и есть возможность скролла, путем вычетания верхней части экрана до начала элемента и повторяется при прокрутке

  frames.forEach((n, i) => {
    zVals.push((i * zSpacing) + zSpacing)   
    /* Пушим обновленные значения, это индекс элемента(фрейма) * на расстояние между элементами + расстояние ,
      чтобы было пространство для текущего кадра*/
    zVals[i] += delta * -5
    let frame = frames[i],
      transform = `translateZ(${zVals[i]}px)`,
      opacity = zVals[i] < Math.abs(zSpacing) / 1.5 ? 1 : 0
    frame.setAttribute('style', `transform: ${transform}; opacity: ${opacity}`)
  })
}

window.scrollTo(0, 1)


function mainPage() {
  window.open("index.html", '_self');
}   //Загрузка главной страницы при нажатии кнопки "Главная" в шапке страницы