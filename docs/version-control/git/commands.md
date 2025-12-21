---
sidebar_position: 2
sidebar_label: Команды
title: Основные команды Git
---

## Команды Git

### Первоначальная настройка

Скрипт настройки: [vanessa-bootstrap/tools/git-global-init.cmd](https://github.com/yellow-hammer/vanessa-bootstrap/blob/main/tools/git-global-init.cmd)

```bash
# Пользователь
git config --global user.name "Иванов Иван"
git config --global user.email "ivanov@example.com"

# Ветка по умолчанию
git config --global init.defaultBranch main

# Кириллица в путях
git config --global core.quotePath false

# Окончания строк (Windows)
git config --global core.autocrlf true
git config --global core.safecrlf false

# Окончания строк (Linux/MacOS)
# git config --global core.autocrlf input
# git config --global core.safecrlf true

# Буфер для больших репозиториев
git config --global http.postBuffer 1048576000

# Псевдонимы (сокращения команд)
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.unstage "reset HEAD --"
git config --global alias.last "log -1 HEAD"

# Проверка настроек
git config --list
```

**Для администратора (длинные пути Windows):**

```bash
git config --system core.longpaths true
```

Настройка редактора и работа с Git в IDE описаны в разделе [IDE](../../ide/README.md).

---

### Базовые операции

| Команда                      | Описание                  |
| ---------------------------- | ------------------------- |
| `git init`                   | Инициализация репозитория |
| `git clone <url>`            | Клонирование репозитория  |
| `git status`                 | Просмотр статуса          |
| `git status -s`              | Краткий статус            |
| `git add .`                  | Добавить все изменения    |
| `git add <файл>`             | Добавить конкретный файл  |
| `git commit -m "сообщение"`  | Создать коммит            |
| `git commit -am "сообщение"` | Добавить и зафиксировать  |
| `git push`                   | Отправить изменения       |
| `git pull`                   | Получить изменения        |
| `git fetch`                  | Получить без слияния      |

---

### Работа с ветками

| Команда                            | Описание                      |
| ---------------------------------- | ----------------------------- |
| `git branch`                       | Список локальных веток        |
| `git branch -a`                    | Все ветки (включая удаленные) |
| `git branch <ветка>`               | Создать ветку                 |
| `git checkout <ветка>`             | Переключиться на ветку        |
| `git checkout -b <ветка>`          | Создать и переключиться       |
| `git merge <ветка>`                | Слить ветку в текущую         |
| `git merge --no-ff <ветка>`        | Слияние без fast-forward      |
| `git branch -d <ветка>`            | Удалить ветку                 |
| `git branch -D <ветка>`            | Принудительно удалить         |
| `git push origin --delete <ветка>` | Удалить удаленную ветку       |

---

### Просмотр истории

```bash
# История коммитов
git log
git log --oneline
git log --graph --oneline --all

# История файла
git log <файл>
git log --follow -- <файл>

# Поиск в истории
git log --grep="текст"
git log --author="Иванов"
git log --since="2 weeks ago"

# Просмотр коммита
git show <коммит>
```

---

### Отмена изменений

#### В рабочей директории

```bash
git checkout -- <файл>       # Отменить изменения в файле
git checkout -- .            # Отменить все изменения
git restore <файл>           # То же самое (новая команда)
```

#### В индексе (staged)

```bash
git reset HEAD <файл>        # Убрать из индекса
git restore --staged <файл>  # То же самое (новая команда)
```

#### Откат коммитов

| Команда                                   | Описание                                                  |
| ----------------------------------------- | --------------------------------------------------------- |
| `git reset --soft HEAD~1`                 | Откатить коммит, сохранить изменения в индексе            |
| `git reset --mixed HEAD~1`                | Откатить коммит, сохранить изменения в рабочей директории |
| `git reset --hard HEAD~1`                 | Откатить коммит, удалить все изменения                    |
| `git commit --amend -m "новое сообщение"` | Изменить последний коммит                                 |

---

### Stash (временное сохранение)

```bash
git stash                       # Сохранить изменения
git stash save "описание"       # Сохранить с описанием
git stash -u                    # Включая неотслеживаемые файлы
git stash list                  # Список сохранений
git stash show                  # Показать содержимое
git stash apply                 # Применить последнее
git stash apply stash@{0}       # Применить конкретное
git stash pop                   # Применить и удалить
git stash drop stash@{0}        # Удалить конкретное
git stash clear                 # Удалить все
```

---

### Теги

```bash
# Создание тегов
git tag v1.0.0                        # Легковесный тег
git tag -a v1.0.0 -m "Релиз 1.0.0"    # Аннотированный тег
git tag -a v1.0.0 <коммит>            # Тег на коммите

# Просмотр
git tag                               # Список тегов
git tag -l "v1.*"                     # С фильтром
git show v1.0.0                       # Информация о теге

# Отправка
git push origin v1.0.0                # Отправить тег
git push origin --tags                # Отправить все теги

# Удаление
git tag -d v1.0.0                     # Удалить локально
git push origin --delete v1.0.0       # Удалить удаленно
```

---

### Удаленные репозитории

```bash
# Просмотр
git remote -v

# Добавление
git remote add origin <url>

# Изменение URL
git remote set-url origin <новый_url>

# Удаление
git remote remove origin
```

---

### Сравнение (diff)

```bash
git diff                    # Изменения в рабочей директории
git diff --staged           # Изменения в индексе
git diff <коммит1> <коммит2>  # Между коммитами
git diff --stat             # Статистика изменений
git diff --name-only        # Только имена файлов
```

---

### Очистка

```bash
git clean -n    # Показать файлы для удаления
git clean -f    # Удалить неотслеживаемые файлы
git clean -fd   # Удалить файлы и папки
git clean -fX   # Удалить игнорируемые файлы
```

---

### Псевдонимы (сокращения)

После [первоначальной настройки](#первоначальная-настройка) доступны:

| Псевдоним            | Команда                    |
| -------------------- | -------------------------- |
| `git st`             | `git status`               |
| `git co`             | `git checkout`             |
| `git br`             | `git branch`               |
| `git ci`             | `git commit`               |
| `git unstage <файл>` | `git reset HEAD -- <файл>` |
| `git last`           | `git log -1 HEAD`          |

---

### Типичный рабочий процесс

```bash
# 1. Получить последние изменения
git pull

# 2. Создать ветку для задачи
git checkout -b feature/новая-функция

# 3. Внести изменения и зафиксировать
git add .
git commit -m "feat: Добавлена новая функция"

# 4. Отправить ветку
git push -u origin feature/новая-функция

# 5. После проверки кода и merge
git checkout main
git pull
git branch -d feature/новая-функция
```
