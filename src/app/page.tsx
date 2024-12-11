"use client";

import { useNumberFormatter } from "./providers/number-formatter/provider";

const Page = () => {
  const {
    formatCurrency,
    formatNumber,
    setCurrency,
    setLocale,
    locale,
    currency,
  } = useNumberFormatter();

  return (
    <div className="flex flex-col gap-8 items-center justify-center">
      <div className="flex gap-2">
        <button
          className="p-2 border border-black disabled:bg-neutral-200"
          disabled={locale === "en-US"}
          onClick={() => setLocale("en-US")}
        >
          Locale: en-US
        </button>

        <button
          className="p-2 border border-black disabled:bg-neutral-200"
          disabled={locale === "fr-FR"}
          onClick={() => setLocale("fr-FR")}
        >
          Locale: fr-FR
        </button>

        <button
          className="p-2 border border-black disabled:bg-neutral-200"
          disabled={currency === "USD"}
          onClick={() => setCurrency("USD")}
        >
          Currency: USD
        </button>

        <button
          className="p-2 border border-black disabled:bg-neutral-200"
          disabled={currency === "EUR"}
          onClick={() => setCurrency("EUR")}
        >
          Currency: EUR
        </button>
      </div>

      <p>Current locale: {locale}</p>

      <p>Current currency: {currency}</p>

      <p>Formatting currency: {formatCurrency(1234.56)}</p>

      <p>
        Formatting currency with min and max fractional digits:{" "}
        {formatCurrency(1234.56, {
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        })}
      </p>

      <p>Formatting number: {formatNumber(1234.56)}</p>
    </div>
  );
};

export default Page;
