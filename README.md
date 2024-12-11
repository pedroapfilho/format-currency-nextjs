# Format Currency NextJS

This is a simple project to show how to format currency using a provider in NextJS, with several optimizations to make it fast and efficient.

## How It Works

The project uses a context provider to manage and format currency values throughout the application. This ensures that all currency values are formatted consistently according to the specified locale and currency type.

### Key Components

1. **CurrencyProvider**: This is the context provider that wraps the application and provides currency formatting functions to all child components.
2. **useCurrency**: A custom hook that allows components to access the currency formatting functions provided by the `CurrencyProvider`.

### Features

- **Locale and Currency Configuration**: The provider can be configured with different locales and currency types, allowing for flexible formatting options.
- **Consistent Formatting**: Ensures that all currency values are formatted consistently across the application.
- **Easy Integration**: Simple to integrate into any NextJS project by wrapping your layout with the `CurrencyProvider`.
- **SSR Friendly**: The provider works well with server-side rendering in NextJS, ensuring that it gets the values from the cookies for the initial load.
- **Blazing Fast**: The provider is optimized for performance and ensures that the currency formatting is done efficiently by saving the formatter in memory, and reutilizing it across the application.

## Usage

1. Wrap your application with the CurrencyProvider:

```jsx
const Layout = ({ children }) => {
    const cookieStore = await cookies();

    const initialLocale = cookieStore.get("locale")?.value;
    const initialCurrency = cookieStore.get("currency")?.value;

    return (
        <CurrencyProvider initialLocale={initialLocale} initialCurrency={initialCurrency}>
            {children}
        </CurrencyProvider>
    );
}

export default MyApp;
```

2. Use the useCurrency hook in your components:

```jsx
import { useCurrency } from '../context/CurrencyContext';

const SomeComponent = () => {
    const { formatCurrency, formatNumber, currency, setCurrency, locale, setLocale } = useCurrency();
    const price = 1234.56;

    return <div>{formatCurrency(price, { maximumFractionDigits: 2 })}</div>;
};

export default SomeComponent;
```

## Conclusion

This project demonstrates how to create a reusable currency formatting provider in NextJS. By using context and custom hooks, it ensures consistent and configurable currency formatting across the application.