export interface PreferenceItem {
  id: string;
  title: string;
  description: string;
  picture_url?: string;
  category_id?: string;
  quantity: number;
  currency_id: string;
  unit_price: number;
}

export interface Payer {
  name: string;
  surname: string;
  email: string;
  phone: {
    area_code: string;
    number: string;
  };
  identification: {
    type: string;
    number: string;
  };
  address: {
    zip_code: string;
    street_name: string;
    street_number: number;
  };
}

export interface BackURLs {
  success: string;
  failure: string;
  pending: string;
}

export interface PaymentMethods {
  excluded_payment_methods: { id: string }[];
  excluded_payment_types: { id: string }[];
  installments: number;
}

export interface PreferenceRequest {
  items: PreferenceItem[];
  payer: Payer;
  back_urls: BackURLs;
  auto_return: string;
  payment_methods: PaymentMethods;
  notification_url: string;
  external_reference: string;
  statement_descriptor: string;
}

export interface PreferenceResponse {
  id: string;
  init_point: string;
  sandbox_init_point: string;
  date_created: string;
  last_updated: string;
}

export interface PaymentResponse {
  id: number;
  date_created: string;
  date_approved: string;
  date_last_updated: string;
  date_of_expiration: string;
  money_release_date: string;
  operation_type: string;
  issuer_id: string;
  payment_method_id: string;
  payment_type_id: string;
  status: string;
  status_detail: string;
  currency_id: string;
  description: string;
  transaction_amount: number;
  external_reference: string;
}