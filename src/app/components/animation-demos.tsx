// Barrel file — re-exports all demo components and the lookup map.

import { CardExpandDemo } from "./demos/card-expand";
import { CardExpandV2Demo } from "./demos/card-expand_v01";
import { CardExpand3dDemo } from "./demos/card-expand_v02";
import { Card3dGlassDemo } from "./demos/card-3d-glass";
import { Card3dGlass2Demo } from "./demos/card-3d-glass-2";
import { CardFlipDemo } from "./demos/card-flip";
import { CardSwipeDemo } from "./demos/card-swipe";
import { ButtonTapDemo } from "./demos/button-tap";
import { ButtonLoadingDemo } from "./demos/button-loading";
import { ButtonRippleDemo } from "./demos/button-ripple";
import { ListStaggerDemo } from "./demos/list-stagger";
import { ListPullRefreshDemo } from "./demos/list-pull-refresh";
import { ListReorderDemo } from "./demos/list-reorder";
import { SheetBottomDemo } from "./demos/sheet-bottom";
import { ModalCenterDemo } from "./demos/modal-center";
import { ModalToastDemo } from "./demos/modal-toast";
import { NavMenuExpandDemo } from "./demos/nav-menu-expand";
import { NavPageTransitionDemo } from "./demos/nav-page-transition";
import { NavPageTransition2Demo } from "./demos/nav-page-transition-2";
import { NavPageTransition3Demo } from "./demos/nav-page-transition-3";
import { NavPageTransition4Demo } from "./demos/nav-page-transition-4";
import { NavTabsDemo } from "./demos/nav-tabs";
import { NavPagePushDemo } from "./demos/nav-page-push";
import { NavDrawerDemo } from "./demos/nav-drawer";
import { NavSegmentedDemo } from "./demos/nav-segmented";
import { InputToggleDemo } from "./demos/input-toggle";
import { InputLikeDemo } from "./demos/input-like";
import { InputCheckboxDemo } from "./demos/input-checkbox";
import { FeedbackSkeletonDemo } from "./demos/feedback-skeleton";
import { FeedbackProgressDemo } from "./demos/feedback-progress";
import { FeedbackSpinnerDemo } from "./demos/feedback-spinner";
import { BlankPhoneDemo } from "./demos/blank-phone";
import { IntroImageRandomDemo } from "./demos/intro-image-random";
import { IntroImageRandomV2Demo } from "./demos/intro-image-random-v2";
import { IntroConvoScreenDemo } from "./demos/intro-convo-screen";
import { IntroVideoRandomDemo } from "./demos/intro-video-random";
import { CareTeamDemo } from "./demos/care-team";
import { IvyIsThinkingDemo } from "./demos/ivy-is-thinking";

export {
  CardExpandDemo,
  CardExpandV2Demo,
  Card3dGlassDemo,
  Card3dGlass2Demo,
  CardFlipDemo,
  CardSwipeDemo,
  ButtonTapDemo,
  ButtonLoadingDemo,
  ButtonRippleDemo,
  ListStaggerDemo,
  ListPullRefreshDemo,
  ListReorderDemo,
  SheetBottomDemo,
  ModalCenterDemo,
  ModalToastDemo,
  NavMenuExpandDemo,
  NavPageTransitionDemo,
  NavPageTransition2Demo,
  NavPageTransition3Demo,
  NavPageTransition4Demo,
  NavTabsDemo,
  NavPagePushDemo,
  NavDrawerDemo,
  NavSegmentedDemo,
  InputToggleDemo,
  InputLikeDemo,
  InputCheckboxDemo,
  FeedbackSkeletonDemo,
  FeedbackProgressDemo,
  FeedbackSpinnerDemo,
  BlankPhoneDemo,
  IntroImageRandomDemo,
  IntroImageRandomV2Demo,
  IntroConvoScreenDemo,
  IntroVideoRandomDemo,
  CareTeamDemo,
  IvyIsThinkingDemo,
};

export const demoComponents: Record<string, React.FC<{ replayCount?: number; onProgress?: (progress: number) => void }>> = {
  "card-expand": CardExpandDemo,
  "card-expand_v01": CardExpandV2Demo,
  "card-expand_v02": CardExpand3dDemo,
  "card-3d-glass": Card3dGlassDemo,
  "card-3d-glass-2": Card3dGlass2Demo,
  "card-flip": CardFlipDemo,
  "card-swipe": CardSwipeDemo,
  "button-tap": ButtonTapDemo,
  "button-loading": ButtonLoadingDemo,
  "button-ripple": ButtonRippleDemo,
  "list-stagger": ListStaggerDemo,
  "list-pull-refresh": ListPullRefreshDemo,
  "list-reorder": ListReorderDemo,
  "sheet-bottom": SheetBottomDemo,
  "modal-center": ModalCenterDemo,
  "modal-toast": ModalToastDemo,
  "nav-menu-expand": NavMenuExpandDemo,
  "nav-page-transition": NavPageTransitionDemo,
  "nav-page-transition-2": NavPageTransition2Demo,
  "nav-page-transition-3": NavPageTransition3Demo,
  "nav-page-transition-4": NavPageTransition4Demo,
  "nav-tabs": NavTabsDemo,
  "nav-page-push": NavPagePushDemo,
  "nav-drawer": NavDrawerDemo,
  "nav-segmented": NavSegmentedDemo,
  "input-toggle": InputToggleDemo,
  "input-like": InputLikeDemo,
  "input-checkbox": InputCheckboxDemo,
  "feedback-skeleton": FeedbackSkeletonDemo,
  "feedback-progress": FeedbackProgressDemo,
  "feedback-spinner": FeedbackSpinnerDemo,
  "blank-phone": BlankPhoneDemo,
  "intro-image-random": IntroImageRandomDemo,
  "intro-image-random-v2": IntroImageRandomV2Demo,
  "intro-convo-screen": IntroConvoScreenDemo,
  "intro-video-random": IntroVideoRandomDemo,
  "care-team": CareTeamDemo,
  "ivy-is-thinking": IvyIsThinkingDemo,
};