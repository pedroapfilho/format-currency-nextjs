# Format Number NextJS

This is a simple project to show how to format numbers using a provider in NextJS, with several optimizations to make it fast and efficient.

## How It Works

The project uses a context provider to manage and format number values throughout the application. This ensures that all number values are formatted consistently according to the specified locale and numbers type.

### Key Components

1. **NumberProvider**: This is the context provider that wraps the application and provides number formatting functions to all child components.
2. **useNumberFormatter**: A custom hook that allows components to access the number formatting functions provided by the `NumberProvider`.

### Features

- **Locale and Currency Configuration**: The provider can be configured with different locales and number types, allowing for flexible formatting options.
- **Consistent Formatting**: Ensures that all number values are formatted consistently across the application.
- **Easy Integration**: Simple to integrate into any NextJS project by wrapping your layout with the `NumberProvider`.
- **SSR Friendly**: The provider works well with server-side rendering in NextJS, ensuring that it gets the values from the cookies for the initial load.
- **Blazing Fast**: The provider is optimized for performance and ensures that the currency formatting is done efficiently by saving the formatter in memory, and reutilizing it across the application.

## Usage

1. Wrap your application with the NumberProvider:

```jsx
const Layout = ({ children }) => {
    const cookieStore = await cookies();

    const initialLocale = cookieStore.get("locale")?.value;
    const initialCurrency = cookieStore.get("currency")?.value;

    return (
        <NumberProvider initialLocale={initialLocale} initialCurrency={initialCurrency}>
            {children}
        </NumberProvider>
    );
}

export default MyApp;
```

2. Use the useNumberFormatter hook in your components:

```jsx
const SomeComponent = () => {
    const { formatCurrency, formatNumber, currency, setCurrency, locale, setLocale } = useNumberFormatter();
    const price = 1234.56;

    return <div>{formatCurrency(price, { maximumFractionDigits: 2 })}</div>;
};

export default SomeComponent;
```

## Conclusion

This project demonstrates how to create a reusable currency formatting provider in NextJS. By using context and custom hooks, it ensures consistent and configurable currency formatting across the application.

## Performance Results

