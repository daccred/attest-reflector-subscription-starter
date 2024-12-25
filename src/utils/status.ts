export const statusColors = {
  active: '#28A745',
  expired: '#FFC107',
  revoked: '#DC3545',
  pending: '#23BA97',
};

export const maColors = [
  { name: 'Provoked', border: '#DC3545', text: '#DC3545' },
  { name: 'Pending', border: '#23BA97', text: '#17A2B8' },
  { name: 'Expired', border: '#FFC107', text: '#FFC107' },
  { name: 'Active', border: '#28A745', text: '#28A745' },
];
export type SchemaColorKey =
  | 'SIGN DOCUMENT'
  | 'LOGIC'
  | 'VERIFICATION'
  | 'ERROR';
export interface ISchemaColor {
  border: string;
  text: string;
}
export const schemaColors: Record<SchemaColorKey, ISchemaColor> = {
  'SIGN DOCUMENT': { border: '#28A745', text: '#28A745' },
  LOGIC: { border: '#23BA97', text: '#23BA97' },
  VERIFICATION: { border: '#DC3545', text: '#DC3545' },
  ERROR: { border: '#FFC107', text: '#FFC107' },
};
