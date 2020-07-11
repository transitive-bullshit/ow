import {Predicate} from './lib/predicates/predicate';
import {AnyPredicate} from './lib/predicates/any';
import {testSymbol} from './lib/predicates/base-predicate';
import {StringPredicate} from './lib/predicates/string';

export interface Ow {
	<T>(value: T, predicate: Predicate<T>): void;
	readonly string: StringPredicate;
}

const main = <T>(value: T, predicate: Predicate<T> | AnyPredicate<T>) => (predicate as any)[testSymbol](value, main);

Object.defineProperties(main, {
	disableInProduction: () => {
	},
	string: {
		get: () => new StringPredicate()
	}
});

const ow = new Proxy(function () { }, {
  get: (obj, prop) => ow,
  apply: () => ow
});

export default main as Ow;
