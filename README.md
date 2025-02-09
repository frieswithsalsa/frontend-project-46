### Hexlet tests and linter status:
[![Actions Status](https://github.com/frieswithsalsa/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/frieswithsalsa/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/f9b20adb9e9431df6437/maintainability)](https://codeclimate.com/github/frieswithsalsa/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/f9b20adb9e9431df6437/test_coverage)](https://codeclimate.com/github/frieswithsalsa/frontend-project-46/test_coverage)
![Lint and Test](https://github.com/frieswithsalsa/frontend-project-46/actions/workflows/lint.yml/badge.svg)

## Вычислитель отличий

### Системные требования:
```
Node.js - 20.x
```

### Установка:

```
git clone https://github.com/frieswithsalsa/data-diff-tool.git
cd frontend-project-46/
make install
npm link
```

### Описание:
Вычислитель отличий – программа, определяющая разницу между двумя структурами данных. Это популярная задача, для решения которой существует множество онлайн сервисов, например http://www.jsondiff.com/. Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменений в конфигурационных файлах.

### Возможности утилиты:

* Поддержка разных входных форматов: yaml, json
* Генерация отчета в виде plain text, stylish и json

### Пример использования:

```
# формат plain
gendiff --format plain path/to/file.yml another/path/file.json

Property 'common.follow' was added with value: false
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed

# формат stylish
gendiff filepath1.json filepath2.json

{
  + follow: false
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: {
        key: value
    }
  + setting4: blah blah
  + setting5: {
        key5: value5
    }
}
```


## Примеры работы:

### Сравнение плоских файлов (JSON):
[![asciicast](https://asciinema.org/a/MgcYt10Q84drXxDSIWOcc4sGf.svg)](https://asciinema.org/a/MgcYt10Q84drXxDSIWOcc4sGf)
### Сравнение плоских файлов (YML):
[![asciicast](https://asciinema.org/a/ta0JlInHEbMbqL9nWAl1CpYoZ.svg)](https://asciinema.org/a/ta0JlInHEbMbqL9nWAl1CpYoZ)
### Рекурсивное сравнение:
[![asciicast](https://asciinema.org/a/IJJDQyAJXyJ0Zk3YIjClRpd3A.svg)](https://asciinema.org/a/IJJDQyAJXyJ0Zk3YIjClRpd3A)
### Плоский формат:
[![asciicast](https://asciinema.org/a/keOqpXivRfKBUC7M2KaoWUo2V.svg)](https://asciinema.org/a/keOqpXivRfKBUC7M2KaoWUo2V)
### JSON формат:
[![asciicast](https://asciinema.org/a/iFsya8IIPgffxE6LBrYZ4l6nQ.svg)](https://asciinema.org/a/iFsya8IIPgffxE6LBrYZ4l6nQ)
