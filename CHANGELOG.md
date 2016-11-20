# Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning].

This change log follows the format documented in [Keep a CHANGELOG].

[Semantic Versioning]: http://semver.org/
[Keep a CHANGELOG]: http://keepachangelog.com/

## Unreleased

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

[Unreleased]: https://github.com/kossnocorp/react-guard/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/kossnocorp/react-guard/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/kossnocorp/react-guard/compare/v0.1.0...v0.2.0
