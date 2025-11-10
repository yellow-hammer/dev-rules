---
sidebar_position: 4
sidebar_label: SSH ключи
title: Настройка SSH ключей для Git
---

## Общие сведения

SSH (Secure Shell) ключи используются для безопасной аутентификации при работе с Git репозиториями без необходимости ввода пароля при каждой операции.

## Генерация SSH ключа

### Windows

1. Откройте Git Bash или PowerShell

2. Проверьте, есть ли уже существующие SSH ключи:

```bash
ls -al ~/.ssh
```

3. Если ключей нет, создайте новый:

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

Для старых систем, которые не поддерживают Ed25519:

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

4. При запросе укажите путь для сохранения ключа (по умолчанию Enter для `~/.ssh/id_ed25519`)

5. Введите парольную фразу (passphrase) или оставьте пустым (не рекомендуется для безопасности)

### Результат

После выполнения команды будут созданы два файла:

- `~/.ssh/id_ed25519` — приватный ключ (никогда не передавайте его!)
- `~/.ssh/id_ed25519.pub` — публичный ключ (этот нужно добавить на сервер)

## Добавление SSH ключа в ssh-agent

### Windows (Git Bash)

1. Запустите ssh-agent:

```bash
eval "$(ssh-agent -s)"
```

2. Добавьте ключ в ssh-agent:

```bash
ssh-add ~/.ssh/id_ed25519
```

### Windows (PowerShell)

1. Запустите ssh-agent:

```powershell
Get-Service ssh-agent | Set-Service -StartupType Manual
Start-Service ssh-agent
```

2. Добавьте ключ:

```powershell
ssh-add ~/.ssh/id_ed25519
```

### Автоматический запуск ssh-agent

Для автоматического запуска ssh-agent при старте Git Bash создайте файл `~/.bashrc`:

```bash
env=~/.ssh/agent.env

agent_load_env () { test -f "$env" && . "$env" >| /dev/null ; }

agent_start () {
    (umask 077; ssh-agent >| "$env")
    . "$env" >| /dev/null ; }

agent_load_env

# agent_run_state: 0=agent running w/ key; 1=agent w/o key; 2=agent not running
agent_run_state=$(ssh-add -l >| /dev/null 2>&1; echo $?)

if [ ! "$SSH_AUTH_SOCK" ] || [ $agent_run_state = 2 ]; then
    agent_start
    ssh-add
elif [ "$SSH_AUTH_SOCK" ] && [ $agent_run_state = 1 ]; then
    ssh-add
fi

unset env
```

## Добавление публичного ключа на сервер

### GitHub

1. Скопируйте содержимое публичного ключа:

```bash
cat ~/.ssh/id_ed25519.pub
```

Или в Windows:

```powershell
Get-Content ~/.ssh/id_ed25519.pub | clip
```

2. Перейдите на GitHub → Settings → SSH and GPG keys
3. Нажмите "New SSH key"
4. Введите название ключа (например, "Work Laptop")
5. Вставьте содержимое публичного ключа
6. Нажмите "Add SSH key"

### GitLab

1. Скопируйте содержимое публичного ключа (как описано выше)
2. Перейдите на GitLab → Preferences → SSH Keys
3. Вставьте ключ в поле "Key"
4. Введите название в поле "Title"
5. Нажмите "Add key"

### Bitbucket

1. Скопируйте содержимое публичного ключа
2. Перейдите в Bitbucket → Personal settings → SSH keys
3. Нажмите "Add key"
4. Вставьте ключ и нажмите "Add key"

## Проверка подключения

Проверьте подключение к серверу:

### GitHub

```bash
ssh -T git@github.com
```

Ожидаемый ответ:

```
Hi username! You've successfully authenticated, but GitHub does not provide shell access.
```

### GitLab

```bash
ssh -T git@gitlab.com
```

Ожидаемый ответ:

```
Welcome to GitLab, @username!
```

### Bitbucket

```bash
ssh -T git@bitbucket.org
```

## Использование SSH URL

После настройки SSH ключей используйте SSH URL вместо HTTPS:

```bash
# Вместо
git clone https://github.com/username/repository.git

# Используйте
git clone git@github.com:username/repository.git
```

Для изменения URL существующего репозитория:

```bash
git remote set-url origin git@github.com:username/repository.git
```

## Работа с несколькими SSH ключами

Если нужно использовать разные ключи для разных сервисов или проектов:

1. Создайте файл конфигурации `~/.ssh/config`:

```
# GitHub
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_github
    IdentitiesOnly yes

# GitLab
Host gitlab.com
    HostName gitlab.com
    User git
    IdentityFile ~/.ssh/id_ed25519_gitlab
    IdentitiesOnly yes

# Корпоративный GitLab
Host gitlab.company.com
    HostName gitlab.company.com
    User git
    IdentityFile ~/.ssh/id_ed25519_work
    IdentitiesOnly yes
```

2. Создайте отдельные ключи для каждого сервиса:

```bash
ssh-keygen -t ed25519 -C "github@example.com" -f ~/.ssh/id_ed25519_github
ssh-keygen -t ed25519 -C "gitlab@example.com" -f ~/.ssh/id_ed25519_gitlab
```

3. Добавьте каждый ключ в ssh-agent:

```bash
ssh-add ~/.ssh/id_ed25519_github
ssh-add ~/.ssh/id_ed25519_gitlab
```

4. Добавьте соответствующие публичные ключи на серверы

## Безопасность

### Рекомендации

1. **Используйте парольную фразу** — защитите приватный ключ паролем
2. **Не передавайте приватный ключ** — никогда не отправляйте `id_ed25519` файл
3. **Используйте Ed25519** — более безопасный алгоритм, чем RSA
4. **Регулярно ротируйте ключи** — периодически создавайте новые ключи
5. **Ограничьте права доступа** — файлы ключей должны иметь правильные права:

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub
```

### Отзыв скомпрометированного ключа

Если ключ был скомпрометирован:

1. Удалите ключ из аккаунта на сервере (GitHub/GitLab)
2. Создайте новый ключ
3. Добавьте новый ключ на сервер
4. Удалите старый ключ с локальной машины

## Устранение проблем

### Проблема: Permission denied (publickey)

**Решение:**

1. Проверьте, что ключ добавлен в ssh-agent: `ssh-add -l`
2. Проверьте правильность пути к ключу в `~/.ssh/config`
3. Убедитесь, что публичный ключ добавлен на сервер
4. Проверьте права доступа к файлам ключей

### Проблема: Could not resolve hostname

**Решение:**

1. Проверьте подключение к интернету
2. Проверьте правильность имени хоста в `~/.ssh/config`
3. Попробуйте использовать IP-адрес вместо доменного имени

### Проблема: Too many authentication failures

**Решение:**
Добавьте в `~/.ssh/config`:

```
Host *
    IdentitiesOnly yes
```

Это заставит SSH использовать только указанные ключи.
