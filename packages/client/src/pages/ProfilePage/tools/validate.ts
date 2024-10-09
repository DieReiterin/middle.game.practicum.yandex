const hasNum = /\d/
const hasCapital = /[A-ZА-Я]/
const hasSubstrAtsignLatinDot = /@[a-zA-Z]+\./

const noNums = /^\D*$/
const noSpaces = /^\S*$/
const noCyrillic = /^[^\u0400-\u04FF]*$/
const notOnlyNums = /^(?!\d+$).*$/

const firstIsCapital = /^[A-ZА-Я]/
const firstIsPlus = /^\+/

const length3to20 = /^.{3,20}$/
const length8to40 = /^.{8,40}$/
const length10to15 = /^.{10,15}$/

const numsWithPlus = /^[0-9+]*$/
const latinCyrillicWithDash = /^[a-zA-Zа-яА-Я-]*$/
const latinWithDashLodash = /^[a-zA-Z0-9-_]*$/
const latinWithNumsDashLodashAtsignPoint = /^[a-zA-Z0-9-_@.]*$/

function validateName(val: string) {
  if (val === '') {
    return 'Поле не может быть пустым'
  } else if (!noNums.test(val)) {
    return 'цифры недопустимы'
  } else if (!noSpaces.test(val)) {
    return 'пробелы недопустимы'
  } else if (!firstIsCapital.test(val)) {
    return 'первая буква должна быть заглавной'
  } else if (!latinCyrillicWithDash.test(val)) {
    return 'из символов можно только "-"'
  } else {
    return 'ok'
  }
}

function validateLogin(val: string) {
  if (val === '') {
    return 'Поле не может быть пустым'
  } else if (!length3to20.test(val)) {
    return 'от 3 до 20 символов'
  } else if (!noCyrillic.test(val)) {
    return 'только латиница'
  } else if (!notOnlyNums.test(val)) {
    return 'не может состоять только из цифр'
  } else if (!noSpaces.test(val)) {
    return 'пробелы недопустимы'
  } else if (!latinWithDashLodash.test(val)) {
    return 'из символов можно только "-" или "_"'
  } else {
    return 'ok'
  }
}

function validateEmail(val: string) {
  if (val === '') {
    return 'Поле не может быть пустым'
  } else if (!noCyrillic.test(val)) {
    return 'только латиница'
  } else if (!latinWithNumsDashLodashAtsignPoint.test(val)) {
    return 'из символов можно только "-", "_", "@", "."'
  } else if (!hasSubstrAtsignLatinDot.test(val)) {
    return 'должна быть подстрока "@xxx."'
  } else {
    return 'ok'
  }
}

function validatePassword(val: string) {
  if (val === '') {
    return 'Поле не может быть пустым'
  } else if (!length8to40.test(val)) {
    return 'от 8 до 40 символов'
  } else if (!hasCapital.test(val)) {
    return 'добавьте заглавную букву'
  } else if (!hasNum.test(val)) {
    return 'добавьте цифру'
  } else {
    return 'ok'
  }
}

function validatePhone(val: string) {
  if (val === '') {
    return 'Поле не может быть пустым'
  } else if (!length10to15.test(val)) {
    return 'от 10 до 15 символов'
  } else if (!numsWithPlus.test(val)) {
    return 'только цифры или цифры с "+"'
  } else if (notOnlyNums.test(val) && !firstIsPlus.test(val)) {
    return 'плюс только первый символ'
  } else {
    return 'ok'
  }
}

function validateMessage(val: string) {
  if (val === '') {
    return 'Поле не может быть пустым'
  } else {
    return 'ok'
  }
}

function validatePasswordRepeat(val: string) {
  if (val === '') {
    return 'Поле не может быть пустым'
  } else {
    return 'ok'
  }
}

function validateDisplayName(val: string) {
  if (val === '') {
    return 'Поле не может быть пустым'
  } else {
    return 'ok'
  }
}

export default function validate(type: string, val: string) {
  if (type === 'first_name' || type === 'second_name') {
    return validateName(val)
  } else if (type === 'display_name') {
    return validateDisplayName(val)
  } else if (type === 'login') {
    return validateLogin(val)
  } else if (type === 'email') {
    return validateEmail(val)
  } else if (type === 'password') {
    return validatePassword(val)
  } else if (type === 'password-repeat') {
    return validatePasswordRepeat(val)
  } else if (type === 'phone') {
    return validatePhone(val)
  } else if (type === 'message') {
    return validateMessage(val)
  } else {
    return 'ok'
  }
}
