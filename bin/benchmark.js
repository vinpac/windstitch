const Benchmark = require('benchmark');
const { wx } = require('../dist/index.js');

const suite = new Benchmark.Suite();

const size = {
  sm: 'z',
  xl: 'q',
};
const defaultClassName = 'm';
const config = {
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
};
const evaluate = wx(config);
const compoundEvaluate = wx({
  ...config,
  compoundVariants: [
    {
      color: 'gray',
      defaultTo: {
        size3: 'sm',
      },
    },
    {
      color: 'gray',
      size: 'xl',
      defaultTo: {
        size3: 'sm',
      },
    },
    {
      color: 'gray',
      size: 'xl',
      color2: 'gray',
      defaultTo: {
        size3: 'sm',
      },
    },
  ],
});
suite
  .add('default variants', () => {
    evaluate({});
  })
  .add('record variant', () => {
    evaluate({ color: 'gray' });
  })
  .add('function variant', () => {
    evaluate({ size: 'xl' });
  })
  .add('multiple variants', () => {
    evaluate({
      color: 'gray',
      color2: 'black',
      color3: 'black',
      siz3: 'xl',
      size: 'xl',
      size2: 'xl',
    });
  })
  .add('compound variants', () => {
    compoundEvaluate({
      color: 'gray',
      color2: 'gray',
      size: 'xl',
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
