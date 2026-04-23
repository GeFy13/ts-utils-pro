import { createEventEmitter, mergeDeep, pipe } from '../../src';
import type {
  EventTupleToDescriptors,
  MyOmit,
  MyPartial,
  MyPick,
  MyReadonly,
  MyRecord,
  ParseEventName
} from '../../src';

type User = {
  id: number;
  name: string;
  active: boolean;
};

const partialUser: MyPartial<User> = { name: 'Alice' };
const readonlyUser: MyReadonly<User> = { id: 1, name: 'Bob', active: true };
const pickedUser: MyPick<User, 'id' | 'name'> = { id: 1, name: 'Bob' };
const omittedUser: MyOmit<User, 'active'> = { id: 1, name: 'Bob' };
const roleMap: MyRecord<'admin' | 'user', number> = { admin: 1, user: 2 };

void partialUser;
void readonlyUser;
void pickedUser;
void omittedUser;
void roleMap;

type Parsed = ParseEventName<'user:created'>;
const parsed: Parsed = { domain: 'user', action: 'created' };
void parsed;

type TupleParsed = EventTupleToDescriptors<['user:created', 'post:updated']>;
const tupleParsedValue: TupleParsed = { domain: 'post', action: 'updated' };
void tupleParsedValue;

const merged = mergeDeep(
  { user: { name: 'Alice', settings: { lang: 'en' } } },
  { user: { settings: { theme: 'dark' as const } } }
);
const theme: 'dark' = merged.user.settings.theme;
void theme;

const piped = pipe(
  (value: number) => value + 1,
  (value: number) => String(value)
);
const pipedResult: string = piped(1);
void pipedResult;

const emitter = createEventEmitter<{ message: { text: string } }>();
emitter.emit('message', { text: 'hello' });

// @ts-expect-error payload типа number несовместим с ожидаемым объектом
emitter.emit('message', 123);

// @ts-expect-error свойство active исключено из результата MyOmit
const invalidOmitted: MyOmit<User, 'active'> = { id: 1, name: 'Bob', active: true };
void invalidOmitted;
