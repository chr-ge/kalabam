import { FC, useMemo } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box, type BoxProps } from '@chakra-ui/react'
import { config } from '../config'
import { Header } from './Header'
import { Footer } from './Branding'

interface LayoutProps extends BoxProps {
  title?: string
  children: React.ReactNode
}

export const Layout: FC<LayoutProps> = ({ title, children, ...props }) => {
  const { asPath } = useRouter()

  const seo = useMemo(
    () => ({
      title: title || 'Kalabam',
      description:
        'Create multiplayer hames for class activities or interactive presentations. Free for everyone: teachers, professionals, Individuals.',
      keywords: 'Multiplayer Quiz,Interactive Presentations',
      url: config.host + asPath,
      imageUrl: `${config.host}/images/banner.png`,
      imageAlt: 'Make your presentations fun',
    }),
    [title, config.host, asPath]
  )

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name='description' content={seo.description} />
        <meta name='keywords' content={seo.keywords} />
        <link rel='canonical' href={seo.url} />
        <meta property='og:title' content={seo.title} />
        <meta property='og:description' content={seo.description} />
        <meta property='og:url' content={seo.url} />
        <meta property='og:type' content='website' />
        <meta property='og:image' content={seo.imageUrl} />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        <meta property='og:image:alt' content={seo.imageAlt} />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:title' content={seo.title} />
        <meta name='twitter:description' content={seo.description} />
        <meta name='twitter:image' content={seo.imageUrl} />
        <meta name='twitter:image:alt' content={seo.imageAlt} />
      </Head>
      <Box h='100%'>
        <Box d='flex' minH='100%' flexDir='column'>
          <Header />
          <Box as='main' flex='1' {...props}>
            {children}
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  )
}
