---
sidebar_position: 5
sidebar_label: Git LFS
title: Git LFS для больших файлов
---

## Git LFS

### Что это

**Git LFS** (Large File Storage) — расширение Git для работы с большими файлами. Вместо хранения файлов в репозитории, Git LFS сохраняет их на сервере и хранит только указатели.

### Зачем нужен

Обычный Git не предназначен для больших файлов. Это приводит к:

- Медленной работе репозитория
- Превышению лимитов размера
- Долгому клонированию

**Что хранить в LFS:**

- Артефакты конфигураций (`.cf`, `.cfe`, `.erf`, `.epf`)
- Дампы баз данных (`.dt`)
- Архивы (`.zip`, `.7z`)
- Медиафайлы

---

### Установка

**Windows:**

Скачать с [git-lfs.github.com](https://git-lfs.github.com/) или использовать встроенный в Git for Windows.

Проверка:

```bash
git lfs version
```

---

### Настройка

#### Инициализация

```bash
git lfs install
```

#### Отслеживание файлов

```bash
# По типу файла
git lfs track "*.cf"
git lfs track "*.dt"
git lfs track "*.zip"

# Конкретный файл
git lfs track "path/to/large-file.bin"

# Все файлы в папке
git lfs track "exports/*"
```

#### Добавление .gitattributes

```bash
git add .gitattributes
git commit -m "chore: Настроен Git LFS"
```

---

### Использование

После настройки работа как обычно:

```bash
git add 1Cv8.cf
git commit -m "feat: Добавлена выгрузка конфигурации"
git push
```

Git LFS автоматически заменит файлы указателями.

---

### Просмотр

```bash
# Список отслеживаемых паттернов
git lfs track

# Файлы в LFS
git lfs ls-files

# Статус
git lfs status

# Информация
git lfs env
```

---

### Клонирование с LFS

```bash
# Обычное клонирование (загружает LFS файлы)
git clone <url>

# Без загрузки LFS файлов (быстрее)
GIT_LFS_SKIP_SMUDGE=1 git clone <url>

# Загрузить LFS файлы позже
git lfs pull
```

---

### Миграция существующих файлов

Если большие файлы уже в репозитории:

```bash
# Миграция файлов определенного типа
git lfs migrate import --include="*.cf" --everything

# Миграция файлов больше 10MB
git lfs migrate import --above=10MB --everything
```

⚠️ **Важно:** История будет переписана. Требуется `git push --force`.

---

### .gitattributes для 1С

Рекомендуемая конфигурация:

```gitattributes
# Выгрузки конфигурации
*.cf filter=lfs diff=lfs merge=lfs -text

# Дампы баз данных
*.dt filter=lfs diff=lfs merge=lfs -text

# Архивы
*.zip filter=lfs diff=lfs merge=lfs -text
*.7z filter=lfs diff=lfs merge=lfs -text
*.rar filter=lfs diff=lfs merge=lfs -text

# Бинарные файлы
*.bin filter=lfs diff=lfs merge=lfs -text
```

---

### Ограничения

| Сервис             | Хранилище       | Трафик/месяц |
| ------------------ | --------------- | ------------ |
| GitHub (бесплатно) | 1 GB            | 1 GB         |
| GitLab (бесплатно) | 10 GB           | —            |
| Собственный сервер | Без ограничений | —            |

---

### Очистка

```bash
# Удалить старые версии LFS файлов
git lfs prune

# Проверить перед удалением
git lfs prune --verify-remote
```

---

### Устранение проблем

#### LFS файлы не загружаются

```bash
git lfs install --force
git lfs pull
```

#### Превышен лимит хранилища

1. Проверить размер: `git lfs ls-files`
2. Удалить старые версии: `git lfs prune`
3. Рассмотреть альтернативы (S3, Azure Blob)

---

### Альтернативы LFS

- **Артефакты CI/CD** — хранить большие файлы как артефакты сборки
- **Облачное хранилище** — S3, Azure Blob Storage
- **Отдельные репозитории** — вынести большие файлы отдельно
