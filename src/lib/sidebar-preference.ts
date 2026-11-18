export const SIDEBAR_STORAGE_KEY = "cgp-sidebar";

const CHANGE_EVENT = "cgp-sidebar-change";

export function subscribeSidebarPreference(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
  };
}

export function getSidebarCollapsedSnapshot() {
  try {
    return localStorage.getItem(SIDEBAR_STORAGE_KEY) === "collapsed";
  } catch {
    return false;
  }
}

export function getSidebarCollapsedServerSnapshot() {
  return false;
}

export function persistSidebarCollapsed(collapsed: boolean) {
  try {
    localStorage.setItem(
      SIDEBAR_STORAGE_KEY,
      collapsed ? "collapsed" : "expanded",
    );
  } catch {
    return;
  }

  window.dispatchEvent(new Event(CHANGE_EVENT));
}