https://perf.link/#eyJpZCI6IjdnM2o4bmtzdWw3IiwidGl0bGUiOiJVc2luZyBzYXZlZCBmb3JtYXR0ZXIgb3IgaW5zdGFudGlhdGluZyBuZXcgb25lIiwiYmVmb3JlIjoiY29uc3QgZm9ybWF0dGVyID0gbmV3IEludGwuTnVtYmVyRm9ybWF0KFwiZW4tVVNcIik7IiwidGVzdHMiOlt7Im5hbWUiOiJVc2luZyBhIG5lYXJseSBjcmVhdGVkIHZlcnNpb24iLCJjb2RlIjoiY29uc3QgbmV3Rm9ybWF0dGVyID0gbmV3IEludGwuTnVtYmVyRm9ybWF0KFwiZW4tVVNcIik7XG5cbm5ld0Zvcm1hdHRlci5mb3JtYXQoMTIzNDU2KSIsInJ1bnMiOlsyMTAwMCwyOTAwMCwyMTAwMCw0NzAwMCw2MDAwLDMwMDAsMTkwMDAsMzkwMDAsODAwMCwyMjAwMCw0ODAwMCwzMzAwMCwzMDAwLDIwMDAwLDI3MDAwLDI4MDAwLDEwMDAwLDE3MDAwLDMyMDAwLDI2MDAwLDEwMDAwLDMzMDAwLDEwMDAwLDE2MDAwLDE4MDAwLDU4MDAwLDI3MDAwLDkwMDAsMjcwMDAsMjkwMDAsNjAwMCwxNjAwMCw0MDAwLDEwMDAsMjIwMDAsMjEwMDAsMTAwMDAsMjEwMDAsNDUwMDAsNzAwMCwyMjAwMCwxNzAwMCwyMDAwMCwyMjAwMCwyNTAwMCwxNzAwMCwyNjAwMCwzMTAwMCwyOTAwMCwzNzAwMCwyNTAwMCw4MDAwLDE4MDAwLDE2MDAwLDQ5MDAwLDE0MDAwLDE1MDAwLDI5MDAwLDI4MDAwLDQzMDAwLDEwMDAsMzAwMCw0NzAwMCwxMDAwMCw0MDAwLDMwMDAwLDI4MDAwLDE4MDAwLDM1MDAwLDE1MDAwLDIzMDAwLDIwMDAsMzkwMDAsMTgwMDAsMzcwMDAsMjQwMDAsMjUwMDAsMzYwMDAsMjAwMDAsMjcwMDAsMTYwMDAsMTAwMDAsNDQwMDAsMjUwMDAsNTAwMDAsMTQwMDAsMjEwMDAsMjIwMDAsMjgwMDAsMzAwMCwzNDAwMCwzNTAwMCwyMDAwLDQxMDAwLDE0MDAwLDIxMDAwLDMzMDAwLDQwMDAsNDIwMDAsNDIwMDBdLCJvcHMiOjIyODMwfSx7Im5hbWUiOiJVc2luZyB0aGUgc2F2ZWQgdmVyc2lvbiIsImNvZGUiOiJmb3JtYXR0ZXIuZm9ybWF0KDEyMzQ1NikiLCJydW5zIjpbOTQwMDAwLDg4MzAwMCwxMDIyMDAwLDE3NjIwMDAsMjk4MDAwLDM2NTAwMCw4ODAwMDAsMjAzMTAwMCwyNDIxMDAwLDcxNTAwMCwxNzU2MDAwLDEwNjkwMDAsMjQxMTAwMCw4NjkwMDAsMjE1MTAwMCwxMjQ5MDAwLDExNzAwMCw1NjAwMCw0OTcwMDAsNTg2MDAwLDIzMzMwMDAsMTE0NjAwMCwyMDAwLDQ1MTAwMCwzMzYwMDAsMjAwMCwxMDg3MDAwLDQ1NjAwMCw5MzYwMDAsMTYxMDAwMCwxMDIwMDAsMTAwMCwxMDAwLDMwMDAsNjYxMDAwLDk2MzAwMCwzNTkwMDAsMzAwMCwyMjYxMDAwLDQxNzAwMCwxMTIxMDAwLDg1OTAwMCw1NzcwMDAsNDc2MDAwLDg3MDAwMCwzMjYwMDAsMTc2OTAwMCwxMjQ5MDAwLDEyMDgwMDAsMjY1ODAwMCw1MTgwMDAsMzU4MDAwLDEyMDgwMDAsMTAwMCwyMzM5MDAwLDU3ODAwMCwzOTYwMDAsMTE4MjAwMCwxNTQ2MDAwLDE2MjkwMDAsMjM4NTAwMCwyMDAwLDE4NjcwMDAsMzExMDAwLDM2MDAwLDk4NDAwMCwxMTA4MDAwLDQzNzAwMCw4MjcwMDAsNjEwMDAwLDcyNDAwMCwyMDAwLDc4MTAwMCwxMjgzMDAwLDEyMDgwMDAsMTIwODAwMCw5NTQwMDAsMTI3NzAwMCw1MzYwMDAsMTIxOTAwMCw1NjQwMDAsMjAxMDAwLDE3NzQwMDAsNjk0MDAwLDIyNDEwMDAsNDc5MDAwLDc4MDAwMCw5NjUwMDAsMTE5ODAwMCw0NTAwMDAsMTE0OTAwMCwxMjA4MDAwLDI0MTYwMDAsMTI1NTAwMCw0NzAwMDAsMzU2MDAwLDkwODAwMCw3ODAwMCwxMzU2MDAwLDE1NTQwMDBdLCJvcHMiOjkzOTMxMH1dLCJ1cGRhdGVkIjoiMjAyNC0xMi0xMVQxNzo0NjoxNi41NzhaIn0%3D