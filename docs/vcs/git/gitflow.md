---
sidebar_position: 7
sidebar_label: Git Flow
title: Git Flow и стратегии ветвления
---

## Общие сведения

Git Flow — это модель ветвления для Git, созданная Винсентом Дриссеном. Она определяет строгую структуру веток и правила их использования, что особенно полезно для проектов с регулярными релизами.

## Основные ветки

### main (master)

- **Назначение**: Ветка с продакшн-готовым кодом
- **Особенности**:
  - Всегда стабильна
  - Каждый коммит должен быть готов к развертыванию
  - Защищена от прямых коммитов (только через merge)
  - Тегируются релизы

### develop

- **Назначение**: Ветка для интеграции новых функций
- **Особенности**:
  - Содержит последние изменения для следующего релиза
  - Всегда должна быть стабильной
  - Используется для ежедневной разработки

## Вспомогательные ветки

### Feature ветки

**Назначение**: Разработка новых функций

**Создание:**

```bash
git checkout develop
git pull origin develop
git checkout -b feature/new-processing
```

**Завершение:**

```bash
git checkout develop
git pull origin develop
git merge --no-ff feature/new-processing
git branch -d feature/new-processing
git push origin develop
```

**Соглашение об именовании:** `feature/*`

### Release ветки

**Назначение**: Подготовка к новому релизу

**Создание:**

```bash
git checkout develop
git pull origin develop
git checkout -b release/1.2.0
```

**Завершение:**

```bash
# Завершение release ветки
git checkout main
git merge --no-ff release/1.2.0
git tag -a v1.2.0 -m "Релиз версии 1.2.0"
git checkout develop
git merge --no-ff release/1.2.0
git branch -d release/1.2.0
git push origin main --tags
git push origin develop
```

**Соглашение об именовании:** `release/*`

### Hotfix ветки

**Назначение**: Срочные исправления в продакшене

**Создание:**

```bash
git checkout main
git pull origin main
git checkout -b hotfix/critical-bug
```

**Завершение:**

```bash
git checkout main
git merge --no-ff hotfix/critical-bug
git tag -a v1.2.1 -m "Hotfix версии 1.2.1"
git checkout develop
git merge --no-ff hotfix/critical-bug
git branch -d hotfix/critical-bug
git push origin main --tags
git push origin develop
```

**Соглашение об именовании:** `hotfix/*`

### Bugfix ветки

**Назначение**: Исправление багов в develop

**Создание:**

```bash
git checkout develop
git pull origin develop
git checkout -b bugfix/fix-calculation
```

**Завершение:**

```bash
git checkout develop
git merge --no-ff bugfix/fix-calculation
git branch -d bugfix/fix-calculation
git push origin develop
```

**Соглашение об именовании:** `bugfix/*`

## Упрощенный Git Flow для 1С

Для проектов 1С часто используется упрощенная версия:

### Структура веток

```
main (master)
  ├── develop
  │   ├── feature/new-document
  │   ├── feature/new-report
  │   └── bugfix/fix-error
  └── release/1.0.0
```

### Рабочий процесс

1. **Разработка новой функции:**

   ```bash
   git checkout develop
   git pull
   git checkout -b feature/new-document
   # ... разработка ...
   git add .
   git commit -m "feat: Добавлен новый документ"
   git push -u origin feature/new-document
   # Создать Pull Request в develop
   ```

2. **Исправление бага:**

   ```bash
   git checkout develop
   git pull
   git checkout -b bugfix/fix-calculation
   # ... исправление ...
   git add .
   git commit -m "fix: Исправлен расчет суммы"
   git push -u origin bugfix/fix-calculation
   # Создать Pull Request в develop
   ```

3. **Подготовка релиза:**

   ```bash
   git checkout develop
   git pull
   git checkout -b release/1.0.0
   # ... финальные правки, обновление версии ...
   git commit -m "chore(release): prepare for 1.0.0"
   git push -u origin release/1.0.0
   # Тестирование, после успеха - merge в main
   ```

