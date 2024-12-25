'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PackageManagement from './package-management';
import SubscriptionManagement from './subscription-management';

export default function AdminConsole() {
  //const wallet = useWallet()
  //const [userAddress, setUserAddress] = useState('')

  //const handleRevoke = async () => {
  //  try {
  //    await revokeSubscription(wallet, userAddress)
  //    toast({
  //      title: "Subscription Revoked",
  //      description: `Subscription revoked for user: ${userAddress}`,
  //    })
  //  } catch (error) {
  //    toast({
  //      title: "Error",
  //      description: error.message,
  //      variant: "destructive",
  //    })
  //  }
  //}

  //const handleExtend = async () => {
  //  try {
  //    await extendSubscription(wallet, userAddress, 30) // Extend for 30 days
  //    toast({
  //      title: "Subscription Extended",
  //      description: `Subscription extended for user: ${userAddress} by 30 days`,
  //    })
  //  } catch (error) {
  //    toast({
  //      title: "Error",
  //      description: error.message,
  //      variant: "destructive",
  //    })
  //  }
  //}

  return (
    <Tabs defaultValue="packages" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="packages">Packages</TabsTrigger>
        <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
      </TabsList>
      <TabsContent value="packages">
        <PackageManagement />
      </TabsContent>
      <TabsContent value="subscriptions">
        <SubscriptionManagement />
      </TabsContent>
    </Tabs>
  );
}
