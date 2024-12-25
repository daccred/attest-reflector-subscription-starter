'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Icons } from '@/assets/icons';

interface Package {
  id: string;
  name: string;
  price: number;
  duration: number;
}

export default function PackageManagement() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [newPackage, setNewPackage] = useState({
    name: '',
    price: 0,
    duration: 30,
  });

  const handleCreatePackage = () => {
    const packageId = `PKG${Math.random().toString(36).substr(2, 9)}`;
    setPackages([...packages, { ...newPackage, id: packageId }]);
    setNewPackage({ name: '', price: 0, duration: 30 });
    // toast({
    //   title: 'Package Created',
    //   description: `New package "${newPackage.name}" has been created.`,
    // });
  };

  return (
    <Card className="mt-8 py-4 px-2">
      <CardHeader>
        <CardTitle className="mb-4 font-pp-supply-mono text-lg leading-[28.8px] text-foreground sm:text-2xl">
          Package Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center space-x-2">
          <Input
            placeholder="Package Name"
            value={newPackage.name}
            onChange={(e) =>
              setNewPackage({ ...newPackage, name: e.target.value })
            }
            className="inline-flex items-center gap-2 font-pp-supply-mono uppercase text-muted-foreground"
          />
          <Input
            type="number"
            placeholder="Price"
            value={newPackage.price}
            onChange={(e) =>
              setNewPackage({ ...newPackage, price: Number(e.target.value) })
            }
            className="inline-flex items-center gap-2 font-pp-supply-mono uppercase text-muted-foreground"
          />
          <Input
            type="number"
            placeholder="Duration (days)"
            value={newPackage.duration}
            onChange={(e) =>
              setNewPackage({ ...newPackage, duration: Number(e.target.value) })
            }
            className="inline-flex items-center gap-2 font-pp-supply-mono uppercase text-muted-foreground"
          />

          <Button
            onClick={handleCreatePackage}
            variant="outline"
            className="gap-2 border-primary text-primary hover:text-primary/80"
          >
            <Icons.Plus className="text-primary" />{' '}
            <span className="hidden sm:block">Create Package</span>
          </Button>
        </div>
        {packages.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow className="text-sm text-muted-foreground">
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {packages.map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell className="font-medium text-gray-300">
                    {pkg.name}
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {pkg.price} XLM
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {pkg.duration} days
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
