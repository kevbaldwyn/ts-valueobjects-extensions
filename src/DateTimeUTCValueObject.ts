import { isAfter, isBefore } from "date-fns";
import { format, toDate, utcToZonedTime } from "date-fns-tz";
import { GenericObject, ObjectUtils, ValueObject } from "ts-valueobjects";

type DateProps = {
  date: Date;
  timezone: string;
};

type DateNative = {
  date: Date | number | string;
  timezone: string;
};

export class DateTimeUTCValueObject extends ValueObject<DateProps> {
  public static fromNative(value: DateNative): DateTimeUTCValueObject {
    const { date, timezone } = value;
    return new this({
      date: utcToZonedTime(date, timezone),
      timezone
    });
  }

  public toNative = (): DateNative => {
    return {
      date: this.value.date.toISOString(),
      timezone: this.value.timezone
    };
  };

  public static fromLocalUTC(
    value: string,
    timezone: string
  ): DateTimeUTCValueObject {
    return new this({ date: toDate(value, { timeZone: timezone }), timezone });
  }

  public toLocalUTC = (): string => {
    return this.format("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
  };

  public withTimezone = (timezone: string): DateTimeUTCValueObject => {
    return new DateTimeUTCValueObject({
      date: toDate(this.value.date, { timeZone: timezone }),
      timezone
    });
  };

  public isNull = (): boolean => {
    return false;
  };

  public isSame = (object: ValueObject<DateProps>): boolean => {
    return ObjectUtils.isObjectEqual(
      this.toNative(),
      object.toNative() as GenericObject
    );
  };

  public format = (strFormat: string): string => {
    return format(this.getDate(), strFormat, {
      timeZone: this.value.timezone
    });
  };

  public isBefore = (date: DateTimeUTCValueObject): boolean => {
    return isBefore(this.getDate(), date.getDate());
  };

  public isAfter = (date: DateTimeUTCValueObject): boolean => {
    return isAfter(this.getDate(), date.getDate());
  };

  public getDate = (): Date => {
    return utcToZonedTime(this.value.date, this.value.timezone);
  };
}
