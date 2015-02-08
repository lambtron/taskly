# taskly

> CLI to turn TODOs to GitHub issues.

This command will scan the code base for 'TODO's and create an GitHub issue on your repo for each.

## Installation

```
$ npm install -g taskly
```

## Usage

In the root directory (where your .gitignore file lives)
```
$ taskly [directory]
```

If it is the first time you are executing this command, note that you will have to provide a [GitHub access token](https://github.com/settings/applications#personal-access-tokens) (which only needs to be set once).

### Examples

Executing `taskly` without the directory will default to the below.
```
$ taskly .
```

You can also choose with subdirectories of your root to scan.
```
$ taskly ./lib/
```

## Options

```
 $ taskly --help

    Usage: taskly [options]

    Options:

        -h, --help     output usage information
        -V, --version  output the version number
        -i, --include  include .gitignore files
```

## License (MIT)

```
WWWWWW||WWWWWW
 W W W||W W W
      ||
    ( OO )__________
     /  |           \
    /o o|    MIT     \
    \___/||_||__||_|| *
         || ||  || ||
        _||_|| _||_||
       (__|__|(__|__|
```

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

