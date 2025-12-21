---
sidebar_position: 6
sidebar_label: Submodules
title: Git Submodules
---

## Submodules

### Что это

**Git Submodules** позволяют включать один Git репозиторий как подкаталог другого. Код остается отдельным репозиторием, но доступен из основного проекта.

### Когда использовать

- Общие библиотеки в нескольких проектах
- Общие расширения конфигурации
- Внешние зависимости с возможностью обновления
- Разделение больших проектов на части

---

### Добавление Submodule

```bash
git submodule add <url> <path>
```

**Пример:**

```bash
git submodule add https://github.com/company/infostart-print-wizard.git src/cfe/infostart-print-wizard
```

Создается файл `.gitmodules`:

```ini
[submodule "src/cfe/infostart-print-wizard"]
    path = src/cfe/infostart-print-wizard
    url = https://github.com/company/infostart-print-wizard.git
```

---

### Клонирование с Submodules

#### Вариант 1: Рекурсивное клонирование

```bash
git clone --recursive <url>
```

#### Вариант 2: После обычного клонирования

```bash
git clone <url>
cd project
git submodule update --init --recursive
```

---

### Обновление Submodules

#### Обновить конкретный submodule

```bash
cd src/cfe/infostart-print-wizard
git pull origin main
cd ../../..
git add src/cfe/infostart-print-wizard
git commit -m "chore: Обновлён submodule infostart-print-wizard"
```

#### Обновить все submodules

```bash
git submodule update --remote
git add .
git commit -m "chore: Обновлены все submodules"
```

---

### Работа с Submodules

#### Просмотр статуса

```bash
git submodule status
```

#### Переключение на конкретную версию

```bash
cd src/cfe/infostart-print-wizard
git checkout v1.2.0
cd ../../..
git add src/cfe/infostart-print-wizard
git commit -m "chore: Зафиксирована версия v1.2.0"
```

#### Внесение изменений в submodule

```bash
cd src/cfe/infostart-print-wizard
# Внести изменения
git add .
git commit -m "fix: Исправление в модуле"
git push origin main
cd ../../..
git add src/cfe/infostart-print-wizard
git commit -m "chore: Обновлен submodule с исправлениями"
```

---

### Удаление Submodule

```bash
# 1. Удалить из индекса
git rm --cached src/cfe/infostart-print-wizard

# 2. Удалить из .git/modules
rm -rf .git/modules/src/cfe/infostart-print-wizard

# 3. Удалить папку
rm -rf src/cfe/infostart-print-wizard

# 4. Зафиксировать изменения
git commit -m "chore: Удален submodule infostart-print-wizard"
```

---

### Полезные команды

```bash
# Инициализировать все submodules
git submodule init

# Обновить все submodules
git submodule update

# Обновить до последних версий
git submodule update --remote

# Синхронизировать URL из .gitmodules
git submodule sync

# Выполнить команду во всех submodules
git submodule foreach 'git pull origin main'
```

---

### Устранение проблем

#### Submodule показывает как измененный

```bash
# Если изменения нужны
git add src/cfe/infostart-print-wizard
git commit -m "chore: Обновлен submodule"

# Если не нужны — вернуть к зафиксированной версии
git submodule update --init
```

#### Submodule не обновляется

```bash
git submodule update --init --recursive --force
```

---

### Альтернативы

| Подход          | Описание                           |
| --------------- | ---------------------------------- |
| Git Subtree     | Встраивает код в репозиторий       |
| Монорепозиторий | Один репозиторий для всех проектов |
| Package Manager | Для внешних зависимостей           |
