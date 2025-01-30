export class CreatePaymentDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  state: string;
  country: string;
  // Other fields according to the schema
}

export class UpdatePaymentDto {
  orderId: string;
  success: boolean;
  // Other fields that need updating
}
