"use server";

import { cookies } from "next/headers";

const setLocaleCookie = async (locale: string) => {
  const cookieStore = await cookies();

  cookieStore.set("locale", locale);
};

const setCurrencyCookie = async (currency: string) => {
  const cookieStore = await cookies();

  cookieStore.set("currency", currency);
};

export { setLocaleCookie, setCurrencyCookie };
