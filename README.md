# Value Object Extensions

![Build](https://github.com/kevbaldwyn/ts-valueobjects-extensions/workflows/Build/badge.svg?branch=master)

[![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Fkevbaldwyn%2Fts-valueobjects-extensions%2Fmaster)](https://dashboard.stryker-mutator.io/reports/github.com/kevbaldwyn/ts-valueobjects-extensions/master)

[![Coverage Status](https://coveralls.io/repos/github/kevbaldwyn/ts-valueobjects-extensions/badge.svg?branch=master)](https://coveralls.io/github/kevbaldwyn/ts-valueobjects-extensions?branch=master)


This package provides the following common valueobjects for [ts-valueobjects](https://github.com/kevbaldwyn/ts-valueobjects). 

## DateTimeUTC
Provides a safe way of working with date time values. Extends `ValueObject` and additionally provides the following methods.

### constructor({date, timezone})
```typescript
const dateTime = new DateTimeUTCValueObject({
    // UTC date time
    date: new Date(), 
    // the timezone
    timezone: "Europe/London"
});
```
### fromNative({date, timezone})
```typescript
const dateTime = DateTimeUTCValueObject.fromNative({
    // can be any Date() compatible date/time string (will be treated as UTC)
    date: "2021-01-11T23:16:00.000Z", 
    timezone: "Europe/London"
});
```
### fromLocalUTC(datetime, timezone)
```typescript
const dateTime = DateTimeUTCValueObject.fromLocalUTC(
    "2021-01-11T23:16:00.000+01:00",
    "Europe/Paris"
);
// dateTime.value.date will internally be converted to UTC (2021-01-11T22:16:00.000Z)
```
### toLocalUTC()
Converts to the local time for the timezone the value object is constructed with
```typescript
const dateTime = new DateTimeUTCValueObject({
    date: new Date("2021-01-11T22:16:00.000Z"),
    timezone: "Europe/Paris"
});
console.log(dateTime.toLocalUTC()); // -> "2021-01-11T23:16:00.000+01:00";
```
### format(strFormat)
Uses `date-fns` format() method
```typescript
const dateTime = new DateTimeUTCValueObject({
    date: new Date("2021-01-11T22:16:00.000Z"),
    timezone: "Europe/London"
});
console.log(dateTime.format("yyyy/MM/dd HH:mm (z)")) // -> "2021/01/11 22:16 (GMT)"
```
### isBefore(), isAfter()
Returns boolean if 2 objects are before after each other

### getDate()
Returns the underlying `Date` object corrected to the constructed timezone

## Money
Money is defined as a number representing the lowest denomination, and a currency value. It uses `js-money` to handle the money value. Extends `ValueObject` and additionally provides the following methods.

```typescript
// 2 Euros (200 cents)
const money = new MoneyValueObject(new Money(200, Money.EUR));
const money = MoneyValueObject.fromNative({
    amount: 200,
    currency: "GBP"
});
```
### getMoney()
Returns the underlying immutable `Money` object that can be used to perform various operations. See `js-money` documentation.

## Uuid
Representation of Universally Unique Idetifiers, providing versions 1, 3, 4 and 5 UUIDs. All UUIDs are validated on construction. Extends `ValueObject` and additionally provides the following methods.

### generate()
Generates a v4 uuid - alias for `generateV4()`
```typescript
const uuid = UuidValueObject.generate();
```

### generateV1()
Generates a v1 uuid
```typescript
const uuid = UuidValueObject.generateV1();
```

### generateV2()
Generates a v2 uuid
```typescript
const uuid = UuidValueObject.generateV2();
```

### generateV3(name: string, namespace: string)
Generates a v3 uuid
```typescript
const uuid = UuidValueObject.generateV3("name", "1b671a64-40d5-491e-99b0-da01ff1f3341");
```

### generateV4()
Generates a v4 uuid
```typescript
const uuid = UuidValueObject.generateV4();
```

### generateV5(name: string, namespace: string)
Generates a v5 uuid
```typescript
const uuid = UuidValueObject.generateV5("name", "1b671a64-40d5-491e-99b0-da01ff1f3341");
```

### getVersion()
Get the version of a given uuid value object
```typescript
const uuid = UuidValueObject.generateV4();
console.log(uuid.getVersion()); // -> 4
```



