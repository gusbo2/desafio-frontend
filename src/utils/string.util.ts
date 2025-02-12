interface IStringUtil {
  getOnlyNumbers(value: string): string;
  priceFormat(value: string): string;
  dateToString(value: Date): string;
  stringToPrice(value: string): number;
  stringToPriceKeepingCommas(value: string): string;
  formatDate(value: string): string;
}

export const StringUtil: IStringUtil = {
  getOnlyNumbers: (value: string): string => {
    const pattern = /\d+/g;
    const matches = value.match(pattern);
    return matches ? matches.join('') : '';
  },
  priceFormat: (value: string): string => {
    if (value === '') {
      return "R$ 0,00";
    }
    if (value.includes('.')) {
      const price = value.split('.');
      return `R$ ${price.join(',')}`;
    }
    return `R$ ${value},00`;
  },
  dateToString: (value: Date): string => {
    return value.toLocaleDateString('pt-BR');
  },
  stringToPrice: (value: string): number => {
    if (value === '') {
      return 0;
    }
    if (value.includes(',') && value.includes('.')) {
      value = value.replaceAll('.', '');
    }
    value = value.replaceAll(',', '.');
    return Number(value);
  },
  stringToPriceKeepingCommas: (value: string): string => {
    const pattern = /[-\d,.]+/g;
    const matches = value.match(pattern);
    return matches ? matches.join('') : '';
  },
  formatDate: function (value: string): string {
    const pattern = /\d+/g;
    const matches = value.match(pattern);
    if (matches) {
      return `${matches[2]}/${matches[1]}/${matches[0]}`;
    }
    return '';
  }
}