export interface CustomerOnboardingResult {

  account: {

    id: string;

    name: string;

  };

  contact: {

    id: string;

    firstName: string;

    lastName: string;

    email: string;

  };

  opportunity: {

    id: string;

    name: string;

    stageName: string;

  };

  task: {

    id: string;

    subject: string;

  };

  success: boolean;

}