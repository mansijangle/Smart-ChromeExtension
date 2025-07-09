//  Keep track of how often each tab is used
let tabUsage = {};

//  Default max tab limit
let MAX_TAB_LIMIT = 10;

//  Get the user-defined max tab limit from Chrome's local storage
chrome.storage.local.get(["maxTabLimit"], (result) => {
    if (result.maxTabLimit) {
        MAX_TAB_LIMIT = result.maxTabLimit;
    }
});

//  Listen for changes in the stored max tab limit (in case user updates it from popup)
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes.maxTabLimit) {
        MAX_TAB_LIMIT = changes.maxTabLimit.newValue;
    }
});

//  Track tab usage (frequency counter)
chrome.tabs.onActivated.addListener((activeInfo) => {
    const tabId = activeInfo.tabId;
    tabUsage[tabId] = (tabUsage[tabId] || 0) + 1;
});

// Clean up usage data when a tab is closed
chrome.tabs.onRemoved.addListener((tabId) => {
    delete tabUsage[tabId];
});

// On new tab creation, apply LFU (Least Frequently Used) eviction if needed
chrome.tabs.onCreated.addListener(async (newTab) => {
    const tabs = await chrome.tabs.query({}); // Get all current tabs

    if (tabs.length > MAX_TAB_LIMIT) {
        let leastUsedTabId = null;
        let minUsage = Infinity;

        // Find the least frequently used tab (excluding the one just created)
        for (let tab of tabs) {
            const usageCount = tabUsage[tab.id] || 0;

            if (usageCount < minUsage && tab.id !== newTab.id) {
                minUsage = usageCount;
                leastUsedTabId = tab.id;
            }
        }

        // 🚪 Remove the least used tab
        if (leastUsedTabId !== null) {
            chrome.tabs.remove(leastUsedTabId);
            delete tabUsage[leastUsedTabId];
        }
    }
});
