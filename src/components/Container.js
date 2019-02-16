import React from 'react'
import cn from 'classnames'

export const Container = ({ className, component: Comp = 'div', ...rest }) => <Comp className={cn("container", className)} {...rest} />
