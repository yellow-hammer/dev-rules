---
sidebar_position: 7
sidebar_label: Git Flow
title: Git Flow и стратегии ветвления
---

## Git Flow

### Описание

Git-flow — расширение Git для модели ветвления Винсента Дриссена.

**Ресурсы:**

- Графическая шпаргалка: [http://danielkummer.github.io/git-flow-cheatsheet](http://danielkummer.github.io/git-flow-cheatsheet)
- Оригинальная статья: [http://nvie.com/posts/a-successful-git-branching-model](http://nvie.com/posts/a-successful-git-branching-model)

---

### Структура веток

```
main (production)
├── develop
│   ├── feature/задача-1
│   ├── feature/задача-2
│   └── bugfix/исправление
├── release/1.0.0
└── hotfix/критический-баг
```

| Ветка       | Назначение                           |
| ----------- | ------------------------------------ |
| `main`      | Код, готовый к выпуску, теги релизов |
| `develop`   | Интеграция новых функций             |
| `feature/*` | Разработка новых функций             |
| `release/*` | Подготовка к релизу                  |
| `hotfix/*`  | Срочные исправления в продакшене     |
| `bugfix/*`  | Исправление багов в develop          |

---

### Установка

:::note Windows
Для использования Git Flow в Windows установите [Gitflow-next](https://git-flow.sh/) через winget:

```powershell
winget install --id Gitflow.Gitflow-next
```

:::

---

### Последовательность шагов

#### Инициализация

```bash
git flow init -d -f
```

Будут приняты настройки по умолчанию.

#### Публикация ветки develop

Если в проекте еще нет ветки develop:

```bash
git push origin develop
```

---

### Добавление новой функции

#### Создание feature ветки

```bash
git checkout develop
git flow feature start <номер-задачи>
```

#### Разработка

Вносите изменения и фиксируйте:

```bash
git add .
git commit -m "feat: Описание изменений"
```

#### Завершение feature ветки

##### Вариант 1: Через git flow (без проверки кода)

```bash
git flow feature finish <номер-задачи>
```

##### Вариант 2: Через Merge Request (с проверкой кода)

```bash
git push -u origin feature/<номер-задачи>
# Создать Merge Request через web-интерфейс
# Выбрать проверяющего
# После одобрения — merge в develop
```

---

### Подготовка релиза

#### Создание release ветки

```bash
git checkout develop
git flow release start <номер-релиза>
```

#### Финальные правки

- Обновление версии
- Исправление мелких багов
- Обновление документации
- Сортировка объектов метаданных в дереве
- Обновление зависимостей (например, расширения, подключённые через submodule)

#### Завершение release

```bash
git flow release finish <номер-релиза>
```

Это автоматически:

- Сольет release в main
- Создаст тег с номером релиза
- Сольет release обратно в develop
- Удалит release ветку

---

### Срочные исправления (hotfix)

Используется когда нужно срочно исправить баг в промышленной среде.

```bash
# Создание
git checkout main
git flow hotfix start <версия>

# Исправление
git add .
git commit -m "fix: Описание исправления"

# Завершение
git flow hotfix finish <версия>
```

Hotfix автоматически сливается в main и develop.

---

### Справочник команд git flow

#### Feature

```
git flow feature [list]
git flow feature start <name> [<base>]
git flow feature finish <name>
git flow feature publish <name>
git flow feature track <name>
git flow feature diff [<name>]
git flow feature rebase [-i] [<name>]
git flow feature checkout [<name>]
git flow feature pull <remote> [<name>]
```

#### Release

```
git flow release [list]
git flow release start <version>
git flow release finish <version>
git flow release publish <name>
git flow release track <name>
```

#### Hotfix

```
git flow hotfix [list]
git flow hotfix start <version> [<base>]
git flow hotfix finish <version>
```

---

### Альтернативы

#### GitHub Flow (для небольших команд)

Простая модель:

1. `main` всегда готова к развёртыванию
2. Создавать ветки от `main` для задач
3. Создавать Pull Request
4. После одобрения — merge в `main`
5. Сразу развёртывать

```bash
git checkout main
git pull
git checkout -b add-new-feature
# ... разработка ...
git push -u origin add-new-feature
# Создать Pull Request
```

#### GitLab Flow (с окружениями)

Для проектов с несколькими окружениями:

```
production
├── pre-production
│   └── staging
│       └── develop
│           └── feature/*
```

---

### Рекомендации

#### Выбор стратегии

| Стратегия   | Когда использовать                      |
| ----------- | --------------------------------------- |
| Git Flow    | Регулярные релизы, большие команды      |
| GitHub Flow | Небольшие команды, частые развёртывания |
| GitLab Flow | Несколько окружений (dev, test, prod)   |

#### Соглашения

1. **Именование веток:**
   - `feature/название-функции`
   - `bugfix/описание-бага`
   - `hotfix/критический-баг`
   - `release/версия`

2. **Коммиты:** Следуйте [Conventional Commits](https://www.conventionalcommits.org/ru/v1.0.0/)

3. **Merge:** Используйте `--no-ff` для сохранения истории
