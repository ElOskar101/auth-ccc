import React from 'react'
import { cn } from '@/app/libs/utils'

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'

interface TooltipProps {
    content: React.ReactNode
    position?: TooltipPosition
    children: React.ReactNode
}

const positionClasses: Record<TooltipPosition, string> = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
}


export const Tooltip = ({
                            content,
                            position = 'top',
                            children,
                        }: TooltipProps) => {
    return (
        <div className="relative inline-flex group">
            {children}

            <div
                role="tooltip"
                className={cn(
                    'pointer-events-none absolute z-50 whitespace-nowrap',
                    'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100',
                    'transition-all duration-150 ease-out',
                    positionClasses[position]
                )}
            >
                <div
                    className={cn(
                        'rounded-md px-3 py-1.5 text-xs font-medium',
                        'bg-gray-900 text-white shadow-lg'
                    )}
                >
                    {content}
                </div>
            </div>
        </div>
    )
}

