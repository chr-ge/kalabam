import { Box, Container, Heading, Link, Stack, Text } from '@chakra-ui/react'
import Layout from '../components/Layout'

const Privacy = () => (
  <Layout title='Privacy Policy | Kalabam'>
    <Container maxW='5xl' my='10'>
      <Heading mb='2'>Privacy Policy</Heading>
      <Text mb='8' fontSize='sm'>Last updated December 29, 2020</Text>
      <Stack spacing={8}>
        <Text>
          We are committed to maintaining the accuracy, confidentiality, and security of your personally identifiable
          information ("Personal Information"). As part of this commitment, our privacy policy governs our actions as they
          relate to the collection, use and disclosure of Personal Information. Our privacy policy is based upon the values
          set by the Canadian Standards Association's Model Code for the Protection of Personal Information and Canada's
          Personal Information Protection and Electronic Documents Act.
        </Text>
        <Stack mb='10'>
          <Heading mb='4' fontSize='3xl'>Table of Contents</Heading>
          <Link href='#introduction' fontSize='lg' variant='kalabam' textTransform='uppercase'>1. Introduction</Link>
          <Link href='#identifying-purposes' fontSize='lg' variant='kalabam' textTransform='uppercase'>2. Identifying Purposes</Link>
          <Link href='#consent' fontSize='lg' variant='kalabam' textTransform='uppercase'>3. Consent</Link>
          <Link href='#limiting-collection' fontSize='lg' variant='kalabam' textTransform='uppercase'>4. Limiting Collection</Link>
          <Link href='#limiting-use-disclosure-retention' fontSize='lg' variant='kalabam' textTransform='uppercase'>5. Limiting Use, Disclosure and Retention</Link>
          <Link href='#accuracy' fontSize='lg' variant='kalabam' textTransform='uppercase'>6. Accuracy</Link>
          <Link href='#safeguarding-customer-information' fontSize='lg' variant='kalabam' textTransform='uppercase'>7. Safeguarding Customer Information</Link>
          <Link href='#openness' fontSize='lg' variant='kalabam' textTransform='uppercase'>8. Openness</Link>
          <Link href='#customer-access' fontSize='lg' variant='kalabam' textTransform='uppercase'>9. Customer Access</Link>
          <Link href='#handling-customer' fontSize='lg' variant='kalabam' textTransform='uppercase'>10. Handling Customer Complaints and Suggestions </Link>
        </Stack>
        <Box>
          <Heading mb='4' fontSize='2xl' id='introduction'>1. Introduction</Heading>
          <Text>
            We are responsible for maintaining and protecting the Personal Information under our control. We have designated
            an individual or individuals who is/are responsible for compliance with our privacy policy.
          </Text>
        </Box>
        <Box>
          <Heading mb='4' fontSize='2xl' id='identifying-purposes'>2. Identifying Purposes</Heading>
          <Text>
            We collect, use and disclose Personal Information to provide you with the product or service you have requested
            and to offer you additional products and services we believe you might be interested in. The purposes for which
            we collect Personal Information will be identified before or at the time we collect the information. In certain
            circumstances, the purposes for which information is collected may be clear, and consent may be implied, such as
            where your name, address and payment information is provided as part of the order process.
          </Text>
        </Box>
        <Box>
          <Heading mb='4' fontSize='2xl' id='consent'>3. Consent</Heading>
          <Text>
            Knowledge and consent are required for the collection, use or disclosure of Personal Information except where
            required or permitted by law. Providing us with your Personal Information is always your choice. However, your
            decision not to provide certain information may limit our ability to provide you with our products or services.
            We will not require you to consent to the collection, use, or disclosure of information as a condition to the
            supply of a product or service, except as required to be able to supply the product or service.
          </Text>
        </Box>
        <Box>
          <Heading mb='4' fontSize='2xl' id='limiting-collection'>4. Limiting Collection</Heading>
          <Text>
            The Personal Information collected will be limited to those details necessary for the purposes identified by us.
            With your consent, we may collect Personal Information from you in person, over the telephone or by corresponding
            with you via mail, facsimile, or the Internet.
          </Text>
        </Box>
        <Box>
          <Heading mb='4' fontSize='2xl' id='limiting-use-disclosure-retention'>5. Limiting Use, Disclosure and Retention</Heading>
          <Text>
            Personal Information may only be used or disclosed for the purpose for which it was collected unless you have
            otherwise consented, or when it is required or permitted by law. Personal Information will only be retained for
            the period of time required to fulfill the purpose for which we collected it or as may be required by law.
          </Text>
        </Box>
        <Box>
          <Heading mb='4' fontSize='2xl' id='accuracy'>6. Accuracy</Heading>
          <Text>
            Personal Information will be maintained in as accurate, complete and up-to-date form as is necessary to fulfill
            the purposes for which it is to be used.
          </Text>
        </Box>
        <Box>
          <Heading mb='4' fontSize='2xl' id='safeguarding-customer-information'>7. Safeguarding Customer Information</Heading>
          <Text>
            Personal Information will be protected by security safeguards that are appropriate to the sensitivity level of
            the information. We take all reasonable precautions to protect your Personal Information from any loss or
            unauthorized use, access or disclosure.
          </Text>
        </Box>
        <Box>
          <Heading mb='4' fontSize='2xl' id='openness'>8. Openness</Heading>
          <Text>
            We will make information available to you about our policies and practices with respect to the management of
            your Personal Information.
          </Text>
        </Box>
        <Box>
          <Heading mb='4' fontSize='2xl' id='customer-access'>9. Customer Access</Heading>
          <Text>
            Upon request, you will be informed of the existence, use and disclosure of your Personal Information, and will
            be given access to it. You may verify the accuracy and completeness of your Personal Information, and may
            request that it be amended, if appropriate. However, in certain circumstances permitted by law, we will not
            disclose certain information to you. For example, we may not disclose information relating to you if other
            individuals are referenced or if there are legal, security or commercial proprietary restrictions.
          </Text>
        </Box>
        <Box>
          <Heading mb='4' fontSize='2xl' id='handling-customer'>10. Handling Customer Complaints and Suggestions</Heading>
          <Text>
            You may direct any questions or enquiries with respect to our privacy policy or our practices by contacting:{' '}
            <Link href='mailto:hello@kalabam.com' variant='kalabam'>hello@kalabam.com</Link>
          </Text>
        </Box>
        <Heading pt='4' fontSize='xl' as='i'>Additional Information</Heading>
        <Box>
          <Heading fontSize='xl' as='i'>Cookies</Heading>
          <Text mt='4'>
            A cookie is a small computer file or piece of information that may be stored in your computer's hard drive when
            you visit our websites. We may use cookies to improve our website’s functionality and in some cases, to provide
            visitors with a customized online experience.
            Cookies are widely used and most web browsers are configured initially to accept cookies automatically. You may
            change your Internet browser settings to prevent your computer from accepting cookies or to notify you when
            you receive a cookie so that you may decline its acceptance. Please note, however, if you disable cookies, you
            may not experience optimal performance of our website.
          </Text>
        </Box>
        <Box>
          <Heading fontSize='xl' as='i'>Other Websites</Heading>
          <Text mt='4'>
            Our website may contain links to other third party sites that are not governed by this privacy policy.
            Although we endeavour to only link to sites with high privacy standards, our privacy policy will no longer
            apply once you leave our website. Additionally, we are not responsible for the privacy practices employed by
            third party websites. Therefore, we suggest that you examine the privacy statements of those sites to learn
            how your information may be collected, used, shared and disclosed.
          </Text>
        </Box>
      </Stack>
    </Container>
  </Layout>
)

export default Privacy