## GitHub Flow (альтернатива)

Более простая модель для небольших команд:

### Принципы

1. `main` всегда развертываема
2. Создавать ветки от `main` для новых функций
3. Регулярно отправлять изменения в удаленный репозиторий
4. Создавать Pull Request для обсуждения
5. После одобрения — merge в `main`
6. Сразу после merge — развертывание

### Рабочий процесс

```bash
# Создать ветку
git checkout main
git pull
git checkout -b add-new-processing

# Разработка
git add .
git commit -m "feat: Добавлена обработка"
git push -u origin add-new-processing

# Создать Pull Request на GitHub/GitLab
# После одобрения и merge:
git checkout main
git pull
git branch -d add-new-processing
```

## GitLab Flow (для 1С проектов)

Модель с окружениями, подходящая для проектов 1С:

### Структура веток

```
production (main)
  ├── pre-production
  │   ├── staging
  │   │   ├── develop
  │   │   │   ├── feature/*
  │   │   │   └── bugfix/*
```

### Рабочий процесс

1. Разработка в `develop` или feature ветках
2. После тестирования — merge в `staging`
3. После проверки на staging — merge в `pre-production`
4. Финальное тестирование и merge в `production`

## Рекомендации для 1С программистов

### Выбор стратегии

**Используйте Git Flow, если:**

- Проект имеет регулярные релизы
- Есть отдельные команды разработки и тестирования
- Нужна строгая структура веток

**Используйте GitHub Flow, если:**

- Небольшая команда
- Частые развертывания
- Простые проекты

**Используйте GitLab Flow, если:**

- Есть несколько окружений (dev, test, prod)
- Нужна строгая последовательность развертывания
- Проекты с длительным циклом разработки

### Соглашения для 1С

1. **Именование веток:**
   - `feature/название-функции` — новые функции
   - `bugfix/описание-бага` — исправления багов
   - `hotfix/критический-баг` — срочные исправления
   - `release/версия` — подготовка релиза

2. **Коммиты:**
   - Следуйте [соглашению о коммитах](../storage.md#соглашение-о-коммитах)
   - Один коммит — одна логическая единица изменения

3. **Merge:**
   - Используйте `--no-ff` для сохранения истории
   - Всегда делайте code review перед merge
   - Тестируйте перед merge в main

### Интеграция с хранилищем 1С

При использовании Git вместе с хранилищем 1С:

1. Синхронизируйте версии между Git и хранилищем
2. Используйте инструменты типа Oproxy для автоматизации
3. Следите за соответствием веток в Git и версий в хранилище

## Инструменты

### Git Flow (автоматизация)

Установка:

```bash
# Windows (через Git Bash)
curl -OL https://raw.github.com/nvie/gitflow/develop/contrib/gitflow-installer.sh
bash gitflow-installer.sh
```

Использование:

```bash
# Инициализация
git flow init

# Создать feature ветку
git flow feature start new-processing

# Завершить feature ветку
git flow feature finish new-processing

# Создать release ветку
git flow release start 1.0.0

# Завершить release ветку
git flow release finish 1.0.0
```

### Альтернативы

- **GitKraken** — графический клиент с поддержкой Git Flow
- **SourceTree** — еще один графический клиент
- **VS Code расширения** — Git Graph, GitLens

## Частые вопросы

### Когда создавать release ветку?

Создавайте release ветку, когда:

- Все запланированные функции для релиза готовы
- Начинается период стабилизации
- Нужно подготовить документацию и обновить версию

### Как обрабатывать конфликты?

1. Регулярно синхронизируйте feature ветки с develop
2. Используйте `git rebase` для обновления feature веток
3. Разрешайте конфликты сразу, не откладывайте

### Можно ли изменять main напрямую?

Нет, в классическом Git Flow main защищена. Все изменения идут через:

- Feature → Develop → Release → Main
- Hotfix → Main (и Develop)
