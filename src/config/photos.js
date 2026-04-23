import { publicAssetUrl } from '../utils/public-asset';

const PATHS = {
  homeHero: 'media/photo-02.jpg',
  resellersHero: 'media/photo-03.jpg',
  smeHero: 'media/photo-04.jpg',
  mkbWhatInline: 'media/photo-01.jpg',
  resellersContactBridge: 'media/photo-06.jpg',
  contactHero: 'media/photo-05.jpg',
  approachHero: 'media/photo-07.jpg',
  approachStep1: 'media/photo-04.jpg',
  approachStep2: 'media/photo-02.jpg',
  approachStep3: 'media/photo-05.jpg',
  approachStep4: 'media/photo-06.jpg',
};

export function sitePhotoUrl(key) {
  return publicAssetUrl(PATHS[key]);
}
