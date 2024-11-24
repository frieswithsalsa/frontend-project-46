### Hexlet tests and linter status:
[![Actions Status](https://github.com/Abikimoz/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/Abikimoz/frontend-project-46/actions)
[![Node CI](https://github.com/Abikimoz/frontend-project-46/workflows/Node%20CI/badge.svg)](https://github.com/Abikimoz/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/2dbd5d592a5aaf01a986/maintainability)](https://codeclimate.com/github/Abikimoz/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/2dbd5d592a5aaf01a986/test_coverage)](https://codeclimate.com/github/Abikimoz/frontend-project-46/test_coverage)

# Вычислитель отличий

Консольная утилита для сравнения двух объектов. Объекты считываются только из файлов форматов JSON, YML и YAML.

# Примеры работы

<a href="https://asciinema.org/a/AbMZvGEZ8W0wX6aLR6jKorgL1" target="_blank"><img src="https://asciinema.org/a/AbMZvGEZ8W0wX6aLR6jKorgL1.svg" /></a>

<a href="https://asciinema.org/a/VWQBROCZSaYZN11RgoihpuPS9" target="_blank"><img src="https://asciinema.org/a/VWQBROCZSaYZN11RgoihpuPS9.svg" /></a>

<a href="https://asciinema.org/a/YY9AR6MyApvPevRX8o9v9roj9" target="_blank"><img src="https://asciinema.org/a/YY9AR6MyApvPevRX8o9v9roj9.svg" /></a>

<a href="https://asciinema.org/a/3uyBootLJ0zl3n90TUf0X2BQB" target="_blank"><img src="https://asciinema.org/a/3uyBootLJ0zl3n90TUf0X2BQB.svg" /></a>

<a href="https://asciinema.org/a/yXR4H7lXAM8G5rOWTXPYEWwOA" target="_blank"><img src="https://asciinema.org/a/yXR4H7lXAM8G5rOWTXPYEWwOA.svg" /></a>

# Установка

```bash
git clone git@github.com:Abikimoz/frontend-project-46.git
cd frontend-project-46
make install
```

# Использование

```bash
gendiff [options] <filepath1> <filepath2>
например: gendiff -f plain file1.json file2.yaml
```

```bash
options:
  -V, --version        output the version number
  -f, --format [type]  output format (default: "stylish")
  -h, --help           display help for command
```

Программа умеет выводить различия в трех форматах, по умолчанию это формат stylish. Также это могут быть plain и json. Для вывода результата согласно определенному формату введите -f [format]

```bash
gendiff -f plain file1.json file2.yaml
```
