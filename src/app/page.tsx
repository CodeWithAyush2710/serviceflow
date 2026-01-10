import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { serviceCategories, partners } from '@/lib/data';
import MapComponent from '@/components/map-component';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                  Get Help, Fast.
                </h1>
                <p className="max-w-[600px] text-secondary-foreground md:text-xl">
                  ServiceFlow instantly connects you with qualified local
                  professionals ready to work.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="#services">
                    Find a Service
                  </Link>
                </Button>
              </div>
            </div>
            <Image
              src="https://picsum.photos/seed/hero/600/400"
              alt="Hero"
              width={600}
              height={400}
              data-ai-hint="friendly professional worker"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
            />
          </div>
        </div>
      </section>

      <section id="services" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                Browse Services
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Find the right professional for any job, from quick fixes to
                major projects.
              </p>
            </div>
          </div>
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pt-12">
            {serviceCategories.map((category) => (
              <Card key={category.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    width={400}
                    height={300}
                    data-ai-hint={category.imageHint}
                    className="rounded-t-lg object-cover aspect-[4/3]"
                  />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-lg font-bold">{category.name}</CardTitle>
                  <CardDescription className="mt-2 text-sm">{category.description}</CardDescription>
                  <Button variant="link" className="px-0 mt-4">
                    Book Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
              Partners Near You
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our map shows available service partners in your area in real-time.
            </p>
          </div>
          <div className="w-full max-w-4xl mx-auto h-[400px] md:h-[500px] rounded-lg overflow-hidden border shadow-lg">
            <MapComponent
              center={{ lat: 34.0522, lng: -118.2437 }}
              markers={partners.map(p => p.location)}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
