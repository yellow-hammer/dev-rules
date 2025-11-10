---
sidebar_position: 9
sidebar_label: Submodules
title: Git Submodules
---

## Общие сведения

Git Submodules позволяют включать один Git репозиторий как подкаталог другого Git репозитория. Это полезно, когда нужно использовать код из другого проекта, сохраняя при этом его как отдельный репозиторий.

## Когда использовать Submodules

Submodules полезны в следующих случаях:

- Использование общих библиотек или модулей в нескольких проектах
- Включение внешних зависимостей с сохранением возможности обновления
- Разделение больших проектов на независимые части
- Использование общих расширений конфигурации в разных проектах 1С

## Добавление Submodule

### Добавление существующего репозитория

```bash
git submodule add <url> <path>
```

**Пример:**

```bash
git submodule add https://github.com/company/common-modules.git libs/common-modules
```

Эта команда:

1. Клонирует репозиторий в указанную папку
2. Создает файл `.gitmodules` с информацией о submodule
3. Добавляет submodule в индекс

### Файл .gitmodules

После добавления submodule создается файл `.gitmodules`:

```ini
[submodule "libs/common-modules"]
    path = libs/common-modules
    url = https://github.com/company/common-modules.git
```

## Клонирование репозитория с Submodules

### Стандартное клонирование

При обычном клонировании submodules не загружаются автоматически:

```bash
git clone https://github.com/company/main-project.git
cd main-project
# Папка submodule будет пустой
```

### Клонирование с Submodules

#### Вариант 1: Рекурсивное клонирование

```bash
git clone --recursive https://github.com/company/main-project.git
```

#### Вариант 2: Клонирование и инициализация

```bash
git clone https://github.com/company/main-project.git
cd main-project
git submodule init
git submodule update
```

#### Вариант 3: Одной командой

```bash
git clone https://github.com/company/main-project.git
cd main-project
git submodule update --init --recursive
```

## Работа с Submodules

### Обновление Submodule

Обновить submodule до последней версии из удаленного репозитория:

```bash
cd libs/common-modules
git pull origin main
cd ../..
git add libs/common-modules
git commit -m "chore: Обновлен submodule common-modules"
```

Или из корня проекта:

```bash
git submodule update --remote libs/common-modules
git add libs/common-modules
git commit -m "chore: Обновлен submodule common-modules"
```

### Обновление всех Submodules

```bash
git submodule update --remote
git add .
git commit -m "chore: Обновлены все submodules"
```

### Переключение на конкретную версию

Submodules отслеживают конкретный коммит, а не ветку:

```bash
cd libs/common-modules
git checkout v1.2.0
cd ../..
git add libs/common-modules
git commit -m "chore: Зафиксирована версия submodule v1.2.0"
```

### Просмотр статуса Submodules

```bash
# Статус всех submodules
git submodule status

# Подробный статус
git status
# Submodules отображаются как "modified" если есть новые коммиты
```

### Внесение изменений в Submodule

Если нужно изменить код в submodule:

```bash
cd libs/common-modules
# Внести изменения
git add .
git commit -m "fix: Исправлена ошибка в модуле"
git push origin main
cd ../..
# Обновить ссылку в основном репозитории
git add libs/common-modules
git commit -m "chore: Обновлен submodule с исправлениями"
```

## Удаление Submodule

Удаление submodule требует нескольких шагов:

```bash
# 1. Удалить запись из .gitmodules
# (отредактировать файл вручную или использовать git)

# 2. Удалить из индекса
git rm --cached libs/common-modules

# 3. Удалить папку .git/modules (если есть)
rm -rf .git/modules/libs/common-modules

# 4. Удалить папку submodule
rm -rf libs/common-modules

# 5. Закоммитить изменения
git commit -m "chore: Удален submodule common-modules"
```

## Настройка Submodules

### Отслеживание конкретной ветки

По умолчанию submodules отслеживают конкретный коммит. Для отслеживания ветки:

```bash
git config -f .gitmodules submodule.libs/common-modules.branch main
```

Затем при обновлении:

```bash
git submodule update --remote --merge
```

### Игнорирование изменений в Submodule

Если нужно игнорировать локальные изменения в submodule:

```bash
git config submodule.libs/common-modules.ignore all
```

Варианты значения `ignore`:

- `none` — не игнорировать (по умолчанию)
- `untracked` — игнорировать неотслеживаемые файлы
- `dirty` — игнорировать изменения в отслеживаемых файлах
- `all` — игнорировать все изменения

## Использование в проектах 1С

### Сценарий 1: Общие модули

Если у вас есть общие модули, используемые в нескольких проектах:

```bash
# В основном проекте
git submodule add https://gitlab.company.com/common-modules.git src/CommonModules

# В другом проекте
git submodule add https://gitlab.company.com/common-modules.git src/CommonModules
```

### Сценарий 2: Расширения конфигурации

Использование общих расширений:

```bash
git submodule add https://gitlab.company.com/extensions/base-extension.git extensions/BaseExtension
```

### Сценарий 3: Внешние обработки

Включение библиотеки внешних обработок:

```bash
git submodule add https://github.com/1c-community/external-processings.git libs/ExternalProcessings
```

## Рекомендации

### Когда использовать Submodules

✅ **Используйте Submodules, если:**

- Нужно использовать код из другого репозитория
- Хотите сохранить историю изменений внешнего кода
- Нужна возможность обновлять зависимость независимо
- Код используется в нескольких проектах

❌ **Не используйте Submodules, если:**

- Нужна простая зависимость (лучше использовать package manager)
- Команда не знакома с Submodules (могут возникнуть проблемы)
- Нужна автоматическая синхронизация (Submodules требуют ручного обновления)

### Альтернативы Submodules

1. **Git Subtree** — встраивает код напрямую в репозиторий
2. **Package Managers** — для зависимостей (если применимо)
3. **Монорепозиторий** — один репозиторий для всех проектов
4. **Копирование кода** — простое копирование (теряется связь с исходником)

### Рабочий процесс

1. **При клонировании проекта:**

   ```bash
   git clone --recursive <url>
   ```

2. **При обновлении:**

   ```bash
   git pull
   git submodule update --init --recursive
   ```

3. **При работе с submodule:**

   ```bash
   cd submodule-path
   # Внести изменения
   git add .
   git commit -m "описание"
   git push
   cd ..
   git add submodule-path
   git commit -m "chore: Обновлен submodule"
   git push
   ```

## Устранение проблем

### Проблема: Submodule показывает как измененный

**Причина:** Submodule указывает на другой коммит, чем зафиксирован в основном репозитории

**Решение:**

```bash
# Если изменения нужны
git add submodule-path
git commit -m "chore: Обновлен submodule"

# Если изменения не нужны
cd submodule-path
git checkout <зафиксированный-коммит>
cd ..
```

### Проблема: Конфликты при слиянии

**Причина:** Разные ветки указывают на разные версии submodule

**Решение:**

```bash
# Разрешить конфликт, выбрав нужную версию
cd submodule-path
git checkout <нужная-версия>
cd ..
git add submodule-path
git commit
```

### Проблема: Submodule не обновляется

**Решение:**

```bash
git submodule update --init --recursive --force
```

## Полезные команды

```bash
# Инициализировать все submodules
git submodule init

# Обновить все submodules
git submodule update

# Обновить до последних версий из удаленных репозиториев
git submodule update --remote

# Обновить и слить изменения
git submodule update --remote --merge

# Обновить и перебазировать
git submodule update --remote --rebase

# Синхронизировать URL submodules из .gitmodules
git submodule sync

# Выполнить команду во всех submodules
git submodule foreach 'git pull origin main'
```
