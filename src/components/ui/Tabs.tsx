"use client"

import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import React from "react"

import { Tooltip } from "~/components/ui/Tooltip"
import { cn } from "~/lib/utils"

import { UniLink } from "./UniLink"

export type TabItem = {
  text: string
  href?: string
  hidden?: boolean
  onClick?: () => void
  active?: boolean
  tooltip?: string
}

export const Tabs = ({
  items,
  className,
  type,
}: {
  items: TabItem[]
  className?: string
  type?: "rounded" | "bordered"
}) => {
  const t = useTranslations()
  const pathname = usePathname()

  items = items.map((item) => {
    if (item.href) {
      item.active = pathname === item.href
    }
    return item
  })

  return (
    <div
      className={cn(
        "flex mb-8 overflow-x-auto scrollbar-hide",
        type === "rounded" ? "space-x-3 text-sm" : "space-x-5 border-b",
        className,
      )}
    >
      {items.map((item) => {
        if (item.hidden) return null

        return (
          <UniLink
            href={item.href}
            onClick={item.onClick}
            key={item.text}
            className={cn(
              "inline-flex items-center h-10 whitespace-nowrap cursor-pointer transition-colors focus-ring relative",
              type === "rounded"
                ? "rounded-full h-8 px-3 transition-colors"
                : "after:absolute after:h-[2px] after:transition-[left,right] after:bottom-0",
              type === "rounded"
                ? item.active
                  ? "bg-zinc-950 text-white"
                  : "bg-zinc-100 text-zinc-800 hover:bg-zinc-200"
                : item.active
                  ? "text-black font-medium after:inset-x-0 after:bg-accent"
                  : "text-gray-500 hover:text-gray-700 after:inset-x-1/2 hover:after:inset-x-0 after:bg-gray-700",
            )}
          >
            {item.tooltip ? (
              <Tooltip label={item.tooltip}>
                <>{t(item.text)}</>
              </Tooltip>
            ) : (
              <>{t(item.text)}</>
            )}
          </UniLink>
        )
      })}
    </div>
  )
}
