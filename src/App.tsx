import { useCallback, useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useLenis } from './hooks/useLenis';
import { Preloader } from './components/layout/Preloader';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Cursor } from './components/common/Cursor';
import { Grain } from './components/common/Grain';
import { BrandThread } from './components/motion/BrandThread';
import { Hero } from './components/hero/Hero';
import { BrandIntro } from './components/sections/BrandIntro';
import { ScrollExpand } from './components/sections/ScrollExpand';
import { SignatureShowcase } from './components/sections/SignatureShowcase';
import { BakeDetail } from './components/sections/BakeDetail';
import { CraftSection } from './components/sections/CraftSection';
import { StorySection } from './components/sections/StorySection';
import { SignatureMessage } from './components/sections/SignatureMessage';
import { SocialGallery } from './components/sections/SocialGallery';
import { OrderCTA } from './components/sections/OrderCTA';
import { OrderPanel } from './components/ordering/OrderPanel';
import type { Bake } from './data/bakes';

export default function App() {
  useLenis();

  const [ready, setReady] = useState(false);
  const [activeBake, setActiveBake] = useState<Bake | null>(null);
  const [orderOpen, setOrderOpen] = useState(false);
  const [orderSeed, setOrderSeed] = useState<string | undefined>();

  const handleReady = useCallback(() => setReady(true), []);

  // Section heights settle once the intro is out of the way.
  useEffect(() => {
    if (ready) ScrollTrigger.refresh();
  }, [ready]);

  const openOrder = useCallback((seed?: string) => {
    setOrderSeed(seed);
    setOrderOpen(true);
  }, []);

  /** From a bake detail: carry the cake's name into the enquiry. */
  const enquireAbout = useCallback(
    (bake: Bake) => {
      setActiveBake(null);
      openOrder(`${bake.name} — ${bake.referenceLabel}`);
    },
    [openOrder],
  );

  return (
    <>
      <Preloader onDone={handleReady} />
      <Cursor />
      <Grain />

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Navbar onStartOrder={() => openOrder()} />

      {/*
        The page is one continuous story, paced deliberately:

          QUIET     hero
          MOVEMENT  brand intro
          WOW       the photograph opens to full bleed
          PLAY      signature bakes, turned by hand
          —         the craft, read rather than watched
          INTIMATE  Girvani and Swapna meet
          QUIET     from us, to you
          MOVEMENT  the wall drifts
          QUIET     the ask

        The thread is drawn behind all of it, tying them together.
      */}
      <div className="page">
        <BrandThread />

        <main id="main" className="page__content">
          <Hero ready={ready} />
          <BrandIntro />
          <ScrollExpand />
          <SignatureShowcase onOpenBake={setActiveBake} />
          <CraftSection />
          <StorySection />
          <SignatureMessage />
          <SocialGallery />
          <OrderCTA onStartOrder={() => openOrder()} />
        </main>

        <Footer onStartOrder={() => openOrder()} />
      </div>

      <BakeDetail
        bake={activeBake}
        onClose={() => setActiveBake(null)}
        onEnquire={enquireAbout}
      />

      {orderOpen && (
        <OrderPanel initialRequest={orderSeed} onClose={() => setOrderOpen(false)} />
      )}
    </>
  );
}
