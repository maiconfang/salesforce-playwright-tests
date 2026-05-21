import { LeadBuilder } from "../builders/LeadBuilder";
import { LeadsApiClient } from "../clients/leads/LeadsApiClient";

export class LeadSeedService {
  constructor(
    private readonly leadsApiClient: LeadsApiClient,
  ) {}

  async createDefaultLead() {
    const lead = new LeadBuilder().build();

    return this.leadsApiClient.createLead(lead);
  }
}
