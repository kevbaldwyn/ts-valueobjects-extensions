import Money from "js-money";
import { Currency } from "js-money/lib/currency";
import { ValueObject, ObjectUtils, GenericObject } from "ts-valueobjects";

type MoneyNative = {
  amount: number;
  currency: string | Currency;
};

export class MoneyValueObject extends ValueObject<Money> {
  public static fromNative(value: MoneyNative): MoneyValueObject {
    const { amount, currency } = value;
    return new this(new Money(amount, currency));
  }

  public isSame = (object: ValueObject<Money>): boolean => {
    return ObjectUtils.isObjectEqual(
      this.toNative(),
      object.toNative() as GenericObject
    );
  };

  public isNull = (): boolean => {
    return false;
  };

  public toNative = (): MoneyNative => {
    return {
      amount: this.value.amount,
      currency: this.value.currency
    };
  };

  public getMoney = (): Money => {
    return this.value;
  };
}
