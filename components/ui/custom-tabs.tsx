"use client";

import React, { useState } from "react";

import { cn } from "@/lib/utils";

interface TabItem {
  key: string;
  label: string;
}

interface CustomTabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  activeTab?: string;
  onTabChange?: (tabKey: string) => void;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
}

export default function CustomTabs({
  tabs,
  defaultTab,
  activeTab,
  onTabChange,
  className,
  activeClassName = "text-primary-neutral-500 font-medium",
  inactiveClassName = "text-gray-500",
}: CustomTabsProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(
    defaultTab || tabs[0]?.key
  );

  // Use controlled activeTab if provided, otherwise use internal state
  const currentActiveTab =
    activeTab !== undefined ? activeTab : internalActiveTab;

  const handleTabClick = (tabKey: string) => {
    if (activeTab === undefined) {
      // Only update internal state if not controlled
      setInternalActiveTab(tabKey);
    }
    onTabChange?.(tabKey);
  };

  return (
    <div className={cn("flex items-center gap-8 relative", className)}>
      {/* Connected underline */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200"></div>

      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => handleTabClick(tab.key)}
          className={cn(
            "text-sm font-medium transition-colors duration-200 pb-2 relative z-10 hover:text-primary-neutral-600",
            currentActiveTab === tab.key
              ? `${activeClassName}`
              : `${inactiveClassName}`
          )}
        >
          {tab.label}
          {/* Active tab indicator */}
          {currentActiveTab === tab.key && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-neutral-500"></div>
          )}
        </button>
      ))}
    </div>
  );
}
