import { test } from 'node:test';
import assert from 'node:assert/strict';
import fizzBuzz from './fizzBuzz.js';

test('returnerer tallet når ikke delelig på 3 eller 5', () => {
  assert.equal(fizzBuzz(1), '1');
  assert.equal(fizzBuzz(2), '2');
});

test('returnerer Fizz når delelig på 3', () => {
  assert.equal(fizzBuzz(3), 'Fizz');
  assert.equal(fizzBuzz(9), 'Fizz');
});

test('returnerer Buzz når delelig på 5', () => {
  assert.equal(fizzBuzz(5), 'Buzz');
  assert.equal(fizzBuzz(20), 'Buzz');
});

test('returnerer FizzBuzz når delelig på 3 og 5', () => {
  assert.equal(fizzBuzz(15), 'FizzBuzz');
  assert.equal(fizzBuzz(30), 'FizzBuzz');
});
