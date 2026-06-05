import { ContactData }
  from "@models/contacts/ContactData";

export function createContactData():
  ContactData {

  const uniqueId =
    Date.now();

  return {

    firstName:
      "Maicon",

    lastName:
      `Fang-${uniqueId}`,

    email:
      `maicon.${uniqueId}@gmail.com`,

  };
}