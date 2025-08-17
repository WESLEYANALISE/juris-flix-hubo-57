import { FeaturesCarousel } from '@/components/FeaturesCarousel';
import { FeaturesGrid } from '@/components/FeaturesGrid';
import { QuickAccessSection } from '@/components/QuickAccessSection';
import { ProductCarousel } from '@/components/ProductCarousel';
import { AppFunction } from '@/components/AppFunction';
import { SocialMediaFooter } from '@/components/SocialMediaFooter';
import { MobileLayout } from '@/components/MobileLayout';
import { DesktopLayout } from '@/components/DesktopLayout';
import { TabletLayout } from '@/components/TabletLayout';
import { SuporteTab } from '@/components/SuporteTab';
import { Button } from '@/components/ui/button';
import { useNavigation } from '@/context/NavigationContext';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';
const Index = () => {
  const {
    isInFunction
  } = useNavigation();
  const {
    isMobile,
    isTablet,
    isDesktop
  } = useDeviceDetection();

  // If we're in a function, show the function component
  if (isInFunction) {
    return <AppFunction />;
  }

  // Main content for both mobile and desktop
  const mainContent = <>
      {/* Carousel Section */}
      <section className={`${isTablet ? 'px-2 mb-4 py-3' : 'px-3 sm:px-4 md:px-8 mb-6 sm:mb-8 py-[20px]'}`}>
        <div className={`${isTablet ? 'max-w-4xl' : 'max-w-7xl'} mx-auto`}>
          <FeaturesCarousel />
        </div>
      </section>

      {/* Quick Access Section */}
      <QuickAccessSection />

      {/* Product Carousel Section */}
      <section className={`${isTablet ? 'px-2 mb-4' : 'px-3 sm:px-4 md:px-8 mb-6 sm:mb-8'}`}>
        <div className={`${isTablet ? 'max-w-4xl' : 'max-w-7xl'} mx-auto`}>
          <div className={`text-center ${isTablet ? 'mb-4' : 'mb-8'}`}>
            <h2 className={`${isTablet ? 'text-xl' : 'text-2xl sm:text-3xl'} font-bold ${isTablet ? 'mb-2' : 'mb-4'} gradient-text-legal`}>
              Obras em Destaque
            </h2>
            <p className={`text-muted-foreground ${isTablet ? 'text-sm' : 'text-base sm:text-lg'} max-w-2xl mx-auto`}>
              Explore nossa seleção de clássicos da literatura jurídica
            </p>
          </div>
          <ProductCarousel />
        </div>
      </section>

      {/* Features Grid */}
      <FeaturesGrid />

      {/* Enhanced CTA Section - Desktop and Tablet */}
      {isDesktop || isTablet}

      {/* Support Section - appears at the bottom of index page */}
      <SuporteTab />

      {/* Social Media Footer */}
      <SocialMediaFooter />
    </>;

  // Return appropriate layout based on device
  if (isMobile) {
    return <MobileLayout>{mainContent}</MobileLayout>;
  }
  if (isTablet) {
    return <TabletLayout>{mainContent}</TabletLayout>;
  }
  return <DesktopLayout>{mainContent}</DesktopLayout>;
};
export default Index;