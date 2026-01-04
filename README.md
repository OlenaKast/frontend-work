# Звіт з лабораторної роботи
**Тема:** Розробка Frontend-частини веб-застосунку (React + TanStack Query + Zod)

## 1. Опис реалізованого функціоналу
У рамках лабораторної роботи було розроблено клієнтську частину веб-застосунку для видавництва "AgathaRio".
Основні можливості застосунку:
* **Маршрутизація:** Реалізована за допомогою **TanStack Router** (файлова маршрутизація). Створено сторінки: Головна, Каталог книг, Деталі книги, Логін/Реєстрація, Профіль та Адмін-панель.
* **Взаємодія з API:** Налаштовано **Axios** для HTTP-запитів та **TanStack Query** для кешування та управління станом серверних даних.
* **Форми та Валідація:** Використано **React Hook Form** у зв'язці з **Zod** для валідації вводу (email, паролі, форми додавання книг).
* **Інтерфейс:** Стилізація виконана за допомогою **Tailwind CSS**. Реалізовано адаптивний дизайн та модальні вікна.

## 2. Приклади ключового коду

### 2.1. Конфігурація Axios
Створено інстанс axios з базовим URL та інтерсептором для обробки помилок. Також налаштовано автоматичне додавання Bearer токена, якщо він є в змінних середовища.

*Файл: `src/lib/axios.ts`*
```typescript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
export default apiClient;
```
### 2.2. Хук TanStack Query для отримання книг
Використано хук useQuery для завантаження списку книг, їх типізації та обробки URL зображень.
*Файл: `src/features/books/components/api.ts`*
```typescript
export const useBooks = () => {
  return useQuery<Book[]>({
    queryKey: ['books'],
    queryFn: getBooks,
  });
};

const getBooks = async (): Promise<Book[]> => {
  const response = await apiClient.get('/books');
  return response.data.map((item: any) => ({
    id: item.id,
    title: item.title,
    price: Number(item.price),
    imageUrl: getFullImageUrl(item.imageUrl), 
    rating: item.rating || 5.0,
    authorName: item.author 
      ? item.author.fullName || `${item.author.firstName} ${item.author.lastName}`
      : 'Невідомий автор',
    isAvailable: true,
    sku: item.sku
  }));
};
```
### 2.3. Схема валідації Zod
Приклад схеми для логіну, яка перевіряє формат email та мінімальну довжину пароля.
*Файл: `src/routes/login.tsx`*
```typescript
const loginSchema = z.object({
  email: z.string().email("Невірний формат email"),
  password: z.string().min(4, "Пароль має бути мінімум 4 символи"),
});

// Використання в компоненті
const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
});
```

## 3. Демонстрація роботи
### Реєстраційна форма і вхід
> ![1](/public/1.png)
> ![2](/public/2.png)

### Помилка при вході
> ![3](/public/3.png)

### Список книг
> ![4](/public/4.png)
>![7](/public/7.png)

### Успішна реєстрація користувача
> ![5](/public/5.png)

### Створення книги
> ![6](/public/6.png)


## Висновки
Під час виконання лабораторної роботи було розроблено повноцінну клієнтську частину веб-застосунку з використанням сучасного стеку технологій. Було побудовано надійну архітектуру, де всі компоненти та відповіді від сервера суворо типізовані за допомогою TypeScript, що дозволило значно підвищити стабільність коду. Логіку взаємодії з API було винесено в окремі хуки, що забезпечило чітке розділення відповідальності між отриманням даних та їх відображенням.

Також було успішно реалізовано систему автентифікації користувачів із використанням JWT-токенів та розмежуванням прав доступу для адміністраторів і клієнтів. У ході роботи було вирішено завдання інтеграції з бекендом, налаштування обробки помилок та коректного відображення статичних ресурсів. У результаті створено функціональний та зручний інтерфейс, готовий до подальшого розвитку
