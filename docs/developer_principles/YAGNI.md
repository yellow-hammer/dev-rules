---
id: yagni
title: YAGNI - Вам это не понадобится
sidebar_label: YAGNI
sidebar_position: 3
description: Принцип YAGNI (You Aren't Gonna Need It)
keywords:
  - YAGNI
  - избыточная функциональность
  - минималистичный подход
  - принципы программирования
slug: /developer-principles/yagni
---

## YAGNI (You Aren't Gonna Need It) - Вам это не понадобится

## Описание принципа

Принцип YAGNI советует не добавлять функциональность, пока она действительно не понадобится. Другими словами, следует разрабатывать только те возможности, которые нужны сейчас, а не те, которые _могут_ понадобиться в будущем.

## Применение

- Не создавайте "на будущее" поля, реквизиты, отчеты, которые не требуются сейчас
- Не усложняйте код дополнительными проверками и ветвлениями "на всякий случай"
- Разрабатывайте функционал итеративно, добавляя возможности по мере необходимости
- Избегайте создания "универсальных" механизмов, которые содержат большое количество настроек и вариантов использования

## Пример

```bsl
// Плохо: добавление ненужной сейчас функциональности
Процедура СохранитьКлиента(Клиент)
    // Основная логика сохранения...
    
    // Излишняя функциональность, которая сейчас не нужна
    ОтправитьУведомлениеВМессенджеры(Клиент);
    ПодготовитьДанныеДляРассылки(Клиент);
    СформироватьОтчетПоВзаимодействиям(Клиент);
КонецПроцедуры;

// Хорошо: только необходимая сейчас функциональность
Процедура СохранитьКлиента(Клиент)
    // Основная логика сохранения...
КонецПроцедуры;
```

:::info Важно
Следование принципу YAGNI позволяет:

- Сократить время разработки
- Упростить тестирование
- Сфокусироваться на действительно необходимом функционале
- Избежать ненужного усложнения кода

:::

## Рекомендации

1. **Проектируйте итеративно** - начинайте с минимально необходимого функционала и расширяйте его по мере необходимости.

2. **Следуйте требованиям заказчика** - реализуйте только то, что было согласовано, и не добавляйте лишнего.

3. **Сохраняйте простоту структуры метаданных** - добавляйте только те объекты метаданных (реквизиты, табличные части, регистры и т.д.), которые необходимы для текущей функциональности.

4. **Используйте гибкую архитектуру** - проектируйте систему так, чтобы её можно было легко расширить, когда потребуется новая функциональность.

## Типичные проблемы при применении

- Создание избыточных полей и атрибутов "на будущее"
- Разработка сложных механизмов импорта/экспорта данных, когда достаточно простого решения
- Внедрение шаблонов проектирования без реальной необходимости, что усложняет систему
- Создание настраиваемых отчетов с множеством параметров, большинство из которых не используется

## Баланс между YAGNI и перспективным планированием

Важно найти баланс между слепым следованием YAGNI и разумным планированием архитектуры. Если функциональность точно понадобится в ближайшем будущем и её добавление сейчас существенно сэкономит ресурсы, имеет смысл реализовать её заранее.

Используйте следующие критерии для принятия решения:

- Насколько уверенно мы знаем, что функциональность понадобится?
- Насколько сложно будет добавить функциональность позже?
- Какова стоимость добавления функциональности сейчас по сравнению с добавлением её позже?

:::caution Предостережение
Важно различать "инфраструктурную" подготовку и избыточную функциональность. Создание гибкой архитектуры не противоречит YAGNI, а вот добавление конкретных функций "на всякий случай" - противоречит.
:::
