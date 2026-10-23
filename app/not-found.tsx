import type { Metadata } from 'next';
import Link from '@mui/material/Link';
import { Container, Typography } from '@mui/material';

import { siteConfig } from '@/site.config';

export const metadata: Metadata = {
  title: `404 Not Found — ${siteConfig.name}`,
  description: `The page you were looking for was not found on the ${siteConfig.name} website.`,
  // Nothing here is worth a search result, and it has no canonical URL of its
  // own: the same page answers for every address that does not exist.
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container maxWidth='md' sx={{ py: 5 }}>
      <Typography variant='h2' component='h1' gutterBottom>
        404 Page Not Found
      </Typography>
      <Typography paragraph>
        The page you were looking for was not found. If you believe this was in
        error, please contact{' '}
        <Link href={`mailto:${siteConfig.email}`}>{siteConfig.email}</Link>.
      </Typography>
    </Container>
  );
}
