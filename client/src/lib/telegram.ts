/**
 * Telegram Mini App Integration
 * Initializes and manages Telegram WebApp SDK
 */

export interface TelegramUser {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  added_to_attachment_menu?: boolean;
  allows_write_to_pm?: boolean;
  photo_url?: string;
}

export interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    query_id?: string;
    user?: TelegramUser;
    receiver?: TelegramUser;
    chat?: {
      id: number;
      type: string;
      title: string;
      username?: string;
      photo_url?: string;
    };
    auth_date: number;
    hash: string;
  };
  version: string;
  platform: string;
  colorScheme: 'light' | 'dark';
  themeParams: {
    bg_color?: string;
    text_color?: string;
    hint_color?: string;
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
    secondary_bg_color?: string;
  };
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  isClosingConfirmationEnabled: boolean;
  headerColor: string;
  bottomBarColor: string;
  isVerticalSwipesEnabled: boolean;
  isOrientationLocked: boolean;

  // Methods
  ready(): void;
  expand(): void;
  close(): void;
  onEvent(eventType: string, callback: () => void): void;
  offEvent(eventType: string, callback: () => void): void;
  sendData(data: string): void;
  switchInlineQuery(query: string, choose_chat_type?: string): void;
  openLink(url: string, options?: { try_instant_view?: boolean }): void;
  openTelegramLink(url: string): void;
  openInvoice(url: string, callback?: (status: string) => void): void;
  showPopup(params: {
    title?: string;
    message: string;
    buttons?: Array<{
      id?: string;
      text: string;
      type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
    }>;
  }, callback?: (buttonId: string) => void): void;
  showAlert(message: string, callback?: () => void): void;
  showConfirm(message: string, callback?: (confirmed: boolean) => void): void;
  showScanQrPopup(params: {
    text?: string;
  }, callback?: (data: string) => void): void;
  closeScanQrPopup(): void;
  readTextFromClipboard(callback?: (text: string | null) => void): void;
  requestWriteAccess(callback?: (allowed: boolean) => void): void;
  requestContactAccess(callback?: (allowed: boolean) => void): void;
  requestPhone(callback?: (shared: boolean) => void): void;
  sharePhone(phone_number: string, callback?: (shared: boolean) => void): void;
  shareContact(contact: { phone_number: string; first_name: string; last_name?: string }, callback?: (shared: boolean) => void): void;
  shareToStory(media_url: string, params?: { text?: string; widget_link?: { url: string; name?: string } }, callback?: (shared: boolean) => void): void;
  addToMenu(params?: { requested_user_is_bot?: boolean }, callback?: (added: boolean) => void): void;
  setHeaderColor(color: string | 'bg_color' | 'secondary_bg_color'): void;
  setBottomBarColor(color: string | 'bg_color' | 'secondary_bg_color'): void;
  setBackgroundColor(color: string): void;
  setTextColor(color: string): void;
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isActive: boolean;
    isProgressVisible: boolean;
    setText(text: string): void;
    onClick(callback: () => void): void;
    offClick(callback: () => void): void;
    show(): void;
    hide(): void;
    enable(): void;
    disable(): void;
    showProgress(leaveActive?: boolean): void;
    hideProgress(): void;
    setParams(params: {
      text?: string;
      color?: string;
      text_color?: string;
      is_active?: boolean;
      is_visible?: boolean;
    }): void;
  };
  BackButton: {
    isVisible: boolean;
    onClick(callback: () => void): void;
    offClick(callback: () => void): void;
    show(): void;
    hide(): void;
  };
  SettingsButton: {
    isVisible: boolean;
    onClick(callback: () => void): void;
    offClick(callback: () => void): void;
    show(): void;
    hide(): void;
  };
  HapticFeedback: {
    impactOccurred(style: 'light' | 'medium' | 'heavy'): void;
    notificationOccurred(type: 'error' | 'success' | 'warning'): void;
    selectionChanged(): void;
  };
  CloudStorage: {
    getItem(key: string, callback?: (error: string | null, value: string | null) => void): void;
    setItem(key: string, value: string, callback?: (error: string | null) => void): void;
    removeItem(key: string, callback?: (error: string | null) => void): void;
    getKeys(callback?: (error: string | null, keys: string[]) => void): void;
  };
  BiometricManager: {
    isAvailable: boolean;
    isBiometricIdAvailable: boolean;
    authenticate(params: {
      reason?: string;
    }, callback?: (success: boolean) => void): void;
    requestAccess(params: {
      reason?: string;
    }, callback?: (granted: boolean) => void): void;
  };
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

/**
 * Initialize Telegram Mini App
 */
