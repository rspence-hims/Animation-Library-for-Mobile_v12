import img1 from "figma:asset/_IntroImagesCompressedJPG/Transition_FOOTAGE_1.jpg";
import img2 from "figma:asset/_IntroImagesCompressedJPG/Transition_FOOTAGE_2.jpg";
import img3 from "figma:asset/_IntroImagesCompressedJPG/Transition_FOOTAGE_3.jpg";
import img4 from "figma:asset/_IntroImagesCompressedJPG/Transition_FOOTAGE_4.jpg";
import img5 from "figma:asset/_IntroImagesCompressedJPG/Transition_FOOTAGE_5.jpg";

const introImages: string[] = [img1, img2, img3, img4, img5];

// Preload all images into browser cache at module load time
introImages.forEach((src) => {
  const img = new Image();
  img.src = src;
});

export function getRandomIntroImage(): string {
  return introImages[Math.floor(Math.random() * introImages.length)];
}
