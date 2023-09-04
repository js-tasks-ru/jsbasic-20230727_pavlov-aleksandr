/**
 * Эту функцию трогать не нужно
 */
function isValid(name) {
  // ваш код...
  if (name === null) {
    return false;
} else if (name.includes(" ")) {
    return false;
} else if (name.length < 4) {
    return false;
} else {
    return true;
}
}
function sayHello() {
  let userName = prompt('Введите ваше имя');

  if (isValid(userName)) {
    print(`Welcome back, ${userName}!`);
  } else {
    print('Некорректное имя');
  }
}
