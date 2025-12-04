import CustomizationBuilder from '../../../../components/customize/CustomizationBuilder';

export const metadata = {
  title: 'Personalize | Vysera',
  description: 'Design your own custom engraved jewelry.',
};

export default function CustomizePage() {
  return (
    <div className="container mx-auto px-4 py-12 min-h-[80vh]">
      <CustomizationBuilder />
    </div>
  );
}