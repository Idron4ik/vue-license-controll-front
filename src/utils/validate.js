export const emailValidate = [
  value => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || "Ваша пошта не правельна. Введіть johndove@mail.com";
  }
];

export const textValidate = [
  v => (v && v.length >= 3) || "Мінімальна кількість символів 3"
];

export const vrequired = [
  v => !!v || "Це поле обов'язкове для заповнення"
];
