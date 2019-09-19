const test = require('tape')
const Monoid = require('../lib/monoid')

test('stringMonoid', t => {
  const t1 = { type: 'set', data: 'hello world' }
  const t2 = { type: 'set', data: 'hello buttz!' }
  const t3 = { type: 'set', data: 'scuttle buttz!' }

  const { concat, identity, canMerge } = Monoid.stringMonoid

  t.deepEqual(concat(identity(), t1), t1, 'left Identity')
  t.deepEqual(concat(t1, identity()), t1, 'right Identity')
  t.deepEqual(concat(concat(t1, t2), t3), concat(t1, concat(t2, t3)), 'associativity')

  t.deepEqual(concat(t1, t2), { type: 'set', data: 'hello buttz!' }, 'concat')
  t.true(canMerge(t1, t1), 'canMerge')
  t.false(canMerge(t1, t2), 'canMerge')

  t.end()
})

test('setMonoid', t => {
  const { concat, identity, canMerge } = Monoid.setMonoid

  const t1 = { type: 'add', data: { '@mix': 1 } }
  const t2 = { type: 'add', data: { '@bundy': 1, '@aljoscha': 1 } }
  const t3 = { type: 'add', data: { '@mix': -1 } }

  t.deepEqual(concat(identity(), t1), t1, 'left Identity (add)')
  t.deepEqual(concat(t1, identity()), t1, 'right Identity (add)')

  t.deepEqual(concat(concat(t1, t2), t3), concat(t1, concat(t2, t3)), 'associativity')
  t.deepEqual(concat(t1, t2), concat(t2, t1), 'commutative')
  t.deepEqual(concat(t1, t3), identity(), 'inverses!')

  t.deepEqual(concat(t1, t2), { type: 'add', data: { '@mix': 1, '@bundy': 1, '@aljoscha': 1 } }, 'concat (add)')

  t.true(canMerge(t1, t1), 'canMerge')
  // t.false(canMerge(t1, t3), 'canMerge (touching same key)')

  t.end()
})

test('Monoid#compose', { todo: true }, t => {
  t.end()
})
