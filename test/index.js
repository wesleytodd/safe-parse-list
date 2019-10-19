'use strict'
const assert = require('assert')
const { suite, test } = require('mocha')
const pkg = require('../package.json')
const split = require('../')

suite(pkg.name, () => {
  test('parse string', () => {
    assert.deepStrictEqual(split('1,2,3'), ['1', '2', '3'])
    assert.deepStrictEqual(split('1, 2,3'), ['1', '2', '3'])
    assert.deepStrictEqual(split('1, 2, 3'), ['1', '2', '3'])
    assert.deepStrictEqual(split('1,\t2, 3'), ['1', '2', '3'])
    assert.deepStrictEqual(split('1,\t2,\t3'), ['1', '2', '3'])
    assert.deepStrictEqual(split('1,\t\t2,\t 3'), ['1', '2', '3'])
    assert.deepStrictEqual(split('1,     2,\t\t\t\t3'), ['1', '2', '3'])
    assert.deepStrictEqual(split('1,,2,3'), ['1', '2', '3'])
    assert.deepStrictEqual(split('1, ,2,3'), ['1', '2', '3'])
    assert.deepStrictEqual(split('a,b,c'), ['a', 'b', 'c'])
    assert.deepStrictEqual(split('a ,bbb,ccc c'), ['a', 'bbb', 'ccc c'])
    assert.deepStrictEqual(split('a ,b\t\t\tbb,ccc c'), ['a', 'b\t\t\tbb', 'ccc c'])
  })

  test('parse string with space delim', () => {
    var opts = {
      delimiters: [' ', '\t'],
      whitespace: []
    }
    assert.deepStrictEqual(split('1,2,3', opts), ['1,2,3'])
    assert.deepStrictEqual(split('1 2,3', opts), ['1', '2,3'])
    assert.deepStrictEqual(split('1 2 3', opts), ['1', '2', '3'])
    assert.deepStrictEqual(split('1\t2 3', opts), ['1', '2', '3'])
    assert.deepStrictEqual(split('1\t2\t3', opts), ['1', '2', '3'])
    assert.deepStrictEqual(split('1\t\t2\t 3', opts), ['1', '2', '3'])
    assert.deepStrictEqual(split('1     2\t\t\t\t3', opts), ['1', '2', '3'])
  })

  test('is fast', () => {
    let str = ''
    const arr = []
    let i = 0
    // 50k items
    while (i < 50000) {
      str += 'a, '
      arr.push('a')
      i++
    }
    // 50k trailling spaces and tabs
    i = 0
    while (i < 50000) {
      str += ' \t'
      i++
    }
    assert.deepStrictEqual(split(str), arr)
  })
})
