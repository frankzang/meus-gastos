export const currencyformatter = new Intl.NumberFormat([], {
  style: "currency",
  currency: "BRL"
});

export const dateformatter = new Intl.DateTimeFormat("pt-BR", {
  weekday: "short",
  month: "long",
  day: "2-digit",
  year: "numeric"
});
