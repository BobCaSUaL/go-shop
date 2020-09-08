const priceRegexpDesc = '(\\d*(\\.\\d+)?)?(.+)';

export const PricePropType = (props, propName, componentName) => {
  if (!new RegExp(priceRegexpDesc).test(props[propName])) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to` +
        ` \`${componentName}\`. Validation failed.`,
    );
  }
  return undefined;
};

export class Currency {
  fixed = 2;

  /**
   * @type {Number}
   */
  value;

  /**
   * @type {String}
   */
  currency;

  constructor(serialized) {
    const [, value, , currency] = `${serialized}`.match(
      new RegExp(priceRegexpDesc),
    );
    this.value = Number(value);
    this.currency = currency;
  }

  multiply(quantity) {
    return new Currency(`${this.value * quantity}${this.currency}`);
  }

  toString() {
    return `${this.value.toFixed(this.fixed)} ${this.currency}`;
  }

  toJSON() {
    return `${this.value}${this.currency}`;
  }
}
