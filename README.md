# ts-utils-pro

TypeScript-библиотека универсальных утилит с упором на строгую типизацию, дженерики, условные типы и type-safe API.

## Возможности

- 10 утилит в папке src/utils (каждая в отдельном файле)
- Ручные реализации utility-types: MyPartial, MyReadonly, MyPick, MyOmit, MyRecord
- Сложные типы на базе infer + extends + template literals
- Assertion-утилита с сигнатурой asserts value is NonNullable<T>
- Полное покрытие Jest тестами для всех runtime-утилит
- Отдельные type-тесты с @ts-expect-error
- Сборка в dist через tsup с генерацией index.js и index.d.ts

## Установка

```bash
npm install
```

## Скрипты

```bash
npm run test
npm run typecheck
npm run typecheck:tests
npm run build
```

## Использование

```ts
import {
	deepClone,
	debounce,
	memoize,
	groupBy,
	mergeDeep,
	once,
	isEqual,
	createEventEmitter,
	pipe,
	assertIsDefined
} from 'ts-utils-pro';

const source = { user: { name: 'Alice' } };
const cloned = deepClone(source);

const sumOnce = once((a: number, b: number) => a + b);
sumOnce(1, 2);
sumOnce(10, 20);

const grouped = groupBy(
	[
		{ id: 1, role: 'admin' },
		{ id: 2, role: 'user' }
	],
	'role'
);

const emitter = createEventEmitter<{ message: { text: string } }>();
emitter.on('message', (payload) => {
	console.log(payload.text);
});
emitter.emit('message', { text: 'Hello' });

const transform = pipe(
	(value: number) => value + 1,
	(value: number) => value * 2,
	(value: number) => `result:${value}`
);

const value: string | undefined = 'ok';
assertIsDefined(value);
// value narrowed to string
```

## Локальная публикация

```bash
npm run build
npm link
```

После этого пакет можно подключить в другом проекте через:

```bash
npm link ts-utils-pro
```

