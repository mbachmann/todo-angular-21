const isoDateFormat =
  /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;

export function parseIsoDateStrToDate(value: any) {
  if (typeof value === 'string' && isoDateFormat.test(value)) {
    return new Date(value);
  }
  return value;
}

export function getUUID(): string {
  let result = '';
  const hexcodes: string[] = '0123456789abcdef'.split('');

  for (let index = 0; index < 32; index++) {
    let value = Math.floor(Math.random() * 16);

    switch (index) {
      case 8:
        result += '-';
        break;
      case 12:
        value = 4;
        result += '-';
        break;
      case 16:
        value = (value & 3) | 8;
        result += '-';
        break;
      case 20:
        result += '-';
        break;
    }
    result += hexcodes[value];
  }
  return result;
}
