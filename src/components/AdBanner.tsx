import GoogleAd from './GoogleAd';

export default function AdBanner() {
  return (
    <div className="my-6">
      <GoogleAd format="horizontal" className="max-w-[728px] mx-auto" />
    </div>
  );
}
