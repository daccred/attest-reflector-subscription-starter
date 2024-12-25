import { type IAttestation } from '@/components/pages/attestations/attestation-columns';

export const attestations: IAttestation[] = [
  {
    uid: 'GBSQ8MRWF5G95R4M82HXFBR5CYKZX3D...',
    schema: { id: '4', name: 'SIGN DOCUMENT' },
    from: 'GD3ZN9P9G4BJ2KST682XJLBLKWGBB72...',
    to: 'GAV9ZJ6RBTD5VW65WTJRMXL9ZXF...',
    type: 'ONCHAIN',
    age: '2 hours ago',
    id: '1',
  },
  {
    uid: 'GBSQ8MRWF5G95R4M82HXFBR5CYKZX3D...',
    schema: { id: '4', name: 'LOGIC' },
    from: 'GD3ZN9P9G4BJ2KST682XJLBLKWGBB72...',
    to: 'GAV9ZJ6RBTD5VW65WTJRMXL9ZXF...',
    type: 'ONCHAIN',
    age: '2 hours ago',
    id: '2',
  },
  {
    uid: 'IXFBR5CYKZX3D...',
    schema: { id: '4', name: 'VERIFICATION' },
    from: 'GD3ZN9P9G4BJ2KST682XJLBLKWGBB72...',
    to: 'GAV9ZJ6RBTD5VW65WTJRMXL9ZXF...',
    type: 'ONCHAIN',
    age: '2 hours ago',
    id: '3',
  },
  {
    uid: 'GBSQ8MRWF5G95R4M82HXFBR5CYKZX3D...',
    schema: { id: '4', name: 'ERROR' },
    from: 'GD3ZN9P9G4BJ2KST682XJLBLKWGBB72...',
    to: 'GAV9ZJ6RBTD5VW65WTJRMXL9ZXF...',
    type: 'ONCHAIN',
    age: '2 hours ago',
    id: '4',
  },
];

// export const schemas: ISchema[] = [
//   {
//     schema: '#7',
//     uid: '6CFXHSM5XL6BVUCXBWXGTITRQWLVVYXQ123456789',
//     from: '6CFXHSM5XL6BVUCXBWXGTITRQWLVVYXQ123456789',
//     to: '6CFXHSM5XL6BVUCXBWXGTITRQWLVVYXQ123456790',
//     type: 'ONCHAIN',
//     status: 'Active',
//     age: '2 hours ago',
//     id: '1',
//   },
//   {
//     schema: '#7',
//     uid: '6B5K7LDJX8ZTUCVV9TK3STVNWM6ZX9123456789',
//     from: '6CKJ26XFP8VWXKLX5VV3T6V3TKXMZJH123456789',
//     to: '6A73QH6T2TT6KP9V9NHR36NTWZM6MJ5123456789',
//     type: 'ONCHAIN',
//     status: 'Expired',
//     age: '2 hours ago',
//     id: '2',
//   },
//   {
//     schema: '#7',
//     uid: '6CJ28TULFZCQJ5L6RRT76HT3R3ZN5P123456789',
//     from: '6D3C8F6BVZ8KPWTVH56QCMJQNPZXNZV5123456789',
//     to: '6ACPVWX5NVCXZFX96FZ63VVV92KP9MR123456789',
//     type: 'ONCHAIN',
//     status: 'Revoked',
//     age: '2 hours ago',
//     id: '3',
//   },
//   {
//     schema: '#7',
//     uid: '6DV838QZN3RNFLNQZ6M5LP5KPJM9M6V123456789',
//     from: '6AU5VV85KPV859F6XLKMHRJP6NZQMRW123456789',
//     to: '6C9P2TZFVJN6XZTJ6RVQK2655VHZCVZ123456789',
//     type: 'ONCHAIN',
//     status: 'Pending',
//     age: '2 hours ago',
//     id: '4',
//   },
//   // New items added
//   {
//     schema: '#8',
//     uid: '7DV838QZN3RNFLNQZ6M5LP5KPJM9M6V123456789',
//     from: '7AU5VV85KPV859F6XLKMHRJP6NZQMRW123456789',
//     to: '7C9P2TZFVJN6XZTJ6RVQK2655VHZCVZ123456789',
//     type: 'ONCHAIN',
//     status: 'Active',
//     age: '1 hour ago',
//     id: '5',
//   },
  // {
  //   schema: '#8',
  //   uid: '8DV838QZN3RNFLNQZ6M5LP5KPJM9M6V123456789',
  //   from: '8AU5VV85KPV859F6XLKMHRJP6NZQMRW123456789',
  //   to: '8C9P2TZFVJN6XZTJ6RVQK2655VHZCVZ123456789',
  //   type: 'ONCHAIN',
  //   status: 'Expired',
  //   age: '3 hours ago',
  //   id: '6',
  // },
  // {
  //   schema: '#8',
  //   uid: '9DV838QZN3RNFLNQZ6M5LP5KPJM9M6V123456789',
  //   from: '9AU5VV85KPV859F6XLKMHRJP6NZQMRW123456789',
  //   to: '9C9P2TZFVJN6XZTJ6RVQK2655VHZCVZ123456789',
  //   type: 'ONCHAIN',
  //   status: 'Revoked',
  //   age: '4 hours ago',
  //   id: '7',
  // },
  // {
  //   schema: '#8',
  //   uid: '0DV838QZN3RNFLNQZ6M5LP5KPJM9M6V123456789',
  //   from: '0AU5VV85KPV859F6XLKMHRJP6NZQMRW123456789',
  //   to: '0C9P2TZFVJN6XZTJ6RVQK2655VHZCVZ123456789',
  //   type: 'ONCHAIN',
  //   status: 'Pending',
  //   age: '5 hours ago',
  //   id: '8',
  // },
// ];

// Function to generate a unique ID
export function generateId() {
  return `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export const chartData = [
  { name: '01', attestations: 850, schemas: 500 },
  { name: '02', attestations: 700, schemas: 300 },
  { name: '03', attestations: 700, schemas: 400 },
  { name: '04', attestations: 800, schemas: 650 },
  { name: '05', attestations: 850, schemas: 600 },
  { name: '06', attestations: 750, schemas: 400 },
  { name: '07', attestations: 650, schemas: 300 },
  { name: '08', attestations: 600, schemas: 650 },
  { name: '09', attestations: 750, schemas: 700 },
  { name: '10', attestations: 500, schemas: 400 },
  { name: '11', attestations: 700, schemas: 500 },
];
