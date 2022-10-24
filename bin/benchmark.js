const Benchmark = require('benchmark');
const { wx } = require('../dist/index.js');

const suite = new Benchmark.Suite();

const size = {
  sm: 'z',
  xl: 'q',
};
const defaultClassName = 'm';
const evalute = wx({
  variants: {
    color: {
      gray: '1',
      red: '2',
      blue: '3',
      black: '4',
    },
    size: value => size[value],
    color2: {
      gray: '1',
      red: '2',
      blue: '3',
      black: '4',
    },
    size2: value => size[value],
    color3: {
      gray: '1',
      red: '2',
      blue: '3',
      black: '4',
    },
    siz3: value => size[value],
  },
  className: defaultClassName,
});
suite
  .add('default variants', () => {
    evalute({});
  })
  .add('record variant', () => {
    evalute({ color: 'gray' });
  })
  .add('function variant', () => {
    evalute({ size: 'xl' });
  })
  .add('multiple variants', () => {
    evalute({
      color: 'gray',
      color2: 'black',
      color3: 'black',
      siz3: 'xl',
      size: 'xl',
      size2: 'xl',
    });
  })
  // add listeners
  .on('cycle', event => {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ async: true });

// logs:
// => RegExp#test x 4,161,532 +-0.99% (59 cycles)
// => String#indexOf x 6,139,623 +-1.00% (131 cycles)
// => Fastest is String#indexOf
