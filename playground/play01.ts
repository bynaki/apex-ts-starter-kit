import {
  join
} from 'path'

console.log(join(__dirname, './functions', '/hello/', 'src/**/**.ts'))