export function initTelegramApp(): TelegramWebApp | null {
  if (typeof window === 'undefined') return null;

  const webApp = window.Telegram?.WebApp;
  if (!webApp) {
    console.warn('Telegram WebApp SDK not available');
    return null;
  }

  // Ready signal to Telegram
  webApp.ready();

  // Expand to full height
  webApp.expand();

  // Set theme colors
  if (webApp.themeParams.bg_color) {
    webApp.setBackgroundColor(webApp.themeParams.bg_color);
  }

  if (webApp.themeParams.text_color) {
    webApp.setTextColor(webApp.themeParams.text_color);
  }

  // Enable closing confirmation
  webApp.isClosingConfirmationEnabled = true;

  return webApp;
}

/**
 * Get current Telegram user
 */
export function getTelegramUser(): TelegramUser | null {
  const webApp = window.Telegram?.WebApp;
  return webApp?.initDataUnsafe?.user || null;
}

/**
 * Show haptic feedback
 */
export function triggerHaptic(type: 'light' | 'medium' | 'heavy' = 'medium'): void {
  const webApp = window.Telegram?.WebApp;
  if (webApp?.HapticFeedback) {
    webApp.HapticFeedback.impactOccurred(type);
  }
}

/**
 * Show notification feedback
 */
export function triggerNotification(type: 'error' | 'success' | 'warning' = 'success'): void {
  const webApp = window.Telegram?.WebApp;
  if (webApp?.HapticFeedback) {
    webApp.HapticFeedback.notificationOccurred(type);
  }
}

/**
 * Show alert dialog
 */
export function showAlert(message: string, callback?: () => void): void {
  const webApp = window.Telegram?.WebApp;
  if (webApp?.showAlert) {
    webApp.showAlert(message, callback);
  } else {
    alert(message);
    callback?.();
  }
}

/**
 * Show confirmation dialog
 */
export function showConfirm(message: string, callback?: (confirmed: boolean) => void): void {
  const webApp = window.Telegram?.WebApp;
  if (webApp?.showConfirm) {
    webApp.showConfirm(message, callback);
  } else {
    const confirmed = confirm(message);
    callback?.(confirmed);
  }
}

/**
 * Open external link
 */
export function openLink(url: string): void {
  const webApp = window.Telegram?.WebApp;
  if (webApp?.openLink) {
    webApp.openLink(url);
  } else {
    window.open(url, '_blank');
  }
}

/**
 * Check if running in Telegram Mini App
 */
export function isTelegramMiniApp(): boolean {
  return !!window.Telegram?.WebApp;
}

/**
 * Get Telegram theme
 */
export function getTelegramTheme(): 'light' | 'dark' {
  return window.Telegram?.WebApp?.colorScheme || 'light';
}

/**
 * Get viewport height
 */
export function getViewportHeight(): number {
  return window.Telegram?.WebApp?.viewportHeight || window.innerHeight;
}

/**
 * Send data back to Telegram bot
 */
export function sendDataToBot(data: string): void {
  const webApp = window.Telegram?.WebApp;
  if (webApp?.sendData) {
    webApp.sendData(data);
  }
}

/**
 * Set main button
 */
export function setMainButton(text: string, onClick: () => void, active: boolean = true): void {
  const webApp = window.Telegram?.WebApp;
  if (webApp?.MainButton) {
    webApp.MainButton.setText(text);
    webApp.MainButton.onClick(onClick);
    if (active) {
      webApp.MainButton.show();
      webApp.MainButton.enable();
    } else {
      webApp.MainButton.hide();
    }
  }
}

/**
 * Hide main button
 */
export function hideMainButton(): void {
  const webApp = window.Telegram?.WebApp;
  if (webApp?.MainButton) {
    webApp.MainButton.hide();
  }
}

/**
 * Show back button
 */
export function showBackButton(onClick: () => void): void {
  const webApp = window.Telegram?.WebApp;
  if (webApp?.BackButton) {
    webApp.BackButton.onClick(onClick);
    webApp.BackButton.show();
  }
}

/**
 * Hide back button
 */
export function hideBackButton(): void {
  const webApp = window.Telegram?.WebApp;
  if (webApp?.BackButton) {
    webApp.BackButton.hide();
  }
}

export default {
  initTelegramApp,
  getTelegramUser,
  triggerHaptic,
  triggerNotification,
  showAlert,
  showConfirm,
  openLink,
  isTelegramMiniApp,
  getTelegramTheme,
  getViewportHeight,
  sendDataToBot,
  setMainButton,
  hideMainButton,
  showBackButton,
  hideBackButton,
};
