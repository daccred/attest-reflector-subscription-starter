import Header from '@/components/core/header';
import Home from '@/components/pages/home';
import { LatestPost } from '@/components/post';
import { api, HydrateClient } from '@/trpc/server';

export default async function Page() {
  const hello = await api.post.hello({ text: 'from Attest' });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <div className="flex flex-col gap-6">
        <Header />
        <Home />
        <main className="hidden w-full flex-col items-center justify-center gap-4 pb-20 sm:mt-24">
          <p className="text-center text-2xl text-white">
            {hello ? hello.greeting : 'Loading tRPC query...'}
          </p>
          <LatestPost />
        </main>
      </div>
    </HydrateClient>
  );
}
