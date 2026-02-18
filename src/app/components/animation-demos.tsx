// Barrel file — re-exports all demo components and the lookup map.

import { CardExpandDemo } from "./demos/card-expand";
import { CardExpandV2Demo } from "./demos/card-expand_v01";
import { CardExpand3dDemo } from "./demos/card-expand_v02";
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
import { AskDemo } from "./demos/ask";

export {
  CardExpandDemo,
  CardExpandV2Demo,
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
  AskDemo,
};

export const demoComponents: Record<string, React.FC<{ replayCount?: number }>> = {
  "card-expand": CardExpandDemo,
  "card-expand_v01": CardExpandV2Demo,
  "card-expand_v02": CardExpand3dDemo,
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
  "ask": AskDemo,
};