"use server";

export const createBorrow = async (formData: FormData) => {
  const dataBody = Object.fromEntries(formData.entries());
  console.log(dataBody);
};
