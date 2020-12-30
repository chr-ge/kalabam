import { Link as ChakraLink, forwardRef } from '@chakra-ui/react'
import NextLink from 'next/link'

export const Link = forwardRef(
  (
    {
      children,
      href,
      isExternal,
      isExternalNoFollow = false,
      isExternalNoOpener = true,
      isExternalNoReferrer = true,
      passHref = true,
      prefetch,
      replace,
      scroll,
      shallow,
      variant,
      ...chakraInternals
    },
    ref
  ) => {
    return (
      <NextLink
        href={href}
        passHref={passHref}
        prefetch={prefetch}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
      >
        <ChakraLink
          isExternal={isExternal}
          ref={ref}
          variant={variant}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...(isExternal
            ? {
                rel: `${
                  // don't give control/info of window.open()
                  isExternalNoOpener ? ' noopener' : ''
                }${
                  // don't give referrer
                  isExternalNoReferrer ? ' noreferrer' : ''
                }${
                  // don't give SEO "juice"
                  isExternalNoFollow ? ' nofollow' : ''
                }`.trim()
              }
            : {})}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...chakraInternals}
        >
          {children}
        </ChakraLink>
      </NextLink>
    )
  }
)
