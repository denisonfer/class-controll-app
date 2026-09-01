import { ReactNode } from "react";

export type TScreenProps = {
  children: ReactNode;
  isScrollable?: boolean;
  keyboardAvoidingIsActive?: boolean;
  className?: string;
  contentClassName?: string;
  title?: string;
  canGoBack?: boolean;
  HeaderComponent?: ReactNode;
  floatingAction?: ReactNode;
};
