# Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning].

This change log follows the format documented in [Keep a CHANGELOG].

[semantic versioning]: http://semver.org/
[keep a changelog]: http://keepachangelog.com/

## 0.6.0 - 2022-08-30

### Added

- Added support for function components.

## 0.5.0 - 2017-07-28

### Fixed

- Fix exception cause by native (not transpiled) arrow functions.
  Kudos to [@lixiaoyan](https://github.com/lixiaoyan).

## 0.4.0 - 2016-12-12

### Added

- Fallback to `constructor.name` when `constructor.displayName`
  isn't present.

## 0.3.1 - 2016-12-01

### Fixed

- Fix a stateful component missing the state when it's rendered
  as a function component children.
- Copy all original function component properties to
  the wrapped function.

## 0.3.0 - 2016-11-20

### Fixed

- Fix function components behaviour. Now the guarded function
  accepts 3 arguments instead of just 1:
  `props`, `publicContext` and `updateQueue`.

### Added

- Pass `displayName` to the guard function.

## 0.2.0 - 2016-11-18

### Added

- Classes & function components support.
- Pass the component props and state to the guard function.
- Restore function.

## 0.1.0 - 2014-12-08

Initial release.

[unreleased]: https://github.com/kossnocorp/react-guard/compare/v0.3.1...HEAD
[0.3.1]: https://github.com/kossnocorp/react-guard/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/kossnocorp/react-guard/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/kossnocorp/react-guard/compare/v0.1.0...v0.2.0
