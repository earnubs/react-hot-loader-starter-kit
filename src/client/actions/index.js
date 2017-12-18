// action types

export const SAY_HELLO = 'SAY_HELLO';
export const IDENTIFY = 'IDENTIFY';

// action creators

export function sayHello(who) {
  return {
    type: SAY_HELLO,
    who
  };
}
