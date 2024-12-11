"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";

import { setCurrencyCookie, setLocaleCookie } from "./actions";

// Define the formatting options
type FormatNumberOptions = {
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  style?: "currency" | "decimal";
  useGrouping?: boolean;
};

// Define the context properties
type CurrencyFormatterContextProps = {
  locale: string;
  setLocale: (locale: string) => void;
  currency: string;
  setCurrency: (currency: string) => void;
};

// Create the context with default value as null
const CurrencyFormatterContext =
  createContext<CurrencyFormatterContextProps | null>(null);

// Define the provider component
const CurrencyFormatterProvider = ({
  children,
  initialLocale = "en-US",
  initialCurrency = "USD",
}: {
  children: ReactNode;
  initialLocale?: string;
  initialCurrency?: string;
}) => {
  // State to manage locale and currency
  const [locale, setLocale] = useState(initialLocale);
  const [currency, setCurrency] = useState(initialCurrency);

  // Sync locale and currency state with cookies
  useEffect(() => {
    setLocaleCookie(locale);
  }, [locale]);

  useEffect(() => {
    setCurrencyCookie(currency);
  }, [currency]);

  // Provide the context values to children components
  return (
    <CurrencyFormatterContext.Provider
      value={{ locale, setLocale, currency, setCurrency }}
    >
      {children}
    </CurrencyFormatterContext.Provider>
  );
};

// Custom hook to use the currency formatter context
const useCurrencyFormatter = () => {
  const context = useContext(CurrencyFormatterContext);

  // Ensure the hook is used within the provider
  if (!context) {
    throw new Error(
      "useCurrencyFormatter must be used within a CurrencyFormatterProvider."
    );
  }

  const { locale, setLocale, currency, setCurrency } = context;

  // Cache to store formatted currency values
  const formatCache = useMemo(() => new Map<string, Intl.NumberFormat>(), []);

  // Function to format currency values
  const formatNumber = useCallback(
    (
      value: number,
      {
        minimumFractionDigits,
        maximumFractionDigits,
        style,
        useGrouping,
      }: FormatNumberOptions = {
        useGrouping: true,
      }
    ): string => {
      // Validate the input value
      if (typeof value !== "number" || !isFinite(value)) {
        throw new TypeError("Invalid number provided for formatting.");
      }

      // Create a unique cache key based on the value and options
      const cacheKey = [
        locale,
        currency,
        minimumFractionDigits,
        maximumFractionDigits,
        style,
        useGrouping,
      ].join("-");

      // Return the cached formatted value if available
      if (formatCache.has(cacheKey)) {
        const numberFormatter = formatCache.get(cacheKey);

        if (numberFormatter) return numberFormatter.format(value);
      }

      try {
        // Memoize the Intl.NumberFormat instance
        const numberFormatter = new Intl.NumberFormat(locale, {
          style,
          currency,
          minimumFractionDigits,
          maximumFractionDigits,
          useGrouping,
        });

        // Format the value
        const formattedValue = numberFormatter.format(value);

        // Store the formatted value in the cache
        formatCache.set(cacheKey, numberFormatter);

        return formattedValue;
      } catch (error: unknown) {
        // Handle formatting errors
        if (error instanceof Error)
          throw new Error(`Failed to format currency: ${error.message}`);

        throw new Error(`Failed to format currency: ${String(error)}`);
      }
    },
    [currency, locale, formatCache]
  );

  const formatCurrency = useCallback(
    (value: number, options?: Omit<FormatNumberOptions, "style">) =>
      formatNumber(value, {
        style: "currency",
        ...options,
      }),
    [formatNumber]
  );

  // Return the formatting function and context values
  return {
    formatNumber,
    formatCurrency,
    locale,
    setLocale,
    currency,
    setCurrency,
  };
};

export { CurrencyFormatterProvider, useCurrencyFormatter };
