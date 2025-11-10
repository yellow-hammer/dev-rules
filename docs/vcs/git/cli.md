---
sidebar_position: 3
sidebar_label: Git CLI
title: Работа с Git через командную строку
---

## Общие сведения

Работа с Git через командную строку (CLI) предоставляет полный контроль над всеми операциями и необходима для выполнения сложных задач, автоматизации и работы в CI/CD системах.

## Установка Git

### Windows

1. Скачайте установщик с [официального сайта Git](https://git-scm.com/download/win)
2. Запустите установщик и следуйте инструкциям
3. Рекомендуется выбрать опцию "Git from the command line and also from 3rd-party software"
4. После установки откройте Git Bash или командную строку и проверьте установку:

```bash
git --version
```

### Настройка пользователя

После установки необходимо настроить имя пользователя и email:

```bash
git config --global user.name "Иванов Иван"
git config --global user.email "ivanov@example.com"
```

Для проверки настроек:

```bash
git config --list
```

## Основные операции

### Инициализация репозитория

Создание нового репозитория в текущей папке:

```bash
git init
```

Инициализация с указанием имени ветки по умолчанию:

```bash
git init -b main
```

### Клонирование репозитория

Клонирование через HTTPS:

```bash
git clone https://github.com/username/repository.git
```

Клонирование через SSH:

```bash
git clone git@github.com:username/repository.git
```

Клонирование в указанную папку:

```bash
git clone https://github.com/username/repository.git my-project
```

Клонирование конкретной ветки:

```bash
git clone -b branch-name https://github.com/username/repository.git
```

### Просмотр статуса

Просмотр текущего состояния репозитория:

```bash
git status
```

Краткий формат:

```bash
git status -s
```

### Добавление файлов в индекс

Добавление всех измененных файлов:

```bash
git add .
```

Добавление конкретного файла:

```bash
git add path/to/file
```

Добавление всех файлов определенного типа:

```bash
git add *.bsl
```

Интерактивное добавление (выборочное):

```bash
git add -i
```

### Создание коммита

Создание коммита с сообщением:

```bash
git commit -m "feat: Добавлена новая обработка"
```

Создание коммита с подробным описанием:

```bash
git commit -m "feat: Добавлена новая обработка" -m "Добавлена обработка для массового обновления справочников"
```

Добавление всех изменений и создание коммита одной командой:

```bash
git commit -am "feat: Добавлена новая обработка"
```

Изменение последнего коммита (amend):

```bash
git commit --amend -m "feat: Исправлен коммит"
```

### Просмотр истории

Просмотр истории коммитов:

```bash
git log
```

Краткий формат:

```bash
git log --oneline
```

Графическое представление:

```bash
git log --graph --oneline --all
```

Просмотр изменений в конкретном коммите:

```bash
git show <commit-hash>
```

### Работа с ветками

Просмотр всех веток:

```bash
git branch
```

Создание новой ветки:

```bash
git branch feature/new-feature
```

Переключение на ветку:

```bash
git checkout feature/new-feature
```

Создание и переключение на новую ветку:

```bash
git checkout -b feature/new-feature
```

Удаление ветки:

```bash
git branch -d feature/new-feature
```

Принудительное удаление:

```bash
git branch -D feature/new-feature
```

### Слияние веток

Слияние ветки в текущую:

```bash
git merge feature/new-feature
```

Слияние с указанием стратегии:

```bash
git merge --no-ff feature/new-feature
```

### Отправка изменений

Отправка изменений в удаленный репозиторий:

```bash
git push
```

Отправка конкретной ветки:

```bash
git push origin branch-name
```

Отправка с установкой upstream:

```bash
git push -u origin branch-name
```

Принудительная отправка (осторожно!):

```bash
git push --force
```

### Получение изменений

Получение изменений из удаленного репозитория:

```bash
git pull
```

Только получение без слияния:

```bash
git fetch
```

Получение и слияние:

```bash
git pull origin branch-name
```

### Работа с удаленными репозиториями

Просмотр удаленных репозиториев:

```bash
git remote -v
```

Добавление удаленного репозитория:

```bash
git remote add origin https://github.com/username/repository.git
```

Изменение URL удаленного репозитория:

```bash
git remote set-url origin https://github.com/username/new-repository.git
```

Удаление удаленного репозитория:

```bash
git remote remove origin
```

## Продвинутые операции

### Отмена изменений

Отмена изменений в рабочей директории (незакоммиченных):

```bash
git checkout -- file-name
```

Отмена всех незакоммиченных изменений:

```bash
git checkout -- .
```

Удаление файлов из индекса (unstage):

```bash
git reset HEAD file-name
```

Откат к предыдущему коммиту (сохранение изменений):

```bash
git reset --soft HEAD~1
```

Откат к предыдущему коммиту (удаление изменений):

```bash
git reset --hard HEAD~1
```

### Stash (временное сохранение)

Сохранение текущих изменений:

```bash
git stash
```

Сохранение с описанием:

```bash
git stash save "Описание изменений"
```

Просмотр списка stash:

```bash
git stash list
```

Применение последнего stash:

```bash
git stash apply
```

Применение конкретного stash:

```bash
git stash apply stash@{0}
```

Удаление stash:

```bash
git stash drop stash@{0}
```

### Разрешение конфликтов

При возникновении конфликтов Git помечает файлы как конфликтующие. После ручного разрешения:

```bash
git add resolved-file
git commit
```

Просмотр конфликтующих файлов:

```bash
git diff --name-only --diff-filter=U
```

### Теги

Создание легковесного тега:

```bash
git tag v1.0.0
```

Создание аннотированного тега:

```bash
git tag -a v1.0.0 -m "Версия 1.0.0"
```

Просмотр всех тегов:

```bash
git tag
```

Отправка тегов в удаленный репозиторий:

```bash
git push origin v1.0.0
```

Отправка всех тегов:

```bash
git push origin --tags
```

## Полезные команды для 1С программистов

### Поиск в истории

Поиск коммитов по сообщению:

```bash
git log --grep="обработка"
```

Поиск коммитов по автору:

```bash
git log --author="Иванов"
```

Поиск изменений в файле:

```bash
git log --follow -- path/to/file
```

### Статистика

Статистика изменений:

```bash
git diff --stat
```

Статистика по автору:

```bash
git shortlog -sn
```

### Очистка

Удаление неотслеживаемых файлов:

```bash
git clean -n  # предпросмотр
git clean -f  # удаление
```

Удаление неотслеживаемых файлов и папок:

```bash
git clean -fd
```

## Алиасы (сокращения)

Для упрощения работы можно создать алиасы:

```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
```

После настройки можно использовать:

```bash
git st    # вместо git status
git co    # вместо git checkout
git ci    # вместо git commit
```

## Рекомендации

1. **Регулярно делайте коммиты** — не накапливайте изменения
2. **Используйте осмысленные сообщения** — следуйте [соглашению о коммитах](../storage.md#соглашение-о-коммитах)
3. **Перед push делайте pull** — избегайте конфликтов
4. **Используйте ветки** — изолируйте изменения по задачам
5. **Проверяйте статус** — регулярно используйте `git status`
