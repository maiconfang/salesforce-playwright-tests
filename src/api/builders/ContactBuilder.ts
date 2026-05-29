import { Contact } from "@api/models/Contact";

export class ContactBuilder {

  private contact: Contact = {
    LastName: "Fang",
  };

  withFirstName(
    firstName: string,
  ): ContactBuilder {

    this.contact.FirstName =
      firstName;

    return this;
  }

  withLastName(
    lastName: string,
  ): ContactBuilder {

    this.contact.LastName =
      lastName;

    return this;
  }

  withEmail(
    email: string,
  ): ContactBuilder {

    this.contact.Email =
      email;

    return this;
  }

  withPhone(
    phone: string,
  ): ContactBuilder {

    this.contact.Phone =
      phone;

    return this;
  }

  withMobilePhone(
    mobilePhone: string,
  ): ContactBuilder {

    this.contact.MobilePhone =
      mobilePhone;

    return this;
  }

  withTitle(
    title: string,
  ): ContactBuilder {

    this.contact.Title =
      title;

    return this;
  }

  withDepartment(
    department: string,
  ): ContactBuilder {

    this.contact.Department =
      department;

    return this;
  }

  withLeadSource(
    leadSource: string,
  ): ContactBuilder {

    this.contact.LeadSource =
      leadSource;

    return this;
  }

  withDescription(
    description: string,
  ): ContactBuilder {

    this.contact.Description =
      description;

    return this;
  }

  build(): Contact {

    return this.contact;
  }
}